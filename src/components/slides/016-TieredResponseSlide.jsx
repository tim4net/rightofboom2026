import React from 'react';
import { Zap, UserCheck, Users, Clock } from 'lucide-react';

/**
 * Response Matrix Slide
 *
 * 2x2 matrix showing when AI can auto-execute vs when humans must approve.
 * Axes: Confidence (X) vs Risk/Impact (Y)
 *
 * Quadrants:
 * - High Risk + High Confidence → Human approves (stakes too high)
 * - High Risk + Low Confidence → Escalate to senior
 * - Low Risk + High Confidence → Auto-execute
 * - Low Risk + Low Confidence → Queue for batch review
 */
export const TieredResponseSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-5xl font-bold ${t.textOnPage} mb-2`}>
          The Response Matrix
        </h2>
        <p className="text-2xl text-slate-400">
          Confidence alone isn't enough — risk sets the bar
        </p>
      </div>

      {/* Matrix with integrated axis labels */}
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-stretch gap-4">
          {/* Y-axis label - vertical on left */}
          <div className="flex flex-col items-center justify-center w-12">
            <div className="text-xl text-slate-500 mb-2">High</div>
            <div className="flex-1 flex items-center">
              <span className="text-2xl font-bold text-red-400 tracking-wider uppercase -rotate-90 whitespace-nowrap">
                RISK
              </span>
            </div>
            <div className="text-xl text-slate-500 mt-2">Low</div>
          </div>

          {/* Matrix and X-axis */}
          <div className="flex flex-col">
            {/* The 2x2 Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Top-left: Low Confidence + High Risk = ESCALATE */}
              <div className="w-[620px] h-[280px] bg-red-500/15 border-2 border-red-500/40 rounded-tl-3xl p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-red-500/25 rounded-xl">
                    <Users className="w-9 h-9 text-red-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-400">ESCALATE</div>
                    <div className="text-xl text-red-300/70">Human + Senior Review</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <div className="text-xl text-slate-300">Production system isolation</div>
                  <div className="text-xl text-slate-300">Uncertain threat on critical asset</div>
                </div>
              </div>

              {/* Top-right: High Confidence + High Risk = HUMAN APPROVES */}
              <div className="w-[620px] h-[280px] bg-amber-500/15 border-2 border-amber-500/40 rounded-tr-3xl p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-amber-500/25 rounded-xl">
                    <UserCheck className="w-9 h-9 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-400">HUMAN APPROVES</div>
                    <div className="text-xl text-amber-300/70">Confident, but stakes are high</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <div className="text-xl text-slate-300">Disable executive account</div>
                  <div className="text-xl text-slate-300">Firewall rule changes</div>
                </div>
              </div>

              {/* Bottom-left: Low Confidence + Low Risk = QUEUE */}
              <div className="w-[620px] h-[280px] bg-slate-500/15 border-2 border-slate-500/40 rounded-bl-3xl p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-slate-500/25 rounded-xl">
                    <Clock className="w-9 h-9 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-400">QUEUE</div>
                    <div className="text-xl text-slate-400/70">Batch review later</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <div className="text-xl text-slate-400">Suspicious but low-priority alerts</div>
                  <div className="text-xl text-slate-400">Anomalies needing context</div>
                </div>
              </div>

              {/* Bottom-right: High Confidence + Low Risk = AUTO-EXECUTE */}
              <div className="w-[620px] h-[280px] bg-emerald-500/15 border-2 border-emerald-500/40 rounded-br-3xl p-6 flex flex-col">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-emerald-500/25 rounded-xl">
                    <Zap className="w-9 h-9 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-400">AUTO-EXECUTE</div>
                    <div className="text-xl text-emerald-300/70">No human needed</div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <div className="text-xl text-slate-300">Block known-bad IP</div>
                  <div className="text-xl text-slate-300">Quarantine phishing email</div>
                </div>
              </div>
            </div>

            {/* X-axis label - horizontal below */}
            <div className="flex items-center justify-between mt-3 px-4">
              <div className="text-xl text-slate-500">Low</div>
              <span className="text-2xl font-bold text-purple-400 tracking-wider uppercase">
                CONFIDENCE
              </span>
              <div className="text-xl text-slate-500">High</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Landing line */}
      <div className="mt-6 flex justify-center">
        <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-12 py-4">
          <p className="text-3xl text-slate-300">
            <span className="text-purple-400 font-semibold">AI explains every action.</span>
            {' '}The matrix determines{' '}
            <span className="text-amber-400 font-semibold">who approves.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TieredResponseSlide;
