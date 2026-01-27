import React from 'react';

const ClosingSlide = ({ theme: t }) => {
  const title = "Questions & Discussion";
  const subtitle = "Let's talk";
  const presenters = [
    { name: "Tim Fournet", role: "@TimFournet", linkedin: "https://www.linkedin.com/in/tfournet", headshot: "/speakers/tim-fournet.jpg" },
    { name: "Roddy Bergeron", role: "@RoddyBergeron", linkedin: "https://www.linkedin.com/in/roddy-bergeron-cissp-ccsp-csap-33432573", headshot: "/speakers/roddy-bergeron.jpg" }
  ];
  const venue = "Right of Boom 2026 | Las Vegas";

  return (
    <div className="text-center">
      <h1 className={`text-6xl md:text-8xl font-black mb-6 ${t.textOnPage}`}>
        {title}
      </h1>
      <p className={`text-2xl md:text-4xl ${t.accentColor} mb-12 font-medium`}>
        {subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[85vw] mx-auto mb-12">
        {presenters.map(p => (
          <div key={p.name} className={`flex flex-col items-center gap-6 ${t.cardBg} p-10 rounded-2xl border ${t.cardBorder}`}>
            <div className="relative">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(p.linkedin)}&bgcolor=0f172a&color=ffffff&ecc=H`}
                alt={`${p.name} LinkedIn QR`}
                className="w-56 h-56 rounded-xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={p.headshot}
                  alt={p.name}
                  className={`w-20 h-20 rounded-full object-cover border-4 border-slate-900 shadow-xl`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${t.accentBg} to-indigo-600 items-center justify-center text-2xl font-bold border-4 border-slate-900 hidden`}>
                  {p.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
            <span className="font-black text-3xl text-white">{p.name}</span>
            <span className={`text-xl ${t.accentColor} font-mono`}>{p.role}</span>
            <span className="text-xl text-slate-400">Scan to connect on LinkedIn</span>
          </div>
        ))}
      </div>
      <p className="text-slate-500 font-mono text-xl tracking-[0.3em] uppercase">{venue}</p>
    </div>
  );
};

export default ClosingSlide;
