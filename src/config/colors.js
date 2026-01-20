/**
 * Centralized Color Palette for Right of Boom 2026
 *
 * Rewst Brand Guidelines (from Visual Guidelines PDF)
 * =============================================================================
 *
 * Color Usage Distribution:
 * - Bot Teal: 50% (Primary brand color)
 * - Cloud Gray: 20% (Neutral backgrounds)
 * - Ops Indigo: 15% (Dark backgrounds, contrast)
 * - Trigger Amber: 10% (Highlights, CTAs)
 * - Alert Coral: 5% (Warnings, errors)
 *
 * DRY: All colors defined once, referenced everywhere
 * ETC: Easy to change - update here, changes propagate
 */

// =============================================================================
// REWST BRAND PALETTE - From Visual Guidelines PDF (pages 6-7)
// =============================================================================

export const palette = {
  // Bot Teal (Primary - 50% usage)
  teal: {
    primary: '#1EAFAF',   // Bot Teal - main brand color
    light: '#78CFCF',     // Light teal
    lighter: '#A5DFDF',   // Very light teal
    dark: '#005655',      // Dark teal - for text on teal bg
    darkest: '#082C2C',   // Darkest teal
  },

  // Ops Indigo (Contrast/Backgrounds - 15% usage)
  indigo: {
    primary: '#504384',   // Ops Indigo - dark backgrounds
    light: '#968EB5',     // Light indigo
    lighter: '#BAB3CF',   // Very light indigo
    dark: '#282242',      // Dark indigo
    darkest: '#141121',   // Darkest indigo - page backgrounds
  },

  // Trigger Amber (Highlights - 10% usage)
  amber: {
    primary: '#F9A100',   // Trigger Amber - highlights, CTAs
    light: '#FBC766',     // Light amber
    lighter: '#FDD999',   // Very light amber
    dark: '#7D5100',      // Dark amber - text on amber bg
    darkest: '#3F2900',   // Darkest amber
  },

  // Alert Coral (Warnings - 5% usage)
  coral: {
    primary: '#F15B5B',   // Alert Coral - warnings, errors
    light: '#F79D9D',     // Light coral
    lighter: '#F9BDBD',   // Very light coral
    dark: '#792E2E',      // Dark coral
    darkest: '#3C1717',   // Darkest coral
  },

  // Cloud Gray (Neutral - 20% usage)
  gray: {
    primary: '#E6E6E6',   // Cloud Gray - neutral elements
    light: '#F5F5F5',     // Light gray
    dark: '#B3B3B3',      // Medium gray
    darker: '#666666',    // Dark gray
    darkest: '#333333',   // Darkest gray
  },

  // Pure values
  pure: {
    black: '#000000',
    white: '#FFFFFF',
  },
};

// =============================================================================
// SEMANTIC COLORS - Purpose-based naming
// =============================================================================

export const semantic = {
  // Backgrounds (using Ops Indigo for dark theme)
  bgDark: palette.indigo.darkest,      // #141121 - Darkest page background
  bgDarkAlt: palette.indigo.dark,      // #282242 - Alt dark background
  bgMuted: palette.indigo.primary,     // #504384 - Muted sections

  // Primary accent (Bot Teal family - 50% usage)
  primary: palette.teal.primary,       // #1EAFAF
  primaryLight: palette.teal.light,    // #78CFCF
  primaryDark: palette.teal.dark,      // #005655

  // Secondary accent (Trigger Amber - highlights)
  highlight: palette.amber.primary,    // #F9A100
  highlightLight: palette.amber.light, // #FBC766

  // Status colors
  success: palette.teal.primary,       // Teal for success
  warning: palette.amber.primary,      // Amber for warning
  danger: palette.coral.primary,       // Coral for danger/error
  info: palette.teal.light,            // Light teal for info

  // Neutrals
  neutral: palette.gray.primary,       // #E6E6E6
  neutralDark: palette.gray.darker,    // #666666

  // Text
  textPrimary: palette.pure.white,
  textSecondary: palette.gray.primary,
  textMuted: palette.gray.dark,
  textOnTeal: palette.teal.dark,       // Dark text on teal backgrounds
  textOnAmber: palette.amber.dark,     // Dark text on amber backgrounds
};

// =============================================================================
// TAILWIND COLOR EXTENSION
// Export for tailwind.config.js
// =============================================================================

export const tailwindColors = {
  // Bot Teal scale
  'bot-teal': {
    50: '#E6F7F7',
    100: '#A5DFDF',
    200: '#78CFCF',
    300: '#4DBFBF',
    400: '#1EAFAF',       // PRIMARY
    500: '#1A9999',
    600: '#168080',
    700: '#005655',       // DARK
    800: '#003D3D',
    900: '#082C2C',       // DARKEST
    950: '#041616',
  },
  // Ops Indigo scale
  'ops-indigo': {
    50: '#F0EEF5',
    100: '#BAB3CF',
    200: '#968EB5',
    300: '#7268A0',
    400: '#504384',       // PRIMARY
    500: '#443871',
    600: '#382D5E',
    700: '#282242',       // DARK
    800: '#1C1832',
    900: '#141121',       // DARKEST
    950: '#0A0911',
  },
  // Trigger Amber scale
  'trigger-amber': {
    50: '#FFF8E6',
    100: '#FDD999',
    200: '#FBC766',
    300: '#FAB433',
    400: '#F9A100',       // PRIMARY
    500: '#E09000',
    600: '#B87600',
    700: '#7D5100',       // DARK
    800: '#5E3D00',
    900: '#3F2900',       // DARKEST
    950: '#1F1400',
  },
  // Alert Coral scale
  'alert-coral': {
    50: '#FEF0F0',
    100: '#F9BDBD',
    200: '#F79D9D',
    300: '#F47C7C',
    400: '#F15B5B',       // PRIMARY
    500: '#D94D4D',
    600: '#B83E3E',
    700: '#792E2E',       // DARK
    800: '#5A2222',
    900: '#3C1717',       // DARKEST
    950: '#1E0B0B',
  },
  // Cloud Gray scale
  'cloud-gray': {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E6E6E6',       // PRIMARY
    300: '#D1D1D1',
    400: '#B3B3B3',
    500: '#8C8C8C',
    600: '#666666',
    700: '#4D4D4D',
    800: '#333333',
    900: '#1A1A1A',
    950: '#0D0D0D',
  },
};

// =============================================================================
// CSS VARIABLE GENERATOR
// For runtime theming
// =============================================================================

export function getCSSVariables() {
  return {
    // Backgrounds
    '--color-bg-dark': palette.indigo.darkest,
    '--color-bg-dark-alt': palette.indigo.dark,
    '--color-bg-muted': palette.indigo.primary,
    // Primary (Bot Teal)
    '--color-primary': palette.teal.primary,
    '--color-primary-light': palette.teal.light,
    '--color-primary-dark': palette.teal.dark,
    // Highlight (Trigger Amber)
    '--color-highlight': palette.amber.primary,
    '--color-highlight-light': palette.amber.light,
    // Status
    '--color-warning': palette.amber.primary,
    '--color-danger': palette.coral.primary,
    '--color-success': palette.teal.primary,
    // Neutral
    '--color-neutral': palette.gray.primary,
  };
}

export default palette;
