import React from 'react';
import { Shield, Package, RefreshCw, Layers } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Crate Intro Slide
 *
 * Introduces the Rewst CA Policy Monitor Crate as the FIRST DEMO
 * of the ground truth principle. Shows:
 * - What is a Rewst Crate (reusable automation)
 * - What this specific crate does
 * - How it applies the guardrail sandwich to config monitoring
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header with Crate Branding */}
      <div className="text-center mb-6">
        <CrateBadge name="CA Policy Monitor" variant="hero" />
      </div>

      {/* Tagline */}
      <div className="text-center mb-8">
        <p className="text-3xl text-slate-300">
          The <span className="text-emerald-400 font-semibold">guardrail sandwich</span> applied to{' '}
          <span className="text-amber-400 font-semibold">Conditional Access</span>
        </p>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex-1 flex gap-8 max-w-6xl mx-auto w-full">
        {/* Left Column: What is a Crate? */}
        <div className="flex-1 flex flex-col">
          <div className="bg-slate-800/50 border-2 border-slate-600/50 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-amber-400" />
              <h3 className="text-3xl font-bold text-amber-400">What is a Crate?</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                <p className="text-2xl text-slate-300">
                  <span className="text-white font-semibold">Reusable automation</span> you deploy once
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Layers className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                <p className="text-2xl text-slate-300">
                  Pre-built workflows with <span className="text-white font-semibold">proven patterns</span>
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                <p className="text-2xl text-slate-300">
                  <span className="text-white font-semibold">Your config, your tenants</span> — runs everywhere
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: What This Crate Does */}
        <div className="flex-1 flex flex-col">
          <div className="bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-emerald-400" />
              <h3 className="text-3xl font-bold text-emerald-400">This Crate</h3>
            </div>

            <div className="space-y-4">
              <p className="text-2xl text-slate-300">
                Monitors <span className="text-emerald-400 font-semibold">Conditional Access policies</span> across all your M365 tenants
              </p>

              <div className="bg-slate-900/50 rounded-xl p-4 mt-4">
                <p className="text-xl text-slate-400 mb-2">Detects:</p>
                <ul className="space-y-2 text-xl">
                  <li className="text-emerald-300">Policy created or deleted</li>
                  <li className="text-amber-300">Policy state changed (enabled/disabled)</li>
                  <li className="text-red-300">Exclusions added (users, groups, apps)</li>
                  <li className="text-purple-300">Grant controls weakened</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: The Sandwich Connection */}
      <div className="mt-6 bg-slate-900/60 border border-slate-700 rounded-xl p-4">
        <div className="flex items-center justify-center gap-6 text-2xl">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500" />
            <span className="text-emerald-400 font-semibold">BASELINE</span>
            <span className="text-slate-500">(deterministic)</span>
          </div>
          <span className="text-slate-600">+</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500" />
            <span className="text-amber-400 font-semibold">MATH</span>
            <span className="text-slate-500">(deterministic)</span>
          </div>
          <span className="text-slate-600">+</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className="text-purple-400 font-semibold">AI</span>
            <span className="text-slate-500">(probabilistic)</span>
          </div>
          <span className="text-slate-600">=</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-red-400 font-semibold">ACTIONABLE ALERT</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
