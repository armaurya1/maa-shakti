# ============================================
# GitHub Repository Auto-Setup Script
# ============================================
# This script automatically creates a GitHub repository and pushes your code

param(
    [string]$RepoName = "maa-shakti-hospital",
    [string]$Description = "Maa Shakti Hospital - Beautiful healthcare website with automated deployment",
    [switch]$Private = $false
)

Write-Host "🚀 GitHub Repository Auto-Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
Write-Host "Checking for GitHub CLI..." -ForegroundColor Yellow
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "❌ GitHub CLI (gh) is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install GitHub CLI:" -ForegroundColor Yellow
    Write-Host "  Method 1: Using winget" -ForegroundColor White
    Write-Host "    winget install GitHub.cli" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Method 2: Using Chocolatey" -ForegroundColor White
    Write-Host "    choco install gh" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  Method 3: Download from" -ForegroundColor White
    Write-Host "    https://cli.github.com/" -ForegroundColor Gray
    Write-Host ""
    exit 1
}

Write-Host "✅ GitHub CLI found!" -ForegroundColor Green
Write-Host ""

# Check if user is authenticated
Write-Host "Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not authenticated with GitHub!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please authenticate with GitHub CLI:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✅ Authenticated with GitHub!" -ForegroundColor Green
Write-Host ""

# Check if git repo is initialized
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  Git repository not initialized. Initializing..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Maa Shakti Hospital website"
    git branch -M main
    Write-Host "✅ Git repository initialized!" -ForegroundColor Green
}

# Create GitHub repository
Write-Host "Creating GitHub repository '$RepoName'..." -ForegroundColor Yellow

$visibility = if ($Private) { "--private" } else { "--public" }

$createCommand = "gh repo create $RepoName $visibility --description `"$Description`" --source=. --remote=origin --push"

Write-Host "Running: $createCommand" -ForegroundColor Gray
Invoke-Expression $createCommand

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS! Repository created and code pushed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Repository URL:" -ForegroundColor Cyan
    $repoUrl = gh repo view --json url -q .url
    Write-Host "   $repoUrl" -ForegroundColor White
    Write-Host ""
    Write-Host "🔑 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to: $repoUrl/settings/secrets/actions" -ForegroundColor White
    Write-Host "   2. Add these secrets for InfinityFree deployment:" -ForegroundColor White
    Write-Host "      - FTP_SERVER (your FTP hostname)" -ForegroundColor Gray
    Write-Host "      - FTP_USERNAME (your FTP username)" -ForegroundColor Gray
    Write-Host "      - FTP_PASSWORD (your FTP password)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "   3. Go to Actions tab and run 'Deploy to InfinityFree' workflow" -ForegroundColor White
    Write-Host ""
    Write-Host "🎉 All done! Your website will auto-deploy on every push!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Failed to create repository!" -ForegroundColor Red
    Write-Host "   Check if a repository with this name already exists" -ForegroundColor Yellow
    exit 1
}
