#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Sets up a Windows Server VM vulnerable to CVE-2025-59287 (WSUS RCE)
    FOR EDUCATIONAL/DEMO PURPOSES ONLY

.DESCRIPTION
    Fully automated - no prompts. Run with:
    powershell -ExecutionPolicy Bypass -File setup-wsus-vulnerable.ps1

.PARAMETER Confirm
    Skip safety confirmation (default: auto-confirmed for automation)
#>

param(
    [string]$TargetIP = "",  # Optional: set static IP
    [switch]$SkipReboot = $false
)

$ErrorActionPreference = "SilentlyContinue"

function Write-Step($num, $total, $msg) {
    Write-Host "[$num/$total] $msg" -ForegroundColor Cyan
}

$totalSteps = 8

Write-Host ""
Write-Host "CVE-2025-59287 VULNERABLE VM SETUP" -ForegroundColor Red
Write-Host "===================================" -ForegroundColor Red
Write-Host ""

# 1. Set static IP if provided
if ($TargetIP) {
    Write-Step 1 $totalSteps "Setting static IP to $TargetIP..."
    $adapter = Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object -First 1
    if ($adapter) {
        Remove-NetIPAddress -InterfaceIndex $adapter.ifIndex -Confirm:$false 2>$null
        Remove-NetRoute -InterfaceIndex $adapter.ifIndex -Confirm:$false 2>$null
        New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress $TargetIP -PrefixLength 24 -DefaultGateway "192.168.100.1" | Out-Null
        Set-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -ServerAddresses "8.8.8.8","8.8.4.4"
    }
} else {
    Write-Step 1 $totalSteps "Skipping static IP (use -TargetIP to set)"
}

# 2. Install WSUS
Write-Step 2 $totalSteps "Installing WSUS role (this takes a few minutes)..."
Install-WindowsFeature -Name UpdateServices -IncludeManagementTools | Out-Null

# 3. Create content directory
Write-Step 3 $totalSteps "Creating WSUS content directory..."
$wsusPath = "C:\WSUS"
New-Item -Path $wsusPath -ItemType Directory -Force | Out-Null

# 4. Run WSUS post-install
Write-Step 4 $totalSteps "Running WSUS post-install configuration..."
$wsusutil = "C:\Program Files\Update Services\Tools\wsusutil.exe"
if (Test-Path $wsusutil) {
    & $wsusutil postinstall CONTENT_DIR=$wsusPath 2>&1 | Out-Null
}

# 5. Open firewall ports
Write-Step 5 $totalSteps "Opening firewall ports 8530, 8531, 80, 443..."
@(
    @{Name="WSUS HTTP"; Port=8530},
    @{Name="WSUS HTTPS"; Port=8531},
    @{Name="HTTP"; Port=80},
    @{Name="HTTPS"; Port=443},
    @{Name="RDP"; Port=3389}
) | ForEach-Object {
    New-NetFirewallRule -DisplayName $_.Name -Direction Inbound -Protocol TCP -LocalPort $_.Port -Action Allow 2>$null | Out-Null
}

# 6. Disable Windows Update
Write-Step 6 $totalSteps "Disabling Windows Update auto-patching..."
Stop-Service wuauserv -Force 2>$null
Set-Service wuauserv -StartupType Disabled 2>$null

$auPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU"
New-Item -Path $auPath -Force 2>$null | Out-Null
Set-ItemProperty -Path $auPath -Name "NoAutoUpdate" -Value 1 -Type DWord
Set-ItemProperty -Path $auPath -Name "AUOptions" -Value 1 -Type DWord

# 7. Create demo sensitive data
Write-Step 7 $totalSteps "Creating demo sensitive files..."
$demoPath = "C:\SensitiveData"
New-Item -Path $demoPath -ItemType Directory -Force | Out-Null

@"
CONFIDENTIAL - MSP Client Database
===================================
Acme Corp      | 192.168.1.0/24  | admin@acme.local      | Summer2024!
BigCo Inc      | 10.0.0.0/16     | svc_backup@bigco.int  | Backup123!
SmallBiz LLC   | 172.16.0.0/24   | helpdesk@smallbiz.loc | Welcome1!

Next password rotation: Never (lol)
"@ | Set-Content "$demoPath\client_list.txt"

@"
Infrastructure Credentials - DO NOT SHARE
==========================================
vCenter:    vcadmin / VMware123!
FortiGate:  admin / Fortinet2024
Synology:   administrator / NAS@dmin!
Veeam:      svc_veeam / Backup2024!

Domain Admin: psyche\da_admin / DA_Summer2024!
"@ | Set-Content "$demoPath\infrastructure_creds.txt"

@"
Ransomware Response Playbook
=============================
1. Don't panic
2. Call cyber insurance: 1-800-555-0199
3. Policy number: CYB-2024-88431
4. Bitcoin wallet (for payment): 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa

Backup status: Last successful backup was 47 days ago
"@ | Set-Content "$demoPath\incident_response.txt"

icacls $demoPath /grant "Everyone:(OI)(CI)R" | Out-Null

# 8. Enable RDP
Write-Step 8 $totalSteps "Enabling RDP..."
Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 0
Enable-NetFirewallRule -DisplayGroup "Remote Desktop" 2>$null

# Done
Write-Host ""
Write-Host "SETUP COMPLETE" -ForegroundColor Green
Write-Host "==============" -ForegroundColor Green
Write-Host ""

$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*" }).IPAddress | Select-Object -First 1
Write-Host "VM IP: $ip" -ForegroundColor Yellow
Write-Host ""
Write-Host "WSUS endpoints:"
Write-Host "  http://${ip}:8530/ClientWebService/client.asmx"
Write-Host "  http://${ip}:8531/ClientWebService/client.asmx"
Write-Host ""
Write-Host "Sensitive files: C:\SensitiveData\"
Write-Host ""

if (-not $SkipReboot) {
    Write-Host "Rebooting in 10 seconds... (use -SkipReboot to prevent)" -ForegroundColor Yellow
    Start-Sleep -Seconds 10
    Restart-Computer -Force
} else {
    Write-Host "Skipping reboot. You may need to reboot for WSUS to fully initialize." -ForegroundColor Yellow
}
