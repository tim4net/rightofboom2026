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
        { name: "Chevrolet Chatbot $1 Car", url: "https://incidentdatabase.ai/cite/622/" },
        { name: "DPD Chatbot (TIME)", url: "https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/" },
        { name: "Bing Sydney (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sydney_(Microsoft)" },
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
        { name: "ISACA AI Pulse Poll 2024", url: "https://www.isaca.org/resources/news-and-trends/newsletters/atisaca/2024/volume-5/ai-assurance-readiness-hindered-by-policy-and-talent-challenges" },
        { name: "Cyberhaven Shadow AI Report", url: "https://www.cyberhaven.com/blog/4-2-of-workers-have-put-sensitive-corporate-data-into-chatgpt-raising-security-concerns" },
        { name: "IBM Cost of Data Breach 2025", url: "https://www.ibm.com/reports/data-breach" },
        { name: "NAIC AI Model Bulletin", url: "https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Artificial%20Intelligence%20Systems.pdf" },
        { name: "ISACA AI Governance", url: "https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing" },
        { name: "r/msp Shadow AI Discussion", url: "https://www.reddit.com/r/msp/comments/1qn4oms/comment/o1r6i6r/" },
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col">
      {/* GitHub link - prominent at top */}
      <div className={`text-center p-3 rounded-xl border-2 border-cyan-500/50 ${t.cardBg} mb-4`}>
        <a
          href="https://github.com/tim4net/rightofboom2026"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-3xl text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
        >
          <ExternalLink className="w-7 h-7" />
          <span>github.com/tim4net/rightofboom2026</span>
        </a>
        <p className="text-slate-400 text-lg mt-1">Full presentation, scripts, and all source links</p>
      </div>

      <div className="max-w-7xl mx-auto flex-1">
        <div className="grid grid-cols-2 gap-3">
          {sections.map((section, i) => (
            <div key={i} className={`${t.cardBg} p-3 rounded-xl border ${t.cardBorder}`}>
              <div className={`font-bold text-lg mb-2 ${section.color}`}>
                {section.name}
              </div>
              <div className="space-y-0.5">
                {section.sources.map((source, j) => (
                  <a
                    key={j}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-base text-slate-300 hover:text-white hover:bg-slate-700/50 rounded px-1.5 py-0.5 transition-colors group"
                  >
                    <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300 flex-shrink-0" />
                    <span className="truncate">{source.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SourcesSlide;
