#Requires -RunAsAdministrator
<#
.SYNOPSIS
    Removes intentional security gaps created for the Attack Path Validator demo

.DESCRIPTION
    This script reverses the changes made by stage-gaps.ps1, restoring the
    system to a more secure state.

.NOTES
    Repository: https://github.com/tim4net/rightofboom2026
    Part of the Right of Boom 2026 presentation

.EXAMPLE
    .\teardown-lab-vm.ps1

.EXAMPLE
    # One-liner from anywhere:
    iex (irm https://github.com/tim4net/rightofboom2026/releases/latest/download/teardown-lab-vm.ps1)
#>

$ErrorActionPreference = "Stop"

Write-Host @"

+===================================================================+
|         TEARDOWN - REMOVING SECURITY GAPS                         |
|         Restoring system to secure state                          |
+===================================================================+

"@ -ForegroundColor Cyan

$gapsRemoved = 0

# ============================================================================
# RESTORE 1: Re-enable ASR Rule - Block credential stealing from LSASS
# ============================================================================
Write-Host "[*] RESTORE 1: Re-enabling LSASS protection..." -ForegroundColor Cyan
try {
    $lsassRuleId = "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2"
    Add-MpPreference -AttackSurfaceReductionRules_Ids $lsassRuleId -AttackSurfaceReductionRules_Actions 1
    Write-Host "[+] LSASS credential theft protection ENABLED (Block mode)" -ForegroundColor Green
    $gapsRemoved++
} catch {
    Write-Host "[!] Failed to enable LSASS ASR rule: $_" -ForegroundColor Red
}

# ============================================================================
# RESTORE 2: Set ASR Rule for obfuscated scripts to Block
# ============================================================================
Write-Host ""
Write-Host "[*] RESTORE 2: Setting obfuscated scripts ASR to Block..." -ForegroundColor Cyan
try {
    $obfuscatedRuleId = "5beb7efe-fd9a-4556-801d-275e5ffc04cc"
    Add-MpPreference -AttackSurfaceReductionRules_Ids $obfuscatedRuleId -AttackSurfaceReductionRules_Actions 1
    Write-Host "[+] Obfuscated scripts protection ENABLED (Block mode)" -ForegroundColor Green
    $gapsRemoved++
} catch {
    Write-Host "[!] Failed to set obfuscated scripts ASR rule: $_" -ForegroundColor Red
}

# ============================================================================
# RESTORE 3: Remove Defender exclusion for C:\Temp
# ============================================================================
Write-Host ""
Write-Host "[*] RESTORE 3: Removing Defender exclusion for C:\Temp..." -ForegroundColor Cyan
try {
    Remove-MpPreference -ExclusionPath "C:\Temp" -ErrorAction SilentlyContinue
    Write-Host "[+] C:\Temp exclusion removed" -ForegroundColor Green
    $gapsRemoved++
} catch {
    Write-Host "[!] Failed to remove C:\Temp exclusion: $_" -ForegroundColor Red
}

# ============================================================================
# RESTORE 4: Remove Defender exclusion for Downloads\*.ps1
# ============================================================================
Write-Host ""
Write-Host "[*] RESTORE 4: Removing Defender exclusion for Downloads\*.ps1..." -ForegroundColor Cyan
try {
    $downloadsPath = [Environment]::GetFolderPath("UserProfile") + "\Downloads\*.ps1"
    Remove-MpPreference -ExclusionPath $downloadsPath -ErrorAction SilentlyContinue
    Write-Host "[+] Downloads\*.ps1 exclusion removed" -ForegroundColor Green
    $gapsRemoved++
} catch {
    Write-Host "[!] Failed to remove Downloads exclusion: $_" -ForegroundColor Red
}

# ============================================================================
# RESTORE 5: Remove helpdesk local admin account
# ============================================================================
Write-Host ""
Write-Host "[*] RESTORE 5: Removing 'helpdesk' local admin account..." -ForegroundColor Cyan
try {
    $existingUser = Get-LocalUser -Name "helpdesk" -ErrorAction SilentlyContinue
    if ($existingUser) {
        Remove-LocalUser -Name "helpdesk"
        Write-Host "[+] 'helpdesk' account removed" -ForegroundColor Green
        $gapsRemoved++
    } else {
        Write-Host "[+] 'helpdesk' account doesn't exist (already clean)" -ForegroundColor Green
        $gapsRemoved++
    }
} catch {
    Write-Host "[!] Failed to remove helpdesk account: $_" -ForegroundColor Red
}

# ============================================================================
# RESTORE 6: Re-enable PowerShell Script Block Logging
# ============================================================================
Write-Host ""
Write-Host "[*] RESTORE 6: Re-enabling PowerShell script block logging..." -ForegroundColor Cyan
try {
    $regPath = "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"

    if (Test-Path $regPath) {
        Set-ItemProperty -Path $regPath -Name "EnableScriptBlockLogging" -Value 1 -Type DWord
    } else {
        New-Item -Path $regPath -Force | Out-Null
        Set-ItemProperty -Path $regPath -Name "EnableScriptBlockLogging" -Value 1 -Type DWord
    }

    Write-Host "[+] PowerShell script block logging ENABLED" -ForegroundColor Green
    $gapsRemoved++
} catch {
    Write-Host "[!] Failed to enable PS logging: $_" -ForegroundColor Red
}

# ============================================================================
# Cleanup Atomic Red Team artifacts
# ============================================================================
Write-Host ""
Write-Host "[*] Cleaning up Atomic Red Team test artifacts..." -ForegroundColor Cyan
try {
    if (Get-Module -ListAvailable -Name invoke-atomicredteam) {
        Import-Module invoke-atomicredteam -Force -ErrorAction SilentlyContinue

        # Common tests used in demo
        $testsToClean = @("T1003.001", "T1027", "T1059.001", "T1021.002")

        foreach ($test in $testsToClean) {
            try {
                Invoke-AtomicTest $test -Cleanup -ErrorAction SilentlyContinue 2>$null
            } catch {
                # Ignore errors - test may not have been run
            }
        }
        Write-Host "[+] Atomic test artifacts cleaned" -ForegroundColor Green
    } else {
        Write-Host "[+] Atomic Red Team not installed (nothing to clean)" -ForegroundColor Green
    }

    # Remove AtomicRedTeam Defender exclusion
    $artPath = "$env:USERPROFILE\AtomicRedTeam"
    Remove-MpPreference -ExclusionPath $artPath -ErrorAction SilentlyContinue
    Write-Host "[+] Removed Defender exclusion for AtomicRedTeam" -ForegroundColor Green
} catch {
    Write-Host "[!] Could not clean Atomic artifacts: $_" -ForegroundColor Yellow
}

# ============================================================================
# Optional: Remove lab scripts directory
# ============================================================================
Write-Host ""
$removeScripts = Read-Host "Remove C:\LabScripts directory? (y/N)"
if ($removeScripts -eq "y" -or $removeScripts -eq "Y") {
    try {
        Remove-Item -Path "C:\LabScripts" -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "[+] C:\LabScripts removed" -ForegroundColor Green
    } catch {
        Write-Host "[!] Could not remove C:\LabScripts: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "[*] Keeping C:\LabScripts" -ForegroundColor Cyan
}

# ============================================================================
# Summary
# ============================================================================
Write-Host ""
Write-Host @"
+===================================================================+
|                     TEARDOWN COMPLETE                             |
+===================================================================+
"@ -ForegroundColor Green

Write-Host "Gaps removed: $gapsRemoved / 6" -ForegroundColor Cyan
Write-Host ""
Write-Host "Security restored:" -ForegroundColor Green
Write-Host "  [+] LSASS protection enabled" -ForegroundColor White
Write-Host "  [+] Obfuscated script blocking enabled" -ForegroundColor White
Write-Host "  [+] C:\Temp AV exclusion removed" -ForegroundColor White
Write-Host "  [+] Downloads\*.ps1 exclusion removed" -ForegroundColor White
Write-Host "  [+] Shared admin account removed" -ForegroundColor White
Write-Host "  [+] PowerShell logging enabled" -ForegroundColor White
Write-Host ""
Write-Host "Recommended: Revert to a clean VM snapshot for future demos." -ForegroundColor Yellow
Write-Host ""
