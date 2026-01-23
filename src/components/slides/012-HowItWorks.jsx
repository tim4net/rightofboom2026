import React from 'react';
import { ArrowDown, Clock, Database, Calculator, Brain, Bell, RefreshCw } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - How It Works (with Sandwich Mapping)
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-4 py-2">
      {/* Header - minimal */}
      <div className="flex items-center justify-between mb-1">
        <CrateBadge name="Notify on Conditional Access Policy Changes" variant="compact" />
        <h2 className={`text-4xl font-bold ${t.textOnPage}`}>
          How It Works
        </h2>
      </div>

      {/* Main Flow - FILL THE PAGE */}
      <div className="flex-1 flex flex-col gap-1">

        {/* ═══ INPUT GUARDRAIL ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-xl px-6 py-4 flex-[3]">
          <div className="absolute -top-3 left-6 px-3 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wide">Input Guardrail</span>
            <span className="text-lg text-amber-400/60 ml-2">deterministic</span>
          </div>

          <div className="h-full flex flex-col justify-between">
            {/* TRIGGER */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-emerald-400 w-14 text-right">1</span>
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-5 py-3 flex items-center justify-between">
                <span className="text-3xl font-bold text-emerald-400">TRIGGER</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-lg">
                    <Clock className="w-7 h-7 text-slate-400" />
                    <span className="text-2xl text-slate-300">Schedule</span>
                  </div>
                  <span className="text-3xl text-slate-600">/</span>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                    <img src="/images/microsoft-logo.svg" alt="Microsoft" className="w-7 h-7" />
                    <span className="text-2xl text-emerald-300 font-semibold">Graph Webhook</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FETCH + COMPARE */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-amber-400 w-14 text-right">2-3</span>
              <div className="flex-1 bg-amber-500/10 border border-amber-500/40 rounded-lg px-5 py-3 flex items-center gap-6">
                <Database className="w-10 h-10 text-amber-400" />
                <span className="text-3xl font-bold text-amber-400">FETCH + COMPARE</span>
                <div className="flex items-center gap-3 ml-auto">
                  <Calculator className="w-8 h-8 text-amber-400" />
                  <span className="font-mono text-2xl text-emerald-400">added = current − baseline</span>
                  <span className="text-slate-600 mx-2 text-2xl">|</span>
                  <span className="font-mono text-2xl text-red-400">removed = baseline − current</span>
                </div>
              </div>
            </div>

            {/* TRANSLATE */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-slate-500 w-14 text-right">4</span>
              <div className="flex-1 bg-slate-700/30 border border-slate-600/40 rounded-lg px-5 py-3 flex items-center gap-6">
                <span className="text-3xl font-bold text-slate-300">TRANSLATE</span>
                <span className="text-2xl text-slate-500">GUIDs → names</span>
                <div className="flex items-center gap-3 ml-auto text-2xl">
                  <code className="text-slate-600">a1b2c3d4-...</code>
                  <span className="text-slate-600">→</span>
                  <span className="text-amber-400">it-manager@contoso.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-1">
          <ArrowDown className="w-5 h-5 text-slate-600" />
        </div>

        {/* ═══ AI LAYER ═══ */}
        <div className="relative border-2 border-dashed border-purple-500/50 rounded-xl px-6 py-4 flex-1">
          <div className="absolute -top-3 left-6 px-3 bg-slate-900">
            <span className="text-lg font-bold text-purple-400 uppercase tracking-wide">AI Layer</span>
            <span className="text-lg text-purple-400/60 ml-2">probabilistic</span>
          </div>

          <div className="h-full flex items-center gap-3">
            <span className="text-3xl font-black text-purple-400 w-14 text-right">5</span>
            <div className="flex-1 bg-purple-500/10 border border-purple-500/40 rounded-lg px-5 py-3 h-full flex items-center">
              <Brain className="w-12 h-12 text-purple-400 mr-6" />
              <span className="text-3xl font-bold text-purple-400">AI ANALYSIS</span>
              <span className="text-2xl text-slate-400 ml-6">Explain security impact</span>
              <span className="text-2xl text-purple-300 ml-auto italic">
                "This change allows legacy auth, bypassing MFA..."
              </span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center -my-1">
          <ArrowDown className="w-5 h-5 text-slate-600" />
        </div>

        {/* ═══ OUTPUT GUARDRAIL ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-xl px-6 py-4 flex-1">
          <div className="absolute -top-3 left-6 px-3 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wide">Output Guardrail</span>
            <span className="text-lg text-amber-400/60 ml-2">deterministic</span>
          </div>

          <div className="h-full flex items-center gap-3">
            <span className="text-3xl font-black text-red-400 w-14 text-right">6-7</span>
            <div className="flex-1 flex gap-4 h-full">
              {/* Notify */}
              <div className="flex-1 bg-red-500/10 border border-red-500/40 rounded-lg px-5 py-3 flex items-center gap-5">
                <Bell className="w-12 h-12 text-red-400" />
                <div>
                  <div className="text-3xl font-bold text-red-400">NOTIFY</div>
                  <div className="text-2xl text-slate-400">PSA ticket + email</div>
                </div>
              </div>
              {/* Update baseline */}
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-5 py-3 flex items-center gap-5">
                <RefreshCw className="w-12 h-12 text-emerald-400" />
                <div>
                  <div className="text-3xl font-bold text-emerald-400">UPDATE BASELINE</div>
                  <div className="text-2xl text-slate-400">Save state for next check</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
