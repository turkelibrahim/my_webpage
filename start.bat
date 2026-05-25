@echo off
chcp 65001 >nul
title Portfolio - Dev Server
color 0A

cd /d "%~dp0"

echo.
echo  =========================================
echo   Ibrahim Turkel - Portfolio Dev Server
echo  =========================================
echo.

if not exist "node_modules\" (
    echo  [1/2] Bagimliliklar kuruluyor...
    echo.
    call npm.cmd install
    if errorlevel 1 (
        echo.
        echo  [HATA] npm install basarisiz!
        echo  Node.js yuklu mu? https://nodejs.org
        echo.
        pause
        exit /b 1
    )
    echo.
)

echo  [2/2] Sunucu baslatiliyor...
echo.
echo  Adres: http://localhost:5173
echo  Durmak icin: Ctrl + C
echo.

call npm.cmd run dev

pause
