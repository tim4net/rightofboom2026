import React from 'react';
import { Settings } from 'lucide-react';

const ControlsSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
      </div>
      <div className={`${t.cardBg} p-10 rounded-2xl border ${t.cardBorder} max-w-[85vw] mx-auto mb-8`}>
        <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3 ${t.accentColor}`}>
          <Settings className="w-8 h-8" /> Critical Controls Focus
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slide.controls.map(c => (
            <div key={c.num} className="flex gap-4 items-start">
              <div className={`${t.accentColor} font-black text-3xl`}>{c.num}</div>
              <div className="text-xl text-slate-300">{c.text}</div>
            </div>
          ))}
        </div>
      </div>
      <p className={`text-center text-2xl italic ${t.accentColor}`}>"{slide.quote}"</p>
    </div>
  );
};

export default ControlsSlide;
