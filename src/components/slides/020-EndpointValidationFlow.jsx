import React from 'react';
import { ArrowDown, Terminal, Database, Brain, FileText, User } from 'lucide-react';

/**
 * Safe Sweep - How It Works
 *
 * Step-by-step workflow matching slide 012's format:
 * Dashed outline boxes grouping steps into INPUT/AI/OUTPUT layers.
 */
const SafeSweepHowItWorksSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-12 py-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          Endpoint Validation Flow
        </h2>
      </div>

      {/* Main Flow with Sandwich Outline Boxes */}
      <div className="flex-1 flex flex-col justify-center gap-3 max-w-6xl mx-auto w-full">

        {/* ═══ INPUT GUARDRAIL OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-2xl p-5">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wide">Input Guardrail</span>
            <span className="text-lg text-amber-400/60 ml-3">deterministic</span>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            {/* Row 1: TRIGGER */}
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-xl font-bold text-emerald-400">1</span>
              </div>
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-6">
                  <Terminal className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div className="text-2xl font-bold text-emerald-400">RMM TRIGGER</div>
                  <div className="text-xl text-slate-400">Rewst calls RMM to run script on endpoints</div>
                </div>
              </div>
            </div>

            {/* Row 2: COLLECT */}
            <div className="flex items-center gap-4">
              <div className="w-16 text-right">
                <span className="text-xl font-bold text-amber-400">2</span>
              </div>
              <div className="flex-1 bg-amber-500/10 border border-amber-500/40 rounded-xl p-4">
                <div className="flex items-center gap-6">
                  <Database className="w-8 h-8 text-amber-400 flex-shrink-0" />
                  <div className="text-2xl font-bold text-amber-400">COLLECT</div>
                  <div className="text-xl text-slate-400">PowerShell runs 60+ checks</div>
                  <div className="text-xl text-amber-300 ml-auto font-mono">→ JSON output</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1">
          <ArrowDown className="w-7 h-7 text-slate-500" />
        </div>

        {/* ═══ AI LAYER OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-purple-500/50 rounded-2xl p-5">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-purple-400 uppercase tracking-wide">AI Layer</span>
            <span className="text-lg text-purple-400/60 ml-3">probabilistic</span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="w-16 text-right">
              <span className="text-xl font-bold text-purple-400">3</span>
            </div>
            <div className="flex-1 bg-purple-500/10 border border-purple-500/40 rounded-xl p-4">
              <div className="flex items-center gap-6">
                <Brain className="w-8 h-8 text-purple-400 flex-shrink-0" />
                <div className="text-2xl font-bold text-purple-400">ANALYZE</div>
                <div className="text-xl text-slate-400">Correlate findings • Grade severity • Explain impact</div>
                <div className="text-xl text-purple-300 ml-auto italic">"LSASS unprotected — credential theft risk"</div>
              </div>
            </div>
          </div>

          {/* Trust callout inside AI box */}
          <div className="mt-3 ml-20 text-lg text-purple-300/70">
            ⚠️ AI processes JSON only. <span className="font-semibold text-purple-300">Never touches endpoints.</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center py-1">
          <ArrowDown className="w-7 h-7 text-slate-500" />
        </div>

        {/* ═══ OUTPUT GUARDRAIL OUTLINE ═══ */}
        <div className="relative border-2 border-dashed border-amber-500/50 rounded-2xl p-5">
          {/* Label */}
          <div className="absolute -top-4 left-8 px-4 bg-slate-900">
            <span className="text-lg font-bold text-amber-400 uppercase tracking-wide">Output Guardrail</span>
            <span className="text-lg text-amber-400/60 ml-3">deterministic</span>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="w-16 text-right">
              <span className="text-xl font-bold text-emerald-400">4</span>
            </div>
            <div className="flex-1 flex gap-4">
              {/* Report */}
              <div className="flex-1 bg-cyan-500/10 border border-cyan-500/40 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">REPORT</div>
                    <div className="text-lg text-slate-400">Graded findings + remediation</div>
                  </div>
                </div>
              </div>
              {/* Human Action */}
              <div className="flex-1 bg-emerald-500/10 border border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <User className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">HUMAN ACTS</div>
                    <div className="text-lg text-slate-400">Review • Approve • Remediate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rewst workflow link */}
        <div className="flex justify-center mt-4">
          <a
            href="https://app.rewst.io/organizations/5b3f70a7-566b-4f4f-9232-0ac2ec41e4e6/workflows/019be802-43d7-7ed5-894e-440f1149e4dd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
            title="Open workflow in Rewst"
          >
            <span className="text-lg text-slate-400">Open workflow in</span>
            <img src="/images/rewst-logo.png" alt="Rewst" className="h-16" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SafeSweepHowItWorksSlide;
