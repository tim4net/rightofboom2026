import React from 'react';
import { Coffee, Clock } from 'lucide-react';

const BreakSlide = ({ theme: t }) => {
  const title = "15 Minute Break";
  const subtitle = "Process, caffeinate, prepare to operationalize";
  const duration = 15;
  const nextSection = "Part III: Governance & Trust";

  return (
    <div className="animate-in fade-in duration-500 text-center">
      <div className={`mb-8 ${t.accentBg} w-24 h-24 rounded-full flex items-center justify-center mx-auto ${t.accentGlow}`}>
        <Coffee className="w-12 h-12 text-white" />
      </div>
      <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{title}</h2>
      <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium mb-12`}>{subtitle}</p>

      <div className={`max-w-xl mx-auto ${t.cardBg} p-8 rounded-2xl border ${t.cardBorder}`}>
        <div className="text-slate-400 mb-4 text-2xl">Returning with:</div>
        <div className={`text-3xl font-bold ${t.accentColor}`}>{nextSection}</div>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <Clock className={`w-6 h-6 ${t.accentColor}`} />
        <span className="text-2xl text-slate-400">
          Back at <span className={`font-mono ${t.accentColor}`}>{new Date(Date.now() + duration * 60000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </span>
      </div>

      <p className="mt-8 text-slate-600 font-mono text-xl">
        [CPE Reminder: Sign the attendance sheet]
      </p>
    </div>
  );
};

export default BreakSlide;
