import React from 'react';

/**
 * CA Crate Intro Slide
 *
 * Photo test: Can someone understand this slide from a photo taken at the conference?
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20">
      {/* Rewst Logo */}
      <img
        src="/images/rewst-logo.png"
        alt="Rewst"
        className="h-24 w-auto mb-10"
      />

      {/* Title */}
      <h1 className={`text-6xl font-bold ${t.textOnPage} mb-12`}>
        CA Policy Monitor
      </h1>

      {/* The three steps - clear, scannable */}
      <div className="space-y-6 text-center">
        <p className="text-4xl text-slate-200">
          <span className="text-emerald-400 font-semibold">You store the baseline.</span>
        </p>
        <p className="text-4xl text-slate-200">
          <span className="text-amber-400 font-semibold">Math finds what changed.</span>
        </p>
        <p className="text-4xl text-slate-200">
          <span className="text-purple-400 font-semibold">AI explains why it matters.</span>
        </p>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
