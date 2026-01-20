import React from 'react';
import { Database, GitCompare, Sparkles, Bell, ArrowRight, Clock, Webhook } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 *
 * Shows the guardrail sandwich in action with readable text at 30+ feet
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-8 py-6">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-5xl font-black ${t.textOnPage} mb-1`}>
          Conditional Access <span className="text-amber-400">Monitor</span>
        </h2>
        <p className="text-2xl text-slate-400">
          The guardrail sandwich in action
        </p>
      </div>

      {/* The Flow: 4-step horizontal process */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-4 w-full max-w-[95%]">

          {/* Step 1: INPUT GUARD - Baseline */}
          <div className="flex-1 flex flex-col">
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold text-amber-400">INPUT GUARD</span>
              </div>
              <div className="text-xl text-slate-300 mb-4">
                Stored baseline snapshot
              </div>
              <div className="bg-black/40 rounded-lg p-4 flex-1">
                <div className="text-xl text-amber-300 font-mono">12 policies</div>
                <div className="text-lg text-slate-400 mt-2">Last checked: Jan 15</div>
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <div className="text-lg text-slate-400">"Block Legacy Auth"</div>
                  <div className="text-xl text-emerald-400 font-semibold">Enabled</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-lg text-amber-400 font-semibold">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-1">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 2: COMPARE */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800/60 border-2 border-slate-600/50 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <GitCompare className="w-8 h-8 text-slate-300" />
                <span className="text-2xl font-bold text-slate-200">COMPARE</span>
              </div>
              <div className="text-xl text-slate-400 mb-4">
                Math-based diff
              </div>
              <div className="bg-black/40 rounded-lg p-4 flex-1 font-mono">
                <div className="text-lg text-slate-500">current − baseline =</div>
                <div className="mt-3 space-y-1">
                  <div className="text-xl text-emerald-400">+ added: 0</div>
                  <div className="text-xl text-red-400">− removed: 0</div>
                  <div className="text-xl text-amber-400">~ modified: 1</div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 text-lg text-slate-400">
                  "Block Legacy Auth" changed
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-lg text-amber-400 font-semibold">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-1">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 3: AI Layer */}
          <div className="flex-1 flex flex-col">
            <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">AI</span>
              </div>
              <div className="text-xl text-slate-400 mb-4">
                Translate + analyze
              </div>
              <div className="bg-black/40 rounded-lg p-4 flex-1">
                <div className="text-lg text-slate-500">GUID → Name</div>
                <div className="text-xl text-purple-300 font-mono mt-1">
                  a93f2b4e... → <span className="text-emerald-400">"Finance Team"</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-700">
                  <div className="text-lg text-slate-500">Security Impact</div>
                  <div className="text-2xl text-red-400 font-bold mt-1">↓ LESS SECURE</div>
                  <div className="text-lg text-slate-400">Legacy auth now allowed</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-lg text-purple-400 font-semibold">
              Probabilistic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-1">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 4: OUTPUT GUARD */}
          <div className="flex-1 flex flex-col">
            <div className="bg-red-500/10 border-2 border-red-500/40 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-8 h-8 text-red-400" />
                <span className="text-2xl font-bold text-red-400">OUTPUT GUARD</span>
              </div>
              <div className="text-xl text-slate-400 mb-4">
                PSA ticket + email
              </div>
              <div className="bg-black/40 rounded-lg p-4 flex-1 border border-red-500/30">
                <div className="text-xl text-red-300 font-bold">CA POLICY CHANGED</div>
                <div className="text-lg text-slate-300 mt-2">"Block Legacy Auth"</div>
                <div className="text-xl text-slate-300 mt-1">
                  Enabled → <span className="text-amber-400 font-semibold">Report-Only</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 text-lg text-slate-500">
                  Changed by: IT-Admin
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-lg text-emerald-400 font-semibold">
              Actionable
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Key Insight + Triggers */}
      <div className="mt-4 flex gap-6 w-full max-w-[95%] mx-auto">
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4">
          <div className="text-2xl font-bold text-emerald-400">
            AI summarizes. Math decides.
          </div>
          <div className="text-xl text-slate-400">
            Deterministic detection wrapped in readable, analyzed output.
          </div>
        </div>

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
