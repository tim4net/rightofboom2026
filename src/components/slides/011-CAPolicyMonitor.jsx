import React from 'react';
import { CrateBadge } from '../ui/CrateBadge';

/**
 * CA Policy Monitor - Transition/Title Slide
 *
 * Simple intro slide that names the crate. Details come on the next slide.
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-16">
      {/* Crate Badge - hero variant shows name prominently */}
      <CrateBadge name="Notify on Conditional Access Policy Changes" variant="hero" />

      {/* Tagline below the hero */}
      <p className="text-3xl text-slate-400 text-center max-w-3xl mt-10">
        Know when your Conditional Access policies change—and why it matters.
      </p>
    </div>
  );
};

export default CACrateIntroSlide;
