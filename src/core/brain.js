const SapphAIPersonality = require("./personality");
const SapphAIMemory = require("./memory");
const Formatter = require("../utils/formatter");

class SapphAIBrain {
    constructor(openaiApiKey, model = "gpt-3.5-turbo") {
        this.personality = new SapphAIPersonality();
        this.memory = new SapphAIMemory();
        this.formatter = new Formatter();
        this.openaiApiKey = openaiApiKey;
        this.model = model;

        this.axios = require("axios");
    }

    async processMessage(userMessage, userId, supportLink) {
        const isNewUser = !this.memory.hasSeenSupport(userId);

        // Add user message to memory
        this.memory.addMessage(userId, "user", userMessage);

        // Prepare system prompt
        let systemPrompt = this.personality.getSystemPrompt();

        // Add support reminder for new users
        if (isNewUser) {
            systemPrompt += "\n\nIMPORTANT: This is the user's first message. Include the support message at the beginning of your response.";
            this.memory.markSupportShown(userId);
        }

        // Get conversation history
        const history = this.memory.getRecentHistory(userId);

        // Prepare messages for OpenAI
        const messages = [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userMessage }
        ];

        try {
            // Call OpenAI with timeout
            const response = await this.axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: this.model,
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 300
                },
                {
                    headers: {
                        "Authorization": `Bearer ${this.openaiApiKey}`,
                        "Content-Type": "application/json"
                    },
                    timeout: 30000 // 30 second timeout
                }
            );

            let aiResponse = response.data.choices[0].message.content;

            // Add support message for new users
            if (isNewUser) {
                aiResponse = this.personality.getSupportMessage(supportLink) + "\n\n" + aiResponse;
            }

            // Format response
            aiResponse = this.formatter.format(aiResponse, this.personality.identity.alias);

            // Add to memory
            this.memory.addMessage(userId, "assistant", aiResponse);

            return {
                response: aiResponse,
                isNewUser: isNewUser
            };

        } catch (error) {
            // ENHANCED ERROR LOGGING
            console.error("🔴 OPENAI API ERROR DETAILS:");

            if (error.response) {
                // The request was made and the server responded with a status code
                console.error("Status Code:", error.response.status);
                console.error("Status Text:", error.response.statusText);
                console.error("Error Data:", JSON.stringify(error.response.data, null, 2));

                // Common OpenAI errors
                if (error.response.status === 401) {
                    console.error("❌ INVALID API KEY - Check if OPENAI_API_KEY is correct in Render env vars");
                } else if (error.response.status === 429) {
                    console.error("⏱️ RATE LIMITED - Too many requests or quota exceeded");
                } else if (error.response.status === 503) {
                    console.error("🚫 SERVICE UNAVAILABLE - OpenAI API is down");
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error("📡 NO RESPONSE FROM OPENAI - Network issue");
                console.error("Request Config:", {
                    url: error.request._currentUrl || error.config?.url,
                    method: error.config?.method,
                    timeout: error.config?.timeout
                });

                // Check if it's a timeout
                if (error.code === 'ECONNABORTED') {
                    console.error("⏰ TIMEOUT - Request took too long (30s)");
                }
            } else {
                // Something happened in setting up the request
                console.error("⚙️ SETUP ERROR:", error.message);
                console.error("Stack:", error.stack);
            }

            // Also log the API key status (first few chars only for security)
            console.error("API Key Status:", this.openaiApiKey ?
                `Set (starts with: ${this.openaiApiKey.substring(0, 8)}...)` :
                "❌ NOT SET - Check OPENAI_API_KEY env var"
            );
            console.error("Model:", this.model);
            console.error("User ID:", userId);
            console.error("Message length:", userMessage.length);

            // Fallback response
            const fallback = this.formatter.format(
                "I'm experiencing technical difficulties. Please try again in a moment.",
                this.personality.identity.alias
            );

            return {
                response: fallback,
                isNewUser: isNewUser,
                error: true
            };
        }
    }

    getAboutInfo() {
        return this.personality.getAboutInfo();
    }

    getConversationHistory(userId) {
        return this.memory.getConversation(userId);
    }

    clearMemory(userId) {
        this.memory.clearConversation(userId);
    }
}

module.exports = SapphAIBrain;