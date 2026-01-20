import React from 'react';
import { ArrowRight, Clock, Zap, Bell } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 * Three-Card Flow: TRIGGERS → DETECTS → ALERTS
 * Redesigned for visual impact and brand compliance
 */
export const M365ConfigDriftDemo = () => {
  return (
    <div className="w-full h-full flex flex-col bg-ops-indigo-900 px-12 py-8">
      {/* Header with Rewst Logo */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-16 object-contain"
        />
        <div className="text-center">
          <div className="text-2xl text-trigger-amber-400 font-semibold tracking-wider mb-1">
            REWST CRATE
          </div>
          <h2 className="text-5xl font-black text-white">
            Conditional Access <span className="text-bot-teal-400">Policy Monitor</span>
          </h2>
        </div>
      </div>

      {/* Three-Card Flow - Main Visual */}
      <div className="flex-1 flex items-center justify-center gap-6">
        {/* Card 1: TRIGGERS */}
        <div className="w-80 bg-ops-indigo-800/60 border-2 border-bot-teal-400 rounded-2xl p-6 shadow-lg shadow-bot-teal-400/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-bot-teal-400/20">
              <Zap className="w-8 h-8 text-bot-teal-400" />
            </div>
            <div className="text-3xl font-bold text-bot-teal-400">TRIGGERS</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-cloud-gray-300" />
              <span className="text-2xl text-cloud-gray-200">Scheduled checks</span>
            </div>
            <div className="text-2xl text-cloud-gray-400 pl-9">+</div>
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-bot-teal-400" />
              <span className="text-2xl text-bot-teal-300 font-semibold">MS Audit Webhook</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-bot-teal-400/30">
            <div className="text-2xl text-bot-teal-400 font-bold">= No blind spots</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <ArrowRight className="w-12 h-12 text-cloud-gray-500 flex-shrink-0" />

        {/* Card 2: DETECTS */}
        <div className="w-80 bg-ops-indigo-800/60 border-2 border-trigger-amber-400 rounded-2xl p-6 shadow-lg shadow-trigger-amber-400/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-trigger-amber-400/20">
              <svg className="w-8 h-8 text-trigger-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-trigger-amber-400">DETECTS</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl text-cloud-gray-200">Every policy field</div>
            <div className="text-2xl text-cloud-gray-200">Every change type</div>
            <div className="flex gap-4 mt-3 font-mono text-xl">
              <span className="text-bot-teal-400">+ Added</span>
              <span className="text-alert-coral-400">− Removed</span>
              <span className="text-trigger-amber-400">~ Changed</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-trigger-amber-400/30">
            <div className="text-2xl text-trigger-amber-400 font-bold">Your baseline = truth</div>
          </div>
        </div>

        {/* Arrow 2 */}
        <ArrowRight className="w-12 h-12 text-cloud-gray-500 flex-shrink-0" />

        {/* Card 3: ALERTS */}
        <div className="w-80 bg-ops-indigo-800/60 border-2 border-alert-coral-400 rounded-2xl p-6 shadow-lg shadow-alert-coral-400/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-alert-coral-400/20">
              <Bell className="w-8 h-8 text-alert-coral-400" />
            </div>
            <div className="text-3xl font-bold text-alert-coral-400">ALERTS</div>
          </div>
          <div className="space-y-3">
            <div className="text-2xl text-cloud-gray-200">PSA ticket created</div>
            <div className="text-2xl text-cloud-gray-200">Email notification</div>
            <div className="text-2xl text-cloud-gray-200">Full before/after diff</div>
          </div>
          <div className="mt-4 pt-4 border-t border-alert-coral-400/30">
            <div className="text-2xl text-alert-coral-400 font-bold">+ Who made the change</div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center mt-6 mb-4">
        <div className="text-3xl text-cloud-gray-100 font-medium">
          <span className="text-bot-teal-400 font-bold">Rules</span> catch changes.{' '}
          <span className="text-trigger-amber-400 font-bold">AI</span> explains risks.
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center">
        <div className="bg-ops-indigo-700/50 border border-ops-indigo-500 rounded-xl px-8 py-3">
          <div className="text-2xl text-cloud-gray-200">
            Runs across <span className="text-trigger-amber-400 font-bold">all your tenants</span> automatically
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
