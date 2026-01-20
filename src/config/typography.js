/**
 * Typography Configuration for Right of Boom 2026 Presentation
 * Centralizes font definitions for consistency across components
 */

// =============================================================================
// FONT FAMILIES
// =============================================================================

export const FONTS = {
  // Primary monospace stack (used for headings and terminal aesthetic)
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

  // Terminal-specific font stack (for actual terminal components)
  terminal: "'Menlo', 'Monaco', 'Courier New', monospace",

  // System sans-serif fallback
  sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

// Tailwind-compatible font family classes
export const FONT_CLASSES = {
  mono: 'font-mono',
  terminal: 'font-mono', // Uses same Tailwind class, but can be extended
  sans: 'font-sans',
};

// =============================================================================
// FONT SIZES - Presentation optimized (readable from distance)
// =============================================================================

export const SIZES = {
  // Headings - use clamp for responsive scaling
  h1: 'text-[clamp(3rem,8vw,7rem)]',
  h2: 'text-[clamp(2rem,5vw,4rem)]',
  h3: 'text-[clamp(1.5rem,3vw,2.5rem)]',

  // Body text
  body: 'text-[clamp(1.25rem,2vw,1.75rem)]',
  bodyLg: 'text-xl',
  bodySm: 'text-base',

  // Terminal/code text
  terminal: 'text-xs',
  terminalLg: 'text-sm',
  code: 'text-sm',

  // UI elements
  badge: 'text-xs',
  label: 'text-sm',
  caption: 'text-xs',

  // Stats/metrics
  stat: 'text-3xl',
  statLg: 'text-5xl',
  statXl: 'text-7xl',
};

// =============================================================================
// LINE HEIGHTS
// =============================================================================

export const LINE_HEIGHTS = {
  tight: 'leading-tight',      // 1.25
  snug: 'leading-snug',        // 1.375
  normal: 'leading-normal',    // 1.5
  relaxed: 'leading-relaxed',  // 1.625
  loose: 'leading-loose',      // 2
};

// =============================================================================
// LETTER SPACING
// =============================================================================

export const LETTER_SPACING = {
  standard: 'tracking-wide',    // 0.025em - standard for body
  heading: 'tracking-wider',    // 0.05em - for terminal theme headings
  terminal: 'tracking-tight',   // -0.025em - tighter for code
};

// =============================================================================
// FONT WEIGHTS
// =============================================================================

export const WEIGHTS = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
  black: 'font-black',
};

// =============================================================================
// TEXT STYLES - Pre-composed combinations
// =============================================================================

export const TEXT_STYLES = {
  // Headings
  heading1: 'font-mono font-black text-[clamp(3rem,8vw,7rem)] leading-tight tracking-wide',
  heading2: 'font-mono font-bold text-[clamp(2rem,5vw,4rem)] leading-snug tracking-wide',
  heading3: 'font-mono font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-normal tracking-wide',

  // Body
  body: 'text-[clamp(1.25rem,2vw,1.75rem)] leading-relaxed',
  bodyLarge: 'text-xl leading-relaxed',

  // Terminal/Code
  terminalOutput: 'font-mono text-xs leading-relaxed',
  codeInline: 'font-mono text-sm',

  // UI
  label: 'text-sm font-medium text-slate-400',
  badge: 'text-xs font-bold uppercase',
  stat: 'text-3xl font-black',
  statLabel: 'text-sm text-slate-400',

  // Links
  link: 'text-blue-400 hover:text-blue-300 underline underline-offset-2',
};

// =============================================================================
// TERMINAL-SPECIFIC CONFIG (for xterm.js / ClaudeTerminal)
// =============================================================================

export const TERMINAL_CONFIG = {
  fontSize: 20,  // Presentation-sized for visibility from back of room
  fontFamily: FONTS.terminal,
  letterSpacing: 0,
  lineHeight: 1.4,
};

// =============================================================================
// CHAT CONFIG (for ChatMessage component)
// =============================================================================

export const CHAT_CONFIG = {
  // Avatar
  avatarSize: 'w-14 h-14',      // Tailwind width/height classes
  avatarTextSize: 'text-2xl',   // Emoji/icon size

  // Role label (ATTACKER / AI ASSISTANT)
  labelSize: 'text-base',

  // Message content
  contentSize: 'text-xl',
  contentLineHeight: 'leading-relaxed',

  // Code blocks inside messages
  codeSize: 'text-base',
};

// =============================================================================
// TAILWIND EXTEND CONFIG (for tailwind.config.js)
// =============================================================================

export const tailwindExtend = {
  fontFamily: {
    mono: FONTS.mono.split(', '),
    terminal: FONTS.terminal.split(', '),
  },
  fontSize: {
    'slide-h1': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1' }],
    'slide-h2': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.2' }],
    'slide-h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
    'slide-body': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.6' }],
  },
};

// Default export
export default {
  FONTS,
  FONT_CLASSES,
  SIZES,
  LINE_HEIGHTS,
  LETTER_SPACING,
  WEIGHTS,
  TEXT_STYLES,
  TERMINAL_CONFIG,
  CHAT_CONFIG,
  tailwindExtend,
};
