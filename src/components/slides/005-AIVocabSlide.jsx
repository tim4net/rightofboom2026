import React from 'react';

/**
 * Two Types of Logic Slide
 * Foundation for understanding the Guardrail Sandwich
 * Deterministic vs Probabilistic - the core distinction
 */
const AIVocabSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-20 py-12">
      {/* Header - more breathing room */}
      <div className="mb-32">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>Two Types of Logic</h2>
      </div>

  
      {/* Two columns - increased gap, better proportions */}
      <div className="flex-1 grid grid-cols-2 gap-32">

        {/* Deterministic */}
        <div className="flex flex-col">
          <div className="text-amber-400 text-6xl font-black mb-6 tracking-tight">Deterministic</div>
          <div className="text-3xl text-white mb-6 leading-snug">
            Same input, same output.<br />Every time.
          </div>

          {/* Code example - stronger visual treatment */}
          <div className="bg-slate-800 rounded-2xl p-8 border-l-8 border-amber-500">
            <div className="text-2xl text-slate-200 mb-4">Traditional code. Firewall rules. If-then logic.</div>
            <code className="text-2xl text-amber-300 font-mono block">
              if (IP in blocklist) → block
            </code>
          </div>

          {/* Outcome - better label contrast */}
          <div className="mt-auto pt-8">
            <div className="text-2xl text-slate-400 uppercase tracking-widest mb-3 font-semibold">You get</div>
            <div className="text-3xl text-white font-medium">Predictability. Auditability. Compliance.</div>
          </div>
        </div>

        {/* Probabilistic */}
        <div className="flex flex-col">
          <div className="text-purple-400 text-6xl font-black mb-6 tracking-tight">Probabilistic</div>
          <div className="text-3xl text-white mb-6 leading-snug">
            Deals in likelihood,<br />not certainty.
          </div>

          {/* Code example - stronger visual treatment */}
          <div className="bg-slate-800 rounded-2xl p-8 border-l-8 border-purple-500">
            <div className="text-2xl text-slate-200 mb-4">Machine learning. Statistical inference. Patterns.</div>
            <code className="text-2xl text-purple-300 font-mono block">
              phishing_score: 0.94
            </code>
          </div>

          {/* Outcome - better label contrast */}
          <div className="mt-auto pt-8">
            <div className="text-2xl text-slate-400 uppercase tracking-widest mb-3 font-semibold">You get</div>
            <div className="text-3xl text-white font-medium">Flexibility. Novel threat detection. Scale.</div>
          </div>
        </div>

      </div>

      {/* Footer insight - split for better line rhythm */}
      <div className={`pt-8 mt-6 border-t-2 ${t.cardBorder}`}>
        <div className="text-3xl">
          <span className="text-purple-400 font-bold">AI is probabilistic</span>
          <span className={t.textOnPage}> — it predicts, sometimes brilliantly, sometimes confidently wrong.</span>
        </div>
        <div className="text-3xl mt-2">
          <span className={t.textOnPageMuted}>That's why we wrap it in</span>{' '}
          <span className="text-amber-400 font-bold">deterministic guardrails.</span>
        </div>
      </div>
    </div>
  );
};

export default AIVocabSlide;
