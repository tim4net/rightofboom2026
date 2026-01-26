import React from 'react';
import { Search, FileText, RefreshCw, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

const ShadowAISlide = ({ theme: t }) => {
  const title = "Shadow AI Governance";
  const subtitle = "Managing unauthorized AI tools";

  const stats = [
    { value: "73.8%", label: "Workplace ChatGPT accounts are non-corporate" },
    { value: "28%", label: "Organizations have formal AI policy" },
    { value: "$670K", label: "Extra cost per shadow AI breach" },
    { value: "247 days", label: "Average detection time" },
  ];

  const framework = [
    {
      step: "1",
      name: "DISCOVER",
      icon: Search,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      items: ["Email discovery", "Browser controls", "Network monitoring"],
      tools: "Portal26, Zylo, Nightfall, Zenity"
    },
    {
      step: "2",
      name: "POLICY",
      icon: FileText,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      items: ["Acceptable use policy", "Approved tools list", "Data classification"],
      tools: "ISACA AI Policy Template"
    },
    {
      step: "3",
      name: "REPLACE",
      icon: RefreshCw,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      items: ["Sanctioned enterprise AI", "Better UX than shadow tools", "Centralized logging"],
      tools: "ChatGPT Enterprise, Copilot, Claude"
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
        {/* Problem Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((stat, i) => (
            <div key={i} className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder} text-center`}>
              <div className={`text-2xl font-black ${i === 2 ? 'text-red-400' : t.accentColor}`}>
                {stat.value}
              </div>
              <div className="text-xl text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Framework */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {framework.map((phase, i) => (
            <div key={i} className={`${t.cardBg} p-5 rounded-xl border ${t.cardBorder}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`${phase.bgColor} p-2 rounded-lg`}>
                  <phase.icon className={`w-6 h-6 ${phase.color}`} />
                </div>
                <div>
                  <div className="text-slate-500 text-xl">Step {phase.step}</div>
                  <div className={`text-2xl font-black ${phase.color}`}>{phase.name}</div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300 text-xl">
                    <CheckCircle className="w-5 h-5 text-slate-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-700">
                <div className="text-xl text-slate-500">Tools:</div>
                <div className={`text-xl ${phase.color}`}>{phase.tools}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Message */}
        <div className={`text-center p-5 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <Eye className={`w-8 h-8 ${t.accentColor} mx-auto mb-2`} />
          <p className="text-xl text-slate-200">
            "The goal isn't to <span className="text-red-400 font-bold">stop</span> AI usage.
            It's to stop <span className={`${t.accentColor} font-bold`}>invisible</span> AI usage."
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShadowAISlide;
