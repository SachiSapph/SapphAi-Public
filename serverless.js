// serverless.js - Universal serverless adapter for Vercel, Cloudflare, AWS Lambda
const app = require('./server.js');

// Cloudflare Workers adapter
if (typeof addEventListener === 'function') {
    addEventListener('fetch', event => {
        event.respondWith(handleRequest(event.request));
    });

    async function handleRequest(request) {
        try {
            const url = new URL(request.url);
            const method = request.method;
            const headers = Object.fromEntries(request.headers.entries());
            const body = method !== 'GET' && method !== 'HEAD'
                ? await request.text()
                : null;

            // Create mock Express request/response
            const req = {
                method,
                url: url.pathname + url.search,
                path: url.pathname,
                query: Object.fromEntries(url.searchParams.entries()),
                headers,
                body: body ? JSON.parse(body || '{}') : {}
            };

            const res = {
                statusCode: 200,
                headers: {},
                json: (data) => {
                    return new Response(JSON.stringify(data), {
                        status: res.statusCode,
                        headers: { 'Content-Type': 'application/json', ...res.headers }
                    });
                }
            };

            // Route through Express app
            return await new Promise((resolve) => {
                const mockRes = {
                    status: (code) => { res.statusCode = code; return mockRes; },
                    json: (data) => resolve(new Response(JSON.stringify(data), {
                        status: res.statusCode,
                        headers: { 'Content-Type': 'application/json' }
                    })),
                    setHeader: (key, value) => { res.headers[key] = value; }
                };

                app(req, mockRes, () => {
                    resolve(new Response('Not Found', { status: 404 }));
                });
            });
        } catch (error) {
            console.error('Serverless error:', error);
            return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}

// Vercel/AWS Lambda export
module.exports = async (req, res) => {
    return app(req, res);
};