# Claude Code Instructions

This file provides context for Claude Code (and other AI agents) working in this repository.

**⚠️ CRITICAL:** See **AGENTS.md** for:
- Slide content architecture requirements (hardcoded in components, NOT in data file)
- Presentation design rules (minimum font sizes, color contrast, spacing)
- Session completion checklist ("Landing the Plane")

## Issue Tracking with Beads

This project uses **beads** (`bd`) for issue tracking. Beads is an AI-native issue tracker that stores issues directly in the repository.

### Check if Beads is Installed

```bash
bd --version
```

### Install Beads (if needed)

```bash
curl -sSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash
```

### Get Started

```bash
bd onboard            # Orientation for this repo's issues
bd ready              # See open issues ready for work
bd list               # List all issues
```

### Working with Issues

```bash
bd show <id>          # View issue details
bd create "title"     # Create new issue
bd update <id> --status in_progress  # Start working on issue
bd close <id>         # Mark issue complete
bd sync               # Sync issues with git remote
```

### When to Create Issues

- Discovered bugs or edge cases
- Follow-up work identified during implementation
- Technical debt to address later
- Features deferred from current scope

## Project Overview

This is a React presentation application for "Right of Boom 2026" conference. Key structure:

- `src/data/slides.jsx` - Minimal metadata only: slide types and order (sequential array)
- `src/components/slides/001-019-*.jsx` - 19 numbered slide components with all hardcoded content
- `src/PresentationApp.jsx` - Main presentation component
- `src/components/` - Reusable UI components
- `src/config/` - Theme and presentation settings

**IMPORTANT:** See **AGENTS.md** for the critical architectural rule about slide content.

## Session Completion

Before ending a session, always:

1. Create issues for any remaining work: `bd create "description"`
2. Sync and push: `bd sync && git push`
3. Verify: `git status` should show "up to date with origin"
