/** @type {import('tailwindcss').Config} */

/**
 * Right of Boom 2026 - Tailwind Configuration
 *
 * Rewst Brand Colors (from Visual Guidelines PDF):
 * - Bot Teal (#1EAFAF): Primary - 50% usage
 * - Ops Indigo (#504384): Backgrounds - 15% usage
 * - Trigger Amber (#F9A100): Highlights - 10% usage
 * - Alert Coral (#F15B5B): Warnings - 5% usage
 * - Cloud Gray (#E6E6E6): Neutrals - 20% usage
 *
 * Typography:
 * - Goldplay: Titles, Buttons, Links
 * - Montserrat: Body text (Google Fonts)
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // =======================================================================
      // FONT FAMILIES - Rewst Brand
      // =======================================================================
      fontFamily: {
        // Goldplay for titles, buttons, links
        display: ["'Goldplay'", "'Montserrat'", 'system-ui', 'sans-serif'],
        // Montserrat for body text
        sans: ["'Montserrat'", 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        // Monospace for code/terminal
        mono: ["'JetBrains Mono'", "'Fira Code'", 'monospace'],
      },

      // =======================================================================
      // COLORS - Rewst Brand Palette
      // =======================================================================
      colors: {
        // Bot Teal (Primary - 50% usage)
        'bot-teal': {
          50: '#E6F7F7',
          100: '#A5DFDF',
          200: '#78CFCF',
          300: '#4DBFBF',
          400: '#1EAFAF',  // PRIMARY
          500: '#1A9999',
          600: '#168080',
          700: '#005655',  // DARK (for text on teal bg)
          800: '#003D3D',
          900: '#082C2C',  // DARKEST
          950: '#041616',
        },

        // Ops Indigo (Backgrounds - 15% usage)
        'ops-indigo': {
          50: '#F0EEF5',
          100: '#BAB3CF',
          200: '#968EB5',
          300: '#7268A0',
          400: '#504384',  // PRIMARY
          500: '#443871',
          600: '#382D5E',
          700: '#282242',  // DARK
          800: '#1C1832',
          900: '#141121',  // DARKEST (page bg)
          950: '#0A0911',
        },

        // Trigger Amber (Highlights - 10% usage)
        'trigger-amber': {
          50: '#FFF8E6',
          100: '#FDD999',
          200: '#FBC766',
          300: '#FAB433',
          400: '#F9A100',  // PRIMARY
          500: '#E09000',
          600: '#B87600',
          700: '#7D5100',  // DARK (for text on amber bg)
          800: '#5E3D00',
          900: '#3F2900',  // DARKEST
          950: '#1F1400',
        },

        // Alert Coral (Warnings - 5% usage)
        'alert-coral': {
          50: '#FEF0F0',
          100: '#F9BDBD',
          200: '#F79D9D',
          300: '#F47C7C',
          400: '#F15B5B',  // PRIMARY
          500: '#D94D4D',
          600: '#B83E3E',
          700: '#792E2E',  // DARK
          800: '#5A2222',
          900: '#3C1717',  // DARKEST
          950: '#1E0B0B',
        },

        // Cloud Gray (Neutrals - 20% usage)
        'cloud-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E6E6E6',  // PRIMARY
          300: '#D1D1D1',
          400: '#B3B3B3',
          500: '#8C8C8C',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
          950: '#0D0D0D',
        },
      },

      // =======================================================================
      // FONT SIZES - Presentation optimized
      // =======================================================================
      fontSize: {
        'slide-h1': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1' }],
        'slide-h2': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.2' }],
        'slide-h3': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.3' }],
        'slide-body': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.6' }],
      },

      // =======================================================================
      // BORDER RADIUS - Rewst Design Rules
      // =======================================================================
      borderRadius: {
        // Buttons: Pill-shaped (use rounded-full)
        // Cards: 12.5% radius approximation
        'brand': '12.5%',
      },
    },
  },
  plugins: [],
};
