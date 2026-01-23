import React from 'react';
import {
  AlertTriangle, FileText, ArrowRight, TrendingUp
} from 'lucide-react';

/**
 * From F to A in 60 Seconds Slide
 *
 * UPDATED: Minor changes from "Your Starting Point" to "From F to A in 60 Seconds"
 * - New title emphasizes the transformation journey
 * - Maintains F grade → AI recommendations → A grade layout
 * - Updated transition hook to set up Atomic Red Team demo
 *
 * Key message: "Know your gaps before attackers do"
 */
const SafeSweepResultsSlide = ({ theme: t }) => {
  // Real data from lab run: 3 endpoints, January 23, 2026
  const grade = "F";
  const score = 54;
  const stats = { endpoints: 3, passed: 29, failed: 24 };

  // Top 3 critical findings from actual AI-generated report
  const topFindings = [
    {
      finding: "EICAR Detection Failed",
      explanation: "All 3 systems failed to block test malware — AV isn't stopping known threats"
    },
    {
      finding: "ASR Rules Not Enforced",
      explanation: "0 rules in Block mode — attackers have free path to run payloads"
    },
    {
      finding: "Credential Guard Disabled",
      explanation: "Memory-resident passwords unprotected — single compromise = lateral movement"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black mb-2 ${t.textOnPage}`}>
          Scan in 60 Seconds. Know Today.
        </h2>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
          Find your gaps before attackers do
        </p>
      </div>

      {/* Main Content - Grade + Findings + Transformation */}
      <div className="flex-1 flex items-center justify-center gap-10">

        {/* Left: F Grade + Stats */}
        <div className="flex flex-col items-center">
          <div className="text-xl text-slate-500 uppercase tracking-wide mb-3">Lab Results</div>
          <div className="bg-red-500 w-44 h-44 rounded-3xl flex flex-col items-center justify-center shadow-2xl shadow-red-500/30">
            <span className="text-[7rem] font-black text-white leading-none">{grade}</span>
          </div>
          <div className="text-3xl font-bold text-slate-300 mt-3">
            {score} / 100
          </div>
          {/* Stats from actual run */}
          <div className="flex gap-4 mt-4 text-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-300">{stats.endpoints}</div>
              <div className="text-slate-500">endpoints</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.passed}</div>
              <div className="text-slate-500">passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
              <div className="text-slate-500">failed</div>
            </div>
          </div>
        </div>

        {/* Center: AI Recommendations */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
            <h3 className="text-2xl font-bold text-red-400 uppercase tracking-wide">
              AI-Generated Findings
            </h3>
          </div>

          <div className="space-y-3">
            {topFindings.map((item, i) => (
              <div
                key={i}
                className={`${t.cardBg} rounded-xl border-l-4 border-red-500 p-4`}
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

          {/* AI Remediation Note */}
          <div className={`${t.cardBg} rounded-xl border border-purple-500/30 p-4 mt-4`}>
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <p className="text-xl text-slate-300">
                <span className="text-purple-400 font-semibold">AI includes remediation steps</span>
                {' '}- PowerShell commands, GPO paths, MS docs
              </p>
            </div>
          </div>
        </div>

        {/* Transformation Arrow */}
        <div className="flex flex-col items-center">
          <TrendingUp className="w-10 h-10 text-emerald-400 mb-2" />
          <ArrowRight className="w-8 h-8 text-slate-500" />
        </div>

        {/* Right: A Grade */}
        <div className="flex flex-col items-center">
          <div className="text-xl text-slate-500 uppercase tracking-wide mb-3">After</div>
          <div className="bg-emerald-500 w-44 h-44 rounded-3xl flex flex-col items-center justify-center shadow-2xl shadow-emerald-500/30">
            <span className="text-[7rem] font-black text-white leading-none">A</span>
          </div>
          <div className="text-xl text-slate-400 mt-3">
            ~2 hours of work
          </div>
        </div>
      </div>

      {/* Footer - Key Insight + Demo Setup */}
      <div className="mt-4 text-center">
        <p className="text-2xl text-slate-300 mb-3">
          The point isn't that it failed — the point is that now we <span className="text-emerald-400 font-bold">KNOW</span>.
        </p>
        <p className="text-3xl text-amber-400 font-semibold">
          Want to see this run live? Let's validate these gaps with Atomic Red Team →
        </p>
      </div>
    </div>
  );
};

export default SafeSweepResultsSlide;
