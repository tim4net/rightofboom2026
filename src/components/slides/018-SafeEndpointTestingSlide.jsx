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
      {/* Header with tension */}
      <div className="text-center mb-6">
        <h2 className={`text-6xl font-black mb-3 ${t.textOnPage}`}>
          Endpoint Posture Check
        </h2>
        <p className="text-2xl text-slate-400">
          9 categories. 66 settings. Hundreds of endpoints.
          <span className="text-cyan-400 font-semibold"> How do you validate them all?</span>
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

        {/* Right: Workflow */}
        <div className="flex-1">
          <div className="bg-ops-indigo-400/20 border border-ops-indigo-400/40 rounded-2xl p-8 h-full flex flex-col">
            <h3 className={`text-4xl font-black mb-2 ${t.textOnPage}`}>Workflow</h3>
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {[
                'Call RMM to run script on endpoints',
                'Collect JSON results',
                'Send to AI for analysis',
                'Technician gets prioritized fixes, not raw data',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bot-teal-400 flex items-center justify-center text-white text-xl font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="text-2xl text-slate-200">{step}</div>
                </div>
              ))}
            </div>
            <a
              href="https://app.rewst.io/organizations/5b3f70a7-566b-4f4f-9232-0ac2ec41e4e6/workflows/019be802-43d7-7ed5-894e-440f1149e4dd?selectedTriggerId=019be807-e3e0-7468-a86d-1f7a5c70e6b8&selectedTaskId=fc8d2b1dd2014cd9acc6c2cc1f48aef6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-xl text-bot-teal-400 hover:text-bot-teal-300"
            >
              View workflow →
            </a>
          </div>
        </div>
      </div>

      {/* Coverage categories with quantified impact */}
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {categories.map((cat) => (
            <div key={cat} className="bg-slate-700/50 border border-slate-500/30 rounded-full px-5 py-2">
              <span className="text-lg text-slate-200">{cat}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-2xl text-emerald-400 font-semibold">66 MITRE-mapped settings validated per endpoint</span>
          <span className="text-slate-500 mx-3">·</span>
          <span className="text-xl text-slate-400">Let's look at the script →</span>
        </div>
      </div>
    </div>
  );
};

export default WorkstationMitigationsSlide;
