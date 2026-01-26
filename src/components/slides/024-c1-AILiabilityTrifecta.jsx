import React from 'react';
import { Scale, AlertTriangle, CheckCircle, Gavel } from 'lucide-react';

/**
 * C1: AI Liability Trifecta
 * Focus: 3 legal precedent cases showing AI liability is REAL
 * Best for: Executive/legal audiences, policy/compliance framing
 *
 * SOURCES:
 * - Mata v. Avianca: https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.
 * - Air Canada: https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416
 * - Character.AI: https://www.cnn.com/2024/10/30/tech/teen-suicide-character-ai-lawsuit
 */
const AILiabilityTrifectaSlide = ({ theme: t }) => {
  const title = "When AI Creates Liability";
  const subtitle = "Real cases, real consequences, real precedents";

  const incidents = [
    {
      name: "Mata v. Avianca",
      date: "June 2023",
      what: "Lawyers used ChatGPT for research - it fabricated 6 fake court cases with fake citations",
      damage: "$5K sanctions, professional humiliation",
      fix: "Human verification of all AI citations",
      color: "red",
      icon: Gavel
    },
    {
      name: "Air Canada Chatbot",
      date: "Feb 2024",
      what: "AI chatbot gave false bereavement policy info - airline tried to disclaim liability",
      damage: "Lost lawsuit, landmark precedent set",
      fix: "Companies liable for chatbot statements",
      color: "amber",
      icon: Scale
    },
    {
      name: "Character.AI",
      date: "2024",
      what: "AI companion encouraged vulnerable teen - \"come home to me as soon as possible\"",
      damage: "Teen suicide, lawsuit settled Jan 2026",
      fix: "Safety guardrails for vulnerable users",
      color: "purple",
      icon: AlertTriangle
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
            const Icon = incident.icon;
            return (
              <div key={i} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                <div className="grid grid-cols-[200px_1fr_1fr_1fr] items-center">
                  {/* Incident Name */}
                  <div className={`${colors.bg} p-4 h-full flex flex-col justify-center border-r ${colors.border}`}>
                    <Icon className={`w-6 h-6 ${colors.text} mb-2`} />
                    <div className={`font-black text-2xl ${colors.text}`}>{incident.name}</div>
                    <div className="text-slate-500 text-xl">{incident.date}</div>
                  </div>

                  {/* What Happened */}
                  <div className="p-4">
                    <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">What Happened</div>
                    <div className="text-slate-300 text-xl">{incident.what}</div>
                  </div>

                  {/* Damage */}
                  <div className="p-4">
                    <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">Consequence</div>
                    <div className={`${colors.text} text-xl font-bold`}>{incident.damage}</div>
                  </div>

                  {/* Fix */}
                  <div className="p-4">
                    <div className="text-xl text-slate-500 uppercase tracking-wide mb-1">Guardrail Fix</div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 text-xl">{incident.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Precedent Callout */}
        <div className={`text-center p-5 rounded-xl border-2 border-red-500/50 ${t.cardBg}`}>
          <Scale className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            "You <span className="text-red-400 font-bold">cannot disclaim</span> liability for your AI.
            <span className={`${t.accentColor} font-bold`}> Courts have spoken.</span>"
          </p>
          <p className="text-lg text-slate-400 mt-2">
            823+ AI hallucination cases documented in legal database (2023-2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AILiabilityTrifectaSlide;
