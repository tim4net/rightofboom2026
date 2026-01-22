import React, { useState } from 'react';
import {
  Play,
  ChevronRight,
  Shield,
  Skull,
  Terminal,
  Brain,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  RotateCcw,
  Crosshair,
  Zap
} from 'lucide-react';
import { ClaudeTerminal } from '../ClaudeTerminal';

/**
 * AttackPathValidatorDemo - Real AI-powered attack path validation
 *
 * This demo shows the actual workflow:
 * 1. Collect endpoint config (real PowerShell)
 * 2. AI generates attack path (real API call or paste)
 * 3. Run Atomic Red Team tests (presenter runs on VM)
 * 4. Validate gaps are real and exploitable
 *
 * Fulfills "Think Like an Attacker" promise from session outline
 */
export const AttackPathValidatorDemo = ({ theme: t }) => {
  const [phase, setPhase] = useState(0); // 0-4
  const [selectedAttack, setSelectedAttack] = useState(0);
  const [testResults, setTestResults] = useState({});

  // Sample endpoint config (what the PowerShell script would return)
  // In live demo, presenter would show real output
  const sampleConfig = {
    Hostname: "YOURPC01",
    ASRRules: [
      { Name: "Block credential stealing from LSASS", Action: "Disabled", IsProtecting: false },
      { Name: "Block execution of potentially obfuscated scripts", Action: "Audit", IsProtecting: false },
      { Name: "Use advanced protection against ransomware", Action: "Block", IsProtecting: true },
      { Name: "Block Office applications from creating executable content", Action: "Not Configured", IsProtecting: false }
    ],
    DefenderExclusions: {
      Paths: ["C:\\Temp", "C:\\Users\\*\\Downloads\\*.ps1"],
      Extensions: [],
      Processes: ["python.exe"]
    },
    LocalAdmins: [
      { Name: "YOURPC01\\Administrator", Type: "User" },
      { Name: "YOURPC01\\helpdesk", Type: "User" },
      { Name: "DOMAIN\\Domain Admins", Type: "Group" }
    ],
    PowerShellLogging: { ScriptBlockLogging: "Disabled" }
  };

  // AI-generated attack path based on the gaps
  const attackPath = [
    {
      step: 1,
      technique: "T1059.001",
      name: "PowerShell Payload Drop",
      description: "Drop malicious script to C:\\Temp (excluded from AV scanning)",
      exploits: "Defender exclusion on C:\\Temp",
      atomicTest: "Invoke-AtomicTest T1059.001 -TestNumbers 1",
      severity: "high",
      expectedOutcome: "Payload executes without AV detection"
    },
    {
      step: 2,
      technique: "T1003.001",
      name: "LSASS Credential Dump",
      description: "Extract credentials from LSASS memory using Mimikatz technique",
      exploits: "ASR rule 'Block credential stealing from LSASS' is DISABLED",
      atomicTest: "Invoke-AtomicTest T1003.001 -TestNumbers 1",
      severity: "critical",
      expectedOutcome: "Credentials extracted - enables lateral movement"
    },
    {
      step: 3,
      technique: "T1021.002",
      name: "Lateral Movement via SMB",
      description: "Use stolen credentials to move to other systems via shared 'helpdesk' admin account",
      exploits: "Shared local admin 'helpdesk' across fleet",
      atomicTest: "Invoke-AtomicTest T1021.002 -TestNumbers 1",
      severity: "critical",
      expectedOutcome: "Access to additional endpoints with same local admin"
    },
    {
      step: 4,
      technique: "T1027",
      name: "Obfuscated Script Execution",
      description: "Run obfuscated PowerShell to evade detection",
      exploits: "ASR rule for obfuscated scripts in AUDIT mode (not blocking)",
      atomicTest: "Invoke-AtomicTest T1027 -TestNumbers 1",
      severity: "medium",
      expectedOutcome: "Obfuscated commands execute - logged but not blocked"
    }
  ];

  const phases = [
    { name: "Collect", icon: Terminal, color: "text-blue-400" },
    { name: "Analyze", icon: Brain, color: "text-purple-400" },
    { name: "Attack Path", icon: Skull, color: "text-red-400" },
    { name: "Validate", icon: Crosshair, color: "text-orange-400" },
    { name: "Results", icon: Shield, color: "text-green-400" }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const markTestResult = (index, passed) => {
    setTestResults(prev => ({ ...prev, [index]: passed }));
  };

  const resetDemo = () => {
    setPhase(0);
    setSelectedAttack(0);
    setTestResults({});
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/50';
    }
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col overflow-hidden">
      {/* Header - compact */}
      <div className="text-center mb-4 flex-shrink-0">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
          AI Attack Path <span className="text-red-400">Validator</span>
        </h2>
        <p className="text-xl text-slate-400">
          Think like an attacker. Test like an attacker. Before attackers do.
        </p>
      </div>

      {/* Phase Progress - compact */}
      <div className="flex justify-center gap-2 mb-4 flex-shrink-0">
        {phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setPhase(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              phase === i
                ? `bg-slate-700 ${p.color} border border-slate-600`
                : phase > i
                ? 'bg-slate-800/50 text-slate-500'
                : 'bg-slate-900/50 text-slate-600'
            }`}
          >
            <p.icon className="w-5 h-5" />
            <span className="font-medium">{p.name}</span>
            {phase > i && <CheckCircle2 className="w-4 h-4 text-green-500" />}
          </button>
        ))}
      </div>

      {/* Reset button */}
      {phase > 0 && (
        <button
          onClick={resetDemo}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      )}

      {/* Phase 0: Collect */}
      {phase === 0 && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Left: Instructions */}
          <div className="w-80 flex flex-col gap-3">
            <div className="bg-slate-900/70 rounded-xl p-4 border border-slate-700">
              <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Step 1: Collect Config
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                Run on your test VM:
              </p>

              <div className="bg-black rounded-lg p-2 font-mono text-sm mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-500 text-xs">PowerShell (Admin)</span>
                  <button
                    onClick={() => copyToClipboard('C:\\LabScripts\\endpoint-collector.ps1')}
                    className="p-1 hover:bg-slate-800 rounded"
                  >
                    <Copy className="w-3 h-3 text-slate-400" />
                  </button>
                </div>
                <div className="text-green-400 text-xs">
                  PS&gt; <span className="text-white">C:\LabScripts\endpoint-collector.ps1</span>
                </div>
              </div>

              <div className="text-slate-400 text-xs">
                Copy the JSON output for the next step.
              </div>
            </div>

            <button
              onClick={() => setPhase(1)}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              I've collected the data
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Sample output preview */}
          <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-sm font-bold text-slate-400 mb-3">Sample Output Preview:</h4>
            <div className="grid grid-cols-3 gap-3 font-mono text-sm">
              <div className="bg-black rounded-lg p-3">
                <div className="text-red-400 font-bold mb-2">[!] ASR GAPS</div>
                <div className="text-yellow-400">LSASS: Disabled</div>
                <div className="text-yellow-400">Obfuscated: Audit</div>
                <div className="text-yellow-400">Office exec: Not Set</div>
              </div>
              <div className="bg-black rounded-lg p-3">
                <div className="text-yellow-400 font-bold mb-2">[!] EXCLUSIONS</div>
                <div className="text-yellow-400">C:\Temp</div>
                <div className="text-yellow-400">Downloads\*.ps1</div>
                <div className="text-yellow-400">python.exe</div>
              </div>
              <div className="bg-black rounded-lg p-3">
                <div className="text-cyan-400 font-bold mb-2">[i] ADMINS</div>
                <div className="text-cyan-400">Administrator</div>
                <div className="text-cyan-400">helpdesk</div>
                <div className="text-red-400 mt-2">PS Logging: OFF</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 1: Analyze with Claude */}
      {phase === 1 && (
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Left: Instructions */}
          <div className="w-72 flex flex-col gap-3">
            <div className="bg-purple-950/30 rounded-xl p-4 border border-purple-500/30">
              <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Step 2: AI Analysis
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                Launch Claude and paste your config with a red team prompt.
              </p>
              <div className="text-slate-400 text-xs space-y-1">
                <div>1. Type: <code className="text-purple-300">claude</code></div>
                <div>2. Paste your JSON</div>
                <div>3. Ask for attack path</div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700">
              <div className="text-xs text-slate-500 mb-2">Sample prompt:</div>
              <div className="text-xs text-purple-300 font-mono">
                "You are a red team operator. Given this config, generate an attack path with MITRE IDs and Atomic tests."
              </div>
              <button
                onClick={() => copyToClipboard('You are a red team operator. Given this endpoint config, generate an attack path with: 1) MITRE technique IDs 2) Atomic Red Team test commands 3) What each gap enables')}
                className="mt-2 px-2 py-1 bg-purple-600/50 hover:bg-purple-600 rounded text-xs flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                Copy prompt
              </button>
            </div>

            <button
              onClick={() => setPhase(2)}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              Continue to Attack Path
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Claude Terminal */}
          <div className="flex-1 rounded-xl overflow-hidden border border-purple-500/30">
            <ClaudeTerminal className="h-full" />
          </div>
        </div>
      )}

      {/* Phase 2: Attack Path */}
      {phase === 2 && (
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="bg-slate-900/70 rounded-2xl p-4 border border-red-500/30">
            <h3 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-3">
              <Skull className="w-6 h-6" />
              Step 3: Your Attack Path
            </h3>
            <p className="text-slate-400 text-base mb-3">
              AI generated this attack sequence based on YOUR endpoint's gaps.
            </p>

            {/* Attack path cards - compact 2x2 grid */}
            <div className="grid grid-cols-2 gap-2">
              {attackPath.map((attack, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    selectedAttack === i
                      ? 'bg-slate-800/80 border-red-500/70'
                      : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedAttack(i)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-white text-sm">{attack.name}</div>
                      <span className="text-slate-400 font-mono text-xs">{attack.technique}</span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold uppercase ${getSeverityColor(attack.severity)}`}>
                      {attack.severity}
                    </span>
                  </div>

                  <div className="text-slate-300 text-xs mb-1">{attack.description}</div>

                  <div className="text-xs">
                    <span className="text-red-400 font-semibold">Exploits: </span>
                    <span className="text-slate-400">{attack.exploits}</span>
                  </div>

                  {selectedAttack === i && (
                    <div className="bg-black rounded p-2 font-mono mt-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Atomic Test</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); copyToClipboard(attack.atomicTest); }}
                          className="px-2 py-0.5 bg-orange-600 hover:bg-orange-500 rounded text-xs flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="text-orange-400 mt-1">{attack.atomicTest}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase(3)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto mt-4"
            >
              Run Validation Tests
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Phase 3: Validate */}
      {phase === 3 && (
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="bg-slate-900/70 rounded-2xl p-4 border border-orange-500/30">
            <h3 className="text-xl font-bold text-orange-400 mb-2 flex items-center gap-3">
              <Crosshair className="w-6 h-6" />
              Step 4: Validate Each Gap
            </h3>
            <p className="text-slate-400 text-base mb-3">
              Run each Atomic test on your VM. Mark whether it succeeded or was blocked.
            </p>

            <div className="space-y-2">
              {attackPath.map((attack, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg border ${
                    testResults[i] === true
                      ? 'bg-red-950/40 border-red-500/50'
                      : testResults[i] === false
                      ? 'bg-green-950/40 border-green-500/50'
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-orange-400 text-xs">{attack.technique}</div>
                      <div className="font-bold text-white text-sm">{attack.name}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => markTestResult(i, true)}
                        className={`px-2 py-1 rounded font-semibold text-xs flex items-center gap-1 ${
                          testResults[i] === true
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-red-600/50'
                        }`}
                      >
                        <XCircle className="w-3 h-3" />
                        Succeeded
                      </button>
                      <button
                        onClick={() => markTestResult(i, false)}
                        className={`px-2 py-1 rounded font-semibold text-xs flex items-center gap-1 ${
                          testResults[i] === false
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-green-600/50'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Blocked
                      </button>
                    </div>
                  </div>

                  <div className="bg-black rounded p-1.5 font-mono text-xs mt-1">
                    <span className="text-slate-500">PS&gt; </span>
                    <span className="text-orange-300">{attack.atomicTest}</span>
                    <button
                      onClick={() => copyToClipboard(attack.atomicTest)}
                      className="ml-2 text-slate-500 hover:text-white"
                    >
                      <Copy className="w-3 h-3 inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setPhase(4)}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto mt-4"
              disabled={Object.keys(testResults).length < attackPath.length}
            >
              See Results Summary
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Phase 4: Results */}
      {phase === 4 && (
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="bg-slate-900/70 rounded-2xl p-4 border border-green-500/30">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              Validation Results
            </h3>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800 rounded-xl p-4 text-center">
                <div className="text-4xl font-black text-white mb-1">{attackPath.length}</div>
                <div className="text-slate-400">Tests Run</div>
              </div>
              <div className="bg-red-950/50 rounded-xl p-4 text-center border border-red-500/30">
                <div className="text-4xl font-black text-red-400 mb-1">
                  {Object.values(testResults).filter(v => v === true).length}
                </div>
                <div className="text-slate-400">Gaps Found</div>
              </div>
              <div className="bg-green-950/50 rounded-xl p-4 text-center border border-green-500/30">
                <div className="text-4xl font-black text-green-400 mb-1">
                  {Object.values(testResults).filter(v => v === false).length}
                </div>
                <div className="text-slate-400">Blocked</div>
              </div>
            </div>

            {/* Remediation priorities */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mb-4">
              <h4 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Priority Remediations
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {attackPath.filter((_, i) => testResults[i] === true).map((attack, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-red-950/30 rounded-lg border border-red-500/30">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${getSeverityColor(attack.severity)}`}>
                      {attack.severity}
                    </span>
                    <div className="text-sm">
                      <span className="font-bold text-white">{attack.name}</span>
                      <span className="text-slate-400 ml-2">→ {attack.exploits.replace('is DISABLED', 'Enable').replace('in AUDIT mode', 'Set to Block').replace("ASR rule '", '').replace("'", '').replace('Defender exclusion on ', 'Remove exclusion ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The takeaway */}
            <div className="bg-gradient-to-r from-purple-950/50 to-red-950/50 rounded-xl p-4 border border-purple-500/30">
              <h4 className="font-bold text-lg text-white mb-2">The Takeaway</h4>
              <p className="text-slate-300 mb-3">
                You just used AI exactly how attackers do — to find and validate exploitable gaps.
                The difference? <span className="text-green-400 font-bold">You found them first.</span>
              </p>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2 text-purple-300">
                  <Brain className="w-4 h-4" />
                  AI generated path
                </div>
                <div className="flex items-center gap-2 text-orange-300">
                  <Crosshair className="w-4 h-4" />
                  Atomic validated it
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <Shield className="w-4 h-4" />
                  Now fix it
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttackPathValidatorDemo;
