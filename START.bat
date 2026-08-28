@echo off
title CropVision AI
color 0A
cd /d "%~dp0"

echo.
echo  ========================================
echo    CropVision AI - Plant Disease Detection
echo  ========================================
echo.

:: Kill old processes
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM cloudflared.exe /T >nul 2>&1
timeout /t 2 /nobreak >nul

:: Start server
echo  Starting server...
start /b node server/server.js >nul 2>&1
timeout /t 6 /nobreak >nul

:: Check server
curl -s http://localhost:8787/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Server failed to start!
    pause
    exit /b 1
)
echo  Server OK
echo.
echo  Creating public link... (wait 15 seconds)
echo  ========================================
echo.

"C:\Users\vinot\AppData\Local\npm-cache\_npx\8a26fc3a61fe4212\node_modules\cloudflared\bin\cloudflared.exe" tunnel --url http://localhost:8787
