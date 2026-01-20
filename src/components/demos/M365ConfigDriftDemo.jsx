import React from 'react';
import { Database, GitCompare, Sparkles, Bell, ArrowRight, Clock, Webhook } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 *
 * Teaching point: "AI validates against YOUR truth, not its own judgment"
 * Shows the 4-step flow with triggers at bottom
 * GUID resolution is part of the AI layer description
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-5xl md:text-6xl font-black ${t.textOnPage} mb-2`}>
          Conditional Access <span className="text-amber-400">Monitor</span>
        </h2>
        <p className="text-2xl text-slate-400">
          Your baseline. Your rules. <span className="text-purple-400">AI makes it readable.</span>
        </p>
      </div>

      {/* The Flow: 4-step horizontal process - SIMPLIFIED */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-4 max-w-6xl w-full">

          {/* Step 1: Baseline */}
          <div className="flex-1 flex flex-col">
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-5 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-7 h-7 text-amber-400" />
                <span className="text-2xl font-bold text-amber-400">BASELINE</span>
              </div>
              <div className="text-xl text-slate-300">
                Your stored config snapshot
              </div>
              <div className="text-lg text-slate-500 mt-2">
                12 policies • last checked Jan 15
              </div>
            </div>
            <div className="text-center mt-2 text-lg text-amber-400 font-medium">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-6 h-6 text-slate-600" />
          </div>

          {/* Step 2: Compare */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800/60 border-2 border-slate-600/50 rounded-xl p-5 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <GitCompare className="w-7 h-7 text-slate-300" />
                <span className="text-2xl font-bold text-slate-200">COMPARE</span>
              </div>
              <div className="text-xl text-slate-400">
                Math-based diff
              </div>
              <div className="text-lg text-slate-500 mt-2">
                added • removed • modified
              </div>
            </div>
            <div className="text-center mt-2 text-lg text-amber-400 font-medium">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-6 h-6 text-slate-600" />
          </div>

          {/* Step 3: AI Layer (Optional) */}
          <div className="flex-1 flex flex-col">
            <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-5 flex-1 flex flex-col justify-center relative">
              {/* Optional badge */}
              <div className="absolute -top-3 right-4 bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                OPTIONAL
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-7 h-7 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">AI LAYER</span>
              </div>
              <div className="text-xl text-slate-400">
                GUID → human names
              </div>
              <div className="text-lg text-slate-500 mt-2">
                a93f2... → "Finance Team"
              </div>
            </div>
            <div className="text-center mt-2 text-lg text-purple-400 font-medium">
              Probabilistic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-6 h-6 text-slate-600" />
          </div>

          {/* Step 4: Alert */}
          <div className="flex-1 flex flex-col">
            <div className="bg-red-500/10 border-2 border-red-500/40 rounded-xl p-5 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-7 h-7 text-red-400" />
                <span className="text-2xl font-bold text-red-400">ALERT</span>
              </div>
              <div className="text-xl text-slate-400">
                PSA ticket + email
              </div>
              <div className="text-lg text-slate-500 mt-2">
                Human-readable, actionable
              </div>
            </div>
            <div className="text-center mt-2 text-lg text-emerald-400 font-medium">
              Actionable
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Key Insight + Dual Triggers */}
      <div className="mt-6 flex gap-6 max-w-6xl mx-auto w-full">
        {/* Key Insight */}
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4">
          <div className="text-2xl font-bold text-emerald-400">
            GPT-4 summarizes. Math decides.
          </div>
          <div className="text-xl text-slate-400">
            Change detection is deterministic. AI just makes output readable.
          </div>
        </div>

        {/* Dual Triggers */}
        <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl px-6 py-4">
          <div className="text-xl font-semibold text-slate-300 mb-2">Triggers</div>
          <div className="flex gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300">Every 42 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Webhook className="w-5 h-5 text-amber-400" />
              <span className="text-slate-300">MS audit log</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
