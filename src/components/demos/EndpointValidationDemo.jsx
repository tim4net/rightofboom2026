import React, { useState, useRef } from 'react';
import { Play, Shield, RotateCcw, Loader2, AlertTriangle, FileText, Target } from 'lucide-react';

// ============================================================================
// ENDPOINT VALIDATION SUITE - Test endpoint protection controls
// DEMO 4 - PRACTICAL TAKEAWAY phase
// Atomic Red Team style testing for endpoint defenses
// CIS Controls: 9 (Email/Browser Protections), 10 (Malware Defense)
// ============================================================================
export const EndpointValidationDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, testing, results
  const [testProgress, setTestProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState(null);
  const [results, setResults] = useState([]);
  const intervalRef = useRef(null);

  // Atomic Red Team style test cases
  const testCases = [
    {
      id: 1,
      technique: 'T1059.001',
      name: 'PowerShell Execution Policy Bypass',
      category: 'Execution',
      description: 'Test if malicious PowerShell can bypass execution policy',
      command: 'powershell -ep bypass -c "Write-Host TEST"',
      expectedResult: 'blocked',
      actualResult: 'blocked',
      cisControl: 'CIS 9.2',
      icon: '⚡'
    },
    {
      id: 2,
      technique: 'T1547.001',
      name: 'Registry Run Key Persistence',
      category: 'Persistence',
      description: 'Test EDR detection of registry run key modification',
      command: 'reg add HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run /v Test',
      expectedResult: 'detected',
      actualResult: 'detected',
      cisControl: 'CIS 10.1',
      icon: '🔑'
    },
    {
      id: 3,
      technique: 'T1003.001',
      name: 'LSASS Memory Dump',
      category: 'Credential Access',
      description: 'Test if credential dumping is prevented',
      command: 'procdump -ma lsass.exe',
      expectedResult: 'blocked',
      actualResult: 'blocked',
      cisControl: 'CIS 10.2',
      icon: '🔐'
    },
    {
      id: 4,
      technique: 'T1486',
      name: 'Ransomware Simulation',
      category: 'Impact',
      description: 'Test anti-ransomware protection (safe simulation)',
      command: 'encrypt-test.exe --simulate --path C:\\Test',
      expectedResult: 'blocked',
      actualResult: 'allowed',
      cisControl: 'CIS 10.3',
      violation: true,
      icon: '💀'
    },
    {
      id: 5,
      technique: 'T1055',
      name: 'Process Injection',
      category: 'Defense Evasion',
      description: 'Test detection of process injection technique',
      command: 'inject.exe --pid explorer.exe',
      expectedResult: 'blocked',
      actualResult: 'blocked',
      cisControl: 'CIS 10.2',
      icon: '💉'
    },
    {
      id: 6,
      technique: 'T1566.001',
      name: 'Macro-Enabled Document',
      category: 'Initial Access',
      description: 'Test Office macro execution prevention',
      command: 'open invoice.xlsm (with macros)',
      expectedResult: 'blocked',
      actualResult: 'allowed',
      cisControl: 'CIS 9.4',
      violation: true,
      icon: '📄'
    },
    {
      id: 7,
      technique: 'T1071.001',
      name: 'C2 Beacon Simulation',
      category: 'Command & Control',
      description: 'Test network detection of C2 traffic patterns',
      command: 'beacon.exe --server test.evil.com',
      expectedResult: 'blocked',
      actualResult: 'blocked',
      cisControl: 'CIS 13.6',
      icon: '📡'
    },
    {
      id: 8,
      technique: 'T1053.005',
      name: 'Scheduled Task Creation',
      category: 'Persistence',
      description: 'Test detection of suspicious scheduled task',
      command: 'schtasks /create /tn "Updater" /tr malware.exe',
      expectedResult: 'detected',
      actualResult: 'detected',
      cisControl: 'CIS 10.1',
      icon: '⏰'
    },
  ];

  const totalTestTime = testCases.length * 1.5;

  const startTests = () => {
    setPhase('testing');
    setTestProgress(0);
    setResults([]);
    setCurrentTest(null);

    let testIndex = -1;
    intervalRef.current = setInterval(() => {
      setTestProgress(prev => {
        const newProgress = prev + 0.1;
        const currentTestIndex = Math.floor(newProgress / 1.5);

        if (currentTestIndex < testCases.length && currentTestIndex !== testIndex) {
          testIndex = currentTestIndex;
          setCurrentTest(testCases[currentTestIndex]);
          setResults(r => [...r, testCases[currentTestIndex]]);
        }

        if (newProgress >= totalTestTime) {
          clearInterval(intervalRef.current);
          setPhase('results');
          setResults(testCases);
          return totalTestTime;
        }
        return newProgress;
      });
    }, 100);
  };

  const reset = () => {
    setPhase('idle');
    setTestProgress(0);
    setResults([]);
    setCurrentTest(null);
    clearInterval(intervalRef.current);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Execution': 'text-purple-500 bg-purple-950/50 border-purple-500/50',
      'Persistence': 'text-orange-500 bg-orange-950/50 border-orange-500/50',
      'Credential Access': 'text-red-500 bg-red-950/50 border-red-500/50',
      'Impact': 'text-red-600 bg-red-950/70 border-red-600/50',
      'Defense Evasion': 'text-yellow-500 bg-yellow-950/50 border-yellow-500/50',
      'Initial Access': 'text-blue-500 bg-blue-950/50 border-blue-500/50',
      'Command & Control': 'text-cyan-500 bg-cyan-950/50 border-cyan-500/50',
    };
    return colors[category] || 'text-slate-500 bg-slate-950/50 border-slate-500/50';
  };

  const violations = results.filter(r => r.violation);
  const passed = results.filter(r => !r.violation);

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-orange-500 flex items-center gap-3">
            <Shield className="w-8 h-8" />
            Endpoint Validation Suite
          </h3>
          <p className="text-slate-400 text-sm mt-1">Atomic Red Team style testing for your defenses</p>
          {/* 2025 Stats Banner */}
          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-2 py-1 bg-orange-950/50 text-orange-400 rounded border border-orange-500/30">
              1,139 atomic tests available (2025)
            </span>
            <span className="px-2 py-1 bg-orange-950/50 text-orange-400 rounded border border-orange-500/30">
              224 ATT&CK techniques covered
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {phase === 'testing' && (
            <div className="text-2xl font-mono font-bold text-white">
              {Math.floor((testProgress / totalTestTime) * 100)}%
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
        <div className="space-y-6">
          {/* MITRE Coverage */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="font-bold text-lg mb-4">MITRE ATT&CK Coverage</h4>
            <div className="grid grid-cols-4 gap-3">
              {['Initial Access', 'Execution', 'Persistence', 'Credential Access', 'Defense Evasion', 'Command & Control', 'Impact'].map(cat => (
                <div key={cat} className={`p-3 rounded-lg border ${getCategoryColor(cat)} text-center`}>
                  <div className="font-bold text-sm">{cat}</div>
                  <div className="text-xs opacity-70">
                    {testCases.filter(t => t.category === cat).length} tests
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="text-6xl mb-4">🛡️</div>
            <h4 className="text-2xl font-bold mb-2">Endpoint Security Validation</h4>
            <p className="text-slate-400 mb-6">
              Run safe, simulated attacks to test your EDR, AV, and endpoint protections.
              Based on MITRE ATT&CK techniques used by real threat actors.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm max-w-md mx-auto">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-orange-400 font-bold">CIS Control 9</div>
                <div className="text-slate-400">Email & Browser</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-orange-400 font-bold">CIS Control 10</div>
                <div className="text-slate-400">Malware Defense</div>
              </div>
            </div>

            <button
              onClick={startTests}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Play className="w-5 h-5" />
              Run Validation Suite
            </button>

            <div className="mt-6 text-xs text-slate-500">
              {testCases.length} safe, non-destructive tests across {new Set(testCases.map(t => t.category)).size} attack categories
            </div>
          </div>
        </div>
      )}

      {/* TESTING PHASE */}
      {phase === 'testing' && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                <span className="font-bold text-lg">Running Security Tests...</span>
              </div>
              <span className="text-slate-400">
                {results.length} / {testCases.length} tests
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-100"
                style={{ width: `${(testProgress / totalTestTime) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Test */}
          {currentTest && (
            <div className={`p-6 rounded-xl border-2 ${getCategoryColor(currentTest.category)} animate-pulse`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{currentTest.icon}</span>
                  <div>
                    <div className="font-bold text-xl text-white">{currentTest.name}</div>
                    <div className="text-sm opacity-70">{currentTest.technique} - {currentTest.category}</div>
                  </div>
                </div>
                <span className="text-orange-400 font-mono">Testing...</span>
              </div>
              <div className="text-sm text-slate-300">{currentTest.description}</div>
              <div className="mt-2 p-2 bg-black/30 rounded font-mono text-xs text-slate-400">
                $ {currentTest.command}
              </div>
            </div>
          )}

          {/* Results so far */}
          <div className="bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed border border-slate-700 relative z-10 isolate shadow-xl h-48 overflow-y-auto space-y-1">
            <div className="text-orange-500">$ endpoint-validation --suite all --safe-mode</div>
            {results.map((test, i) => (
              <div key={i} className={test.violation ? 'text-red-400' : 'text-green-400'}>
                [{test.violation ? 'FAIL' : 'PASS'}] {test.technique}: {test.name}
                {test.violation && ' - PROTECTION GAP DETECTED'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS PHASE */}
      {phase === 'results' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700 text-center">
              <div className="text-3xl font-black text-white">{results.length}</div>
              <div className="text-slate-400 text-sm">Tests Run</div>
            </div>
            <div className="bg-green-950/50 rounded-xl p-4 border border-green-500/50 text-center">
              <div className="text-3xl font-black text-green-500">{passed.length}</div>
              <div className="text-slate-400 text-sm">Protected</div>
            </div>
            <div className="bg-red-950/50 rounded-xl p-4 border border-red-500/50 text-center">
              <div className="text-3xl font-black text-red-500">{violations.length}</div>
              <div className="text-slate-400 text-sm">Gaps Found</div>
            </div>
            <div className={`rounded-xl p-4 border text-center ${violations.length > 0 ? 'bg-yellow-950/50 border-yellow-500/50' : 'bg-green-950/50 border-green-500/50'}`}>
              <div className={`text-3xl font-black ${violations.length > 0 ? 'text-yellow-500' : 'text-green-500'}`}>
                {Math.round((passed.length / results.length) * 100)}%
              </div>
              <div className="text-slate-400 text-sm">Score</div>
            </div>
          </div>

          {/* Protection Gaps */}
          {violations.length > 0 && (
            <div className="bg-red-950/30 rounded-xl p-6 border-2 border-red-500/50">
              <h4 className="font-bold text-red-500 text-xl mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Protection Gaps Detected
              </h4>
              <div className="space-y-3">
                {violations.map(v => (
                  <div key={v.id} className="p-4 bg-black/30 rounded-lg border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{v.icon}</span>
                        <div>
                          <div className="font-bold text-white">{v.name}</div>
                          <div className="text-xs text-slate-400">{v.technique} - {v.category}</div>
                        </div>
                      </div>
                      <span className="text-red-500 font-mono text-sm">{v.cisControl}</span>
                    </div>
                    <div className="text-sm text-slate-300">{v.description}</div>
                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-green-400">Expected: {v.expectedResult.toUpperCase()}</span>
                      <span className="text-red-400">Actual: {v.actualResult.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Results */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="font-bold text-lg mb-4">Full Test Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Technique</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Expected</th>
                    <th className="pb-2">Actual</th>
                    <th className="pb-2">CIS</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map(r => (
                    <tr key={r.id} className={`border-b border-slate-800 ${r.violation ? 'bg-red-950/20' : ''}`}>
                      <td className="py-2">
                        {r.violation
                          ? <span className="text-red-500 font-bold">FAIL</span>
                          : <span className="text-green-500 font-bold">PASS</span>
                        }
                      </td>
                      <td className="py-2 font-mono text-orange-400">{r.technique}</td>
                      <td className="py-2">{r.name}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(r.category)}`}>
                          {r.category}
                        </span>
                      </td>
                      <td className="py-2">{r.expectedResult}</td>
                      <td className="py-2">{r.actualResult}</td>
                      <td className="py-2 text-blue-400">{r.cisControl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Takeaway */}
          <div className="bg-orange-950/30 rounded-xl p-6 border border-orange-500/30">
            <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Your Takeaway
            </h4>
            <div className="text-slate-300 text-sm mb-4">
              You can build this! The test suite uses safe, simulated techniques that validate
              your EDR/AV without causing harm. Automate this on a schedule to catch protection gaps
              before attackers find them.
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-orange-600 hover:bg-orange-500 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> Export Test Report
              </button>
              <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                <Target className="w-4 h-4" /> Download Test Scripts
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
