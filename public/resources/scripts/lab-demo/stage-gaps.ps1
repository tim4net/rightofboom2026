#Requires -RunAsAdministrator
<#
╔══════════════════════════════════════════════════════════════════════════════╗
║  ██████   █████  ███    ██  ██████  ███████ ██████                            ║
║  ██   ██ ██   ██ ████   ██ ██       ██      ██   ██                           ║
║  ██   ██ ███████ ██ ██  ██ ██   ███ █████   ██████                            ║
║  ██   ██ ██   ██ ██  ██ ██ ██    ██ ██      ██   ██                           ║
║  ██████  ██   ██ ██   ████  ██████  ███████ ██   ██                           ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  THIS SCRIPT INTENTIONALLY WEAKENS SYSTEM SECURITY                           ║
║                                                                              ║
║  Creates these vulnerabilities:                                              ║
║  - Disables LSASS credential theft protection (ASR rule)                     ║
║  - Sets obfuscated script blocking to audit-only                             ║
║  - Adds Defender exclusions (C:\Temp, Downloads\*.ps1)                       ║
║  - Creates shared local admin account (helpdesk / Summer2024!)               ║
║  - Disables PowerShell script block logging                                  ║
║                                                                              ║
║  FOR ISOLATED LAB VMs ONLY - NEVER RUN ON PRODUCTION SYSTEMS                 ║
║                                                                              ║
║  After demo, run: teardown-lab-vm.ps1                                        ║
╚══════════════════════════════════════════════════════════════════════════════╝

.SYNOPSIS
    Creates intentional security gaps for the Attack Path Validator demo

.DESCRIPTION
    This script configures a Windows system with specific security misconfigurations
    that will be detected by the endpoint collector and exploited (safely) using
    Atomic Red Team tests.

    WARNING: This script creates real security vulnerabilities. Only use on
    isolated lab VMs that will be destroyed after the demo.

    ONLY RUN ON ISOLATED LAB VMs - NEVER ON PRODUCTION SYSTEMS

.NOTES
    Repository: https://github.com/tim4net/rightofboom2026
    Part of the Right of Boom 2026 presentation

.EXAMPLE
    .\stage-gaps.ps1
#>

$ErrorActionPreference = "Stop"

function Set-AsrRuleAction {
    param(
        [string]$RuleId,
        [int]$Action
    )

    # Idempotent ASR update: preserve existing rules, modify or append only the target rule.
    if (-not (Get-Command Get-MpPreference -ErrorAction SilentlyContinue)) {
        throw "Defender cmdlets not available (Get-MpPreference)"
    }
    $prefs = Get-MpPreference
    $ids = @($prefs.AttackSurfaceReductionRules_Ids)
    $actions = @($prefs.AttackSurfaceReductionRules_Actions)
    $idx = [array]::IndexOf($ids, $RuleId)

    if ($idx -ge 0) {
        $actions[$idx] = $Action
    } else {
        $ids += $RuleId
        $actions += $Action
    }

    Set-MpPreference -AttackSurfaceReductionRules_Ids $ids -AttackSurfaceReductionRules_Actions $actions
}

function Ensure-DefenderExclusion {
    param([string]$Path)
    if (-not (Get-Command Add-MpPreference -ErrorAction SilentlyContinue)) {
        throw "Defender cmdlets not available (Add-MpPreference)"
    }
    $prefs = Get-MpPreference -ErrorAction SilentlyContinue
    if (-not $prefs -or $prefs.ExclusionPath -notcontains $Path) {
        Add-MpPreference -ExclusionPath $Path -ErrorAction SilentlyContinue
    }
}

Write-Host @"

+===================================================================+
|         STAGING INTENTIONAL SECURITY GAPS                         |
|         For Attack Path Validator Demo                            |
+===================================================================+
|  WARNING: This weakens system security intentionally!             |
|  Only run on isolated lab VMs - NEVER on production!              |
+===================================================================+

"@ -ForegroundColor Yellow

# Confirm
$confirm = Read-Host "Type 'YES' to continue (or anything else to abort)"
if ($confirm -ne "YES") {
    Write-Host "[*] Aborted." -ForegroundColor Cyan
    exit 0
}

Write-Host ""
$gapsCreated = 0

# ============================================================================
# GAP 1: Disable ASR Rule - Block credential stealing from LSASS
# MITRE: T1003.001 - OS Credential Dumping: LSASS Memory
# ============================================================================
Write-Host "[*] GAP 1: Disabling ASR rule for LSASS protection..." -ForegroundColor Cyan
try {
    $lsassRuleId = "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2"

    # Disable the rule (0 = Disabled)
    Set-AsrRuleAction -RuleId $lsassRuleId -Action 0

    Write-Host "[+] LSASS credential theft protection DISABLED" -ForegroundColor Green
    Write-Host "    Attackers can now dump credentials from memory" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to disable LSASS ASR rule: $_" -ForegroundColor Red
}

# ============================================================================
# GAP 2: Set ASR Rule for obfuscated scripts to Audit only
# MITRE: T1027 - Obfuscated Files or Information
# ============================================================================
Write-Host ""
Write-Host "[*] GAP 2: Setting obfuscated scripts ASR rule to Audit..." -ForegroundColor Cyan
try {
    $obfuscatedRuleId = "5beb7efe-fd9a-4556-801d-275e5ffc04cc"

    # Set to Audit (2) instead of Block (1)
    Set-AsrRuleAction -RuleId $obfuscatedRuleId -Action 2

    Write-Host "[+] Obfuscated scripts protection set to AUDIT only" -ForegroundColor Green
    Write-Host "    Obfuscated PowerShell will log but NOT be blocked" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to set obfuscated scripts ASR rule: $_" -ForegroundColor Red
}

# ============================================================================
# GAP 3: Add Defender exclusion for C:\Temp
# MITRE: T1562.001 - Impair Defenses: Disable or Modify Tools
# ============================================================================
Write-Host ""
Write-Host "[*] GAP 3: Adding Defender exclusion for C:\Temp..." -ForegroundColor Cyan
try {
    # Create the directory if it doesn't exist
    if (-not (Test-Path "C:\Temp")) {
        New-Item -ItemType Directory -Path "C:\Temp" -Force | Out-Null
    }

    Ensure-DefenderExclusion -Path "C:\Temp"

    Write-Host "[+] C:\Temp excluded from Defender scanning" -ForegroundColor Green
    Write-Host "    Malware dropped here will NOT be detected" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to add C:\Temp exclusion: $_" -ForegroundColor Red
}

# ============================================================================
# GAP 4: Add Defender exclusion for PowerShell scripts in Downloads
# MITRE: T1059.001 - Command and Scripting Interpreter: PowerShell
# ============================================================================
Write-Host ""
Write-Host "[*] GAP 4: Adding Defender exclusion for *.ps1 in Downloads..." -ForegroundColor Cyan
try {
    $downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads\*.ps1"
    Ensure-DefenderExclusion -Path $downloadsPath

    Write-Host "[+] PowerShell scripts in Downloads excluded from scanning" -ForegroundColor Green
    Write-Host "    Downloaded scripts can execute without AV inspection" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to add Downloads exclusion: $_" -ForegroundColor Red
}

# ============================================================================
# GAP 5: Create shared local admin account "helpdesk"
# MITRE: T1078.003 - Valid Accounts: Local Accounts
# ============================================================================
Write-Host ""
Write-Host "[*] GAP 5: Creating shared local admin account 'helpdesk'..." -ForegroundColor Cyan
try {
    $username = "helpdesk"
    $password = ConvertTo-SecureString "Summer2024!" -AsPlainText -Force

    # Check if user exists
    $existingUser = Get-LocalUser -Name $username -ErrorAction SilentlyContinue

    if ($existingUser) {
        Write-Host "[+] User 'helpdesk' already exists" -ForegroundColor Green
    } else {
        New-LocalUser -Name $username -Password $password -FullName "Help Desk Support" -Description "Shared support account (DEMO ONLY)" -PasswordNeverExpires
        Write-Host "[+] Created local user 'helpdesk'" -ForegroundColor Green
    }

    # Add to Administrators group
    Add-LocalGroupMember -Group "Administrators" -Member $username -ErrorAction SilentlyContinue

    Write-Host "[+] 'helpdesk' added to local Administrators group" -ForegroundColor Green
    Write-Host "    Simulates shared credentials across endpoints" -ForegroundColor DarkGray
    Write-Host "    Password: Summer2024!" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to create helpdesk account: $_" -ForegroundColor Red
}

# ============================================================================
# GAP 6: Disable PowerShell Script Block Logging
# MITRE: T1562.002 - Impair Defenses: Disable Windows Event Logging
# ============================================================================
Write-Host ""
Write-Host "[*] GAP 6: Disabling PowerShell script block logging..." -ForegroundColor Cyan
try {
    $regPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"

    # Create the registry path if it doesn't exist
    if (-not (Test-Path $regPath)) {
        New-Item -Path $regPath -Force | Out-Null
    }

    Set-ItemProperty -Path $regPath -Name "EnableScriptBlockLogging" -Value 0 -Type DWord

    Write-Host "[+] PowerShell script block logging DISABLED" -ForegroundColor Green
    Write-Host "    Attackers' PowerShell commands won't be logged" -ForegroundColor DarkGray
    $gapsCreated++
} catch {
    Write-Host "[!] Failed to disable PS logging: $_" -ForegroundColor Red
}

# ============================================================================
# Summary
# ============================================================================
Write-Host ""
Write-Host @"
+===================================================================+
|                     GAP STAGING COMPLETE                          |
+===================================================================+
"@ -ForegroundColor $(if ($gapsCreated -ge 5) { "Green" } else { "Yellow" })

Write-Host "Gaps created: $gapsCreated / 6" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your VM now has these intentional vulnerabilities:" -ForegroundColor Yellow
Write-Host "  [T1003.001] LSASS credential theft protection disabled" -ForegroundColor White
Write-Host "  [T1027]     Obfuscated script blocking set to audit-only" -ForegroundColor White
Write-Host "  [T1562.001] C:\Temp excluded from AV scanning" -ForegroundColor White
Write-Host "  [T1059.001] Downloads\*.ps1 excluded from AV scanning" -ForegroundColor White
Write-Host "  [T1078.003] Shared local admin 'helpdesk' (password: Summer2024!)" -ForegroundColor White
Write-Host "  [T1562.002] PowerShell script block logging disabled" -ForegroundColor White
Write-Host ""
Write-Host "Run endpoint-collector.ps1 to verify these gaps are detectable." -ForegroundColor Cyan
Write-Host "Run teardown-lab-vm.ps1 to remove all gaps after the demo." -ForegroundColor Cyan
Write-Host ""
