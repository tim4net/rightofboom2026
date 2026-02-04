import React from 'react';

const ContentSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-6 mb-10">
        <div className={`p-4 rounded-2xl border ${t.cardBorder} ${t.cardBg} ${t.accentColor} ${t.accentGlow}`}>
          {slide.icon}
        </div>
        <div>
          <h2 className={`text-6xl md:text-8xl font-black ${t.textOnPage}`}>{slide.title}</h2>
          <p className={`text-2xl md:text-3xl ${t.accentColor} font-bold tracking-wide uppercase mt-2`}>{slide.subtitle}</p>
        </div>
      </div>
      <ul className="space-y-6 ml-4">
        {slide.points.map((p, i) => (
          <li key={i} className="flex items-start gap-6 group">
            <div className={`mt-4 w-4 h-4 rounded-full ${t.accentBg} shadow-[0_0_20px] ${t.accentGlow} group-hover:scale-150 transition-transform`} />
            <span className="text-3xl md:text-4xl text-slate-200 font-medium leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentSlide;
