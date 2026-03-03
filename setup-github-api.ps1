# ============================================
# Direct GitHub API Repository Creation
# ============================================
# This uses GitHub's REST API directly (no CLI needed)

Write-Host "🚀 GitHub Repository Setup via API" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Get GitHub Personal Access Token
Write-Host "To create a GitHub repository, we need a Personal Access Token." -ForegroundColor Yellow
Write-Host ""
Write-Host "Quick Setup:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/settings/tokens/new" -ForegroundColor Gray
Write-Host "2. Give it a name (e.g., Hospital Website Deploy)" -ForegroundColor Gray
Write-Host "3. Check the repo scope (full control of repositories)" -ForegroundColor Gray
Write-Host "4. Click Generate token and copy it" -ForegroundColor Gray
Write-Host ""

$token = Read-Host "Enter your GitHub Personal Access Token (paste here)"
if ([string]::IsNullOrWhiteSpace($token)) {
    Write-Host "❌ Token required! Exiting..." -ForegroundColor Red
    exit 1
}

Write-Host ""
$username = Read-Host "Enter your GitHub username (armaurya1)"
if ([string]::IsNullOrWhiteSpace($username)) {
    $username = "armaurya1"
}

Write-Host ""
$repoName = Read-Host "Enter repository name (press Enter for 'maa-shakti-hospital')"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "maa-shakti-hospital"
}

Write-Host ""
Write-Host "Creating repository '$username/$repoName'..." -ForegroundColor Yellow

# Create repository using GitHub API
$headers = @{
    "Authorization" = "Bearer $token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

$body = @{
    "name" = $repoName
    "description" = "Maa Shakti Hospital - Beautiful healthcare website with automated deployment"
    "private" = $false
    "auto_init" = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✅ Repository created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Repository: $($response.html_url)" -ForegroundColor Cyan
    Write-Host ""
    
    # Add remote and push
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    
    $remoteUrl = $response.clone_url
    
    # Check if remote already exists
    $existingRemote = git remote get-url origin 2>$null
    if ($existingRemote) {
        Write-Host "Updating existing remote..." -ForegroundColor Gray
        git remote set-url origin $remoteUrl
    } else {
        Write-Host "Adding remote..." -ForegroundColor Gray
        git remote add origin $remoteUrl
    }
    
    Write-Host "Pushing to main branch..." -ForegroundColor Gray
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🔗 View your repository:" -ForegroundColor Cyan
        Write-Host "   $($response.html_url)" -ForegroundColor White
        Write-Host ""
        Write-Host "🔑 Configure Auto-Deploy Secrets:" -ForegroundColor Cyan
        Write-Host "   1. Go to: $($response.html_url)/settings/secrets/actions" -ForegroundColor White
        Write-Host "   2. Click New repository secret and add:" -ForegroundColor White
        Write-Host "      - Name: FTP_SERVER     | Value: Your InfinityFree FTP host" -ForegroundColor Gray
        Write-Host "      - Name: FTP_USERNAME   | Value: Your FTP username" -ForegroundColor Gray
        Write-Host "      - Name: FTP_PASSWORD   | Value: Your FTP password" -ForegroundColor Gray
        Write-Host ""
        Write-Host "   3. Go to Actions tab: $($response.html_url)/actions" -ForegroundColor White
        Write-Host "   4. Run Deploy to InfinityFree workflow" -ForegroundColor White
        Write-Host ""
        Write-Host "🎉 All done! Your site will auto-deploy on every push!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "⚠️  Repository created but push failed." -ForegroundColor Yellow
        Write-Host "   You may need to authenticate. Try:" -ForegroundColor Yellow
        Write-Host "   git push -u origin main" -ForegroundColor Gray
    }
    
} catch {
    Write-Host ""
    Write-Host "❌ Failed to create repository!" -ForegroundColor Red
    Write-Host ""
    
    if ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "Repository $repoName already exists!" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Options:" -ForegroundColor White
        Write-Host "1. Use a different name (run script again)" -ForegroundColor Gray
        Write-Host "2. Delete the existing repo and try again" -ForegroundColor Gray
        Write-Host "3. Push to existing repo manually:" -ForegroundColor Gray
        Write-Host "   git remote add origin https://github.com/$username/$repoName.git" -ForegroundColor DarkGray
        Write-Host "   git push -u origin main" -ForegroundColor DarkGray
    } elseif ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "Authentication failed! Check your token." -ForegroundColor Yellow
        Write-Host "Make sure the token has repo scope." -ForegroundColor Gray
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
