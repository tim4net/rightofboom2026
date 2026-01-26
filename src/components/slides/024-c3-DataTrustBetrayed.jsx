import React from 'react';
import { Database, AlertTriangle, CheckCircle, FileWarning, Upload } from 'lucide-react';

/**
 * C3: Data Trust Betrayed
 * Focus: Data leakage incidents through AI tools
 * Best for: MSPs selling governance, DLP, secure enablement
 *
 * SOURCES:
 * - Samsung: https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak
 * - Slack AI: https://www.theregister.com/2024/08/21/slack_ai_prompt_injection/
 */
const DataTrustBetrayedSlide = ({ theme: t }) => {
  const title = "Data Trust Betrayed";
  const subtitle = "Your secrets can leave without a 'breach'";

  const incidents = [
    {
      name: "Samsung → ChatGPT",
      date: "Apr 2023",
      leakVector: "Employee paste",
      what: "Engineers pasted semiconductor source code for debugging help - IP now in training data",
      impact: "Trade secrets exposed, company-wide AI ban",
      fix: "DLP + AI usage policy + endpoint controls",
      color: "red",
      icon: Upload
    },
    {
      name: "Slack AI Exfil",
      date: "Aug 2024",
      leakVector: "Indirect injection",
      what: "Malicious messages in public channels could exfiltrate private channel data via AI summaries",
      impact: "Private data accessible to attackers",
      fix: "RAG sandboxing + data classification",
      color: "amber",
      icon: Database
    },
    {
      name: "ChatGPT Training Leak",
      date: "Nov 2023",
      leakVector: "Divergence attack",
      what: "Researchers extracted 10K+ memorized examples including emails, phone numbers, addresses",
      impact: "PII from training data recoverable",
      fix: "Avoid putting secrets in any AI prompt",
      color: "purple",
      icon: FileWarning
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
        <div className="space-y-4 mb-6">
          {incidents.map((incident, i) => {
            const colors = colorMap[incident.color];
            const Icon = incident.icon;
            return (
              <div key={i} className={`${t.cardBg} rounded-xl border ${t.cardBorder} overflow-hidden`}>
                <div className="grid grid-cols-[200px_1fr_1fr] items-stretch">
                  {/* Incident Name + Leak Vector */}
                  <div className={`${colors.bg} p-4 flex flex-col justify-center border-r ${colors.border}`}>
                    <Icon className={`w-6 h-6 ${colors.text} mb-2`} />
                    <div className={`font-black text-2xl ${colors.text}`}>{incident.name}</div>
                    <div className="text-slate-500 text-lg">{incident.date}</div>
                    <div className={`text-lg mt-2 ${colors.text} font-semibold`}>
                      Vector: {incident.leakVector}
                    </div>
                  </div>

                  {/* What Happened + Impact */}
                  <div className="p-4 border-r border-slate-700">
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-1">What Happened</div>
                    <div className="text-slate-300 text-lg mb-3">{incident.what}</div>
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-1">Impact</div>
                    <div className={`${colors.text} text-lg font-bold`}>{incident.impact}</div>
                  </div>

                  {/* Fix */}
                  <div className="p-4 flex flex-col justify-center">
                    <div className="text-lg text-slate-500 uppercase tracking-wide mb-2">Guardrail Fix</div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                      <span className="text-emerald-400 text-xl">{incident.fix}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Controls */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "DLP Policies", desc: "Block sensitive data to AI" },
            { label: "Data Classification", desc: "Know what's sensitive" },
            { label: "Tenant Isolation", desc: "Separate AI environments" },
            { label: "Prompt Logging", desc: "Audit AI interactions" }
          ].map((ctrl, i) => (
            <div key={i} className={`${t.cardBg} p-3 rounded-xl border ${t.cardBorder} text-center`}>
              <div className="text-emerald-400 font-bold text-lg">{ctrl.label}</div>
              <div className="text-slate-400 text-base">{ctrl.desc}</div>
            </div>
          ))}
        </div>

        {/* Key Message */}
        <div className={`text-center p-4 rounded-xl border-2 border-red-500/50 ${t.cardBg}`}>
          <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
          <p className="text-xl text-slate-200">
            <span className="text-red-400 font-bold">Rule #1:</span> Never paste secrets, source code, or PII into AI tools.
            <span className={`${t.accentColor} font-bold`}> It may never be deleted.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataTrustBetrayedSlide;
