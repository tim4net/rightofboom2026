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

  { type: 'title' },                    // 000
  { type: 'intro' },                    // 001
  { type: 'aiRiskTension', notes: `**Set up the tension** (5 sec)
"Before we dive in, let's name the elephant in the room."

**Left column - Adoption risks** (25 sec)
→ Gesture to left card
"If you let AI loose in your stack without guardrails..."
"Hallucinated fix pushed to production — AI tells your L1 to change a firewall rule. They trust it. It's wrong. Now you're explaining to a client why their VoIP died."
"One bad automation touches 50 tenants before your NOC notices."
"And your techs? They're already pasting client credentials into ChatGPT to debug scripts. That data is gone."

**Right column - Avoidance risks** (25 sec)
→ Gesture to right card
"But refusing to adopt while attackers don't? That's also losing."
"AI-generated phishing is already landing in your clients' inboxes. No grammar mistakes. Personalized from LinkedIn scrapes."
"Your L1 takes 4 hours to triage an alert. The attacker's tooling iterates in 4 seconds."
"Alert volume across your client base doubles every year. You're not doubling headcount."

**The landing** (10 sec)
→ Pause, let them feel squeezed
"Both paths lead somewhere bad."
"The answer isn't ban AI. It's not trust AI blindly either."
"It's harness it — with guardrails. That's what we're building today."

⏱ ~65 seconds | 👁 MSPs feel this tension daily — let the pause land before offering the resolution.` },  // 002
  { type: 'attackSetup', notes: `**Set the stakes** (5 sec)
"Before I show you the defenses, you need to understand why the threat landscape changed so fast."

**Walk the left column** (20 sec)
→ Gesture to 2019
"In 2019, launching a real attack required deep skills. Network protocols. Exploit development. Reverse engineering. You needed to understand OS internals."
"This wasn't script kiddie territory. It took YEARS of dedicated learning."

**Walk the right column** (15 sec)
→ Gesture to 2026
"2026. What does it take now?"
→ Pause, let them read it
"Curiosity. And a login to an LLM."
"That's it. The AI handles the rest."

**The punchline** (15 sec)
→ Tap the bottom section
"Time to first attack. Years... to minutes."
"Your nephew who got bored over winter break can now run attacks that would have required a black hat team five years ago."

**MSP reality check** (15 sec)
"For MSPs, this changes everything. The attacker pool exploded from a few thousand skilled hackers to anyone with internet access and curiosity."
"Your clients aren't being targeted by nation-states. They're being targeted by someone who watched a YouTube tutorial and asked ChatGPT to fill in the gaps."

**Bridge to demo** (5 sec)
"I'm going to prove this to you. Let's watch an AI plan an attack in real time."

⏱ ~75 seconds | 👁 "Curiosity and a login" is the line that lands — let the contrast sink in before moving on

**Q&A Prep:**
- "Isn't this fear-mongering?" → "Fair question. Let me show you — the demo is next."
- "Are script kiddies really a threat to my clients?" → "They're the volume play. Your clients won't be breached by APT29 — they'll be breached by someone running AI-generated phishing at scale."` },  // 003
  { type: 'attackLab' },                // 004
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

⏱ ~60 seconds | 👁 Make eye contact on "confidently wrong" — that's the moment that lands.` },  // 005
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

⏱ ~70 seconds | 👁 "There is no version 3.2" usually gets a knowing laugh — let it land.` },  // 006
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

⏱ ~80 seconds | 👁 The threat model shift is the 'aha moment' — pause after "prompt EXECUTION"` },  // 007
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

⏱ ~80 seconds | 👁 "Tuesday afternoon" reframes security as operational resilience — lands well with ops folks` },  // 008
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

⏱ ~75 seconds | 👁 The CAD project reveal is the 'aha' moment — pause and let it land` },  // 009

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
- "Don't attackers test against similar environments?" → "Similar, yes. But not YOUR specific config, YOUR baseline deviations, YOUR log correlations. Every environment has unique quirks."` },  // 010

  { type: 'caCrateIntro', notes: `**Transition: Introduce the Crate** (15 sec)
"Let's look at a real example of the guardrail sandwich in action."
"This is a Rewst Crate — pre-built automation you configure and deploy, no code required."

**Position It** (10 sec)
"This crate uses AI to explain security changes — but the AI is sandwiched between deterministic guardrails."
"The next slide shows exactly how it maps to the pattern we just discussed."

**Quick Context** (5 sec)
"Conditional Access policies control who can log in and how. Changes to these policies can create security gaps."
"This crate catches those changes within minutes."

⏱ ~30 seconds | 👁 Simple transition — details on next slide` },  // 011

  { type: 'm365Drift', notes: `**The Architecture** (25 sec)
→ Walk through the flow
"Your baseline — you store what the config SHOULD be. Your ground truth."
"Math — set difference. What changed? Deterministic, no guessing."
"AI — translates GUIDs to names, explains the security impact. But it never decides what changed."
"Alert — ticket in your PSA, email to your team."

**The Key Line** (10 sec)
"AI summarizes. Math decides. That's why there are no false positives from AI hallucination."

**Dual Triggers** (10 sec)
"Two triggers: scheduled checks plus real-time webhook from Microsoft's audit log."

⏱ ~45 seconds | 👁 "Math detects. AI explains. You get notified." is the quotable line

**The Sandwich Mapping** (shown with outline boxes)
"Notice the dashed boxes — they show how this maps to the guardrail sandwich."
→ Point to INPUT GUARDRAIL outline (steps 1-4)
"Everything in the amber outline is deterministic. Triggers, math comparison, GUID translation. No AI involved."
→ Point to AI LAYER outline (step 5)
"The purple layer — AI ONLY explains. It can't change what was detected."
→ Point to OUTPUT GUARDRAIL outline (steps 6-7)
"Amber again — deterministic output. Ticket created, baseline updated. Every time."

**The Payoff** (10 sec)
"Math detects. AI explains. You get notified. If you want to trust AI in production, this is how."` },  // 012

  { type: 'patternApplications', notes: `**The Template** (15 sec)
"This isn't just for Conditional Access. The same pattern works everywhere."
→ Walk through the table

**Examples** (30 sec)
"Firewall rules — math detects a new 'allow any', AI explains what you just exposed."
"Duo bypass — math detects someone's MFA is disabled, AI explains the risk window."
"Backup retention — math detects someone shortened your retention, AI explains the RPO impact."
"DNS records — math detects your DMARC changed, AI explains how email auth was weakened."

**The Landing** (10 sec)
"Same four steps every time: Baseline, Compare, Explain, Alert."
"You're not learning one tool. You're learning a pattern you can apply to anything."

⏱ ~55 seconds | 👁 Drives home the reusability of the architecture` },  // 014

  { type: 'alertTriage', notes: `**The Pattern** (15 sec)
"We've seen config drift detection. Now let's apply the same pattern to real-time security alerts."
"Impossible travel. Suspicious inbox rules. Brute force attempts. These need judgment, not just detection."

**Walk the Architecture** (40 sec)
→ Point to each layer
"INPUT: Alert arrives from your SIEM, EDR, identity provider. That's deterministic — something triggered."
"GATHER: This is key — before AI touches anything, you collect facts. Check the calendar. Check recent auth. Check the device. All API calls, all deterministic."
"AI: NOW the AI synthesizes. It has facts, not guesses. It outputs a recommendation AND a confidence score AND shows its reasoning chain."
"OUTPUT: Human approval gate. The analyst sees the recommendation, the reasoning, and decides. Approve or override."

**Why This Works** (15 sec)
"The AI isn't guessing from thin air — it's reasoning over facts you gathered."
"And it doesn't act — it recommends. The human gate catches both AI mistakes AND legitimate edge cases."

**The Takeaway** (10 sec)
"You could build this in Rewst. Alert trigger, context-gathering workflow, AI synthesis, approval form."
"Same sandwich, different filling."

⏱ ~80 seconds | 👁 "Facts gathered, AI synthesizes, human decides" is the quotable line` },  // 015

  { type: 'tieredResponse', notes: `**Transition from Alert Triage** (10 sec)
"So we have alerts coming in, context gathered, AI synthesizing. But here's the question everyone asks: When does the AI just ACT versus when do I need to approve?"
"The answer isn't yes or no — it's a tiered model."

**Walk the Decision Formula** (15 sec)
→ Point to the formula bar
"Two variables: confidence percentage and impact level. Combine them, you get your tier."
"High confidence plus low impact? Auto-execute. Uncertain or high stakes? Human in the loop."

**AUTO-EXECUTE Column** (25 sec)
→ Point to the green column
"Green means go. These are low-risk, high-confidence actions."
"Block an IP that's on your threat intel blocklist — 100% confidence, zero business impact. Why wait for approval?"
"Quarantine a phishing email. Send a 'was this you?' notification. Add someone to an MFA challenge group."
"These happen in seconds. If you're wrong, the blast radius is tiny."

**HUMAN APPROVAL Column** (25 sec)
→ Point to the amber column
"Amber means pause. Either we're not sure enough, or the action matters enough to verify."
"Disabling an account — that's business impact. What if it's the CEO traveling?"
"Isolating an endpoint — that's someone's workday stopped. Worth a 30-second check."
"These aren't 'AI can't handle it.' These are 'a human adds context faster than we can automate it.'"

**ALWAYS HUMAN Column** (25 sec)
→ Point to the red column
"Red means stop. No matter how confident the AI is, some actions require human judgment."
"VIP actions — executives, board members. The reputational risk alone requires a human."
"Mass actions — disabling 50 accounts? That's not alert response, that's incident response."
"Permanent deletions. Firewall changes. Production isolation. These are irreversible or high-blast-radius."
→ Land it: "The AI can recommend. But a human pulls the trigger."

**The Landing** (10 sec)
"Confidence sets the threshold — how sure are we? Impact sets the stakes — what happens if we're wrong?"
"Design your automation with both in mind."

⏱ ~110 seconds | 👁 "A human pulls the trigger" is the memorable phrase for high-impact actions

**Q&A Prep:**
- "Who decides the thresholds?" → "You do. Start conservative — 95% for auto-execute. Lower it as you build trust in specific detections."
- "What about after-hours?" → "Great question. Some orgs auto-execute more aggressively off-hours when human response is slow. Others get more conservative. Depends on your risk tolerance."
- "Doesn't this slow things down?" → "Auto-execute tier handles volume. Human tiers handle judgment. You're not slowing down the 90% — you're adding quality to the 10%."` },  // 016

  // ============================================
  // BREAK (15 min)
  // ============================================

  { type: 'break' },                    // 017

  // ============================================
  // PART 2.5: ENDPOINT PROTECTION TESTING (new)
  // "Safely test endpoint detection"
  // ============================================

  { type: 'safeEndpointTesting', notes: `**Tension-Building Opener** (15 sec)
"Welcome back. Let me ask you a question:"
→ Pause, make eye contact
"How do you KNOW your endpoint defenses actually work?"
"You deployed Defender. You enabled ASR. You checked the boxes."
"But did you TEST it? Most MSPs have never validated whether their hardening actually stops attacks."

**Introduce Atomic Red Team** (30 sec)
→ Walk through the three columns
"Atomic Red Team is how you validate. Real attack simulations, safely executed."
"Mapped to MITRE ATT&CK — every test corresponds to a documented technique."
"Self-contained with built-in cleanup. No persistent modifications, no mess."

**The STAR Moment** (15 sec)
→ Tap the value proposition box
"This is $50K worth of red team testing — free, open source."
"The same techniques Fortune 500 companies pay consultants to run."
"You can run these Monday morning."

**The Hook** (10 sec)
"We automated the critical checks into about 1,200 lines of PowerShell."
"Let me show you the actual code..."

⏱ ~70 seconds | 👁 "How do you KNOW?" is the tension builder. "$50K, free" is the STAR moment.` },  // 018

  { type: 'powershellCode', notes: `**Show the Real Code** (60-90 sec)
"Let me show you what's actually running. No black box. No magic."
→ The full script loads with syntax highlighting — scroll through it

**Scroll through key sections** (as audience interest dictates)
→ Lines 1-30: Help documentation and parameters
→ Lines 80-125: Add-TestResult function — how every check is recorded
→ Lines 210-300: Antivirus category — EICAR test, exclusion audit
→ Lines 465-575: ASR rules — all 15 critical rules validated
→ Lines 580-680: Credential protection — LSASS, Credential Guard, WDigest
→ Lines 680-820: Network security — firewall, SMB signing, LLMNR
→ Lines 1160-1246: Main execution and JSON output

**The Point** (20 sec)
"This is 1,246 lines of PowerShell. No AI in the detection loop."
"You can read every line. You can audit every check. You can fork it and customize it."
"That's the 'deterministic' in 'deterministic detection.'"

**Transition** (10 sec)
"Now you've seen the code. Let me show you what it actually checks..."

⏱ ~60-90 seconds | 👁 Don't read every line — scroll to show scale, pause on interesting bits` },  // 018b

  { type: 'attackerChecklist', notes: `**The Attacker's Checklist** (15 sec)
"When an attacker lands on an endpoint, they run recon. These are the exact 23 things they check."
→ Pause: "We check the same things. We just check faster."

**Walk the Columns** (50 sec)
→ Point to each column, left to right
"Can I Stay Hidden? — AV status, exclusions, ASR rules, logging. Weak here = malware runs undetected."
"Can I Steal Credentials? — LSASS protection, Credential Guard, WDigest. The keys to every account."
"Can I Spread? — LLMNR, NetBIOS, SMB signing. One machine becomes the whole network."
"Can I Hold Data Hostage? — BitLocker, backups, recovery. Your ransomware resilience."

**The Key Numbers** (15 sec)
→ Point to the badge at the bottom
"23 checks. 60 seconds. Pure PowerShell. We check faster than they do."
"No agent required. Works on any Windows endpoint."
"But raw data isn't actionable..."

⏱ ~80 seconds | 👁 "We check the same things. We just check faster." is the competitive framing` },  // 019

  { type: 'endpointSandwich', notes: `**Connect to the Architecture** (10 sec)
"Remember the guardrail sandwich from earlier? This is how Safe Sweep implements it."
"Same architecture, applied to endpoint validation."

**Walk the Layers** (45 sec)
→ Point to each layer, top to bottom
"INPUT: PowerShell runs 23 checks, outputs JSON. Deterministic, read-only, no AI involved."
"AI LAYER: Claude or GPT analyzes the JSON. Correlates findings. Grades severity. Explains in plain English."
→ Pause, tap the AI layer: "But notice — AI only processes structured data. It never touches the endpoint."
"OUTPUT: Human reviews the graded report. Approves remediation. Takes action."

**The Trust Callout** (15 sec)
→ Point to the green box at the bottom
"This is the key insight: No AI touches the endpoint."
"PowerShell detects. AI explains. Human acts."

**Why This Matters** (10 sec)
"The AI can hallucinate an explanation — that's fixable. It CAN'T hallucinate a detection."
"The detections are deterministic. That's your ground truth."

⏱ ~80 seconds | 👁 "PowerShell detects. AI explains. Human acts." is the tagline they should remember` },  // 020

  { type: 'safeSweepResults', notes: `**The Transformation Arc** (10 sec)
"60 seconds to scan. And then you KNOW."
"Here's what that knowledge looks like."

**The F Grade** (20 sec)
→ Point to the left side, the big red F
"54 out of 100. This is a lab run across 3 test endpoints."
"Same gaps you'll find in real client environments. EICAR failed, ASR not enforced, Credential Guard disabled."
"These aren't hypothetical — these are exploitable attack paths."

**The AI-Generated Findings** (30 sec)
→ Walk through the center cards
"The AI translates each technical finding into plain English."
"EICAR Failed — means AV isn't stopping known threats."
"ASR Not Enforced — 0 rules in Block mode, attackers have free path."
"Credential Guard Disabled — memory-resident passwords unprotected."
→ Point to purple box: "And it includes remediation steps. PowerShell commands, GPO paths, Microsoft docs links."

**The Stats** (10 sec)
"3 endpoints. 29 tests passed. 24 failed. Now let me show you the full report..."

⏱ ~70 seconds | 👁 "Now we KNOW" is the insight — the F is the beginning, not the end` },  // 021

  { type: 'safeSweepReportDemo', notes: `**Show the Real Report** (60-90 sec)
"This is the actual output from our lab run. Real data, real findings."

→ Let the audience absorb the report layout
"Executive Summary — AI-generated, explains the business impact."
"Critical Findings — prioritized by actual risk, not just alphabetical."
"Remediation Steps — deterministic, copy-paste commands from validated baselines."

**Key Insight** (15 sec)
"Notice the separation: AI writes the narrative, but the remediation commands come straight from the script."
"No hallucinated PowerShell. No made-up GPO paths."

**Transition** (10 sec)
"This is what your clients receive. Now let's validate these gaps are real with Atomic Red Team..."

⏱ ~90 seconds | 👁 Let them read the actual report — it's real data, not mockup` },  // 021b

  { type: 'attackPathValidator', notes: `**THIS IS THE MAIN DEMO** (15-20 min interactive)

**Setup** (before presentation)
- Have a Windows VM ready with intentional gaps:
  - ASR rule for LSASS disabled
  - C:\\Temp excluded from Defender
  - Shared local admin account "helpdesk"
  - PowerShell script block logging disabled
- Atomic Red Team installed: Install-Module -Name invoke-atomicredteam
- Claude/ChatGPT tab open

**Phase 1: Collect** (2 min)
→ Run endpoint-collector.ps1 on the VM
"This script reads your endpoint config — ASR rules, exclusions, local admins, logging."
"No changes, just collection. Let's see what we find."
→ Show the output, highlight the gaps

**Phase 2: Analyze** (3 min)
→ Copy the JSON output, paste into Claude/GPT with the prompt
"This is exactly what an attacker does with recon data. Let's see what AI recommends."
→ Wait for the attack path to generate
"Notice — it mapped each gap to a specific exploit technique."

**Phase 3: Attack Path** (3 min)
→ Walk through the generated attack path
"Step 1: Drop payload to excluded path. Step 2: Dump LSASS. Step 3: Move laterally with shared creds."
"These aren't hypothetical — these are the exact techniques that work against THIS config."

**Phase 4: Validate** (5-8 min)
→ Actually run Atomic Red Team tests on the VM
"Let's prove these gaps are exploitable."
→ Run T1003.001 (LSASS dump)
"If the attack succeeds, the gap is real. If it's blocked, our defenses caught it."
→ Mark each test result in the UI

**Phase 5: Results** (2 min)
→ Show the summary
"We just used AI the way attackers do — to find and validate exploitable gaps."
"The difference? We found them first."

**The Landing**
"This is a repeatable process. Run it after every config change. Run it quarterly at minimum."
"Your endpoint config changes. Your attack surface changes with it. Know before attackers do."

⏱ ~15-20 minutes | 👁 This is the "Think Like an Attacker" payoff — make it count

**Q&A Prep:**
- "Isn't this dangerous?" → "Atomic Red Team tests are safe simulations — they log what WOULD happen without actually extracting creds or dropping malware."
- "Can I run this on production?" → "Start in a lab. Once you trust it, run collection-only on production, testing in lab that mirrors production config."
- "What if AI gives bad advice?" → "You validate with real tests. The AI suggests, Atomic proves, you decide."` },  // Demo (no numbered file)

  // ============================================
  // PART 3: GOVERNANCE & TRUST (35 min)
  // "How to do this without getting fired"
  // ============================================

  { type: 'governance' },               // 022
  { type: 'shadowAI' },                 // 023
  { type: 'failureModes' },             // 024

  { type: 'aiTabletop', notes: `**Transition from Failure Modes** (10 sec)
"We've talked about how AI can fail. Now let's talk about preparing your team for it."
"How many of you run tabletop exercises? How many include AI scenarios?"

**The Gap Analysis** (30 sec)
→ Walk through the left column
"Traditional tabletops assume things that don't hold anymore."
"Phishing has tells — not when AI writes it. Perfect grammar, personalized from LinkedIn scrapes."
"Voice verification works — not when the attacker clones your CFO's voice in 3 seconds."
"Data stays where you put it — not when your techs paste client data into ChatGPT."
"Clear forensic artifacts — AI attacks may leave nothing to find."

**Scenarios to Add** (25 sec)
→ Point to right column
"Shadow AI data leak — employee pastes PII into ChatGPT. What's your response?"
"Deepfake CFO call — AI-cloned voice authorizes urgent wire transfer. How do you verify?"
"Prompt injection — malicious input hijacks your customer-facing AI. Who's liable?"

**The Key Insight** (10 sec)
→ Tap the bottom callout
"Traditional IR assumes reproducibility. LLMs don't comply."
"You can't re-run the prompt and get the same bad output. Your team needs to practice responding to incidents they can't fully explain."

⏱ ~75 seconds | 👁 "LLMs don't comply" is the memorable punchline` },  // 025

  // ============================================
  // PART 4: MONDAY MORNING (30 min)
  // "What you actually do next"
  // ============================================

  { type: 'operationalization' },       // 026
  { type: 'budget' },                   // 027
  { type: 'learningPath' },             // 028
  { type: 'multiTenant' },              // 029
  { type: 'tail' },                     // 030
  { type: 'insurance' },                // 031
  { type: 'takeaways' },                // 032
  { type: 'sources' },                  // 033
  { type: 'closing' }                   // 034
];

// Re-export themes from centralized config
export { themes } from '../config/themes';
