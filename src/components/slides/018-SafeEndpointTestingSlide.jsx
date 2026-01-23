import React from 'react';
import { Shield, FlaskConical, Target, CheckCircle2, Users, ExternalLink } from 'lucide-react';

/**
 * Atomic Red Team Introduction Slide
 *
 * RESTRUCTURED: Previously "Safe Endpoint Testing" principles.
 * Now introduces Atomic Red Team as the testing toolkit that powers Safe Sweep.
 *
 * 3-column layout: What It Is | Why It's Safe | How It Works
 * Sets up the narrative: "But running raw Atomic tests requires expertise..."
 */
const AtomicRedTeamSlide = ({ theme: t }) => {
  const columns = [
    {
      title: "What It Is",
      icon: FlaskConical,
      color: "emerald",
      points: [
        "Library of attack simulations",
        "Mapped to MITRE ATT&CK framework",
        "Used by red/blue teams worldwide",
        "Free and open source"
      ]
    },
    {
      title: "Why It's Safe",
      icon: Shield,
      color: "amber",
      points: [
        "Self-contained tests",
        "Built-in cleanup routines",
        "Scoped to single endpoints",
        "No persistent modifications"
      ]
    },
    {
      title: "How It Works",
      icon: Target,
      color: "purple",
      points: [
        "Define test (technique ID)",
        "Execute simulation safely",
        "Verify detection triggered",
        "Automated rollback/cleanup"
      ]
    }
  ];

  const colorMap = {
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/15',
      border: 'border-emerald-500/40'
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/40'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/40'
    }
  };

  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-6xl font-black mb-4 ${t.textOnPage}`}>
          Automating Atomic Red Team Tests
        </h2>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
          Safe attack simulations. Real validation. Open source.
        </p>
      </div>

      {/* 3-Column Layout */}
      <div className="flex-1 grid grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
        {columns.map((col, i) => {
          const colors = colorMap[col.color];
          const IconComponent = col.icon;

          return (
            <div
              key={i}
              className={`${t.cardBg} rounded-2xl border-2 ${colors.border} p-6 flex flex-col`}
            >
              {/* Column Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`${colors.bg} p-3 rounded-xl`}>
                  <IconComponent className={`w-10 h-10 ${colors.text}`} />
                </div>
                <h3 className={`text-3xl font-bold ${colors.text}`}>
                  {col.title}
                </h3>
              </div>

              {/* Points */}
              <div className="space-y-4 flex-1">
                {col.points.map((point, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-6 h-6 ${colors.text} flex-shrink-0 mt-0.5`} />
                    <span className="text-2xl text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Value Proposition - STAR Moment */}
      <div className="flex justify-center mt-6 mb-4">
        <div className={`${t.cardBg} px-8 py-4 rounded-xl border border-amber-500/40`}>
          <p className="text-2xl text-center">
            <span className="text-amber-400 font-bold">$50K+ red team testing</span>
            <span className="text-slate-400"> — free, open source, run it Monday morning</span>
          </p>
          <p className="text-xl text-slate-500 text-center mt-2">
            Created by Red Canary • atomicredteam.io • 1,500+ techniques
          </p>
        </div>
      </div>

      {/* Transition Hook */}
      <div className="text-center">
        <p className="text-2xl text-slate-400">
          We automated the critical checks into ~1,200 lines of PowerShell...
        </p>
        <p className="text-3xl text-amber-400 font-semibold mt-2">
          Let me show you the actual code →
        </p>
      </div>
    </div>
  );
};

export default AtomicRedTeamSlide;
