# Right of Boom 2026

Interactive security conference presentation for the "Think Like an Attacker" CPE masterclass. Built with React, Vite, and xterm.js.

**[Download PDF](https://github.com/tim4net/rightofboom2026/releases/latest/download/presentation.pdf)** - Static version for viewing without running the app

## Quick Start

### Windows (PowerShell)

```powershell
# Install Node.js if needed
winget install OpenJS.NodeJS.LTS

# Then run
npm install
npm run dev:full
```

### macOS / Linux

```bash
npm install
npm run dev:full
```

Open http://localhost:2026

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


## Lab VM Setup (for Attack Path Validator Demo)

The presentation includes an **AI Attack Path Validator** demo (slide 22) that requires a Windows VM with intentional security gaps.

**Quick setup** (run in elevated PowerShell on your VM):

```powershell
iex (irm https://github.com/tim4net/rightofboom2026/releases/latest/download/setup-lab-vm.ps1)
```

This installs:
- Intentional security gaps (disabled ASR, exclusions, shared admin)
- Atomic Red Team for safe attack simulation
- Endpoint collector script for the demo

**[Full setup documentation →](docs/lab-vm-setup.md)**

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
