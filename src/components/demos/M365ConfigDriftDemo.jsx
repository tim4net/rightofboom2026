import React from 'react';
import { Database, GitCompare, Sparkles, Bell, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Conditional Access Policy Monitoring - Demo Slide 10
 *
 * Teaching point: "AI validates against YOUR truth, not its own judgment"
 * Format: Static explainer with real output example
 * Visual: Left-to-right flow showing baseline -> comparison -> alert
 *
 * Key insight: GPT-4 summarizes. Math decides.
 * Concrete win: GUID-to-name resolution makes output human-readable
 *
 * This is NOT an interactive demo - it's a clean visual explanation
 * of how deterministic change detection works with optional AI enhancement.
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-6xl font-black ${t.textOnPage} mb-2`}>
          Conditional Access <span className="text-amber-400">Monitoring</span>
        </h2>
        <p className="text-2xl md:text-3xl text-slate-400">
          Your baseline. Your rules. <span className="text-purple-400">AI makes it readable.</span>
        </p>
      </div>

      {/* The Flow: 4-step horizontal process */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-3 max-w-7xl w-full">

          {/* Step 1: Baseline (Stored Truth) */}
          <div className="flex-1 flex flex-col">
            <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold text-amber-400">BASELINE</span>
              </div>
              <div className="text-xl text-slate-300 mb-3">
                Your stored configuration snapshot
              </div>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-lg text-amber-300/90 flex-1">
                <div className="text-slate-500 text-base mb-1">// Rewst template</div>
                <div>last_checked: "Jan 15"</div>
                <div>policies: 12</div>
                <div className="text-slate-500 mt-2 text-base">known_state: true</div>
              </div>
            </div>
            <div className="text-center mt-2 text-xl text-amber-400 font-semibold">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 2: Live Query */}
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800/60 border-2 border-slate-600/50 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <GitCompare className="w-8 h-8 text-slate-300" />
                <span className="text-2xl font-bold text-slate-200">COMPARE</span>
              </div>
              <div className="text-xl text-slate-400 mb-3">
                Math-based change detection
              </div>
              <div className="bg-black/40 rounded-lg p-3 font-mono text-lg flex-1 space-y-2">
                <div className="text-emerald-400">+ policy_added: 1</div>
                <div className="text-red-400">- policy_removed: 0</div>
                <div className="text-amber-400">~ policy_modified: 1</div>
                <div className="text-slate-500 text-base mt-2">if modifiedDateTime {'>'} last</div>
              </div>
            </div>
            <div className="text-center mt-2 text-xl text-amber-400 font-semibold">
              Deterministic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 3: AI Layer (Optional) */}
          <div className="flex-1 flex flex-col">
            <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-5 flex-1 flex flex-col relative">
              {/* Optional badge */}
              <div className="absolute -top-3 right-4 bg-purple-600 text-white text-base font-bold px-3 py-1 rounded-full">
                OPTIONAL
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-8 h-8 text-purple-400" />
                <span className="text-2xl font-bold text-purple-400">AI LAYER</span>
              </div>
              <div className="text-xl text-slate-400 mb-3">
                Summarize + GUID resolution
              </div>
              <div className="bg-black/40 rounded-lg p-3 text-lg flex-1">
                <div className="text-purple-300 mb-2">Translates:</div>
                <div className="font-mono text-base">
                  <span className="text-slate-500">a93f2...</span>
                  <span className="text-slate-400 mx-2">to</span>
                  <span className="text-emerald-400">"Finance Team"</span>
                </div>
                <div className="text-slate-500 text-base mt-3">
                  Formats only. Never decides.
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-xl text-purple-400 font-semibold">
              Probabilistic
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* Step 4: Alert Output */}
          <div className="flex-1 flex flex-col">
            <div className="bg-red-500/10 border-2 border-red-500/40 rounded-xl p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Bell className="w-8 h-8 text-red-400" />
                <span className="text-2xl font-bold text-red-400">ALERT</span>
              </div>
              <div className="text-xl text-slate-400 mb-3">
                PSA ticket + email
              </div>
              <div className="bg-black/40 rounded-lg p-3 text-lg flex-1">
                <div className="text-red-300 font-semibold mb-1">CA Policy Changed</div>
                <div className="text-slate-300 text-base">
                  "Block Legacy Auth" set to <span className="text-amber-400">Report-Only</span>
                </div>
                <div className="text-slate-500 text-base mt-2">
                  Changed by: IT-Admin
                </div>
                <div className="text-slate-500 text-base">
                  42 min ago
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-xl text-emerald-400 font-semibold">
              Actionable
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: The Key Insight + Dual Triggers */}
      <div className="mt-6 flex gap-6 max-w-7xl mx-auto w-full">
        {/* Key Insight Card */}
        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-2xl font-bold text-emerald-400">
                GPT-4 summarizes. Math decides.
              </div>
              <div className="text-xl text-slate-400">
                Change detection is deterministic. AI just makes the output human-readable.
              </div>
            </div>
          </div>
        </div>

        {/* Dual Triggers */}
        <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl px-6 py-4">
          <div className="text-xl font-semibold text-slate-300 mb-2">Dual Triggers</div>
          <div className="flex gap-4 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">Cron</span>
              <span className="text-slate-500">every 42 min</span>
            </div>
            <div className="text-slate-600">|</div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400">Webhook</span>
              <span className="text-slate-500">MS audit log</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
