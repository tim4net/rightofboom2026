import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 * Clean horizontal flow, no clutter
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-2">
          REWST CRATE
        </div>
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          Conditional Access <span className="text-amber-400">Monitor</span>
        </h2>
      </div>

      {/* Horizontal Flow */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-6 max-w-7xl w-full">

          {/* INPUT GUARD */}
          <div className="flex-1 bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-6">
            <div className="text-2xl font-bold text-amber-400 mb-4">INPUT GUARD</div>
            <div className="text-xl text-slate-300 mb-6">Stored baseline</div>
            <div className="space-y-3">
              <div className="text-xl text-slate-400">12 CA Policies</div>
              <div className="text-xl text-slate-300">"Block Legacy Auth"</div>
              <div className="text-2xl text-emerald-400 font-bold">Enabled</div>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-500/30 text-lg text-amber-400">
              Deterministic
            </div>
          </div>

          <div className="flex items-center">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* COMPARE */}
          <div className="flex-1 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl p-6">
            <div className="text-2xl font-bold text-slate-200 mb-4">COMPARE</div>
            <div className="text-xl text-slate-400 mb-6">Math-based diff</div>
            <div className="space-y-3 font-mono">
              <div className="text-xl text-slate-500">current − baseline</div>
              <div className="text-2xl text-amber-400 font-bold">~ modified: 1</div>
              <div className="text-xl text-slate-400">"Block Legacy Auth"</div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-600/50 text-lg text-amber-400">
              Deterministic
            </div>
          </div>

          <div className="flex items-center">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* AI */}
          <div className="flex-1 bg-purple-500/10 border-2 border-purple-500/40 rounded-2xl p-6">
            <div className="text-2xl font-bold text-purple-400 mb-4">AI</div>
            <div className="text-xl text-slate-400 mb-6">Translate + analyze</div>
            <div className="space-y-3">
              <div className="text-xl text-purple-300 font-mono">
                a93f2... → <span className="text-emerald-400">"Finance Team"</span>
              </div>
              <div className="text-xl text-slate-400 mt-4">Security impact:</div>
              <div className="text-3xl text-red-400 font-black">↓ LESS SECURE</div>
            </div>
            <div className="mt-6 pt-4 border-t border-purple-500/30 text-lg text-purple-400">
              Probabilistic
            </div>
          </div>

          <div className="flex items-center">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* OUTPUT GUARD */}
          <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-6">
            <div className="text-2xl font-bold text-red-400 mb-4">OUTPUT GUARD</div>
            <div className="text-xl text-slate-400 mb-6">PSA ticket + email</div>
            <div className="space-y-3">
              <div className="text-xl text-red-300 font-bold">CA POLICY ALERT</div>
              <div className="text-xl text-slate-300">"Block Legacy Auth"</div>
              <div className="text-2xl">
                <span className="text-emerald-400">Enabled</span>
                <span className="text-slate-500 mx-2">→</span>
                <span className="text-red-400 font-bold">Report-Only</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-red-500/30 text-lg text-emerald-400">
              Actionable
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-10 py-5">
          <div className="text-3xl font-bold text-emerald-400">
            AI summarizes. Math decides.
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
