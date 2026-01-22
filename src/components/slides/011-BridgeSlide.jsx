import React from 'react';

/**
 * BridgeSlide - "The Defender's Edge"
 *
 * Core teaching point: Defenders have ground truth. Attackers don't.
 * That's what makes the guardrail sandwich actually work.
 *
 * This slide bridges from the Sandwich architecture (slides 7-8)
 * to Part 2: Defensive Automation demos.
 *
 * Design: Two-column comparison with "GROUND TRUTH" as the visual hero.
 * Typography optimized for 30+ foot viewing.
 */
const BridgeSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col px-16 py-10">
      {/* Header - The core insight as headline */}
      <div className="text-center mb-8">
        <h2 className={`text-6xl md:text-7xl font-black ${t.textOnPage} mb-3`}>
          Why the Sandwich <span className="text-emerald-400">Works</span>
        </h2>
        <p className="text-3xl text-slate-400">
          You have something attackers must work hard to match
        </p>
      </div>

      {/* Main content: Two-column comparison */}
      <div className="flex-1 flex gap-8 max-w-6xl mx-auto w-full">

        {/* ATTACKERS column - muted, disadvantaged */}
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-red-400/80 tracking-wider">
              ATTACKERS HAVE
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            {[
              { text: "Speed", detail: "automated at scale" },
              { text: "Surprise", detail: "pick time & place" },
              { text: "AI-generated attacks", detail: "infinite variations" },
              { text: "Recon tools", detail: "probe from outside" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5"
              >
                <div className="text-2xl font-semibold text-slate-200">{item.text}</div>
                <div className="text-2xl text-slate-400 mt-1">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* VS divider - minimal */}
        <div className="flex flex-col items-center justify-center px-4">
          <div className="w-px h-16 bg-slate-700" />
          <div className="text-2xl font-bold text-slate-600 py-4">vs</div>
          <div className="w-px flex-1 bg-slate-700" />
        </div>

        {/* DEFENDERS column - bright, advantaged */}
        <div className="flex-1 flex flex-col">
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-emerald-400 tracking-wider">
              YOU HAVE
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            {[
              {
                text: "Ground truth",
                detail: "your configs, your reality",
                highlight: true
              },
              { text: "Baselines", detail: "what normal looks like" },
              { text: "Logs", detail: "observable behavior" },
              { text: "Access to verify", detail: "check anything, anytime" },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 ${
                  item.highlight
                    ? 'bg-emerald-500/20 border-2 border-emerald-500/60 ring-2 ring-emerald-500/20'
                    : 'bg-emerald-500/10 border border-emerald-500/40'
                }`}
              >
                <div className={`text-2xl font-bold ${
                  item.highlight ? 'text-emerald-300' : 'text-emerald-400'
                }`}>
                  {item.text}
                </div>
                <div className={`text-2xl mt-1 ${
                  item.highlight ? 'text-emerald-400/80' : 'text-emerald-500/70'
                }`}>
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bridge statement - setup for demos */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-slate-800/60 border border-emerald-500/30 rounded-2xl px-10 py-6">
          <p className="text-2xl md:text-3xl text-slate-200">
            Every demo you're about to see exploits one thing:
          </p>
          <p className="text-3xl md:text-4xl font-bold text-emerald-400 mt-3">
            You can verify every AI decision against your environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BridgeSlide;
