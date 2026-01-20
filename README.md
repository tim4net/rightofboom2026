# Right of Boom 2026

Interactive security conference presentation for the "Think Like an Attacker" CPE masterclass. Built with React, Vite, and xterm.js.

## Quick Start

### Windows (PowerShell)

```powershell
# Install Node.js if needed
winget install OpenJS.NodeJS.LTS

# Then run
npm install
npm run dev
```

### macOS / Linux

```bash
npm install
npm run dev
```

Open http://localhost:2026

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (frontend only) |
| `npm run dev:full` | Start both frontend and backend server |
| `npm run server` | Start backend server only (port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `Space` `Enter` | Next slide |
| `←` `Backspace` | Previous slide |
| `N` | Toggle presenter notes |
| `T` | Cycle themes (corporate/terminal/dramatic/bayou) |
| `D` | Toggle demo mode (use cached data) |
| `V` | Toggle video fallback mode |
| `R` | Reset current demo |
| `Esc` | Close overlays |

## Project Structure

```
src/
├── components/
│   ├── slides/          # Individual slide components
│   ├── layout/          # Header, Footer, PresenterNotes
│   ├── ui/              # Reusable UI components (Card, StatusBadge, etc.)
│   └── ClaudeTerminal.jsx
├── config/
│   ├── tokens.js        # Design tokens (colors, spacing, components)
│   ├── typography.js    # Font configuration
│   ├── themes.js        # Theme definitions
│   └── presentation.js  # Timing, shortcuts, terminal settings
├── data/
│   └── slides.jsx       # Slide content and ordering
├── DemoComponents.jsx   # Interactive demo components
└── PresentationApp.jsx  # Main app orchestrator

server/
├── index.js             # Express + WebSocket server
├── defender-ai.js       # AI triage module
└── demo-data.js         # Cached demo data for fallbacks
```

## Configuration

### Adding/Editing Slides

Edit `src/data/slides.jsx`:

```jsx
{
  type: 'content',        // Slide type
  title: 'Your Title',
  bullets: ['Point 1', 'Point 2'],
  notes: 'Presenter notes here'
}
```

### Customizing Themes

Edit `src/config/themes.js` to modify the 4 built-in themes or add new ones.

### Adjusting Timing

Edit `src/config/presentation.js` to change:
- Animation durations
- Demo step delays
- Terminal settings
- Fallback timeouts

## Features

- **Live Terminal**: Full xterm.js terminal with WebSocket connection
- **AI Integration**: Claude API for live AI demos (with Ollama fallback)
- **Demo Mode**: Pre-cached data for reliable conference presentations
- **4 Themes**: Corporate (blue), Terminal (green), Dramatic (red), Bayou (teal)
- **Presenter Notes**: Toggle with `N` key
- **Responsive**: Works on projectors and laptops

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- xterm.js (terminal emulation)
- Express + WebSocket (backend)
- Anthropic SDK / Ollama (AI)
