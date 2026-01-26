import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * Sources slide - comprehensive clickable references
 * Organized by category, each item links to source
 */
const SourcesSlide = ({ theme: t }) => {
  const title = "Sources & References";

  const sections = [
    {
      name: "AI Incidents & Case Studies",
      color: "text-red-400",
      sources: [
        { name: "AI Incident Database", url: "https://incidentdatabase.ai/" },
        { name: "Arup $25M Deepfake (CNN)", url: "https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk" },
        { name: "Samsung ChatGPT Leak (Bloomberg)", url: "https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak" },
        { name: "Mata v. Avianca (Wikipedia)", url: "https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc." },
        { name: "Air Canada Chatbot (CBC)", url: "https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416" },
        { name: "NYC MyCity Chatbot (The Markup)", url: "https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law" },
      ]
    },
    {
      name: "Frameworks & Standards",
      color: "text-cyan-400",
      sources: [
        { name: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
        { name: "OWASP Agentic AI Top 10", url: "https://genai.owasp.org/" },
        { name: "MITRE ATT&CK", url: "https://attack.mitre.org/" },
        { name: "ISO 42001 AI Management", url: "https://www.iso.org/standard/81230.html" },
        { name: "CIS Controls", url: "https://www.cisecurity.org/controls" },
        { name: "Atomic Red Team", url: "https://atomicredteam.io/" },
      ]
    },
    {
      name: "Industry Reports",
      color: "text-amber-400",
      sources: [
        { name: "IBM Cost of a Data Breach 2024", url: "https://www.ibm.com/reports/data-breach" },
        { name: "IBM X-Force Threat Intelligence", url: "https://www.ibm.com/reports/threat-intelligence" },
        { name: "SANS SOC Survey", url: "https://www.sans.org/white-papers/soc-survey/" },
        { name: "FBI IC3 Annual Report", url: "https://www.ic3.gov/Home/AnnualReports" },
        { name: "Palo Alto Unit 42 Report", url: "https://www.paloaltonetworks.com/unit42/incident-response-report" },
        { name: "SentinelOne Labs", url: "https://www.sentinelone.com/labs/" },
      ]
    },
    {
      name: "Governance & Statistics",
      color: "text-emerald-400",
      sources: [
        { name: "EU AI Act Official Text", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
        { name: "NAIC AI Model Bulletin", url: "https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Artificial%20Intelligence%20Systems.pdf" },
        { name: "ISACA AI Governance", url: "https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing" },
        { name: "Cyberhaven Shadow AI Report", url: "https://www.cyberhaven.com/blog/4-2-of-workers-have-put-sensitive-corporate-data-into-chatgpt-raising-security-concerns" },
        { name: "CISA Segmentation Guidance", url: "https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a" },
        { name: "ISACA AI Policy Templates", url: "https://www.isaca.org/resources/isaca-journal/issues/2024/volume-2/creating-ai-governance-policies" },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-6xl font-black mb-2 ${t.textOnPage}`}>
          {title}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {sections.map((section, i) => (
            <div key={i} className={`${t.cardBg} p-4 rounded-xl border ${t.cardBorder}`}>
              <div className={`font-bold text-xl mb-3 ${section.color}`}>
                {section.name}
              </div>
              <div className="space-y-1">
                {section.sources.map((source, j) => (
                  <a
                    key={j}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg text-slate-300 hover:text-white hover:bg-slate-700/50 rounded px-2 py-1 transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 flex-shrink-0" />
                    <span className="truncate">{source.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub link */}
        <div className={`mt-4 text-center p-3 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <a
            href="https://github.com/tim4net/rightofboom2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xl text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Full presentation with all source links: github.com/tim4net/rightofboom2026</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SourcesSlide;
