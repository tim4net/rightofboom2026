#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Sets up a Windows Server VM vulnerable to CVE-2025-59287 (WSUS RCE)
    FOR EDUCATIONAL/DEMO PURPOSES ONLY

.DESCRIPTION
    Fully automated - no prompts. Run with:
    powershell -ExecutionPolicy Bypass -File setup-wsus-vulnerable.ps1

# Parameters:
# -TargetIP: Optional static IP for lab network
# -SkipReboot: Prevent automatic reboot at the end
#>

param(
    [string]$TargetIP = "",  # Optional: set static IP
    [switch]$SkipReboot = $false
)

# Stop on errors inside each step so we can catch them explicitly.
$ErrorActionPreference = "Stop"

function Write-Step($num, $total, $msg) {
    Write-Host "[$num/$total] $msg" -ForegroundColor Cyan
}

$script:stepErrors = @()

function Invoke-Step {
    param(
        [int]$Num,
        [int]$Total,
        [string]$Message,
        [scriptblock]$Action
    )

    Write-Step $Num $Total $Message
    try {
        & $Action
    } catch {
        $script:stepErrors += "[${Num}/${Total}] $Message -> $($_.Exception.Message)"
        Write-Warning "Step failed (continuing): $($_.Exception.Message)"
    }
}

function Ensure-FirewallRule {
    param(
        [string]$Name,
        [int]$Port
    )

    # Idempotent: only create if missing; otherwise ensure it's enabled/Allow.
    $existing = Get-NetFirewallRule -DisplayName $Name -ErrorAction SilentlyContinue
    if (-not $existing) {
        New-NetFirewallRule -DisplayName $Name -Direction Inbound -Protocol TCP -LocalPort $Port -Action Allow | Out-Null
    } else {
        Set-NetFirewallRule -DisplayName $Name -Enabled True -Action Allow | Out-Null
    }
}

$totalSteps = 8

Write-Host ""
Write-Host "CVE-2025-59287 VULNERABLE VM SETUP" -ForegroundColor Red
Write-Host "===================================" -ForegroundColor Red
Write-Host ""

# 1. Set static IP if provided
if ($TargetIP) {
    Invoke-Step 1 $totalSteps "Setting static IP to $TargetIP..." {
        $adapter = Get-NetAdapter | Where-Object { $_.Status -eq "Up" } | Select-Object -First 1
        if (-not $adapter) {
            throw "No active network adapter found"
        }

        # Idempotent: remove existing IPv4 addresses/routes on this adapter, then apply desired config.
        Get-NetIPAddress -InterfaceIndex $adapter.ifIndex -AddressFamily IPv4 -ErrorAction SilentlyContinue |
            Remove-NetIPAddress -Confirm:$false -ErrorAction SilentlyContinue
        Get-NetRoute -InterfaceIndex $adapter.ifIndex -ErrorAction SilentlyContinue |
            Remove-NetRoute -Confirm:$false -ErrorAction SilentlyContinue

        New-NetIPAddress -InterfaceIndex $adapter.ifIndex -IPAddress $TargetIP -PrefixLength 24 -DefaultGateway "192.168.100.1" | Out-Null
        Set-DnsClientServerAddress -InterfaceIndex $adapter.ifIndex -ServerAddresses "8.8.8.8","8.8.4.4"
    }
} else {
    Write-Step 1 $totalSteps "Skipping static IP (use -TargetIP to set)"
}

# 2. Install WSUS
Invoke-Step 2 $totalSteps "Installing WSUS role (this takes a few minutes)..." {
    Install-WindowsFeature -Name UpdateServices -IncludeManagementTools | Out-Null
}

# 3. Create content directory
$wsusPath = "C:\WSUS"
Invoke-Step 3 $totalSteps "Creating WSUS content directory..." {
    New-Item -Path $wsusPath -ItemType Directory -Force | Out-Null
}

# 4. Run WSUS post-install
Invoke-Step 4 $totalSteps "Running WSUS post-install configuration..." {
    $wsusutil = "C:\Program Files\Update Services\Tools\wsusutil.exe"
    if (Test-Path $wsusutil) {
        & $wsusutil postinstall CONTENT_DIR=$wsusPath 2>&1 | Out-Null
    } else {
        throw "wsusutil.exe not found at expected path"
    }
}

# 5. Open firewall ports
Invoke-Step 5 $totalSteps "Opening firewall ports 8530, 8531, 80, 443..." {
    @(
        @{Name="WSUS HTTP"; Port=8530},
        @{Name="WSUS HTTPS"; Port=8531},
        @{Name="HTTP"; Port=80},
        @{Name="HTTPS"; Port=443},
        @{Name="RDP"; Port=3389}
    ) | ForEach-Object {
        Ensure-FirewallRule -Name $_.Name -Port $_.Port
    }
}

# 6. Disable Windows Update
Invoke-Step 6 $totalSteps "Disabling Windows Update auto-patching..." {
    if (Get-Service wuauserv -ErrorAction SilentlyContinue) {
        Stop-Service wuauserv -Force -ErrorAction SilentlyContinue
        Set-Service wuauserv -StartupType Disabled -ErrorAction SilentlyContinue
    }

    $auPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate\AU"
    New-Item -Path $auPath -Force | Out-Null
    Set-ItemProperty -Path $auPath -Name "NoAutoUpdate" -Value 1 -Type DWord
    Set-ItemProperty -Path $auPath -Name "AUOptions" -Value 1 -Type DWord
}

# 7. Create demo sensitive data
$demoPath = "C:\SensitiveData"
Invoke-Step 7 $totalSteps "Creating demo sensitive files..." {
    New-Item -Path $demoPath -ItemType Directory -Force | Out-Null
}

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

icacls $demoPath /grant:r "Everyone:(OI)(CI)R" | Out-Null

# 8. Enable RDP
Invoke-Step 8 $totalSteps "Enabling RDP..." {
    Set-ItemProperty -Path 'HKLM:\System\CurrentControlSet\Control\Terminal Server' -Name "fDenyTSConnections" -Value 0
    Enable-NetFirewallRule -DisplayGroup "Remote Desktop" -ErrorAction SilentlyContinue
}

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

if ($script:stepErrors.Count -gt 0) {
    Write-Host ""
    Write-Host "Completed with warnings:" -ForegroundColor Yellow
    $script:stepErrors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    Write-Host ""
}
