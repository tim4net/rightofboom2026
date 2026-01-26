import React from 'react';

/**
 * SafeEndpointValidation.ps1 - All Individual Checks
 *
 * Color-coded pills for every security check
 */
const ScriptChecksSlide = ({ theme: t }) => {
  // All checks from Invoke-SafeEndpointValidation.ps1, ordered by attack chain
  const checkGroups = [
    {
      layer: "Execution",
      color: "cyan",
      checks: [
        "PowerShell Script Block Logging", "PowerShell Module Logging", "PowerShell Transcription",
        "PowerShell v2 Disabled", "PowerShell Execution Policy", "AMSI Providers Registered",
        "Application Control (AppLocker/WDAC)", "SmartScreen Enabled", "Windows Script Host Disabled",
        "Office Macros from Internet Blocked", "Office Macro Warning Level", "WMI Activity Logging",
      ]
    },
    {
      layer: "ASR Rules",
      color: "teal",
      checks: [
        "Block Office Apps Creating Executables", "Block Adobe Reader Child Processes",
        "Block Office Apps Creating Child Processes", "Block Credential Stealing from LSASS",
        "Block Executable Content from Email", "Block Executables Unless Trusted",
        "Block Obfuscated Scripts", "Block JS/VBS Launching Downloads",
        "Block Office Code Injection", "Block Office Comms Child Processes",
        "Block Outlook Comms Child Processes", "Block WMI Persistence",
        "Block USB Unsigned Processes", "Block Win32 API from Macros", "Advanced Ransomware Protection",
      ]
    },
    {
      layer: "Evasion",
      color: "rose",
      checks: [
        "Defender Tamper Protection", "Defender Not Disabled by Policy", "Defender Exclusions Audit",
        "Windows Event Log Service", "LOLBIN Control",
      ]
    },
    {
      layer: "Credentials",
      color: "amber",
      checks: [
        "Credential Guard", "LSASS Protected Process", "WDigest Credential Caching",
        "LAN Manager Authentication Level", "Do Not Store LM Hash", "Cached Domain Logons Limit",
        "Prevent Domain Credential Storage", "RDP Password Saving Disabled", "Restrict Remote SAM Enumeration",
      ]
    },
    {
      layer: "Privilege",
      color: "sky",
      checks: [
        "User Account Control Enabled", "Admin Approval Mode", "UAC Consent Prompt for Administrators",
        "UAC Secure Desktop", "AlwaysInstallElevated Disabled",
      ]
    },
    {
      layer: "Lateral",
      color: "purple",
      checks: [
        "RDP Network Level Authentication", "RDP TLS Security Layer", "SMB Signing Required",
        "SMBv1 Disabled", "WinRM Remote Shell Restricted", "Remote Registry Service Disabled",
        "SMB Insecure Guest Logons Disabled", "Local Account Token Filtering",
      ]
    },
    {
      layer: "Persistence",
      color: "orange",
      checks: [
        "AutoRun Disabled", "AutoPlay Disabled", "Task Scheduler Operational Logging",
        "Startup Folder Items", "Run/RunOnce Registry Entries", "WMI Event Subscriptions",
      ]
    },
    {
      layer: "Antivirus",
      color: "emerald",
      checks: [
        "Defender Real-Time Protection", "Defender Signature Currency", "Defender Tamper Protection",
        "EICAR Malware Detection", "AV Exclusion Audit",
      ]
    },
    {
      layer: "Network",
      color: "blue",
      checks: [
        "Windows Firewall Profiles", "LLMNR Disabled", "NetBIOS over TCP/IP Disabled", "DNS Filtering Active",
      ]
    },
    {
      layer: "Data",
      color: "slate",
      checks: [
        "BitLocker Drive Encryption", "Local Administrator Sprawl", "LAPS Deployed",
        "Guest Account Disabled", "Process Command Line Logging", "Sysmon Installed",
      ]
    },
  ];

  const colors = {
    emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    teal: 'bg-teal-500/15 border-teal-500/30 text-teal-300',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
    cyan: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
    sky: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
    purple: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
    rose: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
    orange: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
    blue: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
    slate: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
  };

  const labelColors = {
    emerald: 'text-emerald-400',
    teal: 'text-teal-400',
    amber: 'text-amber-400',
    cyan: 'text-cyan-400',
    sky: 'text-sky-400',
    purple: 'text-purple-400',
    rose: 'text-rose-400',
    orange: 'text-orange-400',
    blue: 'text-blue-400',
    slate: 'text-slate-400',
  };

  const totalChecks = checkGroups.reduce((sum, g) => sum + g.checks.length, 0);

  return (
    <div className="w-full h-full flex flex-col px-6 py-2">
      {/* Header */}
      <div className="text-center mb-1">
        <h2 className={`text-2xl font-black ${t.textOnPage}`}>
          PowerShell Checks
        </h2>
      </div>

      {/* All Checks */}
      <div className="flex-1 flex flex-col justify-center space-y-1">
        {checkGroups.map((group, i) => (
          <div key={i} className="flex items-start">
            {/* Layer Label */}
            <div className={`w-28 text-right text-sm font-semibold ${labelColors[group.color]} pt-0.5 shrink-0`}>
              {group.layer}
            </div>

            {/* Divider */}
            <div className="w-px bg-slate-500/50 self-stretch mx-4 shrink-0" />

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 justify-start flex-1">
              {group.checks.map((check, j) => (
                <div
                  key={j}
                  className={`${colors[group.color]} border rounded-full px-2 py-0 text-xs`}
                >
                  {check}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptChecksSlide;
