import React from 'react';
import { ArrowRight, AlertTriangle } from 'lucide-react';

/**
 * What Ground Truth Catches - Example Slide
 *
 * Teaching point: Here's what this actually looks like. Math found the diff.
 * AI made it readable. You know WHO, WHEN, and WHETHER it was authorized.
 *
 * From speaker notes:
 * "No guessing. No 'the AI thinks someone changed something.'
 *  Math found the diff. AI just made it readable."
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Policy Name - the headline */}
      <div className="text-center mb-2">
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          Block Legacy Authentication
        </h2>
      </div>

      {/* Subtitle */}
      <div className="text-center mb-8">
        <p className="text-2xl text-slate-400">
          What the <span className="text-amber-400 font-semibold">math</span> found:
        </p>
      </div>

      {/* Side-by-side BEFORE/AFTER comparison */}
      <div className="flex-1 flex gap-6 items-stretch max-w-5xl mx-auto w-full">
        {/* BEFORE Card - emerald (good state) */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-emerald-500/60 p-8 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.2) 100%)'
            }}
          >
            <div className="text-3xl font-bold text-emerald-400 mb-6">BEFORE</div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl text-slate-400 mb-2">State:</div>
              <div className="text-4xl text-emerald-400 font-bold">
                Enabled
              </div>
              <div className="mt-6 pt-4 border-t-2 border-emerald-500/30">
                <div className="text-xl text-emerald-400/80">
                  Legacy auth blocked
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <ArrowRight className="w-12 h-12 text-slate-600" />
        </div>

        {/* AFTER Card - red (bad state) */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-red-500/60 p-8 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.2) 100%)'
            }}
          >
            <div className="text-3xl font-bold text-red-400 mb-6">AFTER</div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl text-slate-400 mb-2">State:</div>
              <div className="text-4xl text-red-400 font-bold">
                Report-Only
              </div>
              <div className="mt-6 pt-4 border-t-2 border-red-500/30">
                <div className="text-xl text-red-400">
                  Legacy auth <span className="font-bold">ALLOWED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation - purple */}
      <div className="mt-6 bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-5 max-w-5xl mx-auto w-full">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-7 h-7 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <span className="text-xl text-purple-200">
              "Legacy auth is now ALLOWED. Attackers look for this gap."
            </span>
          </div>
        </div>
      </div>

      {/* Attribution Footer - WHO and ticket status */}
      <div className="mt-5 flex justify-center gap-6">
        <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl px-6 py-4">
          <div className="text-lg text-slate-400">Changed by</div>
          <div className="text-xl text-amber-400 font-mono">it-manager@contoso.com</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-6 py-4">
          <div className="text-lg text-slate-400">Ticket</div>
          <div className="text-xl text-red-400 font-bold">⚠️ None found</div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
