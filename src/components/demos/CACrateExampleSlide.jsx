import React from 'react';
import { AlertTriangle, User, Clock, FileText, Sparkles } from 'lucide-react';

/**
 * CA Policy Monitor - THE ALERT (What You Actually Receive)
 *
 * Photo test: Conference attendee sees this and immediately understands
 * "Oh, this is a notification that tells me when someone weakens my security."
 *
 * This shows the OUTPUT - what lands in your PSA/email when a CA policy changes.
 * The alert includes: what changed, who changed it (from MS audit log), and
 * AI analysis of the security impact.
 */
export const CACrateExampleSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header: Rewst logo + Alert indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-14 w-auto"
          />
          <div className="h-10 w-px bg-slate-600" />
          <span className="text-2xl font-bold text-amber-400">CA Policy Monitor</span>
        </div>
        <div className="flex items-center gap-3 px-5 py-2 bg-red-500/20 border-2 border-red-500/60 rounded-xl">
          <AlertTriangle className="w-7 h-7 text-red-400" />
          <span className="text-2xl font-bold text-red-400">SECURITY ALERT</span>
        </div>
      </div>

      {/* Main Alert Card - looks like a real ticket/notification */}
      <div className="flex-1 bg-slate-900/80 border-2 border-slate-600/60 rounded-2xl p-8 flex flex-col">
        {/* Policy Name - the headline */}
        <div className="mb-6">
          <div className="text-xl text-slate-500 uppercase tracking-wide mb-2">Policy Changed</div>
          <h1 className={`text-5xl font-bold ${t.textOnPage}`}>
            Block Legacy Authentication
          </h1>
        </div>

        {/* Change Details - two columns */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Left: What Changed */}
          <div className="bg-slate-800/60 rounded-xl p-5">
            <div className="text-xl text-slate-500 uppercase tracking-wide mb-3">What Changed</div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-lg text-emerald-400/70 mb-1">WAS</div>
                <div className="text-3xl font-bold text-emerald-400">Enabled</div>
              </div>
              <div className="text-3xl text-slate-500">→</div>
              <div className="text-center">
                <div className="text-lg text-red-400/70 mb-1">NOW</div>
                <div className="text-3xl font-bold text-red-400">Report-Only</div>
              </div>
            </div>
          </div>

          {/* Right: Attribution from MS Audit Log */}
          <div className="bg-slate-800/60 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xl text-slate-500 uppercase tracking-wide mb-3">
              <span>Changed By</span>
              <span className="text-lg normal-case text-slate-600">(from MS Audit Log)</span>
            </div>
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-2xl font-mono text-amber-400">it-manager@contoso.com</div>
                <div className="flex items-center gap-2 text-xl text-slate-500 mt-1">
                  <Clock className="w-5 h-5" />
                  <span>Jan 15, 2026 at 2:34 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Section - clearly labeled as optional AI */}
        <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-5 flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-purple-400 uppercase tracking-wide">
              AI Security Analysis
            </span>
            <span className="text-lg text-purple-400/60">(GPT-4)</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xl text-red-400 font-semibold mb-2">Security Impact: NEGATIVE</div>
              <p className="text-2xl text-slate-300 leading-relaxed">
                Changing from <span className="text-emerald-400 font-semibold">Enabled</span> to{' '}
                <span className="text-red-400 font-semibold">Report-Only</span> means legacy
                authentication protocols (IMAP, POP3, SMTP) are now <span className="text-red-400">allowed</span>.
                These protocols bypass MFA, making accounts vulnerable to password spray attacks.
              </p>
            </div>

            <div>
              <div className="text-xl text-amber-400 font-semibold mb-2">Recommendation</div>
              <p className="text-2xl text-slate-300">
                Verify this change was intentional. If testing is complete, re-enable the policy to restore MFA protection.
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Delivery info */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xl text-slate-500">
              <FileText className="w-5 h-5" />
              <span>PSA Ticket #48291 created</span>
            </div>
            <div className="flex items-center gap-2 text-xl text-slate-500">
              <span>Email sent to security-alerts@contoso.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CACrateExampleSlide;
