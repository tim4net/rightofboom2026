import React from 'react';
import { Shield, Eye, Key, Network, Zap, FileText, Lock, Activity } from 'lucide-react';

/**
 * SafeEndpointValidation.ps1 - What It Checks
 *
 * Clean, scannable list of actual script functionality
 */
const ScriptChecksSlide = ({ theme: t }) => {
  const categories = [
    {
      name: "Antivirus & Detection",
      icon: Shield,
      color: "emerald",
      checks: [
        "Defender Real-Time Protection",
        "Tamper Protection Status",
        "Signature Currency",
        "EICAR Detection Test",
        "AV Exclusion Audit",
      ]
    },
    {
      name: "Credential Protection",
      icon: Key,
      color: "amber",
      checks: [
        "Credential Guard",
        "LSASS Protection",
        "WDigest Caching Disabled",
        "LM Hash Storage",
        "Cached Logon Limits",
      ]
    },
    {
      name: "Lateral Movement",
      icon: Network,
      color: "purple",
      checks: [
        "SMB Signing Required",
        "SMBv1 Disabled",
        "RDP Network Level Auth",
        "LLMNR/NetBIOS Disabled",
        "Remote SAM Restricted",
      ]
    },
    {
      name: "Execution Controls",
      icon: Zap,
      color: "cyan",
      checks: [
        "PowerShell v2 Disabled",
        "AMSI Providers Active",
        "Script Block Logging",
        "AppLocker/WDAC Status",
        "Office Macro Blocking",
      ]
    },
    {
      name: "Privilege & UAC",
      icon: Lock,
      color: "red",
      checks: [
        "UAC Enabled & Configured",
        "AlwaysInstallElevated",
        "Admin Token Filtering",
        "Local Admin Sprawl",
        "LAPS Deployment",
      ]
    },
    {
      name: "Persistence & Logging",
      icon: Activity,
      color: "slate",
      checks: [
        "AutoRun/AutoPlay Disabled",
        "Startup Folder Audit",
        "WMI Subscriptions",
        "Sysmon Installed",
        "Event Log Service",
      ]
    },
  ];

  const getColor = (color) => ({
    emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    slate: { text: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/30' },
  }[color]);

  return (
    <div className="w-full h-full flex flex-col px-8 py-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className={`text-4xl font-bold ${t.textOnPage}`}>
          SafeEndpointValidation.ps1
        </h2>
        <p className="text-xl text-slate-400 mt-1">
          60+ security checks across 12 categories — runs in ~60 seconds
        </p>
      </div>

      {/* 3x2 Grid of Categories */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {categories.map((cat, i) => {
          const colors = getColor(cat.color);
          const Icon = cat.icon;
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-xl p-4`}>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${colors.text}`} />
                <span className={`text-lg font-semibold ${colors.text}`}>{cat.name}</span>
              </div>

              {/* Checks */}
              <div className="space-y-1.5">
                {cat.checks.map((check, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />
                    <span className="text-base text-slate-300">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-slate-400">
        <span className="text-lg">Non-destructive • Read-only • RMM-ready</span>
        <span className="text-lg font-mono">github.com/rewst-io/SafeEndpointValidation</span>
      </div>
    </div>
  );
};

export default ScriptChecksSlide;
