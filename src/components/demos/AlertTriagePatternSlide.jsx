import React from 'react';
import { AlertTriangle, Search, Brain, User, CheckCircle, ArrowDown } from 'lucide-react';

/**
 * Alert Triage Pattern Slide
 *
 * Shows HOW to build an AI-assisted alert triage system.
 * Not a fake demo - an architectural pattern you can implement.
 *
 * The sandwich applied to real-time security alerts:
 * INPUT: Alert arrives
 * GATHER: Deterministic context collection
 * AI: Synthesize and recommend
 * OUTPUT: Human approves before action
 */
export const AlertTriagePatternSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-6xl font-bold ${t.textOnPage} mb-3`}>
          Alert Triage Pattern
        </h2>
        <p className="text-2xl text-slate-400">
          The sandwich applied to real-time security alerts
        </p>
      </div>

      {/* Main flow - vertical */}
      <div className="flex-1 flex flex-col justify-center gap-3">

        {/* Step 1: INPUT - Alert arrives */}
        <div className="bg-red-500/15 border-2 border-red-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-28 text-right">
                <span className="text-2xl font-bold text-red-400">INPUT</span>
              </div>
              <div className="h-12 w-px bg-red-500/50" />
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-2xl font-semibold text-red-300">Alert Arrives</div>
              <div className="text-xl text-slate-400">
                From SIEM, EDR, or identity provider (Sentinel, Defender, Azure AD)
              </div>
            </div>
            <div className="text-right text-xl text-slate-500">
              Impossible travel, suspicious rule, brute force...
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-600" />
        </div>

        {/* Step 2: GATHER - Deterministic context */}
        <div className="bg-amber-500/15 border-2 border-amber-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-28 text-right">
                <span className="text-2xl font-bold text-amber-400">GATHER</span>
              </div>
              <div className="h-12 w-px bg-amber-500/50" />
            </div>
            <Search className="w-8 h-8 text-amber-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-2xl font-semibold text-amber-300">Collect Context (Deterministic)</div>
              <div className="text-xl text-slate-400">
                API calls to gather facts — no AI judgment yet
              </div>
            </div>
          </div>
          <div className="ml-36 mt-4 grid grid-cols-4 gap-3">
            <div className="px-3 py-2 bg-slate-800/60 rounded-lg text-center">
              <div className="text-lg text-amber-400">Calendar</div>
              <div className="text-sm text-slate-500">Travel events?</div>
            </div>
            <div className="px-3 py-2 bg-slate-800/60 rounded-lg text-center">
              <div className="text-lg text-amber-400">Recent Auth</div>
              <div className="text-sm text-slate-500">Last good login?</div>
            </div>
            <div className="px-3 py-2 bg-slate-800/60 rounded-lg text-center">
              <div className="text-lg text-amber-400">Device</div>
              <div className="text-sm text-slate-500">Registered?</div>
            </div>
            <div className="px-3 py-2 bg-slate-800/60 rounded-lg text-center">
              <div className="text-lg text-amber-400">MFA Status</div>
              <div className="text-sm text-slate-500">Verified?</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-600" />
        </div>

        {/* Step 3: AI - Synthesize and recommend */}
        <div className="bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-28 text-right">
                <span className="text-2xl font-bold text-purple-400">AI</span>
              </div>
              <div className="h-12 w-px bg-purple-500/50" />
            </div>
            <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-2xl font-semibold text-purple-300">Synthesize & Recommend</div>
              <div className="text-xl text-slate-400">
                AI reasons over gathered facts, outputs recommendation + confidence
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-center">
                <div className="text-lg text-purple-400">Reasoning Chain</div>
                <div className="text-sm text-slate-500">Shows its work</div>
              </div>
              <div className="px-4 py-2 bg-purple-500/20 rounded-lg text-center">
                <div className="text-lg text-purple-400">Confidence %</div>
                <div className="text-sm text-slate-500">How sure?</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-slate-600" />
        </div>

        {/* Step 4: OUTPUT - Human approval */}
        <div className="bg-emerald-500/15 border-2 border-emerald-500/50 rounded-2xl p-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-28 text-right">
                <span className="text-2xl font-bold text-emerald-400">OUTPUT</span>
              </div>
              <div className="h-12 w-px bg-emerald-500/50" />
            </div>
            <User className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-2xl font-semibold text-emerald-300">Human Approval Gate</div>
              <div className="text-xl text-slate-400">
                Analyst sees recommendation + reasoning, approves or overrides
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-emerald-500/30 border border-emerald-500/50 rounded-lg">
                <span className="text-xl text-emerald-300 font-semibold">✓ Approve</span>
              </div>
              <div className="px-4 py-2 bg-amber-500/30 border border-amber-500/50 rounded-lg">
                <span className="text-xl text-amber-300 font-semibold">Override</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-2xl text-slate-300">
            <span className="text-amber-400 font-semibold">Facts gathered.</span>
            {' '}
            <span className="text-purple-400 font-semibold">AI synthesizes.</span>
            {' '}
            <span className="text-emerald-400 font-semibold">Human decides.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertTriagePatternSlide;
