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
            // Call OpenAI
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
                    }
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
            console.error("OpenAI API Error:", error.response?.data || error.message);

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