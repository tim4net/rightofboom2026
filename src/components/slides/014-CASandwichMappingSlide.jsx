import React from 'react';
import { Clock, Calculator, Brain, Bell, Shield, Ticket } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Sandwich Mapping Slide - Restructured
 *
 * Shows how the CA Policy Monitor implements the guardrail sandwich:
 * - INPUT GUARDRAIL: Code determines what changed BEFORE AI sees it
 * - AI: Only explains, cannot change what was detected
 * - OUTPUT GUARDRAIL: Action happens regardless of AI opinion
 *
 * The trigger (cron/webhook) is just context, not a guardrail.
 */
export const CASandwichMappingSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <CrateBadge name="CA Policy Monitor" variant="compact" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          The Guardrail Sandwich
        </h2>
      </div>

      {/* Trigger - compact, just context */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className="text-xl text-slate-500">Triggered by:</span>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/60 rounded-lg">
          <Clock className="w-5 h-5 text-slate-400" />
          <span className="text-xl text-slate-400">Schedule</span>
        </div>
        <span className="text-xl text-slate-600">or</span>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/60 rounded-lg">
          <img src="/images/microsoft-logo.svg" alt="Microsoft" className="w-5 h-5" />
          <span className="text-xl text-slate-400">Webhook</span>
        </div>
      </div>

      {/* Main content - the actual sandwich */}
      <div className="flex-1 flex flex-col justify-center gap-3">

        {/* INPUT GUARDRAIL - Amber (Deterministic) */}
        <div className="bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <div className="w-44">
                <span className="text-2xl font-bold text-amber-400">INPUT GUARDRAIL</span>
              </div>
              <div className="h-12 w-px bg-amber-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-2xl text-amber-300 mb-2">Code determines what changed</div>
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
              <span className="text-xl text-amber-400/80">deterministic</span>
            </div>
          </div>
        </div>

        {/* AI LAYER - Purple (Probabilistic) */}
        <div className="bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-400" />
              <div className="w-44">
                <span className="text-2xl font-bold text-purple-400">AI</span>
              </div>
              <div className="h-12 w-px bg-purple-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-2xl text-purple-300 mb-2">Builds explanation from JSON</div>
              <div className="flex items-center gap-4">
                <div className="text-xl text-slate-300">
                  Translates IDs → names, describes security impact
                </div>
                <div className="px-3 py-1 bg-purple-500/20 rounded text-xl text-purple-400/70">
                  Builds summary and advice
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl text-purple-400/80">probabilistic</span>
            </div>
          </div>
        </div>

        {/* OUTPUT GUARDRAIL - Amber (Deterministic) */}
        <div className="bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-amber-400" />
              <div className="w-44">
                <span className="text-2xl font-bold text-amber-400">OUTPUT GUARDRAIL</span>
              </div>
              <div className="h-12 w-px bg-amber-500/50" />
            </div>
            <div className="flex-1">
              <div className="text-2xl text-amber-300 mb-2">Set up Human Response</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-lg">
                  <Ticket className="w-6 h-6 text-amber-400" />
                  <span className="text-xl text-amber-300">PSA ticket with AI explanation</span>
                </div>
                <div className="px-3 py-1 bg-red-500/20 rounded text-xl text-red-400/80">
                  Easy Approval or Remediation
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xl text-amber-400/80">deterministic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - The payoff */}
      <div className="mt-4 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-3xl text-slate-300">
            <span className="text-amber-400 font-semibold">Code detects.</span>
            {' '}
            <span className="text-purple-400 font-semibold">AI explains.</span>
            {' '}
            <span className="text-amber-400 font-semibold">You get notified.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CASandwichMappingSlide;
