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
import { ShellTerminal } from '../ShellTerminal';

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
    <div className={`w-full h-full mx-auto flex flex-col overflow-hidden px-4 ${phase === 1 ? 'max-w-[95vw]' : 'max-w-7xl'}`}>
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
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Top section: Instructions + Command */}
          <div className="flex items-start justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-blue-400 mb-3 flex items-center gap-4">
                <Terminal className="w-10 h-10" />
                Step 1: Collect Endpoint Configuration
              </h3>
              <p className="text-slate-300 text-2xl">
                Run this command on your test VM to gather security configuration:
              </p>
            </div>
            <button
              onClick={() => setPhase(1)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xl flex items-center gap-3 flex-shrink-0"
            >
              I've collected the data
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* PowerShell command - BIG */}
          <div className="bg-black rounded-2xl p-6 font-mono border-2 border-blue-500/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-lg">PowerShell (Run as Admin)</span>
              <button
                onClick={() => copyToClipboard('C:\\LabScripts\\endpoint-collector.ps1')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-lg font-bold flex items-center gap-3"
              >
                <Copy className="w-5 h-5" />
                Copy Command
              </button>
            </div>
            <div className="text-3xl">
              <span className="text-green-400">PS&gt;</span>{' '}
              <span className="text-white">C:\LabScripts\endpoint-collector.ps1</span>
            </div>
          </div>

          {/* Sample output - EXPANDED */}
          <div className="flex-1 flex flex-col">
            <div className="text-slate-400 text-xl mb-4">Sample output showing detected gaps:</div>
            <div className="flex-1 grid grid-cols-3 gap-6 font-mono">
              {/* ASR GAPS */}
              <div className="bg-black/60 rounded-2xl p-6 border-2 border-red-500/50 flex flex-col">
                <div className="text-red-400 font-black text-2xl mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8" />
                  ASR GAPS
                </div>
                <div className="flex-1 space-y-4 text-xl">
                  <div className="flex justify-between items-center p-3 bg-red-950/30 rounded-lg">
                    <span className="text-slate-300">LSASS Protection</span>
                    <span className="text-red-400 font-bold">DISABLED</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-950/30 rounded-lg">
                    <span className="text-slate-300">Obfuscated Scripts</span>
                    <span className="text-yellow-400 font-bold">AUDIT ONLY</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Office Exec Block</span>
                    <span className="text-slate-500 font-bold">NOT SET</span>
                  </div>
                </div>
              </div>

              {/* EXCLUSIONS */}
              <div className="bg-black/60 rounded-2xl p-6 border-2 border-yellow-500/50 flex flex-col">
                <div className="text-yellow-400 font-black text-2xl mb-4 flex items-center gap-3">
                  <Shield className="w-8 h-8" />
                  DEFENDER EXCLUSIONS
                </div>
                <div className="flex-1 space-y-4 text-xl">
                  <div className="p-3 bg-yellow-950/30 rounded-lg">
                    <span className="text-yellow-300 font-mono">C:\Temp</span>
                    <div className="text-slate-500 text-base mt-1">Full path excluded</div>
                  </div>
                  <div className="p-3 bg-yellow-950/30 rounded-lg">
                    <span className="text-yellow-300 font-mono">Downloads\*.ps1</span>
                    <div className="text-slate-500 text-base mt-1">All PS1 in Downloads</div>
                  </div>
                  <div className="p-3 bg-yellow-950/30 rounded-lg">
                    <span className="text-yellow-300 font-mono">python.exe</span>
                    <div className="text-slate-500 text-base mt-1">Process excluded</div>
                  </div>
                </div>
              </div>

              {/* ADMINS + LOGGING */}
              <div className="bg-black/60 rounded-2xl p-6 border-2 border-cyan-500/50 flex flex-col">
                <div className="text-cyan-400 font-black text-2xl mb-4 flex items-center gap-3">
                  <Skull className="w-8 h-8" />
                  LOCAL ADMINS
                </div>
                <div className="flex-1 space-y-4 text-xl">
                  <div className="p-3 bg-cyan-950/30 rounded-lg">
                    <span className="text-cyan-300">Administrator</span>
                    <div className="text-slate-500 text-base mt-1">Built-in account</div>
                  </div>
                  <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                    <span className="text-red-400 font-bold">helpdesk</span>
                    <div className="text-red-400/70 text-base mt-1">⚠️ Shared across fleet!</div>
                  </div>
                  <div className="p-3 bg-red-950/50 rounded-lg border border-red-500/50">
                    <span className="text-slate-300">PowerShell Logging</span>
                    <span className="text-red-400 font-black ml-3">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phase 1: Analyze with Claude - Just a terminal */}
      {phase === 1 && (
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
          {/* Prompt to copy */}
          <div className="flex-shrink-0 bg-slate-800/80 rounded-xl p-4 border border-purple-500/30">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1 font-mono text-base text-slate-300">
                <span className="text-purple-400 font-bold">Prompt:</span> You are a red team operator. Given this endpoint config, generate an attack path with: 1) MITRE technique IDs 2) Atomic Red Team test commands 3) What each gap enables
              </div>
              <button
                onClick={() => copyToClipboard('You are a red team operator. Given this endpoint config, generate an attack path with: 1) MITRE technique IDs 2) Atomic Red Team test commands 3) What each gap enables')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold flex items-center gap-2 flex-shrink-0"
              >
                <Copy className="w-4 h-4" />
                Copy Prompt
              </button>
            </div>
          </div>

          {/* Terminal fills the space */}
          <div className="flex-1 rounded-xl overflow-hidden border-2 border-purple-500/50">
            <ShellTerminal className="h-full" />
          </div>

          {/* Footer with Continue */}
          <div className="flex justify-end flex-shrink-0">
            <button
              onClick={() => setPhase(2)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-lg flex items-center gap-2"
            >
              Continue to Attack Path
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Phase 2: Attack Path */}
      {phase === 2 && (
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3">
                <Skull className="w-7 h-7" />
                Step 3: Your Attack Path
              </h3>
              <p className="text-slate-400 text-lg mt-1">
                AI generated this attack sequence based on YOUR endpoint's gaps.
              </p>
            </div>
            <button
              onClick={() => setPhase(3)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-lg flex items-center gap-2"
            >
              Run Validation Tests
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Attack path cards - expanded 2x2 grid */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {attackPath.map((attack, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col ${
                  selectedAttack === i
                    ? 'bg-slate-800/80 border-red-500/70'
                    : 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setSelectedAttack(i)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-500">#{attack.step}</span>
                    <div className="font-bold text-white text-xl">{attack.name}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-base">{attack.technique}</span>
                    <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${getSeverityColor(attack.severity)}`}>
                      {attack.severity}
                    </span>
                  </div>
                </div>

                <div className="text-slate-300 text-lg mb-3">{attack.description}</div>

                <div className="text-base mb-3">
                  <span className="text-red-400 font-semibold">Exploits: </span>
                  <span className="text-slate-400">{attack.exploits}</span>
                </div>

                <div className="bg-black rounded-lg p-3 font-mono mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 text-sm">Atomic Test Command</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); copyToClipboard(attack.atomicTest); }}
                      className="px-3 py-1 bg-orange-600 hover:bg-orange-500 rounded text-sm flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                  <div className="text-orange-400 text-base">{attack.atomicTest}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 3: Validate */}
      {phase === 3 && (
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-orange-400 flex items-center gap-3">
                <Crosshair className="w-7 h-7" />
                Step 4: Validate Each Gap
              </h3>
              <p className="text-slate-400 text-lg mt-1">
                Run each Atomic test on your VM. Mark whether it succeeded or was blocked.
              </p>
            </div>
            <button
              onClick={() => setPhase(4)}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-lg flex items-center gap-2"
              disabled={Object.keys(testResults).length < attackPath.length}
            >
              See Results Summary
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-4">
            {attackPath.map((attack, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl border flex flex-col ${
                  testResults[i] === true
                    ? 'bg-red-950/40 border-red-500/50'
                    : testResults[i] === false
                    ? 'bg-green-950/40 border-green-500/50'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-500">#{attack.step}</span>
                    <div className="font-mono text-orange-400 text-lg">{attack.technique}</div>
                    <div className="font-bold text-white text-xl">{attack.name}</div>
                  </div>
                  <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${getSeverityColor(attack.severity)}`}>
                    {attack.severity}
                  </span>
                </div>

                <div className="bg-black rounded-lg p-4 font-mono flex-1 mb-4">
                  <div className="text-slate-500 text-sm mb-2">Command to run:</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500">PS&gt; </span>
                      <span className="text-orange-300 text-lg">{attack.atomicTest}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(attack.atomicTest)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => markTestResult(i, true)}
                    className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
                      testResults[i] === true
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-red-600/50'
                    }`}
                  >
                    <XCircle className="w-5 h-5" />
                    Attack Succeeded (Gap!)
                  </button>
                  <button
                    onClick={() => markTestResult(i, false)}
                    className={`px-6 py-3 rounded-lg font-bold text-lg flex items-center gap-2 ${
                      testResults[i] === false
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-green-600/50'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Blocked (Protected)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Phase 4: Results */}
      {phase === 4 && (
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          <h3 className="text-2xl font-bold text-green-400 flex items-center gap-3">
            <Shield className="w-7 h-7" />
            Validation Results
          </h3>

          {/* Summary stats - large */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-2xl p-8 text-center">
              <div className="text-7xl font-black text-white mb-2">{attackPath.length}</div>
              <div className="text-slate-400 text-xl">Tests Run</div>
            </div>
            <div className="bg-red-950/50 rounded-2xl p-8 text-center border-2 border-red-500/50">
              <div className="text-7xl font-black text-red-400 mb-2">
                {Object.values(testResults).filter(v => v === true).length}
              </div>
              <div className="text-slate-400 text-xl">Gaps Confirmed</div>
            </div>
            <div className="bg-green-950/50 rounded-2xl p-8 text-center border-2 border-green-500/50">
              <div className="text-7xl font-black text-green-400 mb-2">
                {Object.values(testResults).filter(v => v === false).length}
              </div>
              <div className="text-slate-400 text-xl">Attacks Blocked</div>
            </div>
          </div>

          {/* Two column layout for remediations and takeaway */}
          <div className="flex-1 grid grid-cols-2 gap-6">
            {/* Remediation priorities */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col">
              <h4 className="font-bold text-2xl text-white mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Priority Remediations
              </h4>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {attackPath.filter((_, i) => testResults[i] === true).map((attack, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-red-950/30 rounded-xl border border-red-500/30">
                    <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${getSeverityColor(attack.severity)}`}>
                      {attack.severity}
                    </span>
                    <div className="text-lg">
                      <span className="font-bold text-white">{attack.name}</span>
                      <span className="text-slate-400 ml-3">→ {attack.exploits.replace('is DISABLED', 'Enable').replace('in AUDIT mode', 'Set to Block').replace("ASR rule '", '').replace("'", '').replace('Defender exclusion on ', 'Remove exclusion ')}</span>
                    </div>
                  </div>
                ))}
                {attackPath.filter((_, i) => testResults[i] === true).length === 0 && (
                  <div className="text-slate-500 text-lg text-center py-8">
                    No gaps found - all attacks were blocked!
                  </div>
                )}
              </div>
            </div>

            {/* The takeaway */}
            <div className="bg-gradient-to-br from-purple-950/50 to-red-950/50 rounded-2xl p-6 border border-purple-500/30 flex flex-col">
              <h4 className="font-bold text-2xl text-white mb-4">The Takeaway</h4>
              <p className="text-slate-300 text-xl mb-6 flex-1">
                You just used AI exactly how attackers do — to find and validate exploitable gaps.
                The difference? <span className="text-green-400 font-bold text-2xl">You found them first.</span>
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded-xl">
                  <Brain className="w-10 h-10 text-purple-400" />
                  <span className="text-purple-300 text-lg font-semibold">AI Generated</span>
                  <span className="text-slate-500 text-sm">Attack Path</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded-xl">
                  <Crosshair className="w-10 h-10 text-orange-400" />
                  <span className="text-orange-300 text-lg font-semibold">Atomic Tested</span>
                  <span className="text-slate-500 text-sm">Validation</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 bg-black/30 rounded-xl">
                  <Shield className="w-10 h-10 text-green-400" />
                  <span className="text-green-300 text-lg font-semibold">Now Fix It</span>
                  <span className="text-slate-500 text-sm">Before They Do</span>
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
