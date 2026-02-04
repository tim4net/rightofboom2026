import React from 'react';
import { AlertTriangle } from 'lucide-react';

const GridSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[90vw] mx-auto">
        {slide.items.map(item => (
          <div key={item} className={`p-6 ${t.cardBg} border ${t.cardBorder} rounded-xl flex items-center gap-4 text-lg font-medium text-slate-300 hover:scale-105 transition-transform`}>
            <AlertTriangle className={`w-6 h-6 shrink-0 ${t.accentColor}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridSlide;
