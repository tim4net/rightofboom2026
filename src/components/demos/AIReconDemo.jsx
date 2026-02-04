import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, AlertTriangle, Search, Globe, User, Server, Target, Loader2, Shield } from 'lucide-react';
import { TOKENS } from '../../config/tokens';
import { TerminalDisplay, TerminalLine, MetricCard, MetricGrid } from '../ui';

// ============================================================================
// AI RECON DEMO - Shows how attackers use AI for reconnaissance
// This is the "FEAR" hook at the start of the presentation
// CIS Controls: 3 (Data Protection), 4 (Secure Config), 7 (Vuln Management)
// NOW WITH REAL API CALLS: Shodan, HIBP, crt.sh, Claude AI
// ============================================================================
export const AIReconDemo = ({ theme, useFallback = false }) => {
  const [domain, setDomain] = useState('');
  const [phase, setPhase] = useState('input'); // input, scanning, results
  const [elapsed, setElapsed] = useState(0);
  const [findings, setFindings] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [apiStatus, setApiStatus] = useState({ checked: false, available: {} });
  const [isLive, setIsLive] = useState(true);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Check API availability on mount
  useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(data => setApiStatus({ checked: true, available: data.apis }))
      .catch(() => setApiStatus({ checked: true, available: {} }));
  }, []);

  // Pre-cached fallback data for demo reliability
  const fallbackData = {
    company: 'Demo Corporation',
    employees: 2847,
    techStack: ['Microsoft 365', 'Azure AD', 'Salesforce', 'Slack', 'GitHub Enterprise'],
    exposedServices: [
      { service: 'mail.example.com', port: 443, info: 'Exchange Online - OWA exposed' },
      { service: 'vpn.example.com', port: 443, info: 'Cisco AnyConnect - version 4.9' },
      { service: 'autodiscover.example.com', port: 443, info: 'Autodiscover endpoint' },
    ],
    linkedInProfiles: [
      { name: 'Sarah Chen', role: 'CFO', email: 'schen@example.com' },
      { name: 'Mike Rodriguez', role: 'IT Director', email: 'mrodriguez@example.com' },
      { name: 'Jennifer Walsh', role: 'CEO', email: 'jwalsh@example.com' },
    ],
    breachData: [
      { source: 'LinkedIn 2021', records: 412, type: 'credentials' },
      { source: 'Have I Been Pwned', records: 89, type: 'email+password' },
    ],
    dnsRecords: ['MX: example-com.mail.protection.outlook.com', 'SPF: v=spf1 include:spf.protection.outlook.com'],
    attackPlan: [
      { phase: 'Initial Access', tactic: 'Spearphish CFO using LinkedIn context', time: '2 min', risk: 'high' },
      { phase: 'Credential Harvest', tactic: 'Deploy Evilginx proxy mimicking OWA login', time: '5 min', risk: 'critical' },
      { phase: 'Token Theft', tactic: 'Capture session token post-MFA', time: '30 sec', risk: 'critical' },
      { phase: 'Persistence', tactic: 'Create inbox forwarding rule to exfil', time: '1 min', risk: 'high' },
      { phase: 'Lateral Movement', tactic: 'Use Graph API to enumerate org', time: '3 min', risk: 'medium' },
    ]
  };

  const scanSteps = [
    { name: 'DNS Enumeration', icon: '🌐', apiEndpoint: 'dns' },
    { name: 'Subdomain Discovery', icon: '🔍', apiEndpoint: 'subdomains' },
    { name: 'Service Discovery', icon: '🖥️', apiEndpoint: 'shodan' },
    { name: 'Breach Lookup', icon: '🔓', apiEndpoint: 'breaches' },
    { name: 'AI Attack Planning', icon: '🧠', apiEndpoint: 'attack-plan' },
  ];

  const addLog = (message, type = 'info') => {
    setTerminalLogs(prev => [...prev, { message, type, time: Date.now() }]);
  };

  const runRealScan = async (targetDomain) => {
    startTimeRef.current = Date.now();
    const results = {
      domain: targetDomain,
      dns: null,
      subdomains: [],
      services: null,
      breaches: null,
      attackPlan: null
    };

    try {
      // Step 0: DNS Enumeration
      setCurrentStep(0);
      addLog(`[*] Querying DNS records for ${targetDomain}...`, 'info');
      try {
        const dnsRes = await fetch(`/api/dns/${targetDomain}`);
        const dnsData = await dnsRes.json();
        results.dns = dnsData;
        if (dnsData.records?.MX) {
          addLog(`[+] MX: ${dnsData.records.MX[0]}`, 'success');
        }
        if (dnsData.records?.TXT) {
          const spf = dnsData.records.TXT.find(t => t.includes('spf'));
          if (spf) addLog(`[+] SPF record found - email services configured`, 'success');
        }
      } catch (e) {
        addLog(`[!] DNS lookup failed: ${e.message}`, 'error');
      }

      // Step 1: Subdomain Discovery
      setCurrentStep(1);
      addLog(`[*] Discovering subdomains via Certificate Transparency...`, 'info');
      try {
        const subRes = await fetch(`/api/subdomains/${targetDomain}`);
        const subData = await subRes.json();
        results.subdomains = subData.subdomains || [];
        addLog(`[+] Found ${results.subdomains.length} subdomains`, 'success');
        results.subdomains.slice(0, 5).forEach(s => addLog(`    - ${s}`, 'detail'));
        if (results.subdomains.length > 5) addLog(`    ... and ${results.subdomains.length - 5} more`, 'detail');
      } catch (e) {
        addLog(`[!] Subdomain discovery failed: ${e.message}`, 'error');
      }

      // Step 2: Service Discovery (Shodan)
      setCurrentStep(2);
      addLog(`[*] Querying Shodan for exposed services...`, 'info');
      try {
        const shodanRes = await fetch(`/api/shodan/${targetDomain}`);
        const shodanData = await shodanRes.json();
        results.services = shodanData;
        if (shodanData.services?.length > 0) {
          addLog(`[+] Found ${shodanData.services.length} open ports on ${shodanData.ip}`, 'success');
          shodanData.services.slice(0, 5).forEach(s =>
            addLog(`    - :${s.port} ${s.service || 'unknown'} ${s.version || ''}`, 'detail')
          );
          if (shodanData.vulns?.length > 0) {
            addLog(`[!] WARNING: ${shodanData.vulns.length} known vulnerabilities!`, 'warning');
          }
        } else {
          addLog(`[*] No Shodan data for this target`, 'info');
        }
      } catch (e) {
        addLog(`[!] Shodan query failed: ${e.message}`, 'error');
      }

      // Step 3: Breach Lookup
      setCurrentStep(3);
      addLog(`[*] Checking breach databases...`, 'info');
      try {
        const breachRes = await fetch(`/api/breaches/${targetDomain}`);
        const breachData = await breachRes.json();
        results.breaches = breachData;
        if (breachData.breaches?.length > 0) {
          const totalRecords = breachData.breaches.reduce((a, b) => a + (b.pwnCount || 0), 0);
          addLog(`[!] WARNING: ${totalRecords.toLocaleString()} credentials in ${breachData.breaches.length} breaches!`, 'warning');
          breachData.breaches.slice(0, 3).forEach(b =>
            addLog(`    - ${b.name}: ${b.pwnCount?.toLocaleString() || '?'} accounts`, 'detail')
          );
        } else {
          addLog(`[+] No breach data found (good news!)`, 'success');
        }
      } catch (e) {
        addLog(`[!] Breach lookup failed: ${e.message}`, 'error');
      }

      // Step 4: AI Attack Planning
      setCurrentStep(4);
      addLog(`[*] Generating AI attack plan based on findings...`, 'info');
      try {
        const attackRes = await fetch('/api/attack-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain: targetDomain, recon: results })
        });
        const attackData = await attackRes.json();
        results.attackPlan = attackData.attackPlan;
        addLog(`[+] Attack plan generated with ${results.attackPlan?.phases?.length || 0} phases`, 'success');
      } catch (e) {
        addLog(`[!] AI planning failed: ${e.message}`, 'error');
        results.attackPlan = { phases: fallbackData.attackPlan, summary: 'Fallback plan (API unavailable)' };
      }

      const totalTime = (Date.now() - startTimeRef.current) / 1000;
      addLog(`[+] Reconnaissance complete in ${totalTime.toFixed(1)}s`, 'success');

      return results;
    } catch (error) {
      addLog(`[!] Fatal error: ${error.message}`, 'error');
      return null;
    }
  };

  const transformResultsForDisplay = (rawResults) => {
    const domain = rawResults.domain;
    return {
      company: domain,
      employees: rawResults.subdomains?.length * 50 || 0,
      techStack: detectTechStack(rawResults),
      exposedServices: (rawResults.services?.services || []).map(s => ({
        service: `${domain}`,
        port: s.port,
        info: `${s.service || 'unknown'} ${s.version || ''} ${s.ssl ? '(SSL)' : ''}`.trim()
      })),
      linkedInProfiles: [],
      breachData: (rawResults.breaches?.breaches || []).map(b => ({
        source: b.name,
        records: b.pwnCount || 0,
        type: (b.dataClasses || []).slice(0, 2).join(', ') || 'unknown'
      })),
      dnsRecords: Object.entries(rawResults.dns?.records || {}).flatMap(([type, values]) =>
        (values || []).slice(0, 2).map(v => `${type}: ${v}`)
      ),
      attackPlan: rawResults.attackPlan?.phases || fallbackData.attackPlan,
      summary: rawResults.attackPlan?.summary,
      priorityDefenses: rawResults.attackPlan?.priorityDefenses,
      subdomains: rawResults.subdomains || [],
      rawServices: rawResults.services
    };
  };

  const detectTechStack = (results) => {
    const stack = [];
    const dns = results.dns?.records || {};
    const subs = results.subdomains || [];

    if (dns.MX?.some(m => m.includes('outlook') || m.includes('microsoft'))) stack.push('Microsoft 365');
    if (dns.MX?.some(m => m.includes('google'))) stack.push('Google Workspace');
    if (dns.TXT?.some(t => t.includes('azure'))) stack.push('Azure');
    if (dns.TXT?.some(t => t.includes('aws'))) stack.push('AWS');
    if (dns.TXT?.some(t => t.includes('salesforce'))) stack.push('Salesforce');
    if (subs.some(s => s.includes('vpn'))) stack.push('VPN');
    if (subs.some(s => s.includes('mail') || s.includes('smtp'))) stack.push('Email Server');
    if (subs.some(s => s.includes('git'))) stack.push('Git');
    if (subs.some(s => s.includes('jira') || s.includes('confluence'))) stack.push('Atlassian');

    return stack.length > 0 ? stack : ['Unknown'];
  };

  useEffect(() => {
    if (phase === 'scanning') {
      const tick = () => {
        setElapsed((Date.now() - startTimeRef.current) / 1000);
      };
      intervalRef.current = setInterval(tick, 100);
    }
    return () => clearInterval(intervalRef.current);
  }, [phase]);

  const startScan = async () => {
    const targetDomain = domain.toLowerCase().trim();
    if (!targetDomain) return;

    setPhase('scanning');
    setElapsed(0);
    setCurrentStep(0);
    setTerminalLogs([]);
    setFindings(null);
    startTimeRef.current = Date.now();

    addLog(`root@attacker:~# ./ai_recon.py --target ${targetDomain}`, 'command');
    addLog(`[*] Starting OSINT reconnaissance...`, 'info');

    if (isLive && apiStatus.checked) {
      const results = await runRealScan(targetDomain);
      if (results) {
        setFindings(transformResultsForDisplay(results));
      } else {
        setFindings({ ...fallbackData, company: targetDomain });
      }
    } else {
      await new Promise(r => setTimeout(r, 5000));
      setFindings({ ...fallbackData, company: targetDomain });
    }

    clearInterval(intervalRef.current);
    setElapsed((Date.now() - startTimeRef.current) / 1000);
    setCurrentStep(scanSteps.length);
    setPhase('results');
  };

  const reset = () => {
    setPhase('input');
    setDomain('');
    setElapsed(0);
    setCurrentStep(0);
    setFindings(null);
    setTerminalLogs([]);
    clearInterval(intervalRef.current);
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-red-500 flex items-center gap-3">
            <Target className="w-8 h-8" />
            AI-Powered Reconnaissance
          </h3>
          <p className="text-slate-400 text-sm mt-1">How attackers use AI to map your attack surface in seconds</p>
          {/* 2025 Stats Banner */}
          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-2 py-1 bg-red-950/50 text-red-400 rounded border border-red-500/30">
              1,265% AI phishing surge since 2023
            </span>
            <span className="px-2 py-1 bg-red-950/50 text-red-400 rounded border border-red-500/30">
              95% attacker cost savings with LLMs
            </span>
          </div>
        </div>
        {phase !== 'input' && (
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-black font-mono ${phase === 'results' ? 'text-red-500' : 'text-white'}`}>
              {elapsed.toFixed(1)}s
            </div>
            <button onClick={reset} className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* INPUT PHASE */}
      {phase === 'input' && (
        <div className={TOKENS.card.xl}>
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h4 className="text-2xl font-bold mb-2">Enter Target Domain</h4>
            <p className="text-slate-400 mb-6">
              {isLive ? 'LIVE MODE: Real OSINT APIs + AI attack planning' : 'DEMO MODE: Using cached data'}
            </p>

            <div className="flex gap-3 justify-center">
              <div className="relative flex-1 max-w-md">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-600 rounded-xl text-lg focus:border-red-500 focus:outline-none transition-colors"
                  onKeyDown={(e) => e.key === 'Enter' && domain && startScan()}
                />
              </div>
              <button
                onClick={startScan}
                disabled={!domain.trim()}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-bold text-lg flex items-center gap-2 transition-colors"
              >
                <Search className="w-5 h-5" />
                Start Recon
              </button>
            </div>

            {/* Live/Demo Toggle */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  isLive ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {isLive ? '🟢 LIVE APIs' : '⚪ Demo Mode'}
              </button>
            </div>

            {/* API Status */}
            {apiStatus.checked && isLive && (
              <div className="mt-4 flex justify-center gap-3 text-xs">
                <span className={`px-2 py-1 rounded ${apiStatus.available?.shodan ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  Shodan {apiStatus.available?.shodan ? '✓' : '✗'}
                </span>
                <span className={`px-2 py-1 rounded ${apiStatus.available?.hibp ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  HIBP {apiStatus.available?.hibp ? '✓' : '✗'}
                </span>
                <span className={`px-2 py-1 rounded ${apiStatus.available?.claude ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                  Claude {apiStatus.available?.claude ? '✓' : '✗'}
                </span>
                <span className="px-2 py-1 rounded bg-green-900/50 text-green-400">crt.sh ✓</span>
                <span className="px-2 py-1 rounded bg-green-900/50 text-green-400">DNS ✓</span>
              </div>
            )}

            <div className="mt-4 text-xs text-slate-600">
              {isLive
                ? 'Queries: Cloudflare DNS, crt.sh, Shodan, HIBP, Claude AI'
                : 'Using pre-cached fallback data for demo reliability'}
            </div>
          </div>
        </div>
      )}

      {/* SCANNING PHASE */}
      {phase === 'scanning' && (
        <div className="space-y-6">
          {/* Scan Progress Steps */}
          <div className="grid grid-cols-5 gap-3">
            {scanSteps.map((step, i) => (
              <div
                key={step.name}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  currentStep === i
                    ? 'border-red-500 bg-red-950/50 scale-105 shadow-lg shadow-red-500/20'
                    : currentStep > i
                    ? 'border-green-500/50 bg-green-950/30'
                    : 'border-slate-700 bg-slate-900/50'
                }`}
              >
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className={`font-bold text-sm ${currentStep >= i ? 'text-white' : 'text-slate-500'}`}>
                  {step.name}
                </div>
                {currentStep === i && (
                  <Loader2 className="absolute top-2 right-2 w-4 h-4 text-red-400 animate-spin" />
                )}
                {currentStep > i && (
                  <span className="absolute top-2 right-2 text-green-400">✓</span>
                )}
              </div>
            ))}
          </div>

          {/* Live Terminal Output */}
          <TerminalDisplay borderColor="red" height="lg" className="space-y-0.5">
            {terminalLogs.map((log, i) => (
              <TerminalLine key={i} type={log.type}>
                {log.message}
              </TerminalLine>
            ))}
            {currentStep < scanSteps.length && (
              <div className="text-slate-400 animate-pulse">█</div>
            )}
          </TerminalDisplay>

          {/* API Status */}
          <div className="flex gap-4 text-xs">
            <span className={`px-2 py-1 rounded ${apiStatus.available?.shodan ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
              Shodan {apiStatus.available?.shodan ? '✓' : '✗'}
            </span>
            <span className={`px-2 py-1 rounded ${apiStatus.available?.hibp ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
              HIBP {apiStatus.available?.hibp ? '✓' : '✗'}
            </span>
            <span className={`px-2 py-1 rounded ${apiStatus.available?.claude ? 'bg-green-900 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
              Claude AI {apiStatus.available?.claude ? '✓' : '✗'}
            </span>
            <span className="px-2 py-1 rounded bg-green-900 text-green-400">crt.sh ✓ (free)</span>
            <span className="px-2 py-1 rounded bg-green-900 text-green-400">DNS ✓ (free)</span>
          </div>
        </div>
      )}

      {/* RESULTS PHASE */}
      {phase === 'results' && findings && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Summary Stats */}
          <MetricGrid cols={5}>
            <MetricCard value={findings.employees} label="Employees Found" />
            <MetricCard value={findings.exposedServices.length} label="Exposed Services" valueColor="text-yellow-400" />
            <MetricCard value={findings.techStack.length} label="Tech Identified" valueColor="text-purple-400" />
            <MetricCard value={findings.breachData.reduce((a, b) => a + b.records, 0)} label="Leaked Creds" valueColor="text-red-400" />
            <MetricCard value={`${elapsed.toFixed(0)}s`} label="Total Time" valueColor="text-green-400" />
          </MetricGrid>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-6">
            {/* Left: OSINT Findings */}
            <div className="space-y-4">
              {/* High Value Targets */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-red-500/30">
                <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4" /> High-Value Targets
                </h4>
                <div className="space-y-2">
                  {findings.linkedInProfiles.map((profile, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-black/30 rounded-lg">
                      <div>
                        <div className="font-bold text-white">{profile.name}</div>
                        <div className="text-xs text-slate-400">{profile.role}</div>
                      </div>
                      <code className="text-xs text-red-400 bg-red-950/50 px-2 py-1 rounded">{profile.email}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exposed Services */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-yellow-500/30">
                <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4" /> Exposed Services
                </h4>
                <div className="space-y-2">
                  {findings.exposedServices.map((svc, i) => (
                    <div key={i} className="p-2 bg-black/30 rounded-lg">
                      <div className="flex justify-between">
                        <code className="text-yellow-400">{svc.service}</code>
                        <span className="text-xs text-slate-500">:{svc.port}</span>
                      </div>
                      <div className="text-xs text-slate-400">{svc.info}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breach Data */}
              <div className="bg-slate-900/50 rounded-xl p-4 border border-red-500/30">
                <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Breach Data Found
                </h4>
                <div className="space-y-2">
                  {findings.breachData.map((breach, i) => (
                    <div key={i} className="flex justify-between p-2 bg-black/30 rounded-lg">
                      <span className="text-slate-300">{breach.source}</span>
                      <span className="text-red-400 font-bold">{breach.records} {breach.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: AI Attack Plan */}
            <div className="bg-red-950/30 rounded-xl p-6 border-2 border-red-500/50">
              <h4 className="font-bold text-red-500 text-xl mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" /> AI-Generated Attack Plan
              </h4>
              <div className="space-y-3">
                {findings.attackPlan.map((step, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${
                      step.risk === 'critical' ? 'bg-red-950/50 border-red-500/50' :
                      step.risk === 'high' ? 'bg-orange-950/50 border-orange-500/50' :
                      'bg-yellow-950/50 border-yellow-500/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-white">{i + 1}. {step.phase}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded font-bold ${
                          step.risk === 'critical' ? 'bg-red-500 text-white' :
                          step.risk === 'high' ? 'bg-orange-500 text-white' :
                          'bg-yellow-500 text-black'
                        }`}>
                          {step.risk.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-400">{step.time}</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-300">{step.tactic}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-black/50 rounded-xl border border-red-500">
                <div className="text-center">
                  <div className="text-red-500 font-bold text-lg">Estimated Time to Compromise</div>
                  <div className="text-4xl font-black text-white">~11 minutes</div>
                  <div className="text-slate-400 text-sm mt-1">From recon to mailbox access</div>
                </div>
              </div>
            </div>
          </div>

          {/* CIS Controls Mapping */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-blue-500/30">
            <h4 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> CIS Controls That Would Have Helped
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-blue-400 font-bold">CIS 3:</span>
                <span className="text-slate-300 ml-2">Data Protection - Encrypt sensitive data, limit exposure</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-blue-400 font-bold">CIS 4:</span>
                <span className="text-slate-300 ml-2">Secure Configuration - Harden exposed services</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-blue-400 font-bold">CIS 7:</span>
                <span className="text-slate-300 ml-2">Continuous Vuln Management - Monitor attack surface</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-colors"
            >
              Run Another Scan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIReconDemo;
