import React from 'react';
import { Clock, AlertTriangle, User } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Example Slide
 * "Smoking Gun" layout: Hero number creates immediate impact
 * Redesigned for visual impact and brand compliance
 */
export const CACrateExampleSlide = () => {
  return (
    <div className="w-full h-full flex flex-col bg-ops-indigo-900 px-12 py-6">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-12 object-contain"
          />
          <div>
            <div className="text-xl text-trigger-amber-400 font-semibold tracking-wider">
              REWST CRATE
            </div>
            <h2 className="text-4xl font-bold text-white">
              Real <span className="text-alert-coral-400">Alert</span>
            </h2>
          </div>
        </div>

        {/* Detection Badge */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-bot-teal-400/20 border border-bot-teal-400">
          <Clock className="w-6 h-6 text-bot-teal-400" />
          <span className="text-2xl text-bot-teal-300">
            Detected in <span className="font-bold text-bot-teal-400">12 seconds</span>
          </span>
        </div>
      </div>

      {/* HERO SECTION - The Smoking Gun */}
      <div className="flex-1 flex flex-col items-center justify-center bg-alert-coral-400/10 border-2 border-alert-coral-400 rounded-3xl py-8 mb-6">
        {/* Hero Number */}
        <div className="text-7xl font-black text-alert-coral-400 mb-2">
          60 ACCOUNTS
        </div>
        <div className="text-5xl font-bold text-white mb-6">
          NOW BYPASS MFA
        </div>

        {/* Who was excluded */}
        <div className="flex flex-wrap justify-center gap-4 text-2xl">
          <div className="px-4 py-2 bg-ops-indigo-800/80 rounded-xl border border-alert-coral-400/50">
            <span className="text-cloud-gray-300">Finance Team</span>
            <span className="text-alert-coral-400 font-bold ml-2">(47)</span>
          </div>
          <div className="text-2xl text-cloud-gray-500 flex items-center">+</div>
          <div className="px-4 py-2 bg-ops-indigo-800/80 rounded-xl border border-alert-coral-400/50">
            <span className="text-cloud-gray-300">IT-Admins</span>
            <span className="text-alert-coral-400 font-bold ml-2">(12)</span>
          </div>
          <div className="text-2xl text-cloud-gray-500 flex items-center">+</div>
          <div className="px-4 py-2 bg-ops-indigo-800/80 rounded-xl border border-alert-coral-400/50">
            <span className="text-cloud-gray-300">svc-backup</span>
            <span className="text-alert-coral-400 font-bold ml-2">(1)</span>
          </div>
        </div>

        {/* Impact Callout */}
        <div className="mt-4 text-xl text-cloud-gray-400">
          svc-backup has <span className="text-alert-coral-400 font-semibold">full mailbox access</span> to all users
        </div>
      </div>

      {/* AI Analysis - Condensed */}
      <div className="bg-bot-teal-400/10 border border-bot-teal-400 rounded-2xl px-6 py-4 mb-4">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-bot-teal-400/20">
            <svg className="w-6 h-6 text-bot-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-xl font-bold text-bot-teal-400 mb-1">AI Risk Assessment</div>
            <div className="text-2xl text-cloud-gray-200">
              "Attack pattern detected: exclusions added to maintain persistent access after compromise."
            </div>
          </div>
        </div>
      </div>

      {/* Footer Row - Attribution & Warning */}
      <div className="flex gap-4">
        {/* Changed By */}
        <div className="flex-1 flex items-center gap-4 bg-ops-indigo-800/60 border border-ops-indigo-500 rounded-xl px-5 py-3">
          <User className="w-6 h-6 text-cloud-gray-400" />
          <div>
            <div className="text-xl text-cloud-gray-400">Changed by</div>
            <div className="text-2xl text-trigger-amber-400 font-mono">
              it-manager@contoso.com
            </div>
          </div>
        </div>

        {/* NO TICKET Warning */}
        <div className="flex items-center gap-4 bg-alert-coral-400/20 border-2 border-alert-coral-400 rounded-xl px-6 py-3">
          <AlertTriangle className="w-8 h-8 text-alert-coral-400" />
          <div className="text-2xl text-alert-coral-400 font-bold">
            NO MATCHING TICKET
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
