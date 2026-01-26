import React from 'react';
import { AlertTriangle, CheckCircle, Scale, Terminal, Database, Video } from 'lucide-react';

/**
 * C5: AI Failure Modes (Taxonomy)
 * Focus: 4 categories of AI failure with one incident each
 * Best for: Teaching framework, reusable mental model, highest practical value
 *
 * CONSENSUS RECOMMENDATION: This is the strongest single-slide choice for MSP education
 *
 * SOURCES:
 * - Mata v. Avianca: https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.
 * - Chevrolet: https://incidentdatabase.ai/cite/622/
 * - Samsung: https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt
 * - Arup: https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk
 */
const AIFailureModesSlide = ({ theme: t }) => {
  const title = "When AI Goes Wrong";
  const subtitle = "Four failure modes, four guardrails";

  const failureModes = [
    {
      category: "Hallucination",
      property: "Integrity",
      icon: Scale,
      incident: "Mata v. Avianca",
      date: "Jun 2023",
      what: "ChatGPT fabricated 6 fake court cases",
      impact: "$5K sanctions",
      fix: "Human verification",
      color: "red"
    },
    {
      category: "Prompt Injection",
      property: "Control",
      icon: Terminal,
      incident: "Chevrolet Chatbot",
      date: "Dec 2023",
      what: "AI agreed to sell $76K car for $1",
      impact: "Viral exposure",
      fix: "Input validation + boundaries",
      color: "amber"
    },
    {
      category: "Data Leakage",
      property: "Confidentiality",
      icon: Database,
      incident: "Samsung → ChatGPT",
      date: "Apr 2023",
      what: "Source code pasted for debugging",
      impact: "Trade secrets in AI",
      fix: "DLP + usage policies",
      color: "purple"
    },
    {
      category: "Deepfake Fraud",
      property: "Authenticity",
      icon: Video,
      incident: "Arup Engineering",
      date: "Jan 2024",
      what: "CFO + team were all AI on video call",
      impact: "$25M stolen",
      fix: "Out-of-band verification",
      color: "red"
    }
  ];

  const colorMap = {
    red: { bg: "bg-red-500/20", border: "border-red-500/50", text: "text-red-400", pill: "bg-red-500/30" },
    amber: { bg: "bg-amber-500/20", border: "border-amber-500/50", text: "text-amber-400", pill: "bg-amber-500/30" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", text: "text-purple-400", pill: "bg-purple-500/30" }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* 2x2 Taxonomy Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {failureModes.map((mode, i) => {
            const colors = colorMap[mode.color];
            const Icon = mode.icon;
            return (
              <div key={i} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                {/* Header */}
                <div className={`${colors.bg} p-3 border-b ${colors.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                    <div>
                      <div className={`font-black text-xl ${colors.text}`}>{mode.category}</div>
                      <div className="text-slate-400 text-base">Threatens: {mode.property}</div>
                    </div>
                  </div>
                  <div className={`${colors.pill} px-3 py-1 rounded-full`}>
                    <span className={`${colors.text} font-bold text-lg`}>{mode.impact}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-slate-200 font-bold text-lg">{mode.incident}</div>
                      <div className="text-slate-500 text-base">{mode.date}</div>
                    </div>
                  </div>
                  <div className="text-slate-300 text-lg mb-3">{mode.what}</div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-400 text-lg font-semibold">{mode.fix}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Framework Summary */}
        <div className={`${t.cardBg} rounded-xl border ${t.cardBorder} p-4 mb-4`}>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-red-400 font-bold text-xl">Hallucination</div>
              <div className="text-slate-400">→ Verify outputs</div>
            </div>
            <div>
              <div className="text-amber-400 font-bold text-xl">Injection</div>
              <div className="text-slate-400">→ Validate inputs</div>
            </div>
            <div>
              <div className="text-purple-400 font-bold text-xl">Leakage</div>
              <div className="text-slate-400">→ Classify data</div>
            </div>
            <div>
              <div className="text-red-400 font-bold text-xl">Deepfake</div>
              <div className="text-slate-400">→ Verify identity</div>
            </div>
          </div>
        </div>

        {/* Key Message */}
        <div className={`text-center p-4 rounded-xl border-2 border-amber-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            These aren't <span className="text-red-400 font-bold">AI problems</span>.
            They're <span className={`${t.accentColor} font-bold`}>missing guardrails</span> problems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIFailureModesSlide;
