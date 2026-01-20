import React from 'react';

const EvolutionSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>{slide.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[90vw] mx-auto">
        {slide.levels.map((level, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl transition-all ${
              level.status === 'old' ? 'bg-slate-800/30 border border-slate-700 opacity-60' :
              level.status === 'warn' ? 'bg-yellow-950/30 border border-yellow-700/50' :
              `${t.cardBg} border-2 ${t.accentBorder} ${t.accentGlow}`
            }`}
          >
            <h4 className={`font-bold mb-2 text-xl ${
              level.status === 'old' ? 'text-slate-500' :
              level.status === 'warn' ? 'text-yellow-500' :
              t.accentColor
            }`}>
              Level {i + 1}: {level.name}
            </h4>
            <div className="text-4xl font-black mb-4 text-white">{level.time}</div>
            <ul className="text-sm space-y-2 text-slate-400">
              {level.steps.map((step, j) => (
                <li key={j} className={step.includes('FAIL') ? 'text-red-400' : ''}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionSlide;
