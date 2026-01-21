import React from 'react';

/**
 * AttackSetupSlide - "The Skill Gap Collapsed"
 *
 * Design Philosophy:
 * - One dominant idea: Time-to-attack collapsed from years to minutes
 * - Clean vertical layout with breathing room
 * - Uses theme system consistently
 * - The transformation IS the slide - no clutter
 * - Conference-scale typography (readable from 50+ feet)
 */
const AttackSetupSlide = ({ theme: t }) => {
  const title = "The Skill Gap Collapsed";
  const subtitle = "What it takes to launch an attack";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">

      {/* Header - minimal, sets context */}
      <div className="text-center mb-16">
        <h2 className={`text-5xl md:text-7xl font-black mb-4 ${t.textOnPage}`}>
          {title}
        </h2>
        <p className={`text-2xl md:text-3xl ${t.textOnPageMuted} font-medium`}>
          {subtitle}
        </p>
      </div>

      {/* The Comparison - Single Card, Clean Layout */}
      <div className={`${t.cardBg} rounded-3xl border ${t.cardBorder} p-12 md:p-16 max-w-5xl w-full`}>

        {/* Two columns inside the card */}
        <div className="flex items-stretch">

          {/* Before */}
          <div className="flex-1 text-center pr-12">
            <div className="text-slate-500 font-mono text-2xl uppercase tracking-widest mb-6">
              Before AI
            </div>
            <div className="text-7xl md:text-8xl font-black text-white mb-8">
              2019
            </div>
            <div className="space-y-4 text-left">
              <div className="text-3xl text-slate-300">Network protocols</div>
              <div className="text-3xl text-slate-300">Exploit development</div>
              <div className="text-3xl text-slate-300">Reverse engineering</div>
              <div className="text-3xl text-slate-300">OS internals</div>
            </div>
          </div>

          {/* Center Divider */}
          <div className="w-px bg-slate-700 mx-4"></div>

          {/* After */}
          <div className="flex-1 text-center pl-12">
            <div className={`${t.accentColorOnDark} font-mono text-2xl uppercase tracking-widest mb-6`}>
              After AI
            </div>
            <div className={`text-7xl md:text-8xl font-black ${t.accentColorOnDark} mb-8`}>
              2026
            </div>
            <div className="space-y-4 text-left">
              <div className="text-3xl text-slate-300">Curiosity</div>
              <div className="text-3xl text-slate-300">A login to an LLM</div>
            </div>
          </div>

        </div>

        {/* The Punchline - Time Collapse */}
        <div className="mt-16 pt-10 border-t border-slate-700 relative">
          <div className="flex items-stretch">
            <div className="flex-1 text-center pr-12">
              <div className="text-slate-500 text-2xl uppercase tracking-wider mb-2">Time to First Attack</div>
              <div className="text-7xl font-black text-white">Years</div>
            </div>
            {/* Center Divider */}
            <div className="w-px bg-slate-700 mx-4"></div>
            <div className="flex-1 text-center pl-12">
              <div className={`${t.accentColorOnDark} text-2xl uppercase tracking-wider mb-2`}>Time to First Attack</div>
              <div className={`text-7xl font-black ${t.accentColorOnDark}`}>Minutes</div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Context - Optional Stat */}
      {/* <div className="mt-12 text-center">
        <p className="text-slate-500 text-2xl">
          Attacker pool: <span className="text-slate-400 font-semibold">Trained specialists</span>
          {" "}&rarr;{" "}
          <span className={`${t.accentColor} font-semibold`}>5+ billion people with internet access</span>
        </p>
      </div> */}

    </div>
  );
};

export default AttackSetupSlide;
