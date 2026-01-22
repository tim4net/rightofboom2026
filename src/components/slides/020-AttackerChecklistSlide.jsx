import React from 'react';
import { Eye, ShieldOff, FolderOpen, Users, Terminal, AlertTriangle } from 'lucide-react';

/**
 * What Attackers Check First - Endpoint Misconfigurations
 *
 * Shows the top 5 things attackers look for on endpoints:
 * 1. ASR rules disabled/audit mode
 * 2. AV exclusions on user-writable paths
 * 3. Local admin sprawl
 * 4. PowerShell logging gaps
 * 5. Credential caching
 */
const AttackerChecklistSlide = ({ theme: t }) => {
  const title = "What Attackers Check First";
  const subtitle = "Endpoint misconfigurations that enable lateral movement";

  const checks = [
    {
      icon: ShieldOff,
      name: "ASR Rules Disabled",
      description: "Attack Surface Reduction rules in audit-only or off",
      risk: "LSASS credential dumping, Office macro execution",
      command: "Get-MpPreference | Select AttackSurfaceReduction*",
      color: "text-red-400",
      bgColor: "bg-red-500/20"
    },
    {
      icon: FolderOpen,
      name: "AV Exclusions",
      description: "Dangerous paths excluded from scanning",
      risk: "Malware in C:\\Temp, user profiles, or script folders",
      command: "Get-MpPreference | Select Exclusion*",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20"
    },
    {
      icon: Users,
      name: "Local Admin Sprawl",
      description: "Shared local admin accounts across endpoints",
      risk: "One credential = lateral movement to entire fleet",
      command: "Get-LocalGroupMember -Group Administrators",
      color: "text-orange-400",
      bgColor: "bg-orange-500/20"
    },
    {
      icon: Terminal,
      name: "PowerShell Logging Gaps",
      description: "Script block logging or transcription disabled",
      risk: "Invisible attacker scripts — no forensic trail",
      command: "Registry: HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20"
    },
    {
      icon: Eye,
      name: "Credential Caching",
      description: "Cached domain credentials on workstations",
      risk: "Offline credential extraction, pass-the-hash",
      command: "reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Winlogon\" /v CachedLogonsCount",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AlertTriangle className="w-10 h-10 text-red-400" />
          <h2 className={`text-5xl md:text-6xl font-black ${t.textOnPage}`}>
            {title}
          </h2>
        </div>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checks.map((check, i) => (
          <div
            key={i}
            className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder} hover:border-slate-600 transition-all`}
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className={`${check.bgColor} p-3 rounded-lg flex-shrink-0`}>
                <check.icon className={`w-7 h-7 ${check.color}`} />
              </div>

              {/* Name & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-bold ${check.color}`}>{check.name}</span>
                  <span className="text-xl text-slate-400">—</span>
                  <span className="text-xl text-slate-300">{check.description}</span>
                </div>
                <div className="text-xl text-red-400/80 mt-1">
                  <span className="text-slate-500">Risk:</span> {check.risk}
                </div>
              </div>

              {/* Command */}
              <div className="flex-shrink-0 max-w-md">
                <code className="text-lg font-mono text-emerald-400 bg-slate-900/60 px-3 py-1 rounded block truncate">
                  {check.command}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-4">
        <p className="text-xl text-slate-500">
          These checks take &lt;5 minutes per endpoint — or automate across your fleet via RMM
        </p>
      </div>
    </div>
  );
};

export default AttackerChecklistSlide;
