import React from 'react';
import { Eye, Key, Network, Zap, Terminal, CheckCircle2 } from 'lucide-react';

/**
 * Design 4: "The 60-Second Audit" / Countdown Drama - IMPROVED
 *
 * CHANGES FROM V1:
 * - Added equation visual above timer
 * - Removed competing side comparison panel
 * - Changed subtext to "to know what attackers know"
 * - Fixed category counts (showing subset of 60+)
 *
 * STAR MOMENT: The giant "60" is immediately memorable and retellable
 */
const CountdownSlide = ({ theme: t }) => {
  const categories = [
    { name: "Detection", icon: Eye, color: "text-red-400" },
    { name: "Credentials", icon: Key, color: "text-amber-400" },
    { name: "Lateral", icon: Network, color: "text-purple-400" },
    { name: "Persistence", icon: Zap, color: "text-cyan-400" },
  ];

  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header with Equation */}
      <div className="text-center mb-2">
        <h2 className={`text-5xl font-black ${t.textOnPage} mb-4`}>
          What Attackers Check First
        </h2>
        {/* THE EQUATION - concrete proof */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-2">
            <Terminal className="w-5 h-5 text-red-400" />
            <span className="text-xl text-red-400 font-mono">attacker_recon.ps1</span>
          </div>
          <span className="text-3xl font-bold text-slate-400">=</span>
          <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-lg px-4 py-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xl text-emerald-400 font-mono">SafeEndpointValidation.ps1</span>
          </div>
        </div>
      </div>

      {/* Main Content: Giant Timer Hero */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Outer ring with gradient */}
          <div className="w-96 h-96 rounded-full border-8 border-emerald-500/20 flex items-center justify-center relative">
            {/* Progress arc effect - fills clockwise */}
            <div className="absolute inset-2 rounded-full border-4 border-emerald-500/40" />

            {/* Inner content */}
            <div className="text-center">
              <div className="text-[180px] font-black text-emerald-400 leading-none tracking-tight">60</div>
              <div className="text-4xl font-bold text-slate-300 -mt-4">seconds</div>
              <div className="text-2xl text-slate-400 mt-2">to know what attackers know</div>
            </div>
          </div>

          {/* Category badges at cardinal positions */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <CategoryBadge icon={Eye} name="Detection" color="text-red-400" />
          </div>
          <div className="absolute top-1/2 -right-28 -translate-y-1/2">
            <CategoryBadge icon={Key} name="Credentials" color="text-amber-400" />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
            <CategoryBadge icon={Network} name="Lateral" color="text-purple-400" />
          </div>
          <div className="absolute top-1/2 -left-28 -translate-y-1/2">
            <CategoryBadge icon={Zap} name="Persistence" color="text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Footer - Clean tagline + stats */}
      <div className="flex items-center justify-between">
        <p className={`text-3xl font-bold ${t.accentColor}`}>
          Same checklist. We just run it first.
        </p>
        <div className="flex items-center gap-6 text-slate-300">
          <span className="text-xl"><span className="text-emerald-400 font-bold">60+</span> checks</span>
          <span className="text-slate-600">|</span>
          <span className="text-xl"><span className="text-amber-400 font-bold">12</span> categories</span>
        </div>
      </div>
    </div>
  );
};

const CategoryBadge = ({ icon: Icon, name, color }) => (
  <div className="bg-slate-800/90 border border-slate-600 rounded-xl px-4 py-2 flex items-center gap-2">
    <Icon className={`w-5 h-5 ${color}`} />
    <span className="text-lg font-semibold text-slate-300">{name}</span>
  </div>
);

export default CountdownSlide;
