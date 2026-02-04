import React from 'react';

/**
 * The Guardrail Sandwich Slide
 * Clean visual: deterministic guards wrap probabilistic AI
 */
const SandwichSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-12">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className={`text-7xl font-black ${t.textOnPage}`}>
          The Guardrail Sandwich
        </h2>
      </div>

      {/* Tagline */}
      <div className="text-center mb-10">
        <p className="text-3xl">
          <span className="text-amber-400 font-semibold">Deterministic</span>
          <span className="text-slate-500 mx-2">→</span>
          <span className="text-red-400 font-semibold">Probabilistic</span>
          <span className="text-slate-500 mx-2">→</span>
          <span className="text-amber-400 font-semibold">Deterministic</span>
        </p>
      </div>

      {/* The Stack */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-4">

        {/* Input Guards */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              INPUT GUARDS
            </div>
            <div className="text-2xl text-slate-400">
              Schema validation • Rate limiting • Source authentication
            </div>
          </div>
        </div>

        {/* AI Core - visually dominant */}
        <div className="w-full bg-red-500/10 border-2 border-red-500/40 rounded-xl p-10">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-400 mb-3">
              AI REASONING
            </div>
            <div className="text-2xl text-slate-400">
              Pattern recognition • Contextual judgment • Intent interpretation
            </div>
          </div>
        </div>

        {/* Output Guards */}
        <div className="w-full bg-amber-500/10 border-2 border-amber-500/40 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              OUTPUT GUARDS
            </div>
            <div className="text-2xl text-slate-400">
              Action allowlists • Confidence thresholds • Human gates
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-2xl text-slate-500">
          Wrap probabilistic AI in deterministic boundaries
        </p>
      </div>
    </div>
  );
};

export default SandwichSlide;
