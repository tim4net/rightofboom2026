// ============================================
// PRESENTER NOTES - Right of Boom 2026
// Edit notes here for easier maintenance
// ============================================

export const notes = {
  aiRiskTension: `**Set up the tension** (5 sec)
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

⏱ ~65 seconds | 👁 MSPs feel this tension daily — let the pause land before offering the resolution.`,

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

  sandwich: `**Quick callback** (5 sec)
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

⏱ ~80 seconds | 👁 "Tuesday afternoon" reframes security as operational resilience — lands well with ops folks`,

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
"Welcome back from break."
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
};

// Helper to get notes by slide type
export const getNotesForSlide = (slideType) => notes[slideType] || null;
