import React from 'react';

/**
 * CA Crate Intro Slide
 *
 * Simple, clean introduction. One focal point.
 * The next slides will explain HOW it works.
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">
      {/* Rewst Logo - large and prominent */}
      <img
        src="/images/rewst-logo.png"
        alt="Rewst"
        className="h-32 w-auto mb-8"
      />

      {/* The title */}
      <h1 className={`text-7xl font-black ${t.textOnPage} mb-6`}>
        CA Policy Monitor
      </h1>

      {/* One line - what it does */}
      <p className="text-3xl text-slate-400 text-center max-w-4xl">
        Detects config drift in your Conditional Access policies
      </p>
    </div>
  );
};

export default CACrateIntroSlide;
