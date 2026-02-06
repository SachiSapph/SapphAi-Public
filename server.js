require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import custom modules
const SapphAIBrain = require("./src/core/brain");
const SafetyFilter = require("./src/middleware/safety");
const { createRateLimiter } = require("./src/middleware/rate-limit");

// Initialize Express
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const SUPPORT_LINK = process.env.SUPPORT_LINK || "https://buy.stripe.com/cNi3cu9ju7yJcvN1rH5ZC00";

// Initialize SapphAI
let sapphAI;
let safetyFilter;

try {
    sapphAI = new SapphAIBrain(
        process.env.OPENAI_API_KEY,
        process.env.OPENAI_MODEL || "gpt-3.5-turbo"
    );
    safetyFilter = new SafetyFilter();
} catch (error) {
    console.error("Failed to initialize SapphAI:", error.message);
    process.exit(1);
}

// Middleware
app.use(cors({
    origin: NODE_ENV === "development" ? "*" : ["https://your-game-domain.com"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rate limiting
const chatLimiter = createRateLimiter(
    parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
);

// Routes

// Health check (for backend servers)
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        service: "SapphAI Chat Bot",
        version: "1.0.0",
        environment: NODE_ENV,
        port: PORT
    });
});

// Server info
app.get("/", (req, res) => {
    res.json({
        service: "SapphAI Chat Bot",
        version: "1.0.0",
        status: "operational",
        creator: "Solo-Dev",
        mission: "Revolutionizing gaming with lifelike AI",
        endpoints: {
            chat: "POST /api/chat",
            about: "GET /api/about",
            health: "GET /health",
            memory: "GET /api/memory/:userId"
        },
        deployment: "Universal backend ready",
        supported_platforms: ["Render", "Railway", "Heroku", "AWS", "Google Cloud", "Azure", "Docker", "Vercel", "Cloudflare"]
    });
});

// About SapphAI
app.get("/api/about", (req, res) => {
    try {
        const aboutInfo = sapphAI.getAboutInfo();
        res.json(aboutInfo);
    } catch (error) {
        res.json({
            name: "SapphAI",
            creator: "Solo-Developer",
            mission: "Revolutionizing gaming with lifelike AI",
            error: "Brain system initializing"
        });
    }
});

// Main chat endpoint
app.post("/api/chat", chatLimiter, async (req, res) => {
    try {
        const { message, userId = "anonymous" } = req.body;

        if (!message || typeof message !== "string") {
            return res.status(400).json({
                error: "Invalid request",
                message: "Message is required and must be a string"
            });
        }

        // Safety check
        if (!safetyFilter.isSafe(message)) {
            console.warn(`Safety filter triggered by ${userId}`);
            return res.json({
                response: `SapphAI: I can't discuss that topic. Let's talk about AI or gaming instead.`,
                filtered: true
            });
        }

        console.log(`👤 ${userId}: ${message.substring(0, 50)}...`);

        // Process message through SapphAI brain
        const result = await sapphAI.processMessage(message, userId, SUPPORT_LINK);

        console.log(`🤖 Response sent to ${userId}`);

        res.json({
            response: result.response,
            isNewUser: result.isNewUser,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Chat endpoint error:", error.message);

        res.status(500).json({
            error: "Internal server error",
            message: "Something went wrong. Please try again."
        });
    }
});

// Get conversation history
app.get("/api/memory/:userId", (req, res) => {
    try {
        const { userId } = req.params;
        const history = sapphAI.getConversationHistory(userId);

        res.json({
            userId,
            history,
            count: history.length,
            retrievedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Memory endpoint error:", error);
        res.status(500).json({ error: "Failed to retrieve memory" });
    }
});

// Clear conversation (for testing)
app.delete("/api/memory/:userId", (req, res) => {
    try {
        const { userId } = req.params;
        sapphAI.clearMemory(userId);

        res.json({
            message: "Conversation cleared",
            userId,
            clearedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Clear memory error:", error);
        res.status(500).json({ error: "Failed to clear memory" });
    }
});

// API documentation
app.get("/api/docs", (req, res) => {
    res.json({
        documentation: "SapphAI API Documentation",
        endpoints: [
            {
                method: "GET",
                path: "/",
                description: "Server information"
            },
            {
                method: "GET",
                path: "/health",
                description: "Health check for backend servers"
            },
            {
                method: "POST",
                path: "/api/chat",
                description: "Main chat endpoint",
                request_body: {
                    message: "string (required)",
                    userId: "string (optional, default: 'anonymous')"
                }
            },
            {
                method: "GET",
                path: "/api/memory/:userId",
                description: "Get conversation history"
            }
        ],
        deployment: {
            docker: "docker build -t sapphai . && docker run -p $PORT:$PORT sapphai",
            render: "Connect GitHub repo to Render.com",
            vercel: "vercel --prod",
            cloudflare: "wrangler deploy",
            railway: "Connect GitHub repo to Railway.app",
            heroku: "git push heroku main"
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Not found",
        message: `Route ${req.path} not found`,
        availableRoutes: [
            "/",
            "/health",
            "/api/chat",
            "/api/about",
            "/api/memory/:userId",
            "/api/docs"
        ]
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(err.status || 500).json({
        error: "Server error",
        message: NODE_ENV === "development" ? err.message : "Something went wrong",
        timestamp: new Date().toISOString()
    });
});

// Export the app for serverless platforms
module.exports = app;

// Only start the server if NOT in serverless environment
if (require.main === module) {
    const HOST = process.env.HOST || '0.0.0.0';

    app.listen(PORT, HOST, () => {
        console.log(`=========================================`);
        console.log(`🚀 SapphAI Server Started Successfully`);
        console.log(`=========================================`);
        console.log(`📡 URL: http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
        console.log(`⚙️  Environment: ${NODE_ENV}`);
        console.log(`🤖 AI Model: ${process.env.OPENAI_MODEL || "gpt-3.5-turbo"}`);
        console.log(`🔧 Port: ${PORT}`);
        console.log(`🌐 Host: ${HOST}`);
        console.log(`=========================================`);
        console.log(`✅ Running in: ${process.env.VERCEL ? 'Vercel' : process.env.CF_PAGES ? 'Cloudflare' : 'Traditional Server'}`);
        console.log(`=========================================`);
    });
}