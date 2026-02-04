class SafetyFilter {
    isSafe(message) {
        // Simple safety check
        const blocked = [
            "api key", "password", "secret", "hack",
            "exploit", "admin", "root", "system prompt"
        ];

        const lowerMessage = message.toLowerCase();
        return !blocked.some(word => lowerMessage.includes(word));
    }

    getSafeResponse() {
        return "I can't discuss that topic. Let's talk about AI or gaming instead.";
    }
}

module.exports = SafetyFilter;