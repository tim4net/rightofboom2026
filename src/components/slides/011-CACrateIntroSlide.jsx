import React from 'react';
import { Download, Zap } from 'lucide-react';
import CrateIcon from '../ui/CrateIcon';

/**
 * CA Crate Intro Slide
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-12">
      {/* Header: What is a Crate? */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-6">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-28 w-auto"
            style={{ marginRight: '-31px' }}
          />
          <div className="h-16 w-px bg-slate-600" />
          <div className="flex items-center gap-3">
            <CrateIcon className="w-14 h-14 text-amber-400" />
            <span className="text-4xl font-bold text-amber-400">Crate</span>
          </div>
        </div>
      </div>

      {/* What is a Crate - the concept */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-8 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Download className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl text-slate-300">
              <span className="text-emerald-400 font-semibold">Pre-built automation</span> you deploy yourself
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-400" />
            <span className="text-2xl text-slate-300">
              <span className="text-amber-400 font-semibold">No building required</span>, configure and run
            </span>
          </div>
        </div>
      </div>

      {/* This specific crate */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className={`text-7xl font-bold ${t.textOnPage} mb-8 text-center`}>
          Notify on Conditional Access Policy Changes
        </h1>

        {/* Official crate description */}
        <div className="space-y-6 text-center max-w-4xl">
          <p className="text-3xl text-slate-300 leading-relaxed">
            Monitors <span className="text-blue-400 font-semibold">Microsoft 365 Conditional Access Policy</span> changes and generates
            notifications via <span className="text-amber-400 font-semibold">ticket creation</span> and{' '}
            <span className="text-amber-400 font-semibold">email alerts</span>.
          </p>
          <p className="text-3xl text-slate-300 leading-relaxed">
            Leverages <span className="text-purple-400 font-semibold">AI</span> to provide
            a clearer, human-readable summary of policy modifications.
          </p>
          <p className="text-2xl text-slate-400 leading-relaxed">
            Get notified about unauthorized changes, ensure policies are modified only by
            authorized personnel, and streamline incident response with automatic notifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
