import React from 'react';
import { Eye, Key, Network, Zap, Terminal, CheckCircle2 } from 'lucide-react';

/**
 * Design 2: "The Interrogation" / Question-First Design - IMPROVED
 *
 * CHANGES FROM V1:
 * - Restored original title "What Attackers Check First"
 * - Questions are now MUCH bigger and dominant
 * - Varied the answers instead of "Not if we verify" 4x
 * - Added equation visual back
 * - Reduced check details to just category totals
 *
 * STAR MOMENT: Hearing the attacker's voice, immediately countered
 */
const InterrogationSlide = ({ theme: t }) => {
  const questions = [
    {
      question: "CAN I HIDE?",
      answer: "We verify detection controls",
      icon: Eye,
      color: "red",
      count: 6,
    },
    {
      question: "CAN I HARVEST?",
      answer: "We verify credential protection",
      icon: Key,
      color: "amber",
      count: 6,
    },
    {
      question: "CAN I SPREAD?",
      answer: "We verify network hardening",
      icon: Network,
      color: "purple",
      count: 6,
    },
    {
      question: "CAN I STAY?",
      answer: "We verify execution controls",
      icon: Zap,
      color: "cyan",
      count: 6,
    },
  ];

  const getColors = (color) => ({
    red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    purple: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  }[color]);

  return (
    <div className="w-full h-full flex flex-col px-10 py-5">
      {/* Header - Questions dominate, no equation competing */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          What Attackers Check First
        </h2>
      </div>

      {/* 2x2 Question Grid */}
      <div className="flex-1 grid grid-cols-2 gap-5">
        {questions.map((q, i) => {
          const colors = getColors(q.color);
          const Icon = q.icon;
          return (
            <div key={i} className={`${colors.bg} border ${colors.border} rounded-2xl p-6 flex flex-col`}>
              {/* Big Question - THE DOMINANT ELEMENT */}
              <div className="flex items-center gap-4 mb-4">
                <Icon className={`w-12 h-12 ${colors.text}`} />
                <span className={`text-5xl font-black ${colors.text}`}>{q.question}</span>
              </div>

              {/* Answer - Confident defense */}
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <span className="text-2xl text-emerald-400 font-semibold">{q.answer}</span>
                <span className="text-xl text-slate-500 ml-auto">{q.count} checks</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer - Equation as proof, tagline as landing */}
      <div className="mt-4 flex items-center justify-between">
        {/* Equation - proof point */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-3 py-1.5">
            <Terminal className="w-4 h-4 text-red-400" />
            <span className="text-lg text-red-400 font-mono">attacker_recon.ps1</span>
          </div>
          <span className="text-xl font-bold text-slate-400">=</span>
          <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-3 py-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-lg text-emerald-400 font-mono">SafeEndpointValidation.ps1</span>
          </div>
        </div>
        {/* Tagline */}
        <p className={`text-2xl font-bold ${t.accentColor}`}>
          Same checklist. We just run it first.
        </p>
      </div>
    </div>
  );
};

export default InterrogationSlide;
