import React from 'react';

/**
 * MITRE ATT&CK Workstation Mitigations
 *
 * Introduces the concept of validating every Windows configuration
 * that MITRE identifies as a mitigation against attack techniques.
 */
const WorkstationMitigationsSlide = ({ theme: t }) => {
  const categories = [
    'Credential Protection',
    'Execution Controls',
    'Privilege Escalation',
    'Lateral Movement',
    'Defense Evasion',
    'Persistence Prevention',
    'Antivirus & ASR',
    'Network Security',
    'Logging & Monitoring',
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-6xl font-black mb-4 ${t.textOnPage}`}>
          Endpoint Posture Check
        </h2>
        <p className={`text-3xl ${t.accentColor} font-medium`}>
 
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-12 w-full max-w-7xl mb-8">

        {/* Left: MITRE ATT&CK */}
        <div className="flex-1">
          <div className="bg-ops-indigo-100/30 border border-ops-indigo-300/50 rounded-2xl p-8 h-full flex flex-col">
            <div className="mb-6">
              <img
                src="/images/mitre-attack-logo-color.svg"
                alt="MITRE ATT&CK"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-2xl text-slate-300 leading-relaxed mb-6 flex-1">
              The ATT&CK framework documents <span className="text-cyan-400 font-semibold">what attackers do</span> and
              <span className="text-emerald-400 font-semibold"> how to stop them</span>.
              Each technique includes specific configuration mitigations:
              registry keys, group policies, and security settings that make attacks harder.
            </p>
            <div className="text-xl text-cyan-400">
              attack.mitre.org
            </div>
          </div>
        </div>

        {/* Right: What to Check */}
        <div className="flex-1">
          <div className="bg-slate-800/50 border border-slate-600/50 rounded-2xl p-8 h-full flex flex-col">
            <h3 className="text-3xl font-bold text-slate-200 mb-6">What MITRE Recommends</h3>
            <div className="space-y-4 flex-1 text-2xl text-slate-300 leading-relaxed">
              <p>
                For each attack technique, MITRE lists <span className="text-amber-400 font-semibold">specific Windows settings</span> that
                make the attack harder or impossible.
              </p>
              <p>
                The mitigations are <span className="text-amber-400 font-semibold">registry keys, group policies,
                and built-in security features</span>. Many are disabled by default.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage categories */}
      <div className="w-full max-w-7xl">
        <div className="text-center mb-4">
          <span className="text-slate-400 text-xl">ATT&CK mitigation categories relevant to workstations</span>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <div key={cat} className="bg-slate-700/50 border border-slate-500/30 rounded-full px-5 py-2">
              <span className="text-lg text-slate-200">{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkstationMitigationsSlide;
