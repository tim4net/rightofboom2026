import React from 'react';
import { ArrowRight, Clock, Zap, Bell, FileText } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 * Shows the 4-step flow: Baseline → Compare → AI → Alert
 * Follows presentation visual language from slides 7-9
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-10 object-contain"
          />
          <span className="text-xl text-amber-400 font-semibold tracking-wider">
            REWST CRATE
          </span>
        </div>
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          Conditional Access <span className="text-amber-400">Policy Monitor</span>
        </h2>
      </div>

      {/* Dual Triggers - compact */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg">
          <Clock className="w-5 h-5 text-slate-400" />
          <span className="text-xl text-slate-300">Scheduled check</span>
        </div>
        <div className="text-2xl text-slate-500 flex items-center">+</div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
          <Zap className="w-5 h-5 text-emerald-400" />
          <span className="text-xl text-emerald-300 font-semibold">MS Audit Webhook</span>
        </div>
        <div className="text-2xl text-slate-500 flex items-center">=</div>
        <div className="px-4 py-2 bg-emerald-500/30 border border-emerald-500/60 rounded-lg">
          <span className="text-xl text-emerald-200 font-bold">No blind spots</span>
        </div>
      </div>

      {/* 4-Step Flow */}
      <div className="flex-1 flex items-center justify-center gap-4 max-w-6xl mx-auto w-full">
        {/* Step 1: BASELINE */}
        <div className="flex-1 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5">
          <div className="text-2xl font-bold text-amber-400 mb-3">BASELINE</div>
          <div className="text-xl text-slate-300">
            Your stored config snapshot
          </div>
          <div className="text-xl text-slate-400 mt-2">
            = your ground truth
          </div>
        </div>

        <ArrowRight className="w-8 h-8 text-slate-600 flex-shrink-0" />

        {/* Step 2: COMPARE */}
        <div className="flex-1 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-5">
          <div className="text-2xl font-bold text-amber-400 mb-3">COMPARE</div>
          <div className="text-xl text-slate-300">
            Set difference math
          </div>
          <div className="flex gap-3 mt-2 font-mono text-xl">
            <span className="text-emerald-400">+</span>
            <span className="text-red-400">−</span>
            <span className="text-amber-400">~</span>
          </div>
        </div>

        <ArrowRight className="w-8 h-8 text-slate-600 flex-shrink-0" />

        {/* Step 3: AI */}
        <div className="flex-1 bg-purple-500/10 border-2 border-purple-500/40 rounded-2xl p-5">
          <div className="text-2xl font-bold text-purple-400 mb-3">AI LAYER</div>
          <div className="text-xl text-slate-300">
            Translates GUIDs to names
          </div>
          <div className="text-xl text-slate-300 mt-1">
            Explains the risk
          </div>
        </div>

        <ArrowRight className="w-8 h-8 text-slate-600 flex-shrink-0" />

        {/* Step 4: ALERT */}
        <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-6 h-6 text-red-400" />
            <span className="text-2xl font-bold text-red-400">ALERT</span>
          </div>
          <div className="text-xl text-slate-300">PSA ticket</div>
          <div className="text-xl text-slate-300">Email notification</div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 flex justify-center gap-6">
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4">
          <div className="text-2xl font-bold text-emerald-400">
            AI summarizes. Math decides.
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-4">
          <div className="text-2xl text-slate-300">
            Runs across <span className="text-amber-400 font-bold">all your tenants</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
