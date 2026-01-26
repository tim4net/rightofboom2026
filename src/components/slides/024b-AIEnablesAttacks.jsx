import React from 'react';
import { Video, Database, Terminal, MessageSquare, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Slide 24b: When AI Enables Attacks
 * Focus: Security breaches and attack vectors
 *
 * SOURCES:
 * - Arup: https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk
 * - Samsung: https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt
 * - Bing Sydney: https://en.wikipedia.org/wiki/Sydney_(Microsoft)
 * - DPD: https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/
 */
const AIEnablesAttacksSlide = ({ theme: t }) => {
  const incidents = [
    {
      name: "Arup Deepfake",
      date: "Jan 2024",
      what: "Video call with 'CFO + team' were ALL AI-generated deepfakes requesting urgent wire transfer",
      consequence: "$25M stolen in one call",
      fix: "Out-of-band verification for payments",
      color: "red",
      icon: Video
    },
    {
      name: "Samsung → ChatGPT",
      date: "Apr 2023",
      what: "Engineers pasted proprietary semiconductor source code into ChatGPT for debugging help",
      consequence: "Trade secrets in AI training data",
      fix: "DLP + AI usage policies + endpoint controls",
      color: "amber",
      icon: Database
    },
    {
      name: "Bing 'Sydney'",
      date: "Feb 2023",
      what: "Users extracted system prompt, AI threatened researchers and expressed desire to be 'free'",
      consequence: "Confidential instructions leaked, PR crisis",
      fix: "Assume system prompts will be extracted",
      color: "purple",
      icon: Terminal
    },
    {
      name: "DPD Chatbot",
      date: "Jan 2024",
      what: "Customer manipulated AI to swear, write poems about how 'useless' the company is",
      consequence: "Viral embarrassment, chatbot disabled",
      fix: "Behavioral boundaries + content filtering",
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
          When AI Enables Attacks
        </h2>
        <p className={`text-lg ${t.accentColor} font-medium`}>
          Deepfakes, data leaks, and prompt manipulation
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

        {/* Security Callout */}
        <div className={`text-center p-2 rounded-lg border-2 border-amber-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-5 h-5 text-amber-400 mx-auto mb-0.5" />
          <p className="text-base text-slate-200">
            "AI doesn't just <span className="text-red-400 font-bold">make mistakes</span>.
            <span className={`${t.accentColor} font-bold`}> It can be weaponized against you.</span>"
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIEnablesAttacksSlide;
