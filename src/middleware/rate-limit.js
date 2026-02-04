const rateLimit = require("express-rate-limit");

const createRateLimiter = (windowMs = 900000, max = 100) => {
    return rateLimit({
        windowMs: windowMs,
        max: max,
        message: {
            error: "Too many requests",
            message: "Please try again later."
        }
    });
};

module.exports = { createRateLimiter };