import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * CA Policy Monitor - Lead with the Example
 *
 * Photo test: Someone sees this and immediately gets it.
 * The before/after tells the story. Attribution raises the question.
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Rewst Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-16 w-auto"
        />
      </div>

      {/* Policy Name - the headline */}
      <h1 className={`text-6xl font-bold text-center ${t.textOnPage} mb-8`}>
        Block Legacy Authentication
      </h1>

      {/* Before/After - the visual punch */}
      <div className="flex items-center justify-center gap-8 mb-8">
        {/* BEFORE */}
        <div className="bg-emerald-500/20 border-4 border-emerald-500/60 rounded-2xl px-12 py-8">
          <div className="text-2xl text-emerald-400 mb-2">BEFORE</div>
          <div className="text-5xl font-bold text-emerald-400">Enabled</div>
          <div className="text-xl text-emerald-400/70 mt-2">Legacy auth blocked</div>
        </div>

        <ArrowRight className="w-16 h-16 text-red-500" />

        {/* AFTER */}
        <div className="bg-red-500/20 border-4 border-red-500/60 rounded-2xl px-12 py-8">
          <div className="text-2xl text-red-400 mb-2">AFTER</div>
          <div className="text-5xl font-bold text-red-400">Report-Only</div>
          <div className="text-xl text-red-400/70 mt-2">Legacy auth allowed</div>
        </div>
      </div>

      {/* Why this matters - one line */}
      <p className="text-3xl text-center text-slate-300 mb-8">
        Report-Only <span className="text-red-400 font-semibold">bypasses MFA</span> — password spray attacks exploit this
      </p>

      {/* Attribution - the question */}
      <div className="flex justify-center gap-8">
        <div className="bg-slate-800/60 border border-slate-600 rounded-xl px-8 py-4">
          <div className="text-xl text-slate-400">Changed by</div>
          <div className="text-2xl text-amber-400 font-mono">it-manager@contoso.com</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-8 py-4">
          <div className="text-xl text-slate-400">Ticket</div>
          <div className="text-2xl text-red-400 font-bold">None found</div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
