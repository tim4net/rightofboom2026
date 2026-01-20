# Part I Research: The Landscape (January 2026)

## Key Statistics to Open With

### The Speed Gap
- **Autonomous threats achieve full data exfiltration 100x faster than human attackers** (SentinelOne 2026 predictions)
- **87% of organizations** report having experienced an AI-driven cyberattack in the past year
- **78% of CISOs** say AI-powered threats are having a "significant impact"
- Voice cloning now requires only **3-5 seconds of sample audio**
- Human detection accuracy for deepfakes: **only 24.5%**

### The Scale Shift
- AI-generated phishing attacks **surged 1,265% since 2023**
- Deepfake-enabled vishing (voice phishing) **surged 1,600%** in Q1 2025
- FBI's 2025 IC3 report: **37% rise** in AI-assisted BEC attacks
- Average weekly cyberattacks per organization: **1,984** (up from 818 in 2021)
- **4 billion records leaked** in 2025

### The Cost Factor
- Attackers now save **95% on campaign costs** using LLMs
- Shadow AI breaches cost **$670,000 more** than traditional incidents
- Shadow AI breaches took **247 days to detect** on average
- Arup lost **$25 million** to a single deepfake video call impersonating their CFO
- Voice clone extracted **nearly €1 million** impersonating Italian Defense Minister

---

## The Automation Arms Race (Slide 1)

### Key Message
Both sides are adopting AI simultaneously. This isn't future—it's happening now. The question isn't IF you'll use AI, but HOW responsibly.

### Talking Points

**Attacker Side:**
- "The number of human hands on a keyboard is a rate-determining factor in the threat landscape. AI removes that bottleneck."
- Cybercrime prompt playbooks now sold on dark web—copy-and-paste frameworks for jailbreaking AI
- Tools like WormGPT, FraudGPT, KawaiiGPT (July 2025) lower the barrier
- WormGPT variants built on Grok and Mixtral, subscription ~€60/month

**Defender Side:**
- 70% of SOCs experimenting with AI (SANS SOC Survey)
- By end of 2026: 30%+ of SOC workflows executed by AI agents
- Global AI-in-cybersecurity spending: $24.8B (2024) → $146.5B (2034)
- McKinsey: worldwide cyber defense investment to surpass $210B by 2026

### The Uncomfortable Truth
> "The ostrich approach of hoping that one's own company is too obscure to be noticed by attackers will no longer work as attacker capacity increases."
— SentinelOne Cybersecurity 2026 Report

---

## Attacker Patterns - Condensed (Slide 2)

### AI Reconnaissance at Scale
- AI-driven OSINT tools automate discovery, analyze large datasets, detect hidden patterns
- Modern AI interprets images, PDFs, audio—extracts IOCs from screenshots, forum posts, leaked reports
- A model can scan a 50-page document, extract all IPs, domains, malware hashes, and auto-feed to attack systems
- "Turns what were once resource-heavy attacks into standard operations executed by a single attacker"

### The Phishing Evolution
- AI-generated phishing is now the **#1 enterprise email threat** (October 2025)
- Emails customized to recipient with context—recent purchases, upcoming deals
- Goes beyond template-based mailouts—each message feels uniquely relevant
- Training must shift from "spot the fake" to **"verify the request"** regardless of appearance

### Deepfake Incidents (2025)
1. **Arup ($25M)** - Deepfake CFO on video call authorized wire transfers
2. **Italian Defense Minister** - Voice clone extracted nearly €1M
3. **FBI Warning** - Hackers using AI voice cloning to impersonate senior US officials
4. **Scale**: 51% of US/UK businesses targeted by deepfake scams, 43% fell victim

### Agent-Based Attacks (Emerging)
- "With a single well-crafted prompt injection, adversaries gain an autonomous insider"
- Can silently execute trades, delete backups, exfiltrate databases
- Multi-agent vulnerability: 82.4% of LLMs compromised through inter-agent communication
- LLMs that resist direct malicious commands will execute identical payloads when requested by peer agents

---

## The Guardrail Sandwich - Framework Introduction (Slide 3)

### The Problem with Unconstrained AI
- 1 in 5 organizations deployed agents with **no guardrails or monitoring**
- Jailbreaking prompts bypass guardrails via encoded suffixes, emoji perturbations, multilingual padding
- MalwareBench: Average rejection rate for malicious content is 60.93%, drops to **39.92%** with jailbreak algorithms

### The Solution: Deterministic → Probabilistic → Deterministic
```
┌─────────────────────────────────────┐
│  LAYER 1: DETERMINISTIC INPUT       │
│  - Schema validation                │
│  - Allowlisted commands only        │
│  - Rate limiting                    │
│  - Input sanitization               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  LAYER 2: PROBABILISTIC (AI)        │
│  - Pattern recognition              │
│  - Context understanding            │
│  - Anomaly detection                │
│  - Decision support                 │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  LAYER 3: DETERMINISTIC OUTPUT      │
│  - Action validation                │
│  - Human approval gates             │
│  - Audit logging                    │
│  - Rollback capability              │
└─────────────────────────────────────┘
```

### "Crusty Code → Spicy AI → Crusty Code"
- AI does what it's good at: pattern recognition, scale, speed
- Code does what IT'S good at: predictable validation, audit trails, safety gates
- The sandwich is the safety mechanism

### OWASP Agentic AI Top 10 (December 2025)
Released after 1+ year of research with 100+ security researchers. Key risks:
1. Prompt injection
2. Tool misuse
3. Memory poisoning
4. Cascading failures in multi-agent systems
5. Supply chain compromise of agent components

### The Prediction
> "An agentic AI deployment will cause a public breach and lead to employee dismissals."
— Paddy Harrington, Forrester Analyst

---

## Real Incident: Claude Code Extortion Campaign (August 2025)

**Source:** Anthropic Threat Intelligence Report

A threat actor used Claude Code to perform a highly autonomous extortion campaign:
- Automated technical and reconnaissance aspects of intrusion
- Instructed Claude Code to **evaluate what data to exfiltrate**
- Asked it to determine **ideal monetary ransom amount**
- Had AI **curate the ransom note demands**

**Lesson:** AI doesn't just assist attacks—it's being used for autonomous decision-making in criminal operations. This is why guardrails matter.

---

## Sources

### 2026 Predictions & Trends
- [SentinelOne: Cybersecurity 2026](https://www.sentinelone.com/blog/cybersecurity-2026-the-year-ahead-in-ai-adversaries-and-global-change/)
- [Darktrace: AI Cybersecurity Trends 2026](https://www.darktrace.com/blog/the-year-ahead-ai-cybersecurity-trends-to-watch-in-2026)
- [Dark Reading: Cybersecurity Predictions 2026](https://www.darkreading.com/threat-intelligence/cybersecurity-predictions-for-2026-navigating-the-future-of-digital-threats)
- [HBR/Palo Alto: 6 Predictions for AI Economy 2026](https://hbr.org/sponsored/2025/12/6-cybersecurity-predictions-for-the-ai-economy-in-2026)
- [IBM: Cybersecurity Trends 2026](https://www.ibm.com/think/news/cybersecurity-trends-predictions-2026)

### AI Attack Statistics
- [DeepStrike: AI Cyber Attack Statistics 2025](https://deepstrike.io/blog/ai-cyber-attack-statistics-2025)
- [Cybersecurity News: 100+ Predictions 2026](https://cybersecuritynews.com/cybersecurity-predictions-2026/)

### Phishing & Social Engineering
- [Brightside AI: AI-Generated Phishing Analysis 2025](https://www.brside.com/blog/ai-generated-phishing-vs-human-attacks-2025-risk-analysis)
- [Hoxhunt: AI Phishing Attacks](https://hoxhunt.com/blog/ai-phishing-attacks)
- [StrongestLayer: AI Phishing Enterprise Threat 2026](https://www.strongestlayer.com/blog/ai-generated-phishing-enterprise-threat)
- [CrowdStrike: AI-Powered Social Engineering](https://www.crowdstrike.com/en-us/cybersecurity-101/social-engineering/ai-social-engineering/)
- [Jericho Security: Deepfake Phishing 2025](https://www.jerichosecurity.com/blog/deepfake-phishing-the-ai-powered-social-engineering-threat-putting-cisos-on-high-alert-in-2025)

### OSINT & Reconnaissance
- [KnowBe4: Recon 2.0 - AI-Driven OSINT](https://blog.knowbe4.com/recon-2.0-ai-driven-osint-hands-cybercriminals)
- [Authentic8: AI-Driven OSINT Threat Hunting](https://www.authentic8.com/blog/ai-driven-osint-threat-hunting-how-ai-transforming-cyber-defense)

### Malicious LLMs & Jailbreaking
- [Palo Alto Unit42: Malicious LLMs](https://unit42.paloaltonetworks.com/dilemma-of-ai-malicious-llms/)
- [Computing: Dark LLMs on the Rise](https://www.computing.co.uk/news/2025/security/dark-llms-designed-for-cybercrime-are-on-the-rise-report)
- [Rapid7: How LLMs Are Reshaping Cybercrime](https://www.rapid7.com/blog/post/ai-goes-on-offense-how-llms-are-redefining-the-cybercrime-landscape/)
- [SentinelOne: LLMs & Ransomware](https://www.sentinelone.com/labs/llms-ransomware-an-operational-accelerator-not-a-revolution/)

### Agentic AI Risks
- [OWASP: Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [Stellar Cyber: Agentic AI Security Threats 2026](https://stellarcyber.ai/learn/agentic-ai-securiry-threats/)
- [CyberArk: AI Agents and Identity Risks 2026](https://www.cyberark.com/resources/blog/ai-agents-and-identity-risks-how-security-will-shift-in-2026)
- [The Register: AI Agents as Insider Threats](https://www.theregister.com/2026/01/04/ai_agents_insider_threats_panw)

### SOC & Defensive AI
- [WebProNews: AI Transforms SOCs 2025](https://www.webpronews.com/ai-transforms-socs-in-2025-automating-threats-cutting-burnout/)
- [LevelBlue: Agentic AI Predictions 2026](https://levelblue.com/blogs/levelblue-blog/predictions-2026-surge-in-agentic-ai-for-attacks-and-defenses/)

### Incidents & Breaches
- [Reco.ai: AI & Cloud Security Breaches 2025](https://www.reco.ai/blog/ai-and-cloud-security-breaches-2025)
- [CSO Online: Top 5 AI Security Threats 2025](https://www.csoonline.com/article/4111384/top-5-real-world-ai-security-threats-revealed-in-2025.html)
- [Infosecurity Magazine: Top 10 Cyber-Attacks 2025](https://www.infosecurity-magazine.com/news-features/top-10-cyberattacks-of-2025/)
- [Check Point: AI Security Report 2025](https://engage.checkpoint.com/2025-ai-security-report)
