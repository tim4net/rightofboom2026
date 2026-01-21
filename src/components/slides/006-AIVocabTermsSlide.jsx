import React from 'react';

/**
 * Three Words You'll Hear Slide
 *
 * Core AI vocabulary for MSPs:
 * - Agentic: AI that takes actions, not just answers
 * - Hallucination: AI generates plausible-sounding false info
 * - Confidence: Why LLM self-assessment differs from statistical confidence
 *   (includes what LLMs are good at vs struggle with)
 */
const AIVocabTermsSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-20 py-12">
      {/* Header - with subtitle for consistency */}
      <div className="mb-10">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>Three Words You'll Hear</h2>
      </div>

      {/* Three terms - larger gap, refined cards */}
      <div className="flex-1 grid grid-cols-3 gap-10">

        {/* Agentic */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-blue-500/50 flex flex-col">
          <div className="text-blue-400 text-5xl font-black mb-4">Agentic</div>
          <div className="text-2xl text-white mb-6 leading-relaxed">
            AI that takes actions — not just answers questions.
          </div>

          {/* Middle section - fixed height so headings align */}
          <div className="mt-auto min-h-[180px] space-y-3">
            <div className="text-2xl text-blue-300 font-semibold uppercase tracking-wide">MSP Examples</div>
            <ul className="text-2xl text-slate-200 space-y-1 pl-4">
              <li>Disable compromised accounts</li>
              <li>Create tickets automatically</li>
              <li>Execute remediation scripts</li>
            </ul>
          </div>

          <div className="text-2xl text-amber-400 mt-5 pt-5 border-t border-slate-700 font-semibold">
            What can it do without asking?
          </div>
        </div>

        {/* Hallucination */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-red-500/50 flex flex-col">
          <div className="text-red-400 text-5xl font-black mb-4">Hallucination</div>
          <div className="text-2xl text-white mb-6 leading-relaxed">
            AI generates false information that sounds plausible.
          </div>

          {/* Middle section - fixed height so headings align */}
          <div className="mt-auto min-h-[180px] space-y-3">
            <div className="text-2xl text-red-300 font-semibold uppercase tracking-wide">Watch For</div>
            <ul className="text-2xl text-slate-200 space-y-1 pl-4">
              <li>"Patched in v3.2" — it wasn't</li>
              <li>Invented documentation links</li>
              <li>Fabricated remediation steps</li>
            </ul>
          </div>

          <div className="text-2xl text-amber-400 mt-5 pt-5 border-t border-slate-700 font-semibold">
            Always verify against sources
          </div>
        </div>

        {/* Confidence */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-emerald-500/50 flex flex-col">
          <div className="text-emerald-400 text-5xl font-black mb-4">Confidence</div>
          <div className="text-2xl text-white mb-6 leading-relaxed">
            How certain a system is about its output.
          </div>

          {/* Middle section - fixed height so headings align */}
          <div className="mt-auto min-h-[180px] space-y-3">
            <div className="text-2xl text-emerald-300 font-semibold uppercase tracking-wide">The Catch</div>
            <ul className="text-2xl text-slate-200 space-y-1 pl-4">
              <li>Spam filter 95% = real math</li>
              <li>LLM 95% = how text sounds</li>
              <li><span className="text-emerald-400">Good:</span> synthesis, explanation</li>
              <li><span className="text-red-400">Not:</span> factual confidence</li>
            </ul>
          </div>

          <div className="text-2xl text-amber-400 mt-5 pt-5 border-t border-slate-700 font-semibold">
            Let code measure. AI explains.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIVocabTermsSlide;
