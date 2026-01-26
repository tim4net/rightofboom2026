import React from 'react';
import { AlertTriangle, CheckCircle, Scale, Database, Video, Terminal } from 'lucide-react';

/**
 * When AI Goes Wrong - Real incidents with real AI systems
 * Covers all 4 failure modes: Deepfake, Data Leakage, Hallucination, Prompt Injection
 *
 * All incidents verified with sources:
 * - Arup: https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk
 * - Samsung: https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt
 * - Mata v. Avianca: https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.
 * - Chevrolet: https://incidentdatabase.ai/cite/622/
 */
const WhenAIGoesWrongSlide = ({ theme: t }) => {
  const incidents = [
    {
      name: "Arup Deepfake",
      date: "Jan 2024",
      mode: "Identity",
      what: "Video call: 'CFO + team' were all deepfakes",
      damageAmount: "$25M",
      damageNote: "gone in one call",
      fix: "Call-back verification",
      color: "red",
      icon: Video,
      hero: true
    },
    {
      name: "Samsung → ChatGPT",
      date: "Apr 2023",
      mode: "Data",
      what: "Engineers pasted proprietary source into ChatGPT",
      damageAmount: "IP Lost",
      damageNote: "trade secrets retained",
      fix: "DLP + AI gateway",
      color: "amber",
      icon: Database,
      hero: false
    },
    {
      name: "Chevrolet Bot",
      date: "Dec 2023",
      mode: "Control",
      what: "Prompt injection: bot agreed to sell car for $1",
      damageAmount: "20M views",
      damageNote: "viral embarrassment",
      fix: "Input validation",
      color: "purple",
      icon: Terminal,
      hero: false
    },
    {
      name: "Mata v. Avianca",
      date: "Jun 2023",
      mode: "Integrity",
      what: "6 fake ChatGPT citations filed in federal court",
      damageAmount: "$5K fine",
      damageNote: "sanctions + precedent",
      fix: "Human verification",
      color: "slate",
      icon: Scale,
      hero: false
    }
  ];

  const colorMap = {
    red: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400" },
    slate: { bg: "bg-slate-500/20", border: "border-slate-500/50", text: "text-slate-400" }
  };

  const heroIncident = incidents.find(i => i.hero);
  const otherIncidents = incidents.filter(i => !i.hero);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-5">
        <h2 className={`text-5xl md:text-6xl font-black mb-3 ${t.textOnPage}`}>
          When AI Goes Wrong
        </h2>
        <p className={`text-3xl ${t.accentColor} font-bold`}>
          Real incidents. Real losses. Real controls.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Card - Arup */}
        {heroIncident && (() => {
          const colors = colorMap[heroIncident.color];
          const Icon = heroIncident.icon;
          return (
            <div className={`${t.cardBg} rounded-xl border-2 ${colors.border} ring-2 ring-red-500/30 overflow-hidden mb-4`}>
              <div className="grid grid-cols-[200px_1fr_180px_1fr] items-center">
                <div className={`${colors.bg} p-4 h-full flex flex-col justify-center border-r ${colors.border}`}>
                  <Icon className={`w-10 h-10 ${colors.text} mb-2`} />
                  <div className="text-xl font-black uppercase tracking-widest text-red-300/80 mb-1">
                    Critical
                  </div>
                  <div className={`font-black text-2xl ${colors.text}`}>{heroIncident.name}</div>
                  <div className="text-slate-400 text-xl">{heroIncident.date}</div>
                </div>
                <div className="p-4">
                  <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">What Happened</div>
                  <div className="text-slate-100 text-2xl font-semibold leading-snug">{heroIncident.what}</div>
                </div>
                <div className="p-4 text-center">
                  <div className={`${colors.text} font-black text-6xl leading-none tracking-tight`}>
                    {heroIncident.damageAmount}
                  </div>
                  <div className="text-slate-300 text-xl mt-2 font-semibold">{heroIncident.damageNote}</div>
                </div>
                <div className="p-4">
                  <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">Guardrail</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                    <span className="text-emerald-400 text-xl font-bold">{heroIncident.fix}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Other Incidents - Compact Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {otherIncidents.map((incident) => {
            const colors = colorMap[incident.color];
            const Icon = incident.icon;
            return (
              <div key={incident.name} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                <div className={`${colors.bg} px-4 py-3 border-b ${colors.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                    <div>
                      <div className={`font-bold text-xl ${colors.text}`}>{incident.name}</div>
                      <div className="text-slate-400 text-lg">{incident.date} • {incident.mode}</div>
                    </div>
                  </div>
                  <div className={`${colors.text} font-black text-2xl`}>{incident.damageAmount}</div>
                </div>
                <div className="p-3">
                  <div className="text-slate-500 text-lg uppercase tracking-wide mb-1">What</div>
                  <div className="text-slate-200 text-xl leading-snug mb-3">{incident.what}</div>
                  <div className="text-slate-500 text-lg uppercase tracking-wide mb-1">Guardrail</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 text-xl font-bold">{incident.fix}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Four Failure Modes Summary */}
        <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4 mb-4`}>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <Video className="w-6 h-6 text-red-400 mx-auto mb-1" />
              <div className="text-red-400 font-bold text-xl">Deepfake</div>
              <div className="text-slate-400 text-xl">Verify identity</div>
            </div>
            <div>
              <Database className="w-6 h-6 text-amber-400 mx-auto mb-1" />
              <div className="text-amber-400 font-bold text-xl">Leakage</div>
              <div className="text-slate-400 text-xl">Classify data</div>
            </div>
            <div>
              <Terminal className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <div className="text-purple-400 font-bold text-xl">Injection</div>
              <div className="text-slate-400 text-xl">Validate inputs</div>
            </div>
            <div>
              <Scale className="w-6 h-6 text-slate-400 mx-auto mb-1" />
              <div className="text-slate-400 font-bold text-xl">Hallucination</div>
              <div className="text-slate-400 text-xl">Verify outputs</div>
            </div>
          </div>
        </div>

        {/* Key Message */}
        <div className={`text-center p-4 rounded-xl border-2 border-amber-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-7 h-7 text-amber-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            Not <span className="text-red-400 font-bold">AI problems</span>—<span className={`${t.accentColor} font-bold`}>missing guardrails</span> problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhenAIGoesWrongSlide;
