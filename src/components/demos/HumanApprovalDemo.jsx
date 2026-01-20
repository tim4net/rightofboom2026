import React, { useState, useEffect } from 'react';
import { Loader2, Check, X } from 'lucide-react';

// ============================================================================
// Human Approval Workflow Demo - AI recommends, human decides
// ============================================================================
export const HumanApprovalDemo = ({ theme }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [auditLog, setAuditLog] = useState([]);
  const [processing, setProcessing] = useState(null); // ID of currently processing recommendation
  const [loading, setLoading] = useState(true);

  // Fetch recommendations on mount
  useEffect(() => {
    fetchRecommendations();
    fetchAuditLog();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/recommendations');
      const data = await response.json();
      setRecommendations(data.recommendations);
    } catch (e) {
      console.error('Failed to fetch recommendations:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLog = async () => {
    try {
      const response = await fetch('/api/audit-log');
      const data = await response.json();
      setAuditLog(data.entries);
    } catch (e) {
      console.error('Failed to fetch audit log:', e);
    }
  };

  const handleApprove = async (rec) => {
    setProcessing(rec.id);

    try {
      const response = await fetch('/api/actions/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendationId: rec.id,
          action: rec.action,
          target: rec.target,
          approvedBy: 'SOC Analyst'
        })
      });

      const result = await response.json();

      if (result.success) {
        // Update recommendations to mark as processed
        setRecommendations(prev => prev.map(r =>
          r.id === rec.id ? { ...r, processed: true, result: 'approved' } : r
        ));
        // Refresh audit log
        fetchAuditLog();
      }
    } catch (e) {
      console.error('Failed to execute action:', e);
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (rec) => {
    setProcessing(rec.id);

    try {
      const response = await fetch('/api/actions/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recommendationId: rec.id,
          action: rec.action,
          target: rec.target,
          reason: 'Manual override by operator',
          rejectedBy: 'SOC Analyst'
        })
      });

      const result = await response.json();

      if (result.success) {
        setRecommendations(prev => prev.map(r =>
          r.id === rec.id ? { ...r, processed: true, result: 'rejected' } : r
        ));
        fetchAuditLog();
      }
    } catch (e) {
      console.error('Failed to reject action:', e);
    } finally {
      setProcessing(null);
    }
  };

  const handleReset = async () => {
    try {
      await fetch('/api/audit-log', { method: 'DELETE' });
      setAuditLog([]);
      fetchRecommendations();
    } catch (e) {
      console.error('Failed to reset:', e);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/30 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/30 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/30 text-yellow-400 border-yellow-500/50';
      default: return 'bg-slate-500/30 text-slate-400 border-slate-500/50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'containment': return '🛑';
      case 'credential': return '🔑';
      case 'isolation': return '🔒';
      default: return '⚡';
    }
  };

  const pendingRecs = recommendations.filter(r => !r.processed);
  const processedRecs = recommendations.filter(r => r.processed);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-3xl md:text-4xl font-black mb-2 ${theme.textOnPage}`}>
          Human-in-the-Loop Approval
        </h2>
        <p className={`text-lg ${theme.accentColor}`}>
          AI recommends actions - Human approves or rejects - Full audit trail
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-4 h-[600px]">
        {/* Left: Pending Recommendations (3 cols) */}
        <div className={`col-span-3 ${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between bg-yellow-900/20">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">⚠️</span>
              <span className="font-bold text-yellow-300">PENDING APPROVAL</span>
              <span className="text-xs bg-yellow-500/30 text-yellow-400 px-2 py-0.5 rounded-full">
                {pendingRecs.length} remaining
              </span>
            </div>
            {processedRecs.length > 0 && (
              <button
                onClick={handleReset}
                className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
              >
                Reset Demo
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading && (
              <div className="text-slate-500 text-center mt-10">Loading recommendations...</div>
            )}

            {!loading && pendingRecs.length === 0 && (
              <div className="text-slate-500 text-center mt-10">
                <div className="text-4xl mb-2">✅</div>
                All recommendations processed
              </div>
            )}

            {pendingRecs.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-lg border ${getSeverityColor(rec.severity)} ${
                  processing === rec.id ? 'opacity-50' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getTypeIcon(rec.type)}</span>
                    <span className="font-bold text-white text-lg">{rec.action}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getSeverityColor(rec.severity)}`}>
                      {rec.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Confidence:</span>
                    <span className={`text-sm font-bold ${
                      rec.confidence >= 90 ? 'text-green-400' :
                      rec.confidence >= 80 ? 'text-yellow-400' :
                      'text-orange-400'
                    }`}>
                      {rec.confidence}%
                    </span>
                  </div>
                </div>

                {/* Target */}
                <div className="mb-2">
                  <span className="text-slate-500 text-sm">Target: </span>
                  <span className="font-mono text-cyan-400">{rec.target}</span>
                </div>

                {/* Rationale */}
                <div className="text-sm text-slate-300 mb-3">{rec.rationale}</div>

                {/* MITRE & Impact */}
                <div className="flex items-center gap-4 text-xs mb-3">
                  <span className="text-purple-400 font-mono">{rec.mitre}</span>
                  <span className="text-slate-500">|</span>
                  <span className={`${
                    rec.estimatedImpact.startsWith('Low') ? 'text-green-400' :
                    rec.estimatedImpact.startsWith('Medium') ? 'text-yellow-400' :
                    rec.estimatedImpact.startsWith('High') ? 'text-orange-400' :
                    'text-red-400'
                  }`}>
                    Impact: {rec.estimatedImpact}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 mb-3">
                  {rec.automated && (
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                      Automated
                    </span>
                  )}
                  {rec.reversible && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
                      Reversible
                    </span>
                  )}
                  {!rec.reversible && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                      Irreversible
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleApprove(rec)}
                    disabled={processing === rec.id}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {processing === rec.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(rec)}
                    disabled={processing === rec.id}
                    className="px-4 py-2 bg-red-600/50 hover:bg-red-600 disabled:bg-red-800/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Audit Log (2 cols) */}
        <div className={`col-span-2 ${theme.cardBg} rounded-xl border ${theme.cardBorder} flex flex-col overflow-hidden`}>
          <div className="px-4 py-2 border-b border-slate-700 flex items-center gap-2 bg-blue-900/20">
            <span className="text-blue-400">📋</span>
            <span className="font-bold text-blue-300">AUDIT LOG</span>
            <span className="text-xs bg-blue-500/30 text-blue-400 px-2 py-0.5 rounded-full">
              {auditLog.length} entries
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {auditLog.length === 0 && (
              <div className="text-slate-500 text-center mt-10 text-sm">
                No actions taken yet
              </div>
            )}

            {auditLog.map((entry) => (
              <div
                key={entry.id}
                className={`p-3 rounded-lg border ${
                  entry.decision === 'approved'
                    ? 'bg-green-900/20 border-green-700/50'
                    : 'bg-red-900/20 border-red-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={entry.decision === 'approved' ? 'text-green-400' : 'text-red-400'}>
                      {entry.decision === 'approved' ? '✓' : '✗'}
                    </span>
                    <span className="font-bold text-white text-sm">{entry.action}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mb-1">
                  Target: <span className="font-mono text-cyan-400">{entry.target}</span>
                </div>

                {entry.details && (
                  <div className="text-xs text-green-400 mb-1">{entry.details}</div>
                )}

                {entry.reason && entry.decision === 'rejected' && (
                  <div className="text-xs text-red-400 mb-1">Reason: {entry.reason}</div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>By: {entry.approvedBy || entry.rejectedBy}</span>
                  {entry.executionTime && (
                    <span>- {entry.executionTime}ms</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-slate-500">
        AI generates recommendations with confidence scores - Human operator approves or rejects - All decisions logged for compliance
      </div>
    </div>
  );
};
