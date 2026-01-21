import React from 'react';
import { Shield, FileText } from 'lucide-react';

// ============================================================================
// ATTENDEE TAKEAWAYS - CPE resources and downloads
// Comprehensive package of CIS mappings, scripts, and resources
// ============================================================================
export const TakeawaysSlide = ({ theme }) => {
  const cisControls = [
    { num: '3', name: 'Data Protection', demos: ['AI Recon', 'Token Heist'] },
    { num: '4', name: 'Secure Configuration', demos: ['M365 Drift Scanner', 'AI Recon'] },
    { num: '5', name: 'Account Management', demos: ['M365 Drift Scanner', 'Alert Triage'] },
    { num: '6', name: 'Access Control', demos: ['M365 Drift Scanner', 'Token Heist'] },
    { num: '7', name: 'Vulnerability Management', demos: ['AI Recon', 'Endpoint Validation'] },
    { num: '8', name: 'Audit Log Management', demos: ['Alert Triage', 'All Demos'] },
    { num: '9', name: 'Email/Browser Protections', demos: ['Endpoint Validation', 'Token Heist'] },
    { num: '10', name: 'Malware Defense', demos: ['Endpoint Validation'] },
    { num: '12', name: 'Network Infrastructure', demos: ['Network Segmentation'] },
    { num: '13', name: 'Network Monitoring', demos: ['Network Segmentation', 'Alert Triage'] },
  ];

  const resources = [
    { name: 'Guardrail Po\'boy Pattern', desc: 'Architecture template for AI+determinism', icon: '🥖' },
    { name: 'M365 Baseline Config', desc: 'JSON baseline for drift detection', icon: '⚙️' },
    { name: 'Atomic Test Scripts', desc: 'Safe endpoint validation tests', icon: '🧪' },
    { name: 'Alert Triage Prompts', desc: 'AI prompts for security analysis', icon: '🧠' },
    { name: 'Network ACL Templates', desc: 'Zone-based segmentation rules', icon: '🌐' },
    { name: 'Rewst Workflow Templates', desc: 'Pre-built automation crates', icon: '🔧' },
  ];

  return (
    <div className="w-full max-w-[90vw] mx-auto">
      <div className="text-center mb-8">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${theme.textOnPage}`}>
          CPE Takeaways Package
        </h2>
        <p className={`text-xl md:text-2xl ${theme.accentColor}`}>
          Everything you need to implement what you learned today
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CIS Control Mapping */}
        <div className={`${theme.cardBg} rounded-xl p-6 border ${theme.cardBorder}`}>
          <h3 className={`text-xl font-bold ${theme.accentColor} mb-4 flex items-center gap-2`}>
            <Shield className="w-6 h-6" /> CIS v8 Control Mapping
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {cisControls.map(c => (
              <div key={c.num} className="flex items-start gap-3 p-2 bg-black/30 rounded-lg">
                <span className={`${theme.accentColor} font-bold text-lg w-8`}>#{c.num}</span>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{c.name}</div>
                  <div className="text-slate-500 text-xs">{c.demos.join(' - ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources List */}
        <div className={`${theme.cardBg} rounded-xl p-6 border ${theme.cardBorder}`}>
          <h3 className={`text-xl font-bold ${theme.accentColor} mb-4 flex items-center gap-2`}>
            <FileText className="w-6 h-6" /> Downloadable Resources
          </h3>
          <div className="space-y-2">
            {resources.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer">
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{r.name}</div>
                  <div className="text-slate-500 text-xs">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Download */}
        <div className={`${theme.cardBg} rounded-xl p-6 border ${theme.cardBorder} lg:col-span-2`}>
          <h3 className={`text-xl font-bold ${theme.accentColor} mb-4 text-center`}>
            Scan to Download Full Package
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/tim4net/rightofboom2026&bgcolor=0f172a&color=ffffff&ecc=H"
                alt="GitHub QR"
                className="w-36 h-36 rounded-xl mx-auto mb-2"
              />
              <span className="text-slate-400 text-sm">GitHub Repo</span>
            </div>
            <div className="text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://docs.rewst.help&bgcolor=0f172a&color=ffffff&ecc=H"
                alt="Rewst Docs QR"
                className="w-36 h-36 rounded-xl mx-auto mb-2"
              />
              <span className="text-slate-400 text-sm">Rewst Docs</span>
            </div>
            <div className="text-center">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.cisecurity.org/controls/v8&bgcolor=0f172a&color=ffffff&ecc=H"
                alt="CIS v8 QR"
                className="w-36 h-36 rounded-xl mx-auto mb-2"
              />
              <span className="text-slate-400 text-sm">CIS v8 Controls</span>
            </div>
          </div>
          <p className="text-center text-slate-600 mt-4 font-mono text-xs">
            [CPE Credit: Sign attendance sheet and complete post-session survey]
          </p>
        </div>
      </div>
    </div>
  );
};
