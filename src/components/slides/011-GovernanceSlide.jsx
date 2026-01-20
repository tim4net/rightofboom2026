import React from 'react';
import { Users, Shield, FileSearch, HelpCircle, AlertCircle } from 'lucide-react';

const GovernanceSlide = ({ theme: t }) => {
  const title = "The AI Governance Question";
  const subtitle = "Three stakeholders are asking. You need answers.";

  const stakeholders = [
    {
      icon: Users,
      name: "Your Clients",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      question: "Is AI safe to use?",
      subtext: "How are you using it in my environment?"
    },
    {
      icon: Shield,
      name: "Your Insurers",
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      question: "How are you controlling AI?",
      subtext: "Where's the documentation?"
    },
    {
      icon: FileSearch,
      name: "Your Auditors",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30",
      question: "Where's the paper trail?",
      subtext: "Can you prove what the AI decided and why?"
    }
  ];

  const regulations = [
    { name: "EU AI Act", date: "August 2026", detail: "€35M or 7% revenue penalties" },
    { name: "Colorado AI Act", date: "June 2026", detail: "First US state AI law" },
    { name: "NAIC Model Bulletin", date: "Now", detail: "23 states + DC adopted" },
    { name: "CCPA Amendments", date: "January 2026", detail: "Annual cybersecurity audits" },
  ];

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

      <div className="w-full">
        {/* Three Stakeholders */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stakeholders.map((s, i) => (
            <div
              key={i}
              className={`${t.cardBg} p-6 rounded-xl border ${s.borderColor} hover:border-opacity-60 transition-all`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`${s.bgColor} p-3 rounded-lg`}>
                  <s.icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <div className={`text-xl font-bold ${s.color}`}>{s.name}</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <HelpCircle className={`w-5 h-5 ${s.color} mt-0.5 flex-shrink-0`} />
                  <p className="text-lg text-slate-200 font-medium">"{s.question}"</p>
                </div>
                <p className="text-sm text-slate-400 pl-7">{s.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Timeline */}
        <div className={`${t.cardBg} p-5 rounded-xl border ${t.cardBorder}`}>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-red-400 uppercase tracking-wide">Regulatory Pressure</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {regulations.map((reg, i) => (
              <div key={i} className="text-center">
                <div className={`text-lg font-bold ${t.accentColor}`}>{reg.name}</div>
                <div className="text-sm text-slate-300">{reg.date}</div>
                <div className="text-xs text-slate-500 mt-1">{reg.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <div className="text-center mt-6">
          <p className="text-lg text-slate-400">
            Without answers, you face <span className="text-red-400 font-semibold">denied claims</span>,
            <span className="text-red-400 font-semibold"> failed audits</span>, and
            <span className="text-red-400 font-semibold"> lost clients</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GovernanceSlide;
