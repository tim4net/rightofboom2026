import React from 'react';
import {
  AlertTriangle, Shield, FileText, ArrowRight, TrendingUp
} from 'lucide-react';

/**
 * Safe Sweep Results - The Starting Point (Not the End State)
 *
 * STRATEGIC REDESIGN:
 * - Reframed as "Your Starting Point" not "What you receive"
 * - The F grade is the BEGINNING of improvement, not a static output
 * - Added transformation arc: "This F becomes an A"
 * - Sets up the demo with forward momentum
 *
 * Key message: "Now we KNOW. And knowing in 60 seconds beats finding out
 * from an incident responder."
 */
const SafeSweepResultsSlide = ({ theme: t }) => {
  const grade = "F";
  const score = 52;

  const topFindings = [
    {
      finding: "LSASS Unprotected",
      explanation: "Every logged-in password stolen in 30 seconds"
    },
    {
      finding: "ASR Rules Disabled",
      explanation: "Macros run malware without resistance"
    },
    {
      finding: "LLMNR Enabled",
      explanation: "Attackers intercept credentials on the network"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header - Reframed as Starting Point */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black mb-2 ${t.textOnPage}`}>
          Your Starting Point
        </h2>
        <p className={`text-2xl ${t.accentColor} font-medium`}>
          A lab endpoint with intentional gaps — just like the ones attackers find in the wild
        </p>
      </div>

      {/* Main Content - Grade + Findings + Transformation */}
      <div className="flex-1 flex items-center justify-center gap-8">

        {/* Left: Grade with Transformation Arc */}
        <div className="flex flex-col items-center">
          {/* Before Grade - HUGE */}
          <div className="text-xl text-slate-500 uppercase tracking-wide mb-2">Before</div>
          <div className="bg-red-500 w-48 h-48 rounded-3xl flex flex-col items-center justify-center shadow-2xl shadow-red-500/30 mb-3">
            <span className="text-[8rem] font-black text-white leading-none">{grade}</span>
          </div>
          <div className="text-3xl font-bold text-slate-300 mb-4">
            {score} / 100
          </div>

          {/* Transformation Arrow */}
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-400" />
            <ArrowRight className="w-6 h-6 text-slate-500" />
          </div>

          {/* After Grade - Smaller, shows transformation */}
          <div className="text-xl text-slate-500 uppercase tracking-wide mb-2">After remediation</div>
          <div className="bg-emerald-500 w-28 h-28 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-6xl font-black text-white leading-none">A</span>
          </div>
          <div className="text-xl text-slate-400 mt-2">
            ~2 hours of work
          </div>
        </div>

        {/* Right: Top 3 Findings */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
            <h3 className="text-2xl font-bold text-red-400 uppercase tracking-wide">
              Why it failed
            </h3>
          </div>

          <div className="space-y-3">
            {topFindings.map((item, i) => (
              <div
                key={i}
                className={`${t.cardBg} rounded-xl border-l-4 border-red-500 p-5`}
              >
                {/* Finding Name */}
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-red-500/20 text-red-400 font-bold text-xl w-8 h-8 rounded-lg flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-2xl font-bold text-slate-200">
                    {item.finding}
                  </span>
                </div>

                {/* Plain-English Explanation */}
                <div className="text-xl text-red-400 ml-11">
                  {item.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* AI Explanation Note */}
          <div className={`${t.cardBg} rounded-xl border border-purple-500/30 p-4 mt-4`}>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <p className="text-xl text-slate-300">
                <span className="text-purple-400 font-semibold">AI includes remediation steps</span>
                {' '}- PowerShell commands, GPO paths, Microsoft docs links
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - The Key Insight + Demo Setup */}
      <div className="mt-4 text-center">
        <p className="text-2xl text-slate-300 mb-3">
          The point isn't that it failed — the point is that now we <span className="text-emerald-400 font-bold">KNOW</span>.
        </p>
        <p className="text-3xl text-amber-400 font-semibold">
          Want to see this run live?
        </p>
      </div>
    </div>
  );
};

export default SafeSweepResultsSlide;
