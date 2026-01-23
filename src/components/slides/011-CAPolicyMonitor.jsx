import React from 'react';
import CrateIcon from '../ui/CrateIcon';

/**
 * CA Policy Monitor - Transition/Title Slide
 *
 * Simple intro slide that names the crate. Details come on the next slide.
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">
      {/* Rewst + Crate branding - top and huge */}
      <div className="flex items-center gap-8 mb-16">
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-28 w-auto"
        />
        <div className="h-20 w-px bg-slate-600" />
        <div className="flex items-center gap-4">
          <CrateIcon className="w-16 h-16 text-amber-400" />
          <span className="text-5xl font-bold text-amber-400">Crate</span>
        </div>
      </div>

      {/* Crate name - the hero */}
      <h1 className={`text-6xl font-black ${t.textOnPage} text-center max-w-5xl mb-8`}>
        Notify on Conditional Access Policy Changes
      </h1>

      {/* Tagline */}
      <p className="text-2xl text-slate-400 text-center max-w-3xl">
        Know when your CA policies change—and why it matters.
      </p>
    </div>
  );
};

export default CACrateIntroSlide;
