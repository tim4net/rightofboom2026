# SQL Server Express - Vulnerable Lab Setup
# Run as Administrator on Windows Server VM
#
# Downloads and installs SQL Server Express with weak SA password
# for penetration testing demonstrations.

$SA_PASSWORD = "Password1"

Write-Host ""
Write-Host "========================================" -ForegroundColor Red
Write-Host "  SQL SERVER VULNERABLE LAB SETUP" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Red
Write-Host ""
Write-Host "SA Password: $SA_PASSWORD" -ForegroundColor Yellow
Write-Host ""

# Step 1: Download
$installer = "$env:TEMP\SQLEXPR_x64_ENU.exe"
if (!(Test-Path $installer)) {
    Write-Host "[1/4] Downloading SQL Server 2019 Express..."
    # Direct link to SQL Server 2019 Express (standalone installer)
    $url = "https://download.microsoft.com/download/7/f/8/7f8a9c43-8c8a-4f7c-9f92-83c18d96b681/SQL2019-SSEI-Expr.exe"
    Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\sqlsetup.exe"

    # Extract the actual installer
    Write-Host "[1/4] Extracting installer..."
    Start-Process -FilePath "$env:TEMP\sqlsetup.exe" -ArgumentList "/ACTION=Download","/MEDIAPATH=$env:TEMP\sqlmedia","/MEDIATYPE=Core","/QUIET" -Wait

    # Find extracted setup
    $installer = (Get-ChildItem "$env:TEMP\sqlmedia" -Filter "setup.exe" -Recurse | Select-Object -First 1).FullName
}

if (!(Test-Path $installer)) {
    # Fallback: use the web installer directly
    $installer = "$env:TEMP\sqlsetup.exe"
}

# Step 2: Install SQL Server
Write-Host "[2/4] Installing SQL Server Express (this takes 5-10 minutes)..."

$configFile = "$env:TEMP\sql_config.ini"
@"
[OPTIONS]
ACTION="Install"
QUIET="True"
QUIETSIMPLE="False"
IACCEPTSQLSERVERLICENSETERMS="True"
FEATURES=SQLENGINE
INSTANCENAME="YOURCOMPANYDB"
SQLSVCACCOUNT="NT AUTHORITY\SYSTEM"
SQLSYSADMINACCOUNTS="BUILTIN\Administrators"
SECURITYMODE="SQL"
SAPWD="$SA_PASSWORD"
TCPENABLED="1"
NPENABLED="1"
"@ | Out-File -FilePath $configFile -Encoding ASCII

Start-Process -FilePath $installer -ArgumentList "/ConfigurationFile=$configFile" -Wait -NoNewWindow

# Step 3: Configure network access
Write-Host "[3/4] Configuring network access..."

# Open firewall
netsh advfirewall firewall add rule name="SQL Server 1433" dir=in action=allow protocol=tcp localport=1433 | Out-Null
netsh advfirewall firewall add rule name="SQL Browser UDP" dir=in action=allow protocol=udp localport=1434 | Out-Null

# Start SQL Browser for named instance discovery
Set-Service "SQLBrowser" -StartupType Automatic -ErrorAction SilentlyContinue
Start-Service "SQLBrowser" -ErrorAction SilentlyContinue

# Force TCP on port 1433 via registry
$tcpPath = "HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server\MSSQL15.YOURCOMPANYDB\MSSQLServer\SuperSocketNetLib\Tcp\IPAll"
if (Test-Path $tcpPath) {
    Set-ItemProperty -Path $tcpPath -Name "TcpPort" -Value "1433" -ErrorAction SilentlyContinue
    Set-ItemProperty -Path $tcpPath -Name "TcpDynamicPorts" -Value "" -ErrorAction SilentlyContinue
}

# Restart SQL to apply
Write-Host "[4/4] Restarting SQL Server..."
Get-Service | Where-Object {$_.Name -like "MSSQL*YOURCOMPANYDB*"} | Restart-Service -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 3

# Verify installation
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  SETUP COMPLETE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Connection Details:" -ForegroundColor Cyan
Write-Host "  Server: $env:COMPUTERNAME\YOURCOMPANYDB"
Write-Host "  Port: 1433"
Write-Host "  User: sa"
Write-Host "  Password: $SA_PASSWORD" -ForegroundColor Red
Write-Host ""
Write-Host "Verify locally:" -ForegroundColor Yellow
Write-Host '  sqlcmd -S .\YOURCOMPANYDB -U sa -P Password1 -Q "SELECT @@VERSION"'
Write-Host ""

# Get IP for remote testing
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.*"} | Select-Object -First 1).IPAddress
Write-Host "Test from attacker machine:" -ForegroundColor Yellow
Write-Host "  nmap -p 1433 $ip"
Write-Host "  python3 sql_exploit.py $ip -u sa -p Password1 --cmd whoami"
Write-Host ""
