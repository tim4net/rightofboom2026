import React from 'react';

/**
 * CA Crate Intro Slide
 *
 * Photo test: Concrete details someone can act on after the conference.
 */
export const CACrateIntroSlide = ({ theme: t }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-20">
      {/* Rewst Logo */}
      <img
        src="/images/rewst-logo.png"
        alt="Rewst"
        className="h-20 w-auto mb-8"
      />

      {/* Title */}
      <h1 className={`text-6xl font-bold ${t.textOnPage} mb-10`}>
        CA Policy Monitor
      </h1>

      {/* What it actually does - concrete */}
      <div className="space-y-4 text-center max-w-5xl">
        <p className="text-3xl text-slate-300">
          Watches your <span className="text-amber-400 font-semibold">Conditional Access policies</span> across all M365 tenants
        </p>
        <p className="text-3xl text-slate-300">
          Alerts when someone <span className="text-red-400 font-semibold">weakens a policy</span> or <span className="text-red-400 font-semibold">adds exclusions</span>
        </p>
        <p className="text-3xl text-slate-300">
          Shows you <span className="text-emerald-400 font-semibold">who changed it</span> and <span className="text-emerald-400 font-semibold">whether there's a ticket</span>
        </p>
      </div>
    </div>
  );
};

export default CACrateIntroSlide;
