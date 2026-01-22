import React from 'react';
import { Download, Zap, AlertTriangle, UserX, Key, MapPin } from 'lucide-react';
import CrateIcon from '../ui/CrateIcon';

/**
 * CA Crate Intro Slide
 *
 * Now includes MFA exclusions callout to show why detecting CA changes matters.
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  const mfaAttacks = [
    {
      icon: UserX,
      name: "Emergency Exclusion",
      description: "Add backdoor user to MFA bypass group",
      color: "text-red-400"
    },
    {
      icon: Key,
      name: "Legacy Auth Backdoor",
      description: "Enable protocols that skip MFA entirely",
      color: "text-amber-400"
    },
    {
      icon: MapPin,
      name: "Trusted Location",
      description: "Attacker's IP becomes 'trusted office'",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header: What is a Crate? */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-6">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-20 w-auto"
            style={{ marginRight: '-31px' }}
          />
          <div className="h-12 w-px bg-slate-600" />
          <div className="flex items-center gap-3">
            <CrateIcon className="w-10 h-10 text-amber-400" />
            <span className="text-3xl font-bold text-amber-400">Crate</span>
          </div>
        </div>
      </div>

      {/* What is a Crate - the concept */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-2">
            <Download className="w-6 h-6 text-emerald-400" />
            <span className="text-xl text-slate-300">
              <span className="text-emerald-400 font-semibold">Pre-built automation</span> you deploy yourself
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-400" />
            <span className="text-xl text-slate-300">
              <span className="text-amber-400 font-semibold">No building required</span>, configure and run
            </span>
          </div>
        </div>
      </div>

      {/* This specific crate */}
      <div className="text-center mb-6">
        <h1 className={`text-5xl font-bold ${t.textOnPage} mb-4`}>
          Notify on Conditional Access Policy Changes
        </h1>
        <p className="text-2xl text-slate-300 max-w-4xl mx-auto">
          Monitors <span className="text-blue-400 font-semibold">CA policy</span> changes,
          uses <span className="text-purple-400 font-semibold">AI</span> to explain impact,
          alerts via <span className="text-amber-400 font-semibold">ticket + email</span>
        </p>
      </div>

      {/* MFA Exclusions Callout */}
      <div className={`${t.cardBg} rounded-xl border-2 border-red-500/40 p-6`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <span className="text-2xl font-bold text-red-400">
            Why This Matters: MFA Exclusion = Skeleton Key to Your Tenant
          </span>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {mfaAttacks.map((attack, i) => (
            <div
              key={i}
              className="bg-slate-900/60 rounded-lg p-4 border border-slate-700"
            >
              <div className="flex items-center gap-3 mb-2">
                <attack.icon className={`w-6 h-6 ${attack.color}`} />
                <span className={`text-xl font-semibold ${attack.color}`}>{attack.name}</span>
              </div>
              <p className="text-xl text-slate-300">{attack.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xl text-slate-400">
            <span className="text-emerald-400 font-semibold">Detection triggers:</span>{' '}
            User added to exclusion group • Legacy auth enabled • Named location modified
          </p>
        </div>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
