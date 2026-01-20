import React, { useState, useEffect, useRef } from 'react';

// ============================================================================
// Attack Planner Demo - AI generates attack playbook with visible thinking
// ============================================================================
export const AttackPlannerDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, recon, thinking, complete
  const [target, setTarget] = useState('acmecorp.com');
  const [recon, setRecon] = useState(null);
  const [thinking, setThinking] = useState('');
  const [plan, setPlan] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  const thinkingRef = useRef(null);

  // Check demo mode on mount
  useEffect(() => {
    fetch('/api/demo/mode')
      .then(r => r.json())
      .then(data => setDemoMode(data.demoMode))
      .catch(() => {});
  }, []);

  // Auto-scroll thinking output
  useEffect(() => {
    if (thinkingRef.current) {
      thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight;
    }
  }, [thinking]);

  // Fetch reconnaissance data
  const fetchRecon = async () => {
    setPhase('recon');
    setRecon(null);
    setThinking('');
    setPlan(null);

    const useDemoEndpoint = demoMode || usedFallback;

    try {
      const endpoint = useDemoEndpoint ? '/api/demo/recon' : `/api/recon/${target}`;
      const response = await fetch(endpoint);

      if (!response.ok) throw new Error('Recon failed');

      const data = await response.json();
      setRecon(data);
      return data;
    } catch (e) {
      console.error('Recon error:', e);
      if (!useDemoEndpoint) {
        setUsedFallback(true);
        // Retry with demo endpoint
        const response = await fetch('/api/demo/recon');
        const data = await response.json();
        setRecon(data);
        return data;
      }
      return null;
    }
  };

  // Generate attack plan with streaming
  const generatePlan = async (reconData) => {
    if (!reconData) return;

    setPhase('thinking');
    setThinking('');
    setPlan(null);

    const useDemoEndpoint = demoMode || usedFallback;
    const endpoint = useDemoEndpoint ? '/api/demo/attack-plan' : '/api/attack-plan/stream';

    const controller = new AbortController();
    let timeoutId = null;

    // Fallback on timeout for live mode
    if (!useDemoEndpoint) {
      timeoutId = setTimeout(() => {
        controller.abort();
        setUsedFallback(true);
        runDemoPlan();
      }, 15000);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: target, recon: reconData }),
        signal: controller.signal
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === 'thinking') {
              setThinking(prev => prev + event.text);
            } else if (event.type === 'status') {
              setThinking(prev => prev + `\n[${event.message}]\n`);
            } else if (event.type === 'complete') {
              if (timeoutId) clearTimeout(timeoutId);
              setPlan(event.plan);
              setPhase('complete');
            } else if (event.type === 'error') {
              setThinking(prev => prev + `\nError: ${event.message}\n`);
            }
          } catch (e) {
            // Skip
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') return;
      console.error('Plan generation error:', e);
      if (timeoutId) clearTimeout(timeoutId);
      if (!useDemoEndpoint) {
        setUsedFallback(true);
        runDemoPlan();
      }
    }
  };

  // Run demo plan (fallback)
  const runDemoPlan = async () => {
    setThinking('');

    try {
      const response = await fetch('/api/demo/attack-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: target })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === 'thinking') {
              setThinking(prev => prev + event.text);
            } else if (event.type === 'status') {
              setThinking(prev => prev + `\n[${event.message}]\n`);
            } else if (event.type === 'complete') {
              setPlan(event.plan);
              setPhase('complete');
            }
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error('Demo plan error:', e);
    }
  };

  // Start the full workflow
  const startDemo = async () => {
    const reconData = await fetchRecon();
    if (reconData) {
      await generatePlan(reconData);
    }
  };

  // Reset
  const reset = () => {
    setPhase('idle');
    setRecon(null);
    setThinking('');
    setPlan(null);
    setUsedFallback(false);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'critical': return 'bg-red-500/30 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/30 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/30 text-yellow-400 border-yellow-500/50';
      case 'low': return 'bg-green-500/30 text-green-400 border-green-500/50';
      default: return 'bg-slate-500/30 text-slate-400 border-slate-500/50';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Demo mode indicator */}
      {(demoMode || usedFallback) && (
        <div className="absolute top-0 right-0 flex items-center gap-1 text-xs opacity-30 hover:opacity-80 transition-opacity">
          <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-purple-500' : 'bg-yellow-500'}`}></span>
          <span className="text-slate-500 font-mono">{demoMode ? 'DEMO' : 'FALLBACK'}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-3xl md:text-4xl font-black mb-2 ${theme.textOnPage}`}>
          AI Attack Planner
        </h2>
        <p className={`text-lg ${theme.accentColor}`}>
          Watch AI analyze a target and generate a complete attack playbook
        </p>
      </div>

      {/* Target Input */}
      {phase === 'idle' && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Target:</span>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white font-mono focus:border-cyan-500 focus:outline-none"
              placeholder="domain.com"
            />
          </div>
          <button
            onClick={startDemo}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <span>🎯</span> Generate Attack Plan
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-4 h-[600px]">
        {/* Left: AI Thinking */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-purple-900/20">
            <div className="flex items-center gap-2">
              <span className="text-purple-400">🧠</span>
              <span className="font-bold text-purple-300">AI THINKING</span>
            </div>
            {phase === 'thinking' && (
              <span className="text-xs text-purple-400 animate-pulse">Processing...</span>
            )}
          </div>

          <div
            ref={thinkingRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-slate-950"
          >
            {phase === 'idle' && (
              <div className="text-slate-500 text-center mt-20">
                Click "Generate Attack Plan" to begin
              </div>
            )}

            {phase === 'recon' && (
              <div className="text-cyan-400 animate-pulse">
                Gathering reconnaissance data for {target}...
              </div>
            )}

            {(phase === 'thinking' || phase === 'complete') && thinking && (
              <pre className="whitespace-pre-wrap text-green-400">{thinking}</pre>
            )}
          </div>
        </div>

        {/* Right: Attack Plan */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-red-900/20">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚔️</span>
              <span className="font-bold text-red-300">ATTACK PLAYBOOK</span>
            </div>
            {plan && (
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                plan.riskScore >= 80 ? 'bg-red-500/30 text-red-400' :
                plan.riskScore >= 60 ? 'bg-orange-500/30 text-orange-400' :
                'bg-yellow-500/30 text-yellow-400'
              }`}>
                Risk Score: {plan.riskScore}/100
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!plan && phase !== 'complete' && (
              <div className="text-slate-500 text-center mt-20">
                {phase === 'idle' ? 'Attack plan will appear here' : 'Generating attack plan...'}
              </div>
            )}

            {plan && (
              <div className="space-y-4">
                {/* Summary */}
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">Attack Summary</div>
                  <div className="text-slate-200">{plan.summary}</div>
                  <div className="text-xs text-slate-500 mt-1">Estimated time: {plan.totalTime}</div>
                </div>

                {/* Phases */}
                <div className="space-y-3">
                  {plan.phases?.map((p, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${getRiskColor(p.risk)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-slate-200">
                            Phase {p.id}: {p.name}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold uppercase ${getRiskColor(p.risk)}`}>
                            {p.risk}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">{p.duration}</span>
                      </div>

                      <div className="text-sm text-slate-300 mb-2">{p.description}</div>

                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-cyan-400 font-mono">
                          {p.mitreId}
                        </span>
                        <span className="text-slate-500">{p.mitreName}</span>
                      </div>

                      {p.tools?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.tools.map((tool, j) => (
                            <span key={j} className="px-1.5 py-0.5 bg-slate-800 rounded text-xs text-slate-400">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Priority Defenses */}
                {plan.priorityDefenses?.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-bold text-blue-400 mb-2">🛡️ Priority Defenses</div>
                    <div className="space-y-2">
                      {plan.priorityDefenses.slice(0, 5).map((def, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 bg-blue-900/20 rounded text-sm border border-blue-700/30">
                          <span className="px-1.5 py-0.5 bg-blue-500/30 text-blue-400 rounded text-xs font-bold">
                            P{def.priority}
                          </span>
                          <div>
                            <div className="text-slate-200">{def.action}</div>
                            <div className="text-slate-500 text-xs">{def.rationale}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      {phase === 'complete' && (
        <div className="mt-4 text-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
          >
            Reset Demo
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-slate-500">
        AI analyzes target reconnaissance to generate realistic attack playbook with MITRE ATT&CK mappings
      </div>
    </div>
  );
};
