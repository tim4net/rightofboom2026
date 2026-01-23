import React from 'react';
import { ArrowDown, Clock, Database, Calculator, Brain, Bell, RefreshCw } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - How It Works (with Sandwich Mapping)
 *
 * Combined slide showing the technical flow AND how it maps to the guardrail sandwich.
 * Outline boxes group steps into INPUT (deterministic), AI (probabilistic), OUTPUT (deterministic).
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <CrateBadge name="Notify on Conditional Access Policy Changes" variant="compact" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          How It Works
        </h2>
      </div>

      {/* Main Flow with Sandwich Outline Boxes - boxes grow to fill */}
      <div className="flex-1 flex flex-col gap-2">

        {/* ═══ INPUT GUARDRAIL OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-2xl px-8 py-6 flex-[3]">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-xl font-bold text-amber-400 uppercase tracking-wide">Input Guardrail</span>
            <span className="text-xl text-amber-400/60 ml-3">deterministic</span>
          </div>

          <div className="h-full flex flex-col justify-between pt-1">
            {/* Row 1: TRIGGERS */}
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-2xl font-bold text-emerald-400">1</span>
              </div>
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-emerald-400">TRIGGER</div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg">
                      <Clock className="w-6 h-6 text-slate-400" />
                      <span className="text-xl text-slate-300">Schedule</span>
                    </div>
                    <span className="text-2xl text-slate-500 font-bold">/</span>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                      <img src="/images/microsoft-logo.svg" alt="Microsoft" className="w-6 h-6" />
                      <span className="text-xl text-emerald-300 font-semibold">MS Graph Webhook</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: FETCH + COMPARE */}
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-2xl font-bold text-amber-400">2-3</span>
              </div>
              <div className="flex-1 bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-4">
                <div className="flex items-center gap-6">
                  <Database className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div className="text-2xl font-bold text-amber-400">FETCH + COMPARE</div>
                  <div className="flex items-center gap-3 ml-auto">
                    <Calculator className="w-7 h-7 text-amber-400" />
                    <span className="font-mono text-xl text-emerald-400">added = current − baseline</span>
                    <span className="text-slate-600 mx-3">|</span>
                    <span className="font-mono text-xl text-red-400">removed = baseline − current</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: TRANSLATE */}
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-2xl font-bold text-slate-400">4</span>
              </div>
              <div className="flex-1 bg-slate-700/30 border border-slate-600/40 rounded-xl px-6 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-2xl font-bold text-slate-300">TRANSLATE</div>
                  <div className="text-xl text-slate-400">GUIDs → human names</div>
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="font-mono text-xl text-slate-500">a1b2c3d4-...</span>
                    <span className="text-xl text-slate-500">→</span>
                    <span className="text-xl text-amber-400">it-manager@contoso.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-500" />
        </div>

        {/* ═══ AI LAYER OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-purple-500/50 rounded-2xl px-8 py-5 flex-1">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-xl font-bold text-purple-400 uppercase tracking-wide">AI Layer</span>
            <span className="text-xl text-purple-400/60 ml-3">probabilistic</span>
          </div>

          <div className="h-full flex items-center gap-4 pt-1">
            <div className="w-16 text-right">
              <span className="text-2xl font-bold text-purple-400">5</span>
            </div>
            <div className="flex-1 bg-purple-500/10 border border-purple-500/40 rounded-xl px-6 py-4 h-full flex items-center">
              <div className="flex items-center gap-6 w-full">
                <Brain className="w-10 h-10 text-purple-400 flex-shrink-0" />
                <div className="text-2xl font-bold text-purple-400">AI ANALYSIS</div>
                <div className="text-xl text-slate-400">Explain security impact</div>
                <div className="text-xl text-purple-300 ml-auto max-w-lg italic">
                  "This change allows legacy auth, bypassing MFA..."
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-500" />
        </div>

        {/* ═══ OUTPUT GUARDRAIL OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-2xl px-8 py-5 flex-1">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-xl font-bold text-amber-400 uppercase tracking-wide">Output Guardrail</span>
            <span className="text-xl text-amber-400/60 ml-3">deterministic</span>
          </div>

          <div className="h-full flex items-center gap-4 pt-1">
            <div className="w-16 text-right">
              <span className="text-2xl font-bold text-red-400">6-7</span>
            </div>
            <div className="flex-1 flex gap-6 h-full">
              {/* Notify */}
              <div className="flex-1 bg-red-500/10 border border-red-500/40 rounded-xl px-6 py-4 flex items-center">
                <div className="flex items-center gap-5">
                  <Bell className="w-10 h-10 text-red-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-red-400">NOTIFY</div>
                    <div className="text-xl text-slate-400">PSA ticket + email</div>
                  </div>
                </div>
              </div>
              {/* Update baseline */}
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4 flex items-center">
                <div className="flex items-center gap-5">
                  <RefreshCw className="w-10 h-10 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">UPDATE BASELINE</div>
                    <div className="text-xl text-slate-400">Save state for next check</div>
                  </div>
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
