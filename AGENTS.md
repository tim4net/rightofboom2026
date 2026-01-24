# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Dev Server

The dev server runs on **port 2026** (not the default 5173):
```bash
npm run dev  # Serves at http://localhost:2026
```

## CRITICAL: Slide Content Architecture

**ALL text content (titles, subtitles, presenter info, bullet points, data) MUST be hardcoded in individual slide component files, NOT referenced from `src/data/slides.jsx`.**

### The Rule

- ✅ **DO:** Hardcode all content inside slide components (`src/components/slides/001-TitleSlide.jsx`, etc.)
- ✅ **DO:** Pass content as component-internal constants/state
- ❌ **DON'T:** Pull content from `slide` props passed from data file
- ❌ **DON'T:** Store content in `src/data/slides.jsx` beyond metadata

### Current Architecture (ENFORCED)

```
src/data/slides.jsx → ONLY contains: { type: 'title' }
                     NO titles, subtitles, presenters, bullets, notes

src/components/slides/001-TitleSlide.jsx → CONTAINS: All content hardcoded
                                           const title = "Think Like an Attacker"
                                           const presenters = [...]
                                           return JSX using local constants
```

### Why This Matters

1. **Single responsibility** - Each slide file is self-contained and maintainable
2. **No cross-file references** - Easier to understand, modify, and reason about slide content
3. **Component independence** - Slides don't depend on data file structure
4. **Easier editing** - Content changes go in ONE file, not hunt across multiple places

### Example: Correct Slide Component

```jsx
// ✅ CORRECT: All content hardcoded in component
const MySlide = ({ theme: t }) => {
  const title = "My Slide Title";
  const subtitle = "My subtitle";
  const points = ["Point 1", "Point 2", "Point 3"];

  return (
    <div className={`${t.bg}`}>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {points.map(p => <li>{p}</li>)}
    </div>
  );
};
```

```jsx
// ❌ WRONG: Pulling content from slide props
const MySlide = ({ slide, theme: t }) => {
  return (
    <div>
      <h1>{slide.title}</h1>      // ← DON'T DO THIS
      <p>{slide.subtitle}</p>      // ← DON'T DO THIS
      {slide.points.map(...)}      // ← DON'T DO THIS
    </div>
  );
};
```

## CRITICAL: Presentation Design Rules

**This is a PRESENTATION, not a whitepaper.** Content must be readable from 30+ feet away on a projector.

### PROJECTION-SCALE Font Sizes (ENFORCED)

**This is a 30+ foot conference room.** Design for the back row, not your laptop.

| Element | Minimum | Tailwind Class | Notes |
|---------|---------|----------------|-------|
| **Body text** | 24px | `text-2xl` | Default for all content |
| **Labels/captions** | 20px | `text-xl` | Smallest allowed for any visible text |
| **Subtitles** | 30px | `text-3xl` | Secondary headings |
| **Headings** | 48px+ | `text-5xl`+ | Use text-5xl to text-8xl |
| **Hero numbers/stats** | 60px+ | `text-6xl`+ | Big impact numbers |
| **Code/mono** | 20px | `text-xl` | Terminal output, code snippets |

### BANNED Classes

**NEVER use these classes in slide or demo components:**
- `text-xs` (12px) - INVISIBLE from 30ft
- `text-sm` (14px) - INVISIBLE from 30ft
- `text-base` (16px) - TOO SMALL for projection
- `text-lg` (18px) - TOO SMALL for projection body text (ok for citations only)

### BANNED Writing Patterns

**These patterns scream "AI wrote this" and irritate humans. NEVER use them:**

- **Bullet-point marketing triplets:** `X • Y • Z` with parallel adjective-noun structure
  - ❌ `95 checks • 22+ techniques • Fully automated`
  - ❌ `Fast deployment • Easy setup • Instant results`
  - ✅ `We wrote 95 checks. They run unattended.`
  - ✅ Just say what it does in plain sentences.

- **Formulaic parallel lists:** Three items with identical grammatical structure
  - ❌ `Simple to use. Easy to deploy. Ready to scale.`
  - ✅ Write like a human, vary your structure.

- **Em-dashes (—):** Never use them. Use periods, colons, or rewrite the sentence.
  - ❌ `These aren't exotic tools — they're registry keys`
  - ✅ `These aren't exotic tools. They're registry keys`

When in doubt: Read it out loud. If it sounds like a LinkedIn post or a SaaS landing page, rewrite it.

### Educational vs Sales Tone

**This is a conference talk, not a product pitch.** Slides should educate and inform, not sell.

**Sales slide red flags:**
- ❌ Checkmark bullets listing benefits ("✓ Runs automatically", "✓ No interaction required")
- ❌ "60+" or "95+" style marketing numbers (just say the real number)
- ❌ Product-style headers ("The Automation", "Our Solution", "The Platform")
- ❌ Benefit-focused copy ("results in minutes", "no hassle")
- ❌ Feature lists disguised as content

**Educational slide patterns:**
- ✅ Explain *what* something is and *why* it matters
- ✅ Ask questions the audience should be thinking ("Are your endpoints configured this way?")
- ✅ Describe concepts, not products
- ✅ Use real numbers, not inflated marketing numbers
- ✅ Let the audience draw their own conclusions about value

**The test:** Would this slide feel at home in a vendor booth, or in a classroom? Aim for classroom.

### Design Principles

1. **Less text, bigger fonts** - If it doesn't fit, remove content, don't shrink fonts
2. **High contrast only** - White/light text on dark backgrounds
3. **No walls of text** - Maximum 4-5 bullet points per slide
4. **Generous spacing** - Use `gap-6`, `gap-8`, `space-y-6` minimum
5. **Full width layouts** - Use `w-full`, never `max-w-*` constraints on slides
6. **The Photo Test** - If a conference attendee takes a photo of a slide, will they find meaning in it when they get home? Every slide must be self-contained and comprehensible without the speaker's narration.

## Speaker Notes Guidelines

Speaker notes live in `src/data/slides.jsx` as a `notes` property on each slide. When writing or editing notes, follow these principles:

### Concept Ownership

Each concept should be **introduced once** and **referenced thereafter**. Don't re-explain.

| Concept | Owned By | Later Slides Should... |
|---------|----------|------------------------|
| Deterministic vs Probabilistic | `aiVocab` | Say "remember the split" not re-explain |
| Hallucination | `aiVocabTerms` | Reference, don't define again |
| Blast radius | `aiVocabTerms` | Use the term freely, it's established |
| Prompt injection → execution | `toolUse` | Reference "the ticket example" |
| Guardrail sandwich architecture | `sandwich` | Build on it, don't repeat layers |

### Callback Pattern

When referencing earlier content:
- **Do:** "Remember the ticket injection from earlier? Output validation catches it anyway."
- **Don't:** Re-explain the entire concept

### Note Structure

Each slide's notes should include:
1. **Transition** (5-10 sec) - How this connects to previous slide
2. **Core content** (30-60 sec) - What's NEW on this slide
3. **Landing moment** - The one thing you want them to remember
4. **Timing estimate** - Total seconds, marked with emoji indicators

### Timing Targets

- Concept slides: 60-90 seconds of notes
- Example/demo slides: 30-60 seconds (visuals do the work)
- Transition slides: 15-30 seconds

### Style Rules

- Write in speaker voice (first person, conversational)
- Use → for stage directions ("→ Point to diagram")
- Mark audience cues with eye emoji ("Make eye contact here")
- Keep individual speaking segments under 30 seconds before a visual/gesture break

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

