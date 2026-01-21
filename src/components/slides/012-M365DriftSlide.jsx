import React from 'react';
import { ArrowDown, Clock, Zap, Database, Calculator, Brain, Bell, RefreshCw } from 'lucide-react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - How It Works (Accurate Technical Flow)
 *
 * This shows the REAL architecture:
 *
 * 1. TRIGGERS: Cron (42 min) OR Microsoft Audit Log webhook
 * 2. FETCH: Get current CA policies from MS Graph API
 * 3. COMPARE: Set difference against stored baseline (MATH)
 *    - added = in current, not in baseline
 *    - removed = in baseline, not in current
 *    - changed = modifiedDateTime newer than last check
 * 4. TRANSLATE: GUIDs to human-readable names (lookup)
 * 5. AI (optional): GPT-4 explains security impact
 * 6. NOTIFY: PSA ticket + email
 * 7. UPDATE: Save new baseline to Rewst template
 *
 * Key insight: Detection is MATH. AI only EXPLAINS.
 * "Who changed it" comes from Microsoft's audit log, not the crate.
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

      {/* Main Flow - Horizontal with clear steps */}
      <div className="flex-1 flex flex-col justify-center gap-3">

        {/* Row 1: TRIGGERS */}
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <span className="text-xl font-bold text-emerald-400">1</span>
          </div>
          <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-emerald-400">TRIGGER</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg">
                  <Clock className="w-6 h-6 text-slate-400" />
                  <span className="text-xl text-slate-300">Every 42 min</span>
                </div>
                <span className="text-2xl text-slate-500 font-bold">OR</span>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl text-emerald-300 font-semibold">MS Audit Webhook</span>
                  <span className="text-lg text-emerald-400/60">(real-time)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24" />
          <div className="flex-1 flex justify-center">
            <ArrowDown className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* Row 2: FETCH + COMPARE */}
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <span className="text-xl font-bold text-amber-400">2-3</span>
          </div>
          <div className="flex-1 bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <Database className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div>
                  <div className="text-2xl font-bold text-amber-400">FETCH + COMPARE</div>
                  <div className="text-xl text-slate-400">
                    Get current from MS Graph, compare to stored baseline
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calculator className="w-7 h-7 text-amber-400" />
                <div className="flex flex-col gap-1 font-mono text-xl">
                  <span className="text-emerald-400">added = current - baseline</span>
                  <span className="text-red-400">removed = baseline - current</span>
                  <span className="text-amber-400">changed = newer modifiedDateTime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24" />
          <div className="flex-1 flex justify-center">
            <ArrowDown className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* Row 3: TRANSLATE */}
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <span className="text-xl font-bold text-slate-400">4</span>
          </div>
          <div className="flex-1 bg-slate-700/30 border-2 border-slate-600/40 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-slate-300">TRANSLATE</div>
              <div className="text-xl text-slate-400">
                GUIDs → human names
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-mono text-xl text-slate-500">a1b2c3d4-...</span>
                <span className="text-xl text-slate-500">→</span>
                <span className="text-xl text-amber-400">it-manager@contoso.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24" />
          <div className="flex-1 flex justify-center">
            <ArrowDown className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* Row 4: AI ANALYSIS (Optional) */}
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <span className="text-xl font-bold text-purple-400">5</span>
          </div>
          <div className="flex-1 bg-purple-500/10 border-2 border-purple-500/40 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-purple-400">AI ANALYSIS</div>
                  <span className="text-lg text-purple-400/60 px-2 py-1 bg-purple-500/20 rounded">(optional)</span>
                </div>
                <div className="text-xl text-slate-400">
                  GPT-4 explains security impact: positive or negative
                </div>
              </div>
              <div className="text-xl text-purple-300 italic max-w-md">
                "This change allows legacy auth, which bypasses MFA..."
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-24" />
          <div className="flex-1 flex justify-center">
            <ArrowDown className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* Row 5: NOTIFY + UPDATE */}
        <div className="flex items-center gap-4">
          <div className="w-24 text-right">
            <span className="text-xl font-bold text-red-400">6-7</span>
          </div>
          <div className="flex-1 flex gap-4">
            {/* Notify */}
            <div className="flex-1 bg-red-500/10 border-2 border-red-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <Bell className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <div className="text-2xl font-bold text-red-400">NOTIFY</div>
                  <div className="text-xl text-slate-400">
                    PSA ticket + email with full details
                  </div>
                </div>
              </div>
            </div>
            {/* Update baseline */}
            <div className="flex-1 bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-4">
              <div className="flex items-center gap-4">
                <RefreshCw className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-2xl font-bold text-emerald-400">UPDATE BASELINE</div>
                  <div className="text-xl text-slate-400">
                    Save current state for next comparison
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: The Landing Line */}
      <div className="mt-4 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-10 py-4">
          <p className="text-3xl text-slate-300">
            <span className="text-amber-400 font-semibold">Math detects.</span>
            {' '}
            <span className="text-purple-400 font-semibold">AI explains.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default M365ConfigDriftDemo;
