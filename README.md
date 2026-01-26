# Right of Boom 2026

Interactive security conference presentation for the "Think Like an Attacker" CPE masterclass. Built with React, Vite, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:2026

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `Space` | Next slide |
| `←` | Previous slide |
| `B` | Show break slide (from anywhere) |
| `N` | Toggle presenter notes |
| `T` | Start/stop timer |
| `R` | Reset timer |
| `D` | Toggle demo mode |
| `Esc` | Close overlays / exit demos |
| `PageDown` | Force next slide (skips demo steps) |

## Features

- **31 slides** with hardcoded content (no external data dependencies)
- **4 Themes**: Corporate (blue), Terminal (green), Dramatic (red), Bayou (teal)
- **Presenter Notes**: Toggle with `N` key
- **Break Overlay**: Press `B` anytime for flexible break timing
- **Attack Lab Demo**: Simulated attack chain walkthrough (slide 004)

## Tech Stack

- React 18 + Vite 7
- Tailwind CSS 3
- Lucide React (icons)
- xterm.js (terminal UI)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 2026 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run pdf` | Generate PDF (requires Puppeteer) |

## AI Incident References (Slides 23-24)

All incidents cited are verified real-world events with multiple corroborating sources.

### Deepfake/Fraud
| Incident | Date | Sources |
|----------|------|---------|
| **Arup Engineering Deepfake** ($25M stolen via AI-generated video call) | Jan 2024 | [CNN](https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html), [Bloomberg](https://www.bloomberg.com/news/articles/2024-02-04/arup-lost-25-million-in-hong-kong-deepfake-scam) |

### Data Leakage
| Incident | Date | Sources |
|----------|------|---------|
| **Samsung → ChatGPT** (Engineers leaked semiconductor source code) | Apr 2023 | [Bloomberg](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak), [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/) |

### Prompt Injection/Manipulation
| Incident | Date | Sources |
|----------|------|---------|
| **Chevrolet Chatbot** (Agreed to sell $76K car for $1) | Dec 2023 | [AI Incident Database #622](https://incidentdatabase.ai/cite/622/) |
| **DPD Chatbot** (Swore at customers, criticized company) | Jan 2024 | [TIME](https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/) |
| **Bing "Sydney"** (Threatened users, system prompt extracted) | Feb 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Sydney_(Microsoft)) |

### AI Hallucination/Legal Liability
| Incident | Date | Sources |
|----------|------|---------|
| **Mata v. Avianca** (Lawyers cited 6 fake ChatGPT cases) | Jun 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.), [Reuters](https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/) |
| **Air Canada Chatbot** (Liable for false bereavement policy) | Feb 2024 | [CBC News](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416) |
| **NYC MyCity Chatbot** (Advised businesses to break laws) | Mar 2024 | [The Markup](https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law) |

### Resources
- [AI Incident Database](https://incidentdatabase.ai/) - Comprehensive database of AI failures
- [OWASP Agentic AI Top 10](https://genai.owasp.org/) - Security risks for AI agents

## Statistics Sources

### Shadow AI (Slide 22)
| Statistic | Source |
|-----------|--------|
| **73.8%** workplace ChatGPT accounts are non-corporate | [Cyberhaven Shadow AI Report 2024](https://www.cyberhaven.com/blog/4-2-of-workers-have-put-sensitive-corporate-data-into-chatgpt-raising-security-concerns) |
| **28%** of organizations have formal AI policy | [ISACA AI Pulse Poll 2024](https://www.isaca.org/resources/news-and-trends/newsletters/atisaca/2024/volume-5/ai-assurance-readiness-hindered-by-policy-and-talent-challenges) |

### Governance & Insurance (Slide 28)
| Reference | Source |
|-----------|--------|
| **NAIC AI Model Bulletin** (24 states adopted) | [NAIC Model Bulletin on AI 2024](https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Artificial%20Intelligence%20Systems.pdf) |
| **ISACA insurance quote** | [ISACA AI Governance Guidance 2025](https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing) |

## Frameworks & Standards

| Framework | Link |
|-----------|------|
| **NIST AI RMF** | [nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) |
| **ISO 42001** | [iso.org/standard/81230.html](https://www.iso.org/standard/81230.html) |
| **CIS Controls** | [cisecurity.org/controls](https://www.cisecurity.org/controls) |
| **OWASP Agentic AI Top 10** | [genai.owasp.org](https://genai.owasp.org/) |
| **MITRE ATT&CK** | [attack.mitre.org](https://attack.mitre.org/) |
