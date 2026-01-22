#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Bootstrap script for Right of Boom 2026 Lab VM Setup

.DESCRIPTION
    This stub downloads the full setup scripts from the latest GitHub release
    and configures the VM for the Attack Path Validator demo.

.NOTES
    Repository: https://github.com/tim4net/rightofboom2026
    Run as Administrator in PowerShell

.EXAMPLE
    iex (irm https://github.com/tim4net/rightofboom2026/releases/latest/download/setup-lab-vm.ps1)
#>

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$RepoOwner = "tim4net"
$RepoName = "rightofboom2026"
$ScriptsDir = "C:\LabScripts"

Write-Host @"

╔═══════════════════════════════════════════════════════════════════╗
║         RIGHT OF BOOM 2026 - LAB VM SETUP                        ║
║         Attack Path Validator Demo Environment                    ║
╚═══════════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Cyan

# Check for admin rights
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[ERROR] This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "        Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

Write-Host "[*] Checking for latest release..." -ForegroundColor Cyan

# Get latest release from GitHub API
try {
    $releaseUrl = "https://api.github.com/repos/$RepoOwner/$RepoName/releases/latest"
    $release = Invoke-RestMethod -Uri $releaseUrl -Headers @{ "User-Agent" = "PowerShell" }
    $version = $release.tag_name
    Write-Host "[+] Found release: $version" -ForegroundColor Green
} catch {
    Write-Host "[!] Could not fetch latest release, using 'latest' tag" -ForegroundColor Yellow
    $version = "latest"
}

# Create scripts directory
Write-Host "[*] Creating $ScriptsDir..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path $ScriptsDir | Out-Null

# Define files to download
$baseUrl = "https://github.com/$RepoOwner/$RepoName/releases/latest/download"
$files = @(
    @{ Name = "stage-gaps.ps1"; Description = "Gap staging script" },
    @{ Name = "teardown-lab-vm.ps1"; Description = "Cleanup script" },
    @{ Name = "endpoint-collector.ps1"; Description = "Config collector" }
)

# Download each file
foreach ($file in $files) {
    Write-Host "[*] Downloading $($file.Name)..." -ForegroundColor Cyan
    try {
        $url = "$baseUrl/$($file.Name)"
        $dest = Join-Path $ScriptsDir $file.Name
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
        Write-Host "[+] $($file.Description) saved to $dest" -ForegroundColor Green
    } catch {
        Write-Host "[!] Failed to download $($file.Name): $_" -ForegroundColor Red
        Write-Host "    You may need to download manually from:" -ForegroundColor Yellow
        Write-Host "    $url" -ForegroundColor Yellow
    }
}

# Run the staging script
$stageScript = Join-Path $ScriptsDir "stage-gaps.ps1"
if (Test-Path $stageScript) {
    Write-Host ""
    Write-Host "[*] Running gap staging script..." -ForegroundColor Cyan
    Write-Host "    This will create intentional security gaps for the demo." -ForegroundColor Yellow
    Write-Host ""

    & $stageScript
} else {
    Write-Host "[!] stage-gaps.ps1 not found - skipping gap staging" -ForegroundColor Yellow
}

# Install Atomic Red Team
Write-Host ""
Write-Host "[*] Installing Atomic Red Team..." -ForegroundColor Cyan

try {
    # Check if already installed
    if (Get-Module -ListAvailable -Name invoke-atomicredteam) {
        Write-Host "[+] Atomic Red Team module already installed" -ForegroundColor Green
    } else {
        Install-Module -Name invoke-atomicredteam -Scope CurrentUser -Force -AllowClobber
        Write-Host "[+] Atomic Red Team module installed" -ForegroundColor Green
    }

    # Install atomics if not present
    $atomicsPath = "$env:USERPROFILE\AtomicRedTeam\atomics"
    if (-not (Test-Path $atomicsPath)) {
        Write-Host "[*] Downloading atomic test definitions..." -ForegroundColor Cyan
        Import-Module invoke-atomicredteam -Force
        Install-AtomicRedTeam -getAtomics -Force
        Write-Host "[+] Atomic test definitions installed" -ForegroundColor Green
    } else {
        Write-Host "[+] Atomic test definitions already present" -ForegroundColor Green
    }
} catch {
    Write-Host "[!] Failed to install Atomic Red Team: $_" -ForegroundColor Red
    Write-Host "    You can install manually with:" -ForegroundColor Yellow
    Write-Host "    Install-Module -Name invoke-atomicredteam -Scope CurrentUser -Force" -ForegroundColor Yellow
}

# Create desktop shortcut
Write-Host ""
Write-Host "[*] Creating desktop shortcut..." -ForegroundColor Cyan
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "Lab Scripts.lnk"

try {
    $shell = New-Object -ComObject WScript.Shell
    $shortcut = $shell.CreateShortcut($shortcutPath)
    $shortcut.TargetPath = $ScriptsDir
    $shortcut.Description = "Right of Boom Lab Scripts"
    $shortcut.Save()
    Write-Host "[+] Desktop shortcut created" -ForegroundColor Green
} catch {
    Write-Host "[!] Could not create shortcut: $_" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host @"
╔═══════════════════════════════════════════════════════════════════╗
║                        SETUP COMPLETE                             ║
╚═══════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Green

Write-Host "Scripts installed to: $ScriptsDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Verify gaps:    & $ScriptsDir\endpoint-collector.ps1" -ForegroundColor White
Write-Host "  2. Take a snapshot named 'Demo Ready'" -ForegroundColor White
Write-Host "  3. Review the demo at slide 22 in the presentation" -ForegroundColor White
Write-Host ""
Write-Host "To teardown after demo:" -ForegroundColor Yellow
Write-Host "  & $ScriptsDir\teardown-lab-vm.ps1" -ForegroundColor White
Write-Host ""
