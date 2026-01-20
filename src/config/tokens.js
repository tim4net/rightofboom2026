/**
 * Design Tokens for Right of Boom 2026 Presentation
 * Centralized styling constants extracted from DemoComponents.jsx
 *
 * Usage: import { TOKENS, tw } from '@/config/tokens'
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const COLORS = {
  // Backgrounds
  bg: {
    card: 'bg-slate-900/50',
    cardDark: 'bg-slate-900/80',
    cardHover: 'bg-slate-800/50',
    terminal: 'bg-[#0a0a0a]',
    input: 'bg-slate-800',
    overlay: 'bg-black/30',
  },

  // Borders
  border: {
    default: 'border-slate-700',
    input: 'border-slate-600',
    subtle: 'border-slate-800',
    // Accent borders
    red: 'border-red-500/30',
    green: 'border-green-500/30',
    blue: 'border-blue-500/30',
    yellow: 'border-yellow-500/30',
    orange: 'border-orange-500/30',
    purple: 'border-purple-500/30',
  },

  // Status colors (for badges, indicators)
  status: {
    success: { bg: 'bg-green-900/50', text: 'text-green-400', border: 'border-green-500/50' },
    error: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-500/50' },
    warning: { bg: 'bg-yellow-900/50', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    info: { bg: 'bg-blue-900/50', text: 'text-blue-400', border: 'border-blue-500/50' },
    neutral: { bg: 'bg-slate-800', text: 'text-slate-400', border: 'border-slate-700' },
    critical: { bg: 'bg-red-950/50', text: 'text-red-500', border: 'border-red-500/50' },
    high: { bg: 'bg-orange-950/50', text: 'text-orange-400', border: 'border-orange-500/50' },
    medium: { bg: 'bg-yellow-950/50', text: 'text-yellow-400', border: 'border-yellow-500/50' },
    low: { bg: 'bg-blue-950/50', text: 'text-blue-400', border: 'border-blue-500/50' },
  },
};

// =============================================================================
// COMPONENT TOKENS - Pre-composed class strings for common patterns
// =============================================================================

export const TOKENS = {
  // Card variants
  card: {
    base: 'bg-slate-900/50 rounded-xl border border-slate-700',
    padded: 'bg-slate-900/50 rounded-xl p-4 border border-slate-700',
    large: 'bg-slate-900/50 rounded-2xl p-6 border border-slate-700',
    xl: 'bg-slate-900/50 rounded-2xl p-8 border border-slate-700',
    // Accent variants
    red: 'bg-slate-900/50 rounded-xl p-4 border border-red-500/30',
    green: 'bg-slate-900/50 rounded-xl p-4 border border-green-500/30',
    blue: 'bg-slate-900/50 rounded-xl p-4 border border-blue-500/30',
    yellow: 'bg-slate-900/50 rounded-xl p-4 border border-yellow-500/30',
    orange: 'bg-slate-900/50 rounded-xl p-4 border border-orange-500/30',
  },

  // Terminal display
  terminal: {
    base: 'bg-[#0a0a0a] rounded-lg font-mono text-xs leading-relaxed relative z-10 isolate shadow-xl',
    padded: 'bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed relative z-10 isolate shadow-xl',
    withBorder: 'bg-[#0a0a0a] rounded-lg p-2 font-mono text-xs leading-relaxed border relative z-10 isolate shadow-xl',
    // Height variants
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    // Border colors (append to terminal base)
    borderRed: 'border-red-500/30',
    borderGreen: 'border-green-500/30',
    borderBlue: 'border-blue-500/30',
  },

  // Status badges
  badge: {
    base: 'px-2 py-1 rounded text-xs font-bold',
    success: 'px-2 py-1 rounded bg-green-900/50 text-green-400',
    error: 'px-2 py-1 rounded bg-red-900/50 text-red-400',
    warning: 'px-2 py-1 rounded bg-yellow-900/50 text-yellow-400',
    info: 'px-2 py-1 rounded bg-blue-900/50 text-blue-400',
    neutral: 'px-2 py-1 rounded bg-slate-800 text-slate-500',
    // Severity badges
    critical: 'px-2 py-1 rounded bg-red-600 text-white uppercase',
    high: 'px-2 py-1 rounded bg-orange-600 text-white uppercase',
    medium: 'px-2 py-1 rounded bg-yellow-600 text-black uppercase',
    low: 'px-2 py-1 rounded bg-blue-600 text-white uppercase',
  },

  // Input fields
  input: {
    base: 'bg-slate-800 border border-slate-600 rounded-xl focus:outline-none transition-colors',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg',
    focusRed: 'focus:border-red-500',
    focusGreen: 'focus:border-green-500',
    focusBlue: 'focus:border-blue-500',
  },

  // Buttons
  button: {
    base: 'rounded-xl font-bold transition-colors flex items-center gap-2',
    primary: 'bg-red-600 hover:bg-red-500 text-white',
    secondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    success: 'bg-green-600 hover:bg-green-500 text-white',
    danger: 'bg-red-700 hover:bg-red-600 text-white',
    ghost: 'bg-transparent hover:bg-slate-800 text-slate-400',
    disabled: 'bg-slate-700 cursor-not-allowed text-slate-500',
    // Sizes
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  },

  // Code blocks
  code: {
    inline: 'font-mono text-sm bg-slate-950 px-2 py-1 rounded',
    inlineRed: 'font-mono text-xs text-red-400 bg-red-950/50 px-2 py-1 rounded',
    inlineGreen: 'font-mono text-xs text-green-400 bg-green-950/50 px-2 py-1 rounded',
    block: 'font-mono text-sm bg-slate-950 p-4 rounded-lg overflow-x-auto',
  },

  // Progress indicators
  progress: {
    track: 'h-2 bg-slate-800 rounded-full overflow-hidden',
    bar: 'h-full rounded-full transition-all duration-300',
    barRed: 'bg-red-500',
    barGreen: 'bg-green-500',
    barBlue: 'bg-blue-500',
    barYellow: 'bg-yellow-500',
  },

  // Metric/stat cards
  metric: {
    container: 'bg-slate-900/50 rounded-xl p-4 border border-slate-700 text-center',
    value: 'text-3xl font-black',
    label: 'text-slate-400 text-sm',
  },

  // Step indicators (for wizards, progress)
  step: {
    base: 'relative p-4 rounded-xl border-2 transition-all duration-300',
    active: 'border-red-500 bg-red-950/50 scale-105 shadow-lg shadow-red-500/20',
    complete: 'border-green-500/50 bg-green-950/30',
    pending: 'border-slate-700 bg-slate-900/50',
  },

  // List items
  listItem: {
    base: 'flex items-center justify-between p-2 bg-black/30 rounded-lg',
    hoverable: 'flex items-center justify-between p-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors',
  },
};

// =============================================================================
// ANIMATION TOKENS
// =============================================================================

export const ANIMATIONS = {
  fadeIn: 'animate-in fade-in duration-500',
  slideIn: 'animate-in slide-in-from-bottom duration-300',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
};

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const SPACING = {
  gap: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
  space: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  },
};

// =============================================================================
// HELPER FUNCTION - Compose multiple token classes
// =============================================================================

/**
 * Utility to join multiple class strings, filtering out falsy values
 * @param  {...string} classes - Class strings to join
 * @returns {string} Combined class string
 *
 * @example
 * tw(TOKENS.card.padded, TOKENS.terminal.borderRed, 'custom-class')
 * // => 'bg-slate-900/50 rounded-xl p-4 border border-slate-700 border-red-500/30 custom-class'
 */
export function tw(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get severity-based styling
 * @param {string} severity - 'critical' | 'high' | 'medium' | 'low'
 * @returns {object} Object with bg, text, border classes
 */
export function getSeverityStyle(severity) {
  const styles = {
    critical: COLORS.status.critical,
    high: COLORS.status.high,
    medium: COLORS.status.medium,
    low: COLORS.status.low,
  };
  return styles[severity?.toLowerCase()] || COLORS.status.neutral;
}

/**
 * Get status-based badge class
 * @param {boolean} isActive - Whether the status is active/success
 * @returns {string} Badge class string
 */
export function getStatusBadge(isActive) {
  return isActive ? TOKENS.badge.success : TOKENS.badge.error;
}

// Default export for convenience
export default {
  COLORS,
  TOKENS,
  ANIMATIONS,
  SPACING,
  tw,
  getSeverityStyle,
  getStatusBadge,
};
