/**
 * Typography Configuration for Right of Boom 2026 Presentation
 *
 * Rewst Brand Typography (from Visual Guidelines PDF, pages 8-9)
 * =============================================================================
 *
 * GOLDPLAY BOLD
 * - Use: Titles, Buttons, Links
 * - Weights: Medium (500), SemiBold (600), Bold (700), Black (900)
 *
 * MONTSERRAT (Google Fonts)
 * - Use: Body text, paragraphs, subtitles
 * - Weights: Light (300), Regular (400), Medium (500), Bold (700), Black (900)
 * - URL: https://fonts.google.com/specimen/Montserrat
 *
 * DESIGN RULES
 * - Buttons: Pill-shaped with maximum border radius
 * - Rounded corners: 12.5% radius relative to object height
 */

// =============================================================================
// FONT FAMILIES
// =============================================================================

export const FONTS = {
  // Goldplay - Rewst brand title font
  display: "'Goldplay', 'Montserrat', system-ui, sans-serif",

  // Montserrat - Rewst brand body font
  sans: "'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",

  // Monospace for terminal/code (kept for code blocks)
  mono: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",

  // Terminal-specific font stack
  terminal: "'Menlo', 'Monaco', 'Courier New', monospace",
};

// Tailwind-compatible font family classes
export const FONT_CLASSES = {
  display: 'font-display',  // Goldplay for titles
  sans: 'font-sans',        // Montserrat for body
  mono: 'font-mono',        // Monospace for code
  terminal: 'font-mono',    // Terminal text
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
  title: 'tracking-normal',     // 0em - Goldplay titles
};

// =============================================================================
// FONT WEIGHTS
// =============================================================================

export const WEIGHTS = {
  light: 'font-light',        // 300 - Montserrat Light
  normal: 'font-normal',      // 400 - Montserrat Regular
  medium: 'font-medium',      // 500 - Montserrat/Goldplay Medium
  semibold: 'font-semibold',  // 600 - Goldplay SemiBold
  bold: 'font-bold',          // 700 - Goldplay Bold / Montserrat Bold
  extrabold: 'font-extrabold', // 800
  black: 'font-black',        // 900 - Goldplay Black / Montserrat Black
};

// =============================================================================
// TEXT STYLES - Pre-composed combinations (Rewst Brand)
// =============================================================================

export const TEXT_STYLES = {
  // Headings - Goldplay Bold
  heading1: 'font-display font-black text-[clamp(3rem,8vw,7rem)] leading-tight tracking-normal',
  heading2: 'font-display font-bold text-[clamp(2rem,5vw,4rem)] leading-snug tracking-normal',
  heading3: 'font-display font-bold text-[clamp(1.5rem,3vw,2.5rem)] leading-normal tracking-normal',

  // Subtitles - Montserrat Black
  subtitle: 'font-sans font-black text-xl leading-relaxed tracking-wide uppercase',

  // Body - Montserrat
  body: 'font-sans text-[clamp(1.25rem,2vw,1.75rem)] leading-relaxed',
  bodyLight: 'font-sans font-light text-[clamp(1.25rem,2vw,1.75rem)] leading-relaxed',
  bodyLarge: 'font-sans text-xl leading-relaxed',

  // Terminal/Code - Monospace (unchanged)
  terminalOutput: 'font-mono text-xs leading-relaxed',
  codeInline: 'font-mono text-sm',

  // UI Elements
  label: 'font-sans text-sm font-medium text-cloud-gray-400',
  badge: 'font-display text-xs font-bold uppercase',
  stat: 'font-display text-3xl font-black',
  statLabel: 'font-sans text-sm text-cloud-gray-400',

  // Buttons - Goldplay Bold, pill-shaped
  button: 'font-display font-bold rounded-full px-6 py-2',
  buttonLarge: 'font-display font-bold rounded-full px-8 py-3 text-lg',

  // Links - Goldplay Bold
  link: 'font-display font-bold text-bot-teal-400 hover:text-bot-teal-300 underline underline-offset-2',
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
  avatarSize: 'w-14 h-14',
  avatarTextSize: 'text-2xl',

  // Role label
  labelSize: 'text-base',
  labelFont: 'font-display font-bold',

  // Message content
  contentSize: 'text-xl',
  contentLineHeight: 'leading-relaxed',
  contentFont: 'font-sans',

  // Code blocks inside messages
  codeSize: 'text-base',
  codeFont: 'font-mono',
};

// =============================================================================
// DESIGN RULES (from Rewst Visual Guidelines)
// =============================================================================

export const DESIGN_RULES = {
  // Buttons: Pill-shaped with maximum border radius
  buttonRadius: 'rounded-full',

  // Rounded corners: 12.5% radius relative to object height
  // For most cards, use rounded-xl or rounded-2xl as approximation
  cardRadius: 'rounded-xl',

  // Large cards/modals
  modalRadius: 'rounded-2xl',
};

// =============================================================================
// TAILWIND EXTEND CONFIG (for tailwind.config.js)
// =============================================================================

export const tailwindExtend = {
  fontFamily: {
    display: FONTS.display.split(', '),
    sans: FONTS.sans.split(', '),
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
  DESIGN_RULES,
  tailwindExtend,
};
