import React from 'react';
import { AlertTriangle, Shield, XCircle, CheckCircle } from 'lucide-react';

const FailureModesSlide = ({ theme: t }) => {
  const title = "When Automation Goes Wrong";
  const subtitle = "Real incidents, real lessons";

  const incidents = [
    {
      name: "CrowdStrike",
      date: "July 2024",
      what: "Bad config update auto-deployed globally",
      damage: "$5B+ losses, 8.5M devices bricked",
      fix: "Staged rollouts + human gate",
      color: "red"
    },
    {
      name: "Defender → ANY.RUN",
      date: "2024",
      what: "False positive auto-submitted files to public sandbox",
      damage: "Sensitive customer data leaked publicly",
      fix: "Human approval for data-sharing",
      color: "amber"
    },
    {
      name: "AI Procurement Agent",
      date: "2025",
      what: "Compromised agent approved fraudulent purchase orders",
      damage: "$3.2M fraud losses",
      fix: "Least privilege + behavioral monitoring",
      color: "purple"
    }
  ];

  const colorMap = {
    red: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400" }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Incident Cards */}
        <div className="space-y-4 mb-8">
          {incidents.map((incident, i) => {
            const colors = colorMap[incident.color];
            return (
              <div key={i} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] items-center">
                  {/* Incident Name */}
                  <div className={`${colors.bg} p-4 h-full flex flex-col justify-center border-r ${colors.border}`}>
                    <div className={`font-black text-xl ${colors.text}`}>{incident.name}</div>
                    <div className="text-slate-500 text-sm">{incident.date}</div>
                  </div>

                  {/* What Happened */}
                  <div className="p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">What Happened</div>
                    <div className="text-slate-300 text-sm">{incident.what}</div>
                  </div>

                  {/* Damage */}
                  <div className="p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Damage</div>
                    <div className={`${colors.text} text-sm font-bold`}>{incident.damage}</div>
                  </div>

                  {/* Fix */}
                  <div className="p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Guardrail Fix</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 text-sm">{incident.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pattern Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder} text-center`}>
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400">Bad update auto-deployed</div>
            <div className="text-xs text-emerald-400 mt-2">→ Staged rollouts</div>
          </div>
          <div className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder} text-center`}>
            <XCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400">False positive triggers action</div>
            <div className="text-xs text-emerald-400 mt-2">→ Human approval gates</div>
          </div>
          <div className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder} text-center`}>
            <XCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-slate-400">Compromised agent in chain</div>
            <div className="text-xs text-emerald-400 mt-2">→ Least privilege + monitoring</div>
          </div>
        </div>

        {/* Key Message */}
        <div className={`text-center p-5 rounded-xl border-2 border-amber-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            "These aren't <span className="text-red-400 font-bold">AI problems</span>.
            They're <span className={`${t.accentColor} font-bold`}>automation-without-guardrails</span> problems."
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailureModesSlide;
