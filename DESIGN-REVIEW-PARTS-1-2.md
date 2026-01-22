# Design Review: Right of Boom 2026 - Parts 1 & 2

**Review Date:** 2026-01-20
**Reviewer:** Design System Audit (Revised with stricter standards)
**Scope:** Slides 0-14 (Part 1: The Landscape + Part 2: Defensive Automation)

---

## Reviewer's Note: Why This Review Is Stricter

The initial review was too lenient. Here's why we've revised it:

1. **"At minimum" is not passing.** When text is at the 20px floor, it works for people in row 3—not row 30. A conference room is unforgiving.

2. **"Borderline" was noted 12+ times without affecting ratings.** If 12 things are borderline, the slide isn't passing—it's struggling.

3. **The Photo Test was applied loosely.** A slide with 5+ bullet points and 3 dense columns will NOT be comprehensible in an attendee's phone photo from 30 feet.

4. **Cognitive load wasn't assessed.** Multi-column layouts force the audience to scan left→center→right while listening. This attention-splitting is a design problem.

5. **Part 2 density was acknowledged but not penalized.** Denser slides need higher scrutiny, not equal ratings.

---

## Executive Summary

Parts 1 and 2 have a **clear narrative arc** from "AI collapses the attacker skill gap" through "here's how to defend with deterministic guardrails." The guardrail sandwich is a strong visual motif. However, **typography discipline breaks down in Part 2**, and several slides pack too much content for conference-scale projection.

**Overall Grade: C+**

The presentation has good bones, but 6 of 15 slides need significant work before they'll be readable from the back of the room.

### What's Actually Working
- Title slide and Guardrail Sandwich slide are excellent
- Color semantics are consistent and intuitive
- The "math detects, AI explains" refrain is well-established
- Theme system is properly used (when used)

### Critical Issues (5 slides need rework)
1. **AlertTriagePatternSlide**: Uses `text-sm` (14px) and `text-base` (16px) - BANNED sizes
2. **SandwichExampleSlide**: `text-lg` (18px) throughout - below minimum
3. **AIVocabTermsSlide**: 3 dense cards, fails Photo Test
4. **TieredResponseSlide**: 3 columns of lists with `text-lg` - fails Photo Test
5. **AttackLabDemo**: Inline styles with 11-14px fonts - unreadable from back rows

### Systemic Issues
1. **12 instances of "borderline" typography** across the deck
2. **Part 2 is noticeably denser** than Part 1 with no corresponding simplification
3. **Multi-column layouts** create cognitive load not accounted for
4. **Demo slides bypass the design system** with inline pixel values

---

## Common Patterns & Issues

### Pattern: Consistent Wins

| Pattern | Assessment | Notes |
|---------|------------|-------|
| Header typography | **GOOD** | `text-5xl` to `text-7xl` used consistently |
| Theme system usage | **GOOD** | Proper `t.textOnPage`, `t.accentColor` usage |
| Card backgrounds | **GOOD** | Consistent `${t.cardBg}` and `${t.cardBorder}` |
| Color coding | **GOOD** | Emerald=success, Amber=deterministic, Purple=AI, Red=danger |
| Landing lines | **GOOD** | Most slides have memorable takeaway statements |

### Pattern: Recurring Issues

| Issue | Affected Slides | Severity |
|-------|----------------|----------|
| `text-xl` body text (should be `text-2xl`) | 5, 8, 11-14 | **HIGH** |
| `text-lg` / `text-base` usage | 8, 13, 14, 15 | **CRITICAL** |
| Label text too small | 5, 11, 12, 13, 14 | **HIGH** |
| Multi-column cognitive overload | 5, 8, 15 | **HIGH** |
| Photo Test failures (dense content) | 5, 8, 11, 14, 15 | **HIGH** |
| Inconsistent footer styling | 10-14 vs 4-9 | **LOW** |

### Pattern: What's Working Well

1. **The Guardrail Sandwich visual** (Slide 7) - Clean, memorable, glanceable
2. **Side-by-side comparisons** (Slides 3, 8, 9) - Effective use of contrast
3. **Flow diagrams** (Slides 6, 11, 13) - Clear INPUT -> AI -> OUTPUT progression
4. **Color-coded layers** - Emerald/Amber/Purple scheme is consistent and intuitive

---

## Slide-by-Slide Analysis

### PART 1: THE LANDSCAPE (Slides 0-8)

---

#### Slide 0: TitleSlide
**File:** `src/components/slides/001-TitleSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Title: text-6xl/8xl, subtitle: text-2xl/4xl |
| Visual hierarchy | **PASS** | Title dominant, presenters secondary |
| Spacing | **PASS** | gap-12 between presenter cards |
| Contrast | **PASS** | White on dark Ops Indigo |
| Photo test | **PASS** | Self-explanatory conference title slide |

**Issues:** None

**Recommendations:** None - this slide is well-designed.

---

#### Slide 1: IntroSlide
**File:** `src/components/slides/002-IntroSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **MARGINAL** | Headers: text-5xl/7xl good, but body at floor (text-xl) |
| Visual hierarchy | **PASS** | Names prominent, credentials readable |
| Spacing | **PASS** | gap-8 between cards, space-y-4 for credentials |
| Contrast | **PASS** | White text, accent color for roles |
| Photo test | **PASS** | Presenter credentials clearly visible |

**Issues:**
1. Credentials at `text-xl` (20px) - at the absolute minimum. Back rows will struggle.

**Recommendations:**
- [ ] MEDIUM: Bump credential text from `text-xl` to `text-2xl` for 30+ ft readability

---

#### Slide 2: AttackSetupSlide - "The Skill Gap Collapsed"
**File:** `src/components/slides/003-AttackSetupSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Years: text-7xl/8xl, skills: text-3xl |
| Visual hierarchy | **PASS** | Before/After contrast is effective |
| Spacing | **PASS** | gap-16 between columns, generous padding |
| Contrast | **PASS** | White vs accent color clearly differentiated |
| Photo test | **PASS** | "2019: Years -> 2026: Minutes" message is crystal clear |

**Issues:**
1. "Time to First Attack" label at `text-xl` - borderline

**Recommendations:**
- [ ] LOW: Consider `text-2xl` for "Time to First Attack" labels

---

#### Slide 3: AttackLabDemo
**File:** `src/components/demos/AttackLabDemo.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **REVIEW NEEDED** | Uses inline styles with px values |
| Visual hierarchy | **REVIEW NEEDED** | Two-panel layout may be dense |
| Spacing | **REVIEW NEEDED** | Inline gap values |
| Contrast | **PASS** | Chat vs terminal visually distinct |
| Photo test | **UNCERTAIN** | Interactive demo - won't photograph well |

**Issues:**
1. **CRITICAL:** This is an interactive demo, not a static slide. The Photo Test is not applicable in the traditional sense.
2. Font sizes in inline styles use pixel values (11px, 12px, 13px, 14px) - these are below the 20px minimum for projection.
3. Phase stepper buttons: `fontSize: '12px'` - TOO SMALL
4. Connection status: `fontSize: '11px'` - TOO SMALL
5. Message timestamps/controls: `fontSize: '11px'` - TOO SMALL
6. Impact callout: `fontSize: '14px'` - TOO SMALL

**Recommendations:**
- [ ] HIGH: Increase ALL font sizes in AttackLabDemo to minimum 20px (1.25rem)
- [ ] MEDIUM: Add a companion "summary slide" that can be photographed after the demo
- [ ] MEDIUM: Consider whether this demo works without a projector closeup

**Note:** The AttackLabDemo is a powerful teaching tool but may not be readable from the back of a large conference room. Consider:
1. Running this on a secondary close-up camera feed
2. Creating a summary slide that captures the key points for photos

---

#### Slide 4: AIVocabSlide - "Two Types of Logic"
**File:** `src/components/slides/004-AIVocabSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Headers: text-7xl, body: text-3xl, code: text-2xl |
| Visual hierarchy | **PASS** | Deterministic/Probabilistic as clear focal points |
| Spacing | **PASS** | gap-20 between columns, generous padding |
| Contrast | **PASS** | Amber vs Purple color coding effective |
| Photo test | **PASS** | Core concept clear at a glance |

**Issues:**
1. "You get" label at `text-2xl` with `text-slate-400` - slightly muted but acceptable
2. Footer text uses hardcoded colors instead of theme system

**Recommendations:**
- [ ] LOW: Consider using theme accent colors in footer for consistency

---

#### Slide 5: AIVocabTermsSlide - "Three Words You'll Hear"
**File:** `src/components/slides/005-AIVocabTermsSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **FAIL** | Multiple instances of text-xl on key content |
| Visual hierarchy | **MARGINAL** | Three cards compete for attention equally |
| Spacing | **PASS** | gap-10 between cards |
| Contrast | **PASS** | Color-coded cards (blue, red, emerald) |
| Photo test | **FAIL** | 3 dense cards with 4-5 text elements each - incomprehensible in photo |
| Cognitive load | **FAIL** | 3-column layout with substantial text in each |

**Issues:**
1. **CRITICAL:** This slide tries to teach 3 concepts simultaneously. Audience must read left card, center card, right card while listening. This is cognitive overload.
2. **HIGH:** "MSP Examples" label: `text-xl` (20px) - at floor
3. **HIGH:** "Watch For" label: `text-xl` (20px) - at floor
4. **HIGH:** Explanatory text in Confidence card: `text-xl` (20px) - THREE instances at floor
5. **HIGH:** Supporting text uses `text-xl text-slate-400` - muted color + minimum size = unreadable from back

**Recommendations:**
- [ ] CRITICAL: Split into 2-3 slides (one concept per slide, or Hallucinations+Confidence together, Agentic separate)
- [ ] HIGH: If keeping as one slide, ruthlessly cut content - pick ONE example per concept
- [ ] HIGH: Increase all `text-xl` instances to `text-2xl` minimum

---

#### Slide 6: ToolUseSlide - "What Agentic AI Does"
**File:** `src/components/slides/006-ToolUseSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **MARGINAL** | Headers good, some labels at text-xl |
| Visual hierarchy | **PASS** | Flow diagram is clear and prominent |
| Spacing | **PASS** | gap-6/gap-20 provides breathing room |
| Contrast | **PASS** | Color-coded pipeline stages |
| Photo test | **PASS** | Flow diagram tells the story |

**Issues:**
1. Pipeline labels: `text-2xl` - **GOOD**
2. "Common AI Tools" header: `text-xl` - borderline
3. "Ask Your Vendors" header: `text-xl` - borderline
4. Warning detail text: `text-xl text-slate-400` - harder to read at distance

**Recommendations:**
- [ ] MEDIUM: Bump section headers from `text-xl` to `text-2xl`
- [ ] LOW: Increase warning detail text contrast or size

---

#### Slide 7: SandwichSlide - "The Guardrail Sandwich"
**File:** `src/components/slides/007-SandwichSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Title: text-6xl, layers: text-3xl/4xl |
| Visual hierarchy | **EXCELLENT** | Three stacked layers with clear visual weight |
| Spacing | **PASS** | gap-4 between layers, consistent padding |
| Contrast | **PASS** | Amber borders vs Red center |
| Photo test | **EXCELLENT** | The sandwich visual is immediately memorable |

**Issues:** None - this is one of the best-designed slides in the deck.

**Recommendations:** None

---

#### Slide 8: SandwichExampleSlide - "The Sandwich in Action"
**File:** `src/components/slides/008-SandwichExampleSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **FAIL** | Multiple text-lg (18px) instances - BANNED size |
| Visual hierarchy | **MARGINAL** | Two parallel flows compete for attention |
| Spacing | **FAIL** | space-y-3 is cramped for this density |
| Contrast | **PASS** | Green vs Red gradient backgrounds |
| Photo test | **FAIL** | Two 3-layer flow diagrams side-by-side - incomprehensible in photo |
| Cognitive load | **FAIL** | 2-column layout with 3 layers each + results - too much parallel processing |

**Issues:**
1. **CRITICAL:** Layer content text: `text-lg text-slate-300` (18px) - BANNED SIZE
2. **CRITICAL:** Result subtitle: `text-lg text-emerald-400/70` (18px) - BANNED SIZE
3. **CRITICAL:** This slide asks audience to follow TWO parallel 3-step flows simultaneously
4. **HIGH:** INPUT/AI/OUTPUT content: `text-lg` used extensively
5. **HIGH:** px-7 padding on layer content creates cramped feel

**Recommendations:**
- [ ] CRITICAL: Replace ALL `text-lg` with `text-2xl` (not just text-xl - need margin for error)
- [ ] CRITICAL: Consider splitting into two slides: "Approved Path" then "Rejected Path"
- [ ] HIGH: Increase padding in layer boxes from p-3 to p-5
- [ ] HIGH: Increase spacing from space-y-3 to space-y-4

**Specific fixes:**
```jsx
// BEFORE (line 48-49)
<div className="text-lg text-slate-300 pl-7">
  Sentinel: "Cobalt Strike beacon on WKS-042"
</div>

// AFTER
<div className="text-2xl text-slate-300 pl-7">
  Sentinel: "Cobalt Strike beacon on WKS-042"
</div>
```

---

### PART 2: DEFENSIVE AUTOMATION (Slides 9-14)

---

#### Slide 9: BridgeSlide - "Why the Sandwich Works"
**File:** `src/components/slides/009-BridgeSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Headers: text-6xl/7xl, cards: text-2xl |
| Visual hierarchy | **PASS** | Ground Truth highlighted with ring |
| Spacing | **PASS** | gap-8 between columns, space-y-4 in cards |
| Contrast | **PASS** | Red (attackers) vs Emerald (defenders) |
| Photo test | **PASS** | "Ground truth" message is clear |

**Issues:**
1. Card detail text: `text-xl` - borderline but acceptable
2. "vs" divider text at `text-2xl` is good

**Recommendations:**
- [ ] LOW: Consider `text-2xl` for card details

---

#### Slide 10: CACrateIntroSlide
**File:** `src/components/demos/CACrateIntroSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Title: text-7xl, body: text-3xl, detail: text-2xl |
| Visual hierarchy | **PASS** | Logo + Package icon prominent |
| Spacing | **PASS** | Generous padding throughout |
| Contrast | **PASS** | White/amber on dark background |
| Photo test | **PASS** | "CA Policy Monitor" purpose is clear |

**Issues:** None significant

**Recommendations:**
- [ ] LOW: The Rewst logo height (h-48) is large - verify it doesn't dominate

---

#### Slide 11: M365ConfigDriftDemo - "How It Works"
**File:** `src/components/demos/M365ConfigDriftDemo.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **MARGINAL** | Step numbers: text-xl (floor), descriptions: text-xl/2xl mixed |
| Visual hierarchy | **MARGINAL** | 7 steps is a lot to track visually |
| Spacing | **PASS** | gap-3/4 between rows |
| Contrast | **PASS** | Color-coded steps (emerald, amber, purple, red) |
| Photo test | **MARGINAL** | 7 steps might compress poorly in a photo |
| Cognitive load | **MARGINAL** | 7 sequential steps requires sustained attention |

**Issues:**
1. **HIGH:** 7 steps is pushing the limit of what audiences can absorb in one slide
2. **MEDIUM:** Step descriptions: `text-xl text-slate-400` - muted color at floor size
3. **MEDIUM:** AI quote: `text-xl text-purple-300 italic` - italic + floor size = harder to read
4. Step numbers: `text-xl` - at floor but acceptable for numbers

**Recommendations:**
- [ ] HIGH: Consider grouping into 3 phases (Detect → Analyze → Respond) to reduce cognitive load
- [ ] MEDIUM: Increase secondary descriptions from `text-xl` to `text-2xl`
- [ ] MEDIUM: Remove italic from AI quote - italics hurt readability at distance

---

#### Slide 12: CASandwichMappingSlide - "The Guardrail Sandwich"
**File:** `src/components/demos/CASandwichMappingSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **MARGINAL** | Layer labels: text-2xl (good), details: text-xl |
| Visual hierarchy | **PASS** | Four-layer stack mirrors original sandwich |
| Spacing | **PASS** | gap-4 between layers |
| Contrast | **PASS** | Emerald/Amber/Purple color scheme |
| Photo test | **PASS** | Reinforces earlier sandwich slide |

**Issues:**
1. Layer detail labels: `text-xl text-emerald-400/80` - borderline
2. Badge text: `text-lg text-purple-400/70` (18px) - BELOW MINIMUM
3. Time labels: `text-xl` - acceptable

**Recommendations:**
- [ ] HIGH: Replace `text-lg` badge with `text-xl` minimum
- [ ] MEDIUM: Consider `text-2xl` for all layer descriptions

---

#### Slide 13: PatternApplicationsSlide - "One Pattern, Many Applications"
**File:** `src/components/demos/PatternApplicationsSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **PASS** | Title: text-6xl, table: text-2xl |
| Visual hierarchy | **PASS** | Table format is scannable |
| Spacing | **PASS** | gap-4 between rows, py-4 padding |
| Contrast | **PASS** | Color-coded icons per system |
| Photo test | **PASS** | "Baseline -> Compare -> Explain -> Alert" is memorable |

**Issues:**
1. Header labels: `text-xl` - borderline for table headers
2. Table cells: `text-2xl` - **GOOD**

**Recommendations:**
- [ ] LOW: Consider `text-2xl` for column headers

---

#### Slide 14: AlertTriagePatternSlide - "Alert Triage Pattern"
**File:** `src/components/demos/AlertTriagePatternSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **FAIL** | Multiple instances of text-sm and text-base |
| Visual hierarchy | **PASS** | Four-step flow is clear |
| Spacing | **PASS** | gap-3 between steps |
| Contrast | **PASS** | Red/Amber/Purple/Emerald progression |
| Photo test | **MARGINAL** | Context boxes may be too small to read |

**Issues:**
1. **CRITICAL:** Context box labels: `text-lg text-amber-400` (18px) - BELOW MINIMUM
2. **CRITICAL:** Context box details: `text-sm text-slate-500` (14px) - BANNED SIZE
3. **HIGH:** Reasoning/Confidence boxes: `text-lg` + `text-sm` combination
4. **HIGH:** Approve/Override buttons: `text-xl` - borderline

**Recommendations:**
- [ ] CRITICAL: Replace ALL `text-sm` with `text-xl` minimum
- [ ] CRITICAL: Replace ALL `text-lg` with `text-xl` minimum
- [ ] HIGH: Simplify context boxes - remove detail lines or merge with labels

**Specific fixes needed:**
```jsx
// Lines 76-85: Context boxes
// BEFORE
<div className="text-lg text-amber-400">Calendar</div>
<div className="text-sm text-slate-500">Travel events?</div>

// AFTER
<div className="text-xl text-amber-400">Calendar</div>
<div className="text-xl text-slate-400">Travel events?</div>
```

---

#### Slide 15: TieredResponseSlide - "Tiered Response Model"
**File:** `src/components/demos/TieredResponseSlide.jsx`

| Criterion | Rating | Notes |
|-----------|--------|-------|
| Typography | **FAIL** | Action items use text-lg (18px) - BANNED; subtitles use text-base (16px) - BANNED |
| Visual hierarchy | **MARGINAL** | Three columns compete equally for attention |
| Spacing | **PASS** | gap-6 between columns, space-y-2 in lists |
| Contrast | **PASS** | Green/Amber/Red tier coding |
| Photo test | **FAIL** | 3 columns of bullet lists - too dense for phone photo |
| Cognitive load | **FAIL** | 3-column layout with 4-5 items each = 12-15 items to process |

**Issues:**
1. **CRITICAL:** Action items: `text-lg` (18px) - BANNED SIZE used throughout
2. **CRITICAL:** Tier subtitle: `text-base text-slate-400` (16px) - BANNED SIZE
3. **HIGH:** 3 columns × 4-5 items = cognitive overload
4. **MEDIUM:** Decision formula: `text-xl` - at floor

**Recommendations:**
- [ ] CRITICAL: Replace `text-lg` action items with `text-2xl`
- [ ] CRITICAL: Replace `text-base` subtitles with `text-xl`
- [ ] HIGH: Consider presenting tiers sequentially (3 slides) or reducing to 2-3 key actions per tier
- [ ] MEDIUM: Increase decision formula from `text-xl` to `text-2xl`

---

## Priority Summary

### CRITICAL (Must fix before presentation - 5 slides)

| Slide | Issue | Fix |
|-------|-------|-----|
| AlertTriagePatternSlide | `text-sm` (14px) and `text-base` (16px) - BANNED | Replace with `text-xl` minimum, simplify content |
| SandwichExampleSlide | `text-lg` (18px) throughout + cognitive overload | Replace with `text-2xl`, consider splitting into 2 slides |
| TieredResponseSlide | `text-lg` and `text-base` - BANNED + 3-col overload | Replace banned sizes, reduce items per tier |
| AIVocabTermsSlide | 3-column cognitive overload, fails Photo Test | Split into 2-3 slides OR ruthlessly cut content |
| AttackLabDemo | Inline styles with 11-14px fonts | Increase ALL to 20px minimum |

### HIGH (Should fix - 4 slides)

| Slide | Issue | Fix |
|-------|-------|-----|
| CASandwichMappingSlide | `text-lg` badge (18px) | Replace with `text-xl` |
| M365ConfigDriftDemo | 7 steps + floor typography | Group into phases, bump descriptions to `text-2xl` |
| ToolUseSlide | Section headers at `text-xl` | Bump to `text-2xl` |
| IntroSlide | Credentials at floor (`text-xl`) | Bump to `text-2xl` |

### MEDIUM (Should address)

| Slide | Issue | Fix |
|-------|-------|-----|
| BridgeSlide | Card details at `text-xl` | Bump to `text-2xl` |
| AttackSetupSlide | Labels at `text-xl` | Bump to `text-2xl` |
| PatternApplicationsSlide | Column headers at `text-xl` | Bump to `text-2xl` |

### LOW (Polish)

| Slide | Issue | Fix |
|-------|-------|-----|
| AIVocabSlide | Footer uses hardcoded colors | Use theme system |

---

## Design System Observations

### What's Working

1. **Consistent theme usage** - Almost all slides properly use `t.textOnPage`, `t.accentColor`, etc.
2. **Color semantics** - Emerald=deterministic/good, Purple=AI, Amber=warning/deterministic, Red=danger
3. **The sandwich motif** - Consistently reinforced across slides 7, 8, 12
4. **Landing lines** - Most slides have a memorable quotable takeaway

### What Needs Attention

1. **Minimum font size discipline** - Too many `text-lg` and smaller instances
2. **Demo slides** - AttackLabDemo uses inline styles that bypass the design system
3. **Consistency between Part 1 and Part 2** - Part 1 slides are generally cleaner than Part 2

### Recommended Design Tokens

Consider establishing these as constants to prevent future issues:

```javascript
// src/config/typography.js
export const SLIDE_TYPOGRAPHY = {
  BODY_MIN: 'text-2xl',      // 24px - minimum for any body text
  LABEL_MIN: 'text-xl',       // 20px - minimum for any visible label
  HEADING_DEFAULT: 'text-5xl', // 48px - default for slide headings
  HERO_NUMBER: 'text-6xl',    // 60px - for impact statistics

  // BANNED
  BANNED: ['text-xs', 'text-sm', 'text-base', 'text-lg']
};
```

---

## Action Items for Tomorrow's Meeting

### Hard Questions to Answer

1. **Are we willing to split slides?** AIVocabTermsSlide, SandwichExampleSlide, and TieredResponseSlide all pack too much for one slide. Splitting adds slides but improves comprehension. What's the time budget?

2. **Is the AttackLabDemo viable?** At 11-14px fonts, it's unreadable from row 10+. Options: (a) massive font overhaul, (b) secondary camera feed, (c) companion summary slide, (d) cut it.

3. **Why is Part 2 denser than Part 1?** Part 1 introduces concepts cleanly. Part 2 crams implementation details. Is this intentional? Should Part 2 be restructured?

4. **Font size enforcement**: Should we add a linting rule or pre-commit hook to catch banned classes (`text-xs`, `text-sm`, `text-base`, `text-lg`)?

### The 5 Slides That Need Rework (not just fixes)

| Slide | Problem | Decision Needed |
|-------|---------|-----------------|
| AIVocabTermsSlide | 3 concepts competing | Split into 2-3 slides? |
| SandwichExampleSlide | 2 parallel flows | Split into "Approved" and "Rejected" slides? |
| TieredResponseSlide | 3 columns × 5 items | Sequential reveal? Fewer items? |
| AlertTriagePatternSlide | Banned font sizes + density | Simplify context boxes? |
| AttackLabDemo | 11-14px fonts throughout | Overhaul or cut? |

### Quick Wins (can fix now)

1. Global find-replace: `text-lg` → `text-xl` (then review)
2. Global find-replace: `text-base` → `text-xl` (then review)
3. Remove `text-sm` entirely from presentation code

### Larger Efforts

1. **AttackLabDemo overhaul** - Convert all inline px styles to Tailwind classes at 20px+
2. **Slide splits** - Create new slide files for split content
3. **Part 2 restructure** - Assess if content can be simplified rather than just font-bumped

---

## Summary: Grade Justification

**Grade: C+** (not B+)

| Criterion | Score | Notes |
|-----------|-------|-------|
| Typography discipline | **D** | 5 slides with BANNED sizes, 12 "borderline" instances |
| Photo Test | **C** | 5 slides would fail a phone photo test |
| Cognitive Load | **C** | Multiple 3-column layouts with dense content |
| Visual hierarchy | **B** | Generally clear, but multi-column splits attention |
| Theme system usage | **A-** | Consistent when used, but demos bypass it |
| Color semantics | **A** | Emerald/Purple/Amber/Red is intuitive and consistent |
| Narrative flow | **A** | Strong progression, sandwich motif well-established |

The presentation has excellent bones (narrative, color, motif) but execution suffers from density and typography violations. Fix the 5 critical slides and this becomes a B+ presentation.

---

*Revised review with stricter standards. The original review was too lenient - "borderline" should not equal "PASS" for conference-scale projection.*
