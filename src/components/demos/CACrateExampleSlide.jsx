import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Example Slide
 * Clean before/after comparison
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-2">
          REWST CRATE
        </div>
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          What It <span className="text-red-400">Catches</span>
        </h2>
      </div>

      {/* Main Content - Side by Side */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-8 max-w-5xl w-full">

          {/* BEFORE */}
          <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-8">
            <div className="text-2xl font-bold text-emerald-400 mb-6">BEFORE</div>

            <div className="text-xl text-slate-400 mb-2">Policy</div>
            <div className="text-2xl text-white font-bold mb-8">
              Block Legacy Authentication
            </div>

            <div className="text-xl text-slate-400 mb-2">State</div>
            <div className="text-4xl text-emerald-400 font-black">ENABLED</div>

            <div className="mt-8 pt-6 border-t border-emerald-500/30">
              <div className="text-xl text-emerald-400/80">
                Legacy auth blocked for all users
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-12 h-12 text-slate-600" />
          </div>

          {/* AFTER */}
          <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-8">
            <div className="text-2xl font-bold text-red-400 mb-6">AFTER</div>

            <div className="text-xl text-slate-400 mb-2">Policy</div>
            <div className="text-2xl text-white font-bold mb-8">
              Block Legacy Authentication
            </div>

            <div className="text-xl text-slate-400 mb-2">State</div>
            <div className="text-4xl text-red-400 font-black">REPORT-ONLY</div>

            <div className="mt-8 pt-6 border-t border-red-500/30">
              <div className="text-xl text-red-400/80">
                Legacy auth <span className="font-bold text-red-400">ALLOWED</span> (just logged)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Who and Why */}
      <div className="mt-8 flex gap-6 max-w-5xl mx-auto w-full">
        <div className="flex-1 bg-slate-800/60 border border-slate-600/50 rounded-xl px-6 py-4">
          <div className="text-lg text-slate-400">Changed by</div>
          <div className="text-xl text-amber-400 font-mono">
            IT-Admin (help-desk@contoso.com)
          </div>
        </div>

        <div className="flex-1 bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-4">
          <div className="text-xl text-amber-400">
            Password spray attacks now bypass MFA
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
