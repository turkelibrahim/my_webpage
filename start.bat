@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js 18 or later is required.
  pause
  exit /b 1
)
echo Starting IBRAHIM TURKEL PORTFOLIO V6...
echo This version uses port 5175 to avoid the previous preview.
node scripts\serve.mjs . 5175
pause
