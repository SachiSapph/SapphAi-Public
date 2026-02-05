# 🧠 SapphAI – Universal AI Assistant for Games

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

SapphAI is an **open-source, universal AI brain** designed primarily for **game NPCs**, but flexible enough to run anywhere.  
It provides a secure, server-based AI chat system that can be deployed to games, apps, websites, bots, and tools.

---

## ✨ Features

- 🧠 Smart AI chat and reasoning for NPCs and assistants  
- 🎮 Built with game development in mind (Unity-friendly)  
- 🌍 Universal deployment (cloud, local, container, serverless)  
- 🔐 API keys stay server-side (never inside your game build)  
- ⚡ Simple HTTP/JSON API for easy integration  
- 🛡️ Built-in rate limiting and safety filters  
- 🔄 Auto-updates when deployed directly from GitHub  
- ☁️ Free tiers available on most hosting platforms  

---

## 🚀 Quick Start – Choose Your Deployment Method

| Method | Setup Time | Coding Required | Control Level |
|------|-----------|----------------|--------------|
| **Cloud Hosting (Easy)** | ~2 minutes | None | Medium |
| **Self-Hosting (Advanced)** | 10–20 minutes | Yes | Full |

Both methods give you a **server URL** that your game or app connects to.  
The **same OpenAI API key** works everywhere.

---

## ☁️ One-Click Deploy

Deploy instantly to popular cloud platforms with automatic HTTPS/SSL:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/SachiSapph/SapphAi-Public)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/SachiSapph/SapphAi-Public)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/SachiSapph/SapphAi-Public)

Steps:
- Click a deploy button  
- Connect your GitHub account  
- Add your `OPENAI_API_KEY` in the platform dashboard  
- Deploy and copy the generated **public URL**  
- Use the URL in your game or application  

---

## 🐳 Docker Deployment

Run SapphAI on **any Docker-compatible host** (VPS, NAS, local machine):

```bash
docker pull sachi/sapphai
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=your_api_key_here \
  sachi/sapphai
```

Server will be available at:

```bash
http://localhost:3000
```

---

## ⚡ Serverless Deployment

SapphAI can run on **15+ platforms**, including serverless environments:

Supported examples:
- Cloudflare Workers  
- Vercel  
- Netlify  
- Railway  
- Render  

All serverless platforms provide:
- Automatic HTTPS  
- Easy environment variable setup  
- Scalable usage  

---

## 📦 Manual Setup (Self-Hosting)

### 1. Install Requirements

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

---

## 🔧 Configuration

Create a `.env` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Notes:
- Same API key works for **all deployment methods**
- If you fork or clone the repo, set it to **PRIVATE** to avoid abuse

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

This same request pattern works for:
- Discord bots  
- Websites  
- Mobile apps  
- Desktop tools  

---

## 📚 API Reference

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/` | Server info |
| GET | `/health` | Health check |
| POST | `/api/chat` | Main AI chat endpoint |
| GET | `/api/memory/:userId` | Conversation history |
| GET | `/api/docs` | API documentation |

---

## 🛠️ Development

Run the server locally in development mode:

```bash
npm run dev
```

Run production mode:

```bash
npm start
```

---

## 🤝 Contributing & Support

- 🐞 Issues & bug reports:  
  https://github.com/SachiSapph/SapphAi-Public/issues  

- 💬 Community & updates (Discord):  
  https://discord.gg/3kF8rbEUEF  

- 📦 Repository:  
  https://github.com/SachiSapph/SapphAi-Public  

---

## 📄 License & Support

Licensed under the **MIT License**.  
Free to use, modify, and deploy.

This repository provides a **chat-based AI assistant**.  
Future and more advanced AI systems may be released in **separate repositories** or as **supported/subscription-based projects**.

For help, updates, and future plans, join the Discord.
