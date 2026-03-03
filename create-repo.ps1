# GitHub Repository Creation via API
# No GitHub CLI needed - uses REST API directly

Write-Host "GitHub Repository Auto-Setup" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

# Get Personal Access Token
Write-Host "Step 1: Generate GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host "Visit: https://github.com/settings/tokens/new" -ForegroundColor White
Write-Host "- Give it a name like: Hospital Website Deploy" -ForegroundColor Gray
Write-Host "- Check the repo checkbox (full control)" -ForegroundColor Gray
Write-Host "- Generate and copy the token" -ForegroundColor Gray
Write-Host ""

$token = Read-Host "Paste your GitHub Personal Access Token here" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$tokenString = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($tokenString)) {
    Write-Host "Token required. Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host ""
$username = Read-Host "Your GitHub username (default: armaurya1)"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "armaurya1"
}

Write-Host ""
$repoName = Read-Host "Repository name (default: maa-shakti-hospital)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "maa-shakti-hospital"
}

Write-Host ""
Write-Host "Creating repository $username/$repoName..." -ForegroundColor Yellow

# API Headers
$headers = @{
    "Authorization" = "Bearer $tokenString"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

# Repository payload
$body = @{
    "name" = $repoName
    "description" = "Maa Shakti Hospital - Beautiful healthcare website with automated deployment"
    "private" = $false
    "auto_init" = $false
} | ConvertTo-Json

try {
    # Create repository
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "Repository created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Cyan
    Write-Host ""
    
    # Configure git remote and push
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    
    $remoteUrl = $response.clone_url
    
    # Check if remote exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        git remote set-url origin $remoteUrl
    } else {
        git remote add origin $remoteUrl
    }
    
    # Push to GitHub
    git push -u origin main 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Repository: $($response.html_url)" -ForegroundColor White
        Write-Host ""
        Write-Host "NEXT STEPS:" -ForegroundColor Cyan
        Write-Host "1. Configure Auto-Deploy Secrets" -ForegroundColor White
        Write-Host "   Go to: $($response.html_url)/settings/secrets/actions" -ForegroundColor Gray
        Write-Host "   Add these 3 secrets:" -ForegroundColor Gray
        Write-Host "   - FTP_SERVER: your InfinityFree FTP hostname" -ForegroundColor Gray
        Write-Host "   - FTP_USERNAME: your FTP username" -ForegroundColor Gray
        Write-Host "   - FTP_PASSWORD: your FTP password" -ForegroundColor Gray
        Write-Host ""
        Write-Host "2. Run the deployment workflow" -ForegroundColor White
        Write-Host "   Go to: $($response.html_url)/actions" -ForegroundColor Gray
        Write-Host "   Click: Deploy to InfinityFree > Run workflow" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Your site will auto-deploy on every push!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "Repository created but push may need authentication." -ForegroundColor Yellow
        Write-Host "Try pushing manually: git push -u origin main" -ForegroundColor Gray
    }
    
} catch {
    Write-Host ""
    Write-Host "Error creating repository!" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "Repository $repoName already exists!" -ForegroundColor Yellow
        Write-Host "Options:" -ForegroundColor White
        Write-Host "1. Use a different repository name" -ForegroundColor Gray
        Write-Host "2. Delete the existing repo and try again" -ForegroundColor Gray
        Write-Host "3. Push to existing repo:" -ForegroundColor Gray
        Write-Host "   git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor DarkGray
        Write-Host "   git push -u origin main" -ForegroundColor DarkGray
    } elseif ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Authentication failed!" -ForegroundColor Yellow
        Write-Host "Make sure:" -ForegroundColor White
        Write-Host "- Token is correct and not expired" -ForegroundColor Gray
        Write-Host "- Token has repo scope checked" -ForegroundColor Gray
    } else {
        Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.ErrorDetails.Message) {
            $errorObj = $_.ErrorDetails.Message | ConvertFrom-Json
            Write-Host "GitHub says: $($errorObj.message)" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Read-Host "Press Enter to close"
