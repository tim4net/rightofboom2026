import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Globe, Loader2, AlertTriangle, Shield, FileText } from 'lucide-react';

// ============================================================================
// NETWORK SEGMENTATION TESTER - Validates network isolation
// Part of "Continuous Validation Loop" (DEMO 3B) - EMPOWERMENT phase
// CIS Controls: 12 (Network Infrastructure), 13 (Network Monitoring)
// ============================================================================
export const NetworkSegmentationDemo = ({ theme }) => {
  const [phase, setPhase] = useState('idle'); // idle, testing, results
  const [testProgress, setTestProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState(null);
  const [results, setResults] = useState([]);
  const intervalRef = useRef(null);

  // Network zones for visualization
  const networkZones = [
    { id: 'internet', name: 'Internet', color: 'red', icon: '🌐' },
    { id: 'dmz', name: 'DMZ', color: 'orange', icon: '🛡️' },
    { id: 'user', name: 'User VLAN', color: 'blue', icon: '💻' },
    { id: 'server', name: 'Server VLAN', color: 'purple', icon: '🖥️' },
    { id: 'db', name: 'Database VLAN', color: 'green', icon: '🗄️' },
    { id: 'mgmt', name: 'Management', color: 'yellow', icon: '⚙️' },
  ];

  // Segmentation tests with expected results
  const segmentationTests = [
    {
      id: 1,
      from: 'internet',
      to: 'dmz',
      port: 443,
      protocol: 'HTTPS',
      expected: 'allow',
      actual: 'allow',
      description: 'Public web access to DMZ',
      cisControl: 'CIS 12.1'
    },
    {
      id: 2,
      from: 'internet',
      to: 'server',
      port: 22,
      protocol: 'SSH',
      expected: 'deny',
      actual: 'deny',
      description: 'Direct SSH to servers from internet',
      cisControl: 'CIS 12.2'
    },
    {
      id: 3,
      from: 'user',
      to: 'server',
      port: 443,
      protocol: 'HTTPS',
      expected: 'allow',
      actual: 'allow',
      description: 'User access to internal apps',
      cisControl: 'CIS 12.3'
    },
    {
      id: 4,
      from: 'user',
      to: 'db',
      port: 1433,
      protocol: 'MSSQL',
      expected: 'deny',
      actual: 'allow',
      description: 'Direct database access from users',
      cisControl: 'CIS 12.4',
      violation: true
    },
    {
      id: 5,
      from: 'server',
      to: 'db',
      port: 1433,
      protocol: 'MSSQL',
      expected: 'allow',
      actual: 'allow',
      description: 'App servers to database',
      cisControl: 'CIS 12.4'
    },
    {
      id: 6,
      from: 'dmz',
      to: 'mgmt',
      port: 22,
      protocol: 'SSH',
      expected: 'deny',
      actual: 'allow',
      description: 'DMZ to Management SSH',
      cisControl: 'CIS 12.6',
      violation: true
    },
    {
      id: 7,
      from: 'user',
      to: 'mgmt',
      port: 3389,
      protocol: 'RDP',
      expected: 'deny',
      actual: 'deny',
      description: 'User RDP to management',
      cisControl: 'CIS 12.6'
    },
    {
      id: 8,
      from: 'internet',
      to: 'db',
      port: 1433,
      protocol: 'MSSQL',
      expected: 'deny',
      actual: 'deny',
      description: 'Internet direct to database',
      cisControl: 'CIS 12.2'
    },
  ];

  const totalTestTime = segmentationTests.length * 1.5; // 1.5s per test

  const startTests = () => {
    setPhase('testing');
    setTestProgress(0);
    setResults([]);
    setCurrentTest(null);

    let testIndex = 0;
    intervalRef.current = setInterval(() => {
      setTestProgress(prev => {
        const newProgress = prev + 0.1;
        const currentTestIndex = Math.floor(newProgress / 1.5);

        if (currentTestIndex < segmentationTests.length && currentTestIndex !== testIndex) {
          testIndex = currentTestIndex;
          setCurrentTest(segmentationTests[currentTestIndex]);
          setResults(r => [...r, segmentationTests[currentTestIndex]]);
        }

        if (newProgress >= totalTestTime) {
          clearInterval(intervalRef.current);
          setPhase('results');
          setResults(segmentationTests);
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

  const getZoneColor = (zoneId) => {
    const zone = networkZones.find(z => z.id === zoneId);
    const colors = {
      red: 'text-red-500 bg-red-950/50 border-red-500/50',
      orange: 'text-orange-500 bg-orange-950/50 border-orange-500/50',
      blue: 'text-blue-500 bg-blue-950/50 border-blue-500/50',
      purple: 'text-purple-500 bg-purple-950/50 border-purple-500/50',
      green: 'text-green-500 bg-green-950/50 border-green-500/50',
      yellow: 'text-yellow-500 bg-yellow-950/50 border-yellow-500/50',
    };
    return colors[zone?.color] || colors.blue;
  };

  const violations = results.filter(r => r.violation);
  const passed = results.filter(r => !r.violation);

  return (
    <div className="w-full max-w-[95vw] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-3xl font-bold text-cyan-500 flex items-center gap-3">
            <Globe className="w-8 h-8" />
            Network Segmentation Tester
          </h3>
          <p className="text-slate-400 text-sm mt-1">Automated validation of network isolation rules</p>
          {/* 2025 Stats Banner */}
          <div className="flex gap-3 mt-2 text-xs">
            <span className="px-2 py-1 bg-cyan-950/50 text-cyan-400 rounded border border-cyan-500/30">
              Aligned with CISA July 2025 guidance
            </span>
            <span className="px-2 py-1 bg-cyan-950/50 text-cyan-400 rounded border border-cyan-500/30">
              Zero Trust continuous validation
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
          {/* Network Diagram */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-700">
            <h4 className="font-bold text-lg mb-4 text-center">Network Architecture</h4>
            <div className="grid grid-cols-6 gap-4">
              {networkZones.map(zone => (
                <div
                  key={zone.id}
                  className={`p-4 rounded-xl border-2 text-center ${getZoneColor(zone.id)}`}
                >
                  <div className="text-3xl mb-2">{zone.icon}</div>
                  <div className="font-bold text-sm">{zone.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700 text-center">
            <div className="text-6xl mb-4">🔬</div>
            <h4 className="text-2xl font-bold mb-2">Network Segmentation Test Suite</h4>
            <p className="text-slate-400 mb-6">
              Validate that your network segmentation rules match your security policy.
              Tests traffic flows between zones to detect misconfigurations.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm max-w-md mx-auto">
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-cyan-400 font-bold">CIS Control 12</div>
                <div className="text-slate-400">Network Infrastructure</div>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-cyan-400 font-bold">CIS Control 13</div>
                <div className="text-slate-400">Network Monitoring</div>
              </div>
            </div>

            <button
              onClick={startTests}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition-colors"
            >
              <Play className="w-5 h-5" />
              Run Segmentation Tests
            </button>

            <div className="mt-6 text-xs text-slate-500">
              {segmentationTests.length} tests across {networkZones.length} network zones
            </div>
          </div>
        </div>
      )}

      {/* TESTING PHASE */}
      {phase === 'testing' && (
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                <span className="font-bold text-lg">Testing Network Flows...</span>
              </div>
              <span className="text-slate-400">
                {results.length} / {segmentationTests.length} tests
              </span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-100"
                style={{ width: `${(testProgress / totalTestTime) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Test */}
          {currentTest && (
            <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/50 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`p-3 rounded-lg ${getZoneColor(currentTest.from)}`}>
                    {networkZones.find(z => z.id === currentTest.from)?.icon}
                  </div>
                  <div className="text-2xl text-slate-400">→</div>
                  <div className={`p-3 rounded-lg ${getZoneColor(currentTest.to)}`}>
                    {networkZones.find(z => z.id === currentTest.to)?.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white">{currentTest.description}</div>
                    <div className="text-sm text-slate-400">
                      {currentTest.protocol} port {currentTest.port}
                    </div>
                  </div>
                </div>
                <div className="text-cyan-400 font-mono">Testing...</div>
              </div>
            </div>
          )}

          {/* Results so far */}
          <div className="bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed border border-slate-700 relative z-10 isolate shadow-xl h-48 overflow-y-auto space-y-1">
            <div className="text-cyan-500">$ seg-test --all-zones --verbose</div>
            {results.map((test, i) => (
              <div key={i} className={test.violation ? 'text-red-400' : 'text-green-400'}>
                [{test.violation ? 'FAIL' : 'PASS'}] {networkZones.find(z => z.id === test.from)?.name} → {networkZones.find(z => z.id === test.to)?.name} ({test.protocol}:{test.port}){test.violation ? ' - VIOLATION: Expected DENY' : ''}
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
              <div className="text-slate-400 text-sm">Passed</div>
            </div>
            <div className="bg-red-950/50 rounded-xl p-4 border border-red-500/50 text-center">
              <div className="text-3xl font-black text-red-500">{violations.length}</div>
              <div className="text-slate-400 text-sm">Violations</div>
            </div>
            <div className={`rounded-xl p-4 border text-center ${violations.length > 0 ? 'bg-red-950/50 border-red-500/50' : 'bg-green-950/50 border-green-500/50'}`}>
              <div className={`text-3xl font-black ${violations.length > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {violations.length > 0 ? 'AT RISK' : 'SECURE'}
              </div>
              <div className="text-slate-400 text-sm">Overall Status</div>
            </div>
          </div>

          {/* Violations Alert */}
          {violations.length > 0 && (
            <div className="bg-red-950/30 rounded-xl p-6 border-2 border-red-500/50">
              <h4 className="font-bold text-red-500 text-xl mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Segmentation Violations Detected
              </h4>
              <div className="space-y-3">
                {violations.map(v => (
                  <div key={v.id} className="p-4 bg-black/30 rounded-lg border border-red-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded text-sm ${getZoneColor(v.from)}`}>
                          {networkZones.find(z => z.id === v.from)?.name}
                        </span>
                        <span className="text-slate-400">→</span>
                        <span className={`px-2 py-1 rounded text-sm ${getZoneColor(v.to)}`}>
                          {networkZones.find(z => z.id === v.to)?.name}
                        </span>
                      </div>
                      <span className="text-red-500 font-mono text-sm">{v.protocol}:{v.port}</span>
                    </div>
                    <div className="text-slate-300 text-sm">{v.description}</div>
                    <div className="flex justify-between mt-2 text-xs">
                      <span className="text-slate-500">{v.cisControl}</span>
                      <span className="text-red-400">Expected: DENY | Actual: ALLOW</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Results Table */}
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700">
            <h4 className="font-bold text-lg mb-4">All Test Results</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2">Status</th>
                    <th className="pb-2">From</th>
                    <th className="pb-2">To</th>
                    <th className="pb-2">Protocol</th>
                    <th className="pb-2">Port</th>
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
                      <td className="py-2">{networkZones.find(z => z.id === r.from)?.name}</td>
                      <td className="py-2">{networkZones.find(z => z.id === r.to)?.name}</td>
                      <td className="py-2 font-mono">{r.protocol}</td>
                      <td className="py-2 font-mono">{r.port}</td>
                      <td className="py-2">
                        <span className={r.expected === 'allow' ? 'text-green-400' : 'text-red-400'}>
                          {r.expected.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2">
                        <span className={r.actual === 'allow' ? 'text-green-400' : 'text-red-400'}>
                          {r.actual.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 text-blue-400">{r.cisControl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Remediation Actions */}
          {violations.length > 0 && (
            <div className="bg-cyan-950/30 rounded-xl p-4 border border-cyan-500/30">
              <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Recommended Actions
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Generate Firewall Rules
                </button>
                <button className="p-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold transition-colors flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Create Tickets
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
