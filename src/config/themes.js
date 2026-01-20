/**
 * Theme Configuration - Right of Boom 2026
 *
 * =============================================================================
 * DESIGN PHILOSOPHY: "Rewst Brand Authority"
 * =============================================================================
 *
 * This presentation uses Rewst brand guidelines for visual identity.
 *
 * BRAND COLORS (from Rewst Visual Guidelines)
 * -------------------------------------------
 * - Bot Teal (#1EAFAF): Primary brand color - 50% usage
 * - Ops Indigo (#504384): Dark backgrounds - 15% usage
 * - Trigger Amber (#F9A100): Highlights, CTAs - 10% usage
 * - Alert Coral (#F15B5B): Warnings, errors - 5% usage
 * - Cloud Gray (#E6E6E6): Neutral elements - 20% usage
 *
 * DARK-FIRST DESIGN
 * -----------------
 * Dark Ops Indigo backgrounds with high-contrast white text.
 * Bot Teal serves as the primary accent throughout.
 *
 * WCAG COMPLIANT TEXT/BACKGROUND PAIRINGS
 * ---------------------------------------
 * - Ops Indigo bg (#141121) + White text (AAA)
 * - Bot Teal bg (#1EAFAF) + Dark teal text (#005655) (AA)
 * - Cloud Gray bg (#E6E6E6) + Bot Teal text (#1EAFAF) (AA)
 *
 * THEME VARIANTS
 * --------------
 * - rewst: Bot Teal signal (default, branded)
 * - dramatic: Alert Coral signal (attack demos)
 * - terminal: Green signal (live code/terminal)
 * - highlight: Bot Teal light signal (data visualization)
 * - warning: Trigger Amber signal (failure modes)
 *
 * All variants share the same Ops Indigo dark foundation.
 */

export const themes = {
  // ==========================================================================
  // REWST (Default) - Bot Teal branded
  // Primary brand experience with teal accents
  // ==========================================================================
  rewst: {
    name: 'Rewst',
    // Backgrounds - Ops Indigo for brand consistency
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-ops-indigo-600/50',
    // Text hierarchy - high contrast
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    // Text on cards (same dark context)
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    // Accent - Bot Teal for brand signal
    accent: 'bot-teal',
    accentColor: 'text-bot-teal-400',
    accentColorOnDark: 'text-bot-teal-400',
    accentBg: 'bg-bot-teal-400',
    accentBorder: 'border-bot-teal-400/60',
    // Effects
    gradient: 'from-ops-indigo-900 via-ops-indigo-800 to-ops-indigo-900',
    terminalBorder: 'border-bot-teal-400/40',
    highlightBg: 'bg-bot-teal-400/10',
    accentGlow: 'shadow-bot-teal-400/20',
  },

  // Legacy alias for existing code
  corporate: {
    name: 'Rewst',
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-ops-indigo-600/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    accent: 'bot-teal',
    accentColor: 'text-bot-teal-400',
    accentColorOnDark: 'text-bot-teal-400',
    accentBg: 'bg-bot-teal-400',
    accentBorder: 'border-bot-teal-400/60',
    gradient: 'from-ops-indigo-900 via-ops-indigo-800 to-ops-indigo-900',
    terminalBorder: 'border-bot-teal-400/40',
    highlightBg: 'bg-bot-teal-400/10',
    accentGlow: 'shadow-bot-teal-400/20',
  },

  // ==========================================================================
  // DRAMATIC - Attack demos with Alert Coral signal
  // Coral = danger, breach, compromise
  // ==========================================================================
  dramatic: {
    name: 'Dramatic',
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-alert-coral-700/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    accent: 'alert-coral',
    accentColor: 'text-alert-coral-400',
    accentColorOnDark: 'text-alert-coral-400',
    accentBg: 'bg-alert-coral-400',
    accentBorder: 'border-alert-coral-400/60',
    gradient: 'from-ops-indigo-900 via-alert-coral-900/20 to-ops-indigo-900',
    terminalBorder: 'border-alert-coral-400/40',
    highlightBg: 'bg-alert-coral-400/10',
    accentGlow: 'shadow-alert-coral-400/20',
  },

  // ==========================================================================
  // TERMINAL - Live code/demo with green signal
  // Classic terminal aesthetic
  // ==========================================================================
  terminal: {
    name: 'Terminal',
    bg: 'bg-black',
    cardBg: 'bg-ops-indigo-950/90',
    cardBorder: 'border-emerald-900/50',
    textOnPage: 'text-emerald-400',
    textOnPageMuted: 'text-emerald-600',
    textPrimary: 'text-emerald-400',
    textSecondary: 'text-emerald-300',
    textMuted: 'text-emerald-600',
    accent: 'emerald',
    accentColor: 'text-emerald-400',
    accentColorOnDark: 'text-emerald-400',
    accentBg: 'bg-emerald-600',
    accentBorder: 'border-emerald-500/60',
    gradient: 'from-black via-emerald-950/10 to-black',
    terminalBorder: 'border-emerald-500/40',
    highlightBg: 'bg-emerald-500/10',
    accentGlow: 'shadow-emerald-500/20',
  },

  // ==========================================================================
  // HIGHLIGHT - Data visualization with Bot Teal light signal
  // Teal light = data, information, analysis
  // ==========================================================================
  highlight: {
    name: 'Highlight',
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-ops-indigo-600/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    accent: 'bot-teal',
    accentColor: 'text-bot-teal-200',
    accentColorOnDark: 'text-bot-teal-200',
    accentBg: 'bg-bot-teal-400',
    accentBorder: 'border-bot-teal-200/60',
    gradient: 'from-ops-indigo-900 via-bot-teal-900/20 to-ops-indigo-900',
    terminalBorder: 'border-bot-teal-200/40',
    highlightBg: 'bg-bot-teal-200/10',
    accentGlow: 'shadow-bot-teal-200/20',
  },

  // ==========================================================================
  // WARNING - Failure modes with Trigger Amber signal
  // Amber = caution, failure, lessons learned
  // ==========================================================================
  warning: {
    name: 'Warning',
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-trigger-amber-700/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    accent: 'trigger-amber',
    accentColor: 'text-trigger-amber-400',
    accentColorOnDark: 'text-trigger-amber-400',
    accentBg: 'bg-trigger-amber-400',
    accentBorder: 'border-trigger-amber-400/60',
    gradient: 'from-ops-indigo-900 via-trigger-amber-900/20 to-ops-indigo-900',
    terminalBorder: 'border-trigger-amber-400/40',
    highlightBg: 'bg-trigger-amber-400/10',
    accentGlow: 'shadow-trigger-amber-400/20',
  },

  // ==========================================================================
  // SHERWEB - Partner branding with blue signal (kept for compatibility)
  // ==========================================================================
  sherweb: {
    name: 'Sherweb',
    bg: 'bg-ops-indigo-900',
    cardBg: 'bg-ops-indigo-800/80',
    cardBorder: 'border-ops-indigo-600/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-cloud-gray-400',
    textPrimary: 'text-white',
    textSecondary: 'text-cloud-gray-200',
    textMuted: 'text-cloud-gray-400',
    accent: 'blue',
    accentColor: 'text-blue-400',
    accentColorOnDark: 'text-blue-400',
    accentBg: 'bg-blue-500',
    accentBorder: 'border-blue-500/60',
    gradient: 'from-ops-indigo-900 via-blue-950/30 to-ops-indigo-900',
    terminalBorder: 'border-blue-500/40',
    highlightBg: 'bg-blue-500/10',
    accentGlow: 'shadow-blue-500/20',
  },
};

// Utilities
export function getTheme(themeName) {
  return themes[themeName] || themes.rewst;
}

export function getThemeNames() {
  return Object.keys(themes);
}

export default themes;
