import React from 'react';

const CISDeepDiveSlide = ({ slide, theme: t }) => {
  const controls = [
    { num: '4', name: 'Secure Config', demo: 'M365 Drift', color: 'blue' },
    { num: '5', name: 'Account Mgmt', demo: 'Alert Triage', color: 'green' },
    { num: '6', name: 'Access Control', demo: 'Token Heist', color: 'purple' },
    { num: '8', name: 'Audit Logs', demo: 'All Demos', color: 'yellow' },
    { num: '9', name: 'Email/Browser', demo: 'Endpoint Val', color: 'orange' },
    { num: '12-13', name: 'Network', demo: 'Segmentation', color: 'teal' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[90vw] mx-auto">
        {controls.map(c => (
          <div key={c.num} className={`${t.cardBg} rounded-xl p-4 border ${t.cardBorder} hover:scale-105 transition-transform`}>
            <div className={`text-3xl font-black ${t.accentColor} mb-1`}>#{c.num}</div>
            <div className="text-white font-bold text-sm mb-2">{c.name}</div>
            <div className="text-xs text-slate-500">Demo: {c.demo}</div>
          </div>
        ))}
      </div>
      <div className={`mt-8 ${t.cardBg} rounded-xl p-6 border ${t.cardBorder} max-w-3xl mx-auto text-center`}>
        <p className="text-lg text-slate-300">
          Every demo today maps back to specific CIS Controls.
          <span className={`${t.accentColor} font-bold`}> Compliance isn't checkbox theater</span>—it's
          the blueprint for automation.
        </p>
      </div>
    </div>
  );
};

export default CISDeepDiveSlide;
