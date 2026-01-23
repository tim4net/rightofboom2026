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
    Version: 1.1.0
    Author: Right of Boom 2026
    License: MIT

    For use with Rewst automation workflows.
    https://github.com/tim4net/rightofboom2026
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("All", "Antivirus", "ASR", "Credentials", "Network", "Encryption", "LocalSecurity", "RemoteAccess", "Logging")]
    [string[]]$Categories = @("All"),

    [Parameter(Mandatory=$false)]
    [switch]$SkipFunctionalTests,

    [Parameter(Mandatory=$false)]
    [switch]$Force
)

#Requires -Version 5.1

$ScriptVersion = "1.2.1"
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

function Invoke-WebRequestWithTimeout {
    param(
        [string]$Uri,
        [string]$OutFile,
        [int]$TimeoutSeconds = 30
    )

    $webRequest = $null
    $response = $null
    $stream = $null
    $fileStream = $null

    try {
        $webRequest = [System.Net.HttpWebRequest]::Create($Uri)
        $webRequest.Timeout = $TimeoutSeconds * 1000
        $webRequest.ReadWriteTimeout = $TimeoutSeconds * 1000
        $webRequest.UserAgent = "SafeEndpointValidation/1.1"

        $response = $webRequest.GetResponse()
        $stream = $response.GetResponseStream()
        $fileStream = [System.IO.File]::Create($OutFile)

        $buffer = New-Object byte[] 8192
        $bytesRead = 0
        while (($bytesRead = $stream.Read($buffer, 0, $buffer.Length)) -gt 0) {
            $fileStream.Write($buffer, 0, $bytesRead)
        }

        return @{ Success = $true; Error = $null }
    } catch {
        return @{ Success = $false; Error = $_.Exception.Message }
    } finally {
        if ($fileStream) { $fileStream.Close(); $fileStream.Dispose() }
        if ($stream) { $stream.Close(); $stream.Dispose() }
        if ($response) { $response.Close(); $response.Dispose() }
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
            # Write was blocked - this is good
            $wasBlocked = $true
            $blockMethod = "write-blocked"
            $testCompleted = $true
        }

        Add-TestResult `
            -Id "eicar-detection" `
            -Category "Antivirus" `
            -Name "EICAR Malware Detection" `
            -Status $(if ($wasBlocked) { "PASS" } else { "FAIL" }) `
            -Detail $(if ($wasBlocked) {
                "EICAR test file blocked via $blockMethod"
            } else {
                "EICAR test file was NOT blocked - antivirus may not be functioning"
            }) `
            -Evidence @{
                blocked     = $wasBlocked
                method      = $blockMethod
                testPath    = $testPath
                testId      = $testId
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
    if (-not (Test-CategoryEnabled "Credentials")) { return }

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
