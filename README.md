# Right of Boom 2026

**"Think Like an Attacker: Automating Red Team Simulations and AI Testing"**

A presentation on the intersection of AI, automation, and security for the Right of Boom 2026 conference in Las Vegas. Delivered by Tim Fournet (Rewst) and Roddy Bergeron (Sherweb).

📥 **[Download Presentation PDF](https://github.com/tim4net/rightofboom2026/releases/latest/download/presentation.pdf)**

## Quick Start

### Windows (PowerShell)

```powershell
# Install Node.js if needed
winget install OpenJS.NodeJS.LTS

# Then run
npm install
npm run dev
```

### macOS / Linux

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

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 2026 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run pdf` | Generate PDF (requires Puppeteer) |

## Downloadable Resources

Resources are in `public/resources/` (served at `/resources/` when running).

### Rewst Workflows

See **[REWST.md](REWST.md)** for full import instructions.

| Resource | Description |
|----------|-------------|
| [Endpoint_Posture_Checks.bundle.json](public/resources/bundles/Endpoint_Posture_Checks.bundle.json) | Endpoint posture validation workflow |
| [CA Policy Changes Crate](https://docs.rewst.help/documentation/crates/existing-crate-documentation/notify-on-conditional-access-policy-changes-crate) | Rewst Marketplace crate |

### PowerShell Scripts

| Script | Description |
|--------|-------------|
| [Invoke-SafeEndpointValidation.ps1](public/resources/scripts/Invoke-SafeEndpointValidation.ps1) | Main endpoint validation script |
| [Invoke-SafeEndpointValidation-Wrapper.ps1](public/resources/scripts/Invoke-SafeEndpointValidation-Wrapper.ps1) | Wrapper for Rewst integration |
| [endpoint-collector.ps1](public/resources/scripts/endpoint-collector.ps1) | Endpoint data collection |
| [rewst-oneliner.ps1](public/resources/scripts/rewst-oneliner.ps1) | Quick Rewst deployment one-liner |

### Lab Setup

| Script | Description |
|--------|-------------|
| [setup-lab-vm.ps1](public/resources/scripts/lab-demo/setup-lab-vm.ps1) | Set up lab VM |
| [stage-gaps.ps1](public/resources/scripts/lab-demo/stage-gaps.ps1) | Stage security gaps for testing |
| [teardown-lab-vm.ps1](public/resources/scripts/lab-demo/teardown-lab-vm.ps1) | Clean up lab VM |

### Templates

| Template | Description |
|----------|-------------|
| [safe-sweep-aggregate.jinja](public/resources/scripts/safe-sweep-aggregate.jinja) | Jinja template for aggregating results |
| [safe-sweep-email-template.jinja](public/resources/scripts/safe-sweep-email-template.jinja) | Email report template |
| [safe-sweep-narrative-prompt.jinja](public/resources/scripts/safe-sweep-narrative-prompt.jinja) | AI narrative generation prompt |

### Sample Reports

| Report | Description |
|--------|-------------|
| [safe-sweep-report-example.html](public/resources/reports/safe-sweep-report-example.html) | Example Safe Sweep HTML report |

---

## Sources & References

All incidents and statistics cited in the presentation are from verified sources.

### AI Incident References

| Incident | Date | Sources |
|----------|------|---------|
| Arup Engineering Deepfake ($25M) | Jan 2024 | [CNN](https://www.cnn.com/2024/02/04/asia/deepfake-cfo-scam-hong-kong-intl-hnk/index.html), [Bloomberg](https://www.bloomberg.com/news/articles/2024-02-04/arup-lost-25-million-in-hong-kong-deepfake-scam) |
| Samsung → ChatGPT data leak | Apr 2023 | [Bloomberg](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak), [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/) |
| Chevrolet Chatbot ($1 car) | Dec 2023 | [AI Incident Database #622](https://incidentdatabase.ai/cite/622/) |
| DPD Chatbot (swore at customers) | Jan 2024 | [TIME](https://time.com/6564726/ai-chatbot-dpd-curses-criticizes-company/) |
| Bing "Sydney" | Feb 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Sydney_(Microsoft)) |
| Mata v. Avianca (fake cases) | Jun 2023 | [Wikipedia](https://en.wikipedia.org/wiki/Mata_v._Avianca,_Inc.), [Reuters](https://www.reuters.com/legal/new-york-lawyers-sanctioned-using-fake-chatgpt-cases-legal-brief-2023-06-22/) |
| Air Canada Chatbot liability | Feb 2024 | [CBC News](https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416) |
| NYC MyCity Chatbot | Mar 2024 | [The Markup](https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law) |

### Statistics Sources

| Statistic | Source |
|-----------|--------|
| 73.8% workplace ChatGPT accounts are non-corporate | [Cyberhaven Shadow AI Report 2024](https://www.cyberhaven.com/blog/4-2-of-workers-have-put-sensitive-corporate-data-into-chatgpt-raising-security-concerns) |
| 28% of organizations have formal AI policy | [ISACA AI Pulse Poll 2024](https://www.isaca.org/resources/news-and-trends/newsletters/atisaca/2024/volume-5/ai-assurance-readiness-hindered-by-policy-and-talent-challenges) |
| $670K extra cost per shadow AI breach | [IBM Cost of a Data Breach 2025](https://www.ibm.com/reports/data-breach) |
| 258 days average breach lifecycle | [IBM Cost of a Data Breach 2024](https://www.ibm.com/reports/data-breach) |
| NAIC AI Model Bulletin (24 states) | [NAIC 2024](https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Artificial%20Intelligence%20Systems.pdf) |
| ISACA insurance guidance | [ISACA 2025](https://www.isaca.org/resources/isaca-journal/issues/2024/volume-1/artificial-intelligence-governance-and-auditing) |

### Other References

| Reference | Source |
|-----------|--------|
| Shadow AI real-world example | [r/msp discussion](https://www.reddit.com/r/msp/comments/1qn4oms/comment/o1r6i6r/) |

### Frameworks & Standards

| Framework | Link |
|-----------|------|
| NIST AI RMF | [nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) |
| ISO 42001 | [iso.org/standard/81230.html](https://www.iso.org/standard/81230.html) |
| CIS Controls | [cisecurity.org/controls](https://www.cisecurity.org/controls) |
| OWASP Agentic AI Top 10 | [genai.owasp.org](https://genai.owasp.org/) |
| MITRE ATT&CK | [attack.mitre.org](https://attack.mitre.org/) |
| Atomic Red Team | [atomicredteam.io](https://atomicredteam.io/) |
| AI Incident Database | [incidentdatabase.ai](https://incidentdatabase.ai/) |
