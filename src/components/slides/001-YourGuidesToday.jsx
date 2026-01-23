import React from 'react';
import { Zap } from 'lucide-react';

const IntroSlide = ({ theme: t }) => {
  const title = "Your Guides Today";
  const subtitle = "Two former CISOs from the bayou";
  const presenters = [
    {
      name: "Tim Fournet",
      role: "Automation Evangelist @ Rewst",
      headshot: "/images/tim-fournet.jpg",
      credentials: [
        "Former CISO - MSP/MSSP space",
        "Serial automator and builder of things",
        "Engineering approach to security"
      ]
    },
    {
      name: "Roddy Bergeron",
      role: "Cybersecurity Fellow @ Sherweb",
      headshot: "/images/roddy-bergeron.jpg",
      credentials: [
        "Former CISO - Enterprise & MSP",
        "CISSP, CCSP, CSAP certified",
        "Compliance & frameworks expert"
      ]
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="text-center mb-14">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        {/* Subtitle: Now white text, 2xl minimum for 30+ foot visibility */}
        <p className={`text-2xl md:text-3xl text-white font-medium`}>
          {subtitle}
        </p>
      </div>

      {/* Presenter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[85vw] mx-auto">
        {presenters.map((p, i) => (
          <div key={i} className={`${t.cardBg} p-10 rounded-2xl border ${t.cardBorder}`}>
            {/* Presenter Header */}
            <div className="flex items-center gap-8 mb-8">
              <img
                src={p.headshot}
                alt={p.name}
                className={`w-32 h-32 rounded-full object-cover border-4 ${t.accentBorder}/50`}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-5xl font-black text-white">{p.name}</h3>
                {/* Role: Keep accent color, ensure minimum text-lg size */}
                <p className={`text-2xl ${t.accentColor} font-mono font-semibold`}>{p.role}</p>
              </div>
            </div>
            {/* Credentials: WHITE text, text-xl minimum for 30+ foot readability */}
            <div className="space-y-5">
              {p.credentials.map((cred, j) => (
                <div key={j} className="flex items-center gap-4">
                  <Zap className={`w-7 h-7 ${t.accentColor} flex-shrink-0`} />
                  <span className="text-3xl text-white">{cred}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Tagline: Removed useless "tagline tbd" -
          either add meaningful content later or leave this section out */}
    </div>
  );
};

export default IntroSlide;
