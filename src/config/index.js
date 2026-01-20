/**
 * Configuration Barrel Export
 * Import all config from a single location:
 *
 * import { TOKENS, themes, FONTS, TIMING } from '@/config'
 * // or
 * import config from '@/config'
 */

// Design tokens
export { COLORS, TOKENS, ANIMATIONS, SPACING, tw, getSeverityStyle, getStatusBadge } from './tokens';

// Themes
export { themes, getTheme, getThemeNames, getThemeClass, getThemedCard, getThemedTerminalBorder } from './themes';

// Typography
export {
  FONTS,
  FONT_CLASSES,
  SIZES,
  LINE_HEIGHTS,
  LETTER_SPACING,
  WEIGHTS,
  TEXT_STYLES,
  TERMINAL_CONFIG,
  tailwindExtend,
} from './typography';

// Presentation config
export { TIMING, TERMINAL, DEMO, GRID, EFFECTS, SHORTCUTS, Z_INDEX, BREAKPOINTS } from './presentation';

// Default export with all configs
import tokens from './tokens';
import themes from './themes';
import typography from './typography';
import presentation from './presentation';

export default {
  ...tokens,
  themes,
  ...typography,
  ...presentation,
};
