import React, { useState, useRef } from 'react';
import { Shield, RotateCcw, Search, Loader2, AlertTriangle, Zap, Brain } from 'lucide-react';

// ============================================================================
// M365 CONFIG DRIFT SCANNER - Continuous validation demo
// Part of "Continuous Validation Loop" (DEMO 3A) - EMPOWERMENT phase
// CIS Controls: 4 (Secure Config), 5 (Account Management), 6 (Access Control)
// ============================================================================
export const M365ConfigDriftDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, scanning, results
  const [scanProgress, setScanProgress] = useState(0);
  const [findings, setFindings] = useState([]);
  const [selectedFinding, setSelectedFinding] = useState(null);
  const intervalRef = useRef(null);

  // Simulated baseline vs current state findings
  const driftFindings = [
    {
      id: 1,
      category: 'MFA',
      control: 'CIS 5.1',
      severity: 'critical',
      title: 'MFA Disabled for Admin Account',
      baseline: 'MFA Required for all Global Admins',
      current: 'admin@contoso.com has MFA disabled',
      driftDetected: '2 hours ago',
      changedBy: 'ServiceDesk@contoso.com',
      recommendation: 'Re-enable MFA immediately via Conditional Access',
      autoRemediate: true
    },
    {
      id: 2,
      category: 'Conditional Access',
      control: 'CIS 5.2',
      severity: 'high',
      title: 'Legacy Auth Not Blocked',
      baseline: 'Block legacy authentication protocols',
      current: 'CA policy "Block Legacy Auth" set to Report-Only',
      driftDetected: '1 day ago',
      changedBy: 'IT-Admin@contoso.com',
      recommendation: 'Switch policy from Report-Only to Enabled',
      autoRemediate: true
    },
    {
      id: 3,
      category: 'Mailbox Rules',
      control: 'CIS 8.5',
      severity: 'critical',
      title: 'Suspicious Inbox Forwarding Rule',
      baseline: 'No external forwarding rules',
      current: 'CFO mailbox forwarding to external@gmail.com',
      driftDetected: '4 hours ago',
      changedBy: 'Unknown (Graph API)',
      recommendation: 'Remove rule, investigate token compromise',
      autoRemediate: false
    },
    {
      id: 4,
      category: 'Guest Access',
      control: 'CIS 6.3',
      severity: 'medium',
      title: 'Guest User Permissions Elevated',
      baseline: 'Guest users: Limited access only',
      current: '3 guest users have Member-level permissions',
      driftDetected: '3 days ago',
      changedBy: 'SharePoint-Admin@contoso.com',
      recommendation: 'Review and downgrade guest permissions',
      autoRemediate: true
    },
    {
      id: 5,
      category: 'App Registration',
      control: 'CIS 4.8',
      severity: 'high',
      title: 'High-Privilege App Consent',
      baseline: 'Admin consent required for high-privilege apps',
      current: 'User-consented app with Mail.ReadWrite.All',
      driftDetected: '6 hours ago',
      changedBy: 'User: jsmith@contoso.com',
      recommendation: 'Revoke consent, enable admin consent workflow',
      autoRemediate: true
    },
    {
      id: 6,
      category: 'Password Policy',
      control: 'CIS 5.4',
      severity: 'low',
      title: 'Password Expiry Extended',
      baseline: 'Password expiry: 90 days',
      current: 'Password expiry: 180 days for IT group',
      driftDetected: '1 week ago',
      changedBy: 'IT-Director@contoso.com',
      recommendation: 'Review exception or revert to baseline',
      autoRemediate: false
    }
  ];

  const scanCategories = [
    { name: 'Conditional Access Policies', icon: '🔐', duration: 2 },
    { name: 'MFA Enforcement', icon: '📱', duration: 1.5 },
    { name: 'Mailbox Rules', icon: '📧', duration: 2 },
    { name: 'Guest Access Settings', icon: '👥', duration: 1.5 },
    { name: 'App Registrations', icon: '📦', duration: 2 },
    { name: 'Password Policies', icon: '🔑', duration: 1 },
  ];

  const totalScanTime = scanCategories.reduce((acc, c) => acc + c.duration, 0);

  const startScan = () => {
    setPhase('scanning');
    setScanProgress(0);
    setFindings([]);
    setSelectedFinding(null);

    intervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= totalScanTime) {
          clearInterval(intervalRef.current);
          setPhase('results');
          setFindings(driftFindings);
          return totalScanTime;
        }
        return prev + 0.1;
      });
    }, 100);
  };

  const reset = () => {
    setPhase('idle');
    setScanProgress(0);
    setFindings([]);
    setSelectedFinding(null);
    clearInterval(intervalRef.current);
  };

  const getCurrentCategory = () => {
    let acc = 0;
    for (const cat of scanCategories) {
      if (scanProgress >= acc && scanProgress < acc + cat.duration) {
        return cat;
      }
      acc += cat.duration;
    }
    return scanCategories[scanCategories.length - 1];
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-950/50 border-red-500/50';
      case 'high': return 'text-orange-500 bg-orange-950/50 border-orange-500/50';
      case 'medium': return 'text-yellow-500 bg-yellow-950/50 border-yellow-500/50';
      case 'low': return 'text-blue-500 bg-blue-950/50 border-blue-500/50';
      default: return 'text-slate-500 bg-slate-950/50 border-slate-500/50';
    }
  };

  const criticalCount = findings.filter(f => f.severity === 'critical').length;
  const highCount = findings.filter(f => f.severity === 'high').length;
  const mediumCount = findings.filter(f => f.severity === 'medium').length;
  const lowCount = findings.filter(f => f.severity === 'low').length;

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-green-500 flex items-center gap-3">
            <Shield className="w-8 h-8" />
            M365 Configuration Drift Scanner
          </h3>
          <p className="text-slate-400 text-sm mt-1">Continuous validation against security baseline</p>
          {/* 2025 Stats Banner */}
          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-2 py-1 bg-amber-950/50 text-amber-400 rounded border border-amber-500/30">
              23% of cloud incidents from misconfigs
            </span>
            <span className="px-2 py-1 bg-green-950/50 text-green-400 rounded border border-green-500/30">
              Microsoft365DSC compatible
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {phase === 'scanning' && (
            <div className="text-2xl font-mono font-bold text-white">
              {scanProgress.toFixed(1)}s
            </div>
          )}
          {phase !== 'idle' && (
            <button onClick={reset} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600">
              <RotateCcw className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* IDLE PHASE */}
      {phase === 'idle' && (
        <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🛡️</div>
            <h4 className="text-2xl font-bold mb-2">M365 Tenant Security Scan</h4>
            <p className="text-slate-400 mb-6">
              Compare current configuration against your security baseline.
              Detect unauthorized changes, policy drift, and compliance gaps.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 text-sm">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-green-400 font-bold">CIS Control 4</div>
                <div className="text-slate-400">Secure Configuration</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-green-400 font-bold">CIS Control 5</div>
                <div className="text-slate-400">Account Management</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-green-400 font-bold">CIS Control 6</div>
                <div className="text-slate-400">Access Control</div>
              </div>
            </div>

            <button
              onClick={startScan}
              className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Search className="w-5 h-5" />
              Start Security Scan
            </button>

            <div className="mt-6 text-xs text-slate-500">
              Demo uses simulated tenant data. In production, connects to Graph API.
            </div>
          </div>
        </div>
      )}

      {/* SCANNING PHASE */}
      {phase === 'scanning' && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center gap-4 mb-4">
              <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
              <span className="font-bold text-lg">{getCurrentCategory()?.icon} Scanning: {getCurrentCategory()?.name}</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-100"
                style={{ width: `${(scanProgress / totalScanTime) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-slate-500">
              <span>Querying Graph API...</span>
              <span>{Math.round((scanProgress / totalScanTime) * 100)}%</span>
            </div>
          </div>

          {/* Scan categories */}
          <div className="grid grid-cols-6 gap-3">
            {scanCategories.map((cat, i) => {
              let acc = 0;
              for (let j = 0; j < i; j++) acc += scanCategories[j].duration;
              const isComplete = scanProgress >= acc + cat.duration;
              const isActive = scanProgress >= acc && scanProgress < acc + cat.duration;

              return (
                <div
                  key={cat.name}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    isComplete
                      ? 'border-green-500/50 bg-green-950/30'
                      : isActive
                      ? 'border-green-500 bg-green-950/50 scale-105'
                      : 'border-slate-700 bg-slate-900/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className={`text-xs font-medium ${isComplete || isActive ? 'text-white' : 'text-slate-500'}`}>
                    {cat.name}
                  </div>
                  {isComplete && <span className="text-green-400 text-xs">✓</span>}
                </div>
              );
            })}
          </div>

          {/* Live log */}
          <div className="bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed border border-green-500/30 relative z-10 isolate shadow-xl h-48 overflow-y-auto space-y-1">
            <div className="text-green-500">$ drift-scanner --tenant contoso.onmicrosoft.com</div>
            {scanProgress > 0.5 && <div className="text-slate-400">[*] Authenticating to Graph API...</div>}
            {scanProgress > 1 && <div className="text-green-400">[+] Connected as SecurityScanner@contoso.com</div>}
            {scanProgress > 2 && <div className="text-slate-400">[*] Loading security baseline...</div>}
            {scanProgress > 3 && <div className="text-slate-400">[*] Querying Conditional Access policies...</div>}
            {scanProgress > 4 && <div className="text-yellow-400">[!] Drift detected: CA policy in Report-Only mode</div>}
            {scanProgress > 5 && <div className="text-slate-400">[*] Checking MFA enrollment status...</div>}
            {scanProgress > 6 && <div className="text-red-400">[!!] CRITICAL: Admin account missing MFA!</div>}
            {scanProgress > 7 && <div className="text-slate-400">[*] Scanning mailbox forwarding rules...</div>}
            {scanProgress > 8 && <div className="text-red-400">[!!] CRITICAL: External forwarding detected on CFO mailbox!</div>}
            {scanProgress > 9 && <div className="text-yellow-400">[!] Guest user permissions elevated</div>}
          </div>
        </div>
      )}

      {/* RESULTS PHASE */}
      {phase === 'results' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Summary Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-3xl font-black text-white">{findings.length}</div>
              <div className="text-slate-400 text-sm">Total Findings</div>
            </div>
            <div className="bg-red-950/50 rounded-xl p-4 border border-red-500/50 text-center">
              <div className="text-3xl font-black text-red-500">{criticalCount}</div>
              <div className="text-slate-400 text-sm">Critical</div>
            </div>
            <div className="bg-orange-950/50 rounded-xl p-4 border border-orange-500/50 text-center">
              <div className="text-3xl font-black text-orange-500">{highCount}</div>
              <div className="text-slate-400 text-sm">High</div>
            </div>
            <div className="bg-yellow-950/50 rounded-xl p-4 border border-yellow-500/50 text-center">
              <div className="text-3xl font-black text-yellow-500">{mediumCount}</div>
              <div className="text-slate-400 text-sm">Medium</div>
            </div>
            <div className="bg-blue-950/50 rounded-xl p-4 border border-blue-500/50 text-center">
              <div className="text-3xl font-black text-blue-500">{lowCount}</div>
              <div className="text-slate-400 text-sm">Low</div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Findings List */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Configuration Drift Detected
              </h4>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {findings.map(finding => (
                  <div
                    key={finding.id}
                    onClick={() => setSelectedFinding(finding)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                      selectedFinding?.id === finding.id
                        ? 'border-green-500 bg-green-950/30'
                        : getSeverityColor(finding.severity)
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-white">{finding.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{finding.category} - {finding.control}</div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getSeverityColor(finding.severity)}`}>
                        {finding.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Finding Detail */}
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
              {selectedFinding ? (
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-xl text-white">{selectedFinding.title}</h4>
                    <span className={`px-3 py-1 rounded font-bold uppercase ${getSeverityColor(selectedFinding.severity)}`}>
                      {selectedFinding.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-green-950/30 rounded-lg border border-green-500/30">
                      <div className="text-green-400 font-bold mb-1">Expected (Baseline)</div>
                      <div className="text-slate-300">{selectedFinding.baseline}</div>
                    </div>
                    <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                      <div className="text-red-400 font-bold mb-1">Current State</div>
                      <div className="text-slate-300">{selectedFinding.current}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Drift Detected:</span>
                      <span className="text-white">{selectedFinding.driftDetected}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Changed By:</span>
                      <span className="text-yellow-400 font-mono">{selectedFinding.changedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">CIS Control:</span>
                      <span className="text-blue-400">{selectedFinding.control}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-950/30 rounded-lg border border-purple-500/30">
                    <div className="text-purple-400 font-bold mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4" /> AI Recommendation
                    </div>
                    <div className="text-slate-300">{selectedFinding.recommendation}</div>
                  </div>

                  <div className="flex gap-3">
                    {selectedFinding.autoRemediate ? (
                      <button className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> Auto-Remediate
                      </button>
                    ) : (
                      <button className="flex-1 px-4 py-3 bg-yellow-600 hover:bg-yellow-500 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Requires Manual Review
                      </button>
                    )}
                    <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-colors">
                      Create Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👈</div>
                    <div>Select a finding to view details</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Summary */}
          <div className="bg-green-950/30 rounded-xl p-4 border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Remediation Summary
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{findings.filter(f => f.autoRemediate).length}</div>
                <div className="text-slate-400">Auto-remediable</div>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">{findings.filter(f => !f.autoRemediate).length}</div>
                <div className="text-slate-400">Requires Review</div>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="text-2xl font-bold text-slate-400">~5 min</div>
                <div className="text-slate-400">Est. Remediation Time</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
