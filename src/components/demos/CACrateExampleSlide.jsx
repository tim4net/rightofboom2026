import React from 'react';
import { AlertTriangle, ArrowRight, Shield, ShieldOff } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Example Slide
 *
 * Shows a concrete, realistic example of what the crate catches.
 * "Block Legacy Auth set to Report-Only" is a common and dangerous drift.
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-5xl md:text-6xl font-black ${t.textOnPage}`}>
          What It <span className="text-red-400">Catches</span>
        </h2>
      </div>

      {/* Main Alert Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Alert Header */}
          <div className="bg-red-500/20 border-2 border-red-500/60 rounded-t-2xl px-8 py-5 flex items-center gap-4">
            <AlertTriangle className="w-10 h-10 text-red-400" />
            <div>
              <div className="text-3xl font-bold text-red-400">
                CA POLICY MODIFIED
              </div>
              <div className="text-xl text-slate-300">
                Contoso Manufacturing • 42 minutes ago
              </div>
            </div>
          </div>

          {/* Policy Name */}
          <div className="bg-slate-800/80 border-x-2 border-slate-600/50 px-8 py-6">
            <div className="text-2xl text-slate-400 mb-2">Policy</div>
            <div className="text-4xl font-bold text-white">
              Block Legacy Authentication
            </div>
          </div>

          {/* Before/After Comparison */}
          <div className="flex">
            {/* Before */}
            <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 border-r-0 rounded-bl-2xl px-8 py-6">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-emerald-400" />
                <span className="text-2xl font-bold text-emerald-400">BEFORE</span>
              </div>
              <div className="text-3xl font-bold text-emerald-300">
                Enabled (Enforced)
              </div>
              <div className="text-xl text-emerald-400/70 mt-2">
                Legacy auth blocked for all users
              </div>
            </div>

            {/* Arrow */}
            <div className="flex items-center justify-center bg-slate-800 px-4 border-y-2 border-slate-600/50">
              <ArrowRight className="w-8 h-8 text-slate-500" />
            </div>

            {/* After */}
            <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 border-l-0 rounded-br-2xl px-8 py-6">
              <div className="flex items-center gap-3 mb-3">
                <ShieldOff className="w-8 h-8 text-red-400" />
                <span className="text-2xl font-bold text-red-400">AFTER</span>
              </div>
              <div className="text-3xl font-bold text-red-300">
                Report-Only
              </div>
              <div className="text-xl text-red-400/70 mt-2">
                Legacy auth ALLOWED (just logged)
              </div>
            </div>
          </div>

          {/* Changed By */}
          <div className="mt-4 bg-slate-800/60 border border-slate-600/50 rounded-xl px-8 py-4 flex justify-between items-center">
            <div>
              <span className="text-xl text-slate-400">Changed by: </span>
              <span className="text-xl text-amber-400 font-mono">IT-Admin (help-desk@contoso.com)</span>
            </div>
            <div className="text-lg text-slate-500">
              "Just testing something real quick"
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Warning */}
      <div className="mt-6 max-w-4xl mx-auto w-full">
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-4 text-center">
          <div className="text-2xl text-amber-400">
            This exact drift has been involved in <span className="font-bold">multiple M365 breaches</span>.
          </div>
          <div className="text-xl text-slate-400 mt-1">
            Legacy auth bypass enables password spray attacks that MFA would have stopped.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
