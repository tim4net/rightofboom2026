import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Shield, Loader2, Zap } from 'lucide-react';

// ============================================================================
// LIVE ATTACK DEMO - Split-screen attacker vs defender visualization
// Uses the Docker infrastructure with vulnerable app and SIEM
// ============================================================================
export const LiveAttackDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, running, complete, analyzing, analyzed
  const [attackEvents, setAttackEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [stats, setStats] = useState({ actions: 0, successes: 0, alerts: 0 });
  const [analysis, setAnalysis] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState([]);
  const [demoMode, setDemoMode] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);
  const eventSourceRef = useRef(null);
  const alertSourceRef = useRef(null);
  const timerRef = useRef(null);

  // Check demo mode on mount and add keyboard shortcut
  useEffect(() => {
    // Check initial demo mode state
    fetch('/api/demo/mode')
      .then(r => r.json())
      .then(data => setDemoMode(data.demoMode))
      .catch(() => {});

    // Keyboard shortcut: Ctrl+Shift+D to toggle demo mode
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        fetch('/api/demo/mode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ enabled: !demoMode })
        })
          .then(r => r.json())
          .then(data => {
            setDemoMode(data.demoMode);
            console.log(`Demo mode: ${data.demoMode ? 'ON' : 'OFF'}`);
          })
          .catch(() => {});
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demoMode]);

  // MITRE ATT&CK phase colors
  const phaseColors = {
    recon: 'text-cyan-400 border-cyan-500',
    initial_access: 'text-yellow-400 border-yellow-500',
    execution: 'text-red-400 border-red-500',
    discovery: 'text-purple-400 border-purple-500',
    exfiltration: 'text-red-500 border-red-600',
  };

  const severityColors = {
    critical: 'bg-red-500/20 border-red-500 text-red-400',
    high: 'bg-orange-500/20 border-orange-500 text-orange-400',
    medium: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
    low: 'bg-blue-500/20 border-blue-500 text-blue-400',
  };

  // Connect to SIEM alert stream (uses demo endpoint if in demo mode)
  const connectAlertStream = (useDemoMode = demoMode) => {
    if (alertSourceRef.current) return;

    const endpoint = useDemoMode ? '/api/demo/alerts/stream' : '/api/siem/alerts/stream';
    const es = new EventSource(endpoint);
    alertSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const alert = JSON.parse(event.data);
        setAlerts(prev => [...prev.slice(-19), alert]);
        setStats(prev => ({ ...prev, alerts: prev.alerts + 1 }));
      } catch (e) {
        console.error('Alert parse error:', e);
      }
    };

    es.onerror = () => {
      es.close();
      alertSourceRef.current = null;

      // If live mode failed, fall back to demo mode
      if (!useDemoMode && phase === 'running') {
        console.log('Live SIEM failed, falling back to demo mode');
        setUsedFallback(true);
        connectAlertStream(true);
      }
    };
  };

  // Start the attack (with demo mode and fallback support)
  const startAttack = async () => {
    setPhase('running');
    setAttackEvents([]);
    setAlerts([]);
    setElapsed(0);
    setStats({ actions: 0, successes: 0, alerts: 0 });
    setUsedFallback(false);

    // Start timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 100);

    // Connect to alert stream
    connectAlertStream(demoMode);

    // Choose endpoint based on demo mode
    const endpoint = demoMode ? '/api/demo/attack' : '/api/attack/start';

    // Trigger attack via API with timeout fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      if (!demoMode) {
        console.log('Live attack timed out, falling back to demo mode');
        controller.abort();
        setUsedFallback(true);
        runDemoAttack();
      }
    }, 5000);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            const event = JSON.parse(line);
            setAttackEvents(prev => [...prev.slice(-29), event]);
            setStats(prev => ({
              ...prev,
              actions: prev.actions + 1,
              successes: event.status === 'success' ? prev.successes + 1 : prev.successes
            }));
          } catch (e) {
            // Non-JSON output
            setAttackEvents(prev => [...prev.slice(-29), { raw: line }]);
          }
        }
      }
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        // Fallback already triggered
        return;
      }
      console.error('Attack failed:', e);

      // Fall back to demo mode on error
      if (!demoMode && !usedFallback) {
        console.log('Live attack failed, falling back to demo mode');
        setUsedFallback(true);
        runDemoAttack();
        return;
      }

      setAttackEvents(prev => [...prev, { error: e.message }]);
    }

    clearInterval(timerRef.current);
    setPhase('complete');
  };

  // Run demo attack (fallback)
  const runDemoAttack = async () => {
    try {
      // Switch alert stream to demo mode
      if (alertSourceRef.current) {
        alertSourceRef.current.close();
        alertSourceRef.current = null;
      }
      connectAlertStream(true);

      const response = await fetch('/api/demo/attack', { method: 'POST' });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            const event = JSON.parse(line);
            setAttackEvents(prev => [...prev.slice(-29), event]);
            setStats(prev => ({
              ...prev,
              actions: prev.actions + 1,
              successes: event.status === 'success' ? prev.successes + 1 : prev.successes
            }));
          } catch (e) {
            setAttackEvents(prev => [...prev.slice(-29), { raw: line }]);
          }
        }
      }
    } catch (e) {
      console.error('Demo attack also failed:', e);
    }

    clearInterval(timerRef.current);
    setPhase('complete');
  };

  // Run AI analysis on collected alerts
  const runAnalysis = async () => {
    if (alerts.length === 0) return;

    setPhase('analyzing');
    setAnalysis(null);
    setAnalysisProgress([]);

    const useDemoEndpoint = demoMode || usedFallback;
    const endpoint = useDemoEndpoint ? '/api/demo/analyze' : '/api/defender/analyze/stream';

    const controller = new AbortController();
    let timeoutId = null;
    let analysisComplete = false;

    // Fallback to demo mode on timeout (only for live mode)
    if (!useDemoEndpoint) {
      timeoutId = setTimeout(() => {
        if (!analysisComplete) {
          console.log('Analysis timeout - falling back to demo mode');
          controller.abort();
          setUsedFallback(true);
          runDemoAnalysis();
        }
      }, 10000); // 10 second timeout for AI analysis
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alerts }),
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

            if (event.type === 'progress') {
              setAnalysisProgress(prev => [...prev, event.message]);
            } else if (event.type === 'complete') {
              analysisComplete = true;
              if (timeoutId) clearTimeout(timeoutId);
              setAnalysis(event.analysis);
              setPhase('analyzed');
            } else if (event.type === 'error') {
              setAnalysisProgress(prev => [...prev, `Error: ${event.message}`]);
              setPhase('complete');
            }
          } catch (e) {
            // Skip invalid events
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        // Handled by timeout fallback
        return;
      }
      console.error('Analysis failed:', e);
      if (timeoutId) clearTimeout(timeoutId);
      // Fallback to demo analysis on error
      if (!useDemoEndpoint) {
        setUsedFallback(true);
        runDemoAnalysis();
      } else {
        setAnalysisProgress(prev => [...prev, `Error: ${e.message}`]);
        setPhase('complete');
      }
    }
  };

  // Run demo analysis (fallback)
  const runDemoAnalysis = async () => {
    setAnalysisProgress([]);
    try {
      const response = await fetch('/api/demo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alerts })
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
            if (event.type === 'progress') {
              setAnalysisProgress(prev => [...prev, event.message]);
            } else if (event.type === 'complete') {
              setAnalysis(event.analysis);
              setPhase('analyzed');
            }
          } catch (e) {
            // Skip invalid events
          }
        }
      }
    } catch (e) {
      console.error('Demo analysis failed:', e);
      setPhase('complete');
    }
  };

  // Reset demo
  const resetDemo = () => {
    setPhase('idle');
    setAttackEvents([]);
    setAlerts([]);
    setElapsed(0);
    setStats({ actions: 0, successes: 0, alerts: 0 });
    setAnalysis(null);
    setAnalysisProgress([]);
    setUsedFallback(false);
    if (alertSourceRef.current) {
      alertSourceRef.current.close();
      alertSourceRef.current = null;
    }
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    return () => {
      if (alertSourceRef.current) alertSourceRef.current.close();
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-[95vw] mx-auto relative">
      {/* Demo mode indicator - subtle, only visible to presenter */}
      {(demoMode || usedFallback) && (
        <div className="absolute top-0 right-0 flex items-center gap-1 text-xs opacity-30 hover:opacity-80 transition-opacity">
          <span className={`w-2 h-2 rounded-full ${demoMode ? 'bg-purple-500' : 'bg-yellow-500'}`}></span>
          <span className="text-slate-500 font-mono">{demoMode ? 'DEMO' : 'FALLBACK'}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className={`text-3xl md:text-4xl font-black mb-2 ${theme.textOnPage}`}>
          Live Attack Demonstration
        </h2>
        <p className={`text-lg ${theme.accentColor}`}>
          Watch an automated attack chain while defender AI detects and responds
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder} text-center`}>
          <div className="text-2xl font-mono font-bold text-cyan-400">{elapsed.toFixed(1)}s</div>
          <div className="text-xs text-slate-500">Elapsed Time</div>
        </div>
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder} text-center`}>
          <div className="text-2xl font-mono font-bold text-yellow-400">{stats.actions}</div>
          <div className="text-xs text-slate-500">Attack Actions</div>
        </div>
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder} text-center`}>
          <div className="text-2xl font-mono font-bold text-green-400">{stats.successes}</div>
          <div className="text-xs text-slate-500">Successful</div>
        </div>
        <div className={`${theme.cardBg} rounded-lg p-3 border ${theme.cardBorder} text-center`}>
          <div className="text-2xl font-mono font-bold text-red-400">{stats.alerts}</div>
          <div className="text-xs text-slate-500">SIEM Alerts</div>
        </div>
      </div>

      {/* Split screen */}
      <div className="grid grid-cols-2 gap-4 h-[500px]">
        {/* Left: Attacker View */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-red-900/20">
            <div className="flex items-center gap-2">
              <span className="text-red-500">💀</span>
              <span className="font-bold text-red-400">ATTACKER</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">red-team container</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-slate-950">
            {phase === 'idle' && (
              <div className="text-slate-500 text-center mt-20">
                Press START to begin attack chain
              </div>
            )}

            {attackEvents.map((event, i) => (
              <div key={i} className="mb-1">
                {event.phase && (
                  <span className={`${phaseColors[event.phase] || 'text-slate-400'}`}>
                    [{event.phase.toUpperCase()}]
                  </span>
                )}
                {' '}
                {event.action && <span className="text-slate-300">{event.action}</span>}
                {event.status && (
                  <span className={event.status === 'success' ? 'text-green-400' : event.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}>
                    {' '}[{event.status.toUpperCase()}]
                  </span>
                )}
                {event.technique && <span className="text-slate-500 text-xs ml-2">({event.technique})</span>}
                {event.raw && <span className="text-slate-400">{event.raw}</span>}
                {event.error && <span className="text-red-400">Error: {event.error}</span>}
              </div>
            ))}

            {phase === 'complete' && (
              <div className="mt-4 p-3 border border-red-500 rounded bg-red-900/20 text-red-400">
                ATTACK CHAIN COMPLETE - {stats.successes}/{stats.actions} actions succeeded
              </div>
            )}
          </div>
        </div>

        {/* Right: Defender View */}
        <div className={`${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-blue-900/20">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-blue-400">DEFENDER</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">mock-siem:8081</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-slate-950">
            {phase === 'idle' && (
              <div className="text-slate-500 text-center mt-20">
                SIEM alerts will appear here during attack
              </div>
            )}

            {alerts.map((alert, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded border ${severityColors[alert.severity] || 'border-slate-600'}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{alert.rule_name || 'Alert'}</span>
                  <span className="text-xs uppercase">{alert.severity}</span>
                </div>
                {alert.mitre_attack && (
                  <div className="text-xs text-slate-400 mt-1">
                    MITRE ATT&CK: {alert.mitre_attack}
                  </div>
                )}
                {alert.message && (
                  <div className="text-xs text-slate-500 mt-1 truncate">
                    {alert.message.substring(0, 100)}...
                  </div>
                )}
              </div>
            ))}

            {phase === 'complete' && alerts.length > 0 && (
              <div className="mt-4 p-3 border border-blue-500 rounded bg-blue-900/20 text-blue-400">
                DETECTION SUMMARY: {stats.alerts} alerts generated
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-4">
        {phase === 'idle' && (
          <button
            onClick={startAttack}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
          >
            <Play className="w-5 h-5" />
            START ATTACK
          </button>
        )}

        {phase === 'running' && (
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg font-bold opacity-75"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            ATTACK IN PROGRESS...
          </button>
        )}

        {phase === 'complete' && (
          <>
            <button
              onClick={runAnalysis}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
            >
              <Zap className="w-5 h-5" />
              ANALYZE WITH AI
            </button>
            <button
              onClick={resetDemo}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              RESET
            </button>
          </>
        )}

        {phase === 'analyzing' && (
          <button
            disabled
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold opacity-75"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            AI ANALYZING...
          </button>
        )}

        {phase === 'analyzed' && (
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            RESET DEMO
          </button>
        )}
      </div>

      {/* Analysis Progress */}
      {phase === 'analyzing' && analysisProgress.length > 0 && (
        <div className={`mt-4 ${theme.cardBg} rounded-lg p-4 border ${theme.cardBorder}`}>
          <div className="text-sm font-mono text-slate-400">
            {analysisProgress.map((msg, i) => (
              <div key={i} className="flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                {msg}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis Results */}
      {phase === 'analyzed' && analysis && (
        <div className={`mt-4 ${theme.cardBg} rounded-xl border ${theme.cardBorder} overflow-hidden`}>
          <div className="px-4 py-3 border-b border-slate-700 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-blue-300">AI Security Analysis</span>
              {analysis.incident_summary?.severity && (
                <span className={`ml-auto px-2 py-1 rounded text-xs font-bold uppercase ${
                  analysis.incident_summary.severity === 'critical' ? 'bg-red-500/30 text-red-400' :
                  analysis.incident_summary.severity === 'high' ? 'bg-orange-500/30 text-orange-400' :
                  'bg-yellow-500/30 text-yellow-400'
                }`}>
                  {analysis.incident_summary.severity}
                </span>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {/* Incident Summary */}
            {analysis.incident_summary && (
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Incident Summary</h4>
                <div className={`p-3 rounded bg-slate-800/50 border border-slate-700`}>
                  <div className="font-bold text-white">{analysis.incident_summary.title}</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Attack Type: {analysis.incident_summary.attack_type} - Confidence: {analysis.incident_summary.confidence}%
                  </div>
                  {analysis.incident_summary.mitre_techniques?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {analysis.incident_summary.mitre_techniques.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Chain of Thought */}
            {analysis.chain_of_thought?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Chain of Thought Reasoning</h4>
                <div className="space-y-2">
                  {analysis.chain_of_thought.map((thought, i) => (
                    <div key={i} className="flex gap-2 text-sm">
                      <span className="text-cyan-400 font-mono">{i + 1}.</span>
                      <span className="text-slate-300">{thought}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IOCs */}
            {analysis.iocs && Object.values(analysis.iocs).some(arr => arr?.length > 0) && (
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Indicators of Compromise</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {analysis.iocs.ip_addresses?.length > 0 && (
                    <div className="p-2 bg-slate-800/50 rounded">
                      <span className="text-slate-500">IPs:</span> {analysis.iocs.ip_addresses.join(', ')}
                    </div>
                  )}
                  {analysis.iocs.user_accounts?.length > 0 && (
                    <div className="p-2 bg-slate-800/50 rounded">
                      <span className="text-slate-500">Accounts:</span> {analysis.iocs.user_accounts.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sigma Rule */}
            {analysis.sigma_rule?.rule_yaml && (
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Generated Sigma Rule</h4>
                <div className="p-3 bg-slate-900 rounded border border-slate-700 font-mono text-xs overflow-x-auto">
                  <div className="text-green-400 mb-1"># {analysis.sigma_rule.title}</div>
                  <pre className="text-slate-300 whitespace-pre-wrap">{analysis.sigma_rule.rule_yaml}</pre>
                </div>
              </div>
            )}

            {/* Recommended Actions */}
            {analysis.recommended_actions?.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-slate-300 mb-2">Recommended Actions</h4>
                <div className="space-y-2">
                  {analysis.recommended_actions.slice(0, 5).map((action, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-slate-800/50 rounded text-sm">
                      <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                        action.priority === 1 ? 'bg-red-500/30 text-red-400' : 'bg-yellow-500/30 text-yellow-400'
                      }`}>
                        P{action.priority}
                      </span>
                      <div>
                        <div className="text-slate-200">{action.action}</div>
                        <div className="text-slate-500 text-xs">{action.rationale}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Executive Summary */}
            {analysis.executive_summary && (
              <div className="p-3 bg-blue-900/20 rounded border border-blue-700/50">
                <h4 className="text-sm font-bold text-blue-300 mb-1">Executive Summary</h4>
                <p className="text-sm text-slate-300">{analysis.executive_summary}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info footer */}
      <div className="mt-4 text-center text-xs text-slate-500">
        Attack runs against isolated Docker container - SIEM detects via Sigma-like rules - AI generates response playbook
      </div>
    </div>
  );
};
