import React from 'react';
import { Eye, Key, Network, Zap, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * Design 3: "Security Scorecard Grid"
 *
 * CONCEPT: Clean 4-column data grid optimized for information density
 * Bold category headers with all 24 checks clearly visible
 * Dashboard aesthetic with strong visual hierarchy
 *
 * STAR MOMENT: The completeness - audience sees EXACTLY what gets checked
 */
const ScorecardSlide = ({ theme: t }) => {
  const categories = [
    {
      title: "Detection Evasion",
      icon: Eye,
      color: "red",
      checks: ["Defender real-time", "Tamper protection", "ASR rules", "AV exclusions", "Event logging", "LOLBIN controls"],
    },
    {
      title: "Credential Theft",
      icon: Key,
      color: "amber",
      checks: ["Credential Guard", "LSASS protection", "WDigest disabled", "LM hash storage", "Cached logons", "Remote SAM"],
    },
    {
      title: "Lateral Movement",
      icon: Network,
      color: "purple",
      checks: ["SMB signing", "SMBv1 disabled", "RDP NLA required", "LLMNR/NetBIOS", "WinRM restricted", "Token filtering"],
    },
    {
      title: "Execution & Persistence",
      icon: Zap,
      color: "cyan",
      checks: ["PowerShell v2", "AMSI providers", "UAC enforced", "Office macros", "AutoRun disabled", "Script logging"],
    },
  ];

  const getColors = (color) => ({
    red: { header: 'bg-red-500/20 border-red-500/40', text: 'text-red-400', bullet: 'bg-red-400' },
    amber: { header: 'bg-amber-500/20 border-amber-500/40', text: 'text-amber-400', bullet: 'bg-amber-400' },
    purple: { header: 'bg-purple-500/20 border-purple-500/40', text: 'text-purple-400', bullet: 'bg-purple-400' },
    cyan: { header: 'bg-cyan-500/20 border-cyan-500/40', text: 'text-cyan-400', bullet: 'bg-cyan-400' },
  }[color]);

  return (
    <div className="w-full h-full flex flex-col px-10 py-5">
      {/* Header with Equation */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black ${t.textOnPage} mb-3`}>
          What Attackers Check First
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-2">
            <Terminal className="w-5 h-5 text-red-400" />
            <span className="text-xl text-red-400 font-mono">attacker_recon.ps1</span>
          </div>
          <ArrowRight className="w-6 h-6 text-slate-500" />
          <span className="text-2xl font-bold text-slate-400">=</span>
          <ArrowRight className="w-6 h-6 text-slate-500 rotate-180" />
          <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-4 py-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xl text-emerald-400 font-mono">SafeEndpointValidation.ps1</span>
          </div>
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="flex-1 grid grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const colors = getColors(cat.color);
          const Icon = cat.icon;
          return (
            <div key={i} className="flex flex-col">
              {/* Category Header */}
              <div className={`${colors.header} border rounded-t-xl px-4 py-3 flex items-center gap-3`}>
                <Icon className={`w-7 h-7 ${colors.text}`} />
                <span className={`text-xl font-bold ${colors.text}`}>{cat.title}</span>
              </div>

              {/* Checks List */}
              <div className={`flex-1 ${t.cardBg} border-x border-b border-slate-700/50 rounded-b-xl p-4`}>
                <div className="space-y-3">
                  {cat.checks.map((check, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className={`w-2 h-2 ${colors.bullet} rounded-full flex-shrink-0`} />
                      <span className="text-xl text-slate-300">{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 flex items-center justify-between">
        <p className={`text-2xl font-semibold ${t.accentColor}`}>
          Same checklist. We just run it first.
        </p>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl text-emerald-400 font-bold">60+</span>
            <span className="text-xl text-slate-400">checks</span>
          </div>
          <div className="w-px h-8 bg-slate-600" />
          <div className="flex items-center gap-2">
            <span className="text-3xl text-amber-400 font-bold">12</span>
            <span className="text-xl text-slate-400">categories</span>
          </div>
          <div className="w-px h-8 bg-slate-600" />
          <div className="flex items-center gap-2">
            <span className="text-3xl text-cyan-400 font-bold">60s</span>
            <span className="text-xl text-slate-400">runtime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorecardSlide;
