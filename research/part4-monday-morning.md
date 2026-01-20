# Part IV Research: Monday Morning (January 2026)

## Your 90-Day Roadmap (Slide 10)

### Week 1-2: Audit Current State

**Questions to Answer:**
1. What automation do we already have?
2. Where are the guardrail gaps?
3. What's our current alert investigation rate? (Industry average: 22%)
4. What AI tools are already in use? (Shadow AI check)

**Shadow AI Reality Check:**
From [Reco.ai](https://www.reco.ai/blog/ai-and-cloud-security-breaches-2025):
- 20% of organizations suffered **shadow AI breaches**
- Costs **$670,000 more** than traditional incidents
- **247 days** average to detect

**Action Items:**
- Inventory all AI/automation tools in use
- Document which have audit trails, which don't
- Identify high-risk gaps (no logging, no approval workflows)

---

### Month 1: Pick ONE Use Case

**Recommended Starting Point: Alert Triage**

Why alert triage first:
- Immediate, measurable impact
- Low risk if guardrails in place
- Analysts feel the benefit quickly
- Clear metrics (MTTR, false positive rate)

From [Dropzone AI](https://www.dropzone.ai/glossary/alert-triage-in-2025-the-complete-guide-to-90-faster-investigations):
> "Organizations modernizing triage see 90% faster investigations, complete alert coverage, and significantly reduced breach risk."

**Implementation Checklist:**
- [ ] Select a pilot alert type (phishing recommended)
- [ ] Define human approval threshold
- [ ] Set up audit logging
- [ ] Create rollback procedure
- [ ] Train SOC team on new workflow
- [ ] Define success metrics

**What Success Looks Like:**
- AI investigates 100% of selected alert type
- Human reviews AI recommendations before action
- Full audit trail for every decision
- Measurable reduction in MTTR

---

### Month 2: Add Logging and Approval Workflows

**Logging Requirements:**
From [Galileo AI](https://galileo.ai/blog/ai-agent-compliance-governance-audit-trails-risk-management):
- Every model call: user identity, timestamp, metadata
- Input data used for decision
- Reasoning chain (if available)
- Confidence scores
- Action taken or recommended
- Human approval (if required)

**Approval Workflow Design:**
From [Permit.io](https://www.permit.io/blog/human-in-the-loop-for-ai-agents-best-practices-frameworks-use-cases-and-demo):

| Risk Level | Approval Required | Example |
|------------|-------------------|---------|
| Low | Auto-approve, log only | Alert enrichment |
| Medium | Async approval, continue work | Account lockout |
| High | Sync approval, wait for human | Data deletion |
| Critical | Multi-person approval | Production changes |

**Integration Points:**
- SIEM for log aggregation
- Ticketing system for approval workflow
- Identity provider for authentication
- Slack/Teams for notifications

---

### Month 3: Evaluate and Expand (or Retreat)

**Metrics to Review:**
1. **MTTR** — Did response time improve?
2. **False positive rate** — Is AI filtering noise effectively?
3. **Analyst satisfaction** — Do they trust the AI?
4. **Audit trail completeness** — Can you reconstruct decisions?
5. **Incident count** — Any AI-caused issues?

**Expand If:**
- Metrics improved
- No major incidents
- Team comfortable with workflow
- Audit trails complete and reviewable

**Retreat If:**
- AI decisions inconsistent
- Audit gaps discovered
- Team doesn't trust recommendations
- Insurance/compliance concerns raised

**Next Use Cases to Consider:**
1. Configuration drift monitoring
2. Endpoint validation scheduling
3. Segmentation testing automation
4. Vulnerability prioritization

---

## The Hard Conversations (Slide 11)

### Talking to Clients

**What they're worried about:**
- "Is AI reading my data?"
- "Can AI make mistakes that hurt my business?"
- "Am I liable if AI does something wrong?"

**What to tell them:**
1. **Transparency**: "Here's exactly what AI does in your environment"
2. **Control**: "Humans approve all significant actions"
3. **Audit trail**: "We can show you every decision and why"
4. **Limits**: "Here's what we DON'T automate"

**Documentation to Provide:**
- AI tool inventory
- Data handling policies
- Approval workflow documentation
- Incident response procedures
- Audit trail samples

---

### Talking to Leadership

**The Business Case:**
From MSP research:
- AI-driven tools reduce breach costs by **33%**
- Accelerate incident response by **~100 days**
- **88% of MSPs** say manual tasks hinder innovation
- AI automation reduces manual effort by **39%**

**ROI Framing:**
- Cost avoidance (faster response = smaller breach)
- Efficiency gains (analyst time freed for strategic work)
- Competitive advantage (clients expect AI capabilities)
- Insurance benefits (documented controls improve coverage)

**Risk Acknowledgment:**
- Initial investment in guardrails and training
- Ongoing governance overhead
- Regulatory compliance costs
- Potential for AI errors (mitigated by human-in-loop)

---

### Talking to Your Team

**What they're worried about:**
- "Is AI going to replace me?"
- "Will I be blamed when AI makes mistakes?"
- "Do I have to become an AI expert now?"

**The Augmentation Message:**
From SOC research:
> "AI augments human analysts by handling repetitive L1 alert triage automatically. This frees expert analysts for complex threats and strategic work. Teams report higher job satisfaction with AI."

**What to Tell Them:**
1. **AI handles the boring stuff** — You handle the interesting stuff
2. **Your expertise trains the AI** — You're the teacher, not the student
3. **You have veto power** — Human-in-loop means you approve
4. **Your job evolves, not disappears** — From reactive to strategic

**Training Needs:**
- How to review AI recommendations
- When to override
- How to provide feedback
- Understanding confidence scores
- Audit trail documentation

---

## Cyber Insurance Readiness (Slide 11 continued)

### What Insurers Want in 2025-2026

**Control Requirements:**
From [Centre Technologies](https://blog.centretechnologies.com/how-to-meet-cyber-insurance-requirements-in-2025):
- MFA everywhere
- EDR deployed and monitored
- Immutable backups
- Tested IR plans
- Monitored patching

**AI-Specific Concerns:**
- Documentation of AI tools in use
- Audit trails for AI decisions
- Human oversight mechanisms
- Vendor AI risk assessments

**The Documentation Gap:**
From [ISACA](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/cyber-insurance-in-crisis-with-ai-blind-spots):
> "Companies struggle to collect payouts when breach originates from AI with no transparency, traceability, or audit trail."

### What to Document

**For Each AI Tool:**
1. What it does
2. What data it accesses
3. What decisions it can make autonomously
4. What requires human approval
5. Where audit logs are stored
6. Vendor security certifications
7. Incident response procedures

**For Your AI Governance Program:**
1. Policy document
2. Risk assessment
3. Roles and responsibilities (RACI)
4. Audit schedule
5. Training records
6. Incident history

---

## Resources & Takeaways (Slide 12)

### Frameworks to Reference
- **NIST AI RMF** — Govern, Map, Measure, Manage
- **ISO/IEC 42001** — Auditable AI management systems
- **OWASP Agentic AI Top 10** — Agent-specific risks
- **CIS Controls** — Map AI tools to control requirements

### Tools Mentioned
- **Microsoft365DSC** — M365 drift detection
- **Atomic Red Team** — Endpoint validation
- **Zero Networks** — Microsegmentation
- **LangGraph + Permit.io** — HITL workflows

### Key Stats for Your Reports
- 87% of orgs experienced AI-driven attacks
- AI reduces breach costs by $2M, response by 80 days
- 23% of cloud incidents are misconfigurations
- Shadow AI breaches cost $670K more
- 30%+ SOC workflows will be AI-driven by end of 2026

### The One Slide Summary

```
┌─────────────────────────────────────────────────┐
│           THE GUARDRAIL SANDWICH                │
│                                                 │
│   DETERMINISTIC → PROBABILISTIC → DETERMINISTIC │
│   (code)           (AI)           (code)        │
│                                                 │
│   • AI does pattern recognition at scale        │
│   • Code provides predictable validation        │
│   • Humans approve high-stakes decisions        │
│   • Everything gets logged                      │
│                                                 │
│   Start with ONE use case. Add guardrails.      │
│   Measure. Expand or retreat based on data.     │
└─────────────────────────────────────────────────┘
```

---

## Sources

### MSP AI Adoption
- [MSP Today: Cybersecurity 2025 Readiness](https://www.msptoday.com/topics/msp-today/articles/462777-msp-cybersecurity-2025-ai-fueled-demand-meets-readiness.htm)
- [Sherweb: AI and Cybersecurity MSP Strategies](https://www.sherweb.com/blog/security/ai-and-cybersecurity/)
- [MSSP Alert: MSPs Powering AI Innovation](https://www.msspalert.com/perspective/msps-are-powering-the-next-wave-of-ai-and-cybersecurity-innovation)
- [Sherweb: MSP Security Trends 2025](https://www.sherweb.com/blog/security/msp-security-trends/)
- [Hacker News: MSP Cybersecurity Readiness Guide](https://thehackernews.com/2025/10/the-msp-cybersecurity-readiness-guide.html)

### Cyber Insurance
- [Embroker: Cyber Insurance Requirements 2026](https://www.embroker.com/blog/cyber-insurance-requirements-for-smbs-usa-2025/)
- [Centre Technologies: Meet Requirements 2025](https://blog.centretechnologies.com/how-to-meet-cyber-insurance-requirements-in-2025)
- [ISACA: Cyber Insurance AI Blind Spots](https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2025/cyber-insurance-in-crisis-with-ai-blind-spots)
- [Woodruff Sawyer: Cyber Insurance 2025](https://woodruffsawyer.com/insights/cyber-looking-ahead-guide)
- [TechTarget: Cyber Insurance Trends](https://www.techtarget.com/searchsecurity/tip/Cyber-insurance-trends-What-executives-need-to-know)

### Implementation Guidance
- [CustomGPT: 10 MSP AI Services](https://customgpt.ai/msp-ai-services/)
- [ConnectSecure: AI Security MSP Survey](https://connectsecure.com/blog/ai-security-tops-msp-concerns-for-2025-connectsecure-survey-shows)
- [Lumifi: Top MSP Cybersecurity Strategies 2025](https://www.lumificyber.com/blog/top-msp-cybersecurity-strategies-for-2025/)
