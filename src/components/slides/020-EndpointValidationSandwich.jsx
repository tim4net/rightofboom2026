import React from 'react';
import {
  Terminal, Brain, User,
  ArrowDown, ShieldCheck
} from 'lucide-react';

/**
 * The Guardrail Sandwich in Action Slide
 *
 * RESTRUCTURED: Previously "Safe Sweep: How It Works" (3-step workflow with time comparison).
 * Now shows how Safe Sweep implements the guardrail sandwich architecture from slide 008.
 *
 * 3-layer horizontal stack matching the visual language of slide 008:
 * INPUT: PowerShell → 60+ checks → JSON
 * AI: Claude/GPT → correlate, prioritize → graded report
 * OUTPUT: Human → review, approve → action
 *
 * Key message: "PowerShell detects. AI explains. Human acts."
 */
const GuardrailSandwichInActionSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-5xl font-black mb-3 ${t.textOnPage}`}>
          The Guardrail Sandwich in Action
        </h2>
        <p className="text-3xl font-medium">
          <span className="text-amber-400">PowerShell detects.</span>
          <span className="text-slate-500 mx-2">→</span>
          <span className="text-red-400">AI explains.</span>
          <span className="text-slate-500 mx-2">→</span>
          <span className="text-emerald-400">Human acts.</span>
        </p>
      </div>

      {/* The Sandwich Stack */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full gap-4">

        {/* Input Layer - Deterministic PowerShell */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 p-3 rounded-xl">
                <Terminal className="w-10 h-10 text-amber-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">
                  INPUT: PowerShell Detection
                </div>
                <div className="text-xl text-slate-400 mt-1">
                  Deterministic • Read-only • No AI involved
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl text-slate-500">60+ checks → JSON output</div>
              <div className="text-xl text-amber-400 font-semibold">Every endpoint, every time</div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* AI Core - Explanation Layer (red = probabilistic, matches slide 008) */}
        <div className="w-full bg-red-500/10 border-2 border-red-500/40 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 p-3 rounded-xl">
                <Brain className="w-10 h-10 text-red-400" />
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400">
                  AI: Correlation & Prioritization
                </div>
                <div className="text-xl text-slate-400 mt-1">
                  Claude/GPT analyzes JSON • Grades severity • Explains findings
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl text-slate-500">Processes structured data only</div>
              <div className="text-xl text-red-400 font-semibold">Never touches endpoint</div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <ArrowDown className="w-8 h-8 text-slate-600" />

        {/* Output Layer - Human Action */}
        <div className="w-full bg-emerald-500/10 border-2 border-emerald-500/40 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500/20 p-3 rounded-xl">
                <User className="w-10 h-10 text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400">
                  OUTPUT: Human Review & Action
                </div>
                <div className="text-xl text-slate-400 mt-1">
                  Graded report • Remediation steps • Approve before execution
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl text-slate-500">Review findings</div>
              <div className="text-xl text-emerald-400 font-semibold">Human remains in control</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Callout */}
      <div className="flex justify-center mt-6 mb-4">
        <div className={`${t.cardBg} px-8 py-4 rounded-xl border-2 border-emerald-500/40 flex items-center gap-4`}>
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <span className="text-3xl text-emerald-400 font-bold">No AI touches the endpoint</span>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center">
        <p className="text-3xl">
          <span className="text-amber-400 font-bold">PowerShell detects.</span>
          <span className="text-slate-600 mx-3">|</span>
          <span className="text-purple-400 font-bold">AI explains.</span>
          <span className="text-slate-600 mx-3">|</span>
          <span className="text-emerald-400 font-bold">Human acts.</span>
        </p>
      </div>
    </div>
  );
};

export default GuardrailSandwichInActionSlide;
