import React from 'react';
import { ArrowRight, AlertTriangle, Clock, Shield } from 'lucide-react';

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
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Policy Name with shield icon */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <Shield className="w-10 h-10 text-amber-400" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          Block Legacy Authentication
        </h2>
      </div>

      {/* Detection badges */}
      <div className="flex justify-center gap-4 mb-4">
        <div className="px-4 py-2 rounded-full bg-amber-500/30 border border-amber-500/50">
          <span className="text-xl text-amber-300 font-bold">~ Policy Changed</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/50">
          <Clock className="w-5 h-5 text-emerald-400" />
          <span className="text-xl text-emerald-300">Detected in <span className="font-bold">12 seconds</span></span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-center mb-4">
        <p className="text-2xl text-slate-400">
          What the <span className="text-amber-400 font-semibold">math</span> found:
        </p>
      </div>

      {/* Side-by-side BEFORE/AFTER comparison */}
      <div className="flex-1 flex gap-6 items-stretch max-w-5xl mx-auto w-full">
        {/* BEFORE Card - emerald (good state) */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-emerald-500/60 p-6 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.2) 100%)'
            }}
          >
            <div className="text-2xl font-bold text-emerald-400 mb-4">BEFORE</div>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xl text-slate-400">State:</span>
                <span className="text-2xl text-emerald-400 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl text-slate-400">Exclusions:</span>
                <span className="text-xl text-emerald-400 font-mono">None</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t-2 border-emerald-500/30">
              <div className="text-xl text-emerald-400/80">
                Legacy auth blocked for all users
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <ArrowRight className="w-10 h-10 text-slate-600" />
        </div>

        {/* AFTER Card - red (bad state) */}
        <div className="flex-1">
          <div
            className="h-full rounded-2xl border-4 border-red-500/60 p-6 flex flex-col"
            style={{
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.2) 100%)'
            }}
          >
            <div className="text-2xl font-bold text-red-400 mb-4">AFTER</div>
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xl text-slate-400">State:</span>
                <span className="text-2xl text-red-400 font-bold">Report-Only</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl text-slate-400">Exclusions:</span>
                <span className="text-xl text-red-400 font-mono">None</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t-2 border-red-500/30">
              <div className="text-xl text-red-400">
                Legacy auth <span className="font-bold">ALLOWED</span> — just logged
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Explanation - purple */}
      <div className="mt-4 bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-4 max-w-5xl mx-auto w-full">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-7 h-7 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <span className="text-xl font-bold text-purple-400">AI Analysis: </span>
            <span className="text-xl text-purple-200">
              "Report-Only allows legacy auth attacks. This drift has enabled real M365 breaches."
            </span>
          </div>
        </div>
      </div>

      {/* Attribution Footer - WHO and ticket status */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="bg-slate-800/60 border border-slate-600/50 rounded-xl px-5 py-3">
          <div className="text-lg text-slate-400">Changed by</div>
          <div className="text-xl text-amber-400 font-mono">it-manager@contoso.com</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-5 py-3">
          <div className="text-lg text-slate-400">Ticket Reference</div>
          <div className="text-xl text-red-400 font-bold">⚠️ No matching ticket</div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
