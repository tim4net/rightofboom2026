import React from 'react';

/**
 * Three Words You'll Hear Slide
 * Supporting AI vocabulary: Agentic, Hallucination, Confidence Score
 */
const AIVocabTermsSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-20 py-12">
      {/* Header - with subtitle for consistency */}
      <div className="mb-10">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>Three Words You'll Hear</h2>
        <p className="text-3xl mt-4 text-slate-400">Essential vocabulary for AI security conversations</p>
      </div>

      {/* Three terms - larger gap, refined cards */}
      <div className="flex-1 grid grid-cols-3 gap-10">

        {/* Agentic */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-blue-500/50 flex flex-col">
          <div className="text-blue-400 text-5xl font-black mb-4">Agentic</div>
          <div className="text-2xl text-white mb-6 leading-relaxed">
            AI that takes actions — not just answers questions.
          </div>

          {/* Examples - simplified, no nested box */}
          <div className="mt-auto space-y-4">
            <div className="text-xl text-blue-300 font-semibold uppercase tracking-wide">MSP Examples</div>
            <ul className="text-2xl text-slate-200 space-y-2">
              <li>Disable compromised accounts</li>
              <li>Create tickets automatically</li>
              <li>Execute remediation scripts</li>
            </ul>
          </div>

          <div className="text-2xl text-red-400 mt-6 pt-6 border-t border-slate-700 font-semibold">
            What can it do without asking?
          </div>
        </div>

        {/* Hallucination */}
        <div className="bg-slate-900 rounded-2xl p-8 border-2 border-red-500/50 flex flex-col">
          <div className="text-red-400 text-5xl font-black mb-4">Hallucination</div>
          <div className="text-2xl text-white mb-4 leading-relaxed">
            AI generates false information that sounds plausible.
          </div>
          <div className="text-xl text-slate-400 mb-6 leading-relaxed">
            AI predicts patterns, not retrieves facts. It generates what a correct answer <em>looks like</em> — real or fabricated feels the same.
          </div>

          {/* Examples - simplified */}
          <div className="mt-auto space-y-3">
            <div className="text-xl text-red-300 font-semibold uppercase tracking-wide">Watch For</div>
            <ul className="text-2xl text-slate-200 space-y-1">
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
          <div className="text-2xl text-white mb-4 leading-relaxed">
            How certain a system is about its output.
          </div>

          {/* Comparison */}
          <div className="mt-auto space-y-4">
            <div>
              <div className="text-xl text-emerald-300 font-semibold uppercase tracking-wide mb-1">Classifiers — pick from fixed categories</div>
              <div className="text-xl text-slate-300 mb-1">(spam filters, malware scanners)</div>
              <div className="text-xl text-slate-200">Validated against real outcomes. "95%" = 95/100 like this actually were.</div>
            </div>
            <div>
              <div className="text-xl text-red-400 font-semibold uppercase tracking-wide mb-1">LLMs — generate text word-by-word</div>
              <div className="text-xl text-slate-300 mb-1">(ChatGPT, Copilot)</div>
              <div className="text-xl text-slate-200">"I'm 90% sure" is mimicking human speech — no calculation behind it.</div>
            </div>
          </div>

          <div className="text-2xl text-amber-400 mt-5 pt-5 border-t border-slate-700 font-semibold">
            Spam filter's 95% is math. ChatGPT's 95% is vibes.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIVocabTermsSlide;
