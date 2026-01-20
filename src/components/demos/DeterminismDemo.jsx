import React, { useState, useEffect } from 'react';

// ============================================================================
// DETERMINISM DEMO - Visualizing deterministic vs probabilistic decision-making
// ============================================================================
export const DeterminismDemo = ({ theme }) => {
  const [scenario, setScenario] = useState(0);
  const [showAI, setShowAI] = useState(false);

  const scenarios = [
    {
      name: "Login Attempt",
      inputDisplay: [
        { key: "user", value: "jsmith@contoso.com" },
        { key: "ip", value: "185.243.115.42", highlight: true },
        { key: "mfa", value: "false", highlight: true },
      ],
      deterministic: [
        { check: "MFA completed?", result: false, icon: "✗" },
        { check: "IP in blocklist?", result: true, icon: "✗" },
      ],
      deterministicResult: { action: "BLOCK", reason: "Failed MFA + Blocked IP", color: "red" },
      probabilistic: {
        confidence: 0,
        reasoning: "Deterministic gate blocked - AI never invoked",
        note: "No compute wasted"
      }
    },
    {
      name: "Impossible Travel",
      inputDisplay: [
        { key: "user", value: "ceo@contoso.com" },
        { key: "location", value: "Lagos, Nigeria", highlight: true },
        { key: "mfa", value: "true" },
      ],
      deterministic: [
        { check: "MFA completed?", result: true, icon: "✓" },
        { check: "IP in blocklist?", result: false, icon: "✓" },
      ],
      deterministicResult: { action: "PASS TO AI", reason: "All gates passed", color: "yellow" },
      probabilistic: {
        confidence: 87,
        reasoning: "Found 'Lagos Conference' calendar event. Travel approved.",
        decision: "ALLOW",
        note: "Context = expected travel"
      }
    },
    {
      name: "Session Anomaly",
      inputDisplay: [
        { key: "user", value: "admin@contoso.com" },
        { key: "location", value: "Office VPN" },
        { key: "mfa", value: "true" },
      ],
      deterministic: [
        { check: "MFA completed?", result: true, icon: "✓" },
        { check: "IP in blocklist?", result: false, icon: "✓" },
      ],
      deterministicResult: { action: "PASS TO AI", reason: "All gates passed", color: "yellow" },
      probabilistic: {
        confidence: 94,
        reasoning: "47 mailbox rules in 2 min. Pattern matches BEC attack.",
        decision: "BLOCK + REVOKE",
        note: "AI detects what rules cannot"
      }
    }
  ];

  const current = scenarios[scenario];

  useEffect(() => {
    setShowAI(false);
    if (current.deterministicResult.action === "PASS TO AI") {
      const timer = setTimeout(() => setShowAI(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [scenario]);

  return (
    <div className="w-full max-w-[85vw] mx-auto px-8">
      {/* Scenario Selector - Pill tabs */}
      <div className="flex justify-center gap-4 mb-10">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => setScenario(i)}
            className={`px-8 py-3 rounded-full text-2xl font-bold transition-all ${
              scenario === i
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Input Display - Compact key-value format */}
      <div className="bg-slate-900/80 rounded-2xl px-8 py-5 mb-10 border border-slate-700 font-mono text-xl relative z-10">
        <span className="text-slate-500">Request: </span>
        {current.inputDisplay.map((item, i) => (
          <span key={i}>
            <span className="text-slate-400">{item.key}=</span>
            <span className={item.highlight ? 'text-yellow-400 font-bold' : 'text-green-400'}>
              {item.value}
            </span>
            {i < current.inputDisplay.length - 1 && <span className="text-slate-600"> | </span>}
          </span>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-10">
        {/* Deterministic Side */}
        <div className="bg-slate-900/60 rounded-3xl p-8 border-2 border-amber-500/60">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 text-3xl">⚡</div>
            <div>
              <h4 className="font-bold text-amber-400 text-3xl">DETERMINISTIC</h4>
              <p className="text-slate-400 text-lg">Binary Logic - Instant - Predictable</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {current.deterministic.map((check, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-5 rounded-xl border-2 ${
                  check.result
                    ? 'bg-green-950/40 border-green-500/40'
                    : 'bg-red-950/40 border-red-500/40'
                }`}
              >
                <span className="text-slate-200 text-2xl">{check.check}</span>
                <span className={`font-bold text-3xl ${check.result ? 'text-green-400' : 'text-red-400'}`}>
                  {check.icon}
                </span>
              </div>
            ))}
          </div>

          {/* Decision Badge - centered */}
          <div className="flex justify-center">
            <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold ${
              current.deterministicResult.color === 'red' ? 'bg-red-600/90' :
              current.deterministicResult.color === 'green' ? 'bg-green-600/90' :
              'bg-yellow-600/90'
            }`}>
              <span className="text-3xl">{current.deterministicResult.action}</span>
            </div>
          </div>
          <p className="text-center text-slate-400 text-lg mt-3">{current.deterministicResult.reason}</p>
        </div>

        {/* Probabilistic Side */}
        <div className={`bg-slate-900/60 rounded-3xl p-8 border-2 transition-all duration-500 relative ${
          showAI ? 'border-purple-500/60' : 'border-slate-600/60'
        }`}>
          {/* "Not Used" label when blocked */}
          {!showAI && current.deterministicResult.action === "BLOCK" && (
            <div className="absolute top-4 right-4 bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-lg font-medium">
              Not Used
            </div>
          )}

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-3xl">🧠</div>
            <div>
              <h4 className="font-bold text-purple-400 text-3xl">PROBABILISTIC</h4>
              <p className="text-slate-400 text-lg">AI Reasoning - Context-Aware</p>
            </div>
          </div>

          {!showAI && current.deterministicResult.action === "BLOCK" ? (
            <div className="h-56 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <div className="text-5xl mb-4">🚫</div>
                <div className="text-2xl">Deterministic gate blocked</div>
                <div className="text-xl mt-2">AI not invoked</div>
              </div>
            </div>
          ) : !showAI ? (
            <div className="h-56 flex items-center justify-center">
              <div className="text-center text-purple-400">
                <div className="text-4xl animate-pulse mb-4">🧠</div>
                <div className="text-2xl">AI Reasoning...</div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="mb-6">
                <div className="text-slate-400 text-lg mb-2">Confidence</div>
                <div className="h-6 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-1000"
                    style={{ width: `${current.probabilistic.confidence}%` }}
                  />
                </div>
                <div className="text-right text-purple-400 font-bold text-2xl mt-1">{current.probabilistic.confidence}%</div>
              </div>

              <div className="bg-black/40 rounded-xl p-5 mb-6 font-mono text-lg text-slate-300">
                {current.probabilistic.reasoning}
              </div>

              {current.probabilistic.decision && (
                <div className="flex justify-center">
                  <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold ${
                    current.probabilistic.decision.includes('BLOCK') ? 'bg-red-600/90' : 'bg-green-600/90'
                  }`}>
                    <span className="text-3xl">{current.probabilistic.decision}</span>
                  </div>
                </div>
              )}
              {current.probabilistic.note && (
                <p className="text-center text-slate-400 text-lg mt-3">{current.probabilistic.note}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom insight - single line */}
      <div className="mt-10 text-center text-xl">
        <span className="text-amber-400 font-semibold">Deterministic</span>
        <span className="text-slate-500"> = testable + instant</span>
        <span className="text-slate-600 mx-4">|</span>
        <span className="text-purple-400 font-semibold">Probabilistic</span>
        <span className="text-slate-500"> = context + reasoning</span>
      </div>
    </div>
  );
};
