import React from 'react';
import { Presentation, User } from 'lucide-react';

/**
 * HandoffSlide - Transition slide for guest presenter sections
 *
 * Used to signal when Roddy (or other guest presenters) take over
 * for their portion of the presentation.
 */
const HandoffSlide = ({ theme: t, presenter, topic, subtitle, duration }) => {
  return (
    <div className="animate-in fade-in duration-500 text-center">
      {/* Icon */}
      <div className={`mb-8 ${t.accentBg} w-24 h-24 rounded-full flex items-center justify-center mx-auto ${t.accentGlow}`}>
        <Presentation className="w-12 h-12 text-white" />
      </div>

      {/* Main heading */}
      <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
        {topic}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium mb-8`}>
          {subtitle}
        </p>
      )}

      {/* Presenter info card */}
      <div className={`max-w-xl mx-auto ${t.cardBg} p-6 rounded-2xl border ${t.cardBorder} mt-8`}>
        <div className="flex items-center justify-center gap-4">
          <div className={`${t.accentBg}/20 p-3 rounded-full`}>
            <User className={`w-8 h-8 ${t.accentColor}`} />
          </div>
          <div className="text-left">
            <p className={`text-xl font-semibold ${t.textOnPage}`}>{presenter}</p>
            <p className={`text-lg text-slate-400`}>Sherweb</p>
          </div>
        </div>
        {duration && (
          <p className={`text-sm text-slate-500 mt-4`}>
            ~{duration}
          </p>
        )}
      </div>
    </div>
  );
};

export default HandoffSlide;
