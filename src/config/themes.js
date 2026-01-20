/**
 * Theme Configuration - Right of Boom 2026
 *
 * =============================================================================
 * DESIGN PHILOSOPHY: "Cyber Authority"
 * =============================================================================
 *
 * This is a cybersecurity conference presentation about AI-enabled attacks.
 * The aesthetic must convey: authority, technical credibility, and controlled urgency.
 *
 * DARK-FIRST DESIGN
 * -----------------
 * Professional security presentations (CrowdStrike, Mandiant, Palo Alto keynotes)
 * all use dark backgrounds. Why:
 * - Matches the terminal/code aesthetic security professionals live in
 * - Reduces eye strain in dimmed conference rooms
 * - Projects authority and seriousness
 * - Makes accent colors pop
 *
 * COLOR HIERARCHY
 * ---------------
 * 1. Page Background: Deep slate (slate-950) - the "canvas"
 * 2. Cards: Slightly elevated (slate-900 with subtle border) - content containers
 * 3. Primary Text: White/slate-100 - maximum readability
 * 4. Secondary Text: slate-400 - supporting information
 * 5. Accent: Amber/orange - the "signal" color (warnings, highlights, CTAs)
 *    - Amber reads as "alert" in security contexts (vs. teal = "tech startup")
 *    - High contrast against dark backgrounds
 *    - Supports the threat narrative without being cartoonish
 *
 * CONTRAST RATIOS (WCAG AA = 4.5:1, AAA = 7:1)
 * - White on slate-950: 17.4:1 (AAA)
 * - slate-100 on slate-950: 15.1:1 (AAA)
 * - slate-400 on slate-950: 5.9:1 (AA)
 * - amber-500 on slate-950: 8.2:1 (AAA)
 *
 * THEME VARIANTS
 * --------------
 * - corporate: Amber signal (default, professional)
 * - sherweb: Blue signal (partner branding)
 * - dramatic: Red signal (attack demos)
 * - terminal: Green signal (live code/terminal)
 * - highlight: Cyan signal (data visualization)
 * - warning: Orange signal (failure modes)
 *
 * All variants share the same dark foundation for consistency.
 */

export const themes = {
  // ==========================================================================
  // CORPORATE (Default) - "Cyber Authority"
  // Amber signal: Connotes alerting, security warnings, professional urgency
  // ==========================================================================
  corporate: {
    name: 'Corporate',
    // Backgrounds - deep dark for authority
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-700/50',
    // Text hierarchy - high contrast
    textOnPage: 'text-white',
    textOnPageMuted: 'text-slate-400',
    // Text on cards (same dark context)
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    // Accent - amber for security "signal"
    accent: 'amber',
    accentColor: 'text-amber-400',
    accentColorOnDark: 'text-amber-400',
    accentBg: 'bg-amber-500',
    accentBorder: 'border-amber-500/60',
    // Effects
    gradient: 'from-slate-950 via-slate-900 to-slate-950',
    terminalBorder: 'border-amber-500/40',
    highlightBg: 'bg-amber-500/10',
    accentGlow: 'shadow-amber-500/20',
  },

  // ==========================================================================
  // SHERWEB - Partner branding with blue signal
  // ==========================================================================
  sherweb: {
    name: 'Sherweb',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-700/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-slate-400',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: 'blue',
    accentColor: 'text-blue-400',
    accentColorOnDark: 'text-blue-400',
    accentBg: 'bg-blue-500',
    accentBorder: 'border-blue-500/60',
    gradient: 'from-slate-950 via-blue-950/30 to-slate-950',
    terminalBorder: 'border-blue-500/40',
    highlightBg: 'bg-blue-500/10',
    accentGlow: 'shadow-blue-500/20',
  },

  // ==========================================================================
  // DRAMATIC - Attack demos with red signal
  // Red = danger, breach, compromise
  // ==========================================================================
  dramatic: {
    name: 'Dramatic',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-red-900/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-slate-400',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: 'red',
    accentColor: 'text-red-400',
    accentColorOnDark: 'text-red-400',
    accentBg: 'bg-red-600',
    accentBorder: 'border-red-500/60',
    gradient: 'from-slate-950 via-red-950/20 to-slate-950',
    terminalBorder: 'border-red-500/40',
    highlightBg: 'bg-red-500/10',
    accentGlow: 'shadow-red-500/20',
  },

  // ==========================================================================
  // TERMINAL - Live code/demo with green signal
  // Classic terminal aesthetic
  // ==========================================================================
  terminal: {
    name: 'Terminal',
    bg: 'bg-black',
    cardBg: 'bg-slate-950/90',
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
  // HIGHLIGHT - Data visualization with cyan signal
  // Cyan = data, information, analysis
  // ==========================================================================
  highlight: {
    name: 'Highlight',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-slate-700/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-slate-400',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: 'cyan',
    accentColor: 'text-cyan-400',
    accentColorOnDark: 'text-cyan-400',
    accentBg: 'bg-cyan-500',
    accentBorder: 'border-cyan-500/60',
    gradient: 'from-slate-950 via-cyan-950/20 to-slate-950',
    terminalBorder: 'border-cyan-500/40',
    highlightBg: 'bg-cyan-500/10',
    accentGlow: 'shadow-cyan-500/20',
  },

  // ==========================================================================
  // WARNING - Failure modes with orange signal
  // Orange = caution, failure, lessons learned
  // ==========================================================================
  warning: {
    name: 'Warning',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/80',
    cardBorder: 'border-orange-900/50',
    textOnPage: 'text-white',
    textOnPageMuted: 'text-slate-400',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    accent: 'orange',
    accentColor: 'text-orange-400',
    accentColorOnDark: 'text-orange-400',
    accentBg: 'bg-orange-500',
    accentBorder: 'border-orange-500/60',
    gradient: 'from-slate-950 via-orange-950/20 to-slate-950',
    terminalBorder: 'border-orange-500/40',
    highlightBg: 'bg-orange-500/10',
    accentGlow: 'shadow-orange-500/20',
  },
};

// Utilities
export function getTheme(themeName) {
  return themes[themeName] || themes.corporate;
}

export function getThemeNames() {
  return Object.keys(themes);
}

export default themes;
