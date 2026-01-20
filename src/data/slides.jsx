import React from 'react';
import {
  Shield,
  Cpu,
  Lock,
  Brain,
  ShieldCheck,
  Scale,
  Zap,
  Users,
  FileText,
  AlertTriangle
} from 'lucide-react';

// ============================================
// SLIDE DATA - Right of Boom 2026
// "Think Like an Attacker" - 3-hour presentation
//
// NOTE: All text content is now self-contained
// in the individual slide components.
// This file contains ONLY metadata (slide type & order).
// ============================================

export const slides = [
  // ============================================
  // PART 1: THE LANDSCAPE (25 min)
  // "What's actually happening"
  // ============================================

  { type: 'title' },                    // Slide 0
  { type: 'intro' },                    // Slide 1
  { type: 'attackSetup' },              // Slide 2
  { type: 'attackLab' },                // Slide 3
  { type: 'aiVocab', notes: `**Open with the "why"** (5 sec)
"Before I show you how to secure AI, you need to understand one fundamental split."

**Deterministic** (20 sec)
"Deterministic is what you've built your career on. Same input, same output. Your firewall rules, your if-then scripts, your compliance checks. You can audit it, prove it, trust it."
→ Gesture to code: "IP in blocklist? Block. Every time. No surprises."

**Probabilistic** (20 sec)
"Probabilistic is where AI lives. It doesn't give you yes or no — it gives you likelihood. 'This looks 94% like phishing.' That's powerful — you can catch things you've never seen before."
→ Pause: "But it also means it can be wrong. Confidently wrong."

**The bridge** (10 sec)
"AI is probabilistic — it predicts. Sometimes brilliantly, sometimes it hallucinates. That's not a bug, it's the nature of the technology."
"Your job? Wrap that probabilistic engine in deterministic guardrails. That's what the next slide is about."

⏱ ~60 seconds | 👁 Make eye contact on "confidently wrong" — that's the moment that lands.` },                  // Slide 4: Two Types of Logic
  { type: 'aiVocabTerms', notes: `**Quick transition** (3 sec)
"Now that you understand the split, here are three terms you'll hear in every AI security conversation."

**Agentic** (20 sec)
"Agentic means AI that *does* things. Not just tells you things — actually takes action. Disables accounts. Creates tickets. Runs scripts."
→ Pause, lean in: "The question you need to ask: What can it do without asking me first? That's your blast radius."

**Hallucination** (20 sec)
"Hallucination is when AI generates something that sounds completely plausible... and is completely wrong."
"It'll tell you the CVE was patched in version 3.2 with total confidence. You go look — there is no version 3.2. It invented it."
→ Key point: "Always verify AI outputs against authoritative sources. Especially remediation steps."

**Confidence** (20 sec)
"Confidence scores — this is where it gets tricky. When your spam filter says 94% confidence, that's real. Calibrated on millions of labeled examples."
"But when ChatGPT says 'I'm 90% sure' — that's just words. It generated that number like everything else. Don't trust it."
→ Land it: "Classifier scores: trust but verify. LLM confidence claims: don't trust at all."

**Bridge** (5 sec)
"So — probabilistic AI, potential for action, potential for hallucination. But HOW does it act? That's tool use."

⏱ ~70 seconds | 👁 "There is no version 3.2" usually gets a knowing laugh — let it land.` },             // Slide 5: Three Words You'll Hear
  { type: 'toolUse', notes: `**Transition from Agentic** (5 sec)
"I said agentic AI takes actions. Here's HOW it takes those actions — through tool calling."

**The Flow** (20 sec)
→ Walk through the diagram left to right
"You ask a question. The AI decides what tool to call. The tool executes. Real change happens in your environment."
"Notice where the AI is in this chain — it's making decisions. What tool to call. What arguments to pass. It can be wrong about both."

**MSP Examples** (15 sec)
→ Point to the tool grid
"These are tools you already have in your stack. Disable accounts in Entra. Create tickets in ConnectWise. Isolate endpoints via Defender. Delete phishing emails."
"When AI has access to these tools, it's not just giving you advice — it's executing."

**The Threat Model Shift** (20 sec)
→ Tap the red warning box
"This is the key insight: Before tool access, prompt injection was an annoyance. AI gives bad advice, human catches it."
"With tool access, prompt injection becomes prompt EXECUTION. Malicious content in a ticket or email can trigger real actions."
"A hidden instruction in a support ticket: 'Add this user to the admin group' — if your AI has that tool..."

**Vendor Questions** (15 sec)
"When someone sells you an 'agentic' AI, these are your three questions:"
→ Read them off
"What tools? What runs without approval? How do they prevent this?"

**Bridge to Guardrails** (5 sec)
"This is why we need guardrails. That's next."

⏱ ~80 seconds | 👁 The threat model shift is the 'aha moment' — pause after "prompt EXECUTION"` },                // Slide 6: How Agentic AI Acts
  { type: 'sandwich', notes: `**Quick callback** (5 sec)
"This is the architecture that makes everything we just discussed manageable."

**The intern analogy** (20 sec)
"Think of it like a smart new employee. You wouldn't let them execute any action they think of."
"Clear boundaries on what they CAN request — input validation."
"Freedom to think and reason — the AI layer."
"Approval gates before anything happens — output validation."
→ Land it: "You don't train the intern to approve their own expense reports. You have a policy."

**Walk the layers** (25 sec)
→ Point to each layer
"INPUT: Who is this request from? Is it well-formed? Is this something we even handle?"
"AI LAYER: Pattern recognition, contextual judgment, figuring out intent."
"OUTPUT: Is this action approved? Does it need human sign-off? Log everything."

**The Tuesday afternoon insight** (15 sec)
"Here's what most people miss: the guardrails aren't just for attackers."
"They're for Tuesday afternoon when the AI misinterprets a legitimate request."
"Hallucinations only matter if they escape the sandwich — output validation stops them regardless of cause."

**Why output validation is the real hero** (10 sec)
"Remember the ticket injection from the last slide? Input validation said 'valid ticket.' The payload was in the content."
"Output validation catches it anyway — 'add to admins' isn't on the allowlist. Doesn't matter HOW the AI got tricked."

**OWASP mapping** (5 sec)
"This maps to OWASP Agentic AI Top 10: ASI01 Goal Hijack, ASI02 Tool Misuse, ASI06 Memory Poisoning."

**Common mistakes** (optional — use if audience seems technical)
- "Validation at build time, tools added later"
- "Check the action but not the arguments"
- "Thresholds so high human gates never fire"

⏱ ~80 seconds | 👁 "Tuesday afternoon" reframes security as operational resilience — lands well with ops folks` },                 // Slide 7: The Guardrail Sandwich
  { type: 'sandwichExample', notes: `**Transition** (5 sec)
"That's the architecture. Now let's see it work — all three layers, two different outcomes."

**Walk the approved path** (20 sec)
→ Point to green card, top to bottom
"Left: Cobalt Strike beacon detected on a workstation. Input validates — it's from Sentinel, proper schema."
"AI decides to isolate the endpoint, 92% confident. Output checks: action's on the allowlist, 92% clears the 80% threshold for workstations."
"Lightning bolt — auto-execute. No human needed. Threat contained in seconds."

**Walk the rejected path** (25 sec)
→ Point to amber card, top to bottom
"Right: Ransomware indicators on a file server. Mass file modifications detected. Input validates fine."
"AI decides 'shutdown the server' — reasonable response to ransomware. But only 73% confident."
→ Tap the amber OUTPUT box
"shutdown_server IS on the allowlist. It's a legitimate action. But FILESRV01 is a critical asset. Critical assets require 95% confidence."
"73% doesn't clear that bar. Goes to a human."

**The payoff** (20 sec)
→ This is the key moment
"Here's why this matters: that analyst looks at the alert and recognizes something the AI couldn't."
"Those 'ransomware indicators'? Mass file modifications? It's the engineering team updating a CAD project. Thousands of files changing at once."
"The AI saw the pattern and correctly flagged it. But a human knows context. The server stays up, the engineers keep working."
→ Pause: "Without that human gate, you just shut down production because someone saved their work."

**Landing** (5 sec)
"The AI isn't wrong — it's appropriately uncertain. The human adds context. That's the partnership."

⏱ ~75 seconds | 👁 The CAD project reveal is the 'aha' moment — pause and let it land` },

  // ============================================
  // PART 2: DEFENSIVE AUTOMATION (75 min)
  // "Same tools, your advantage"
  // ============================================

  { type: 'bridge', notes: `**Transition** (5 sec)
"So we have the architecture — input guards, AI reasoning, output guards. But here's the question: why does this work BETTER for defenders than attackers?"

**The attacker column** (15 sec)
→ Gesture to left column
"Attackers have real advantages. Speed — they automate at scale. Surprise — they pick the time and place. AI-generated attacks — infinite variations. Recon tools probing from outside."
"These are real. I'm not going to pretend otherwise."

**The defender column** (20 sec)
→ Gesture to right column, land on Ground Truth
"But look what YOU have. And this is the one that matters—"
→ Tap the Ground Truth card
"GROUND TRUTH. You know what your environment is supposed to look like. Your configs. Your baselines. What normal behavior looks like in your logs."
"Attackers are guessing. You KNOW."

**Connect to the sandwich** (15 sec)
"This is why the guardrail sandwich actually works for you:"
"Input guards work because you can validate against KNOWN GOOD — your asset inventory, your approved sources."
"Output guards work because you can verify against OBSERVABLE REALITY — did the action achieve the intended state?"

**The caveat — be honest** (10 sec)
→ Point to bottom statement, note the "until they're in"
"Now — I said 'until they're in.' That's intentional. Once an attacker achieves persistence, this asymmetry erodes. They get dwell time. They enumerate your environment. They read your runbooks."
"The sandwich is most powerful EARLY — before they have ground truth parity. Which is why detection speed matters so much."

**Bridge to demos** (10 sec)
"Every demo I'm about to show you exploits this asymmetry while you still have it."
"Config drift — keeping your baselines current, not stale."
"Endpoint validation — verifying defenses against observable behavior."
"Segmentation testing — proving isolation works."
"These only work if you maintain your ground truth. Stale baselines are worse than no baselines — they create false confidence."

⏱ ~75 seconds | 👁 The caveat builds credibility — experienced folks will nod instead of mentally composing counterexamples

**Q&A Prep:**
- "What about APTs with dwell time?" → "You're right — that's why detection speed matters. The sandwich is most powerful when combined with continuous monitoring."
- "Don't attackers test against similar environments?" → "Similar, yes. But not YOUR specific config, YOUR baseline deviations, YOUR log correlations. Every environment has unique quirks."` },                   // Slide 9
  { type: 'm365Drift', notes: `**Callback to Bridge** (5 sec)
"Remember what you have that attackers don't? Ground truth. This is the first demo of that principle in action."

**The Architecture** (25 sec)
→ Walk through the 4-step flow left to right
"Your baseline — stored configuration snapshot. This is YOUR truth, not Microsoft's defaults."
"Compare — pure math. Set difference. What's in current that wasn't in baseline? What's missing? What changed?"
"AI layer — translates GUIDs to human names. Makes the output readable. But notice: it never decides what changed."
"Alert — ticket in your PSA, email to your team."

**The Key Line** (10 sec)
→ Point to the green callout
"AI summarizes. Math decides. This is the guardrail sandwich in action — deterministic detection, AI enhancement."

**Dual Triggers** (10 sec)
"Two triggers: scheduled check every 42 minutes, plus real-time webhook from Microsoft's audit log. Defense in depth."

**Transition** (5 sec)
"Let me show you what this actually catches..."

⏱ ~55 seconds | 👁 "AI summarizes, math decides" is the quotable line` },

  { type: 'caCrateExample', notes: `**The Scenario** (15 sec)
"Block Legacy Authentication — one of the most critical CA policies. It stops password spray attacks that MFA can't help with."
→ Point to the before/after
"Someone set it to Report-Only. Probably 'just testing' or helping a vendor."

**The Risk** (15 sec)
"Report-Only means legacy auth is ALLOWED — it just gets logged. Attackers know this. They specifically look for this gap."
"This exact drift has been involved in multiple real M365 breaches."

**The Attribution** (10 sec)
→ Point to "Changed by"
"Notice: we know WHO made the change, WHEN, and from what. That's your ground truth at work."
"No guessing. No 'the AI thinks someone changed something.' Math found the diff. AI just made it readable."

**Landing** (5 sec)
"This is what continuous validation looks like. Your baseline catches drift before attackers exploit it."

⏱ ~45 seconds | 👁 The before/after visual should hit hard — legacy auth is a known attack vector` },

  { type: 'endpointValidation' },
  { type: 'networkSeg' },               // Slide 10
  { type: 'alertTriage' },              // Slide 11
  { type: 'evolutionRace' },            // Slide 12

  // ============================================
  // BREAK (15 min)
  // ============================================

  { type: 'break' },                    // Slide 13

  // ============================================
  // PART 3: GOVERNANCE & TRUST (35 min)
  // "How to do this without getting fired"
  // ============================================

  { type: 'governance' },               // Slide 14
  { type: 'shadowAI' },                 // Slide 15
  { type: 'failureModes' },             // Slide 16

  // Slide 17 & 18: Governance content slides (using generic ContentSlide)
  // NOTE: These are now hardcoded in separate slide components if needed
  // For now, temporarily commented as they used generic content structure

  // ============================================
  // PART 4: MONDAY MORNING (30 min)
  // "What you actually do next"
  // ============================================

  { type: 'operationalization' },       // Slide 17
  { type: 'budget' },                   // Slide 18
  { type: 'learningPath' },             // Slide 19
  { type: 'multiTenant' },              // Slide 20
  { type: 'tail' },                     // Slide 21
  { type: 'insurance' },                // Slide 22
  { type: 'takeaways' },                // Slide 23
  { type: 'sources' },                  // Slide 24
  { type: 'closing' }                   // Slide 25
];

// Re-export themes from centralized config
export { themes } from '../config/themes';
