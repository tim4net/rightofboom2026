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
            <h3 className="text-3xl font-bold text-emerald-400 mb-6">The Automation</h3>
            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Checks <span className="text-white font-semibold">60+ MITRE-recommended</span> settings</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Runs <span className="text-white font-semibold">via RMM/Rewst</span> across all endpoints</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-emerald-400 text-2xl">✓</span>
                <span className="text-2xl text-slate-300">Emails a gap report with <span className="text-white font-semibold">remediation steps</span></span>
              </div>
            </div>
            <div className="text-xl text-slate-400 mt-4">
              No agent interaction required — results in minutes.
            </div>
          </div>
        </div>
      </div>

      {/* Coverage categories */}
      <div className="w-full max-w-7xl">
        <div className="text-center mb-4">
          <span className="text-slate-400 text-xl">Coverage areas mapped to MITRE ATT&CK mitigations</span>
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
