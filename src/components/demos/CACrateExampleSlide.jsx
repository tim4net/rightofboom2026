import React from 'react';
import { ArrowRight, AlertTriangle, Shield, User, FileX, Brain } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - Concrete Example
 *
 * This is the THIRD SLIDE in the CA Crate demo sequence.
 * Shows a real before/after example of config drift detection.
 *
 * Example: "Block Legacy Authentication" policy
 * - BEFORE: Enabled, no exclusions (legacy auth blocked)
 * - AFTER: Report-Only (legacy auth ALLOWED, just logged)
 *
 * Shows:
 * - The math found the diff
 * - AI explains why it matters
 * - Attribution: who made the change
 * - Ticket check: was this authorized?
 *
 * Teaching point: "No guessing. Math found the diff. AI made it readable."
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <CrateBadge name="CA Policy Monitor" variant="compact" />
        <div className="flex items-center gap-4">
          <Shield className="w-10 h-10 text-amber-400" />
          <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
            Block Legacy Authentication
          </h2>
        </div>
      </div>

      {/* What the math found label */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full">
          <span className="text-2xl text-amber-400 font-bold">~ POLICY CHANGED</span>
          <span className="text-xl text-slate-400">detected by</span>
          <span className="text-2xl text-amber-300 font-semibold">set difference</span>
        </div>
      </div>

      {/* Main Content: Before/After + AI Analysis */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Before/After Cards */}
        <div className="flex gap-6 items-stretch">
          {/* BEFORE Card - Good State */}
          <div className="flex-1">
            <div
              className="h-full rounded-2xl border-4 border-emerald-500/60 p-5 flex flex-col"
              style={{
                background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 78, 59, 0.2) 100%)'
              }}
            >
              <div className="text-3xl font-bold text-emerald-400 mb-4">BEFORE</div>

              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center bg-slate-900/40 rounded-lg p-3">
                  <span className="text-xl text-slate-400">State</span>
                  <span className="text-2xl text-emerald-400 font-bold">Enabled</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/40 rounded-lg p-3">
                  <span className="text-xl text-slate-400">Exclusions</span>
                  <span className="text-2xl text-emerald-400 font-mono">None</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-emerald-500/30">
                <div className="text-xl text-emerald-300">
                  Legacy auth <span className="font-bold text-emerald-400">BLOCKED</span> for all users
                </div>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center px-2">
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="w-12 h-12 text-amber-500" />
              <span className="text-lg text-amber-400 font-mono">DRIFT</span>
            </div>
          </div>

          {/* AFTER Card - Bad State */}
          <div className="flex-1">
            <div
              className="h-full rounded-2xl border-4 border-red-500/60 p-5 flex flex-col"
              style={{
                background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.15) 0%, rgba(127, 29, 29, 0.2) 100%)'
              }}
            >
              <div className="text-3xl font-bold text-red-400 mb-4">AFTER</div>

              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-center bg-slate-900/40 rounded-lg p-3">
                  <span className="text-xl text-slate-400">State</span>
                  <span className="text-2xl text-red-400 font-bold">Report-Only</span>
                </div>
                <div className="flex justify-between items-center bg-slate-900/40 rounded-lg p-3">
                  <span className="text-xl text-slate-400">Exclusions</span>
                  <span className="text-2xl text-red-400 font-mono">None</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-red-500/30">
                <div className="text-xl text-red-300">
                  Legacy auth <span className="font-bold text-red-400">ALLOWED</span> — just logged
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Explanation - Purple */}
        <div className="bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Brain className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-purple-400">AI Analysis</span>
            </div>
            <div className="flex-1">
              <p className="text-2xl text-purple-200">
                "Report-Only mode <span className="text-red-400 font-semibold">allows legacy authentication protocols</span> — IMAP, POP3, SMTP Basic Auth — which bypass MFA. Password spray attacks exploit this gap."
              </p>
              <p className="text-xl text-purple-300/80 mt-2">
                This exact drift has been involved in <span className="text-red-400 font-semibold">real M365 breaches</span>.
              </p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-400 flex-shrink-0" />
          </div>
        </div>

        {/* Attribution Row */}
        <div className="flex gap-6">
          {/* WHO made the change */}
          <div className="flex-1 bg-slate-800/60 border-2 border-slate-600/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <User className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-xl text-slate-400">Changed by</div>
                <div className="text-2xl text-amber-400 font-mono">it-manager@contoso.com</div>
              </div>
            </div>
          </div>

          {/* Ticket status - UNAUTHORIZED */}
          <div className="flex-1 bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FileX className="w-8 h-8 text-red-400" />
              <div>
                <div className="text-xl text-red-400/80">Ticket Reference</div>
                <div className="text-2xl text-red-400 font-bold">No matching ticket found</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: The Teaching Point */}
      <div className="mt-3 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-8 py-3">
          <p className="text-2xl text-slate-300">
            No guessing. <span className="text-amber-400 font-semibold">Math found the diff.</span>{' '}
            <span className="text-purple-400 font-semibold">AI made it readable.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
