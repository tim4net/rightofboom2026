/** @type {import('tailwindcss').Config} */

/**
 * Right of Boom 2026 - Tailwind Configuration
 *
 * Using STANDARD Tailwind colors (no custom colors that need safelisting)
 * This ensures all color classes are generated correctly.
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
