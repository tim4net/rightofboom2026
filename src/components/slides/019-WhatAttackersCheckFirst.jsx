import React from 'react';
import {
  Eye, Key, Network, Zap,
  Terminal, ArrowRight, CheckCircle2
} from 'lucide-react';

/**
 * What Attackers Check First
 *
 * STAR MOMENT: Visual showing attacker recon = our validation checks
 * "Same checklist. We just run it first."
 *
 * Clean design: Colored banner headers + simple bullet lists
 */
const AttackerChecklistSlide = ({ theme: t }) => {
  const checkCategories = [
    {
      goal: "Evade Detection",
      attackerThinks: "Can I hide?",
      icon: Eye,
      color: "red",
      checks: [
        "Defender real-time",
        "Tamper protection",
        "ASR rules",
        "AV exclusions",
        "Event logging",
        "LOLBIN controls",
      ]
    },
    {
      goal: "Steal Credentials",
      attackerThinks: "Can I harvest?",
      icon: Key,
      color: "amber",
      checks: [
        "Credential Guard",
        "LSASS protection",
        "WDigest disabled",
        "LM hash storage",
        "Cached logons",
        "Remote SAM",
      ]
    },
    {
      goal: "Move Laterally",
      attackerThinks: "Can I spread?",
      icon: Network,
      color: "purple",
      checks: [
        "SMB signing",
        "SMBv1 disabled",
        "RDP NLA required",
        "LLMNR/NetBIOS",
        "WinRM restricted",
        "Token filtering",
      ]
    },
    {
      goal: "Execute & Persist",
      attackerThinks: "Can I stay?",
      icon: Zap,
      color: "cyan",
      checks: [
        "PowerShell v2",
        "AMSI providers",
        "UAC enforced",
        "Office macros",
        "AutoRun disabled",
        "Script logging",
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      red: {
        text: 'text-red-400',
        bg: 'bg-red-500/20',
        bgStrong: 'bg-red-500/30',
        border: 'border-red-500/50',
        bullet: 'bg-red-400',
      },
      amber: {
        text: 'text-amber-400',
        bg: 'bg-amber-500/20',
        bgStrong: 'bg-amber-500/30',
        border: 'border-amber-500/50',
        bullet: 'bg-amber-400',
      },
      purple: {
        text: 'text-purple-400',
        bg: 'bg-purple-500/20',
        bgStrong: 'bg-purple-500/30',
        border: 'border-purple-500/50',
        bullet: 'bg-purple-400',
      },
      cyan: {
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/20',
        bgStrong: 'bg-cyan-500/30',
        border: 'border-cyan-500/50',
        bullet: 'bg-cyan-400',
      }
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          What Attackers Check First
        </h2>

        {/* Equation visual */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-2">
            <Terminal className="w-5 h-5 text-red-400" />
            <span className="text-xl text-red-400 font-mono">attacker_recon.ps1</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <ArrowRight className="w-6 h-6" />
            <span className="text-2xl font-bold">=</span>
            <ArrowRight className="w-6 h-6 rotate-180" />
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-4 py-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xl text-emerald-400 font-mono">SafeEndpointValidation.ps1</span>
          </div>
        </div>
        <p className={`text-2xl ${t.accentColor} font-semibold mt-2`}>
          Same checklist. We just run it first.
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="flex-1 grid grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
        {checkCategories.map((cat, i) => {
          const colors = getColorClasses(cat.color);
          const IconComponent = cat.icon;

          return (
            <div key={i} className="flex flex-col">
              {/* Colored Banner Header */}
              <div className={`${colors.bg} border ${colors.border} rounded-t-xl px-4 py-3`}>
                <div className="flex items-center gap-3">
                  <div className={`${colors.bgStrong} p-2 rounded-lg`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${colors.text}`}>{cat.goal}</h3>
                    <p className="text-lg text-slate-500 italic">"{cat.attackerThinks}"</p>
                  </div>
                </div>
              </div>

              {/* Check Items - simple bullets */}
              <div className={`flex-1 ${t.cardBg} border-x border-b ${colors.border} rounded-b-xl p-4`}>
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

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className={`${t.cardBg} px-6 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-6`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl text-emerald-400 font-bold">60+</span>
            <span className="text-lg text-slate-400">checks</span>
          </div>
          <div className="w-px h-6 bg-slate-600" />
          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400 font-bold">12</span>
            <span className="text-lg text-slate-400">categories</span>
          </div>
          <div className="w-px h-6 bg-slate-600" />
          <div className="flex items-center gap-2">
            <span className="text-2xl text-cyan-400 font-bold">60s</span>
            <span className="text-lg text-slate-400">per endpoint</span>
          </div>
        </div>
        <p className="text-xl text-slate-400">
          Raw JSON isn't actionable → AI turns it into a graded report
        </p>
      </div>
    </div>
  );
};

export default AttackerChecklistSlide;
