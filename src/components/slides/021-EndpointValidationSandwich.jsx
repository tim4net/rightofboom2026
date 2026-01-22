import React from 'react';
import { Shield, Brain, CheckCircle2, ArrowDown, Cpu, FileSearch, Wrench } from 'lucide-react';

/**
 * Endpoint Validation Sandwich
 *
 * Maps the guardrail pattern to endpoint testing:
 * - Deterministic checks (PowerShell/registry queries)
 * - AI explains gaps and prioritizes fixes
 * - Human approves remediation
 */
const EndpointSandwichSlide = ({ theme: t }) => {
  const title = "Endpoint Validation Sandwich";
  const subtitle = "Same pattern, different filling";

  const layers = [
    {
      name: "DETERMINISTIC CHECKS",
      icon: FileSearch,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/40",
      items: [
        "ASR rules: enabled/disabled/audit?",
        "AV exclusions: which paths?",
        "Local admins: who's in the group?",
        "PowerShell logging: on or off?"
      ],
      note: "Facts, not opinions — same output every time"
    },
    {
      name: "AI ANALYSIS",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/40",
      items: [
        "Correlate findings across checks",
        "Explain security impact in plain English",
        "Prioritize: what's most exploitable?",
        "Suggest remediation steps"
      ],
      note: "AI interprets but doesn't decide"
    },
    {
      name: "HUMAN APPROVES",
      icon: CheckCircle2,
      color: "text-amber-400",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/40",
      items: [
        "Review AI recommendations",
        "Approve changes to baseline",
        "Schedule remediation window",
        "Track exceptions with justification"
      ],
      note: "Business context the AI can't see"
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

      {/* The Sandwich Layers */}
      <div className="space-y-3 mb-6">
        {layers.map((layer, i) => (
          <React.Fragment key={i}>
            <div className={`${t.cardBg} p-5 rounded-xl border-2 ${layer.borderColor}`}>
              <div className="flex items-start gap-6">
                {/* Icon & Label */}
                <div className="flex-shrink-0 text-center w-48">
                  <div className={`${layer.bgColor} p-3 rounded-lg inline-flex mb-2`}>
                    <layer.icon className={`w-8 h-8 ${layer.color}`} />
                  </div>
                  <div className={`text-xl font-bold ${layer.color}`}>{layer.name}</div>
                </div>

                {/* Items */}
                <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-2">
                  {layer.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${layer.bgColor}`} />
                      <span className="text-xl text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <div className="flex-shrink-0 w-64 text-right">
                  <span className="text-lg text-slate-500 italic">{layer.note}</span>
                </div>
              </div>
            </div>

            {/* Arrow between layers (except after last) */}
            {i < layers.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-slate-600" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Bottom: Key Insight */}
      <div className="flex justify-center">
        <div className={`${t.cardBg} px-8 py-4 rounded-xl border ${t.cardBorder} max-w-3xl`}>
          <div className="flex items-center gap-4">
            <Cpu className="w-8 h-8 text-slate-500 flex-shrink-0" />
            <p className="text-2xl text-slate-300">
              <span className="text-emerald-400 font-semibold">AI is not the sensor.</span>{' '}
              Your EDR + config baselines are the sensors.{' '}
              <span className="text-purple-400 font-semibold">AI explains what they find.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndpointSandwichSlide;
