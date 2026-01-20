import React from 'react';
import { TrendingUp, Clock, Database, Eye, Zap } from 'lucide-react';

/**
 * BridgeSlide - "Why Defenders Win"
 *
 * REDESIGNED for projection-scale typography (30+ feet)
 * - Removed cramped 4-column pattern grid
 * - Simplified to core message + key stats
 * - All text now 24px+ minimum
 */
const BridgeSlide = ({ theme: t }) => {
  const title = "Why Defenders Win";
  const subtitle = "Context, baselines, and legitimate access";

  // Defender advantages - simplified to 3 with bigger text
  const advantages = [
    {
      icon: Database,
      title: "Context",
      desc: "You know your environment"
    },
    {
      icon: Eye,
      title: "Visibility",
      desc: "Legitimate access to everything"
    },
    {
      icon: Zap,
      title: "Speed",
      desc: "Prepare before attacks arrive"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-2xl md:text-3xl ${t.accentColor} font-medium`}>
          {subtitle}
        </p>
      </div>

      <div className="max-w-6xl w-full">
        {/* Key Stats - Two big numbers */}
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className={`${t.cardBg} p-8 rounded-2xl border border-emerald-500/50 flex items-center gap-6`}>
            <div className="p-4 rounded-xl bg-emerald-500/20">
              <TrendingUp className="w-12 h-12 text-emerald-400" />
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-emerald-400">$2M</div>
              <div className="text-2xl text-slate-300 mt-2">Reduced breach costs with AI</div>
              <div className="text-xl text-slate-500 mt-1">IBM 2024</div>
            </div>
          </div>
          <div className={`${t.cardBg} p-8 rounded-2xl border border-emerald-500/50 flex items-center gap-6`}>
            <div className="p-4 rounded-xl bg-emerald-500/20">
              <Clock className="w-12 h-12 text-emerald-400" />
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-black text-emerald-400">80 Days</div>
              <div className="text-2xl text-slate-300 mt-2">Faster incident response</div>
              <div className="text-xl text-slate-500 mt-1">IBM 2024</div>
            </div>
          </div>
        </div>

        {/* Defender Advantages - 3 columns, bigger text */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {advantages.map((adv, i) => (
            <div key={i} className={`${t.cardBg} p-6 rounded-xl border ${t.cardBorder} text-center`}>
              <adv.icon className={`w-12 h-12 ${t.accentColor} mx-auto mb-4`} />
              <div className={`text-3xl font-bold ${t.accentColor} mb-2`}>{adv.title}</div>
              <div className="text-2xl text-slate-400">{adv.desc}</div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className={`text-center p-6 rounded-xl border ${t.cardBorder} ${t.cardBg}`}>
          <p className="text-2xl text-slate-300">
            <span className={`${t.accentColor} font-bold`}>70% of SOCs</span> are experimenting with AI.
            The question isn't <em>whether</em> to automate — it's how fast you can do it{' '}
            <span className={`${t.accentColor} font-bold`}>responsibly</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BridgeSlide;
