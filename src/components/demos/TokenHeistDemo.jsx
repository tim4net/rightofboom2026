import React, { useState, useEffect } from 'react';

// ============================================================================
// TOKEN HEIST DEMO - Real-time MFA bypass visualization
// ============================================================================
export const TokenHeistDemo = ({ theme }) => {
  const [stage, setStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stages = [
    { label: "Victim clicks phishing link", icon: "📧", duration: 2000 },
    { label: "Evilginx proxy intercepts login", icon: "🕸️", duration: 2500 },
    { label: "Real Microsoft login displayed", icon: "🔐", duration: 2000 },
    { label: "User enters credentials + MFA", icon: "📱", duration: 3000 },
    { label: "Session token captured!", icon: "🎣", duration: 1500 },
    { label: "Attacker imports token", icon: "💀", duration: 2000 },
    { label: "Full mailbox access granted", icon: "📬", duration: 1000 },
  ];

  useEffect(() => {
    if (isRunning && stage < stages.length) {
      const timer = setTimeout(() => {
        setStage(s => s + 1);
      }, stages[stage]?.duration || 1000);
      return () => clearTimeout(timer);
    }
    if (stage >= stages.length) {
      setIsRunning(false);
    }
  }, [isRunning, stage]);

  const reset = () => {
    setStage(0);
    setIsRunning(false);
  };

  return (
    <div className="w-full max-w-[85vw] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-bold text-red-500">Token Heist: MFA Bypass</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 font-bold"
          >
            {stage === 0 ? 'Start Attack' : 'Running...'}
          </button>
          <button onClick={reset} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600">
            Reset
          </button>
        </div>
      </div>

      {/* Attack flow */}
      <div className="relative">
        {/* Connection lines */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2" />

        <div className="relative flex justify-between">
          {stages.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center transition-all duration-500 ${
                stage > i ? 'opacity-100' : stage === i ? 'opacity-100 scale-110' : 'opacity-30'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2 border-2 transition-all ${
                  stage > i
                    ? 'bg-red-600 border-red-500'
                    : stage === i
                    ? 'bg-yellow-600 border-yellow-500 animate-pulse'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                {s.icon}
              </div>
              <div className={`text-xs text-center max-w-[80px] ${stage >= i ? 'text-white' : 'text-slate-600'}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {stage >= stages.length && (
        <div className="mt-8 p-6 bg-red-950/50 rounded-xl border border-red-500 text-center animate-in zoom-in">
          <div className="text-4xl mb-2">💀</div>
          <div className="text-red-500 font-bold text-xl">MFA BYPASSED</div>
          <div className="text-slate-400 text-sm mt-1">Total time: ~12 seconds</div>
          <div className="text-slate-500 text-xs mt-2">User never knew. MFA never triggered on attacker's session.</div>
        </div>
      )}
    </div>
  );
};
