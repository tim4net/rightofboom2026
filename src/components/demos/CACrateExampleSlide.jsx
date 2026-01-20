import React from 'react';
import { AlertTriangle, ArrowRight, Shield, ShieldOff, XCircle } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Example Slide
 *
 * Shows a concrete, realistic example of what the crate catches.
 * Redesigned with a dramatic before/after that fills the slide.
 * Visually congruent with the architecture slide.
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header - Matches architecture slide */}
      <div className="text-center mb-6">
        <div className="text-xl text-amber-400 font-semibold tracking-wider mb-1">
          REWST CRATE
        </div>
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          What It <span className="text-red-400">Catches</span>
        </h2>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-500/20 border-2 border-red-500/60 rounded-2xl px-8 py-4 flex items-center justify-center gap-4 mb-6 max-w-4xl mx-auto w-full">
        <AlertTriangle className="w-10 h-10 text-red-400" />
        <div className="text-3xl font-black text-red-400">
          CA POLICY MODIFIED
        </div>
        <div className="text-xl text-slate-400 ml-4">
          Contoso Manufacturing
        </div>
      </div>

      {/* Main Content - 2 Column Before/After */}
      <div className="flex-1 grid grid-cols-2 gap-8 max-w-6xl mx-auto w-full">

        {/* BEFORE - Secure State */}
        <div className="bg-emerald-500/10 border-2 border-emerald-500/50 rounded-2xl p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Shield className="w-9 h-9 text-emerald-400" />
            </div>
            <div>
              <div className="text-lg text-emerald-400/70 font-medium">BASELINE</div>
              <div className="text-3xl font-black text-emerald-400">BEFORE</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 flex-1">
            <div className="text-xl text-slate-400 mb-2">Policy</div>
            <div className="text-2xl text-white font-bold mb-6">
              Block Legacy Authentication
            </div>

            <div className="border-t border-slate-700 pt-6">
              <div className="text-xl text-slate-400 mb-2">State</div>
              <div className="text-4xl font-black text-emerald-400">
                ENABLED
              </div>
              <div className="text-xl text-emerald-400/70 mt-3">
                Legacy auth blocked for all users
              </div>
            </div>
          </div>

          <div className="text-center mt-4 text-lg text-emerald-400 font-semibold tracking-wide">
            SECURE
          </div>
        </div>

        {/* AFTER - Insecure State */}
        <div className="bg-red-500/10 border-2 border-red-500/50 rounded-2xl p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center">
              <ShieldOff className="w-9 h-9 text-red-400" />
            </div>
            <div>
              <div className="text-lg text-red-400/70 font-medium">DETECTED</div>
              <div className="text-3xl font-black text-red-400">AFTER</div>
            </div>
          </div>

          <div className="bg-black/40 rounded-xl p-6 flex-1 border-2 border-red-500/40">
            <div className="text-xl text-slate-400 mb-2">Policy</div>
            <div className="text-2xl text-white font-bold mb-6">
              Block Legacy Authentication
            </div>

            <div className="border-t border-slate-700 pt-6">
              <div className="text-xl text-slate-400 mb-2">State</div>
              {/* THE BIG ACTION - Dramatic state change */}
              <div className="bg-red-500/20 border-2 border-red-500/60 rounded-xl p-4 mt-2">
                <div className="text-4xl font-black text-red-400">
                  REPORT-ONLY
                </div>
              </div>
              <div className="text-xl text-red-400/70 mt-4">
                Legacy auth <span className="font-bold text-red-400">ALLOWED</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-4 text-lg text-red-400 font-semibold tracking-wide">
            VULNERABLE
          </div>
        </div>
      </div>

      {/* Changed By + Impact */}
      <div className="mt-6 grid grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        {/* Who Changed It */}
        <div className="bg-slate-700/40 border-2 border-slate-500/50 rounded-xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg text-slate-400">Changed by</div>
              <div className="text-xl text-amber-400 font-mono font-bold">
                IT-Admin (help-desk@contoso.com)
              </div>
            </div>
            <div className="text-lg text-slate-500 italic">
              "Just testing something real quick"
            </div>
          </div>
        </div>

        {/* Why It Matters */}
        <div className="bg-amber-500/10 border-2 border-amber-500/50 rounded-xl px-6 py-4">
          <div className="flex items-center gap-3">
            <XCircle className="w-7 h-7 text-amber-400 flex-shrink-0" />
            <div className="text-xl text-amber-400">
              <span className="font-bold">Password spray attacks</span> now bypass MFA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
