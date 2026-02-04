class SapphAIMemory {
    constructor() {
        this.conversations = new Map();
        this.supportShown = new Set();
    }

    getConversation(userId) {
        if (!this.conversations.has(userId)) {
            this.conversations.set(userId, []);
        }
        return this.conversations.get(userId);
    }

    addMessage(userId, role, content) {
        const conversation = this.getConversation(userId);
        conversation.push({ role, content, timestamp: Date.now() });

        // Keep only last 20 messages
        if (conversation.length > 20) {
            this.conversations.set(userId, conversation.slice(-20));
        }
    }

    getRecentHistory(userId, maxMessages = 6) {
        const conversation = this.getConversation(userId);
        return conversation.slice(-maxMessages);
    }

    clearConversation(userId) {
        this.conversations.delete(userId);
    }

    markSupportShown(userId) {
        this.supportShown.add(userId);
    }

    hasSeenSupport(userId) {
        return this.supportShown.has(userId);
    }
}

module.exports = SapphAIMemory;