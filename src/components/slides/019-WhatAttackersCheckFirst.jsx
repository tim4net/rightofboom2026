import React from 'react';
import {
  Eye, Key, Network, Lock,
  Terminal, Clock
} from 'lucide-react';

/**
 * The 23 PowerShell Checks Slide
 *
 * RESTRUCTURED: Previously "What Attackers Check First" (4 attack phases).
 * Now organized by the same 4 attacker goals but with the FULL 23 checks shown.
 *
 * 4-column grid showing exactly what PowerShell validates:
 * Stay Hidden | Steal Creds | Spread | Hold Hostage
 *
 * Key message: "23 checks. 60 seconds. Zero AI guessing."
 */
const PowerShellChecksSlide = ({ theme: t }) => {
  const checkCategories = [
    {
      goal: "Stay Hidden",
      icon: Eye,
      color: "red",
      checks: [
        "Real-time AV status",
        "Defender exclusions",
        "ASR rules enabled",
        "Script block logging",
        "PowerShell logging",
        "Audit policies"
      ]
    },
    {
      goal: "Steal Creds",
      icon: Key,
      color: "red",
      checks: [
        "LSASS protection",
        "Credential Guard",
        "WDigest disabled",
        "Cached logon limit",
        "DPAPI settings"
      ]
    },
    {
      goal: "Spread",
      icon: Network,
      color: "amber",
      checks: [
        "LLMNR disabled",
        "NetBIOS disabled",
        "SMB signing",
        "Admin shares",
        "RDP security",
        "Firewall status"
      ]
    },
    {
      goal: "Hold Hostage",
      icon: Lock,
      color: "amber",
      checks: [
        "BitLocker status",
        "Backup config",
        "VSS protection",
        "Recovery settings",
        "Secure Boot",
        "UAC level"
      ]
    }
  ];

  const getColorClasses = (color) => {
    if (color === 'red') {
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/15',
        border: 'border-red-500/40',
        bullet: 'bg-red-500'
      };
    }
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/40',
      bullet: 'bg-amber-500'
    };
  };

  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-3">
          <Terminal className="w-10 h-10 text-amber-400" />
          <h2 className={`text-5xl font-black ${t.textOnPage}`}>
            What Attackers Check First
          </h2>
        </div>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
          23 checks. 60 seconds. We check faster.
        </p>
      </div>

      {/* 4-Column Grid */}
      <div className="flex-1 grid grid-cols-4 gap-4 max-w-7xl mx-auto w-full">
        {checkCategories.map((cat, i) => {
          const colors = getColorClasses(cat.color);
          const IconComponent = cat.icon;

          return (
            <div
              key={i}
              className={`${t.cardBg} rounded-xl border-2 ${colors.border} p-4 flex flex-col`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`${colors.bg} p-2 rounded-lg`}>
                  <IconComponent className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className={`text-2xl font-bold ${colors.text}`}>
                  {cat.goal}
                </h3>
              </div>

              {/* Checks List */}
              <div className="space-y-2 flex-1">
                {cat.checks.map((check, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className={`w-2 h-2 ${colors.bullet} rounded-full flex-shrink-0`} />
                    <span className="text-xl text-slate-300">{check}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Count Badge */}
      <div className="flex justify-center mt-4 mb-2">
        <div className={`${t.cardBg} px-6 py-3 rounded-xl border border-emerald-500/30 flex items-center gap-4`}>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <span className="text-2xl text-emerald-400 font-bold">60 seconds</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-2xl text-slate-300">
            <span className="text-emerald-400 font-bold">23</span> security checks
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-2xl text-slate-300">
            Pure <span className="text-amber-400 font-bold">PowerShell</span>
          </span>
        </div>
      </div>

      {/* Transition Hook */}
      <div className="text-center mt-2">
        <p className="text-2xl text-slate-400">
          Raw data isn't actionable...
        </p>
        <p className="text-3xl text-amber-400 font-semibold">
          Here's how we turn 23 checks into a graded report →
        </p>
      </div>
    </div>
  );
};

export default PowerShellChecksSlide;
