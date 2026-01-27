import React from 'react';

const TitleSlide = ({ theme: t }) => {
  const title = "Think Like an Attacker";
  const subtitle = "Automating Red Team Simulations and AI Testing";
  const presenters = [
    { name: "Tim Fournet", role: "Automation Evangelist @ Rewst", headshot: "/speakers/tim-fournet.jpg", logo: "/images/rewst-logo.png" },
    { name: "Roddy Bergeron", role: "Cybersecurity Fellow @ Sherweb", headshot: "/speakers/roddy-bergeron.jpg", logo: "/images/sherweb-logo-white.svg" }
  ];
  const venue = "Right of Boom 2026 | Las Vegas";

  return (
    <div className="text-center relative">
      <h1 className={`text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter ${t.textOnPage}`}>
        {title}
      </h1>
      <p className={`text-2xl md:text-4xl ${t.accentColor} mb-16 font-medium tracking-wide`}>
        {subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[85vw] mx-auto mb-12">
        {presenters.map(p => (
          <div key={p.name} className={`flex flex-col items-center gap-5 ${t.cardBg} p-10 rounded-2xl border ${t.cardBorder} backdrop-blur-sm`}>
            <img
              src={p.headshot}
              alt={p.name}
              className={`w-36 h-36 rounded-full object-cover border-4 ${t.accentBorder}/50 shadow-lg ${t.accentGlow}`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className={`w-36 h-36 rounded-full bg-gradient-to-br ${t.accentBg} to-indigo-600 items-center justify-center text-4xl font-bold hidden`}>
              {p.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="font-black text-3xl text-white">{p.name}</span>
            <span className={`text-xl ${t.accentColor} font-mono text-center leading-relaxed`}>{p.role}</span>
            <div className="w-48 h-16 mt-2 flex items-center justify-center">
              <img src={p.logo} alt="Company logo" className="w-full h-auto object-contain" />
            </div>
          </div>
        ))}
      </div>
      <p className="text-cloud-gray-400 font-mono text-2xl tracking-[0.3em] uppercase">{venue}</p>
    </div>
  );
};

export default TitleSlide;
