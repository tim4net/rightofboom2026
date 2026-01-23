import React from 'react';
import {
  Eye, Key, Network, Lock,
  AlertTriangle, Clock
} from 'lucide-react';

/**
 * What Attackers Check First - Reorganized by Attacker Goals
 *
 * Instead of Windows feature categories, this slide organizes misconfigurations
 * by what attackers are trying to ACCOMPLISH - making the "so what" immediately clear.
 *
 * 4 Attack Phases: Stay Hidden | Steal Credentials | Spread Laterally | Hold Data Hostage
 */
const WhatAttackersCheckFirstSlide = ({ theme: t }) => {
  const attackPhases = [
    {
      question: "Can I stay hidden?",
      icon: Eye,
      color: "red",
      finding: "Real-time AV disabled",
      consequence: "Malware runs undetected for weeks",
      timeToExploit: "Instant"
    },
    {
      question: "Can I steal credentials?",
      icon: Key,
      color: "red",
      finding: "LSASS unprotected",
      consequence: "All logged-in passwords in 30 seconds",
      timeToExploit: "30 sec"
    },
    {
      question: "Can I spread?",
      icon: Network,
      color: "amber",
      finding: "LLMNR/NetBIOS enabled",
      consequence: "Poison names, intercept auth, pivot to any machine",
      timeToExploit: "5 min"
    },
    {
      question: "Can I hold data hostage?",
      icon: Lock,
      color: "amber",
      finding: "BitLocker disabled",
      consequence: "Disk readable from USB boot, no encryption barrier",
      timeToExploit: "10 min"
    }
  ];

  const getColorClasses = (color) => {
    if (color === 'red') {
      return {
        text: 'text-red-400',
        bg: 'bg-red-500/15',
        border: 'border-red-500/50',
        badge: 'bg-red-500/30'
      };
    }
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/50',
      badge: 'bg-amber-500/30'
    };
  };

  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-3">
          <AlertTriangle className="w-12 h-12 text-red-400" />
          <h2 className={`text-6xl font-black ${t.textOnPage}`}>
            What Attackers Check First
          </h2>
        </div>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
          4 questions. 4 misconfigs. Total compromise.
        </p>
      </div>

      {/* Attack Phases Grid - 2x2 */}
      <div className="flex-1 grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {attackPhases.map((phase, i) => {
          const colors = getColorClasses(phase.color);
          const IconComponent = phase.icon;

          return (
            <div
              key={i}
              className={`${t.cardBg} rounded-2xl border-2 ${colors.border} p-6 flex flex-col`}
            >
              {/* Question Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`${colors.bg} p-3 rounded-xl`}>
                  <IconComponent className={`w-10 h-10 ${colors.text}`} />
                </div>
                <h3 className={`text-3xl font-bold ${colors.text}`}>
                  {phase.question}
                </h3>
              </div>

              {/* Finding */}
              <div className="mb-3">
                <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">
                  They find:
                </div>
                <div className="text-2xl font-semibold text-slate-200">
                  {phase.finding}
                </div>
              </div>

              {/* Consequence - the "so what" */}
              <div className="flex-1">
                <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">
                  Which means:
                </div>
                <div className={`text-2xl font-bold ${colors.text}`}>
                  {phase.consequence}
                </div>
              </div>

              {/* Time to Exploit Badge */}
              <div className="mt-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-500" />
                <span className={`${colors.badge} px-3 py-1 rounded-lg text-xl font-medium ${colors.text}`}>
                  {phase.timeToExploit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer - Creates tension for next slide to resolve */}
      <div className="text-center mt-6">
        <p className="text-3xl text-slate-300">
          Attackers run this in <span className="text-red-400 font-bold">60 seconds</span>.{' '}
          <span className="text-amber-400 italic">How long does YOUR audit take?</span>
        </p>
      </div>
    </div>
  );
};

export default WhatAttackersCheckFirstSlide;
