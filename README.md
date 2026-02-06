# 🧠 SapphAI – Universal AI Assistant

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Docker](https://img.shields.io/badge/Docker-Build-blue)
![MIT License](https://img.shields.io/badge/License-MIT-yellow)
![Render](https://img.shields.io/badge/Render-supported-blue)
![Vercel](https://img.shields.io/badge/Vercel-supported-black)
![Cloudflare](https://img.shields.io/badge/Cloudflare-supported-orange)
![Railway](https://img.shields.io/badge/Railway-supported-red)

SapphAI is a **universal AI assistant system** designed to deploy to **15+ platforms** from a **single codebase**. It provides a **secure, server-based AI** that is ideal for games, apps, websites, bots, and other integrations.  
SapphAI is production-ready, supports serverless and traditional deployments, and includes health checks, rate limiting, and safety filters.

---

## ✨ Features

- 🧩 **Universal Port System** (`const PORT = process.env.PORT || 3000`)  
- 🌐 **Multi-Platform Ready**: Works on traditional servers and serverless environments  
- 🔄 **One-Codebase Deployment**: Same code runs everywhere  
- ⚡ **Production & Development Support** (`NODE_ENV`)  
- 🩺 **Health Checks** (`/health`)  
- 📚 **API Documentation** (`/api/docs`)  
- 🛡️ **Rate Limiting & Safety Filters**  
- 🖥️ **Docker & Serverless Support** (Render, Vercel, Cloudflare, Railway, Heroku)  

---

## 🚀 Quick Start – One-Click Deploy

| Deployment Method | Setup Time | Coding Required | Control |
|-----------------|-----------|----------------|--------|
| **Cloud Hosting** | ~2 min | None | Medium |
| **Self-Hosting** | 10–20 min | Yes | Full |

### ☁️ One-Click Deploy Buttons

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/SachiSapph/SapphAi-Public)  
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/SachiSapph/SapphAi-Public)  
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/SachiSapph/SapphAi-Public)  

> ⚠️ **Note:** Heroku button requires `app.json` configuration for optional settings. Render deployment uses the **Render Blueprint system**.

---

## 🐳 Docker Deployment (Build from Source)

Run SapphAI on any Docker-compatible host by **building from source**:

```bash
docker build -t sapphai .
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your_api_key_here \
  sapphai
```

For local development using `docker-compose`:

```bash
npm run docker:compose
```

Server will be available at:

```bash
http://localhost:3000
```

---

## ⚡ Serverless Deployment

SapphAI provides a **serverless adapter** (`serverless.js`) to run on:

- Vercel (`npm run vercel:deploy`)  
- Cloudflare Workers (`npm run cloudflare:deploy`)  
- Netlify  

Architecture:
- Exports the main Express app to work seamlessly in serverless environments  
- Supports universal PORT and NODE_ENV  
- Automatic HTTPS/SSL when deployed  

---

## 📦 Platform-Specific Deployment

- **Render**: `npm run render:deploy` – Uses Blueprint system, free tier, Docker support  
- **Vercel**: `npm run vercel:deploy` – Serverless functions, free tier  
- **Cloudflare Workers**: `npm run cloudflare:deploy` – Edge deployment, free tier  
- **Railway**: Traditional PaaS, free tier available  
- **Heroku**: Traditional PaaS, requires `app.json`  

> ⚠️ All platforms use the **same OpenAI API key**

---

## 📦 Manual Setup (Self-Hosting)

### 1. Install Prerequisites

- Git: https://git-scm.com  
- Node.js (LTS): https://nodejs.org  
- VS Code (recommended): https://code.visualstudio.com  

### 2. Clone the Repository

```bash
git clone https://github.com/SachiSapph/SapphAi-Public.git
cd SapphAi-Public
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Locally

```bash
npm run dev
```

Production mode:

```bash
npm start
```

---

## 🔧 Configuration (.env)

Required environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
SUPPORT_LINK=https://discord.gg/3kF8rbEUEF
```

- `OPENAI_API_KEY`: Your OpenAI API key  
- `PORT`: Server port (default: 3000)  
- `NODE_ENV`: development/production  
- `RATE_LIMIT_*`: Controls rate limiting  
- `SUPPORT_LINK`: Optional support link  

---

## 🎮 Game Integration (Unity Example)

```csharp
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class SapphAIClient : MonoBehaviour
{
    private string apiUrl = "https://your-sapphai-server-url/api/chat";

    public void SendMessage(string message)
    {
        StartCoroutine(SendRequest(message));
    }

    IEnumerator SendRequest(string message)
    {
        string json = "{\"message\":\"" + message + "\"}";
        byte[] body = System.Text.Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest(apiUrl, "POST");
        request.uploadHandler = new UploadHandlerRaw(body);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Debug.Log("AI Response: " + request.downloadHandler.text);
        }
        else
        {
            Debug.LogError("AI Error: " + request.error);
        }
    }
}
```

> Same integration method works for Godot, Discord bots, websites, and other clients via HTTP/JSON.

---

## 📚 API Reference

| Method | Endpoint | Description |
|--------|---------|------------|
| GET    | `/` | Server information |
| GET    | `/health` | Health check |
| POST   | `/api/chat` | Main AI chat endpoint |
| GET    | `/api/memory/:userId` | Conversation history |
| GET    | `/api/docs` | API documentation |

---

## 🛠️ Development Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Run development server with nodemon |
| `npm start` | Run production server |
| `npm run docker:compose` | Local Docker development |
| `npm run vercel:deploy` | Deploy to Vercel |
| `npm run cloudflare:deploy` | Deploy to Cloudflare Workers |
| `npm run render:deploy` | Deploy to Render |

---

## 🤝 Contributing & Support

- GitHub Issues & Discussions: https://github.com/SachiSapph/SapphAi-Public/issues  
- Community & Support: https://discord.gg/3kF8rbEUEF  
- Repository: https://github.com/SachiSapph/SapphAi-Public  

We welcome contributions, feedback, and feature requests.

---

## 📄 License

SapphAI is licensed under the **MIT License** – free to use, modify, and deploy.

**Key Notes**:  
- Works on 15+ platforms including traditional servers, serverless, and containers  
- Free tiers available on most platforms  
- Built-in rate limiting and content moderation  
- Single OpenAI API key works across all deployments  
- Automatic HTTPS/SSL on supported cloud platforms  

This universal deployment system provides a **secure, scalable AI** for games, apps, bots, and other projects.
