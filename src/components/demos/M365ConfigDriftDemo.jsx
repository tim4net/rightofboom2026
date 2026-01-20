import React from 'react';
import { Database, GitCompare, Sparkles, Bell, ArrowRight, Clock, Webhook } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 *
 * Shows the guardrail sandwich in action:
 * - INPUT GUARD: Baseline validation
 * - DETERMINISTIC: Math-based comparison
 * - AI: Summarize + translate GUIDs
 * - OUTPUT GUARD: Structured alert
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-6">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-lg text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-4xl md:text-5xl font-black ${t.textOnPage} mb-1`}>
          Conditional Access <span className="text-amber-400">Monitor</span>
        </h2>
        <p className="text-xl text-slate-400">
          The guardrail sandwich in action
        </p>
      </div>

      {/* The Flow: 4-step horizontal process with rich content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-3 max-w-7xl w-full">

          {/* Step 1: INPUT GUARD - Baseline */}
          <div className="flex-1 flex flex-col">
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-6 h-6 text-amber-400" />
                <span className="text-xl font-bold text-amber-400">INPUT GUARD</span>
              </div>
              <div className="text-lg text-slate-300 mb-3">
                Stored baseline snapshot
              </div>
              {/* Example data */}
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm flex-1">
                <div className="text-amber-300">policies: 12</div>
                <div className="text-amber-300">last_check: Jan 15</div>
                <div className="text-slate-500 mt-2 text-xs">
                  "Block Legacy Auth"
                </div>
                <div className="text-slate-500 text-xs">
                  state: <span className="text-emerald-400">Enabled</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-base text-amber-400 font-medium">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 text-slate-600" />
          </div>

          {/* Step 2: COMPARE - Deterministic diff */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800/60 border-2 border-slate-600/50 rounded-xl p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <GitCompare className="w-6 h-6 text-slate-300" />
                <span className="text-xl font-bold text-slate-200">COMPARE</span>
              </div>
              <div className="text-lg text-slate-400 mb-3">
                Math-based diff
              </div>
              {/* Diff output */}
              <div className="bg-black/40 rounded-lg p-3 font-mono text-sm flex-1">
                <div className="text-slate-500">current - baseline =</div>
                <div className="text-emerald-400 mt-1">+ added: 0</div>
                <div className="text-red-400">- removed: 0</div>
                <div className="text-amber-400">~ modified: 1</div>
                <div className="text-slate-500 text-xs mt-2">
                  "Block Legacy Auth" changed
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-base text-amber-400 font-medium">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 text-slate-600" />
          </div>

          {/* Step 3: AI Layer */}
          <div className="flex-1 flex flex-col">
            <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-purple-400">AI</span>
              </div>
              <div className="text-lg text-slate-400 mb-3">
                Summarize + translate
              </div>
              {/* GUID to human translation */}
              <div className="bg-black/40 rounded-lg p-3 text-sm flex-1">
                <div className="text-slate-500 text-xs mb-2">GUID → Name</div>
                <div className="font-mono">
                  <div className="text-slate-500 text-xs truncate">a93f2b4e-8c7d...</div>
                  <div className="text-purple-300">↓</div>
                  <div className="text-emerald-400">"Finance Team"</div>
                </div>
                <div className="text-slate-500 text-xs mt-2">
                  Readable summary
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-base text-purple-400 font-medium">
              Probabilistic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 text-slate-600" />
          </div>

          {/* Step 4: OUTPUT GUARD - Alert */}
          <div className="flex-1 flex flex-col">
            <div className="bg-red-500/10 border-2 border-red-500/40 rounded-xl p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-6 h-6 text-red-400" />
                <span className="text-xl font-bold text-red-400">OUTPUT GUARD</span>
              </div>
              <div className="text-lg text-slate-400 mb-3">
                PSA ticket + email
              </div>
              {/* Alert preview */}
              <div className="bg-black/40 rounded-lg p-3 text-sm flex-1 border border-red-500/30">
                <div className="text-red-300 font-semibold text-xs">CA POLICY CHANGED</div>
                <div className="text-slate-300 text-xs mt-1">
                  "Block Legacy Auth"
                </div>
                <div className="text-slate-300 text-xs">
                  → <span className="text-amber-400">Report-Only</span>
                </div>
                <div className="text-slate-500 text-xs mt-2">
                  by: IT-Admin
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-base text-emerald-400 font-medium">
              Actionable
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Key Insight + Triggers */}
      <div className="mt-4 flex gap-4 max-w-7xl mx-auto w-full">
        {/* Key Insight */}
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-5 py-3">
          <div className="text-xl font-bold text-emerald-400">
            AI summarizes. Math decides.
          </div>
          <div className="text-lg text-slate-400">
            Deterministic detection wrapped in readable output.
          </div>
        </div>

        {/* Dual Triggers */}
        <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl px-5 py-3">
          <div className="text-lg font-semibold text-slate-300 mb-1">Triggers</div>
          <div className="flex gap-4 text-base">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">Every 42 min</span>
            </div>
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300">MS audit log</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
