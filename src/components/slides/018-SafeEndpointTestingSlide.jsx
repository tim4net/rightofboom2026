import React from 'react';

/**
 * MITRE ATT&CK Workstation Mitigations
 *
 * Introduces the concept of validating every Windows configuration
 * that MITRE identifies as a mitigation against attack techniques.
 */
const WorkstationMitigationsSlide = ({ theme: t }) => {
  const categories = [
    { name: 'Credential Protection', count: '8-10', color: 'text-purple-400', techniques: 'T1003, T1558, T1552' },
    { name: 'Execution Controls', count: '10-15', color: 'text-red-400', techniques: 'T1059, T1204, T1047' },
    { name: 'Privilege Escalation', count: '4-6', color: 'text-amber-400', techniques: 'T1548, T1134, T1078' },
    { name: 'Lateral Movement', count: '6-8', color: 'text-cyan-400', techniques: 'T1021, T1570, T1563' },
    { name: 'Defense Evasion', count: '4-6', color: 'text-emerald-400', techniques: 'T1562, T1027, T1218' },
    { name: 'Persistence Prevention', count: '5-8', color: 'text-pink-400', techniques: 'T1547, T1053, T1546' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-6xl font-black mb-4 ${t.textOnPage}`}>
          Workstation Configuration Mitigations
        </h2>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
          Every Windows setting MITRE says stops attackers — validated automatically
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-12 w-full max-w-7xl mb-8">

        {/* Left: MITRE ATT&CK */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-600/50 rounded-2xl p-8 h-full flex flex-col">
            <div className="mb-6">
              <img
                src="/images/mitre-attack-logo.png"
                alt="MITRE ATT&CK"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-2xl text-slate-300 leading-relaxed mb-6 flex-1">
              The ATT&CK framework documents <span className="text-cyan-400 font-semibold">what attackers do</span> and
              <span className="text-emerald-400 font-semibold"> how to stop them</span>.
              Each technique includes specific configuration mitigations —
              registry keys, group policies, and security settings that make attacks harder.
            </p>
            <div className="text-xl text-cyan-400">
              attack.mitre.org
            </div>
          </div>
        </div>

        {/* Right: Our Approach */}
        <div className="flex-1">
          <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-8 h-full flex flex-col">
            <h3 className="text-3xl font-bold text-emerald-400 mb-6">Our Approach</h3>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Extract every <span className="text-white font-semibold">workstation config</span> MITRE recommends</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Build <span className="text-white font-semibold">PowerShell checks</span> for each setting</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Run via <span className="text-white font-semibold">RMM/Rewst</span> across all endpoints</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Report gaps with <span className="text-white font-semibold">remediation steps</span></span>
              </div>
            </div>
            <div className="text-xl text-slate-400 mt-4">
              The script validates 95 settings and runs through your RMM without interaction.
            </div>
          </div>
        </div>
      </div>

      {/* Coverage categories */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4 text-center">
              <div className={`text-3xl font-bold ${cat.color}`}>{cat.count}</div>
              <div className="text-lg text-slate-300 font-medium mt-1">{cat.name}</div>
              <div className="text-sm text-slate-500 mt-1 font-mono">{cat.techniques}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkstationMitigationsSlide;
