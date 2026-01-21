import React from 'react';
import { ArrowDown } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col px-16 py-12">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className={`text-6xl font-bold ${t.textOnPage}`}>
          Config Drift Detection
        </h2>
      </div>

      {/* Tagline - the flow */}
      <div className="text-center mb-10">
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

      {/* The Vertical Stack */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-3">

        {/* YOUR BASELINE - emerald (ground truth) */}
        <div className="w-full bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              YOUR BASELINE
            </div>
            <div className="text-2xl text-slate-400">
              The config snapshot you stored — <span className="text-emerald-400">your ground truth</span>
            </div>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* MATH DIFF - amber (deterministic) */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              MATH DIFF
            </div>
            <div className="text-2xl text-slate-400">
              Set difference — deterministic, no guessing
            </div>
            <div className="flex justify-center gap-8 mt-3 font-mono text-2xl">
              <span className="text-emerald-400">+ added</span>
              <span className="text-red-400">− removed</span>
              <span className="text-amber-400">~ changed</span>
            </div>
          </div>
        </div>

        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* AI LAYER - purple (probabilistic) */}
        <div className="w-full bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              AI LAYER
            </div>
            <div className="text-2xl text-slate-400">
              Translates GUIDs to names • Explains the risk in plain language
            </div>
          </div>
        </div>
      </div>

      {/* Landing Line */}
      <div className="text-center mt-8">
        <p className="text-3xl text-slate-300">
          "<span className="text-purple-400 font-semibold">AI summarizes.</span>{' '}
          <span className="text-amber-400 font-semibold">Math decides.</span>"
        </p>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
