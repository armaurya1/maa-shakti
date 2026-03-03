@echo off
echo ============================================
echo GitHub CLI Installation and Setup
echo ============================================
echo.

REM Check if GitHub CLI is installed
where gh >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [1/3] Installing GitHub CLI...
    echo.
    winget install --id GitHub.cli --silent
    echo.
    echo GitHub CLI installed! Please close and reopen PowerShell/Terminal
    echo Then run: .\setup-github.ps1
    pause
    exit /b
)

echo [1/3] GitHub CLI is already installed!
echo.

REM Check authentication
gh auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [2/3] Please authenticate with GitHub...
    echo.
    gh auth login
)

echo [2/3] Authenticated with GitHub!
echo.

echo [3/3] Creating repository and pushing code...
echo.

REM Create repo and push
gh repo create maa-shakti-hospital --public --description "Maa Shakti Hospital - Beautiful healthcare website" --source=. --remote=origin --push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo SUCCESS! Repository created!
    echo ============================================
    echo.
    echo Next Steps:
    echo 1. Go to your repository on GitHub
    echo 2. Click Settings -^> Secrets and variables -^> Actions
    echo 3. Add these 3 secrets:
    echo    - FTP_SERVER
    echo    - FTP_USERNAME  
    echo    - FTP_PASSWORD
    echo.
    echo 4. Go to Actions tab and run the deployment!
    echo.
) else (
    echo.
    echo Failed to create repository.
    echo Please check if the repository already exists.
)

pause
