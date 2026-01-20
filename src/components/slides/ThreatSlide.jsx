import React from 'react';

const ThreatSlide = ({ slide, theme: t, themeName }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className={`text-6xl md:text-8xl font-black mb-4 text-red-500 ${themeName === 'dramatic' ? 'animate-pulse-glow' : ''}`}>
          {slide.title}
        </h2>
        <p className="text-2xl md:text-3xl text-slate-400 font-mono">{slide.subtitle}</p>
      </div>
      <div className="bg-black p-8 rounded-2xl border-2 border-red-500/50 max-w-[85vw] mx-auto mb-8 glow-red">
        <div className="text-red-500 mb-6 font-bold text-xl font-mono">ATTACKER OODA LOOP [AUTONOMOUS]</div>
        <div className="grid grid-cols-4 gap-4 text-center mb-8">
          {slide.ooda.map((step, i) => (
            <div key={step} className="p-4 border border-red-500/30 rounded-lg bg-red-950/20">
              <div className="text-white font-bold text-lg">{step}</div>
              <div className="text-slate-500 text-sm">{slide.oodaSub[i]}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-slate-400 mb-2">{slide.statLabel}</div>
          <div className="text-red-500 font-black text-6xl">{slide.stat}</div>
        </div>
      </div>
      <p className="text-center text-xl italic text-slate-400">"{slide.quote}"</p>
    </div>
  );
};

export default ThreatSlide;
