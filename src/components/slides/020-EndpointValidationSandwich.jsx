import React from 'react';
import {
  Zap, Terminal, FileText,
  ArrowRight, Clock, CheckCircle2, ShieldCheck
} from 'lucide-react';

/**
 * Endpoint Validation Sandwich - Simplified 3-Step Workflow
 *
 * STRATEGIC REDESIGN:
 * - Time comparison is now the HERO element at top
 * - "No AI touches the endpoint" moved up as key trust signal
 * - Workflow steps remain clear but secondary to the "60 seconds" message
 * - Creates resolution to Slide 20's tension: "How long does YOUR audit take?"
 *
 * Key message: "PowerShell detects. AI explains. Human acts."
 */
const EndpointValidationSandwichSlide = ({ theme: t }) => {
  const steps = [
    {
      num: 1,
      name: "TRIGGER",
      detail: "Schedule or manual via your RMM",
      icon: Zap,
      color: "emerald"
    },
    {
      num: 2,
      name: "SCAN",
      detail: "23 security checks in PowerShell",
      icon: Terminal,
      color: "amber"
    },
    {
      num: 3,
      name: "REPORT",
      detail: "AI grades + emails findings",
      icon: FileText,
      color: "purple"
    }
  ];

  const colorMap = {
    emerald: {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/50',
      numBg: 'bg-emerald-500'
    },
    amber: {
      text: 'text-amber-400',
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/50',
      numBg: 'bg-amber-500'
    },
    purple: {
      text: 'text-purple-400',
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/50',
      numBg: 'bg-purple-500'
    }
  };

  const rmmPlatforms = [
    "Datto", "N-able", "NinjaOne", "Kaseya", "ConnectWise", "ImmyBot"
  ];

  return (
    <div className="w-full h-full flex flex-col px-16 py-8">
      {/* Header with Title */}
      <div className="text-center mb-4">
        <h2 className={`text-5xl font-black ${t.textOnPage}`}>
          Safe Sweep: How It Works
        </h2>
      </div>

      {/* HERO ELEMENT: Time Comparison - The Answer to "How long does YOUR audit take?" */}
      <div className="flex justify-center items-center gap-6 mb-6">
        {/* Manual Time */}
        <div className={`${t.cardBg} px-10 py-6 rounded-2xl border-2 border-red-500/40`}>
          <div className="text-center">
            <div className="text-xl text-slate-500 uppercase tracking-wide mb-2">Manual audit</div>
            <div className="text-6xl font-black text-red-400">2-4 hours</div>
            <div className="text-xl text-slate-500 mt-1">per endpoint</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center">
          <ArrowRight className="w-12 h-12 text-emerald-400" />
        </div>

        {/* Safe Sweep Time */}
        <div className={`${t.cardBg} px-10 py-6 rounded-2xl border-2 border-emerald-500/40`}>
          <div className="text-center">
            <div className="text-xl text-slate-500 uppercase tracking-wide mb-2">Safe Sweep</div>
            <div className="text-6xl font-black text-emerald-400">60 seconds</div>
            <div className="text-xl text-slate-500 mt-1">all endpoints</div>
          </div>
        </div>
      </div>

      {/* Trust Signal - Moved Up */}
      <div className="flex justify-center mb-6">
        <div className={`${t.cardBg} px-6 py-3 rounded-xl border border-emerald-500/30 flex items-center gap-3`}>
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
          <span className="text-2xl text-emerald-400 font-semibold">No AI touches the endpoint</span>
          <span className="text-2xl text-slate-400">— PowerShell only, read-only checks</span>
        </div>
      </div>

      {/* 3-Step Workflow - Clear but Secondary */}
      <div className="flex items-stretch justify-center gap-3 mb-6">
        {steps.map((step, i) => {
          const colors = colorMap[step.color];
          const IconComponent = step.icon;

          return (
            <React.Fragment key={i}>
              {/* Step Card */}
              <div className={`${t.cardBg} rounded-xl border-2 ${colors.border} p-5 flex-1 max-w-xs flex flex-col items-center justify-center`}>
                {/* Step Number */}
                <div className={`${colors.numBg} w-10 h-10 rounded-full flex items-center justify-center mb-2`}>
                  <span className="text-2xl font-black text-white">{step.num}</span>
                </div>

                {/* Icon + Name Row */}
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className={`w-8 h-8 ${colors.text}`} />
                  <div className={`text-3xl font-black ${colors.text}`}>
                    {step.name}
                  </div>
                </div>

                {/* Detail */}
                <div className="text-xl text-slate-400 text-center">
                  {step.detail}
                </div>
              </div>

              {/* Arrow (except after last) */}
              {i < steps.length - 1 && (
                <div className="flex items-center">
                  <ArrowRight className="w-8 h-8 text-slate-600" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* RMM Support Row */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xl text-slate-500">Works with your RMM:</span>
          {rmmPlatforms.map((rmm, i) => (
            <span key={i} className="text-xl text-slate-400 bg-slate-800/50 px-3 py-1 rounded">
              {rmm}
            </span>
          ))}
        </div>
      </div>

      {/* Key Tagline - The Sound Bite */}
      <div className="text-center">
        <p className="text-3xl">
          <span className="text-amber-400 font-bold">PowerShell detects.</span>
          <span className="text-slate-600 mx-3">|</span>
          <span className="text-purple-400 font-bold">AI explains.</span>
          <span className="text-slate-600 mx-3">|</span>
          <span className="text-emerald-400 font-bold">Human acts.</span>
        </p>
      </div>
    </div>
  );
};

export default EndpointValidationSandwichSlide;
