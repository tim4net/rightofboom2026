import React from 'react';
import { ArrowRight, Clock, Zap, FileText } from 'lucide-react';

/**
 * Rewst Crate: CA Policy Monitor - Architecture Slide
 * Shows the REAL depth: dual triggers, full policy field capture,
 * actual output format, and multi-tenant scale
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-4">
      {/* Header with Rewst Logo */}
      <div className="flex items-center justify-center gap-6 mb-3">
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
            Conditional Access <span className="text-amber-400">Policy Monitor</span>
          </h2>
        </div>
      </div>

      {/* Dual Triggers - More prominent */}
      <div className="flex justify-center gap-4 mb-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/60 border border-slate-600/50">
          <Clock className="w-5 h-5 text-slate-400" />
          <span className="text-lg text-slate-300">Scheduled check</span>
        </div>
        <div className="text-xl text-slate-500 flex items-center">+</div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50">
          <Zap className="w-5 h-5 text-emerald-400" />
          <span className="text-lg text-emerald-300 font-bold">MS Audit Log Webhook</span>
        </div>
        <div className="text-xl text-slate-500 flex items-center">=</div>
        <div className="px-4 py-2 rounded-lg bg-emerald-500/30 border border-emerald-500/60">
          <span className="text-lg text-emerald-200 font-bold">No blind spots</span>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex-1 flex gap-6">

        {/* Left Column - What It Monitors */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-2xl p-4 flex-1">
            <div className="text-xl font-bold text-amber-400 mb-2">EVERY POLICY FIELD CAPTURED</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="text-lg text-slate-300">• State (enabled/report/off)</div>
              <div className="text-lg text-slate-300">• Grant Controls</div>
              <div className="text-lg text-slate-300">• Users included</div>
              <div className="text-lg text-slate-300">• Users excluded</div>
              <div className="text-lg text-slate-300">• Groups included</div>
              <div className="text-lg text-slate-300">• Groups excluded</div>
              <div className="text-lg text-slate-300">• Applications included</div>
              <div className="text-lg text-slate-300">• Applications excluded</div>
              <div className="text-lg text-slate-300">• Locations included</div>
              <div className="text-lg text-slate-300">• Locations excluded</div>
              <div className="text-lg text-slate-300">• Roles included</div>
              <div className="text-lg text-slate-300">• Roles excluded</div>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-500/30 text-lg text-amber-400">
              Your baseline = your ground truth
            </div>
          </div>

          <div className="bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl p-4">
            <div className="text-xl font-bold text-slate-200 mb-2">DETECTS THREE CHANGE TYPES</div>
            <div className="flex gap-6 font-mono text-xl">
              <div className="text-emerald-400">+ Policy Added</div>
              <div className="text-red-400">− Policy Removed</div>
              <div className="text-amber-400">~ Policy Changed</div>
            </div>
          </div>
        </div>

        {/* Right Column - What It Outputs */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="bg-purple-500/10 border-2 border-purple-500/40 rounded-2xl p-4">
            <div className="text-xl font-bold text-purple-400 mb-2">AI SECURITY ANALYSIS</div>
            <div className="text-lg text-slate-300 mb-2">Prompted to identify:</div>
            <div className="space-y-1 pl-2">
              <div className="text-lg text-red-400">• Malicious intent patterns</div>
              <div className="text-lg text-amber-400">• Changes without tickets</div>
              <div className="text-lg text-purple-300">• Privilege escalation risks</div>
              <div className="text-lg text-purple-300">• MFA bypass attempts</div>
            </div>
            <div className="mt-2 pt-2 border-t border-purple-500/30">
              <div className="text-lg text-purple-300 font-mono">
                GUIDs → "Finance Team", "IT-Admins"
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-4 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-red-400" />
              <div className="text-xl font-bold text-red-400">ALERT INCLUDES</div>
            </div>
            <div className="space-y-1">
              <div className="text-lg text-slate-300">• Full before/after for every field</div>
              <div className="text-lg text-slate-300">• Who made the change</div>
              <div className="text-lg text-slate-300">• When it happened</div>
              <div className="text-lg text-slate-300">• AI threat assessment</div>
              <div className="text-lg text-blue-400 font-bold">• Direct Azure portal links</div>
            </div>
            <div className="mt-2 pt-2 border-t border-red-500/30 flex gap-4">
              <div className="text-lg text-emerald-400">→ PSA Ticket</div>
              <div className="text-lg text-emerald-400">→ Email</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-3 flex justify-center gap-6">
        <div className="bg-emerald-500/10 border border-emerald-500/40 rounded-xl px-6 py-3">
          <div className="text-xl font-bold text-emerald-400">
            AI summarizes. Math decides.
          </div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-3">
          <div className="text-xl text-slate-300">
            Runs across <span className="text-amber-400 font-bold">all your tenants</span> automatically
          </div>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
