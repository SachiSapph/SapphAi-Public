# SapphAI – Development

SapphAI is an open-source **multifunction AI assistant**.  
While it is **primarily designed for games and NPCs**, it can be deployed almost anywhere an AI chat system is needed.

You can use SapphAI for:
- 🎮 Games (NPCs, companions, dialogue systems)
- 💬 Discord bots
- 🌐 Websites
- 📱 Apps
- 🖥️ Custom tools and services

SapphAI runs as a **separate server**, keeping your AI logic and API keys secure and outside your main application.

---

## ✨ Features

- 🧠 Intelligent AI chat and reasoning  
- 🔌 Works with games, apps, bots, and websites  
- ☁️ Cloud-hosted or 🖥️ self-hosted  
- 🔐 API keys never exposed to clients  
- ⚙️ Simple HTTP-based interface  
- 🧩 Easy to integrate with Unity and other engines  

---

## 🚀 Quick Start

### Hosting Options Comparison

| Option | Best For | Difficulty | Control |
|------|---------|-----------|---------|
| **Option A: Cloud Hosting** | Fast setup, beginners | Very Easy | Lower |
| **Option B: Self-Hosting** | Privacy, customization | Medium | Full |

---

### Option A: Easy Cloud Hosting (No Coding Needed)

Deploy SapphAI with one click on your preferred platform:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/SachiSapph/SapphAi-Public)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SachiSapph/SapphAi-Public)

General steps:

- Click a deploy button  
- Connect your GitHub account  
- Add your **OpenAI API key** in the platform dashboard  
- Deploy the service  
- Copy the generated **public URL**  
- Use the URL in your app, game, or bot  

Platform notes:
- **Render:** Free tier, automatic HTTPS, sleeps when inactive  
- **Railway:** Free credits, simple environment variable setup  
- **Vercel:** Fast deployments, ideal for web services  

---

### Option B: Self-Hosting (More Control)

Self-hosting lets you run SapphAI on your own PC or server.  
This is ideal if you want full control or plan to extend the system.

---

## 📦 Installation (Self-Hosting)

### 1. Install Required Tools

Git:  
https://git-scm.com  

Node.js (LTS recommended):  
https://nodejs.org  

Visual Studio Code (recommended editor):  
https://code.visualstudio.com  

---

### 2. Download the Project

Open VS Code and open the built-in terminal:

- **Windows:** `Ctrl + ``  
- **Mac:** `Cmd + ``  

Run:

```bash
git clone https://github.com/SachiSapph/SapphAi-Public.git
cd SapphAi-Public
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Configure API Key

Create a file named `.env` in the project root.

Add exactly:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Save the file.

⚠️ **Security Advice:**  
If you push this project to GitHub, set the repository to **Private** to prevent API key or script abuse.

---

### 5. Run Locally

```bash
npm start
```

You will receive a local server URL, for example:

```bash
http://localhost:3000
```

This URL works the same way as a cloud-hosted one.

---

## ⚙️ Configuration

- The **same OpenAI API key** works for all hosting methods  
- Cloud hosting:
  - Add `OPENAI_API_KEY` as an environment variable  
- Self-hosting:
  - Store the key in the `.env` file  

SapphAI always runs as a server and provides a **URL endpoint** for any client.

---

## 🎮 Unity Integration

Below is a simple Unity C# example for sending and receiving messages from SapphAI.

```csharp
using UnityEngine;
using UnityEngine.Networking;
using System.Collections;

public class SapphAIClient : MonoBehaviour
{
    private string serverUrl = "https://your-sapphai-server-url/chat";

    public void SendMessage(string message)
    {
        StartCoroutine(SendRequest(message));
    }

    IEnumerator SendRequest(string message)
    {
        string json = "{\"message\":\"" + message + "\"}";
        byte[] bodyRaw = System.Text.Encoding.UTF8.GetBytes(json);

        UnityWebRequest request = new UnityWebRequest(serverUrl, "POST");
        request.uploadHandler = new UploadHandlerRaw(bodyRaw);
        request.downloadHandler = new DownloadHandlerBuffer();
        request.SetRequestHeader("Content-Type", "application/json");

        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Debug.Log("AI Response: " + request.downloadHandler.text);
        }
        else
        {
            Debug.LogError("Request failed: " + request.error);
        }
    }
}
```

This same request pattern works for:
- Discord bots  
- Web apps  
- Mobile apps  
- Desktop tools  

---

## 🔄 Updates & Versioning

- This AI is **updated from time to time**
- If you host or deploy **directly from the GitHub repository**, your server will **automatically update** when we push changes
- If you **download the files manually**, updates will **not** apply automatically
  - Downloaded files cannot update themselves
  - You must pull new changes manually if you want updates

This version of SapphAI is a **simple but solid chat-based AI**, designed to be integrated anywhere possible.

Future and more advanced versions may:
- Live in a **new GitHub repository**
- Be **support-based or subscription-based**
- Include additional features and improvements

For news, future access, or setup help, please join our Discord.

---

## 🤝 Support & Links

💬 Join our Discord (updates, development talk, support):  
https://discord.gg/3kF8rbEUEF  

🐞 Bug reports and issues:  
https://github.com/SachiSapph/SapphAi-Public/issues  

📦 Repository:  
https://github.com/SachiSapph/SapphAi-Public  

---

### Final Notes

- This is a **chat-only AI assistant**
- No Text-to-Speech or Speech-to-Text included
- Designed for **games first**, but usable everywhere
- Cloud hosting = easiest setup  
- Self-hosting = maximum control  

Both approaches give you a **server URL** usable by any platform.
