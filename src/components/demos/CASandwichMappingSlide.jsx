import React from 'react';
import { Clock, Zap, Calculator, Brain, Bell, CheckCircle } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Sandwich Mapping Slide
 *
 * Shows how the CA Policy Monitor maps to the guardrail sandwich architecture.
 * Reinforces the INPUT → AI → OUTPUT pattern taught earlier.
 *
 * Photo test: Someone sees this and understands how the crate follows
 * the sandwich pattern - deterministic guards around probabilistic AI.
 */
export const CASandwichMappingSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <CrateBadge name="CA Policy Monitor" variant="compact" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          The Guardrail Sandwich
        </h2>
      </div>

      {/* Main content - vertical sandwich stack */}
      <div className="flex-1 flex flex-col justify-center gap-4">

        {/* INPUT LAYER - Emerald (Deterministic) */}
        <div className="bg-emerald-500/15 border-2 border-emerald-500/50 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 text-right">
                <span className="text-2xl font-bold text-emerald-400">INPUT</span>
              </div>
              <div className="h-12 w-px bg-emerald-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-xl text-emerald-400/80 mb-2">Deterministic Triggers</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 rounded-lg">
                  <Clock className="w-6 h-6 text-slate-400" />
                  <span className="text-xl text-slate-300">Every 42 minutes</span>
                </div>
                <span className="text-xl text-slate-500">or</span>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl text-emerald-300">Microsoft webhook (instant)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Detection - Amber (Still Deterministic!) */}
        <div className="bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 text-right">
                <span className="text-2xl font-bold text-amber-400">DETECT</span>
              </div>
              <div className="h-12 w-px bg-amber-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-xl text-amber-400/80 mb-2">Math Finds Changes (No AI)</div>
              <div className="flex items-center gap-4">
                <Calculator className="w-7 h-7 text-amber-400" />
                <div className="font-mono text-xl">
                  <span className="text-emerald-400">added</span>
                  <span className="text-slate-500"> = current − baseline</span>
                  <span className="text-slate-600 mx-4">|</span>
                  <span className="text-red-400">removed</span>
                  <span className="text-slate-500"> = baseline − current</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <CheckCircle className="w-8 h-8 text-amber-400" />
            </div>
          </div>
        </div>

        {/* AI LAYER - Purple (Probabilistic) */}
        <div className="bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 text-right">
                <span className="text-2xl font-bold text-purple-400">AI</span>
              </div>
              <div className="h-12 w-px bg-purple-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-xl text-purple-400/80 mb-2">Explains Only (Optional)</div>
              <div className="flex items-center gap-4">
                <Brain className="w-7 h-7 text-purple-400" />
                <div className="text-xl text-slate-300">
                  Translates GUIDs → names, describes security impact
                </div>
                <div className="px-3 py-1 bg-purple-500/20 rounded text-lg text-purple-400/70">
                  Cannot change what was detected
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg text-purple-400/60">probabilistic</span>
            </div>
          </div>
        </div>

        {/* OUTPUT LAYER - Emerald (Deterministic) */}
        <div className="bg-emerald-500/15 border-2 border-emerald-500/50 rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-32 text-right">
                <span className="text-2xl font-bold text-emerald-400">OUTPUT</span>
              </div>
              <div className="h-12 w-px bg-emerald-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-xl text-emerald-400/80 mb-2">Deterministic Actions</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg">
                  <Bell className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl text-emerald-300">PSA ticket created</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-lg">
                  <span className="text-xl text-emerald-300">Email sent</span>
                </div>
                <span className="text-xl text-slate-400">
                  AI cannot skip the alert
                </span>
              </div>
            </div>
            <div className="text-right">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - The payoff */}
      <div className="mt-6 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-3xl text-slate-300">
            <span className="text-emerald-400 font-semibold">Math detects.</span>
            {' '}
            <span className="text-purple-400 font-semibold">AI explains.</span>
            {' '}
            <span className="text-emerald-400 font-semibold">You get notified.</span>
            {' '}
            <span className="text-slate-500">Every time.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CASandwichMappingSlide;
