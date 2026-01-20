import React from 'react';
import { ArrowRight, Clock, ExternalLink, AlertTriangle, Shield } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Example Slide
 * Shows a REAL scenario with full field-level diff,
 * AI malicious intent analysis, and operational details
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-4">
      {/* Header with Rewst Logo */}
      <div className="flex items-center justify-center gap-6 mb-2">
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-12 object-contain"
        />
        <div className="text-center">
          <div className="text-lg text-amber-400 font-semibold tracking-wider">
            REWST CRATE
          </div>
          <h2 className={`text-4xl font-black ${t.textOnPage}`}>
            Real <span className="text-red-400">Alert</span> Example
          </h2>
        </div>
      </div>

      {/* Detection indicator */}
      <div className="flex justify-center gap-4 mb-3">
        <div className="px-4 py-1 rounded-full bg-amber-500/30 border border-amber-500/50">
          <span className="text-lg text-amber-300 font-bold">~ Policy Changed</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-lg text-emerald-300">Detected via webhook in <span className="font-bold">12 seconds</span></span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-3">

        {/* Policy Header */}
        <div className="flex items-center justify-between bg-slate-800/60 border border-slate-600/50 rounded-xl px-6 py-3">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-2xl text-white font-bold">Require MFA for All Users</span>
          </div>
          <div className="flex items-center gap-2 text-blue-400">
            <ExternalLink className="w-5 h-5" />
            <span className="text-lg">portal.azure.com/.../PolicyBlade/...</span>
          </div>
        </div>

        {/* Before/After - Field Level Diff */}
        <div className="flex gap-4 flex-1">
          {/* BEFORE */}
          <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-2xl p-4">
            <div className="text-xl font-bold text-emerald-400 mb-3">PREVIOUS SETTINGS</div>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span className="text-slate-400">State:</span>
                <span className="text-emerald-400 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Users Included:</span>
                <span className="text-slate-300">All Users</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Users Excluded:</span>
                <span className="text-emerald-400 font-mono">None</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Groups Excluded:</span>
                <span className="text-emerald-400 font-mono">None</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grant Controls:</span>
                <span className="text-slate-300">Require MFA</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-500/30">
              <div className="text-lg text-emerald-400/80">
                MFA required for all 2,847 users
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <ArrowRight className="w-8 h-8 text-slate-600" />
          </div>

          {/* AFTER */}
          <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-4">
            <div className="text-xl font-bold text-red-400 mb-3">NEW SETTINGS</div>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span className="text-slate-400">State:</span>
                <span className="text-slate-300 font-bold">Enabled</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Users Included:</span>
                <span className="text-slate-300">All Users</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Users Excluded:</span>
                <span className="text-red-400 font-bold">svc-backup@contoso.com</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-slate-400">Groups Excluded:</span>
                <div className="text-right">
                  <div className="text-red-400 font-bold">Finance Team (47)</div>
                  <div className="text-red-400 font-bold">IT-Admins (12)</div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grant Controls:</span>
                <span className="text-slate-300">Require MFA</span>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-red-500/30">
              <div className="text-lg text-red-400">
                <span className="font-bold">60 accounts</span> now bypass MFA
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-purple-500/15 border-2 border-purple-500/50 rounded-2xl p-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-7 h-7 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="text-xl font-bold text-purple-400 mb-1">AI Security Analysis</div>
              <div className="text-xl text-purple-200">
                "Service account and privileged groups excluded without corresponding change request.
                <span className="text-red-400 font-bold"> High-risk pattern: </span>
                attackers frequently add exclusions to maintain access after initial compromise.
                The svc-backup account has mailbox access to all users. Recommend immediate review and MFA re-enrollment."
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Attribution */}
        <div className="flex gap-4">
          <div className="flex-1 bg-slate-800/60 border border-slate-600/50 rounded-xl px-5 py-3">
            <div className="text-lg text-slate-400">Changed by</div>
            <div className="text-xl text-amber-400 font-mono">
              GlobalAdmin (it-manager@contoso.com)
            </div>
          </div>
          <div className="flex-1 bg-slate-800/60 border border-slate-600/50 rounded-xl px-5 py-3">
            <div className="text-lg text-slate-400">Timestamp</div>
            <div className="text-xl text-slate-300 font-mono">
              2024-01-15 14:32:07 UTC
            </div>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-5 py-3">
            <div className="text-lg text-slate-400">Ticket Reference</div>
            <div className="text-xl text-red-400 font-bold">
              ⚠️ No matching ticket found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
