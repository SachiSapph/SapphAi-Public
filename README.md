# SapphAI – AI Assistant for Games

## What is This?

SapphAI is an AI brain for games.  
It lets NPCs think, talk, and respond naturally to players using AI.

You run SapphAI as a small online server, and your game (for example, a Unity game) sends messages to it.  
The server replies with smart AI responses that you can use for NPC dialogue, behavior, or player chat.

This guide is written for **non-technical users** and explains everything step by step.

---

## Complete Setup Guide (5 Steps)

### Step 1: Download the Code

You will need **Git** and **Visual Studio Code (VS Code)**.

Download Git:  
[https://git-scm.com](https://git-scm.com)

Download Visual Studio Code:  
[https://code.visualstudio.com](https://code.visualstudio.com)

After installing both, open **VS Code**.

Open the built-in terminal in VS Code:
- Windows: `Ctrl + ``  
- Mac: `Cmd + ``  

Run these commands:

```bash
git clone https://github.com/SachiSapph/SapphAi-Public.git
cd SapphAi-Public
```

This downloads the project and opens its folder.

---

### Step 2: Get OpenAI API Key

SapphAI uses OpenAI to power NPC intelligence.

1. Go to: [https://platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Click **View API keys**
4. Click **Create new secret key**
5. Copy the key and save it somewhere safe

You will use this key in the next step.

---

### Step 3: Add API Key to Project

In VS Code, inside the project folder:

1. Create a new file named `.env`
2. Open the file and add **exactly** this line:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

Replace `your_openai_api_key_here` with your real OpenAI API key.

Save the file.

---

### Step 4: Deploy to Render

Render lets you run SapphAI online for free.

1. Go to: [https://render.com](https://render.com)
2. Sign up or log in
3. Click **New +**
4. Choose **Web Service**
5. Connect your GitHub account
6. Select the **SapphAi-Public** repository
7. Set these options:
   - Runtime: **Node**
   - Branch: `main`
8. Add an Environment Variable:
   - Key: `OPENAI_API_KEY`
   - Value: your OpenAI API key
9. Click **Create Web Service**

Wait until the deployment finishes successfully.

---

### Step 5: Get Your Server URL

After deployment is done:

1. Open your service on Render
2. Copy the **Public URL** at the top  
   Example:

```bash
https://sapphai.onrender.com
```

This URL is your AI server address.  
You will use it inside your game.

---

## How to Use in Unity

1. Open your Unity project
2. Decide where NPC dialogue or player chat happens
3. Send HTTP requests to your SapphAI server URL
4. Send player or NPC text as input
5. Use the AI response as dialogue or behavior

Unity controls animations, movement, and visuals.  
SapphAI controls thinking and conversation.

You can connect using:
- `UnityWebRequest`
- Any HTTP networking method you prefer

---

## Troubleshooting

If the server does not respond:
- Check Render logs
- Make sure deployment finished successfully

If AI responses are empty:
- Confirm your OpenAI API key is correct
- Make sure the environment variable exists in Render

If Unity cannot connect:
- Check the server URL
- Make sure it starts with `https://`

If the first request is slow:
- Free Render services sleep when inactive
- First request may take a few seconds to wake up

---

## Support

Report issues or ask for help here:  
[https://github.com/SachiSapph/SapphAi-Public/issues](https://github.com/SachiSapph/SapphAi-Public/issues)

Project repository:  
[https://github.com/SachiSapph/SapphAi-Public](https://github.com/SachiSapph/SapphAi-Public)
