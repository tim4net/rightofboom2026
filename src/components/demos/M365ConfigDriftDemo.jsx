import React from 'react';
import { ArrowDown, ArrowRight, Clock, Zap, Database, Calculator, Brain, Bell, FileText, Mail } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - How It Works (Flowchart)
 *
 * This is the SECOND SLIDE in the CA Crate demo sequence.
 * Shows the complete detection flow as a vertical flowchart
 * with clear mapping to the guardrail sandwich layers.
 *
 * Flow:
 * 1. YOUR BASELINE (ground truth)
 * 2. DUAL TRIGGERS (scheduled + webhook)
 * 3. MATH DIFF (deterministic comparison)
 * 4. AI LAYER (translation + explanation)
 * 5. ALERT (ticket + email with attribution)
 *
 * Teaching point: "AI summarizes. Math decides."
 */
export const M365ConfigDriftDemo = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <CrateBadge name="CA Policy Monitor" variant="compact" />
        <h2 className={`text-5xl font-bold ${t.textOnPage}`}>
          How It Works
        </h2>
      </div>

      {/* Main Content - Flowchart */}
      <div className="flex-1 flex gap-6">
        {/* Left Side: The Flow (70%) */}
        <div className="flex-[7] flex flex-col justify-center gap-2">

          {/* STEP 1: YOUR BASELINE */}
          <div className="flex items-center gap-4">
            {/* Sandwich Label */}
            <div className="w-32 text-right">
              <span className="text-xl font-bold text-emerald-400">INPUT</span>
              <div className="text-lg text-emerald-400/60">deterministic</div>
            </div>

            {/* Flow Box */}
            <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Database className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-2xl font-bold text-emerald-400">YOUR BASELINE</div>
                  <div className="text-xl text-slate-400">
                    Stored config snapshot — <span className="text-emerald-400">your ground truth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow + Triggers */}
          <div className="flex items-center gap-4">
            <div className="w-32" />
            <div className="flex-1 flex items-center justify-center gap-4 py-1">
              <ArrowDown className="w-6 h-6 text-slate-600" />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/60 border border-slate-600/50 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span className="text-lg text-slate-300">Scheduled</span>
                </div>
                <span className="text-xl text-slate-500">+</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span className="text-lg text-emerald-300 font-semibold">MS Audit Webhook</span>
                </div>
              </div>
              <ArrowDown className="w-6 h-6 text-slate-600" />
            </div>
          </div>

          {/* STEP 2: MATH DIFF */}
          <div className="flex items-center gap-4">
            {/* Sandwich Label */}
            <div className="w-32 text-right">
              <span className="text-xl font-bold text-amber-400">MATH</span>
              <div className="text-lg text-amber-400/60">deterministic</div>
            </div>

            {/* Flow Box */}
            <div className="flex-1 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Calculator className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-2xl font-bold text-amber-400">SET DIFFERENCE</div>
                  <div className="text-xl text-slate-400">
                    Compare baseline to current — <span className="text-amber-400">no guessing</span>
                  </div>
                </div>
                <div className="flex gap-4 font-mono text-xl">
                  <span className="text-emerald-400">+ added</span>
                  <span className="text-red-400">- removed</span>
                  <span className="text-amber-400">~ changed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32" />
            <div className="flex-1 flex justify-center">
              <ArrowDown className="w-6 h-6 text-slate-600" />
            </div>
          </div>

          {/* STEP 3: AI LAYER */}
          <div className="flex items-center gap-4">
            {/* Sandwich Label */}
            <div className="w-32 text-right">
              <span className="text-xl font-bold text-purple-400">AI</span>
              <div className="text-lg text-purple-400/60">probabilistic</div>
            </div>

            {/* Flow Box */}
            <div className="flex-1 bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-2xl font-bold text-purple-400">AI TRANSLATION</div>
                  <div className="text-xl text-slate-400">
                    GUIDs to names • Security impact • Recommendations
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-lg">
                  <span className="text-emerald-400">POSITIVE change</span>
                  <span className="text-red-400">NEGATIVE change</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-32" />
            <div className="flex-1 flex justify-center">
              <ArrowDown className="w-6 h-6 text-slate-600" />
            </div>
          </div>

          {/* STEP 4: ALERT */}
          <div className="flex items-center gap-4">
            {/* Sandwich Label */}
            <div className="w-32 text-right">
              <span className="text-xl font-bold text-red-400">OUTPUT</span>
              <div className="text-lg text-red-400/60">deterministic</div>
            </div>

            {/* Flow Box */}
            <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Bell className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-2xl font-bold text-red-400">ALERT</div>
                  <div className="text-xl text-slate-400">
                    Based on <span className="text-amber-400">real diff</span>, not AI opinion
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/60 border border-slate-600/50 rounded-lg">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <span className="text-lg text-slate-300">PSA Ticket</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/60 border border-slate-600/50 rounded-lg">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="text-lg text-slate-300">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Alert Contents (30%) */}
        <div className="flex-[3] flex flex-col justify-center">
          <div className="bg-slate-900/70 border-2 border-slate-600/50 rounded-2xl p-5">
            <div className="text-xl font-bold text-slate-400 mb-4 uppercase tracking-wide">
              Alert Contains
            </div>

            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-lg text-slate-500 mb-1">WHO</div>
                <div className="text-xl text-amber-400 font-mono">it-manager@contoso.com</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-lg text-slate-500 mb-1">WHAT CHANGED</div>
                <div className="text-xl text-white">State: Enabled → Report-Only</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-lg text-slate-500 mb-1">WHY IT MATTERS</div>
                <div className="text-xl text-purple-300 italic">"Allows legacy auth attacks..."</div>
              </div>

              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <div className="text-lg text-red-400/80 mb-1">TICKET CHECK</div>
                <div className="text-xl text-red-400 font-bold">No matching ticket found</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Landing Line */}
      <div className="mt-4 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-8 py-3">
          <p className="text-3xl text-slate-300">
            "<span className="text-purple-400 font-semibold">AI summarizes.</span>{' '}
            <span className="text-amber-400 font-semibold">Math decides.</span>"
          </p>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
