import React from 'react';

/**
 * AI Risk Tension Slide
 *
 * Sets up the central tension: adopting AI is risky, but NOT adopting is also risky.
 * Creates narrative tension that the Guardrail Sandwich resolves later.
 *
 * Design: Angled columns create visual collision. Same danger color for both
 * sides emphasizes that BOTH paths lead to problems. Footer is the hero
 * with the resolution.
 */
const AIRiskTensionSlide = ({ theme: t }) => {
  // Tightened to 3 per side - MSP-specific and concrete
  const adoptRisks = [
    "Hallucinated fixes pushed to production",
    "Autonomous changes across client tenants",
    "Client secrets sent to third-party models"
  ];

  const avoidRisks = [
    "Clients ask about AI — you need answers, not trepidation",
    "Can't be the expert if you're not practicing",
    "Early adopters already have the edge"
  ];

  return (
    <div className="w-full h-full flex flex-col px-12 py-10">
      {/* Header - Bigger, tension in the word "Dilemma" */}
      <div className="text-center mb-8">
        <h2 className="text-7xl font-black text-white mb-4">
          The AI <span className="text-red-400">Dilemma</span>
        </h2>
        <p className="text-3xl text-slate-400 italic">
          Attackers are already using it. You can't ignore it. You can't trust it blindly.
        </p>
      </div>

      {/* Risk Columns - Angled inward for visual tension */}
      <div className="flex-1 flex items-center justify-center gap-8">
        {/* Left: Adopting Risk - solid danger */}
        <div className="flex-1 max-w-2xl transform rotate-1 origin-bottom-right">
          <div className="bg-red-950/40 border-2 border-red-500/70 rounded-2xl p-12">
            <div className="text-3xl font-bold text-red-400 uppercase tracking-wider mb-8">
              Adopt Without Guardrails
            </div>
            <ul className="space-y-6">
              {adoptRisks.map((risk, i) => (
                <li key={i} className="flex items-center gap-5">
                  <div className="w-4 h-4 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-3xl text-white font-medium">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center - Collision zone (minimal, just a slash) */}
        <div className="flex flex-col items-center justify-center px-4">
          <div className="text-7xl font-black text-red-500/40">
            /
          </div>
        </div>

        {/* Right: Avoiding Risk - dashed border (danger approaching) */}
        <div className="flex-1 max-w-2xl transform -rotate-1 origin-bottom-left">
          <div className="bg-red-950/20 border-2 border-dashed border-red-500/50 rounded-2xl p-12">
            <div className="text-3xl font-bold text-red-300/80 uppercase tracking-wider mb-8">
              Wait and See
            </div>
            <ul className="space-y-6">
              {avoidRisks.map((risk, i) => (
                <li key={i} className="flex items-center gap-5">
                  <div className="w-4 h-4 rounded-full bg-red-400/60 flex-shrink-0" />
                  <span className="text-3xl text-slate-200">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer - The Resolution (HERO of the slide) */}
      {/* <div className="mt-8">
        <div className={`${t.cardBg} border-t-2 border-b-2 border-emerald-500/60 py-8`}>
          <p className="text-3xl text-center mb-3">
            <span className="text-slate-500">The answer isn't </span>
            <span className="text-red-400 font-bold line-through decoration-2 decoration-red-600/70">avoid AI</span>
            <span className="text-slate-500"> or </span>
            <span className="text-red-400 font-bold line-through decoration-2 decoration-red-600/70">trust AI blindly</span>
          </p>
          <p className="text-5xl font-black text-center">
            <span className="text-slate-300">It's </span>
            <span className={`${t.accentColor} tracking-wide`}>HARNESS AI</span>
            <span className="text-slate-400"> — with guardrails.</span>
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default AIRiskTensionSlide;
