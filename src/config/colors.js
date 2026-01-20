/**
 * Centralized Color Palette for Right of Boom 2026
 *
 * Sources:
 * - Right of Boom logo: #001822 (dark teal/navy)
 * - Rewst Style Guide: https://styleguide.rewst.io/color/
 * - Sherweb Brand: https://brandfetch.com/sherweb.com
 *
 * DRY: All colors defined once, referenced everywhere
 * ETC: Easy to change - update here, changes propagate
 */

// =============================================================================
// BASE PALETTE - Raw color values
// =============================================================================

export const palette = {
  // ROB Brand - teal scale (lighter to darker)
  rob: {
    light: '#d4e8eb',     // rob-100: Light backgrounds
    mid: '#1a7585',       // rob-500: Mid teal
    page: '#145c6a',      // rob-600: Page background (LIGHTER)
    alt: '#0f4452',       // rob-700: Alt background
    card: '#0a2d38',      // rob-800: Card background
    dark: '#061c24',      // rob-900: Darker cards
    darkest: '#001822',   // rob-950: ROB logo primary (DARKEST)
  },

  // Rewst Brand
  rewst: {
    teal: '#009490',      // Primary teal
    tealLight: '#2BB5B6', // Light teal
    fandango: '#C64A9A',  // Magenta/pink accent
    orange: '#F9A100',    // Warning/attention
    coral: '#F75B58',     // Alert/danger
    purple: '#504384',    // Snooze purple
    brown: '#6a5445',     // Quincy brown
  },

  // Sherweb Brand
  sherweb: {
    blue: '#0061aa',      // Endeavour blue
    dark: '#1e2939',      // Mirage dark
    peach: '#fed2ca',     // Tuft Bush accent
  },

  // Neutrals (from Rewst)
  neutral: {
    black: '#000000',
    darkGray: '#333333',
    gray: '#90A4AE',
    lightGray: '#CFD8DC',
    light: '#ECEFF1',
    white: '#FFFFFF',
  },
};

// =============================================================================
// SEMANTIC COLORS - Purpose-based naming
// =============================================================================

export const semantic = {
  // Backgrounds
  bgDark: palette.rob.dark,
  bgDarkAlt: palette.rob.navy,
  bgMuted: palette.sherweb.dark,

  // Primary accent (teal family)
  primary: palette.rewst.teal,
  primaryLight: palette.rewst.tealLight,

  // Secondary accent (blue family)
  secondary: palette.sherweb.blue,

  // Status colors
  success: palette.rewst.teal,
  warning: palette.rewst.orange,
  danger: palette.rewst.coral,
  info: palette.sherweb.blue,

  // Special accents
  highlight: palette.rewst.fandango,
  accent: palette.rewst.purple,

  // Text
  textPrimary: palette.neutral.white,
  textSecondary: palette.neutral.lightGray,
  textMuted: palette.neutral.gray,
  textDark: palette.neutral.darkGray,
};

// =============================================================================
// TAILWIND COLOR EXTENSION
// Export for tailwind.config.js
// =============================================================================

export const tailwindColors = {
  rob: {
    50: '#e6f0f2',
    100: '#b3d1d8',
    200: '#80b3be',
    300: '#4d94a4',
    400: '#26768a',
    500: '#0a5770',
    600: '#084456',
    700: '#06313d',
    800: '#041f27',
    900: palette.rob.dark,    // #001822
    950: '#000d11',
  },
  rewst: {
    teal: palette.rewst.teal,
    'teal-light': palette.rewst.tealLight,
    fandango: palette.rewst.fandango,
    orange: palette.rewst.orange,
    coral: palette.rewst.coral,
    purple: palette.rewst.purple,
  },
  sherweb: {
    blue: palette.sherweb.blue,
    dark: palette.sherweb.dark,
    peach: palette.sherweb.peach,
  },
};

// =============================================================================
// CSS VARIABLE GENERATOR
// For runtime theming
// =============================================================================

export function getCSSVariables() {
  return {
    '--color-bg-dark': palette.rob.dark,
    '--color-bg-dark-alt': palette.rob.navy,
    '--color-bg-muted': palette.sherweb.dark,
    '--color-primary': palette.rewst.teal,
    '--color-primary-light': palette.rewst.tealLight,
    '--color-secondary': palette.sherweb.blue,
    '--color-warning': palette.rewst.orange,
    '--color-danger': palette.rewst.coral,
    '--color-highlight': palette.rewst.fandango,
    '--color-accent': palette.rewst.purple,
  };
}

export default palette;
