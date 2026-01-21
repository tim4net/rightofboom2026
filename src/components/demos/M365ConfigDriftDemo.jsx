import React from 'react';
import { ArrowDown, Clock, Zap } from 'lucide-react';

/**
 * Config Drift Detection - "Ground Truth in Action"
 *
 * Teaching point: Your baseline is your truth. Math detects changes. AI makes them readable.
 * Follows the vertical stack pattern from SandwichSlide (007)
 *
 * This is the FIRST DEMO of the ground truth principle from the Bridge slide.
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Title */}
      <div className="text-center mb-3">
        <h2 className={`text-6xl font-bold ${t.textOnPage}`}>
          Config Drift Detection
        </h2>
      </div>

      {/* Tagline - the flow */}
      <div className="text-center mb-6">
        <p className="text-3xl">
          <span className="text-emerald-400 font-semibold">Baseline</span>
          <span className="text-slate-500 mx-3">→</span>
          <span className="text-amber-400 font-semibold">Compare</span>
          <span className="text-slate-500 mx-3">→</span>
          <span className="text-purple-400 font-semibold">Explain</span>
          <span className="text-slate-500 mx-3">→</span>
          <span className="text-red-400 font-semibold">Alert</span>
        </p>
      </div>

      {/* Dual Triggers - how we catch changes */}
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

      {/* The Vertical Stack */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-3">

        {/* YOUR BASELINE - emerald (ground truth) */}
        <div className="w-full bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                YOUR BASELINE
              </div>
              <div className="text-xl text-slate-400">
                The config snapshot you stored — <span className="text-emerald-400">your ground truth</span>
              </div>
            </div>
            <div className="text-right text-lg text-slate-500">
              <div>CA policies • Intune configs</div>
              <div>Exchange settings • SharePoint</div>
            </div>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* MATH DIFF - amber (deterministic) */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">
                MATH DIFF
              </div>
              <div className="text-xl text-slate-400">
                Set difference — deterministic, no guessing
              </div>
            </div>
            <div className="flex gap-6 font-mono text-xl">
              <span className="text-emerald-400">+ added</span>
              <span className="text-red-400">− removed</span>
              <span className="text-amber-400">~ changed</span>
            </div>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* AI LAYER - purple (probabilistic) */}
        <div className="w-full bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                AI LAYER
              </div>
              <div className="text-xl text-slate-400">
                Translates GUIDs → names • Explains risk in plain language
              </div>
            </div>
            <div className="text-right text-lg text-slate-500">
              <div>"This policy now allows..."</div>
              <div>"Attackers exploit this by..."</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with landing line and scope */}
      <div className="mt-6 flex justify-center items-center gap-8">
        <p className="text-3xl text-slate-300">
          "<span className="text-purple-400 font-semibold">AI summarizes.</span>{' '}
          <span className="text-amber-400 font-semibold">Math decides.</span>"
        </p>
        <div className="text-xl text-slate-500">
          Runs across <span className="text-amber-400 font-semibold">all your tenants</span>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
