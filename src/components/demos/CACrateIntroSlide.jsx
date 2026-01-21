import React from 'react';
import { Package, Download, Zap } from 'lucide-react';

/**
 * CA Crate Intro Slide
 *
 * Photo test: Someone sees this and understands:
 * 1. What a Rewst Crate is (pre-built automation you can deploy)
 * 2. This specific crate monitors CA policies
 * 3. Why that matters (security drift detection)
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header: What is a Crate? */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-48 w-auto"
        />
        <div className="h-32 w-px bg-slate-600" />
        <div className="flex items-center gap-4">
          <Package className="w-16 h-16 text-amber-400" />
          <span className="text-6xl font-bold text-amber-400">Crate</span>
        </div>
      </div>

      {/* What is a Crate - the concept */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-8 justify-center">
          <div className="flex items-center gap-3">
            <Download className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl text-slate-300">
              <span className="text-emerald-400 font-semibold">Pre-built automation</span> you deploy in minutes
            </span>
          </div>
          <div className="h-8 w-px bg-slate-600" />
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-400" />
            <span className="text-2xl text-slate-300">
              <span className="text-amber-400 font-semibold">No coding required</span> — configure and run
            </span>
          </div>
        </div>
      </div>

      {/* This specific crate */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-2xl text-slate-500 uppercase tracking-wider mb-4">Example Crate</div>
        <h1 className={`text-7xl font-bold ${t.textOnPage} mb-8`}>
          CA Policy Monitor
        </h1>

        {/* Official crate description */}
        <div className="space-y-6 text-center max-w-5xl">
          <p className="text-3xl text-slate-300 leading-relaxed">
            Monitors Microsoft 365 Conditional Access Policy changes and generates
            notifications via <span className="text-amber-400 font-semibold">ticket creation</span> and{' '}
            <span className="text-amber-400 font-semibold">email alerts</span>.
          </p>
          <p className="text-3xl text-slate-300 leading-relaxed">
            Leverages <span className="text-purple-400 font-semibold">OpenAI</span> to provide
            a clearer, human-readable summary of policy modifications.
          </p>
          <p className="text-2xl text-slate-400 leading-relaxed max-w-4xl">
            Get notified about unauthorized changes, ensure policies are modified only by
            authorized personnel, and streamline incident response with automatic notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
