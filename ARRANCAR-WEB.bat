@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ================================================
echo   1/2  Regenerando el cliente de la base de datos
echo        (Prisma -> PostgreSQL / Neon)
echo ================================================
call npx prisma generate
echo.
echo ================================================
echo   2/2  Arrancando la web en http://localhost:3000
echo        Deja esta ventana ABIERTA mientras la uses.
echo        Para parar la web: pulsa Ctrl + C aqui.
echo ================================================
call npm run dev
pause
