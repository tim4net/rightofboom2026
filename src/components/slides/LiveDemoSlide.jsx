import React from 'react';
import { PlayCircle } from 'lucide-react';

const LiveDemoSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500 text-center">
      <div className="mb-8">
        <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
      </div>
      <div className={`max-w-[80vw] mx-auto ${t.cardBg} p-12 rounded-2xl border-2 ${t.accentBorder} ${t.accentGlow}`}>
        <div className="flex items-center justify-center gap-4 mb-8">
          <PlayCircle className={`w-16 h-16 ${t.accentColor} animate-pulse`} />
          <span className="text-4xl font-black">{slide.demoName}</span>
        </div>
        {slide.demoNotes && (
          <div className="space-y-4 text-left">
            {slide.demoNotes.map((note, i) => (
              <div key={i} className="flex items-center gap-4 text-xl text-slate-300">
                <div className={`w-8 h-8 rounded-full ${t.accentBg} flex items-center justify-center font-bold text-sm`}>
                  {i + 1}
                </div>
                {note}
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-slate-500 font-mono text-sm">
            [PRESENTER: Switch to live demo environment]
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveDemoSlide;
