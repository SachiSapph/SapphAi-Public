@echo off
echo Creating SapphAI files...

REM Create folders
mkdir config 2>nul
mkdir src 2>nul
mkdir src\core 2>nul
mkdir src\utils 2>nul
mkdir src\middleware 2>nul
mkdir public 2>nul

REM Create package.json
echo {
echo   "name": "sapphai-chat-bot",
echo   "version": "1.0.0",
echo   "main": "server.js",
echo   "scripts": {
echo     "start": "node server.js",
echo     "dev": "nodemon server.js"
echo   },
echo   "dependencies": {
echo     "express": "^4.18.2",
echo     "cors": "^2.8.5",
echo     "axios": "^1.6.0",
echo     "dotenv": "^16.3.1",
echo     "express-rate-limit": "^7.1.5"
echo   }
echo } > package.json

echo Created package.json

REM Create .env
echo PORT=3000 > .env
echo NODE_ENV=development >> .env
echo OPENAI_API_KEY=your_openai_api_key_here >> .env
echo OPENAI_MODEL=gpt-3.5-turbo >> .env
echo SUPPORT_LINK=https://ko-fi.com/sapphai >> .env

echo Created .env

echo Setup complete!
echo.
echo 1. Edit .env file with your real OpenAI API key
echo 2. Run: npm install
echo 3. Run: npm run dev
echo 4. Open: http://localhost:3000
pause