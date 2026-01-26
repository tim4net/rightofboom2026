import React from 'react';
import { FileText, Shield, Eye, Key, Network, Zap, Terminal, CheckCircle2 } from 'lucide-react';

/**
 * Design 5: "The Playbook Theft" / Document Metaphor - IMPROVED
 *
 * CHANGES FROM V1:
 * - Removed tug-of-war (was visually chaotic)
 * - Simplified to: Title + Document + Defender claiming it
 * - Added equation back to document
 * - Removed pulsing arrows
 * - Cleaner, more confident visual
 *
 * STAR MOMENT: The title "Steal Their Playbook" is provocative and memorable
 */
const PlaybookTheftSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header - THE FIRE TITLE */}
      <div className="text-center mb-6">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>
          Steal Their Playbook
        </h2>
        <p className="text-2xl text-slate-400 mt-3">
          Attackers wrote the checklist. We run it first.
        </p>
      </div>

      {/* Main Visual: Document IS the slide - with CLAIMED stamp */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-emerald-500/15 blur-3xl rounded-3xl" />

          <div className="relative bg-slate-800 border-2 border-slate-500 rounded-2xl p-10 w-[560px] shadow-2xl">
            {/* CLAIMED stamp overlay */}
            <div className="absolute top-6 right-6 rotate-12">
              <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-lg px-4 py-2">
                <span className="text-2xl font-black text-emerald-400 tracking-wider">CLAIMED</span>
              </div>
            </div>

            {/* Document header */}
            <div className="flex items-center gap-4 border-b border-slate-600 pb-6 mb-6">
              <div className="bg-slate-700 p-4 rounded-xl">
                <FileText className="w-12 h-12 text-slate-300" />
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-200">attacker_recon.ps1</div>
                <div className="text-xl text-slate-500">Their reconnaissance script. Now yours.</div>
              </div>
            </div>

            {/* What it checks */}
            <div className="space-y-4 mb-6">
              <CheckItem icon={Eye} text="Detection Evasion" color="text-red-400" count="6 checks" />
              <CheckItem icon={Key} text="Credential Theft" color="text-amber-400" count="6 checks" />
              <CheckItem icon={Network} text="Lateral Movement" color="text-purple-400" count="6 checks" />
              <CheckItem icon={Zap} text="Execution & Persistence" color="text-cyan-400" count="6 checks" />
            </div>

            {/* Stats bar */}
            <div className="flex justify-between text-xl border-t border-slate-600 pt-5">
              <span className="text-slate-400">Categories: <span className="text-amber-400 font-bold">12</span></span>
              <span className="text-slate-400">Total Checks: <span className="text-emerald-400 font-bold">60+</span></span>
              <span className="text-slate-400">Runtime: <span className="text-cyan-400 font-bold">60s</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Equation + Insight */}
      <div className="flex items-center justify-between">
        {/* Equation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-2">
            <Terminal className="w-5 h-5 text-red-400" />
            <span className="text-xl text-red-400 font-mono">attacker_recon.ps1</span>
          </div>
          <span className="text-2xl font-bold text-slate-400">=</span>
          <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-4 py-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xl text-emerald-400 font-mono">SafeEndpointValidation.ps1</span>
          </div>
        </div>

        {/* Insight */}
        <p className={`text-2xl font-semibold ${t.accentColor}`}>
          Same reconnaissance. You win by going first.
        </p>
      </div>
    </div>
  );
};

const CheckItem = ({ icon: Icon, text, color, count }) => (
  <div className="flex items-center gap-4">
    <Icon className={`w-7 h-7 ${color}`} />
    <span className="text-2xl text-slate-300">{text}</span>
    <span className="text-lg text-slate-500 ml-auto">{count}</span>
  </div>
);

export default PlaybookTheftSlide;
