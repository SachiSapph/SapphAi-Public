# SapphAI – AI Assistant for Games

## What is This?

SapphAI is an AI brain for games.  
It is designed to make NPCs smarter and allow natural chat between players and game characters.

SapphAI runs as a **separate server**, not inside Unity itself.  
This makes it safer and more flexible, because your AI logic and API keys stay outside your game build.

Important notes about this version:
- This is a **chat-bot only**
- There is **no TTS (Text-to-Speech)**  
- There is **no STT/SST (Speech-to-Text)**  
- It is a **mid to high level AI chat system** made specifically for **game development**
- It is safe to use because it runs on your own PC and GitHub / Render setup

---

## Complete Setup Guide (5 Steps)

### Step 1: Download the Code

You will need **Git** and **Visual Studio Code (VS Code)**.

Download Git:  
[https://git-scm.com](https://git-scm.com)

Download Visual Studio Code:  
[https://code.visualstudio.com](https://code.visualstudio.com)

After installing both, open **VS Code**.

Open the built-in terminal:
- **Windows:** `Ctrl + ``  
- **Mac:** `Cmd + ``  

Run these commands:

```bash
git clone https://github.com/SachiSapph/SapphAi-Public.git
cd SapphAi-Public
```

This downloads the project to your computer.

---

### Step 2: Get OpenAI API Key

SapphAI uses OpenAI to power NPC intelligence.

1. Go to: [https://platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Click **View API keys**
4. Click **Create new secret key**
5. Copy the key and keep it safe

⚠️ **Important:** Never share your API key with anyone.
⚠️ **Important:** OpenAi does require money (e.g. $10).

---

### Step 3: Add API Key to Project

Inside the project folder in VS Code:

1. Create a new file named `.env`
2. Open the file and add **exactly** this line:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your real OpenAI API key.

Save the file.

---

### Step 4: Deploy to Render

Render allows you to run the AI server online for free.

1. Go to: [https://render.com](https://render.com)
2. Sign up or log in
3. Click **New +**
4. Select **Web Service**
5. Connect your GitHub account
6. Select the **SapphAi-Public** repository
7. Set the following options:
   - Runtime: **Node**
   - Branch: `main`
8. Add an Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: your OpenAI API key
9. Click **Create Web Service**

Wait until deployment finishes.

---

### Step 5: Get Your Server URL

After deployment is complete:

1. Open your service in Render
2. Copy the **Public URL** shown at the top

Example:

```bash
https://sapphai.onrender.com
```

This is the server address your game will connect to.

---

## How to Use in Unity

1. Open your Unity project
2. Decide where NPC dialogue or player chat should happen
3. Send HTTP requests to your SapphAI server URL
4. Send player or NPC messages as text
5. Use the AI response for dialogue or logic

Unity handles:
- Animations
- Movement
- UI
- Gameplay

SapphAI handles:
- Thinking
- Conversation
- AI responses

You can connect using:
- `UnityWebRequest`
- Any HTTP client you prefer

---

## Troubleshooting

If the server does not respond:
- Check Render logs
- Make sure deployment completed successfully

If AI responses are missing:
- Confirm your OpenAI API key is correct
- Make sure the environment variable exists on Render

If Unity cannot connect:
- Verify the server URL
- Ensure it starts with `https://`

If the first request is slow:
- Free Render services sleep when inactive
- First request may take a few seconds to wake up

---

## Support

For updates, development discussion, and help, join our Discord:  
[https://discord.gg/3kF8rbEUEF](https://discord.gg/3kF8rbEUEF)

⚠️ **Security Advice:**  
If you fork or clone this project, set your GitHub repository to **Private**.  
This prevents others from abusing your OpenAI API key or server scripts.

Bug reports and issues:  
[https://github.com/SachiSapph/SapphAi-Public/issues](https://github.com/SachiSapph/SapphAi-Public/issues)

Main repository:  
[https://github.com/SachiSapph/SapphAi-Public](https://github.com/SachiSapph/SapphAi-Public)
