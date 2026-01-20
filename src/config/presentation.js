/**
 * Presentation Configuration for Right of Boom 2026
 * Slide-level settings, timing, animations, and demo configuration
 */

// =============================================================================
// TIMING CONFIGURATION
// =============================================================================

export const TIMING = {
  // WebSocket/connection settings
  reconnectDelay: 2000,        // ms - delay before reconnecting
  apiTimeout: 5000,            // ms - timeout for API calls before fallback

  // Animation durations
  transitionFast: 100,         // ms - quick UI transitions
  transitionNormal: 300,       // ms - standard transitions
  transitionSlow: 500,         // ms - fade-ins, slide transitions

  // Demo timing
  demoScanStepDelay: 1500,     // ms - delay between scan steps in demos
  terminalTypeDelay: 50,       // ms - typing effect speed
  progressAnimationMs: 300,    // ms - progress bar animation

  // Presentation
  breakDuration: 15,           // minutes - break slide duration
  slideAutoAdvance: 0,         // ms - 0 = manual advance only
};

// =============================================================================
// TERMINAL CONFIGURATION
// =============================================================================

export const TERMINAL = {
  // xterm.js settings
  fontSize: 14,
  scrollback: 5000,
  cursorBlink: true,

  // Display
  minHeight: 400,              // px - minimum terminal height
  padding: 8,                  // px - internal padding

  // Heights (Tailwind classes)
  heights: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-80',
    full: 'h-full',
  },
};

// =============================================================================
// DEMO CONFIGURATION
// =============================================================================

export const DEMO = {
  // Fallback behavior
  useFallbackOnTimeout: true,
  fallbackTimeoutMs: 5000,

  // API endpoints
  endpoints: {
    health: '/api/health',
    dns: '/api/dns',
    subdomains: '/api/subdomains',
    shodan: '/api/shodan',
    breaches: '/api/breaches',
    attackPlan: '/api/attack-plan',
  },

  // Scan step icons (for progress indicators)
  scanStepIcons: {
    dns: '🌐',
    subdomain: '🔍',
    service: '🖥️',
    breach: '🔓',
    ai: '🧠',
  },

  // MITRE ATT&CK phase colors
  mitreColors: {
    'Initial Access': 'text-red-400',
    'Execution': 'text-orange-400',
    'Persistence': 'text-yellow-400',
    'Privilege Escalation': 'text-amber-400',
    'Defense Evasion': 'text-lime-400',
    'Credential Access': 'text-green-400',
    'Discovery': 'text-teal-400',
    'Lateral Movement': 'text-cyan-400',
    'Collection': 'text-blue-400',
    'Exfiltration': 'text-indigo-400',
    'Impact': 'text-purple-400',
  },
};

// =============================================================================
// GRID CONFIGURATION
// =============================================================================

export const GRID = {
  // Common grid layouts
  cols2: 'grid-cols-2',
  cols3: 'grid-cols-3',
  cols4: 'grid-cols-4',
  cols5: 'grid-cols-5',

  // Responsive variants
  responsive2: 'grid-cols-1 md:grid-cols-2',
  responsive3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  responsive4: 'grid-cols-2 md:grid-cols-4',

  // Gap sizes
  gapSm: 'gap-3',
  gapMd: 'gap-4',
  gapLg: 'gap-6',
};

// =============================================================================
// SCANLINE / VISUAL EFFECTS
// =============================================================================

export const EFFECTS = {
  // Scanline settings (CSS values)
  scanline: {
    opacity: 0.2,
    height: 6,                 // px - scanline stripe height
    spacing: 3,                // px - gap between stripes
  },

  // Noise overlay
  noise: {
    opacity: 0.02,
  },

  // Glow intensity
  glow: {
    blur: 20,                  // px - inner glow
    spread: 40,                // px - outer glow
  },
};

// =============================================================================
// KEYBOARD SHORTCUTS
// =============================================================================

export const SHORTCUTS = {
  nextSlide: ['ArrowRight', 'Space', 'Enter'],
  prevSlide: ['ArrowLeft', 'Backspace'],
  toggleNotes: ['n', 'N'],
  toggleTheme: ['t', 'T'],
  toggleDemo: ['d', 'D'],
  toggleVideo: ['v', 'V'],
  resetDemo: ['r', 'R'],
  escape: ['Escape'],
};

// =============================================================================
// Z-INDEX LAYERS
// =============================================================================

export const Z_INDEX = {
  background: 0,
  content: 10,
  terminal: 20,
  overlay: 30,
  modal: 40,
  tooltip: 50,
  notification: 60,
};

// =============================================================================
// BREAKPOINTS (match Tailwind defaults)
// =============================================================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// =============================================================================
// EXPORT ALL
// =============================================================================

export default {
  TIMING,
  TERMINAL,
  DEMO,
  GRID,
  EFFECTS,
  SHORTCUTS,
  Z_INDEX,
  BREAKPOINTS,
};
