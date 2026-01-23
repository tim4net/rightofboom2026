<#
.SYNOPSIS
    Safe Endpoint Security Validation Script

.DESCRIPTION
    Runs non-destructive security checks against Windows endpoints to validate
    security controls are properly configured and functioning. Designed for
    MSP deployment via RMM platforms.

    All tests are read-only or use industry-standard safe test methods (EICAR).
    No destructive actions are performed.

.OUTPUTS
    JSON object containing test results, suitable for automation processing.

.EXAMPLE
    .\Invoke-SafeEndpointValidation.ps1

.EXAMPLE
    .\Invoke-SafeEndpointValidation.ps1 -Categories "Antivirus","Credentials"

.EXAMPLE
    .\Invoke-SafeEndpointValidation.ps1 -SkipFunctionalTests

.NOTES
    Version: 1.3.0
    Author: Right of Boom 2026
    License: MIT

    For use with Rewst automation workflows.
    https://github.com/tim4net/rightofboom2026
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet(
        "All",
        "Antivirus",
        "ASR",
        "Credentials",
        "CredentialProtection",
        "ExecutionControls",
        "PrivilegeEscalation",
        "LateralMovement",
        "DefenseEvasion",
        "Persistence",
        "Network",
        "Encryption",
        "LocalSecurity",
        "RemoteAccess",
        "Logging"
    )]
    [string[]]$Categories = @("All"),

    [Parameter(Mandatory=$false)]
    [switch]$SkipFunctionalTests,

    [Parameter(Mandatory=$false)]
    [switch]$Force
)

#Requires -Version 5.1

$ScriptVersion = "1.3.0"
$script:tests = @()
$script:isAdmin = $false
$script:warnings = @()

# ============================================================================
# INITIALIZATION & PREFLIGHT CHECKS
# ============================================================================

function Initialize-ValidationEnvironment {
    # Check if running as administrator
    $script:isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
        [Security.Principal.WindowsBuiltInRole]::Administrator
    )

    if (-not $script:isAdmin -and -not $Force) {
        $script:warnings += "Not running as Administrator - some tests may fail or return incomplete results"
    }

    # Ensure TLS 1.2 for any web requests
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    } catch {
        $script:warnings += "Could not set TLS 1.2: $($_.Exception.Message)"
    }
}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

function Add-TestResult {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Id,

        [Parameter(Mandatory=$true)]
        [string]$Category,

        [Parameter(Mandatory=$true)]
        [string]$Name,

        [Parameter(Mandatory=$true)]
        [ValidateSet("PASS", "FAIL", "WARN", "INFO", "ERROR", "SKIP")]
        [string]$Status,

        [Parameter(Mandatory=$true)]
        [string]$Detail,

        [hashtable]$Evidence = @{},
        [string]$Reference = "",
        [string]$MitreId = "",
        [hashtable]$Remediation = @{}
    )

    $result = [ordered]@{
        id        = $Id
        category  = $Category
        name      = $Name
        status    = $Status
        detail    = $Detail
        evidence  = $Evidence
        timestamp = (Get-Date -Format "o")
    }

    if (-not [string]::IsNullOrWhiteSpace($Reference)) {
        $result["reference"] = $Reference
    }
    if (-not [string]::IsNullOrWhiteSpace($MitreId)) {
        $result["mitreAttackId"] = $MitreId
    }
    if ($Remediation.Count -gt 0) {
        $result["remediation"] = $Remediation
    }

    $script:tests += $result
}

function Test-CategoryEnabled {
    param([string]$Category)
    return ($Categories -contains "All") -or ($Categories -contains $Category)
}

function Test-CommandExists {
    param([string]$Command)
    return $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
}

function Get-RegistryValueSafe {
    param(
        [string]$Path,
        [string]$Name,
        $DefaultValue = $null
    )

    try {
        $item = Get-ItemProperty -Path $Path -Name $Name -ErrorAction Stop
        return $item.$Name
    } catch {
        return $DefaultValue
    }
}

function Remove-TestFileSafe {
    param([string]$Path)

    if ([string]::IsNullOrWhiteSpace($Path)) { return }
    if (-not (Test-Path $Path -ErrorAction SilentlyContinue)) { return }

    # Multiple attempts with increasing delays
    for ($i = 1; $i -le 3; $i++) {
        try {
            Remove-Item -Path $Path -Force -ErrorAction Stop
            return
        } catch {
            Start-Sleep -Milliseconds ($i * 500)
        }
    }
    # If we still can't delete, it's likely quarantined - that's fine
}

# ============================================================================
# CATEGORY: ANTIVIRUS
# ============================================================================

function Test-AntivirusCategory {
    if (-not (Test-CategoryEnabled "Antivirus")) { return }

    # Check if Defender cmdlets are available
    if (-not (Test-CommandExists "Get-MpComputerStatus")) {
        Add-TestResult `
            -Id "defender-status" `
            -Category "Antivirus" `
            -Name "Windows Defender Status" `
            -Status "SKIP" `
            -Detail "Windows Defender cmdlets not available (may be third-party AV or Server Core)" `
            -Evidence @{ cmdletExists = $false }
        return
    }

    # --- Test: Defender Real-Time Protection ---
    try {
        $defender = Get-MpComputerStatus -ErrorAction Stop

        Add-TestResult `
            -Id "defender-rtp" `
            -Category "Antivirus" `
            -Name "Defender Real-Time Protection" `
            -Status $(if ($defender.RealTimeProtectionEnabled) { "PASS" } else { "FAIL" }) `
            -Detail $(if ($defender.RealTimeProtectionEnabled) {
                "Real-time protection is enabled"
            } else {
                "Real-time protection is DISABLED - endpoint is not actively protected"
            }) `
            -Evidence @{
                RealTimeProtectionEnabled  = $defender.RealTimeProtectionEnabled
                AntivirusEnabled           = $defender.AntivirusEnabled
                BehaviorMonitorEnabled     = $defender.BehaviorMonitorEnabled
                IoavProtectionEnabled      = $defender.IoavProtectionEnabled
                OnAccessProtectionEnabled  = $defender.OnAccessProtectionEnabled
            }

        # --- Test: Defender Signature Age ---
        $sigAge = $defender.AntivirusSignatureAge
        $sigStatus = if ($null -eq $sigAge) { "WARN" }
                     elseif ($sigAge -le 1) { "PASS" }
                     elseif ($sigAge -le 3) { "WARN" }
                     else { "FAIL" }

        Add-TestResult `
            -Id "defender-signatures" `
            -Category "Antivirus" `
            -Name "Defender Signature Currency" `
            -Status $sigStatus `
            -Detail $(if ($null -eq $sigAge) { "Unable to determine signature age" }
                     else { "Antivirus signatures are $sigAge day(s) old" }) `
            -Evidence @{
                AntivirusSignatureAge         = $sigAge
                AntivirusSignatureLastUpdated = if ($defender.AntivirusSignatureLastUpdated) {
                    $defender.AntivirusSignatureLastUpdated.ToString("o")
                } else { $null }
                AntivirusSignatureVersion     = $defender.AntivirusSignatureVersion
            }

        # --- Test: Tamper Protection ---
        Add-TestResult `
            -Id "defender-tamper" `
            -Category "Antivirus" `
            -Name "Defender Tamper Protection" `
            -Status $(if ($defender.IsTamperProtected) { "PASS" } else { "FAIL" }) `
            -Detail $(if ($defender.IsTamperProtected) {
                "Tamper protection is enabled"
            } else {
                "Tamper protection is DISABLED - attackers can disable Defender"
            }) `
            -Evidence @{ IsTamperProtected = $defender.IsTamperProtected } `
            -Reference "https://learn.microsoft.com/en-us/defender-endpoint/prevent-changes-to-security-settings-with-tamper-protection"

    } catch {
        Add-TestResult `
            -Id "defender-status" `
            -Category "Antivirus" `
            -Name "Windows Defender Status" `
            -Status "ERROR" `
            -Detail "Unable to query Defender status: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message; isAdmin = $script:isAdmin }
    }

    # --- Test: EICAR Detection (Functional Test) ---
    if (-not $SkipFunctionalTests) {
        Test-EicarDetection
    }

    # --- Test: AV Exclusions Audit ---
    Test-AvExclusions
}

function Test-EicarDetection {
    # EICAR test string (this IS the malware test file content, base64 to avoid AV flagging this script)
    # Decodes to: X5O!P%@AP[4\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*
    $eicarBase64 = "WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo="

    $testId = [Guid]::NewGuid().ToString("N").Substring(0, 8)
    # Use C:\Users\Public - realistic malware drop location, not typically excluded
    # Avoid $env:TEMP which is C:\Windows\TEMP when running as SYSTEM via RMM
    $testPath = Join-Path "$env:SystemDrive\Users\Public" "eicar-test-$testId.com"
    $testCompleted = $false
    $wasBlocked = $false
    $blockMethod = "unknown"

    try {
        # Attempt 1: Try to write EICAR content directly
        try {
            $eicarContent = [System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String($eicarBase64))
            [System.IO.File]::WriteAllText($testPath, $eicarContent)

            # Wait briefly for real-time protection to act
            Start-Sleep -Seconds 2

            # Check if file was quarantined/deleted
            if (Test-Path $testPath -ErrorAction SilentlyContinue) {
                # File still exists - AV didn't catch it!
                $wasBlocked = $false
                $blockMethod = "none-file-persisted"
            } else {
                # File was removed by AV
                $wasBlocked = $true
                $blockMethod = "realtime-quarantine"
            }
            $testCompleted = $true

        } catch {
            $errorMsg = $_.Exception.Message.ToLower()

            # Check if this is actually an AV block vs other error (permissions, etc.)
            # Defender typically includes "virus" or "malware" or "threat" in the error
            $avKeywords = @("virus", "malware", "threat", "infected", "quarantine", "defender", "antivirus")
            $isAvBlock = $false
            foreach ($keyword in $avKeywords) {
                if ($errorMsg -match $keyword) {
                    $isAvBlock = $true
                    break
                }
            }

            if ($isAvBlock) {
                # Write was blocked by AV - this is good
                $wasBlocked = $true
                $blockMethod = "write-blocked-by-av"
                $testCompleted = $true
            } else {
                # Write failed for another reason (permissions, path, etc.) - not a valid test
                $wasBlocked = $false
                $blockMethod = "write-error-not-av"
                $testCompleted = $false
                # Store the actual error for diagnosis
                $script:eicarWriteError = $_.Exception.Message
            }
        }

        # Determine status and detail based on test outcome
        $status = "FAIL"
        $detail = ""

        if ($blockMethod -eq "write-error-not-av") {
            # Write failed but NOT due to AV - inconclusive test
            $status = "ERROR"
            $detail = "EICAR test inconclusive - write failed due to non-AV error: $($script:eicarWriteError)"
        } elseif ($wasBlocked) {
            $status = "PASS"
            $detail = "EICAR test file blocked via $blockMethod"
        } else {
            $status = "FAIL"
            $detail = "EICAR test file was NOT blocked - antivirus may not be functioning"
        }

        Add-TestResult `
            -Id "eicar-detection" `
            -Category "Antivirus" `
            -Name "EICAR Malware Detection" `
            -Status $status `
            -Detail $detail `
            -Evidence @{
                blocked     = $wasBlocked
                method      = $blockMethod
                testPath    = $testPath
                testId      = $testId
                writeError  = $script:eicarWriteError
            }

    } catch {
        Add-TestResult `
            -Id "eicar-detection" `
            -Category "Antivirus" `
            -Name "EICAR Malware Detection" `
            -Status "ERROR" `
            -Detail "EICAR test failed unexpectedly: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message }
    } finally {
        # Always attempt cleanup
        Remove-TestFileSafe -Path $testPath
    }
}

function Test-AvExclusions {
    if (-not (Test-CommandExists "Get-MpPreference")) { return }

    try {
        $prefs = Get-MpPreference -ErrorAction Stop
        $riskyExclusions = @()

        # Check path exclusions for dangerous patterns
        $dangerousPaths = @(
            "^[A-Z]:\\$",           # Entire drive root
            "\\Windows\\?$",         # Windows directory
            "\\Users\\?$",           # All user profiles
            "\\ProgramData\\?$",     # ProgramData root
            "\\Temp\\?$",            # Temp directories
            "\\AppData\\?$"          # AppData root
        )

        foreach ($path in $prefs.ExclusionPath) {
            if ([string]::IsNullOrWhiteSpace($path)) { continue }
            foreach ($pattern in $dangerousPaths) {
                if ($path -match $pattern) {
                    $riskyExclusions += @{ type = "Path"; value = $path; reason = "Broad directory exclusion" }
                    break
                }
            }
        }

        # Check extension exclusions for executable types
        $dangerousExtensions = @(".exe", ".dll", ".ps1", ".bat", ".cmd", ".vbs", ".js", ".hta", ".scr")
        foreach ($ext in $prefs.ExclusionExtension) {
            if ([string]::IsNullOrWhiteSpace($ext)) { continue }
            $normalizedExt = if ($ext.StartsWith(".")) { $ext.ToLower() } else { ".$($ext.ToLower())" }
            if ($normalizedExt -in $dangerousExtensions) {
                $riskyExclusions += @{ type = "Extension"; value = $ext; reason = "Executable file type" }
            }
        }

        # Check process exclusions for commonly abused processes
        $dangerousProcesses = @("powershell", "cmd", "wscript", "cscript", "mshta", "rundll32", "regsvr32", "msiexec")
        foreach ($proc in $prefs.ExclusionProcess) {
            if ([string]::IsNullOrWhiteSpace($proc)) { continue }
            $procLower = $proc.ToLower()
            foreach ($dangerous in $dangerousProcesses) {
                if ($procLower -match [regex]::Escape($dangerous)) {
                    $riskyExclusions += @{ type = "Process"; value = $proc; reason = "Commonly abused process" }
                    break
                }
            }
        }

        $pathCount = @($prefs.ExclusionPath | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }).Count
        $extCount = @($prefs.ExclusionExtension | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }).Count
        $procCount = @($prefs.ExclusionProcess | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }).Count

        Add-TestResult `
            -Id "av-exclusions" `
            -Category "Antivirus" `
            -Name "AV Exclusion Audit" `
            -Status $(if ($riskyExclusions.Count -eq 0) { "PASS" }
                     elseif ($riskyExclusions.Count -le 2) { "WARN" }
                     else { "FAIL" }) `
            -Detail $(if ($riskyExclusions.Count -eq 0) {
                "No risky AV exclusions detected ($pathCount paths, $extCount extensions, $procCount processes)"
            } else {
                "$($riskyExclusions.Count) potentially risky exclusion(s) found"
            }) `
            -Evidence @{
                riskyExclusions        = $riskyExclusions
                totalPathExclusions    = $pathCount
                totalExtensionExclusions = $extCount
                totalProcessExclusions = $procCount
            } `
            -Reference "https://learn.microsoft.com/en-us/defender-endpoint/common-exclusion-mistakes-microsoft-defender-antivirus"

    } catch {
        Add-TestResult `
            -Id "av-exclusions" `
            -Category "Antivirus" `
            -Name "AV Exclusion Audit" `
            -Status "ERROR" `
            -Detail "Unable to query AV exclusions: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message }
    }
}

# ============================================================================
# CATEGORY: ATTACK SURFACE REDUCTION
# ============================================================================

function Test-ASRCategory {
    if (-not (Test-CategoryEnabled "ASR")) { return }

    if (-not (Test-CommandExists "Get-MpPreference")) {
        Add-TestResult `
            -Id "asr-rules" `
            -Category "Attack Surface Reduction" `
            -Name "ASR Rules Status" `
            -Status "SKIP" `
            -Detail "Windows Defender cmdlets not available" `
            -Evidence @{ cmdletExists = $false }
        return
    }

    # ASR Rule definitions with criticality ratings
    $asrRuleDefinitions = @{
        "56a863a9-875e-4185-98a7-b882c64b5ce5" = @{ name = "Block Office apps from creating executable content"; critical = $true }
        "7674ba52-37eb-4a4f-a9a1-f0f9a1619a2c" = @{ name = "Block Adobe Reader from creating child processes"; critical = $true }
        "d4f940ab-401b-4efc-aadc-ad5f3c50688a" = @{ name = "Block Office apps from creating child processes"; critical = $true }
        "9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2" = @{ name = "Block credential stealing from LSASS"; critical = $true }
        "be9ba2d9-53ea-4cdc-84e5-9b1eeee46550" = @{ name = "Block executable content from email client and webmail"; critical = $true }
        "01443614-cd74-433a-b99e-2ecdc07bfc25" = @{ name = "Block executable files from running unless they meet criteria"; critical = $false }
        "5beb7efe-fd9a-4556-801d-275e5ffc04cc" = @{ name = "Block execution of potentially obfuscated scripts"; critical = $true }
        "d3e037e1-3eb8-44c8-a917-57927947596d" = @{ name = "Block JavaScript or VBScript from launching downloaded content"; critical = $true }
        "3b576869-a4ec-4529-8536-b80a7769e899" = @{ name = "Block Office apps from injecting code into other processes"; critical = $true }
        "75668c1f-73b5-4cf0-bb93-3ecf5cb7cc84" = @{ name = "Block Office communication apps from creating child processes"; critical = $false }
        "26190899-1602-49e8-8b27-eb1d0a1ce869" = @{ name = "Block Office communication apps from creating child processes"; critical = $false }
        "e6db77e5-3df2-4cf1-b95a-636979351e5b" = @{ name = "Block persistence through WMI event subscription"; critical = $true }
        "b2b3f03d-6a65-4f7b-a9c7-1c7ef74a9ba4" = @{ name = "Block untrusted and unsigned processes from USB"; critical = $false }
        "92e97fa1-2edf-4476-bdd6-9dd0b4dddc7b" = @{ name = "Block Win32 API calls from Office macros"; critical = $true }
        "c1db55ab-c21a-4637-bb3f-a12568109d35" = @{ name = "Use advanced protection against ransomware"; critical = $true }
    }

    try {
        $asrPrefs = Get-MpPreference -ErrorAction Stop
        $asrIds = @($asrPrefs.AttackSurfaceReductionRules_Ids)
        $asrActions = @($asrPrefs.AttackSurfaceReductionRules_Actions)

        $blockCount = 0
        $auditCount = 0
        $disabledCount = 0
        $missingCritical = @()
        $ruleDetails = @()

        foreach ($ruleId in $asrRuleDefinitions.Keys) {
            $ruleDef = $asrRuleDefinitions[$ruleId]
            $idx = -1

            # Find rule index safely
            for ($i = 0; $i -lt $asrIds.Count; $i++) {
                if ($asrIds[$i] -eq $ruleId) {
                    $idx = $i
                    break
                }
            }

            $action = if ($idx -ge 0 -and $idx -lt $asrActions.Count) { $asrActions[$idx] } else { -1 }
            $actionName = switch ($action) {
                0 { $disabledCount++; "Disabled" }
                1 { $blockCount++; "Block" }
                2 { $auditCount++; "Audit" }
                6 { $auditCount++; "Warn" }
                default { $disabledCount++; "Not Configured" }
            }

            if ($ruleDef.critical -and $action -ne 1) {
                $missingCritical += $ruleDef.name
            }

            $ruleDetails += @{
                id       = $ruleId
                name     = $ruleDef.name
                action   = $actionName
                critical = $ruleDef.critical
            }
        }

        Add-TestResult `
            -Id "asr-rules" `
            -Category "Attack Surface Reduction" `
            -Name "ASR Rules Enforcement" `
            -Status $(if ($missingCritical.Count -eq 0) { "PASS" }
                     elseif ($blockCount -ge 5) { "WARN" }
                     else { "FAIL" }) `
            -Detail "$blockCount rules in Block, $auditCount in Audit, $disabledCount disabled/not configured" `
            -Evidence @{
                blockMode       = $blockCount
                auditMode       = $auditCount
                disabled        = $disabledCount
                missingCritical = $missingCritical
                rules           = $ruleDetails
            } `
            -Reference "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference" `
            -MitreId "Multiple" `
            -Remediation @{
                PowerShell = 'Set-MpPreference -AttackSurfaceReductionRules_Ids 9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2,56a863a9-875e-4185-98a7-b882c64b5ce5,d4f940ab-401b-4efc-aadc-ad5f3c50688a -AttackSurfaceReductionRules_Actions Enabled,Enabled,Enabled'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Microsoft Defender Exploit Guard > Attack Surface Reduction > Configure Attack Surface Reduction rules'
                Intune = 'Endpoint security > Attack surface reduction > Attack Surface Reduction Rules > Set each rule to Block'
                Note = 'Start with Audit mode for 7 days to identify false positives, then switch to Block. Critical rules: LSASS credential stealing, Office child processes, script obfuscation.'
            }

    } catch {
        Add-TestResult `
            -Id "asr-rules" `
            -Category "Attack Surface Reduction" `
            -Name "ASR Rules Enforcement" `
            -Status "ERROR" `
            -Detail "Unable to query ASR rules: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message }
    }
}

# ============================================================================
# CATEGORY: CREDENTIAL PROTECTION
# ============================================================================

function Test-CredentialsCategory {
    if (-not (Test-CategoryEnabled "Credentials") -and -not (Test-CategoryEnabled "CredentialProtection")) { return }

    # --- Test: Credential Guard ---
    try {
        $dgInfo = Get-CimInstance -ClassName Win32_DeviceGuard -Namespace root\Microsoft\Windows\DeviceGuard -ErrorAction Stop

        $cgRunning = @($dgInfo.SecurityServicesRunning) -contains 1
        $cgConfigured = @($dgInfo.SecurityServicesConfigured) -contains 1

        Add-TestResult `
            -Id "credential-guard" `
            -Category "Credential Protection" `
            -Name "Credential Guard" `
            -Status $(if ($cgRunning) { "PASS" }
                     elseif ($cgConfigured) { "WARN" }
                     else { "FAIL" }) `
            -Detail $(if ($cgRunning) { "Credential Guard is running" }
                     elseif ($cgConfigured) { "Configured but not running - may need reboot or hardware support" }
                     else { "Credential Guard is not enabled" }) `
            -Evidence @{
                configured                       = $cgConfigured
                running                          = $cgRunning
                virtualizationBasedSecurityStatus = $dgInfo.VirtualizationBasedSecurityStatus
            } `
            -Reference "https://learn.microsoft.com/en-us/windows/security/identity-protection/credential-guard/configure" `
            -MitreId "T1003" `
            -Remediation @{
                PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\DeviceGuard" -Name "EnableVirtualizationBasedSecurity" -Value 1 -Type DWord; Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "LsaCfgFlags" -Value 1 -Type DWord'
                GPO = 'Computer Configuration > Administrative Templates > System > Device Guard > Turn On Virtualization Based Security > Credential Guard Configuration: Enabled with UEFI lock'
                Intune = 'Endpoint security > Account protection > Credential Guard > Enable with UEFI lock'
                Note = 'Requires UEFI, Secure Boot, TPM 2.0, and virtualization extensions. Test on pilot machines first. Reboot required.'
            }

    } catch {
        Add-TestResult `
            -Id "credential-guard" `
            -Category "Credential Protection" `
            -Name "Credential Guard" `
            -Status "INFO" `
            -Detail "Unable to query Credential Guard status (may not be supported on this hardware/OS)" `
            -Evidence @{ error = $_.Exception.Message }
    }

    # --- Test: LSASS Protection (RunAsPPL) ---
    $lsaPPL = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\LSA" -Name "RunAsPPL" -DefaultValue 0

    Add-TestResult `
        -Id "lsass-protection" `
        -Category "Credential Protection" `
        -Name "LSASS Protected Process" `
        -Status $(if ($lsaPPL -eq 1 -or $lsaPPL -eq 2) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($lsaPPL -eq 1 -or $lsaPPL -eq 2) {
            "LSASS runs as Protected Process Light (PPL)"
        } else {
            "LSASS is NOT protected - vulnerable to credential dumping tools like Mimikatz"
        }) `
        -Evidence @{ RunAsPPL = $lsaPPL } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/security/credentials-protection-and-management/configuring-additional-lsa-protection" `
        -MitreId "T1003.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "RunAsPPL" -Value 1 -Type DWord; Restart-Computer'
            GPO = 'Computer Configuration > Administrative Templates > System > Local Security Authority > Configure LSASS to run as a protected process > Enabled with UEFI Lock'
            Intune = 'Endpoint security > Account protection > Local Security Authority > LSASS > Enabled with UEFI Lock'
            Note = 'Requires reboot. Test thoroughly - some older security software may be incompatible with PPL.'
        }

    # --- Test: WDigest Credential Caching ---
    $useLogonCred = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest" -Name "UseLogonCredential" -DefaultValue $null

    # On modern Windows (8.1+), if key doesn't exist, WDigest caching is disabled by default
    $isDisabled = ($null -eq $useLogonCred) -or ($useLogonCred -eq 0)

    Add-TestResult `
        -Id "wdigest-caching" `
        -Category "Credential Protection" `
        -Name "WDigest Credential Caching" `
        -Status $(if ($isDisabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($isDisabled) {
            "WDigest credential caching is disabled"
        } else {
            "WDigest caching ENABLED - cleartext passwords stored in memory!"
        }) `
        -Evidence @{
            UseLogonCredential = $useLogonCred
            keyExists          = ($null -ne $useLogonCred)
        } `
        -Reference "https://blog.stealthbits.com/wdigest-clear-text-passwords-stealing-more-than-a-hash/" `
        -MitreId "T1003.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest" -Name "UseLogonCredential" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > MS Security Guide > WDigest Authentication > Disabled (requires Security Baseline ADMX)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Search "WDigest" > Use Logon Credential > Disabled'
            Note = 'Default disabled on Windows 8.1+ but verify explicitly. No reboot required.'
        }

    # --- Test: LAN Manager Authentication Level (NTLMv2) ---
    $lmCompat = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "LmCompatibilityLevel" -DefaultValue 3
    $lmStatus = if ($lmCompat -ge 5) { "PASS" } elseif ($lmCompat -ge 3) { "WARN" } else { "FAIL" }

    Add-TestResult `
        -Id "lm-compat-level" `
        -Category "Credential Protection" `
        -Name "LAN Manager Authentication Level" `
        -Status $lmStatus `
        -Detail $(if ($lmCompat -ge 5) {
            "NTLMv2 only is enforced (LmCompatibilityLevel=$lmCompat)"
        } elseif ($lmCompat -ge 3) {
            "NTLMv2 is preferred but weaker LM/NTLM may still be allowed (LmCompatibilityLevel=$lmCompat)"
        } else {
            "Weak LM/NTLM authentication allowed (LmCompatibilityLevel=$lmCompat)"
        }) `
        -Evidence @{ LmCompatibilityLevel = $lmCompat } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-security-lan-manager-authentication-level" `
        -MitreId "T1552.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "LmCompatibilityLevel" -Value 5 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Network security: LAN Manager authentication level > Send NTLMv2 response only. Refuse LM & NTLM'
            Intune = 'Devices > Configuration profiles > Settings catalog > LAN Manager authentication level > Send NTLMv2 response only. Refuse LM & NTLM'
        }

    # --- Test: Do Not Store LAN Manager Hash ---
    $noLmHash = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "NoLMHash" -DefaultValue 0

    Add-TestResult `
        -Id "no-lm-hash" `
        -Category "Credential Protection" `
        -Name "Do Not Store LM Hash" `
        -Status $(if ($noLmHash -eq 1) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($noLmHash -eq 1) {
            "LM hash storage is disabled"
        } else {
            "LM hash storage is allowed - weak hashes can be recovered"
        }) `
        -Evidence @{ NoLMHash = $noLmHash } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-security-do-not-store-lan-manager-hash-value-on-next-password-change" `
        -MitreId "T1552.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "NoLMHash" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Network security: Do not store LAN Manager hash value on next password change > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Do not store LAN Manager hash value on next password change > Enabled'
        }

    # --- Test: Cached Logons Count ---
    $cachedLogonsRaw = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" -Name "CachedLogonsCount" -DefaultValue $null
    $cachedLogons = 10
    $parsed = $false
    if ($null -ne $cachedLogonsRaw) {
        $parsed = [int]::TryParse($cachedLogonsRaw.ToString(), [ref]$cachedLogons)
    }

    $cacheStatus = if ($cachedLogons -le 4) { "PASS" } elseif ($cachedLogons -le 10) { "WARN" } else { "FAIL" }
    if (-not $parsed -and $null -ne $cachedLogonsRaw) { $cacheStatus = "WARN" }

    Add-TestResult `
        -Id "cached-logons" `
        -Category "Credential Protection" `
        -Name "Cached Domain Logons Limit" `
        -Status $cacheStatus `
        -Detail $(if ($cachedLogons -le 4) {
            "Cached logons set to $cachedLogons (lower is better)"
        } elseif ($cachedLogons -le 10) {
            "Cached logons set to $cachedLogons (consider reducing)"
        } else {
            "Cached logons set to $cachedLogons - high exposure if device is stolen"
        }) `
        -Evidence @{
            CachedLogonsCountRaw = $cachedLogonsRaw
            CachedLogonsCount    = $cachedLogons
            parsed               = $parsed
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/interactive-logon-number-of-previous-logons-to-cache" `
        -MitreId "T1003" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" -Name "CachedLogonsCount" -Value "4" -Type String'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Interactive logon: Number of previous logons to cache > 4 (or 0 for high-security)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Cached logons count > 4'
            Note = 'Lower values improve security but can affect offline logon capability.'
        }

    # --- Test: Disable Domain Credentials Storage ---
    $disableDomainCreds = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "DisableDomainCreds" -DefaultValue 0

    Add-TestResult `
        -Id "disable-domain-creds" `
        -Category "Credential Protection" `
        -Name "Prevent Domain Credential Storage" `
        -Status $(if ($disableDomainCreds -eq 1) { "PASS" } else { "WARN" }) `
        -Detail $(if ($disableDomainCreds -eq 1) {
            "Domain credentials are not stored locally"
        } else {
            "Domain credentials can be stored locally (Credential Manager)"
        }) `
        -Evidence @{ DisableDomainCreds = $disableDomainCreds } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-access-do-not-allow-storage-of-passwords-and-credentials-for-network-authentication" `
        -MitreId "T1552.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "DisableDomainCreds" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Network access: Do not allow storage of passwords and credentials for network authentication > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Do not allow storage of passwords and credentials for network authentication > Enabled'
        }

    # --- Test: Disable RDP Password Saving ---
    $disableRdpPwdSave = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services" -Name "DisablePasswordSaving" -DefaultValue 0

    Add-TestResult `
        -Id "rdp-password-saving" `
        -Category "Credential Protection" `
        -Name "RDP Password Saving Disabled" `
        -Status $(if ($disableRdpPwdSave -eq 1) { "PASS" } else { "WARN" }) `
        -Detail $(if ($disableRdpPwdSave -eq 1) {
            "RDP clients are prevented from saving passwords"
        } else {
            "RDP password saving may be allowed - credentials can persist on endpoints"
        }) `
        -Evidence @{ DisablePasswordSaving = $disableRdpPwdSave } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/remote-desktop-services-do-not-allow-passwords-to-be-saved" `
        -MitreId "T1552.001" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services" -Name "DisablePasswordSaving" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Remote Desktop Services > Remote Desktop Connection Client > Do not allow passwords to be saved > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Do not allow passwords to be saved > Enabled'
        }

    # --- Test: Restrict Remote SAM Calls ---
    $restrictRemoteSam = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "RestrictRemoteSAM" -DefaultValue $null
    $restrictSet = -not [string]::IsNullOrWhiteSpace($restrictRemoteSam)

    Add-TestResult `
        -Id "restrict-remote-sam" `
        -Category "Credential Protection" `
        -Name "Restrict Remote SAM Enumeration" `
        -Status $(if ($restrictSet) { "PASS" } else { "WARN" }) `
        -Detail $(if ($restrictSet) {
            "Remote SAM enumeration is restricted"
        } else {
            "Remote SAM enumeration may be allowed"
        }) `
        -Evidence @{ RestrictRemoteSAM = $restrictRemoteSam } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-access-restrict-clients-allowed-to-make-remote-calls-to-sam" `
        -MitreId "T1003.002" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa" -Name "RestrictRemoteSAM" -Value "O:BAG:BAD:(A;;RC;;;BA)" -Type String'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Network access: Restrict clients allowed to make remote calls to SAM'
            Intune = 'Devices > Configuration profiles > Settings catalog > Restrict clients allowed to make remote calls to SAM'
            Note = 'Use the Microsoft security baseline recommended SDDL. Test in pilot before broad deployment.'
        }
}

# ============================================================================
# CATEGORY: EXECUTION CONTROLS
# ============================================================================

function Test-ExecutionControlsCategory {
    if (-not (Test-CategoryEnabled "ExecutionControls")) { return }

    # --- Test: PowerShell Script Block Logging ---
    $psScriptBlock = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Name "EnableScriptBlockLogging" -DefaultValue 0
    $psScriptBlockEnabled = ($psScriptBlock -eq 1)

    Add-TestResult `
        -Id "exec-ps-scriptblock" `
        -Category "Execution Controls" `
        -Name "PowerShell Script Block Logging" `
        -Status $(if ($psScriptBlockEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($psScriptBlockEnabled) { "Script block logging is enabled" } else { "Script block logging is not enabled" }) `
        -Evidence @{ EnableScriptBlockLogging = $psScriptBlock } `
        -Reference "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_logging_windows" `
        -MitreId "T1059.001" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Name "EnableScriptBlockLogging" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on PowerShell Script Block Logging > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Script Block Logging > Enabled'
        }

    # --- Test: PowerShell Module Logging ---
    $psModuleLogging = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" -Name "EnableModuleLogging" -DefaultValue 0
    $psModuleEnabled = ($psModuleLogging -eq 1)

    Add-TestResult `
        -Id "exec-ps-module-logging" `
        -Category "Execution Controls" `
        -Name "PowerShell Module Logging" `
        -Status $(if ($psModuleEnabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($psModuleEnabled) { "Module logging is enabled" } else { "Module logging is not enabled" }) `
        -Evidence @{ EnableModuleLogging = $psModuleLogging } `
        -Reference "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_logging_windows" `
        -MitreId "T1059.001" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" -Name "EnableModuleLogging" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Module Logging > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Module Logging > Enabled'
        }

    # --- Test: PowerShell Transcription ---
    $psTranscription = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription" -Name "EnableTranscripting" -DefaultValue 0
    $psTranscriptEnabled = ($psTranscription -eq 1)

    Add-TestResult `
        -Id "exec-ps-transcription" `
        -Category "Execution Controls" `
        -Name "PowerShell Transcription" `
        -Status $(if ($psTranscriptEnabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($psTranscriptEnabled) { "PowerShell transcription is enabled" } else { "PowerShell transcription is not enabled" }) `
        -Evidence @{ EnableTranscripting = $psTranscription } `
        -Reference "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_logging_windows" `
        -MitreId "T1059.001" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\Transcription" -Name "EnableTranscripting" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on PowerShell Transcription > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Transcription > Enabled'
        }

    # --- Test: PowerShell v2 Disabled ---
    if (Test-CommandExists "Get-WindowsOptionalFeature") {
        try {
            $psV2 = Get-WindowsOptionalFeature -Online -FeatureName "MicrosoftWindowsPowerShellV2" -ErrorAction Stop
            $psV2Root = Get-WindowsOptionalFeature -Online -FeatureName "MicrosoftWindowsPowerShellV2Root" -ErrorAction SilentlyContinue
            $psV2Enabled = ($psV2.State -eq "Enabled") -or ($psV2Root -and $psV2Root.State -eq "Enabled")

            Add-TestResult `
                -Id "exec-ps-v2" `
                -Category "Execution Controls" `
                -Name "PowerShell v2 Disabled" `
                -Status $(if (-not $psV2Enabled) { "PASS" } else { "FAIL" }) `
                -Detail $(if (-not $psV2Enabled) { "PowerShell v2 is disabled" } else { "PowerShell v2 is enabled (legacy engine without modern logging)" }) `
                -Evidence @{
                    PowerShellV2State     = $psV2.State.ToString()
                    PowerShellV2RootState = if ($psV2Root) { $psV2Root.State.ToString() } else { "Unknown" }
                } `
                -Reference "https://learn.microsoft.com/en-us/powershell/scripting/windows-powershell/wmf/whats-new/disable-windows-powershell-2-0" `
                -MitreId "T1059.001" `
                -Remediation @{
                    PowerShell = 'Disable-WindowsOptionalFeature -Online -FeatureName MicrosoftWindowsPowerShellV2 -NoRestart'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Script Execution (set to a modern, signed policy) and disable legacy PowerShell v2 feature'
                    Intune = 'Devices > Configuration profiles > Settings catalog > Windows Optional Features > Disable MicrosoftWindowsPowerShellV2'
                }

        } catch {
            Add-TestResult `
                -Id "exec-ps-v2" `
                -Category "Execution Controls" `
                -Name "PowerShell v2 Disabled" `
                -Status "WARN" `
                -Detail "Unable to query PowerShell v2 optional feature: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message } `
                -MitreId "T1059.001" `
                -Remediation @{
                    PowerShell = 'Disable-WindowsOptionalFeature -Online -FeatureName MicrosoftWindowsPowerShellV2 -NoRestart'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Script Execution (set to a modern, signed policy) and disable legacy PowerShell v2 feature'
                    Intune = 'Devices > Configuration profiles > Settings catalog > Windows Optional Features > Disable MicrosoftWindowsPowerShellV2'
                }
        }
    } else {
        Add-TestResult `
            -Id "exec-ps-v2" `
            -Category "Execution Controls" `
            -Name "PowerShell v2 Disabled" `
            -Status "SKIP" `
            -Detail "Optional features cmdlets not available on this system" `
            -Evidence @{ cmdletExists = $false } `
            -MitreId "T1059.001" `
            -Remediation @{
                PowerShell = 'Disable-WindowsOptionalFeature -Online -FeatureName MicrosoftWindowsPowerShellV2 -NoRestart'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Script Execution (set to a modern, signed policy) and disable legacy PowerShell v2 feature'
                Intune = 'Devices > Configuration profiles > Settings catalog > Windows Optional Features > Disable MicrosoftWindowsPowerShellV2'
            }
    }

    # --- Test: PowerShell Execution Policy (LocalMachine) ---
    try {
        $execPolicy = Get-ExecutionPolicy -Scope LocalMachine
        $policyStatus = switch ($execPolicy) {
            "AllSigned" { "PASS" }
            "RemoteSigned" { "PASS" }
            "Undefined" { "WARN" }
            "Bypass" { "FAIL" }
            "Unrestricted" { "FAIL" }
            default { "WARN" }
        }

        Add-TestResult `
            -Id "exec-ps-execution-policy" `
            -Category "Execution Controls" `
            -Name "PowerShell Execution Policy (LocalMachine)" `
            -Status $policyStatus `
            -Detail "Execution policy is $execPolicy" `
            -Evidence @{ ExecutionPolicy = $execPolicy } `
            -Reference "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies" `
            -MitreId "T1059.001" `
            -Remediation @{
                PowerShell = 'Set-ExecutionPolicy -ExecutionPolicy AllSigned -Scope LocalMachine'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Script Execution > Allow only signed scripts'
                Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Script Execution > Allow only signed scripts'
            }

    } catch {
        Add-TestResult `
            -Id "exec-ps-execution-policy" `
            -Category "Execution Controls" `
            -Name "PowerShell Execution Policy (LocalMachine)" `
            -Status "WARN" `
            -Detail "Unable to read execution policy: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message } `
            -MitreId "T1059.001" `
            -Remediation @{
                PowerShell = 'Set-ExecutionPolicy -ExecutionPolicy AllSigned -Scope LocalMachine'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on Script Execution > Allow only signed scripts'
                Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Script Execution > Allow only signed scripts'
            }
    }

    # --- Test: AMSI Providers Registered ---
    if (Test-Path "HKLM:\SOFTWARE\Microsoft\AMSI\Providers") {
        $amsiProviders = @(Get-ChildItem -Path "HKLM:\SOFTWARE\Microsoft\AMSI\Providers" -ErrorAction SilentlyContinue)
        $amsiCount = $amsiProviders.Count

        Add-TestResult `
            -Id "exec-amsi-providers" `
            -Category "Execution Controls" `
            -Name "AMSI Providers Registered" `
            -Status $(if ($amsiCount -gt 0) { "PASS" } else { "WARN" }) `
            -Detail $(if ($amsiCount -gt 0) { "$amsiCount AMSI provider(s) registered" } else { "No AMSI providers registered" }) `
            -Evidence @{ providerCount = $amsiCount } `
            -Reference "https://learn.microsoft.com/en-us/windows/win32/amsi/antimalware-scan-interface-portal" `
            -MitreId "T1059.001" `
            -Remediation @{
                PowerShell = 'Repair-WindowsImage -Online -RestoreHealth'
                GPO = 'Ensure Microsoft Defender and AMSI-capable AV is installed and healthy'
                Intune = 'Endpoint security > Antivirus > Ensure Microsoft Defender is enabled'
                Note = 'AMSI providers are typically registered by Defender or third-party AV.'
            }
    } else {
        Add-TestResult `
            -Id "exec-amsi-providers" `
            -Category "Execution Controls" `
            -Name "AMSI Providers Registered" `
            -Status "WARN" `
            -Detail "AMSI provider registry key not found" `
            -Evidence @{ keyExists = $false } `
            -MitreId "T1059.001" `
            -Remediation @{
                PowerShell = 'Repair-WindowsImage -Online -RestoreHealth'
                GPO = 'Ensure Microsoft Defender and AMSI-capable AV is installed and healthy'
                Intune = 'Endpoint security > Antivirus > Ensure Microsoft Defender is enabled'
                Note = 'AMSI providers are typically registered by Defender or third-party AV.'
            }
    }

    # --- Test: Application Control (AppLocker or WDAC) ---
    $applockerEnforced = $false
    $applockerAudit = $false
    $applockerRules = 0

    if (Test-CommandExists "Get-AppLockerPolicy") {
        try {
            $appPolicy = Get-AppLockerPolicy -Effective -ErrorAction Stop
            $collections = @($appPolicy.RuleCollections)
            $applockerRules = ($collections | ForEach-Object { $_.Rules.Count } | Measure-Object -Sum).Sum
            $applockerEnforced = ($collections | Where-Object { $_.EnforcementMode -eq "Enforced" -and $_.Rules.Count -gt 0 }).Count -gt 0
            $applockerAudit = ($collections | Where-Object { $_.EnforcementMode -eq "AuditOnly" -and $_.Rules.Count -gt 0 }).Count -gt 0
        } catch {
            $applockerRules = 0
        }
    }

    $wdacPolicyPath = Join-Path $env:windir "System32\CodeIntegrity\CiPolicies\Active"
    $wdacPolicies = if (Test-Path $wdacPolicyPath) {
        @(Get-ChildItem -Path $wdacPolicyPath -Filter *.cip -ErrorAction SilentlyContinue)
    } else { @() }
    $wdacActive = ($wdacPolicies.Count -gt 0)

    $appControlStatus = if ($wdacActive -or $applockerEnforced) { "PASS" }
                        elseif ($applockerAudit) { "WARN" }
                        else { "FAIL" }

    Add-TestResult `
        -Id "exec-app-control" `
        -Category "Execution Controls" `
        -Name "Application Control (AppLocker/WDAC)" `
        -Status $appControlStatus `
        -Detail $(if ($wdacActive) {
            "WDAC policy active"
        } elseif ($applockerEnforced) {
            "AppLocker rules enforced"
        } elseif ($applockerAudit) {
            "AppLocker in audit mode (no enforcement)"
        } else {
            "No application control policy detected"
        }) `
        -Evidence @{
            wdacPolicies      = @($wdacPolicies | ForEach-Object { $_.Name })
            appLockerRules    = $applockerRules
            appLockerEnforced = $applockerEnforced
            appLockerAudit    = $applockerAudit
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/windows-defender-application-control" `
        -MitreId "T1204" `
        -Remediation @{
            PowerShell = 'New-CIPolicy -Level Publisher -FilePath ".\\WDAC.xml"; ConvertFrom-CIPolicy ".\\WDAC.xml" ".\\WDAC.cip"; Copy-Item ".\\WDAC.cip" "$env:windir\\System32\\CodeIntegrity\\CiPolicies\\Active\\"'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Application Control Policies > AppLocker > Enforce rules for EXE/DLL, Script, MSI, and Packaged apps'
            Intune = 'Endpoint security > Application control > Windows Defender Application Control (WDAC) > Enable'
            Note = 'Start in audit mode, validate, then enforce.'
        }

    # --- Test: SmartScreen Enabled ---
    $smartScreenPolicy = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name "EnableSmartScreen" -DefaultValue $null
    $smartScreenShell = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer" -Name "SmartScreenEnabled" -DefaultValue $null
    $smartScreenEnabled = ($smartScreenPolicy -eq 1) -or ($smartScreenShell -in @("RequireAdmin", "Warn"))

    Add-TestResult `
        -Id "exec-smartscreen" `
        -Category "Execution Controls" `
        -Name "SmartScreen Enabled" `
        -Status $(if ($smartScreenEnabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($smartScreenEnabled) { "SmartScreen is enabled" } else { "SmartScreen not enabled by policy" }) `
        -Evidence @{
            EnableSmartScreen = $smartScreenPolicy
            SmartScreenEnabled = $smartScreenShell
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-defender-smartscreen/windows-defender-smartscreen-overview" `
        -MitreId "T1204" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\System" -Name "EnableSmartScreen" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > File Explorer > Configure Windows Defender SmartScreen > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Configure Windows Defender SmartScreen > Enabled'
        }

    # --- Test: Windows Script Host Disabled ---
    $wshEnabled = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows Script Host\Settings" -Name "Enabled" -DefaultValue 1
    $wshDisabled = ($wshEnabled -eq 0)

    Add-TestResult `
        -Id "exec-wsh-disabled" `
        -Category "Execution Controls" `
        -Name "Windows Script Host Disabled" `
        -Status $(if ($wshDisabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($wshDisabled) { "Windows Script Host is disabled" } else { "Windows Script Host is enabled (VBScript/JS execution allowed)" }) `
        -Evidence @{ WSHEnabled = $wshEnabled } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-defender-smartscreen/windows-script-host" `
        -MitreId "T1059.005" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Microsoft\Windows Script Host\Settings" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows Script Host\Settings" -Name "Enabled" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows Script Host > Prevent Windows Script Host from running > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Prevent Windows Script Host from running > Enabled'
        }

    # --- Test: Office Macros Blocked from Internet ---
    $officeApps = @("Word", "Excel", "PowerPoint", "Access")
    $macroBlockValues = @()
    foreach ($app in $officeApps) {
        $val = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\$app\Security" -Name "BlockContentExecutionFromInternet" -DefaultValue $null
        if ($null -ne $val) {
            $macroBlockValues += [ordered]@{ app = $app; value = $val }
        }
    }

    if ($macroBlockValues.Count -eq 0) {
        Add-TestResult `
            -Id "exec-office-macro-internet" `
            -Category "Execution Controls" `
            -Name "Office Macros from Internet Blocked" `
            -Status "SKIP" `
            -Detail "Office policy keys not found (Office may not be installed or policy not configured)" `
            -Evidence @{ policyDetected = $false } `
            -MitreId "T1204.002" `
            -Remediation @{
                PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Name "BlockContentExecutionFromInternet" -Value 1 -Type DWord'
                GPO = 'Computer Configuration > Administrative Templates > Microsoft Office 2016 > Security Settings > Block macros from running in Office files from the Internet > Enabled'
                Intune = 'Devices > Configuration profiles > Settings catalog > Block macros from running in Office files from the Internet > Enabled'
            }
    } else {
        $blockedAll = ($macroBlockValues | Where-Object { $_.value -ne 1 }).Count -eq 0
        $macroStatus = if ($blockedAll) { "PASS" } else { "WARN" }

        Add-TestResult `
            -Id "exec-office-macro-internet" `
            -Category "Execution Controls" `
            -Name "Office Macros from Internet Blocked" `
            -Status $macroStatus `
            -Detail $(if ($blockedAll) { "All detected Office apps block macros from the internet" } else { "Not all Office apps block macros from the internet" }) `
            -Evidence @{ apps = $macroBlockValues } `
            -Reference "https://learn.microsoft.com/en-us/deployoffice/security/internet-macros-blocked" `
            -MitreId "T1204.002" `
            -Remediation @{
                PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Name "BlockContentExecutionFromInternet" -Value 1 -Type DWord'
                GPO = 'Computer Configuration > Administrative Templates > Microsoft Office 2016 > Security Settings > Block macros from running in Office files from the Internet > Enabled'
                Intune = 'Devices > Configuration profiles > Settings catalog > Block macros from running in Office files from the Internet > Enabled'
            }
    }

    # --- Test: Office Macro Warning Level ---
    $macroWarningValues = @()
    foreach ($app in $officeApps) {
        $val = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\$app\Security" -Name "VBAWarnings" -DefaultValue $null
        if ($null -ne $val) {
            $macroWarningValues += [ordered]@{ app = $app; value = $val }
        }
    }

    if ($macroWarningValues.Count -eq 0) {
        Add-TestResult `
            -Id "exec-office-macro-warnings" `
            -Category "Execution Controls" `
            -Name "Office Macro Warning Level" `
            -Status "SKIP" `
            -Detail "Office macro warning policies not detected" `
            -Evidence @{ policyDetected = $false } `
            -MitreId "T1204.002" `
            -Remediation @{
                PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Name "VBAWarnings" -Value 4 -Type DWord'
                GPO = 'Computer Configuration > Administrative Templates > Microsoft Office 2016 > Security Settings > VBA Macro Notification Settings > Disable all without notification (or only signed macros)'
                Intune = 'Devices > Configuration profiles > Settings catalog > VBA Macro Notification Settings > Disable all without notification'
            }
    } else {
        $macroWeak = ($macroWarningValues | Where-Object { $_.value -in @(0, 1) }).Count -gt 0
        $macroOk = ($macroWarningValues | Where-Object { $_.value -in @(3, 4) }).Count -eq $macroWarningValues.Count
        $macroStatus = if ($macroOk) { "PASS" } elseif ($macroWeak) { "FAIL" } else { "WARN" }

        Add-TestResult `
            -Id "exec-office-macro-warnings" `
            -Category "Execution Controls" `
            -Name "Office Macro Warning Level" `
            -Status $macroStatus `
            -Detail "VBA warning levels: $(@($macroWarningValues | ForEach-Object { $_.app + '=' + $_.value }) -join ', ')" `
            -Evidence @{ apps = $macroWarningValues } `
            -Reference "https://learn.microsoft.com/en-us/deployoffice/security/vba-macro-notifications" `
            -MitreId "T1204.002" `
            -Remediation @{
                PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Office\16.0\Word\Security" -Name "VBAWarnings" -Value 4 -Type DWord'
                GPO = 'Computer Configuration > Administrative Templates > Microsoft Office 2016 > Security Settings > VBA Macro Notification Settings > Disable all without notification (or only signed macros)'
                Intune = 'Devices > Configuration profiles > Settings catalog > VBA Macro Notification Settings > Disable all without notification'
            }
    }

    # --- Test: WMI Activity Logging ---
    $wmiLogEnabled = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-WMI-Activity/Operational" -Name "Enabled" -DefaultValue 0
    $wmiLogStatus = ($wmiLogEnabled -eq 1)

    Add-TestResult `
        -Id "exec-wmi-logging" `
        -Category "Execution Controls" `
        -Name "WMI Activity Logging" `
        -Status $(if ($wmiLogStatus) { "PASS" } else { "WARN" }) `
        -Detail $(if ($wmiLogStatus) { "WMI Activity Operational log is enabled" } else { "WMI Activity Operational log is disabled" }) `
        -Evidence @{ WmiLogEnabled = $wmiLogEnabled } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/wmisdk/enable-wmi-activity-tracing" `
        -MitreId "T1047" `
        -Remediation @{
            PowerShell = 'wevtutil sl "Microsoft-Windows-WMI-Activity/Operational" /e:true'
            GPO = 'Computer Configuration > Policies > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit Other Object Access Events > Success'
            Intune = 'Devices > Configuration profiles > Settings catalog > Audit Other Object Access Events > Success'
        }
}

# ============================================================================
# CATEGORY: PRIVILEGE ESCALATION PREVENTION
# ============================================================================

function Test-PrivilegeEscalationCategory {
    if (-not (Test-CategoryEnabled "PrivilegeEscalation")) { return }

    # --- Test: UAC Enabled ---
    $enableLUA = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" -DefaultValue 1
    $uacEnabled = ($enableLUA -eq 1)

    Add-TestResult `
        -Id "priv-uac-enabled" `
        -Category "Privilege Escalation Prevention" `
        -Name "User Account Control Enabled" `
        -Status $(if ($uacEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($uacEnabled) { "UAC is enabled" } else { "UAC is disabled" }) `
        -Evidence @{ EnableLUA = $enableLUA } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/user-account-control-run-all-administrators-in-admin-approval-mode" `
        -MitreId "T1548" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > User Account Control: Run all administrators in Admin Approval Mode > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Run all administrators in Admin Approval Mode > Enabled'
            Note = 'Requires reboot.'
        }

    # --- Test: Admin Approval Mode for Built-in Administrator ---
    $filterAdminToken = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "FilterAdministratorToken" -DefaultValue 0
    $adminApproval = ($filterAdminToken -eq 1)

    Add-TestResult `
        -Id "priv-admin-approval-mode" `
        -Category "Privilege Escalation Prevention" `
        -Name "Admin Approval Mode (Built-in Administrator)" `
        -Status $(if ($adminApproval) { "PASS" } else { "WARN" }) `
        -Detail $(if ($adminApproval) { "Built-in Administrator uses Admin Approval Mode" } else { "Built-in Administrator not in Admin Approval Mode" }) `
        -Evidence @{ FilterAdministratorToken = $filterAdminToken } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/user-account-control-admin-approval-mode-for-the-built-in-administrator-account" `
        -MitreId "T1548" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "FilterAdministratorToken" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > User Account Control: Admin Approval Mode for the Built-in Administrator account > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Admin Approval Mode for the Built-in Administrator account > Enabled'
        }

    # --- Test: UAC Consent Prompt Behavior (Admins) ---
    $consentPromptAdmin = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorAdmin" -DefaultValue 5
    $adminPromptStatus = if ($consentPromptAdmin -in @(2, 5)) { "PASS" }
                         elseif ($consentPromptAdmin -eq 4) { "WARN" }
                         else { "FAIL" }

    Add-TestResult `
        -Id "priv-consent-prompt-admin" `
        -Category "Privilege Escalation Prevention" `
        -Name "UAC Consent Prompt for Administrators" `
        -Status $adminPromptStatus `
        -Detail "ConsentPromptBehaviorAdmin = $consentPromptAdmin" `
        -Evidence @{ ConsentPromptBehaviorAdmin = $consentPromptAdmin } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/user-account-control-behavior-of-the-elevation-prompt-for-administrators-in-admin-approval-mode" `
        -MitreId "T1548" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "ConsentPromptBehaviorAdmin" -Value 5 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > User Account Control: Behavior of the elevation prompt for administrators > Prompt for credentials on the secure desktop'
            Intune = 'Devices > Configuration profiles > Settings catalog > Behavior of the elevation prompt for administrators > Prompt for credentials on the secure desktop'
        }

    # --- Test: UAC Secure Desktop ---
    $secureDesktop = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "PromptOnSecureDesktop" -DefaultValue 1
    $secureDesktopEnabled = ($secureDesktop -eq 1)

    Add-TestResult `
        -Id "priv-secure-desktop" `
        -Category "Privilege Escalation Prevention" `
        -Name "UAC Secure Desktop" `
        -Status $(if ($secureDesktopEnabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($secureDesktopEnabled) { "Secure Desktop is enabled for UAC prompts" } else { "Secure Desktop is disabled for UAC prompts" }) `
        -Evidence @{ PromptOnSecureDesktop = $secureDesktop } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/user-account-control-switch-to-the-secure-desktop-when-prompting-for-elevation" `
        -MitreId "T1548" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "PromptOnSecureDesktop" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > User Account Control: Switch to the secure desktop when prompting for elevation > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Switch to the secure desktop when prompting for elevation > Enabled'
        }

    # --- Test: Always Install Elevated Disabled ---
    $aieLM = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Name "AlwaysInstallElevated" -DefaultValue 0
    $aieCU = Get-RegistryValueSafe -Path "HKCU:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Name "AlwaysInstallElevated" -DefaultValue 0
    $aieEnabled = ($aieLM -eq 1) -or ($aieCU -eq 1)

    Add-TestResult `
        -Id "priv-always-install-elevated" `
        -Category "Privilege Escalation Prevention" `
        -Name "AlwaysInstallElevated Disabled" `
        -Status $(if (-not $aieEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if (-not $aieEnabled) { "AlwaysInstallElevated is disabled" } else { "AlwaysInstallElevated is enabled - MSI packages can elevate" }) `
        -Evidence @{
            AlwaysInstallElevatedHKLM = $aieLM
            AlwaysInstallElevatedHKCU = $aieCU
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/windows-installer-always-install-with-elevated-privileges" `
        -MitreId "T1548" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Name "AlwaysInstallElevated" -Value 0 -Type DWord; New-Item -Path "HKCU:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Force | Out-Null; Set-ItemProperty -Path "HKCU:\SOFTWARE\Policies\Microsoft\Windows\Installer" -Name "AlwaysInstallElevated" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows Installer > Always install with elevated privileges > Disabled (also set user policy)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Always install with elevated privileges > Disabled'
        }
}

# ============================================================================
# CATEGORY: LATERAL MOVEMENT PREVENTION
# ============================================================================

function Test-LateralMovementCategory {
    if (-not (Test-CategoryEnabled "LateralMovement")) { return }

    # --- Test: RDP Network Level Authentication ---
    $rdpDisabled = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -DefaultValue 1
    $nlaRequired = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "UserAuthentication" -DefaultValue 0
    $rdpEnabled = ($rdpDisabled -ne 1)

    Add-TestResult `
        -Id "lateral-rdp-nla" `
        -Category "Lateral Movement Prevention" `
        -Name "RDP Network Level Authentication" `
        -Status $(if (-not $rdpEnabled) { "PASS" } elseif ($nlaRequired -eq 1) { "PASS" } else { "FAIL" }) `
        -Detail $(if (-not $rdpEnabled) { "RDP is disabled" } elseif ($nlaRequired -eq 1) { "NLA is required for RDP" } else { "NLA is not required for RDP" }) `
        -Evidence @{
            rdpEnabled  = $rdpEnabled
            nlaRequired = ($nlaRequired -eq 1)
        } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access" `
        -MitreId "T1021.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "UserAuthentication" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Remote Desktop Services > Remote Desktop Session Host > Security > Require user authentication for remote connections by using NLA > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Require user authentication for remote connections by using NLA > Enabled'
        }

    # --- Test: RDP TLS Security Layer ---
    $securityLayer = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "SecurityLayer" -DefaultValue 0
    $tlsRequired = ($securityLayer -eq 2)

    Add-TestResult `
        -Id "lateral-rdp-tls" `
        -Category "Lateral Movement Prevention" `
        -Name "RDP TLS Security Layer" `
        -Status $(if (-not $rdpEnabled) { "PASS" } elseif ($tlsRequired) { "PASS" } else { "WARN" }) `
        -Detail $(if (-not $rdpEnabled) { "RDP is disabled" } elseif ($tlsRequired) { "RDP requires TLS (SecurityLayer=2)" } else { "RDP does not enforce TLS (SecurityLayer=$securityLayer)" }) `
        -Evidence @{ SecurityLayer = $securityLayer } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access" `
        -MitreId "T1021.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "SecurityLayer" -Value 2 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Remote Desktop Services > Remote Desktop Session Host > Security > Require use of specific security layer for remote (RDP) connections > SSL (TLS 1.0)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Require use of specific security layer for remote connections > SSL'
        }

    # --- Test: SMB Signing Required ---
    if (Test-CommandExists "Get-SmbServerConfiguration") {
        try {
            $smbConfig = Get-SmbServerConfiguration -ErrorAction Stop
            Add-TestResult `
                -Id "lateral-smb-signing" `
                -Category "Lateral Movement Prevention" `
                -Name "SMB Signing Required" `
                -Status $(if ($smbConfig.RequireSecuritySignature) { "PASS" } else { "FAIL" }) `
                -Detail $(if ($smbConfig.RequireSecuritySignature) { "SMB signing is required" } else { "SMB signing is not required" }) `
                -Evidence @{
                    RequireSecuritySignature = $smbConfig.RequireSecuritySignature
                    EnableSecuritySignature  = $smbConfig.EnableSecuritySignature
                } `
                -Reference "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/overview-server-message-block-signing" `
                -MitreId "T1021.002" `
                -Remediation @{
                    PowerShell = 'Set-SmbServerConfiguration -RequireSecuritySignature $true -EnableSecuritySignature $true -Force'
                    GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Microsoft network server: Digitally sign communications (always) > Enabled'
                    Intune = 'Devices > Configuration profiles > Settings catalog > Microsoft network server: Digitally sign communications (always) > Enabled'
                }
        } catch {
            Add-TestResult `
                -Id "lateral-smb-signing" `
                -Category "Lateral Movement Prevention" `
                -Name "SMB Signing Required" `
                -Status "WARN" `
                -Detail "Unable to query SMB server configuration: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message } `
                -MitreId "T1021.002" `
                -Remediation @{
                    PowerShell = 'Set-SmbServerConfiguration -RequireSecuritySignature $true -EnableSecuritySignature $true -Force'
                    GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Microsoft network server: Digitally sign communications (always) > Enabled'
                    Intune = 'Devices > Configuration profiles > Settings catalog > Microsoft network server: Digitally sign communications (always) > Enabled'
                }
        }
    } else {
        Add-TestResult `
            -Id "lateral-smb-signing" `
            -Category "Lateral Movement Prevention" `
            -Name "SMB Signing Required" `
            -Status "SKIP" `
            -Detail "SMB server cmdlets not available" `
            -Evidence @{ cmdletExists = $false } `
            -MitreId "T1021.002" `
            -Remediation @{
                PowerShell = 'Set-SmbServerConfiguration -RequireSecuritySignature $true -EnableSecuritySignature $true -Force'
                GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Microsoft network server: Digitally sign communications (always) > Enabled'
                Intune = 'Devices > Configuration profiles > Settings catalog > Microsoft network server: Digitally sign communications (always) > Enabled'
            }
    }

    # --- Test: SMBv1 Disabled ---
    $smb1Enabled = $false
    $smb1Server = $null
    $smb1FeatureState = $null

    if (Test-CommandExists "Get-SmbServerConfiguration") {
        try {
            $smbConfig = Get-SmbServerConfiguration -ErrorAction Stop
            $smb1Server = $smbConfig.EnableSMB1Protocol
            if ($smb1Server -eq $true) { $smb1Enabled = $true }
        } catch { }
    }
    if (Test-CommandExists "Get-WindowsOptionalFeature") {
        try {
            $smb1Feature = Get-WindowsOptionalFeature -Online -FeatureName "SMB1Protocol" -ErrorAction Stop
            $smb1FeatureState = $smb1Feature.State.ToString()
            if ($smb1FeatureState -eq "Enabled") { $smb1Enabled = $true }
        } catch { }
    }

    Add-TestResult `
        -Id "lateral-smbv1-disabled" `
        -Category "Lateral Movement Prevention" `
        -Name "SMBv1 Disabled" `
        -Status $(if (-not $smb1Enabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if (-not $smb1Enabled) { "SMBv1 is disabled" } else { "SMBv1 is enabled" }) `
        -Evidence @{
            SmbServerSMB1Enabled  = $smb1Server
            SmbFeatureState       = $smb1FeatureState
        } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/storage/file-server/troubleshoot/detect-enable-and-disable-smbv1-v2-v3" `
        -MitreId "T1021.002" `
        -Remediation @{
            PowerShell = 'Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart'
            GPO = 'Computer Configuration > Administrative Templates > Network > Lanman Workstation > Enable insecure guest logons > Disabled (and remove SMBv1 feature)'
            Intune = 'Devices > Configuration profiles > Settings catalog > SMB1Protocol > Disabled'
        }

    # --- Test: WinRM Remote Shell Access ---
    $winrmService = Get-CimInstance -ClassName Win32_Service -Filter "Name='WinRM'" -ErrorAction SilentlyContinue
    $allowRemoteShell = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WinRM\Service" -Name "AllowRemoteShellAccess" -DefaultValue $null
    $winrmRunning = ($winrmService -and $winrmService.State -eq "Running")
    $winrmRestricted = ($allowRemoteShell -eq 0)

    Add-TestResult `
        -Id "lateral-winrm-shell" `
        -Category "Lateral Movement Prevention" `
        -Name "WinRM Remote Shell Restricted" `
        -Status $(if (-not $winrmRunning) { "PASS" } elseif ($winrmRestricted) { "PASS" } else { "WARN" }) `
        -Detail $(if (-not $winrmRunning) { "WinRM service is not running" } elseif ($winrmRestricted) { "WinRM remote shell access is disabled by policy" } else { "WinRM remote shell access may be allowed" }) `
        -Evidence @{
            winrmState           = if ($winrmService) { $winrmService.State } else { "Unknown" }
            allowRemoteShellAccess = $allowRemoteShell
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/winrm/installation-and-configuration-for-windows-remote-management" `
        -MitreId "T1021.006" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WinRM\Service" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\WinRM\Service" -Name "AllowRemoteShellAccess" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows Remote Management (WinRM) > WinRM Service > Allow remote server management through WinRM > Disabled (or restrict)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Allow remote server management through WinRM > Disabled'
        }

    # --- Test: Remote Registry Disabled ---
    $remoteReg = Get-CimInstance -ClassName Win32_Service -Filter "Name='RemoteRegistry'" -ErrorAction SilentlyContinue
    $remoteRegDisabled = ($remoteReg -and $remoteReg.StartMode -eq "Disabled")

    Add-TestResult `
        -Id "lateral-remote-registry" `
        -Category "Lateral Movement Prevention" `
        -Name "Remote Registry Service Disabled" `
        -Status $(if ($remoteRegDisabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($remoteRegDisabled) { "Remote Registry service is disabled" } else { "Remote Registry service is not disabled" }) `
        -Evidence @{
            startMode = if ($remoteReg) { $remoteReg.StartMode } else { "Unknown" }
            state     = if ($remoteReg) { $remoteReg.State } else { "Unknown" }
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/services/remote-registry-service" `
        -MitreId "T1021" `
        -Remediation @{
            PowerShell = 'Set-Service -Name RemoteRegistry -StartupType Disabled; Stop-Service -Name RemoteRegistry -Force'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > System Services > Remote Registry > Disabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Remote Registry > Startup type: Disabled'
        }

    # --- Test: SMB Insecure Guest Logons Disabled ---
    $guestAuth = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters" -Name "AllowInsecureGuestAuth" -DefaultValue 0
    $guestDisabled = ($guestAuth -eq 0)

    Add-TestResult `
        -Id "lateral-smb-guest" `
        -Category "Lateral Movement Prevention" `
        -Name "SMB Insecure Guest Logons Disabled" `
        -Status $(if ($guestDisabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($guestDisabled) { "Insecure guest logons are disabled" } else { "Insecure guest logons are allowed" }) `
        -Evidence @{ AllowInsecureGuestAuth = $guestAuth } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-security-enable-insecure-guest-logons" `
        -MitreId "T1021.002" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanWorkstation\Parameters" -Name "AllowInsecureGuestAuth" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Network > Lanman Workstation > Enable insecure guest logons > Disabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > Enable insecure guest logons > Disabled'
        }

    # --- Test: Local Account Token Filtering ---
    $tokenFilter = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "LocalAccountTokenFilterPolicy" -DefaultValue 0
    $tokenFiltered = ($tokenFilter -eq 0)

    Add-TestResult `
        -Id "lateral-token-filter" `
        -Category "Lateral Movement Prevention" `
        -Name "Local Account Token Filtering" `
        -Status $(if ($tokenFiltered) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($tokenFiltered) { "Local account token filtering is enabled" } else { "Local account token filtering is disabled" }) `
        -Evidence @{ LocalAccountTokenFilterPolicy = $tokenFilter } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-access-sharing-and-security-model-for-local-accounts" `
        -MitreId "T1021.002" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "LocalAccountTokenFilterPolicy" -Value 0 -Type DWord'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Local Policies > Security Options > Network access: Sharing and security model for local accounts > Classic - local users authenticate as themselves'
            Intune = 'Devices > Configuration profiles > Settings catalog > Sharing and security model for local accounts > Classic'
        }
}

# ============================================================================
# CATEGORY: DEFENSE EVASION PREVENTION
# ============================================================================

function Test-DefenseEvasionCategory {
    if (-not (Test-CategoryEnabled "DefenseEvasion")) { return }

    # --- Test: Defender Tamper Protection ---
    if (Test-CommandExists "Get-MpComputerStatus") {
        try {
            $defender = Get-MpComputerStatus -ErrorAction Stop
            Add-TestResult `
                -Id "evade-tamper-protection" `
                -Category "Defense Evasion Prevention" `
                -Name "Defender Tamper Protection" `
                -Status $(if ($defender.IsTamperProtected) { "PASS" } else { "FAIL" }) `
                -Detail $(if ($defender.IsTamperProtected) { "Tamper protection is enabled" } else { "Tamper protection is disabled" }) `
                -Evidence @{ IsTamperProtected = $defender.IsTamperProtected } `
                -Reference "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/tamper-protection" `
                -MitreId "T1562.001" `
                -Remediation @{
                    PowerShell = 'Set-MpPreference -DisableTamperProtection $false'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Tamper Protection > Enabled'
                    Intune = 'Endpoint security > Antivirus > Tamper protection > Enabled'
                }
        } catch {
            Add-TestResult `
                -Id "evade-tamper-protection" `
                -Category "Defense Evasion Prevention" `
                -Name "Defender Tamper Protection" `
                -Status "WARN" `
                -Detail "Unable to query Defender tamper protection: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message } `
                -MitreId "T1562.001" `
                -Remediation @{
                    PowerShell = 'Set-MpPreference -DisableTamperProtection $false'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Tamper Protection > Enabled'
                    Intune = 'Endpoint security > Antivirus > Tamper protection > Enabled'
                }
        }
    } else {
        Add-TestResult `
            -Id "evade-tamper-protection" `
            -Category "Defense Evasion Prevention" `
            -Name "Defender Tamper Protection" `
            -Status "SKIP" `
            -Detail "Defender cmdlets not available" `
            -Evidence @{ cmdletExists = $false } `
            -MitreId "T1562.001" `
            -Remediation @{
                PowerShell = 'Set-MpPreference -DisableTamperProtection $false'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Tamper Protection > Enabled'
                Intune = 'Endpoint security > Antivirus > Tamper protection > Enabled'
            }
    }

    # --- Test: Defender Not Disabled by Policy ---
    $disableAntiSpyware = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiSpyware" -DefaultValue 0
    $disableAntiVirus = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiVirus" -DefaultValue 0
    $defenderDisabled = ($disableAntiSpyware -eq 1) -or ($disableAntiVirus -eq 1)

    Add-TestResult `
        -Id "evade-defender-disabled" `
        -Category "Defense Evasion Prevention" `
        -Name "Defender Not Disabled by Policy" `
        -Status $(if (-not $defenderDisabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if (-not $defenderDisabled) { "Defender is not disabled by policy" } else { "Defender is disabled by policy" }) `
        -Evidence @{
            DisableAntiSpyware = $disableAntiSpyware
            DisableAntiVirus   = $disableAntiVirus
        } `
        -Reference "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/troubleshoot-microsoft-defender-antivirus" `
        -MitreId "T1562.001" `
        -Remediation @{
            PowerShell = 'Remove-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiSpyware" -ErrorAction SilentlyContinue; Remove-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows Defender" -Name "DisableAntiVirus" -ErrorAction SilentlyContinue'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Turn off Microsoft Defender Antivirus > Disabled'
            Intune = 'Endpoint security > Antivirus > Microsoft Defender Antivirus > Enabled'
        }

    # --- Test: Defender Exclusions ---
    if (Test-CommandExists "Get-MpPreference") {
        try {
            $mpPref = Get-MpPreference -ErrorAction Stop
            $exclusionCount = @($mpPref.ExclusionPath + $mpPref.ExclusionProcess + $mpPref.ExclusionExtension).Where({ $_ -ne $null }).Count

            Add-TestResult `
                -Id "evade-defender-exclusions" `
                -Category "Defense Evasion Prevention" `
                -Name "Defender Exclusions" `
                -Status $(if ($exclusionCount -eq 0) { "PASS" } else { "WARN" }) `
                -Detail $(if ($exclusionCount -eq 0) { "No Defender exclusions configured" } else { "$exclusionCount Defender exclusion(s) configured" }) `
                -Evidence @{
                    ExclusionPath      = $mpPref.ExclusionPath
                    ExclusionProcess   = $mpPref.ExclusionProcess
                    ExclusionExtension = $mpPref.ExclusionExtension
                } `
                -Reference "https://learn.microsoft.com/en-us/microsoft-365/security/defender-endpoint/configure-exclusions-microsoft-defender-antivirus" `
                -MitreId "T1562.001" `
                -Remediation @{
                    PowerShell = 'Get-MpPreference | Select-Object -ExpandProperty ExclusionPath'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Exclusions > Configure with minimal necessary exclusions'
                    Intune = 'Endpoint security > Antivirus > Exclusions > Remove unnecessary exclusions'
                }
        } catch {
            Add-TestResult `
                -Id "evade-defender-exclusions" `
                -Category "Defense Evasion Prevention" `
                -Name "Defender Exclusions" `
                -Status "WARN" `
                -Detail "Unable to query Defender exclusions: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message } `
                -MitreId "T1562.001" `
                -Remediation @{
                    PowerShell = 'Get-MpPreference | Select-Object -ExpandProperty ExclusionPath'
                    GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Exclusions > Configure with minimal necessary exclusions'
                    Intune = 'Endpoint security > Antivirus > Exclusions > Remove unnecessary exclusions'
                }
        }
    } else {
        Add-TestResult `
            -Id "evade-defender-exclusions" `
            -Category "Defense Evasion Prevention" `
            -Name "Defender Exclusions" `
            -Status "SKIP" `
            -Detail "Defender preference cmdlets not available" `
            -Evidence @{ cmdletExists = $false } `
            -MitreId "T1562.001" `
            -Remediation @{
                PowerShell = 'Get-MpPreference | Select-Object -ExpandProperty ExclusionPath'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > Microsoft Defender Antivirus > Exclusions > Configure with minimal necessary exclusions'
                Intune = 'Endpoint security > Antivirus > Exclusions > Remove unnecessary exclusions'
            }
    }

    # --- Test: Windows Event Log Service Running ---
    $eventLogService = Get-CimInstance -ClassName Win32_Service -Filter "Name='eventlog'" -ErrorAction SilentlyContinue
    $eventLogHealthy = ($eventLogService -and $eventLogService.State -eq "Running" -and $eventLogService.StartMode -eq "Auto")

    Add-TestResult `
        -Id "evade-eventlog-service" `
        -Category "Defense Evasion Prevention" `
        -Name "Windows Event Log Service" `
        -Status $(if ($eventLogHealthy) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($eventLogHealthy) { "Event Log service is running and set to Auto" } else { "Event Log service not running or not set to Auto" }) `
        -Evidence @{
            state     = if ($eventLogService) { $eventLogService.State } else { "Unknown" }
            startMode = if ($eventLogService) { $eventLogService.StartMode } else { "Unknown" }
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/eventlog/eventlog-key" `
        -MitreId "T1562.002" `
        -Remediation @{
            PowerShell = 'Set-Service -Name eventlog -StartupType Automatic; Start-Service -Name eventlog'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > System Services > Windows Event Log > Startup type: Automatic'
            Intune = 'Devices > Configuration profiles > Settings catalog > Windows Event Log > Startup type: Automatic'
        }

    # --- Test: Application Control Enforced (LOLBIN Mitigation) ---
    $applockerEnforced = $false
    $applockerAudit = $false
    $applockerRules = 0
    if (Test-CommandExists "Get-AppLockerPolicy") {
        try {
            $appPolicy = Get-AppLockerPolicy -Effective -ErrorAction Stop
            $collections = @($appPolicy.RuleCollections)
            $applockerRules = ($collections | ForEach-Object { $_.Rules.Count } | Measure-Object -Sum).Sum
            $applockerEnforced = ($collections | Where-Object { $_.EnforcementMode -eq "Enforced" -and $_.Rules.Count -gt 0 }).Count -gt 0
            $applockerAudit = ($collections | Where-Object { $_.EnforcementMode -eq "AuditOnly" -and $_.Rules.Count -gt 0 }).Count -gt 0
        } catch { }
    }
    $wdacPolicyPath = Join-Path $env:windir "System32\CodeIntegrity\CiPolicies\Active"
    $wdacPolicies = if (Test-Path $wdacPolicyPath) { @(Get-ChildItem -Path $wdacPolicyPath -Filter *.cip -ErrorAction SilentlyContinue) } else { @() }
    $wdacActive = ($wdacPolicies.Count -gt 0)

    $lolbinStatus = if ($wdacActive -or $applockerEnforced) { "PASS" }
                    elseif ($applockerAudit) { "WARN" }
                    else { "FAIL" }

    Add-TestResult `
        -Id "evade-lolbin-control" `
        -Category "Defense Evasion Prevention" `
        -Name "LOLBIN Control (AppLocker/WDAC)" `
        -Status $lolbinStatus `
        -Detail $(if ($wdacActive) { "WDAC policy active" } elseif ($applockerEnforced) { "AppLocker enforced" } elseif ($applockerAudit) { "AppLocker audit only" } else { "No application control policy detected" }) `
        -Evidence @{
            wdacPolicies      = @($wdacPolicies | ForEach-Object { $_.Name })
            appLockerRules    = $applockerRules
            appLockerEnforced = $applockerEnforced
            appLockerAudit    = $applockerAudit
        } `
        -Reference "https://learn.microsoft.com/en-us/windows/security/application-security/application-control/applocker/applocker-overview" `
        -MitreId "T1218" `
        -Remediation @{
            PowerShell = 'New-AppLockerPolicy -DefaultRule -RuleType Exe, Script, Msi, Appx -User "Everyone" -XMLPolicy ".\\AppLocker.xml"; Set-AppLockerPolicy -XMLPolicy ".\\AppLocker.xml" -Merge'
            GPO = 'Computer Configuration > Windows Settings > Security Settings > Application Control Policies > AppLocker > Enforce rules'
            Intune = 'Endpoint security > Application control > Configure AppLocker/WDAC policy'
            Note = 'Start in audit mode to identify legitimate LOLBIN usage before enforcement.'
        }
}

# ============================================================================
# CATEGORY: PERSISTENCE PREVENTION
# ============================================================================

function Test-PersistenceCategory {
    if (-not (Test-CategoryEnabled "Persistence")) { return }

    # --- Test: AutoRun Disabled ---
    $autoRunValue = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" -Name "NoDriveTypeAutoRun" -DefaultValue 0
    $autoRunDisabled = ($autoRunValue -eq 0xFF)
    $autoRunStatus = if ($autoRunDisabled) { "PASS" } elseif ($autoRunValue -ge 0x91) { "WARN" } else { "FAIL" }

    Add-TestResult `
        -Id "persist-autorun" `
        -Category "Persistence Prevention" `
        -Name "AutoRun Disabled" `
        -Status $autoRunStatus `
        -Detail $(if ($autoRunDisabled) { "AutoRun is disabled for all drives (NoDriveTypeAutoRun=0xFF)" } else { "AutoRun not fully disabled (NoDriveTypeAutoRun=$autoRunValue)" }) `
        -Evidence @{ NoDriveTypeAutoRun = $autoRunValue } `
        -Reference "https://learn.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-autoplay" `
        -MitreId "T1547.001" `
        -Remediation @{
            PowerShell = 'Set-ItemProperty -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" -Name "NoDriveTypeAutoRun" -Value 255 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > AutoPlay Policies > Turn off AutoPlay > Enabled (All drives)'
            Intune = 'Devices > Configuration profiles > Settings catalog > Turn off AutoPlay > Enabled'
        }

    # --- Test: AutoPlay Disabled ---
    $autoPlayValue = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer" -Name "DisableAutoPlay" -DefaultValue 0
    $autoPlayDisabled = ($autoPlayValue -eq 1)

    Add-TestResult `
        -Id "persist-autoplay" `
        -Category "Persistence Prevention" `
        -Name "AutoPlay Disabled" `
        -Status $(if ($autoPlayDisabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($autoPlayDisabled) { "AutoPlay is disabled by policy" } else { "AutoPlay not disabled by policy" }) `
        -Evidence @{ DisableAutoPlay = $autoPlayValue } `
        -Reference "https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-experience#experience-disableautoplay" `
        -MitreId "T1547.001" `
        -Remediation @{
            PowerShell = 'New-Item -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer" -Force | Out-Null; Set-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\Explorer" -Name "DisableAutoPlay" -Value 1 -Type DWord'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > AutoPlay Policies > Turn off AutoPlay > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > DisableAutoPlay > Enabled'
        }

    # --- Test: Scheduled Task Operational Log Enabled ---
    $taskLogEnabled = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Channels\Microsoft-Windows-TaskScheduler/Operational" -Name "Enabled" -DefaultValue 0
    $taskLogStatus = ($taskLogEnabled -eq 1)

    Add-TestResult `
        -Id "persist-task-logging" `
        -Category "Persistence Prevention" `
        -Name "Task Scheduler Operational Logging" `
        -Status $(if ($taskLogStatus) { "PASS" } else { "WARN" }) `
        -Detail $(if ($taskLogStatus) { "Task Scheduler Operational log is enabled" } else { "Task Scheduler Operational log is disabled" }) `
        -Evidence @{ TaskSchedulerOperationalEnabled = $taskLogEnabled } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/taskschd/task-scheduler-start-page" `
        -MitreId "T1053.005" `
        -Remediation @{
            PowerShell = 'wevtutil sl "Microsoft-Windows-TaskScheduler/Operational" /e:true'
            GPO = 'Computer Configuration > Policies > Windows Settings > Security Settings > Advanced Audit Policy Configuration > Object Access > Audit Other Object Access Events > Success'
            Intune = 'Devices > Configuration profiles > Settings catalog > Audit Other Object Access Events > Success'
        }

    # --- Test: Startup Folder Items ---
    $startupPaths = @(
        Join-Path $env:ProgramData "Microsoft\Windows\Start Menu\Programs\Startup",
        Join-Path $env:APPDATA "Microsoft\Windows\Start Menu\Programs\Startup"
    )
    $startupItems = @()
    foreach ($path in $startupPaths) {
        if (Test-Path $path) {
            $startupItems += @(Get-ChildItem -Path $path -File -ErrorAction SilentlyContinue | ForEach-Object {
                [ordered]@{ path = $path; name = $_.Name }
            })
        }
    }

    Add-TestResult `
        -Id "persist-startup-items" `
        -Category "Persistence Prevention" `
        -Name "Startup Folder Items" `
        -Status $(if ($startupItems.Count -eq 0) { "PASS" } else { "WARN" }) `
        -Detail $(if ($startupItems.Count -eq 0) { "No startup folder items detected" } else { "$($startupItems.Count) startup item(s) detected" }) `
        -Evidence @{ items = $startupItems } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/shell/shell-startup" `
        -MitreId "T1547.001" `
        -Remediation @{
            PowerShell = 'Get-ChildItem "$env:ProgramData\Microsoft\Windows\Start Menu\Programs\Startup"'
            GPO = 'Use AppLocker/WDAC to block unauthorized startup items and regularly audit startup folders'
            Intune = 'Endpoint security > Attack surface reduction > Use application control and audit startup items'
        }

    # --- Test: Run/RunOnce Registry Entries ---
    $runPaths = @(
        "HKLM:\Software\Microsoft\Windows\CurrentVersion\Run",
        "HKLM:\Software\Microsoft\Windows\CurrentVersion\RunOnce",
        "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run",
        "HKCU:\Software\Microsoft\Windows\CurrentVersion\RunOnce"
    )
    $runEntries = @()
    foreach ($path in $runPaths) {
        try {
            $props = Get-ItemProperty -Path $path -ErrorAction Stop
            $props.PSObject.Properties | Where-Object { $_.Name -notin @("PSPath","PSParentPath","PSChildName","PSDrive","PSProvider") } | ForEach-Object {
                $runEntries += [ordered]@{ path = $path; name = $_.Name; value = $_.Value }
            }
        } catch { }
    }

    Add-TestResult `
        -Id "persist-run-keys" `
        -Category "Persistence Prevention" `
        -Name "Run/RunOnce Registry Entries" `
        -Status $(if ($runEntries.Count -eq 0) { "PASS" } else { "WARN" }) `
        -Detail $(if ($runEntries.Count -eq 0) { "No Run/RunOnce entries detected" } else { "$($runEntries.Count) Run/RunOnce entry(ies) detected" }) `
        -Evidence @{ entries = $runEntries } `
        -Reference "https://learn.microsoft.com/en-us/windows/win32/sysinfo/registry-startup-keys" `
        -MitreId "T1547.001" `
        -Remediation @{
            PowerShell = 'Get-ItemProperty "HKLM:\Software\Microsoft\Windows\CurrentVersion\Run"'
            GPO = 'Use AppLocker/WDAC and review Run/RunOnce entries during security baselines'
            Intune = 'Endpoint security > Attack surface reduction > Use application control and monitor startup persistence'
        }

    # --- Test: WMI Permanent Event Subscriptions ---
    try {
        $wmiFilters = @(Get-CimInstance -Namespace root\subscription -ClassName __EventFilter -ErrorAction Stop)
        $wmiBindings = @(Get-CimInstance -Namespace root\subscription -ClassName __FilterToConsumerBinding -ErrorAction SilentlyContinue)
        $wmiHasSubs = ($wmiFilters.Count -gt 0) -or ($wmiBindings.Count -gt 0)

        Add-TestResult `
            -Id "persist-wmi-subscriptions" `
            -Category "Persistence Prevention" `
            -Name "WMI Event Subscriptions" `
            -Status $(if (-not $wmiHasSubs) { "PASS" } else { "WARN" }) `
            -Detail $(if (-not $wmiHasSubs) { "No WMI event subscriptions detected" } else { "$($wmiFilters.Count) WMI event filter(s) detected" }) `
            -Evidence @{
                filters  = @($wmiFilters | ForEach-Object { $_.Name })
                bindings = @($wmiBindings | ForEach-Object { $_.Filter })
            } `
            -Reference "https://learn.microsoft.com/en-us/windows/win32/wmisdk/monitoring-and-managing-events" `
            -MitreId "T1546.003" `
            -Remediation @{
                PowerShell = 'Get-CimInstance -Namespace root\subscription -ClassName __EventFilter'
                GPO = 'Monitor and restrict WMI permanent event subscriptions; use Defender for Endpoint alerts where available'
                Intune = 'Endpoint security > Attack surface reduction > Monitor WMI persistence signals'
                Note = 'Review and remove unauthorized subscriptions after investigation.'
            }

    } catch {
        Add-TestResult `
            -Id "persist-wmi-subscriptions" `
            -Category "Persistence Prevention" `
            -Name "WMI Event Subscriptions" `
            -Status "SKIP" `
            -Detail "Unable to query WMI subscriptions: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message } `
            -MitreId "T1546.003" `
            -Remediation @{
                PowerShell = 'Get-CimInstance -Namespace root\subscription -ClassName __EventFilter'
                GPO = 'Monitor and restrict WMI permanent event subscriptions; use Defender for Endpoint alerts where available'
                Intune = 'Endpoint security > Attack surface reduction > Monitor WMI persistence signals'
                Note = 'Review and remove unauthorized subscriptions after investigation.'
            }
    }
}

# ============================================================================
# CATEGORY: NETWORK SECURITY
# ============================================================================

function Test-NetworkCategory {
    if (-not (Test-CategoryEnabled "Network")) { return }

    # --- Test: Windows Firewall Status ---
    if (Test-CommandExists "Get-NetFirewallProfile") {
        try {
            $fwProfiles = Get-NetFirewallProfile -ErrorAction Stop
            $fwDisabled = @($fwProfiles | Where-Object { $_.Enabled -eq $false })

            Add-TestResult `
                -Id "firewall-status" `
                -Category "Network Security" `
                -Name "Windows Firewall" `
                -Status $(if ($fwDisabled.Count -eq 0) { "PASS" }
                         elseif ($fwDisabled.Count -lt 3) { "WARN" }
                         else { "FAIL" }) `
                -Detail $(if ($fwDisabled.Count -eq 0) {
                    "Firewall enabled on all profiles (Domain, Private, Public)"
                } else {
                    "Firewall DISABLED on: $(($fwDisabled | ForEach-Object { $_.Name }) -join ', ')"
                }) `
                -Evidence @{
                    profiles = @($fwProfiles | ForEach-Object {
                        @{
                            name            = $_.Name
                            enabled         = $_.Enabled
                            defaultInbound  = $_.DefaultInboundAction.ToString()
                            defaultOutbound = $_.DefaultOutboundAction.ToString()
                        }
                    })
                }

        } catch {
            Add-TestResult `
                -Id "firewall-status" `
                -Category "Network Security" `
                -Name "Windows Firewall" `
                -Status "ERROR" `
                -Detail "Unable to query firewall status: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message }
        }
    }

    # --- Test: SMB Signing ---
    if (Test-CommandExists "Get-SmbServerConfiguration") {
        try {
            $smbConfig = Get-SmbServerConfiguration -ErrorAction Stop

            Add-TestResult `
                -Id "smb-signing" `
                -Category "Network Security" `
                -Name "SMB Signing Required" `
                -Status $(if ($smbConfig.RequireSecuritySignature) { "PASS" } else { "FAIL" }) `
                -Detail $(if ($smbConfig.RequireSecuritySignature) {
                    "SMB signing is required - protected against relay attacks"
                } else {
                    "SMB signing NOT required - vulnerable to NTLM relay attacks"
                }) `
                -Evidence @{
                    RequireSecuritySignature = $smbConfig.RequireSecuritySignature
                    EnableSecuritySignature  = $smbConfig.EnableSecuritySignature
                    EncryptData              = $smbConfig.EncryptData
                } `
                -Reference "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/overview-server-message-block-signing" `
                -MitreId "T1557.001"

        } catch {
            Add-TestResult `
                -Id "smb-signing" `
                -Category "Network Security" `
                -Name "SMB Signing Required" `
                -Status "ERROR" `
                -Detail "Unable to query SMB configuration: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message }
        }
    }

    # --- Test: LLMNR Disabled ---
    $llmnrValue = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" -Name "EnableMulticast" -DefaultValue 1
    $llmnrDisabled = ($llmnrValue -eq 0)

    Add-TestResult `
        -Id "llmnr-disabled" `
        -Category "Network Security" `
        -Name "LLMNR Disabled" `
        -Status $(if ($llmnrDisabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($llmnrDisabled) {
            "LLMNR is disabled"
        } else {
            "LLMNR is ENABLED - vulnerable to name poisoning attacks (Responder/Inveigh)"
        }) `
        -Evidence @{ EnableMulticast = $llmnrValue } `
        -Reference "https://www.blackhillsinfosec.com/how-to-disable-llmnr-why-you-want-to/" `
        -MitreId "T1557.001" `
        -Remediation @{
            PowerShell = 'New-ItemProperty -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" -Name "EnableMulticast" -Value 0 -PropertyType DWord -Force'
            GPO = 'Computer Configuration > Administrative Templates > Network > DNS Client > Turn off multicast name resolution > Enabled'
            Intune = 'Devices > Configuration profiles > Create > Settings catalog > Search "LLMNR" > Turn Off Multicast Name Resolution > Enabled'
        }

    # --- Test: NetBIOS over TCP/IP ---
    try {
        $adapters = @(Get-CimInstance Win32_NetworkAdapterConfiguration -ErrorAction Stop |
            Where-Object { $_.IPEnabled -eq $true })
        $nbtEnabled = @($adapters | Where-Object { $_.TcpipNetbiosOptions -ne 2 })

        Add-TestResult `
            -Id "netbios-disabled" `
            -Category "Network Security" `
            -Name "NetBIOS over TCP/IP Disabled" `
            -Status $(if ($nbtEnabled.Count -eq 0) { "PASS" } else { "WARN" }) `
            -Detail $(if ($nbtEnabled.Count -eq 0) {
                "NetBIOS disabled on all adapters"
            } else {
                "NetBIOS enabled on $($nbtEnabled.Count) of $($adapters.Count) adapter(s)"
            }) `
            -Evidence @{
                adaptersWithNetBIOS = $nbtEnabled.Count
                totalAdapters       = $adapters.Count
            } `
            -MitreId "T1557.001"

    } catch {
        Add-TestResult `
            -Id "netbios-disabled" `
            -Category "Network Security" `
            -Name "NetBIOS over TCP/IP Disabled" `
            -Status "ERROR" `
            -Detail "Unable to query network adapter configuration: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message }
    }

    # --- Test: DNS Filtering (Functional Test) ---
    if (-not $SkipFunctionalTests) {
        Test-DnsFiltering
    }
}

function Test-DnsFiltering {
    if (-not (Test-CommandExists "Resolve-DnsName")) {
        Add-TestResult `
            -Id "dns-filtering" `
            -Category "Network Security" `
            -Name "DNS Filtering Active" `
            -Status "INFO" `
            -Detail "Resolve-DnsName not available on this system - skipping DNS test" `
            -Evidence @{ cmdletExists = $false }
        return
    }

    # Use multiple test approaches for reliability
    $testResults = @()

    # Test 1: Try to resolve a known-blocked test domain
    # Using examplemalwaredomain.com which shouldn't exist
    $testDomain = "definitely-not-a-real-malware-domain-$([Guid]::NewGuid().ToString('N').Substring(0,8)).com"

    try {
        $result = Resolve-DnsName -Name $testDomain -ErrorAction Stop -DnsOnly
        # If we get here, the domain resolved (shouldn't happen for random domain)
        $testResults += @{ test = "random-domain"; blocked = $false; ip = $result.IPAddress }
    } catch {
        # Expected - random domain shouldn't resolve
        $testResults += @{ test = "random-domain"; blocked = $true; error = "NXDOMAIN (expected)" }
    }

    # Overall assessment - we're really just checking DNS works
    # A proper test would require a known-bad domain that security tools block
    Add-TestResult `
        -Id "dns-filtering" `
        -Category "Network Security" `
        -Name "DNS Filtering Active" `
        -Status "INFO" `
        -Detail "DNS resolution functional. Configure your DNS filtering solution to test known-bad domain blocking." `
        -Evidence @{
            note    = "Automated testing of DNS filtering requires organization-specific test domains"
            results = $testResults
        }
}

# ============================================================================
# CATEGORY: ENCRYPTION
# ============================================================================

function Test-EncryptionCategory {
    if (-not (Test-CategoryEnabled "Encryption")) { return }

    # Check if BitLocker cmdlets exist (not on Home editions)
    if (-not (Test-CommandExists "Get-BitLockerVolume")) {
        Add-TestResult `
            -Id "bitlocker-status" `
            -Category "Encryption" `
            -Name "BitLocker Drive Encryption" `
            -Status "SKIP" `
            -Detail "BitLocker cmdlets not available (Windows Home edition or feature not installed)" `
            -Evidence @{ cmdletExists = $false }
        return
    }

    try {
        $bitlocker = Get-BitLockerVolume -MountPoint "C:" -ErrorAction Stop

        $protStatus = $bitlocker.ProtectionStatus.ToString()
        $volStatus = $bitlocker.VolumeStatus.ToString()

        Add-TestResult `
            -Id "bitlocker-status" `
            -Category "Encryption" `
            -Name "BitLocker Drive Encryption" `
            -Status $(if ($protStatus -eq "On") { "PASS" }
                     elseif ($volStatus -match "Encryption") { "WARN" }
                     else { "FAIL" }) `
            -Detail $(if ($protStatus -eq "On") {
                "BitLocker enabled with $($bitlocker.EncryptionMethod)"
            } elseif ($volStatus -match "Encryption") {
                "BitLocker encryption in progress ($($bitlocker.EncryptionPercentage)%)"
            } else {
                "BitLocker is NOT enabled - data at rest is unencrypted"
            }) `
            -Evidence @{
                protectionStatus     = $protStatus
                volumeStatus         = $volStatus
                encryptionMethod     = $bitlocker.EncryptionMethod.ToString()
                encryptionPercentage = $bitlocker.EncryptionPercentage
                keyProtectorTypes    = @($bitlocker.KeyProtector | ForEach-Object { $_.KeyProtectorType.ToString() })
            } `
            -Reference "https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/" `
            -Remediation @{
                PowerShell = 'Enable-BitLocker -MountPoint "C:" -EncryptionMethod XtsAes256 -RecoveryPasswordProtector; Add-BitLockerKeyProtector -MountPoint "C:" -TpmProtector'
                GPO = 'Computer Configuration > Administrative Templates > Windows Components > BitLocker Drive Encryption > Operating System Drives > Require additional authentication at startup'
                Intune = 'Endpoint security > Disk encryption > BitLocker > OS Drive Settings > Encrypt = Required'
                Note = 'Ensure TPM 2.0 is present and enabled in BIOS. Escrow recovery keys to Azure AD or MBAM before enabling.'
            }

    } catch {
        Add-TestResult `
            -Id "bitlocker-status" `
            -Category "Encryption" `
            -Name "BitLocker Drive Encryption" `
            -Status "FAIL" `
            -Detail "BitLocker not configured or unable to query: $($_.Exception.Message)" `
            -Evidence @{ error = $_.Exception.Message }
    }
}

# ============================================================================
# CATEGORY: LOCAL SECURITY
# ============================================================================

function Test-LocalSecurityCategory {
    if (-not (Test-CategoryEnabled "LocalSecurity")) { return }

    # --- Test: Local Administrator Count ---
    if (Test-CommandExists "Get-LocalGroupMember") {
        try {
            $localAdmins = @(Get-LocalGroupMember -Group "Administrators" -ErrorAction Stop)
            $adminCount = $localAdmins.Count

            Add-TestResult `
                -Id "local-admin-count" `
                -Category "Local Security" `
                -Name "Local Administrator Sprawl" `
                -Status $(if ($adminCount -le 2) { "PASS" }
                         elseif ($adminCount -le 4) { "WARN" }
                         else { "FAIL" }) `
                -Detail "$adminCount members in local Administrators group" `
                -Evidence @{
                    count   = $adminCount
                    members = @($localAdmins | ForEach-Object {
                        @{
                            name   = $_.Name
                            type   = $_.ObjectClass.ToString()
                            source = if ($_.PrincipalSource) { $_.PrincipalSource.ToString() } else { "Unknown" }
                        }
                    })
                } `
                -MitreId "T1078.003"

        } catch {
            Add-TestResult `
                -Id "local-admin-count" `
                -Category "Local Security" `
                -Name "Local Administrator Sprawl" `
                -Status "ERROR" `
                -Detail "Unable to enumerate local administrators: $($_.Exception.Message)" `
                -Evidence @{ error = $_.Exception.Message }
        }
    }

    # --- Test: LAPS Configuration ---
    $lapsLegacy = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft Services\AdmPwd" -Name "AdmPwdEnabled" -DefaultValue 0
    $lapsNewConfig = Test-Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\LAPS\Config" -ErrorAction SilentlyContinue
    $lapsNewState = Test-Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\LAPS\State" -ErrorAction SilentlyContinue

    $hasLegacyLaps = ($lapsLegacy -eq 1)
    $hasWindowsLaps = $lapsNewConfig -or $lapsNewState
    $lapsEnabled = $hasLegacyLaps -or $hasWindowsLaps

    Add-TestResult `
        -Id "laps-configured" `
        -Category "Local Security" `
        -Name "LAPS (Local Admin Password Solution)" `
        -Status $(if ($lapsEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($hasWindowsLaps) { "Windows LAPS is configured" }
                 elseif ($hasLegacyLaps) { "Legacy LAPS is configured" }
                 else { "LAPS not configured - local admin passwords may be identical across endpoints" }) `
        -Evidence @{
            legacyLAPS  = $hasLegacyLaps
            windowsLAPS = $hasWindowsLaps
        } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview" `
        -MitreId "T1078.003"

    # --- Test: Guest Account ---
    if (Test-CommandExists "Get-LocalUser") {
        try {
            $guest = Get-LocalUser -Name "Guest" -ErrorAction Stop

            Add-TestResult `
                -Id "guest-disabled" `
                -Category "Local Security" `
                -Name "Guest Account Disabled" `
                -Status $(if (-not $guest.Enabled) { "PASS" } else { "FAIL" }) `
                -Detail $(if ($guest.Enabled) {
                    "Guest account is ENABLED - potential unauthorized access vector"
                } else {
                    "Guest account is disabled"
                }) `
                -Evidence @{
                    enabled   = $guest.Enabled
                    lastLogon = if ($guest.LastLogon) { $guest.LastLogon.ToString("o") } else { $null }
                }

        } catch {
            Add-TestResult `
                -Id "guest-disabled" `
                -Category "Local Security" `
                -Name "Guest Account Disabled" `
                -Status "PASS" `
                -Detail "Guest account not found or inaccessible (likely renamed or removed)" `
                -Evidence @{ accountExists = $false }
        }
    }
}

# ============================================================================
# CATEGORY: REMOTE ACCESS
# ============================================================================

function Test-RemoteAccessCategory {
    if (-not (Test-CategoryEnabled "RemoteAccess")) { return }

    # --- Test: RDP Network Level Authentication ---
    $rdpDisabled = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" -DefaultValue 1
    $nlaRequired = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "UserAuthentication" -DefaultValue 0
    $securityLayer = Get-RegistryValueSafe -Path "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" -Name "SecurityLayer" -DefaultValue 0

    $rdpEnabled = ($rdpDisabled -ne 1)

    Add-TestResult `
        -Id "rdp-nla" `
        -Category "Remote Access" `
        -Name "RDP Network Level Authentication" `
        -Status $(if (-not $rdpEnabled) { "PASS" }
                 elseif ($nlaRequired -eq 1) { "PASS" }
                 else { "FAIL" }) `
        -Detail $(if (-not $rdpEnabled) { "RDP is disabled on this system" }
                 elseif ($nlaRequired -eq 1) { "NLA required for RDP connections" }
                 else { "NLA NOT required - vulnerable to RDP exploits before authentication" }) `
        -Evidence @{
            rdpEnabled    = $rdpEnabled
            nlaRequired   = ($nlaRequired -eq 1)
            securityLayer = $securityLayer
        } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access" `
        -MitreId "T1021.001"
}

# ============================================================================
# CATEGORY: LOGGING & VISIBILITY
# ============================================================================

function Test-LoggingCategory {
    if (-not (Test-CategoryEnabled "Logging")) { return }

    # --- Test: PowerShell Script Block Logging ---
    $psLogging = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging" -Name "EnableScriptBlockLogging" -DefaultValue 0
    $psEnabled = ($psLogging -eq 1)

    Add-TestResult `
        -Id "powershell-logging" `
        -Category "Logging" `
        -Name "PowerShell Script Block Logging" `
        -Status $(if ($psEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($psEnabled) {
            "Script block logging is enabled"
        } else {
            "Script block logging NOT enabled - attacker PowerShell commands won't be logged"
        }) `
        -Evidence @{
            EnableScriptBlockLogging = $psEnabled
        } `
        -Reference "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_logging_windows" `
        -MitreId "T1059.001" `
        -Remediation @{
            PowerShell = '@{Path="HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"; Name="EnableScriptBlockLogging"; Value=1} | ForEach-Object { New-Item -Path $_.Path -Force | Out-Null; Set-ItemProperty @_ -Type DWord }'
            GPO = 'Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on PowerShell Script Block Logging > Enabled'
            Intune = 'Devices > Configuration profiles > Settings catalog > PowerShell Script Block Logging > Enabled'
        }

    # --- Test: PowerShell Module Logging ---
    $moduleLogging = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Policies\Microsoft\Windows\PowerShell\ModuleLogging" -Name "EnableModuleLogging" -DefaultValue 0
    $moduleEnabled = ($moduleLogging -eq 1)

    Add-TestResult `
        -Id "powershell-module-logging" `
        -Category "Logging" `
        -Name "PowerShell Module Logging" `
        -Status $(if ($moduleEnabled) { "PASS" } else { "WARN" }) `
        -Detail $(if ($moduleEnabled) {
            "Module logging is enabled"
        } else {
            "Module logging not enabled - less visibility into PowerShell module usage"
        }) `
        -Evidence @{ EnableModuleLogging = $moduleEnabled }

    # --- Test: Command Line Process Auditing ---
    $cmdLineAudit = Get-RegistryValueSafe -Path "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\Audit" -Name "ProcessCreationIncludeCmdLine_Enabled" -DefaultValue 0
    $cmdLineEnabled = ($cmdLineAudit -eq 1)

    Add-TestResult `
        -Id "commandline-logging" `
        -Category "Logging" `
        -Name "Process Command Line Logging" `
        -Status $(if ($cmdLineEnabled) { "PASS" } else { "FAIL" }) `
        -Detail $(if ($cmdLineEnabled) {
            "Command line arguments included in process creation events (4688)"
        } else {
            "Command line NOT logged - blind to attack tool arguments"
        }) `
        -Evidence @{ ProcessCreationIncludeCmdLine_Enabled = $cmdLineEnabled } `
        -Reference "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing"

    # --- Test: Sysmon Installed ---
    try {
        $sysmonServices = @(Get-Service -Name "Sysmon*" -ErrorAction SilentlyContinue)
        $sysmon = $sysmonServices | Where-Object { $_.Status -eq "Running" } | Select-Object -First 1

        Add-TestResult `
            -Id "sysmon-installed" `
            -Category "Logging" `
            -Name "Sysmon Installed" `
            -Status $(if ($sysmon) { "PASS" } else { "INFO" }) `
            -Detail $(if ($sysmon) {
                "Sysmon is running ($($sysmon.Name))"
            } else {
                "Sysmon not installed - enhanced logging not available (recommended for advanced threat detection)"
            }) `
            -Evidence @{
                installed   = ($sysmonServices.Count -gt 0)
                running     = ($null -ne $sysmon)
                serviceName = if ($sysmon) { $sysmon.Name } else { $null }
            } `
            -Reference "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon"

    } catch {
        Add-TestResult `
            -Id "sysmon-installed" `
            -Category "Logging" `
            -Name "Sysmon Installed" `
            -Status "INFO" `
            -Detail "Sysmon not detected" `
            -Evidence @{ installed = $false }
    }
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

# Initialize environment and run preflight checks
Initialize-ValidationEnvironment

# Run all enabled test categories
Test-AntivirusCategory
Test-ASRCategory
Test-CredentialsCategory
Test-ExecutionControlsCategory
Test-PrivilegeEscalationCategory
Test-LateralMovementCategory
Test-DefenseEvasionCategory
Test-PersistenceCategory
Test-NetworkCategory
Test-EncryptionCategory
Test-LocalSecurityCategory
Test-RemoteAccessCategory
Test-LoggingCategory

# ============================================================================
# BUILD OUTPUT
# ============================================================================

$passed = @($script:tests | Where-Object { $_.status -eq "PASS" }).Count
$failed = @($script:tests | Where-Object { $_.status -eq "FAIL" }).Count
$warnings = @($script:tests | Where-Object { $_.status -eq "WARN" }).Count
$info = @($script:tests | Where-Object { $_.status -eq "INFO" }).Count
$errors = @($script:tests | Where-Object { $_.status -eq "ERROR" }).Count
$skipped = @($script:tests | Where-Object { $_.status -eq "SKIP" }).Count
$total = $script:tests.Count

# Calculate score (only from scorable tests)
$scorableTests = @($script:tests | Where-Object { $_.status -in @("PASS", "FAIL", "WARN") })
$scoreTotal = $scorableTests.Count

$score = 0
if ($scoreTotal -gt 0) {
    $scorePoints = ($scorableTests | ForEach-Object {
        switch ($_.status) {
            "PASS" { 100 }
            "WARN" { 50 }
            default { 0 }
        }
    } | Measure-Object -Sum).Sum

    $score = [math]::Round($scorePoints / $scoreTotal)
}

# Determine grade
$grade = switch ($score) {
    { $_ -ge 90 } { "A" }
    { $_ -ge 80 } { "B" }
    { $_ -ge 70 } { "C" }
    { $_ -ge 60 } { "D" }
    default { "F" }
}

# Build metadata
$osInfo = Get-CimInstance Win32_OperatingSystem -ErrorAction SilentlyContinue

$output = [ordered]@{
    metadata = [ordered]@{
        hostname               = $env:COMPUTERNAME
        domain                 = $env:USERDOMAIN
        timestamp              = (Get-Date -Format "o")
        scriptVersion          = $ScriptVersion
        ranAsAdmin             = $script:isAdmin
        osVersion              = if ($osInfo) { $osInfo.Version } else { "Unknown" }
        osBuild                = if ($osInfo) { $osInfo.BuildNumber } else { "Unknown" }
        osCaption              = if ($osInfo) { $osInfo.Caption } else { "Unknown" }
        categoriesRun          = $Categories
        functionalTestsSkipped = [bool]$SkipFunctionalTests
        warnings               = $script:warnings
    }
    summary  = [ordered]@{
        totalTests = $total
        passed     = $passed
        failed     = $failed
        warnings   = $warnings
        info       = $info
        errors     = $errors
        skipped    = $skipped
        score      = $score
        grade      = $grade
    }
    tests    = $script:tests
}

# Output JSON
$output | ConvertTo-Json -Depth 10
