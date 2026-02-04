import React, { useState, useRef } from 'react';
import { Brain, RotateCcw, AlertTriangle, User } from 'lucide-react';

// ============================================================================
// ALERT TRIAGE DEMO - AI-assisted decision support with human approval
// Part of "Continuous Validation Loop" (DEMO 3C) - EMPOWERMENT phase
// Key: Shows human-in-the-loop, NOT autonomous action
// CIS Controls: 8 (Audit Log Management), 17 (Incident Response)
// ============================================================================
export const AlertTriageDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, analyzing, decision, action
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [aiDecision, setAiDecision] = useState(null);
  const [humanApproval, setHumanApproval] = useState(null);
  const intervalRef = useRef(null);

  // Sample alerts for triage
  const alerts = [
    {
      id: 1,
      type: 'Impossible Travel',
      severity: 'high',
      source: 'Azure AD',
      timestamp: '2 min ago',
      user: 'cfo@contoso.com',
      details: 'Login from Lagos, Nigeria (41.203.76.12) - Last login was New York 2 hours ago',
      icon: '✈️',
      aiAnalysis: {
        confidence: 94,
        recommendation: 'ALLOW',
        reasoning: [
          'Checking Outlook calendar... Found: "Lagos Conference 2026" event',
          'Cross-referencing travel approval... Found: Expense report filed Dec 28',
          'Historical pattern: User travels internationally quarterly',
          'MFA completed successfully via authenticator app',
          'Device: Registered corporate laptop (serial: LAP-CFO-001)',
        ],
        riskFactors: [],
        supportingEvidence: ['Calendar event', 'Expense report', 'Device registered', 'MFA verified'],
      }
    },
    {
      id: 2,
      type: 'Suspicious Inbox Rule',
      severity: 'critical',
      source: 'Defender for O365',
      timestamp: '5 min ago',
      user: 'admin@contoso.com',
      details: 'New rule created: Forward all emails containing "invoice" to external@gmail.com',
      icon: '📧',
      aiAnalysis: {
        confidence: 98,
        recommendation: 'BLOCK',
        reasoning: [
          'Rule targets financial keywords (invoice, payment, wire)',
          'Forwarding to personal Gmail (not business domain)',
          'Rule created via Graph API, not Outlook client',
          'User OOO status: Active (not the user creating this)',
          'Last legitimate auth: 3 days ago - POSSIBLE TOKEN COMPROMISE',
        ],
        riskFactors: ['External forwarding', 'API-created rule', 'User mismatch', 'Stale session'],
        supportingEvidence: ['BEC attack pattern match', 'Token replay indicators'],
      }
    },
    {
      id: 3,
      type: 'Brute Force Attempt',
      severity: 'medium',
      source: 'Azure AD',
      timestamp: '10 min ago',
      user: 'service-account@contoso.com',
      details: '47 failed login attempts from IP 185.243.115.42 in 5 minutes',
      icon: '🔐',
      aiAnalysis: {
        confidence: 87,
        recommendation: 'BLOCK_IP',
        reasoning: [
          'Source IP: Known malicious (TOR exit node)',
          'Password spray pattern detected across multiple accounts',
          'No successful authentications from this IP',
          'Service account should only auth from Azure DevOps IP range',
        ],
        riskFactors: ['TOR exit node', 'Password spray', 'Service account target'],
        supportingEvidence: ['IP blocklist match', 'Attack pattern recognition'],
      }
    },
  ];

  const startAnalysis = (alert) => {
    setSelectedAlert(alert);
    setPhase('analyzing');
    setAnalysisProgress(0);
    setAiDecision(null);
    setHumanApproval(null);

    intervalRef.current = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setPhase('decision');
          setAiDecision(alert.aiAnalysis);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleApproval = (approved) => {
    setHumanApproval(approved);
    setPhase('action');
  };

  const reset = () => {
    setPhase('idle');
    setSelectedAlert(null);
    setAnalysisProgress(0);
    setAiDecision(null);
    setHumanApproval(null);
    clearInterval(intervalRef.current);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-950/50 border-red-500/50';
      case 'high': return 'text-orange-500 bg-orange-950/50 border-orange-500/50';
      case 'medium': return 'text-yellow-500 bg-yellow-950/50 border-yellow-500/50';
      default: return 'text-blue-500 bg-blue-950/50 border-blue-500/50';
    }
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-purple-500 flex items-center gap-3">
            <Brain className="w-8 h-8" />
            AI Alert Triage
          </h3>
          <p className="text-slate-400 text-sm mt-1">Decision support with human approval workflow</p>
          {/* 2025 Stats Banner */}
          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-2 py-1 bg-purple-950/50 text-purple-400 rounded border border-purple-500/30">
              90% faster investigations (IBM 2024)
            </span>
            <span className="px-2 py-1 bg-purple-950/50 text-purple-400 rounded border border-purple-500/30">
              3-10 min AI vs 30-40 min manual
            </span>
          </div>
        </div>
        {phase !== 'idle' && (
          <button onClick={reset} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600">
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* IDLE PHASE - Alert Queue */}
      {phase === 'idle' && (
        <div className="space-y-6">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Alert Queue ({alerts.length} pending)
            </h4>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  onClick={() => startAnalysis(alert)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.01] ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{alert.icon}</span>
                      <div>
                        <div className="font-bold text-white">{alert.type}</div>
                        <div className="text-xs text-slate-400">{alert.source} - {alert.timestamp}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <button className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-sm font-bold">
                        Analyze
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-slate-300">
                    <span className="text-slate-500">User:</span> {alert.user}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{alert.details}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-950/30 rounded-xl p-4 border border-purple-500/30 text-center">
            <div className="text-slate-400 text-sm">
              <strong className="text-purple-400">Human-in-the-Loop:</strong> AI analyzes and recommends, humans approve actions
            </div>
          </div>
        </div>
      )}

      {/* ANALYZING PHASE */}
      {phase === 'analyzing' && selectedAlert && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Alert Summary */}
          <div className={`p-4 rounded-xl border ${getSeverityColor(selectedAlert.severity)}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{selectedAlert.icon}</span>
              <div>
                <div className="font-bold text-xl text-white">{selectedAlert.type}</div>
                <div className="text-sm text-slate-400">{selectedAlert.user} - {selectedAlert.source}</div>
              </div>
            </div>
            <div className="text-slate-300">{selectedAlert.details}</div>
          </div>

          {/* Analysis Progress */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-4 mb-4">
              <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
              <div className="flex-1">
                <div className="font-bold text-lg text-white">AI Analyzing Alert...</div>
                <div className="text-sm text-slate-400">Gathering context and correlating data</div>
              </div>
              <div className="text-2xl font-mono font-bold text-purple-400">{analysisProgress}%</div>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-100"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>

            {/* Analysis Steps */}
            <div className="mt-6 space-y-2 font-mono text-sm">
              {analysisProgress > 10 && <div className="text-slate-400">[*] Querying Azure AD sign-in logs...</div>}
              {analysisProgress > 25 && <div className="text-slate-400">[*] Checking user calendar events...</div>}
              {analysisProgress > 40 && <div className="text-slate-400">[*] Cross-referencing travel approvals...</div>}
              {analysisProgress > 55 && <div className="text-slate-400">[*] Analyzing device registration...</div>}
              {analysisProgress > 70 && <div className="text-slate-400">[*] Checking MFA authentication status...</div>}
              {analysisProgress > 85 && <div className="text-purple-400">[*] Running AI reasoning engine...</div>}
              {analysisProgress >= 100 && <div className="text-green-400">[+] Analysis complete!</div>}
            </div>
          </div>
        </div>
      )}

      {/* DECISION PHASE - AI Recommendation with Human Approval */}
      {phase === 'decision' && selectedAlert && aiDecision && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Alert Summary */}
          <div className={`p-4 rounded-xl border ${getSeverityColor(selectedAlert.severity)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedAlert.icon}</span>
                <div>
                  <div className="font-bold text-xl text-white">{selectedAlert.type}</div>
                  <div className="text-sm text-slate-400">{selectedAlert.user}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded font-bold uppercase ${getSeverityColor(selectedAlert.severity)}`}>
                {selectedAlert.severity}
              </span>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="grid grid-cols-2 gap-6">
            {/* Reasoning Chain */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/30">
              <h4 className="font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" /> AI Reasoning Chain
              </h4>
              <div className="space-y-2">
                {aiDecision.reasoning.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-purple-400 font-mono">{i + 1}.</span>
                    <span className={`${step.includes('POSSIBLE') || step.includes('WARNING') ? 'text-red-400' : 'text-slate-300'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {aiDecision.riskFactors.length > 0 && (
                <div className="mt-4 p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                  <div className="text-red-400 font-bold text-sm mb-2">Risk Factors Identified:</div>
                  <div className="flex flex-wrap gap-2">
                    {aiDecision.riskFactors.map((factor, i) => (
                      <span key={i} className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendation */}
            <div className="space-y-4">
              {/* Confidence */}
              <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                <div className="text-slate-500 text-sm mb-2">AI Confidence Score</div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${aiDecision.confidence > 90 ? 'bg-green-500' : aiDecision.confidence > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${aiDecision.confidence}%` }}
                    />
                  </div>
                  <span className="text-2xl font-bold text-white">{aiDecision.confidence}%</span>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className={`rounded-xl p-6 border-2 ${
                aiDecision.recommendation === 'ALLOW'
                  ? 'bg-green-950/30 border-green-500/50'
                  : 'bg-red-950/30 border-red-500/50'
              }`}>
                <div className="text-sm text-slate-400 mb-2">AI Recommendation</div>
                <div className={`text-4xl font-black ${
                  aiDecision.recommendation === 'ALLOW' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {aiDecision.recommendation}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {aiDecision.supportingEvidence.map((evidence, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 text-slate-400 text-xs rounded">
                      ✓ {evidence}
                    </span>
                  ))}
                </div>
              </div>

              {/* Human Approval Buttons */}
              <div className="bg-yellow-950/30 rounded-xl p-6 border-2 border-yellow-500/50">
                <div className="text-yellow-400 font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" /> Human Decision Required
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleApproval(true)}
                    className="p-4 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleApproval(false)}
                    className="p-4 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    ✗ Override
                  </button>
                </div>
                <div className="text-center text-xs text-slate-500 mt-3">
                  AI provides analysis, human makes final decision
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTION PHASE - Execution */}
      {phase === 'action' && selectedAlert && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className={`rounded-xl p-8 border-2 text-center ${
            humanApproval ? 'bg-green-950/30 border-green-500/50' : 'bg-yellow-950/30 border-yellow-500/50'
          }`}>
            <div className="text-6xl mb-4">{humanApproval ? '✓' : '⚠️'}</div>
            <div className={`text-3xl font-black mb-2 ${humanApproval ? 'text-green-500' : 'text-yellow-500'}`}>
              {humanApproval ? 'Action Approved' : 'Override - Escalating'}
            </div>
            <div className="text-slate-400 mb-6">
              {humanApproval
                ? `Executing AI recommendation: ${aiDecision.recommendation}`
                : 'Alert escalated to senior analyst for manual review'
              }
            </div>

            <div className="bg-black/50 rounded-lg p-4 text-left font-mono text-sm max-w-lg mx-auto">
              <div className="text-green-400">$ triage-action --alert {selectedAlert.id}</div>
              {humanApproval ? (
                <>
                  <div className="text-slate-400">[*] Executing approved action...</div>
                  <div className="text-green-400">[+] Action: {aiDecision.recommendation}</div>
                  <div className="text-green-400">[+] Logged: Approved by analyst</div>
                  <div className="text-green-400">[+] Ticket: AUTO-{selectedAlert.id}001 created</div>
                </>
              ) : (
                <>
                  <div className="text-yellow-400">[!] Override detected</div>
                  <div className="text-yellow-400">[*] Escalating to Tier 2...</div>
                  <div className="text-yellow-400">[+] Ticket: ESC-{selectedAlert.id}001 created</div>
                </>
              )}
            </div>

            <button
              onClick={reset}
              className="mt-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold"
            >
              Process Next Alert
            </button>
          </div>

          {/* Audit Trail */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="font-bold text-slate-400 mb-3">Audit Trail (CIS Control 8)</h4>
            <div className="text-xs font-mono text-slate-500 space-y-1">
              <div>[{new Date().toISOString()}] ALERT_RECEIVED: {selectedAlert.type} for {selectedAlert.user}</div>
              <div>[{new Date().toISOString()}] AI_ANALYSIS: Confidence {aiDecision.confidence}%, Recommendation: {aiDecision.recommendation}</div>
              <div>[{new Date().toISOString()}] HUMAN_DECISION: {humanApproval ? 'APPROVED' : 'OVERRIDE'} by analyst@contoso.com</div>
              <div>[{new Date().toISOString()}] ACTION_EXECUTED: {humanApproval ? aiDecision.recommendation : 'ESCALATE'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
