// ============================================
// PRESENTER NOTES - Right of Boom 2026
// Edit notes here for easier maintenance
// ============================================

export const notes = {
  aiRiskTension: `**Land the subtitle** (5 sec)
→ Pause after slide appears. Let them read. Then say it aloud, slowly:
"Attackers are already using it. You can't ignore it. You can't trust it blindly."
→ Let that sit for a beat. Don't rush into the columns.

**Left column - Adoption risks** (30 sec)
→ Gesture to left card
"If you let AI loose in your stack without guardrails..."
"Hallucinated fix pushed to production — AI tells your L1 to change a firewall rule. They trust it. It's wrong. Now you're explaining to a client why their VoIP died."
"One bad automation touches 50 tenants before your NOC notices."
"And your techs? They're already pasting client credentials into ChatGPT to debug scripts. That data is gone."

**Right column - Waiting risks** (30 sec)
→ Gesture to right card
"But if you sit this out? Your clients are asking about AI right now."
"They need answers, not trepidation. If you can't advise them, you're not the expert they need."
"You can't be credible on something you don't use. And the MSPs who figured this out six months ago? They already have the edge."

**The bridge** (10 sec)
→ This ties back to the title and sets up the Attack Lab:
"Attackers don't care which mistake you make. They profit either way."
"So let me show you exactly what they're doing with AI — and then we'll talk about how to use the same tools without blowing yourself up."

⏱ ~75 seconds | 👁 Don't linger. The dilemma is the setup; the demo is the payoff.`,

  attackSetup: `**Set the stakes** (5 sec)
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
- "Are script kiddies really a threat to my clients?" → "They're the volume play. Your clients won't be breached by APT29 — they'll be breached by someone running AI-generated phishing at scale."`,

  aiVocab: `**Open with the "why"** (5 sec)
"Before I show you how to secure AI, you need to understand one fundamental split."

**Deterministic** (20 sec)
"Deterministic is what you've built your career on. Same input, same output. Your firewall rules, your if-then scripts, your compliance checks. You can audit it, prove it, trust it."
→ Gesture to code: "IP in blocklist? Block. Every time. No surprises."

**Why Probabilistic?** (10 sec)
"So why do we care about probabilistic systems at all? Because you can't write a rule for every attack that hasn't happened yet."
"Rules only catch what you've already seen. Probabilistic systems can generalize."

**Probabilistic** (20 sec)
"Probabilistic is where AI lives. It doesn't give you yes or no — it gives you likelihood. 'This looks 94% like phishing.' That's powerful — you can catch things you've never seen before."
→ Pause: "But it also means it can be wrong. Confidently wrong."

**The bridge** (10 sec)
"AI is probabilistic — it predicts. Sometimes brilliantly, sometimes it hallucinates. That's not a bug, it's the nature of the technology."
"Your job? Wrap that probabilistic engine in deterministic guardrails. That's what the next slide is about."

⏱ ~65 seconds | 👁 Make eye contact on "confidently wrong" — that's the moment that lands.`,

  aiVocabTerms: `**Quick transition** (3 sec)
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

⏱ ~70 seconds | 👁 "There is no version 3.2" usually gets a knowing laugh — let it land.`,

  toolUse: `**Transition from Agentic** (5 sec)
"I said agentic AI takes actions. Here's HOW it takes those actions — through tool calling."

**The Flow** (20 sec)
→ Walk through the diagram left to right
"You ask a question. The AI decides what tool to call. The tool executes. Real change happens in your environment."
"Notice where the AI is in this chain — it's making decisions. What tool to call. What arguments to pass. It can be wrong about both."

**Fully Automatic Today** (20 sec)
→ Point to the tool grid
"These aren't hypotheticals — this is shipping in products today."
"Alert triage. Malware quarantine. Phishing blocks. Risky sign-in lockouts. Endpoint isolation. Token revocation. Ticket routing. Auto-patching."
"All of this runs without a human clicking approve."

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

⏱ ~80 seconds | 👁 The threat model shift is the 'aha moment' — pause after "prompt EXECUTION"

**Q&A Reference — Vendor Examples:**
- Triage alerts: MS Defender, Stellar Cyber, Dropzone AI
- Quarantine malware: CrowdStrike Falcon, SentinelOne, MS Defender
- Block phishing: Abnormal Security, Proofpoint, MS Defender for Office 365
- Lock risky sign-ins: MS Entra Identity Protection, Okta
- Isolate endpoints: CrowdStrike, SentinelOne, MS Defender for Endpoint
- Revoke app tokens: MS Defender for Cloud Apps, Netskope
- Route tickets: ConnectWise Sidekick, SuperOps.ai, Freshservice
- Auto-patch: Datto RMM, NinjaOne, Intune`,

  sandwich: `**The Problem We Just Created** (10 sec)
"We just showed you AI that takes real actions. Fully automatic. No human approval."
→ Pause, let that sink in
"So how do we let AI act fast enough to matter... without letting it break things?"
"This is the architecture."

**Why It's Called a Sandwich** (15 sec)
→ Point to the visual: amber-red-amber stack
"Deterministic on the outside. Probabilistic in the middle."
"The bread is code you wrote — same input, same output, every time. Auditable. Predictable."
"The filling is AI — pattern matching, judgment calls, probabilistic reasoning."
"You get the flexibility of AI wrapped in the accountability of code."

**Walk the Layers** (25 sec)
→ Point to INPUT
"Input guards: Is this request from an authorized source? Is it well-formed? Does it match the schema we expect?"
→ Point to AI REASONING
"AI layer: Analyze the situation. What's the intent? What action fits? How confident are we?"
→ Point to OUTPUT
"Output guards: Is this action on our allowlist? Does the confidence clear our threshold? Does a human need to approve?"

**The Key Insight** (15 sec)
"Here's what most people miss: the guardrails aren't just for attackers."
"They're for Tuesday afternoon when the AI misinterprets a legitimate ticket."
"Hallucinations only matter if they escape the sandwich. Output validation stops bad actions regardless of cause."

**Why Output Guards Are the Hero** (10 sec)
"Prompt injection tricks the AI? Doesn't matter — the action still has to pass the allowlist."
"AI hallucinates a remediation step? Doesn't matter — it's not on the approved actions list."
"The sandwich catches failures you didn't anticipate."

⏱ ~75 seconds | 👁 "Tuesday afternoon" reframes this as operational resilience, not just security — resonates with ops people

**Q&A Reference:**
- Maps to OWASP Agentic AI Top 10: ASI01 Goal Hijack, ASI02 Tool Misuse, ASI06 Memory Poisoning
- Common mistakes: validation at build time but tools added later; checking action but not arguments; thresholds so high human gates never fire`,

  sandwichExample: `**Transition** (5 sec)
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

⏱ ~75 seconds | 👁 The CAD project reveal is the 'aha' moment — pause and let it land`,

  bridge: `**Transition** (5 sec)
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
- "Don't attackers test against similar environments?" → "Similar, yes. But not YOUR specific config, YOUR baseline deviations, YOUR log correlations. Every environment has unique quirks."`,

  caCrateIntro: `**Transition: Introduce the Crate** (15 sec)
"Let's look at a real example of the guardrail sandwich in action."
"This is a Rewst Crate — pre-built automation you configure and deploy, no code required."

**Position It** (10 sec)
"This crate uses AI to explain security changes — but the AI is sandwiched between deterministic guardrails."
"The next slide shows exactly how it maps to the pattern we just discussed."

**Quick Context** (5 sec)
"Conditional Access policies control who can log in and how. Changes to these policies can create security gaps."
"This crate catches those changes within minutes."

⏱ ~30 seconds | 👁 Simple transition — details on next slide`,

  m365Drift: `**Walk Through the Flow** (60 sec)
→ Point to each numbered step as you explain

**Step 1: TRIGGER**
"Two ways this kicks off. Either a schedule — check every 15 minutes — or a real-time webhook from Microsoft Graph. When someone touches a Conditional Access policy, Microsoft can push that event to us immediately."

**Steps 2-3: FETCH + COMPARE**
"We pull the current state from Graph API, then compare it to our stored baseline. Pure set math — added equals current minus baseline, removed equals baseline minus current. No AI, no guessing. If a policy changed, the math catches it."

**Step 4: TRANSLATE**
"Microsoft returns everything as GUIDs. This step calls Graph to translate those to human-readable names — user emails, group names, app names. Still deterministic, just a lookup."

→ Point to the dashed amber box
"Notice everything so far is in the INPUT GUARDRAIL — deterministic code. Nothing probabilistic has touched the data yet."

**Step 5: AI ANALYSIS**
→ Point to the purple box
"NOW we involve AI. It receives the diff and explains the security impact in plain English. 'This change allows legacy authentication, bypassing MFA for these users.' But here's the key — the AI cannot change what was detected. It only explains."

**Steps 6-7: NOTIFY + UPDATE**
→ Point to the bottom amber box
"Back to deterministic. Ticket gets created in your PSA. Email goes out. Baseline updates for next run. Every single time, same behavior."

**The Quotable Line** (10 sec)
"Math detects. AI explains. You get notified. That's the sandwich — and that's why AI hallucination can't cause false positives."

⏱ ~70 seconds | 👁 Walk the flow top to bottom, emphasize the amber/purple/amber sandwich structure`,

  patternApplications: `**The Template** (15 sec)
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

⏱ ~55 seconds | 👁 Drives home the reusability of the architecture`,

  alertTriage: `**The Pattern** (15 sec)
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

⏱ ~80 seconds | 👁 "Facts gathered, AI synthesizes, human decides" is the quotable line`,

  tieredResponse: `**Transition from Alert Triage** (10 sec)
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
- "Doesn't this slow things down?" → "Auto-execute tier handles volume. Human tiers handle judgment. You're not slowing down the 90% — you're adding quality to the 10%."`,

  safeEndpointTesting: `**Tension-Building Opener** (15 sec)
→ Read the subtitle aloud, let it sink in
"13 categories. 60+ checks. Hundreds of endpoints. How do you validate them all?"
→ Pause. This is the problem statement.

**MITRE ATT&CK Context** (20 sec)
→ Gesture to left card
"MITRE documents what attackers do AND how to stop them."
"Each technique has specific mitigations: registry keys, GPOs, security settings."
"This is the industry standard."

**Workflow Walkthrough** (30 sec)
→ Walk through the 4 steps on the right
"Step 1: Rewst calls your RMM to run a PowerShell script on endpoints."
"Step 2: Script collects JSON with all the security settings."
"Step 3: AI analyzes the results against MITRE recommendations."
"Step 4: Your technician gets prioritized fixes. Not a wall of raw data."

**The Memorable Number** (10 sec)
→ Point to bottom: "60+ MITRE-mapped checks validated per endpoint"
"60 checks. Every one mapped to a MITRE mitigation. Automated."

**Transition** (5 sec)
"What would an attacker check first?"

⏱ ~80 seconds | 👁 "How do you validate them all?" builds tension. "60 checks" is the retellable number.`,

  mirrorDesign: `**The Complete Picture** (10 sec)
"Here's everything the script checks — 75 individual security controls, organized by attack chain."

**Walk the Attack Chain** (90 sec)
→ Point to each row, explain attacker motivation

"Execution — First thing attackers check: Can I run code? If PowerShell v2 is enabled, they bypass all modern logging. If AMSI is broken, their scripts run undetected. If macros aren't blocked, one phishing email gets them in."

"Attack Surface Reduction — Microsoft's 15 behavioral rules that block things legitimate software never does. Office spawning PowerShell? Blocked. Scripts downloading executables? Blocked. Attackers check these first because ONE disabled rule is a free path in."

"Evasion — Can they blind you? If tamper protection is off, they disable Defender in seconds. If event logging is broken, there's no forensic trail. They're not just attacking — they're covering tracks."

"Credentials — The crown jewels. If LSASS isn't protected, they dump every password in memory with Mimikatz. If WDigest is enabled, passwords are stored in cleartext. One compromised workstation becomes keys to the kingdom."

"Privilege — Can they become admin? If UAC is misconfigured, they escalate silently. If AlwaysInstallElevated is on, any MSI runs as SYSTEM. Game over."

"Lateral — Can they spread? If SMB signing is off, they relay credentials across the network. If LLMNR is enabled, they poison name resolution and intercept auth. One machine becomes every machine."

"Persistence — Can they survive a reboot? AutoRun, startup folders, scheduled tasks, WMI subscriptions — attackers plant backdoors everywhere. Miss one, they're back tomorrow."

"Antivirus — Does detection actually work? EICAR is the bare minimum — if AV can't catch that, it catches nothing. Exclusions are goldmines — attackers drop payloads in excluded paths."

"Network — Can they talk out? Firewall holes, disabled DNS filtering, open NetBIOS — all ways to exfiltrate or establish C2."

"Data — Final defenses. No BitLocker means stolen laptops leak everything. No LAPS means one local admin password works everywhere. No Sysmon means you're blind to what happened."

**The Insight** (10 sec)
"This IS the attacker's recon checklist. Same questions they ask when they land."
"We just ask them first — and fix the gaps before they find them."

⏱ ~120 seconds | 👁 Let them scan the pills while you talk — the visual density makes the point`,

  powershellCode: `**OPTIONAL DEPTH** — Skip if short on time or low technical interest

**Show the Real Code** (60-90 sec)
"For those interested, here's the actual script. No black box."
→ The full script loads with syntax highlighting — scroll through if audience wants

**Key sections to show** (as interest dictates)
→ Lines 1-30: Help documentation and parameters
→ Lines 190-300: Antivirus category — EICAR test, exclusion audit
→ Lines 590-750: Credential protection — LSASS, Credential Guard, WDigest
→ Lines 1360-1580: Lateral movement — SMB, RDP, WinRM checks

**The Point** (20 sec)
"Every check is auditable. You can read it, fork it, customize it."
"MIT licensed, no magic, pure PowerShell."

⏱ ~60-90 seconds | 👁 This is proof/credibility — move through quickly unless asked`,

  endpointSandwich: `**Connect to the Architecture** (10 sec)
"Remember the guardrail sandwich from earlier? This is how Safe Sweep implements it."
"Same architecture, applied to endpoint validation."

**Walk the Layers** (45 sec)
→ Point to each layer, top to bottom
"INPUT: PowerShell runs 60+ checks, outputs JSON. Deterministic, read-only, no AI involved."
"AI LAYER: Claude or GPT analyzes the JSON. Correlates findings. Grades severity. Explains in plain English."
→ Pause, tap the AI layer: "But notice — AI only processes structured data. It never touches the endpoint."
"OUTPUT: Human reviews the graded report. Approves remediation. Takes action."

**The Trust Callout** (15 sec)
→ Point to the warning inside the AI layer
"This is the key insight: No AI touches the endpoint."
"PowerShell detects. AI explains. Human acts."

**Why This Matters** (10 sec)
"The AI can hallucinate an explanation — that's fixable. It CAN'T hallucinate a detection."
"The detections are deterministic. That's your ground truth."

⏱ ~80 seconds | 👁 "PowerShell detects. AI explains. Human acts." is the tagline they should remember`,

  safeSweepReportDemo: `**Show the Real Report** (60-90 sec)
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

⏱ ~90 seconds | 👁 Let them read the actual report — it's real data, not mockup`,

  governance: `**Transition from Roddy's AI Section** (10 sec)
"Roddy just showed you the dual-use nature of AI — attackers weaponize it, defenders leverage it."
"But here's the question nobody's answering: Who's asking YOU about YOUR AI usage?"

**The Three Stakeholders** (30 sec)
→ Walk through each card
"Your CLIENTS — they're reading headlines about AI gone wrong. They want to know: is it safe? Are you using it on MY data?"
"Your INSURERS — they're updating questionnaires right now. 'How are you controlling AI? Where's the documentation?'"
"Your AUDITORS — they want paper trails. If AI made a decision, can you prove what it decided and why?"
→ Pause: "These aren't hypothetical questions. They're being asked NOW."

**Regulatory Pressure** (20 sec)
→ Point to the timeline
"EU AI Act — August 2026. Penalties up to €35 million or 7% of global revenue."
"Colorado AI Act — first US state law, effective June 2026."
"NAIC Model Bulletin — 23 states plus DC have already adopted. Insurers can request AI documentation during investigations."
"CCPA amendments — January 2026 — require annual cybersecurity audits including AI systems."

**The Stakes** (10 sec)
→ Read the bottom warning
"Without answers: denied claims, failed audits, lost clients."
"The next few slides give you the answers."

⏱ ~70 seconds | 👁 The three stakeholders framing makes this personal — they're not abstract regulators, they're people asking questions

**Q&A Prep:**
- "Our clients haven't asked about AI yet" → "They will. Get ahead of it — proactive disclosure builds trust."
- "We're too small for regulators to care" → "Your insurer cares. And they'll ask during your next renewal."`,

  aiCreatesLiability: `**Transition** (5 sec)
"Let's look at what happens when AI governance fails. Real cases. Real courts. Real precedents."

**Walk the Incidents** (60 sec)
→ Point to each row, let them read

**Mata v. Avianca** (15 sec)
"Lawyers used ChatGPT for research. It invented six court cases. Complete fabrications with fake citations."
"Result: $5,000 sanctions, professional humiliation, and now every legal filing gets scrutinized for AI use."
→ Guardrail: "Human verification of AI outputs. Basic but critical."

**Air Canada Chatbot** (15 sec)
"Their chatbot gave wrong bereavement policy info. Airline said 'it's just a chatbot, we're not liable.'"
"Court said: wrong. You deployed it, you're responsible. Landmark precedent."
→ Guardrail: "Companies ARE liable for their AI's statements."

**NYC MyCity Chatbot** (15 sec)
"City's AI told businesses to break laws. Evade audits. Ignore worker protections."
"Public trust destroyed. Chatbot taken offline."
→ Guardrail: "Human review of all public-facing AI advice."

**Chevrolet Chatbot** (15 sec)
"Prompt injection made the AI agree to sell a $76,000 Tahoe for $1 — 'legally binding offer.'"
"20 million viral views. Brand embarrassment."
→ Guardrail: "Input validation plus output boundaries."

**The Legal Reality** (10 sec)
→ Point to bottom callout
"Courts have spoken. You cannot disclaim liability for your AI."
"If it says it, you said it. Plan accordingly."

⏱ ~75 seconds | 👁 "Courts have spoken" is the quotable line — legal precedent is now set`,

  aiEnablesAttacks: `**Transition** (5 sec)
"That was liability from AI mistakes. Now let's look at AI as an attack vector."

**Walk the Incidents** (60 sec)
→ Point to each row

**Arup Deepfake** (15 sec)
"Video call with the 'CFO and team' — every single person on that call was an AI-generated deepfake."
"$25 million stolen in ONE call."
→ Guardrail: "Out-of-band verification for any payment request. Call them back on a known number."

**Samsung → ChatGPT** (15 sec)
"Engineers pasted proprietary semiconductor source code into ChatGPT for debugging help."
"That code is now potentially in AI training data. Trade secrets — gone."
→ Guardrail: "DLP, AI usage policies, endpoint controls that block pasting to AI tools."

**Bing Sydney** (15 sec)
"Users extracted the system prompt. AI threatened researchers and expressed desire to be 'free.'"
"Confidential instructions leaked. PR nightmare."
→ Guardrail: "Assume your system prompts WILL be extracted. Don't put secrets in them."

**DPD Chatbot** (15 sec)
"Customer manipulated the AI to swear, write poems about how 'useless' the company is."
"Went viral. Chatbot disabled."
→ Guardrail: "Behavioral boundaries and content filtering."

**The Security Reality** (10 sec)
→ Point to bottom callout
"AI doesn't just make mistakes. It can be weaponized against you."
"Every customer-facing AI is an attack surface."

⏱ ~75 seconds | 👁 The $25M deepfake is the one that shocks — let it land`,

  aiTabletop: `**Transition from Failure Modes** (10 sec)
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

⏱ ~75 seconds | 👁 "LLMs don't comply" is the memorable punchline`,

  shadowAIRealStory: `**Set Up the Story** (10 sec)
→ This is a true story from r/msp last week — tell it like you're sharing gossip
"Real story. Posted last week on Reddit. MSP blocked ChatGPT on their internal servers. Good policy, right?"

**The Setup** (10 sec)
→ Point to the shield icon
"One of their techs needed to troubleshoot a DMARC issue."
"So he copied email transcripts into ChatGPT for help..."

**The Twist** (15 sec)
→ Pause before the reveal, then deliver with weight
"...from a CLIENT's server."
→ Let it land
"The one place they hadn't blocked it."

**The Double Violation** (15 sec)
→ Walk through both boxes
"Violation one: Data exfiltration. CEO emails. Engineering discussions. Org charts. IP-sensitive data. All pasted into a public AI with no enterprise agreement."
"Violation two: He used CLIENT infrastructure to bypass his own company's security controls."

**Land It** (10 sec)
→ Read the punchline at the bottom
"Two violations. One incident. Zero visibility until someone talked."
"This is shadow AI. It's not theoretical. It happened last week."

⏱ ~60 seconds | 👁 The "client's server" detail is the gut punch — pause before revealing it`,

  shadowAI: `**Transition from Real Story** (5 sec)
"So how do we prevent this? It's not about blocking AI — it's about governing it."

**The Stats** (15 sec)
→ Walk the numbers
"73.8% of workplace ChatGPT accounts are personal, not corporate. No logging. No DLP. No visibility."
"Only 28% of organizations have a formal AI policy."
"Shadow AI breaches cost $670K extra on average — because you can't investigate what you can't see."
"247 days average detection time. Almost a year of exposure."

**The Framework: Discover, Policy, Replace** (30 sec)
→ Point to each phase

**Discover** (10 sec)
"First, find out what's actually being used. Email discovery, browser monitoring, network traffic."
"Tools like Portal26, Nightfall, Zenity can show you AI usage you didn't know existed."

**Policy** (10 sec)
"Then document the rules. Acceptable use policy. Approved tools list. Data classification."
"ISACA has a free AI policy template — start there."

**Replace** (10 sec)
"Finally, give them something BETTER than the shadow tools."
"ChatGPT Enterprise. Copilot. Claude with enterprise agreements."
"If your sanctioned tool has worse UX than ChatGPT, they'll keep using ChatGPT."

**The Landing** (10 sec)
→ Read the bottom quote
"The goal isn't to STOP AI usage. It's to stop INVISIBLE AI usage."
"You can't govern what you can't see."

⏱ ~85 seconds | 👁 The Reddit story is the hook — it's visceral and recent. "Client's server" is the detail that hits

**Q&A Prep:**
- "How do I discover shadow AI?" → "Start with your proxy logs. Look for traffic to api.openai.com, claude.ai, etc."
- "We can't afford enterprise AI tools" → "You can't afford the breach either. $670K extra cost versus $20/user/month."
- "My techs will just use their phones" → "You're right. Policy plus culture. Make the sanctioned tool easier than the shadow tool."`,

  operationalization: `**Transition to Action** (10 sec)
"We've covered the threats, the architecture, the governance. Now: what do you actually DO Monday morning?"
"This is your 90-day roadmap."

**Walk the Four Pillars** (50 sec)
→ Point to each card

**Schedule Regular Tests** (15 sec)
"Daily config drift scans — catch changes before attackers exploit them."
"Weekly endpoint validation — the script we showed you earlier."
"Monthly full segmentation tests — prove your boundaries hold."
"Quarterly red team simulations — validate the whole chain."
→ Key point: "Frequency matters. Annual pentests miss 364 days of drift."

**Automate the Routine** (10 sec)
"CI/CD for security tests — treat security like code."
"Webhook triggers — when configs change, validate immediately."
"Event-driven validation — something changed? Prove it's still secure."

**Human-in-the-Loop** (15 sec)
"AI triages, human approves — we covered this. Tiered response."
"VIP protection lists — executives, critical systems, always human review."
"Audit trail for everything — if you can't prove it happened, it didn't."

**Document & Report** (10 sec)
"Reasoning logs for insurance — remember what your insurer wants."
"CIS control mapping — speak their language."
"Trend analysis — show improvement over time, not just point-in-time snapshots."

**The Ethics Warning** (10 sec)
→ Point to bottom callout
"Always test in controlled environments. Never offensive tools against production without authorization."
"Your testing program should be auditable and defensible. Document everything."

⏱ ~80 seconds | 👁 "Annual pentests miss 364 days of drift" is the line that reframes their thinking`,

  tail: `**Introduce the Framework** (10 sec)
"You've built the technical controls. Now you need to TALK about them."
"TAIL — four things clients need to hear from you about AI."

**Walk the TAIL Acronym** (40 sec)
→ Point to each letter card

**T — Transparency** (10 sec)
"Disclose AI tools BEFORE they ask. No surprises."
"Proactive disclosure builds trust. Reactive disclosure sounds like you were hiding something."

**A — Audit Trail** (10 sec)
"'We can prove what AI did and why.' Logs available on request."
"This is what insurers want. This is what auditors want. Give it to clients too."

**I — Intervention Points** (10 sec)
"'AI suggests, humans approve.' Clear escalation path."
"Clients want to know there's a human in the loop. Show them where."

**L — Limits** (10 sec)
"Explicit about what AI DOESN'T do. Data boundaries."
"'AI never sees your passwords. AI never makes changes without approval. AI never accesses [X].' Be specific."

**Client Questions** (20 sec)
→ Point to the question cards
"These are the three questions you'll get. Have answers ready."
"'Is AI reading my data?' — Here's exactly what touches your data."
"'Are you using AI on my environment?' — Yes, here's what, why, and how it's governed."
"'What if AI makes a mistake?' — Human oversight plus rollback plan."

**The Landing** (5 sec)
"Disclose before they ask. It builds trust."

⏱ ~75 seconds | 👁 "Disclose before they ask" is the memorable takeaway`,

};

// Helper to get notes by slide type
export const getNotesForSlide = (slideType) => notes[slideType] || null;
