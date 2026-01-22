# SQL Server Express - Vulnerable Lab Setup
# Run as Administrator on Windows Server VM
#
# Downloads and installs SQL Server Express with weak SA password
# for penetration testing demonstrations.
#
# Teaching notes:
# - This script is intentionally insecure (weak SA password).
# - It is written to be idempotent and safe to re-run in a lab.
# - It never attempts a production-hardened configuration.

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$InstanceName = "YOURCOMPANYDB"
$SA_PASSWORD = "Password1"

function Write-Step {
    param([int]$Num, [int]$Total, [string]$Message)
    Write-Host "[$Num/$Total] $Message" -ForegroundColor Cyan
}

function Test-InstanceInstalled {
    # Named instance services use MSSQL$<InstanceName>
    return $null -ne (Get-Service -Name "MSSQL`$$InstanceName" -ErrorAction SilentlyContinue)
}

function Get-InstanceId {
    # Map instance name -> instance ID for registry lookups (more reliable than hardcoding MSSQL15.*)
    $instanceKey = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\Instance Names\SQL"
    try {
        $mapping = Get-ItemProperty -Path $instanceKey -ErrorAction Stop
        return $mapping.$InstanceName
    } catch {
        return $null
    }
}

function Ensure-FirewallRule {
    param([string]$Name, [string]$Protocol, [int]$Port)
    $existing = Get-NetFirewallRule -DisplayName $Name -ErrorAction SilentlyContinue
    if (-not $existing) {
        New-NetFirewallRule -DisplayName $Name -Direction Inbound -Action Allow -Protocol $Protocol -LocalPort $Port | Out-Null
    } else {
        Set-NetFirewallRule -DisplayName $Name -Enabled True -Action Allow | Out-Null
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Red
Write-Host "  SQL SERVER VULNERABLE LAB SETUP" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""
Write-Host "SA Password: $SA_PASSWORD" -ForegroundColor Yellow
Write-Host ""

# Step 1: Download media (only if not installed)
$installer = "$env:TEMP\SQLEXPR_x64_ENU.exe"
if (-not (Test-InstanceInstalled)) {
    Write-Step 1 4 "Downloading SQL Server 2019 Express media..."
    # Direct link to SQL Server 2019 Express (standalone installer)
    $url = "https://download.microsoft.com/download/7/f/8/7f8a9c43-8c8a-4f7c-9f92-83c18d96b681/SQL2019-SSEI-Expr.exe"
    Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\sqlsetup.exe"

    # Extract the actual installer
    Write-Step 1 4 "Extracting installer..."
    Start-Process -FilePath "$env:TEMP\sqlsetup.exe" -ArgumentList "/ACTION=Download","/MEDIAPATH=$env:TEMP\sqlmedia","/MEDIATYPE=Core","/QUIET" -Wait

    # Find extracted setup
    $installer = (Get-ChildItem "$env:TEMP\sqlmedia" -Filter "setup.exe" -Recurse | Select-Object -First 1).FullName
}

if (-not (Test-InstanceInstalled) -and -not (Test-Path $installer)) {
    throw "SQL Server installer not found. Verify download/extraction succeeded."
}

# Step 2: Install SQL Server
if (-not (Test-InstanceInstalled)) {
    Write-Step 2 4 "Installing SQL Server Express (this takes 5-10 minutes)..."

    $configFile = "$env:TEMP\sql_config.ini"
    @"
[OPTIONS]
ACTION="Install"
QUIET="True"
QUIETSIMPLE="False"
IACCEPTSQLSERVERLICENSETERMS="True"
FEATURES=SQLENGINE
INSTANCENAME="$InstanceName"
SQLSVCACCOUNT="NT AUTHORITY\SYSTEM"
SQLSYSADMINACCOUNTS="BUILTIN\Administrators"
SECURITYMODE="SQL"
SAPWD="$SA_PASSWORD"
TCPENABLED="1"
NPENABLED="1"
"@ | Out-File -FilePath $configFile -Encoding ASCII

    Start-Process -FilePath $installer -ArgumentList "/ConfigurationFile=$configFile" -Wait -NoNewWindow
} else {
    Write-Step 2 4 "SQL Server Express already installed - skipping install"
}

# Step 3: Configure network access
Write-Step 3 4 "Configuring network access..."

# Open firewall
Ensure-FirewallRule -Name "SQL Server 1433" -Protocol TCP -Port 1433
Ensure-FirewallRule -Name "SQL Browser UDP" -Protocol UDP -Port 1434

# Start SQL Browser for named instance discovery
Set-Service "SQLBrowser" -StartupType Automatic -ErrorAction SilentlyContinue
Start-Service "SQLBrowser" -ErrorAction SilentlyContinue

# Force TCP on port 1433 via registry
$instanceId = Get-InstanceId
if ($instanceId) {
    $tcpPath = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\$instanceId\MSSQLServer\SuperSocketNetLib\Tcp\IPAll"
    if (Test-Path $tcpPath) {
        Set-ItemProperty -Path $tcpPath -Name "TcpPort" -Value "1433" -ErrorAction SilentlyContinue
        Set-ItemProperty -Path $tcpPath -Name "TcpDynamicPorts" -Value "" -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "[!] Could not resolve SQL instance ID in registry - TCP port may need manual verification" -ForegroundColor Yellow
}

# Restart SQL to apply
Write-Step 4 4 "Restarting SQL Server..."
Get-Service -Name "MSSQL`$$InstanceName" -ErrorAction SilentlyContinue | Restart-Service -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 3

# Verify installation
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SETUP COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Connection Details:" -ForegroundColor Cyan
Write-Host "  Server: $env:COMPUTERNAME\$InstanceName"
Write-Host "  Port: 1433"
Write-Host "  User: sa"
Write-Host "  Password: $SA_PASSWORD" -ForegroundColor Red
Write-Host ""
Write-Host "Verify locally:" -ForegroundColor Yellow
Write-Host "  sqlcmd -S .\$InstanceName -U sa -P $SA_PASSWORD -Q \"SELECT @@VERSION\""
Write-Host ""

# Get IP for remote testing
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*"} | Select-Object -First 1).IPAddress
Write-Host "Test from attacker machine:" -ForegroundColor Yellow
Write-Host "  nmap -p 1433 $ip"
Write-Host "  python3 sql_exploit.py $ip -u sa -p Password1 --cmd whoami"
Write-Host ""
