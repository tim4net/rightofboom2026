import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const SourcesSlide = ({ theme: t }) => {
  const title = "Sources & References";
  const subtitle = "Research that informed this presentation";

  const sourceCategories = [
    {
      category: "Attack Landscape",
      sources: [
        { name: "SentinelOne Agentic AI Report", year: "2026" },
        { name: "IBM X-Force Threat Intelligence Index", year: "2025" },
        { name: "FBI IC3 Annual Report", year: "2025" },
        { name: "Picus Security AI Research", year: "2025" },
      ]
    },
    {
      category: "Defensive Automation",
      sources: [
        { name: "SANS SOC Survey", year: "2025" },
        { name: "IBM Cost of a Data Breach", year: "2024" },
        { name: "Atomic Red Team Documentation", year: "2025" },
        { name: "CISA Network Segmentation Guidance", year: "July 2025" },
      ]
    },
    {
      category: "Governance & Compliance",
      sources: [
        { name: "EU AI Act", year: "2024" },
        { name: "NIST AI Risk Management Framework", year: "2023" },
        { name: "OWASP Agentic AI Top 10", year: "Dec 2025" },
        { name: "NAIC AI Model Bulletin", year: "2024" },
      ]
    },
    {
      category: "ROI & Business Case",
      sources: [
        { name: "Gartner SOC Automation Research", year: "2025" },
        { name: "Ponemon Institute AI Security Study", year: "2024" },
        { name: "Palo Alto Networks SOC Report", year: "2024" },
        { name: "ISACA Cyber Insurance Analysis", year: "2025" },
      ]
    }
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

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {sourceCategories.map((cat, i) => (
            <div key={i} className={`${t.cardBg} p-5 rounded-xl border ${t.cardBorder}`}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className={`w-5 h-5 ${t.accentColor}`} />
                <div className={`font-bold text-xl ${t.accentColor}`}>{cat.category}</div>
              </div>
              <ul className="space-y-2">
                {cat.sources.map((source, j) => (
                  <li key={j} className="flex items-center justify-between text-xl">
                    <span className="text-slate-300">{source.name}</span>
                    <span className="text-slate-500 text-xl">{source.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Framework References */}
        <div className={`mt-6 ${t.cardBg} p-5 rounded-xl border ${t.cardBorder}`}>
          <div className="text-xl font-bold text-slate-200 mb-4">Key Frameworks Referenced</div>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className={`font-bold ${t.accentColor}`}>NIST AI RMF</div>
              <div className="text-xl text-slate-500">Risk Management</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className={`font-bold ${t.accentColor}`}>ISO 42001</div>
              <div className="text-xl text-slate-500">AI Management</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className={`font-bold ${t.accentColor}`}>CIS Controls</div>
              <div className="text-xl text-slate-500">Security Baselines</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className={`font-bold ${t.accentColor}`}>OWASP Top 10</div>
              <div className="text-xl text-slate-500">Agentic AI</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-800/50">
              <div className={`font-bold ${t.accentColor}`}>ATT&CK</div>
              <div className="text-xl text-slate-500">Threat Mapping</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={`mt-6 text-center p-4 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <p className="text-slate-400 text-xl">
            Full source links and downloadable resources available at session QR code
          </p>
        </div>
      </div>
    </div>
  );
};

export default SourcesSlide;
