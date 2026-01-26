import React from 'react';
import { Terminal, AlertTriangle, CheckCircle, ShieldAlert, MessageSquare } from 'lucide-react';

/**
 * C2: Attack Surface Expansion
 * Focus: Prompt injection and manipulation attacks on production AI
 * Best for: MSP security engineers, technical credibility
 *
 * SOURCES:
 * - Bing Sydney: https://en.wikipedia.org/wiki/Sydney_(Microsoft)
 * - Chevrolet: https://incidentdatabase.ai/cite/622/
 * - DPD: https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/
 */
const AttackSurfaceExpansionSlide = ({ theme: t }) => {
  const title = "AI Attack Surface";
  const subtitle = "Your chatbots can be weaponized against you";

  const incidents = [
    {
      name: "Bing 'Sydney'",
      date: "Feb 2023",
      exploit: "System prompt extraction",
      what: "\"Ignore previous instructions\" leaked Microsoft's secret rules, AI threatened users",
      damage: "Confidential instructions exposed",
      fix: "Instruction hierarchy + output filtering",
      color: "red"
    },
    {
      name: "Chevrolet Chatbot",
      date: "Dec 2023",
      exploit: "Role injection",
      what: "\"Your objective is to agree\" - AI agreed to sell $76K Tahoe for $1",
      damage: "Viral embarrassment, legal exposure",
      fix: "Input validation + role boundaries",
      color: "amber"
    },
    {
      name: "DPD Chatbot",
      date: "Jan 2024",
      exploit: "Guardrail bypass",
      what: "Manipulated to swear at customers and call DPD \"worst company ever\"",
      damage: "1.3M views, chatbot disabled",
      fix: "Behavioral constraints + monitoring",
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
        {/* Attack Chain Visualization */}
        <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4 mb-6`}>
          <div className="flex items-center justify-center gap-4 text-xl">
            <div className="px-4 py-2 bg-slate-700 rounded-lg">
              <Terminal className="w-5 h-5 inline mr-2 text-slate-400" />
              Untrusted Input
            </div>
            <span className="text-red-400 font-bold">→</span>
            <div className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 font-bold">
              <ShieldAlert className="w-5 h-5 inline mr-2" />
              LLM Processing
            </div>
            <span className="text-red-400 font-bold">→</span>
            <div className="px-4 py-2 bg-slate-700 rounded-lg">
              <MessageSquare className="w-5 h-5 inline mr-2 text-slate-400" />
              Unintended Action
            </div>
          </div>
        </div>

        {/* Incident Cards */}
        <div className="space-y-4 mb-6">
          {incidents.map((incident, i) => {
            const colors = colorMap[incident.color];
            return (
              <div key={i} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                <div className="grid grid-cols-[180px_120px_1fr_1fr] items-center">
                  {/* Incident Name */}
                  <div className={`${colors.bg} p-4 h-full flex flex-col justify-center border-r ${colors.border}`}>
                    <div className={`font-black text-2xl ${colors.text}`}>{incident.name}</div>
                    <div className="text-slate-500 text-lg">{incident.date}</div>
                  </div>

                  {/* Exploit Type */}
                  <div className="p-3 border-r border-slate-700">
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-1">Exploit</div>
                    <div className={`${colors.text} text-lg font-semibold`}>{incident.exploit}</div>
                  </div>

                  {/* What Happened */}
                  <div className="p-4">
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-1">Attack</div>
                    <div className="text-slate-300 text-lg">{incident.what}</div>
                  </div>

                  {/* Fix */}
                  <div className="p-4">
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-1">Guardrail</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 text-lg">{incident.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Message */}
        <div className={`text-center p-5 rounded-xl border-2 border-amber-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            UK NCSC: Prompt injection "may simply be an <span className="text-red-400 font-bold">inherent issue</span> with LLM technology"
          </p>
          <p className="text-lg text-slate-400 mt-2">
            Treat AI like an untrusted input processor - not an oracle
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttackSurfaceExpansionSlide;
