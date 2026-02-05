// serverless.js - For Cloudflare Workers, Vercel, AWS Lambda
import app from './server.js';

export default {
    async fetch(request, env, ctx) {
        return await app.fetch(request);
    }
};