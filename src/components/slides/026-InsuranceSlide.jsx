import React from 'react';
import { Shield, FileWarning, CheckSquare, AlertTriangle, XCircle } from 'lucide-react';

const InsuranceSlide = ({ theme: t }) => {
  const title = "What Your Insurer Wants";
  const subtitle = "From 'Do you have security?' to 'Prove it, continuously'";

  const denialReasons = [
    {
      reason: "Incomplete logs",
      example: "EDR logs only 30 days, not 90 — denied",
      icon: XCircle
    },
    {
      reason: "Can't prove compliance",
      example: "MFA not enforced + incomplete patch logs — denied",
      icon: XCircle
    },
    {
      reason: 'AI "black box"',
      example: "No audit trail for AI-involved breach — disputed",
      icon: XCircle
    }
  ];

  const checklist = [
    {
      category: "AI Governance Policy",
      items: ["Acceptable use & restrictions", "Escalation paths documented", "Exemptions traceable & logged"]
    },
    {
      category: "AI Inventory",
      items: ["All tools catalogued", "Data access mapped", "Human oversight documented"]
    },
    {
      category: "Audit Trail (CRITICAL)",
      items: ["Minimum 90 days logs", "Centralized & reconstructable", "IR documentation ready"]
    },
    {
      category: "Compliance Evidence",
      items: ["Training records", "Policy acknowledgments", "Test results & patch logs"]
    }
  ];

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
        {/* Why Claims Get Denied */}
        <div className={`${t.cardBg} p-5 rounded-xl border border-red-500/30 mb-6`}>
          <div className="flex items-center gap-2 mb-4">
            <FileWarning className="w-6 h-6 text-red-400" />
            <div className="text-lg font-bold text-red-400">Why Claims Get Denied</div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {denialReasons.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10">
                <item.icon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-red-400 font-bold text-sm">{item.reason}</div>
                  <div className="text-slate-400 text-xs mt-1">{item.example}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Checklist */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {checklist.map((section, i) => (
            <div key={i} className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder}`}>
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className={`w-5 h-5 ${t.accentColor}`} />
                <div className={`font-bold text-sm ${i === 2 ? 'text-amber-400' : 'text-slate-200'}`}>
                  {section.category}
                </div>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* NAIC Warning */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder}`}>
            <div className="text-sm font-bold text-slate-200 mb-2">NAIC AI Model Bulletin</div>
            <div className="text-xs text-slate-400 mb-2">
              23 states + DC adopted by late 2025
            </div>
            <div className={`text-xs ${t.accentColor}`}>
              Regulators can request AI documentation during investigation
            </div>
          </div>
          <div className={`${t.cardBg} p-4 rounded-xl border border-amber-500/50`}>
            <AlertTriangle className="w-6 h-6 text-amber-400 mb-2" />
            <p className="text-sm text-slate-300 italic">
              "If you can't explain how a model works or prove it's fair and secure,
              <span className="text-amber-400 font-bold"> coverage could be denied.</span>"
            </p>
            <p className="text-xs text-slate-500 mt-2">— ISACA, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSlide;
