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

## AI Incident References (Slide 24)

All incidents cited in the "When AI Goes Wrong" slides are verified real-world events with multiple corroborating sources.

### Deepfake/Fraud
| Incident | Date | Sources |
|----------|------|---------|
| **Arup Engineering Deepfake** ($25M stolen via AI-generated video call) | Jan 2024 | [CNN](https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html), [Bloomberg](https://www.bloomberg.com/news/articles/2024-02-04/arup-lost-25-million-in-hong-kong-deepfake-scam), [The Guardian](https://www.theguardian.com/world/2024/feb/05/hong-kong-company-deepfake-video-call-scam-25-million) |

### Data Leakage
| Incident | Date | Sources |
|----------|------|---------|
| **Samsung → ChatGPT** (Engineers leaked semiconductor source code) | Apr 2023 | [Bloomberg](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak), [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/), [Dark Reading](https://www.darkreading.com/vulnerabilities-threats/samsung-engineers-sensitive-data-chatgpt-warnings-ai-use-workplace) |

### Prompt Injection/Manipulation
| Incident | Date | Sources |
|----------|------|---------|
| **Chevrolet Chatbot** (Agreed to sell $76K car for $1) | Dec 2023 | [AI Incident Database #622](https://incidentdatabase.ai/cite/622/), [Futurism](https://futurism.com/the-byte/car-dealership-ai), [Gizmodo](https://gizmodo.com/ai-chevy-dealership-chatgpt-bot-customer-service-fail-1851111825) |
| **DPD Chatbot** (Swore at customers, criticized company) | Jan 2024 | [AI Incident Database #631](https://incidentdatabase.ai/cite/631/), [TIME](https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/), [ITV News](https://www.itv.com/news/2024-01-19/dpd-disables-ai-chatbot-after-customer-service-bot-appears-to-go-rogue) |
| **Bing "Sydney"** (Threatened users, system prompt extracted) | Feb 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Sydney_(Microsoft)), [NYT](https://www.nytimes.com/2023/02/16/technology/bing-chatbot-microsoft-chatgpt.html), [The Verge](https://www.theverge.com/2023/2/15/23599072/microsoft-ai-bing-personality-conversations-spy-employees-webcams) |

### AI Hallucination/Legal Liability
| Incident | Date | Sources |
|----------|------|---------|
| **Mata v. Avianca** (Lawyers cited 6 fake ChatGPT cases) | Jun 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.), [NYT](https://www.nytimes.com/2023/05/27/nyregion/avianca-airline-lawsuit-chatgpt.html), [Reuters](https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/) |
| **Air Canada Chatbot** (Liable for false bereavement policy) | Feb 2024 | [CBC News](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416), [American Bar Association](https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/), [Forbes](https://www.forbes.com/sites/marisagarcia/2024/02/19/air-canada-chatbot-promised-discount-airline-must-pay/) |
| **NYC MyCity Chatbot** (Advised businesses to break laws) | Mar 2024 | [The Markup](https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law), [Ars Technica](https://arstechnica.com/tech-policy/2024/03/nyc-chatbot-still-claiming-its-fine-for-businesses-to-break-the-law/), [Wired](https://www.wired.com/story/new-york-city-chatbot-bad-advice/) |

### Additional Research Resources
- [AI Incident Database](https://incidentdatabase.ai/) - Comprehensive database of AI failures
- [OWASP Agentic AI Top 10](https://genai.owasp.org/) - Security risks for AI agents
- [MITRE ATT&CK](https://attack.mitre.org/) - Adversarial tactics and techniques

## Statistics Sources (Slides 23, 30)

### Shadow AI Statistics (Slide 23)
| Statistic | Source |
|-----------|--------|
| **73.8%** workplace ChatGPT accounts are non-corporate | [Cyberhaven Shadow AI Report 2024](https://www.cyberhaven.com/blog/4-2-of-workers-have-put-sensitive-corporate-data-into-chatgpt-raising-security-concerns) |
| **28%** of organizations have formal AI policy | [ISACA AI Pulse Poll 2024](https://www.isaca.org/resources/news-and-trends/newsletters/atisaca/2024/volume-5/ai-assurance-readiness-hindered-by-policy-and-talent-challenges) |
| **$670K** extra cost per shadow AI breach | [IBM Cost of a Data Breach Report 2024](https://www.ibm.com/reports/data-breach) (shadow IT component) |
| **247 days** average detection time | [IBM Cost of a Data Breach Report 2024](https://www.ibm.com/reports/data-breach) |

### Governance & Insurance (Slide 30)
| Reference | Source |
|-----------|--------|
| **NAIC AI Model Bulletin** (24 states adopted) | [NAIC Model Bulletin on AI 2024](https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Artificial%20Intelligence%20Systems.pdf) |
| **ISACA insurance quote** | [ISACA AI Governance Guidance 2025](https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing) |
| **EU AI Act** (€35M or 7% revenue penalties) | [EU AI Act Official Text](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |

## Frameworks & Standards

| Framework | Description | Link |
|-----------|-------------|------|
| **NIST AI RMF** | AI Risk Management Framework | [nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) |
| **ISO 42001** | AI Management System Standard | [iso.org/standard/81230.html](https://www.iso.org/standard/81230.html) |
| **CIS Controls** | Security Best Practices | [cisecurity.org/controls](https://www.cisecurity.org/controls) |
| **OWASP Agentic AI Top 10** | Security Risks for AI Agents | [genai.owasp.org](https://genai.owasp.org/) |
| **MITRE ATT&CK** | Adversarial Tactics & Techniques | [attack.mitre.org](https://attack.mitre.org/) |
| **Atomic Red Team** | Open-source Attack Testing | [atomicredteam.io](https://atomicredteam.io/) |

## Industry Reports Referenced

| Report | Year | Link |
|--------|------|------|
| Cost of a Data Breach | 2024 | [IBM Security](https://www.ibm.com/reports/data-breach) |
| X-Force Threat Intelligence Index | 2025 | [IBM Security](https://www.ibm.com/reports/threat-intelligence) |
| SOC Survey | 2025 | [SANS Institute](https://www.sans.org/white-papers/soc-survey/) |
| IC3 Annual Report | 2024 | [FBI](https://www.ic3.gov/Home/AnnualReports) |
| Unit 42 Incident Response Report | 2024 | [Palo Alto Networks](https://www.paloaltonetworks.com/unit42/incident-response-report) |
| AI Governance & Auditing | 2024 | [ISACA](https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing) |
| Network Segmentation Guidance | 2023 | [CISA](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-320a) |
| Purple AI Threat Research | 2024 | [SentinelOne](https://www.sentinelone.com/labs/) |

## Policy Templates

| Template | Source |
|----------|--------|
| AI Acceptable Use Policy | [ISACA AI Policy Templates](https://www.isaca.org/resources/isaca-journal/issues/2024/volume-2/creating-ai-governance-policies) |
| Shadow AI Discovery | [Portal26](https://portal26.ai/), [Zylo](https://zylo.com/), [Nightfall](https://www.nightfall.ai/), [Zenity](https://www.zenity.io/) |
