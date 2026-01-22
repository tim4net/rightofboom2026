# ============================================================================
# ENDPOINT SECURITY COLLECTOR
# Gathers endpoint configuration for AI attack path analysis
#
# Usage: .\endpoint-collector.ps1 | ConvertTo-Json | clip
# Then paste into AI for attack path generation
#
# Safe to run - READ ONLY, no changes made
# ============================================================================

#Requires -Version 5.1

$ErrorActionPreference = "SilentlyContinue"

function Get-EndpointSecurityConfig {
    $config = @{
        Hostname = $env:COMPUTERNAME
        CollectedAt = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
        ASRRules = @()
        DefenderExclusions = @()
        LocalAdmins = @()
        PowerShellLogging = @{}
        CredentialCaching = @{}
        DefenderStatus = @{}
    }

    # =========================================================================
    # ASR RULES STATUS
    # Attack Surface Reduction rules - key protection against common techniques
    # =========================================================================
    $asrIds = @{
        "56a863a9-875e-4185-98a7-b882c64b5ce5" = "Block abuse of exploited vulnerable signed drivers"
        "7674ba52-37eb-4a4f-a9a1-f0f9a1619a2c" = "Block Adobe Reader from creating child processes"
        "d4f940ab-401b-4efc-aadc-ad5f3c50688a" = "Block all Office applications from creating child processes"
        "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2" = "Block credential stealing from LSASS"
        "be9ba2d9-53ea-4cdc-84e5-9b1eeee46550" = "Block executable content from email client and webmail"
        "01443614-cd74-433a-b99e-2ecdc07bfc25" = "Block executable files from running unless they meet criteria"
        "5beb7efe-fd9a-4556-801d-275e5ffc04cc" = "Block execution of potentially obfuscated scripts"
        "d3e037e1-3eb8-44c8-a917-57927947596d" = "Block JavaScript or VBScript from launching downloaded content"
        "3b576869-a4ec-4529-8536-b80a7769e899" = "Block Office applications from creating executable content"
        "75668c1f-73b5-4cf0-bb93-3ecf5cb7cc84" = "Block Office applications from injecting code into other processes"
        "26190899-1602-49e8-8b27-eb1d0a1ce869" = "Block Office communication app from creating child processes"
        "e6db77e5-3df2-4cf1-b95a-636979351e5b" = "Block persistence through WMI event subscription"
        "d1e49aac-8f56-4280-b9ba-993a6d77406c" = "Block process creations originating from PSExec and WMI commands"
        "b2b3f03d-6a65-4f7b-a9c7-1c7ef74a9ba4" = "Block untrusted and unsigned processes that run from USB"
        "92e97fa1-2edf-4476-bdd6-9dd0b4dddc7b" = "Block Win32 API calls from Office macros"
        "c1db55ab-c21a-4637-bb3f-a12568109d35" = "Use advanced protection against ransomware"
    }

    # Get ASR rule states: 0=Disabled, 1=Block, 2=Audit, 6=Warn
    $asrPrefs = Get-MpPreference
    if ($asrPrefs.AttackSurfaceReductionRules_Ids) {
        for ($i = 0; $i -lt $asrPrefs.AttackSurfaceReductionRules_Ids.Count; $i++) {
            $id = $asrPrefs.AttackSurfaceReductionRules_Ids[$i]
            $action = $asrPrefs.AttackSurfaceReductionRules_Actions[$i]
            $actionName = switch ($action) {
                0 { "Disabled" }
                1 { "Block" }
                2 { "Audit" }
                6 { "Warn" }
                default { "Unknown" }
            }
            $config.ASRRules += @{
                Id = $id
                Name = $asrIds[$id]
                Action = $actionName
                IsProtecting = ($action -eq 1)
            }
        }
    }

    # Check for missing critical ASR rules
    $criticalASR = @(
        "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2",  # LSASS
        "c1db55ab-c21a-4637-bb3f-a12568109d35",  # Ransomware
        "5beb7efe-fd9a-4556-801d-275e5ffc04cc",  # Obfuscated scripts
        "be9ba2d9-53ea-4cdc-84e5-9b1eeee46550"   # Email executable content
    )
    $configuredIds = $config.ASRRules | ForEach-Object { $_.Id }
    foreach ($critical in $criticalASR) {
        if ($critical -notin $configuredIds) {
            $config.ASRRules += @{
                Id = $critical
                Name = $asrIds[$critical]
                Action = "Not Configured"
                IsProtecting = $false
            }
        }
    }

    # =========================================================================
    # DEFENDER EXCLUSIONS
    # Paths/extensions/processes excluded from scanning - attacker gold
    # =========================================================================
    $config.DefenderExclusions = @{
        Paths = @($asrPrefs.ExclusionPath | Where-Object { $_ })
        Extensions = @($asrPrefs.ExclusionExtension | Where-Object { $_ })
        Processes = @($asrPrefs.ExclusionProcess | Where-Object { $_ })
    }

    # =========================================================================
    # LOCAL ADMINISTRATORS
    # Members of local admin group - lateral movement targets
    # =========================================================================
    try {
        $admins = Get-LocalGroupMember -Group "Administrators" | Select-Object Name, ObjectClass, PrincipalSource
        $config.LocalAdmins = @($admins | ForEach-Object {
            @{
                Name = $_.Name
                Type = $_.ObjectClass
                Source = $_.PrincipalSource.ToString()
            }
        })
    } catch {
        # Fallback for older systems
        $admins = net localgroup Administrators | Where-Object { $_ -and $_ -notmatch "^(The command|Members|---|-)" }
        $config.LocalAdmins = @($admins | ForEach-Object { @{ Name = $_; Type = "Unknown"; Source = "Unknown" } })
    }

    # =========================================================================
    # POWERSHELL LOGGING
    # Script block logging and transcription - forensic visibility
    # =========================================================================
    $psLogging = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -ErrorAction SilentlyContinue
    $psTranscription = Get-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription" -ErrorAction SilentlyContinue

    $config.PowerShellLogging = @{
        ScriptBlockLogging = if ($psLogging.EnableScriptBlockLogging -eq 1) { "Enabled" } else { "Disabled" }
        Transcription = if ($psTranscription.EnableTranscripting -eq 1) { "Enabled" } else { "Disabled" }
        TranscriptionPath = $psTranscription.OutputDirectory
    }

    # =========================================================================
    # CREDENTIAL CACHING
    # Cached logons - offline attack surface
    # =========================================================================
    $cachedLogons = Get-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" -ErrorAction SilentlyContinue
    $config.CredentialCaching = @{
        CachedLogonsCount = $cachedLogons.CachedLogonsCount
        # 10 is default, 0-50 range, lower is more secure
    }

    # =========================================================================
    # DEFENDER STATUS
    # Overall protection state
    # =========================================================================
    $defenderStatus = Get-MpComputerStatus -ErrorAction SilentlyContinue
    if ($defenderStatus) {
        $config.DefenderStatus = @{
            RealTimeProtection = $defenderStatus.RealTimeProtectionEnabled
            BehaviorMonitor = $defenderStatus.BehaviorMonitorEnabled
            AntivirusEnabled = $defenderStatus.AntivirusEnabled
            LastFullScan = $defenderStatus.FullScanEndTime
            SignatureAge = $defenderStatus.AntivirusSignatureAge
        }
    }

    return $config
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================
$config = Get-EndpointSecurityConfig

# Output as formatted JSON for AI consumption
$json = $config | ConvertTo-Json -Depth 4

Write-Host "============================================================================"
Write-Host "ENDPOINT SECURITY CONFIGURATION - $($config.Hostname)"
Write-Host "Collected: $($config.CollectedAt)"
Write-Host "============================================================================"
Write-Host ""
Write-Host "Copy the JSON below and paste into AI for attack path analysis:"
Write-Host ""
Write-Host $json
Write-Host ""
Write-Host "============================================================================"
Write-Host "QUICK SUMMARY:"
Write-Host "============================================================================"

# ASR Summary
$asrDisabled = $config.ASRRules | Where-Object { -not $_.IsProtecting }
if ($asrDisabled) {
    Write-Host "[!] ASR GAPS: $($asrDisabled.Count) rules not protecting" -ForegroundColor Red
    $asrDisabled | ForEach-Object { Write-Host "    - $($_.Name): $($_.Action)" -ForegroundColor Yellow }
} else {
    Write-Host "[+] ASR: All critical rules in Block mode" -ForegroundColor Green
}

# Exclusions Summary
$totalExclusions = $config.DefenderExclusions.Paths.Count + $config.DefenderExclusions.Extensions.Count + $config.DefenderExclusions.Processes.Count
if ($totalExclusions -gt 0) {
    Write-Host "[!] EXCLUSIONS: $totalExclusions total exclusions configured" -ForegroundColor Yellow
    $config.DefenderExclusions.Paths | ForEach-Object { Write-Host "    Path: $_" -ForegroundColor Yellow }
    $config.DefenderExclusions.Extensions | ForEach-Object { Write-Host "    Ext: $_" -ForegroundColor Yellow }
    $config.DefenderExclusions.Processes | ForEach-Object { Write-Host "    Proc: $_" -ForegroundColor Yellow }
} else {
    Write-Host "[+] EXCLUSIONS: None configured" -ForegroundColor Green
}

# Local Admins Summary
Write-Host "[i] LOCAL ADMINS: $($config.LocalAdmins.Count) members" -ForegroundColor Cyan
$config.LocalAdmins | ForEach-Object { Write-Host "    - $($_.Name)" -ForegroundColor Cyan }

# PowerShell Logging
if ($config.PowerShellLogging.ScriptBlockLogging -eq "Disabled") {
    Write-Host "[!] LOGGING: PowerShell script block logging DISABLED" -ForegroundColor Red
} else {
    Write-Host "[+] LOGGING: PowerShell script block logging enabled" -ForegroundColor Green
}

Write-Host ""
Write-Host "============================================================================"
