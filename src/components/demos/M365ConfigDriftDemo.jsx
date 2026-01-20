import React from 'react';
import { Database, GitCompare, Sparkles, Bell, ArrowDown, AlertTriangle } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 *
 * Shows the guardrail sandwich in action with a VERTICAL flow for better spacing.
 * Designed for 30+ foot readability with dramatic action highlighting.
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header - Compact */}
      <div className="text-center mb-6">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          Conditional Access <span className="text-amber-400">Monitor</span>
        </h2>
      </div>

      {/* The Flow: 2x2 Grid Layout for better spacing */}
      <div className="flex-1 grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full">

        {/* Step 1: INPUT GUARD */}
        <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Database className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="text-lg text-amber-400/70 font-medium">STEP 1</div>
              <div className="text-2xl font-black text-amber-400">INPUT GUARD</div>
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-5 flex-1">
            <div className="text-xl text-slate-400 mb-2">Stored Baseline</div>
            <div className="text-2xl text-amber-300 font-mono font-bold">12 CA Policies</div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-xl text-slate-300">"Block Legacy Auth"</div>
              <div className="text-2xl text-emerald-400 font-bold mt-1">Enabled</div>
            </div>
          </div>
          <div className="text-center mt-3 text-lg text-amber-400 font-semibold tracking-wide">
            DETERMINISTIC
          </div>
        </div>

        {/* Step 2: COMPARE */}
        <div className="bg-slate-700/40 border-2 border-slate-500/50 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-600/40 flex items-center justify-center">
              <GitCompare className="w-7 h-7 text-slate-300" />
            </div>
            <div>
              <div className="text-lg text-slate-400 font-medium">STEP 2</div>
              <div className="text-2xl font-black text-slate-200">COMPARE</div>
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-5 flex-1 font-mono">
            <div className="text-xl text-slate-400">current - baseline =</div>
            <div className="mt-3 space-y-2">
              <div className="text-2xl text-amber-400 font-bold">~ modified: 1</div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-xl text-slate-300">"Block Legacy Auth"</div>
              <div className="text-xl text-amber-400 mt-1">state changed</div>
            </div>
          </div>
          <div className="text-center mt-3 text-lg text-amber-400 font-semibold tracking-wide">
            DETERMINISTIC
          </div>
        </div>

        {/* Step 3: AI Layer */}
        <div className="bg-purple-500/10 border-2 border-purple-500/50 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-purple-400" />
            </div>
            <div>
              <div className="text-lg text-purple-400/70 font-medium">STEP 3</div>
              <div className="text-2xl font-black text-purple-400">AI ANALYSIS</div>
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-5 flex-1">
            <div className="text-xl text-slate-400 mb-2">GUID Translation</div>
            <div className="text-xl text-purple-300 font-mono">
              a93f2b4e... <span className="text-slate-500">→</span> <span className="text-emerald-400">"Finance Team"</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-xl text-slate-400 mb-2">Security Impact</div>
              {/* THE BIG ACTION - Make it POP */}
              <div className="bg-red-500/20 border-2 border-red-500/60 rounded-xl p-3 mt-2">
                <div className="flex items-center justify-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                  <span className="text-3xl font-black text-red-400">LESS SECURE</span>
                  <ArrowDown className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-lg text-purple-400 font-semibold tracking-wide">
            PROBABILISTIC
          </div>
        </div>

        {/* Step 4: OUTPUT GUARD */}
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Bell className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <div className="text-lg text-red-400/70 font-medium">STEP 4</div>
              <div className="text-2xl font-black text-red-400">OUTPUT GUARD</div>
            </div>
          </div>
          <div className="bg-black/40 rounded-xl p-5 flex-1 border-2 border-red-500/40">
            <div className="text-2xl text-red-300 font-bold mb-3">CA POLICY ALERT</div>
            <div className="text-xl text-slate-300">"Block Legacy Auth"</div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              {/* State Change - Dramatic */}
              <div className="flex items-center gap-3 text-2xl">
                <span className="text-emerald-400 font-bold">Enabled</span>
                <span className="text-slate-500">→</span>
                <span className="text-red-400 font-bold">Report-Only</span>
              </div>
              <div className="text-lg text-slate-500 mt-2">
                PSA ticket + email sent
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-lg text-emerald-400 font-semibold tracking-wide">
            ACTIONABLE
          </div>
        </div>
      </div>

      {/* Bottom: Key Insight */}
      <div className="mt-6 max-w-4xl mx-auto w-full">
        <div className="bg-emerald-500/10 border-2 border-emerald-500/50 rounded-xl px-8 py-4 text-center">
          <div className="text-3xl font-black text-emerald-400">
            AI summarizes. Math decides.
          </div>
          <div className="text-xl text-slate-400 mt-1">
            Deterministic detection wrapped in readable, analyzed output.
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
