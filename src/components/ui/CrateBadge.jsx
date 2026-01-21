import React from 'react';
import { Package } from 'lucide-react';

/**
 * CrateBadge - Rewst Crate branding component
 *
 * Displays a Rewst-branded "Crate" badge for demos that showcase
 * reusable Rewst automation packages. Used across multiple crate demos
 * for consistent branding.
 *
 * @param {object} props
 * @param {string} props.name - The crate name (e.g., "CA Policy Monitor")
 * @param {string} [props.variant='default'] - 'default' | 'compact' | 'hero'
 * @param {string} [props.className] - Additional classes
 */
export function CrateBadge({ name, variant = 'default', className = '' }) {
  if (variant === 'hero') {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        {/* Rewst Logo + Crate Label */}
        <div className="flex items-center gap-4">
          <img
            src="/images/rewst-logo.png"
            alt="Rewst"
            className="h-12 w-auto"
          />
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-lg">
            <Package className="w-6 h-6 text-amber-400" />
            <span className="text-xl font-bold text-amber-400 uppercase tracking-wide">Crate</span>
          </div>
        </div>
        {/* Crate Name */}
        <div className="text-4xl font-bold text-white">
          {name}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src="/images/rewst-logo.png"
          alt="Rewst"
          className="h-8 w-auto"
        />
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/50 rounded-lg">
          <Package className="w-5 h-5 text-amber-400" />
          <span className="text-lg font-bold text-amber-400">{name}</span>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <img
        src="/images/rewst-logo.png"
        alt="Rewst"
        className="h-10 w-auto"
      />
      <div className="h-8 w-px bg-slate-600" />
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-lg">
        <Package className="w-5 h-5 text-amber-400" />
        <span className="text-xl font-bold text-amber-400">{name}</span>
      </div>
    </div>
  );
}

/**
 * CrateHeader - Full-width header with crate branding
 *
 * Used at the top of crate demo slides for consistent branding.
 *
 * @param {object} props
 * @param {string} props.name - The crate name
 * @param {string} [props.subtitle] - Optional subtitle/description
 */
export function CrateHeader({ name, subtitle }) {
  return (
    <div className="flex items-center justify-between w-full">
      <CrateBadge name={name} />
      {subtitle && (
        <p className="text-xl text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

/**
 * SandwichMapping - Shows how a crate maps to the guardrail sandwich
 *
 * Visual component showing INPUT/AI/OUTPUT layers with descriptions.
 * Reinforces the sandwich principle within crate demos.
 */
export function SandwichMapping({
  inputLabel,
  inputDesc,
  aiLabel,
  aiDesc,
  outputLabel,
  outputDesc
}) {
  return (
    <div className="flex items-center justify-center gap-3 text-xl">
      {/* Input - Emerald */}
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg">
        <span className="text-emerald-400 font-bold">{inputLabel || 'INPUT'}</span>
        {inputDesc && <span className="text-emerald-400/70">{inputDesc}</span>}
      </div>

      <span className="text-slate-500">+</span>

      {/* AI - Purple */}
      <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg">
        <span className="text-purple-400 font-bold">{aiLabel || 'AI'}</span>
        {aiDesc && <span className="text-purple-400/70">{aiDesc}</span>}
      </div>

      <span className="text-slate-500">+</span>

      {/* Output - Amber */}
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/20 border border-amber-500/50 rounded-lg">
        <span className="text-amber-400 font-bold">{outputLabel || 'OUTPUT'}</span>
        {outputDesc && <span className="text-amber-400/70">{outputDesc}</span>}
      </div>
    </div>
  );
}

export default CrateBadge;
