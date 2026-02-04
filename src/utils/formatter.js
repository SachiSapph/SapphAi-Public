class Formatter {
    format(text, aiName = "SapphAI") {
        // Ensure AI name is present
        if (!text.startsWith(aiName + ":")) {
            text = aiName + ": " + text;
        }

        // Convert markdown-like lists to clean format
        text = text.replace(/\n\*/g, "\n-");
        text = text.replace(/\n\d\./g, "\n-");

        // Add line breaks for readability
        if (text.length > 150) {
            text = text.replace(/([.!?])\s+(?=[A-Z])/g, "$1\n\n");
        }

        // Clean up excessive punctuation
        text = text.replace(/!{2,}/g, "!");
        text = text.replace(/\?{2,}/g, "?");

        return text;
    }
}

module.exports = Formatter;