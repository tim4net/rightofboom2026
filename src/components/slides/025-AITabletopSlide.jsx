import React from 'react';
import { Users, AlertTriangle, Brain, Bot, MessageSquare, Key, Zap } from 'lucide-react';

/**
 * AI Tabletop Exercises Slide
 *
 * Shows why traditional tabletops miss AI threats and what scenarios to include.
 */
const AITabletopSlide = ({ theme: t }) => {
  const title = "Is Your Tabletop Ready for AI?";
  const subtitle = "Traditional assumptions don't hold when AI is in the mix";

  const gaps = [
    {
      traditional: "Phishing has grammar tells",
      aiReality: "AI phishing is perfect",
      icon: MessageSquare
    },
    {
      traditional: "Voice verification works",
      aiReality: "Deepfakes defeat callbacks",
      icon: Users
    },
    {
      traditional: "Data stays where you put it",
      aiReality: "Shadow AI = invisible exfil",
      icon: Brain
    },
    {
      traditional: "Clear forensic artifacts",
      aiReality: "AI attacks leave no IOCs",
      icon: AlertTriangle
    }
  ];

  const scenarios = [
    {
      name: "Shadow AI Data Leak",
      description: "Employee pastes client PII into ChatGPT to draft an email",
      color: "text-purple-400"
    },
    {
      name: "Deepfake CFO Call",
      description: "AI-cloned voice authorizes urgent wire transfer",
      color: "text-red-400"
    },
    {
      name: "Prompt Injection",
      description: "Malicious input hijacks your customer-facing AI assistant",
      color: "text-amber-400"
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className={`text-5xl md:text-6xl font-black mb-3 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-xl md:text-2xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      {/* Two columns: Gaps + Scenarios */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left: Gap Analysis */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span className="text-2xl font-bold text-amber-400">Where Tabletops Miss</span>
          </div>

          <div className="space-y-3">
            {gaps.map((gap, i) => (
              <div
                key={i}
                className={`${t.cardBg} p-4 rounded-lg border ${t.cardBorder} flex items-center gap-4`}
              >
                <gap.icon className="w-6 h-6 text-slate-500 flex-shrink-0" />
                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xl text-slate-400 line-through">{gap.traditional}</span>
                  <span className="text-xl text-slate-600">→</span>
                  <span className="text-xl text-red-400 font-medium">{gap.aiReality}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scenarios */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-6 h-6 text-emerald-400" />
            <span className="text-2xl font-bold text-emerald-400">Scenarios to Add</span>
          </div>

          <div className="space-y-4">
            {scenarios.map((scenario, i) => (
              <div
                key={i}
                className={`${t.cardBg} p-4 rounded-lg border ${t.cardBorder}`}
              >
                <div className={`text-2xl font-bold ${scenario.color} mb-2`}>
                  {scenario.name}
                </div>
                <p className="text-xl text-slate-300">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom callout */}
      <div className="mt-6 text-center">
        <div className={`inline-block ${t.cardBg} px-8 py-4 rounded-xl border border-purple-500/40`}>
          <div className="flex items-center gap-3 justify-center">
            <Zap className="w-6 h-6 text-purple-400" />
            <p className="text-2xl text-slate-300">
              <span className="text-purple-400 font-semibold">Traditional IR assumes reproducibility.</span>{' '}
              LLMs don't comply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITabletopSlide;
