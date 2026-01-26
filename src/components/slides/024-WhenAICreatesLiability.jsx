import React from 'react';
import { Scale, AlertTriangle, CheckCircle, Gavel, MessageSquare, Building } from 'lucide-react';

/**
 * Slide 24a: When AI Creates Liability
 * Focus: Legal precedents and business consequences
 *
 * SOURCES:
 * - Mata v. Avianca: https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.
 * - Air Canada: https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416
 * - NYC MyCity: https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law
 * - Chevrolet: https://incidentdatabase.ai/cite/622/
 */
const AICreatesLiabilitySlide = ({ theme: t }) => {
  const incidents = [
    {
      name: "Mata v. Avianca",
      date: "June 2023",
      what: "Lawyers used ChatGPT for research - it fabricated 6 fake court cases with fake citations",
      consequence: "$5K sanctions, professional humiliation",
      fix: "Human verification of all AI citations",
      color: "red",
      icon: Gavel
    },
    {
      name: "Air Canada Chatbot",
      date: "Feb 2024",
      what: "AI chatbot gave false bereavement policy info - airline tried to disclaim liability",
      consequence: "Lost lawsuit, landmark precedent set",
      fix: "Companies liable for chatbot statements",
      color: "amber",
      icon: Scale
    },
    {
      name: "NYC MyCity Chatbot",
      date: "Mar 2024",
      what: "City's AI advised businesses to break laws - evade audits, ignore worker protections",
      consequence: "Public trust destroyed, chatbot taken offline",
      fix: "Human review of public-facing AI advice",
      color: "purple",
      icon: Building
    },
    {
      name: "Chevrolet Chatbot",
      date: "Dec 2023",
      what: "Prompt injection made AI agree to sell $76K Tahoe for $1 - 'legally binding offer'",
      consequence: "20M viral views, brand embarrassment",
      fix: "Input validation + output boundaries",
      color: "slate",
      icon: MessageSquare
    }
  ];

  const colorMap = {
    red: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400" },
    slate: { bg: "bg-slate-500/20", border: "border-slate-500/50", text: "text-slate-400" }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-3">
        <h2 className={`text-4xl font-black mb-1 ${t.textOnPage}`}>
          When AI Creates Liability
        </h2>
        <p className={`text-lg ${t.accentColor} font-medium`}>
          Real cases, real consequences, real precedents
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Incident Cards */}
        <div className="space-y-1.5 mb-3">
          {incidents.map((incident, i) => {
            const colors = colorMap[incident.color];
            const Icon = incident.icon;
            return (
              <div key={i} className={`${t.cardBg} rounded-lg border ${t.cardBorder} overflow-hidden`}>
                <div className="grid grid-cols-[140px_1fr_1fr_1fr] items-center">
                  {/* Incident Name */}
                  <div className={`${colors.bg} p-2 h-full flex flex-col justify-center border-r ${colors.border}`}>
                    <Icon className={`w-4 h-4 ${colors.text} mb-0.5`} />
                    <div className={`font-black text-base ${colors.text}`}>{incident.name}</div>
                    <div className="text-slate-500 text-sm">{incident.date}</div>
                  </div>

                  {/* What Happened */}
                  <div className="p-2">
                    <div className="text-xs text-slate-500 uppercase tracking-wide">What Happened</div>
                    <div className="text-slate-300 text-sm">{incident.what}</div>
                  </div>

                  {/* Consequence */}
                  <div className="p-2">
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Consequence</div>
                    <div className={`${colors.text} text-sm font-bold`}>{incident.consequence}</div>
                  </div>

                  {/* Fix */}
                  <div className="p-2">
                    <div className="text-xs text-slate-500 uppercase tracking-wide">Guardrail Fix</div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="text-emerald-400 text-sm">{incident.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Precedent Callout */}
        <div className={`text-center p-2 rounded-lg border-2 border-red-500/50 ${t.cardBg}`}>
          <Scale className="w-5 h-5 text-red-400 mx-auto mb-0.5" />
          <p className="text-base text-slate-200">
            "You <span className="text-red-400 font-bold">cannot disclaim</span> liability for your AI.
            <span className={`${t.accentColor} font-bold`}> Courts have spoken.</span>"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICreatesLiabilitySlide;
