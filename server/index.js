import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import pty from 'node-pty';
import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { randomUUID } from 'crypto';
import { DefenderAI } from './defender-ai.js';
import {
  DEMO_ATTACK_EVENTS, DEMO_ALERTS, DEMO_ANALYSIS, DEMO_TIMING,
  DEMO_RECON_DATA, DEMO_ATTACK_PLAN_THINKING, DEMO_ATTACK_PLAN, DEMO_ATTACK_PLAN_TIMING,
  DEMO_RECOMMENDATIONS, DEMO_ACTION_RESULTS
} from './demo-data.js';

config(); // Load .env

// Initialize Defender AI
const defenderAI = new DefenderAI({
  useOllama: process.env.USE_OLLAMA === 'true',
  ollamaUrl: process.env.OLLAMA_URL || 'http://localhost:11434',
  ollamaModel: process.env.OLLAMA_MODEL || 'llama3.2:3b'
});

const app = express();
const PORT = process.env.API_PORT || 3001;

// Demo mode state
let demoMode = process.env.DEMO_MODE === 'true';
const FALLBACK_TIMEOUT = parseInt(process.env.FALLBACK_TIMEOUT) || 5000; // ms

// PTY session management
const ptySessions = new Map();

// =============================================================================
// SECURITY: Localhost-only for dangerous endpoints
// =============================================================================
const ALLOWED_IPS = ['127.0.0.1', '::1', '::ffff:127.0.0.1', 'localhost'];

// Dangerous endpoints that give shell/attack access - ALWAYS localhost only
const DANGEROUS_PATHS = [
  '/api/attack',        // Attack execution
  '/api/defender',      // AI with system access
  '/api/recon',         // OSINT tools
  '/api/dns',           // DNS lookups
  '/api/subdomains',    // Subdomain enumeration
  '/api/shodan',        // Shodan queries
  '/api/breaches',      // HIBP queries
  '/api/attack-plan',   // AI attack planning
  '/api/actions',       // Action execution
  '/api/siem',          // SIEM access
];

const localhostOnlyForDangerous = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
  const realIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || ip;
  const isLocalhost = ALLOWED_IPS.some(allowed => realIp.includes(allowed));

  // Check if this is a dangerous endpoint
  const isDangerous = DANGEROUS_PATHS.some(path => req.path.startsWith(path));

  if (isDangerous && !isLocalhost) {
    console.warn(`[BLOCKED] Dangerous endpoint ${req.path} from ${realIp}`);
    return res.status(403).json({
      error: 'Access denied',
      message: 'This endpoint only accepts connections from localhost'
    });
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(localhostOnlyForDangerous); // Block dangerous endpoints from external IPs

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', demoMode, apis: {
    shodan: !!process.env.SHODAN_API_KEY,
    hibp: !!process.env.HIBP_API_KEY,
    claude: !!process.env.ANTHROPIC_API_KEY
  }});
});

// ============================================================================
// Demo Mode Controls
// ============================================================================

// Get/set demo mode
app.get('/api/demo/mode', (req, res) => {
  res.json({ demoMode, fallbackTimeout: FALLBACK_TIMEOUT });
});

app.post('/api/demo/mode', (req, res) => {
  const { enabled } = req.body;
  if (typeof enabled === 'boolean') {
    demoMode = enabled;
    console.log(`Demo mode ${demoMode ? 'ENABLED' : 'DISABLED'}`);
  }
  res.json({ demoMode });
});

// Demo attack - streams pre-recorded attack events
app.post('/api/demo/attack', async (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson');
  res.setHeader('Transfer-Encoding', 'chunked');

  let eventIndex = 0;

  const sendNextEvent = () => {
    if (eventIndex >= DEMO_ATTACK_EVENTS.length) {
      res.end();
      return;
    }

    const event = DEMO_ATTACK_EVENTS[eventIndex];
    res.write(JSON.stringify(event) + '\n');
    eventIndex++;

    // Schedule next event
    setTimeout(sendNextEvent, DEMO_TIMING.attackEventInterval);
  };

  sendNextEvent();

  req.on('close', () => {
    eventIndex = DEMO_ATTACK_EVENTS.length; // Stop sending
  });
});

// Demo alerts - streams pre-recorded alerts
app.get('/api/demo/alerts/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let alertIndex = 0;

  const sendNextAlert = () => {
    if (alertIndex >= DEMO_ALERTS.length) {
      return; // Keep connection open but stop sending
    }

    const alert = {
      ...DEMO_ALERTS[alertIndex],
      timestamp: new Date().toISOString()
    };
    res.write(`data: ${JSON.stringify(alert)}\n\n`);
    alertIndex++;

    // Schedule next alert (offset from attack events)
    setTimeout(sendNextAlert, DEMO_TIMING.attackEventInterval + DEMO_TIMING.alertDelay);
  };

  // Start after a brief delay
  setTimeout(sendNextAlert, 2000);

  req.on('close', () => {
    alertIndex = DEMO_ALERTS.length;
  });
});

// Demo analysis - streams pre-recorded AI analysis
app.post('/api/demo/analyze', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send progress messages with timing
  for (const progress of DEMO_TIMING.progressMessages) {
    await new Promise(resolve => setTimeout(resolve, progress.delay > 0 ?
      progress.delay - (DEMO_TIMING.progressMessages[DEMO_TIMING.progressMessages.indexOf(progress) - 1]?.delay || 0) : 0));
    res.write(`data: ${JSON.stringify({ type: 'progress', phase: 'analysis', message: progress.message })}\n\n`);
  }

  // Send complete analysis
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.write(`data: ${JSON.stringify({ type: 'complete', analysis: DEMO_ANALYSIS })}\n\n`);
  res.end();
});

// ============================================================================
// DNS Records (using Cloudflare DNS-over-HTTPS - free, no API key)
// ============================================================================
app.get('/api/dns/:domain', async (req, res) => {
  const { domain } = req.params;
  try {
    const recordTypes = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME'];
    const results = {};

    for (const type of recordTypes) {
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${domain}&type=${type}`,
        { headers: { 'Accept': 'application/dns-json' } }
      );
      const data = await response.json();
      if (data.Answer) {
        results[type] = data.Answer.map(r => r.data);
      }
    }

    res.json({ domain, records: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Subdomain Discovery (crt.sh - Certificate Transparency, free)
// ============================================================================
app.get('/api/subdomains/:domain', async (req, res) => {
  const { domain } = req.params;
  try {
    const response = await fetch(
      `https://crt.sh/?q=%.${domain}&output=json`,
      { headers: { 'User-Agent': 'RightOfBoom-Demo/1.0' } }
    );

    if (!response.ok) {
      throw new Error(`crt.sh returned ${response.status}`);
    }

    const data = await response.json();

    // Extract unique subdomains
    const subdomains = [...new Set(
      data
        .map(cert => cert.name_value)
        .flatMap(name => name.split('\n'))
        .filter(name => name.endsWith(domain) && !name.startsWith('*'))
    )].slice(0, 50); // Limit to 50

    res.json({ domain, subdomains, total: subdomains.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Shodan - Exposed Services & Ports
// ============================================================================
app.get('/api/shodan/:domain', async (req, res) => {
  const { domain } = req.params;
  const apiKey = process.env.SHODAN_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'SHODAN_API_KEY not configured' });
  }

  try {
    // First resolve domain to IP
    const dnsResponse = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
      { headers: { 'Accept': 'application/dns-json' } }
    );
    const dnsData = await dnsResponse.json();

    if (!dnsData.Answer || dnsData.Answer.length === 0) {
      return res.json({ domain, services: [], note: 'No A record found' });
    }

    const ip = dnsData.Answer[0].data;

    // Query Shodan for this IP
    const shodanResponse = await fetch(
      `https://api.shodan.io/shodan/host/${ip}?key=${apiKey}`
    );

    if (shodanResponse.status === 404) {
      return res.json({ domain, ip, services: [], note: 'No Shodan data for this IP' });
    }

    if (!shodanResponse.ok) {
      throw new Error(`Shodan returned ${shodanResponse.status}`);
    }

    const shodanData = await shodanResponse.json();

    const services = (shodanData.data || []).map(svc => ({
      port: svc.port,
      protocol: svc.transport || 'tcp',
      service: svc.product || svc._shodan?.module || 'unknown',
      version: svc.version || null,
      banner: svc.data?.substring(0, 200) || null,
      ssl: svc.ssl?.cert?.subject?.CN || null
    }));

    res.json({
      domain,
      ip,
      org: shodanData.org,
      isp: shodanData.isp,
      country: shodanData.country_name,
      services,
      vulns: shodanData.vulns || []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Have I Been Pwned - Breach Data
// ============================================================================
app.get('/api/breaches/:domain', async (req, res) => {
  const { domain } = req.params;
  const apiKey = process.env.HIBP_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'HIBP_API_KEY not configured' });
  }

  try {
    // HIBP domain search requires enterprise API
    // For demo, we'll check if the domain appears in known breaches
    const response = await fetch(
      `https://haveibeenpwned.com/api/v3/breaches`,
      {
        headers: {
          'hibp-api-key': apiKey,
          'User-Agent': 'RightOfBoom-Demo'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HIBP returned ${response.status}`);
    }

    const breaches = await response.json();

    // Filter breaches that might be relevant (this is illustrative)
    // Real domain search requires HIBP enterprise subscription
    const relevantBreaches = breaches
      .filter(b => b.Domain && (
        b.Domain.includes(domain.split('.')[0]) ||
        b.Name.toLowerCase().includes(domain.split('.')[0].toLowerCase())
      ))
      .slice(0, 10)
      .map(b => ({
        name: b.Name,
        domain: b.Domain,
        date: b.BreachDate,
        pwnCount: b.PwnCount,
        dataClasses: b.DataClasses
      }));

    res.json({
      domain,
      breaches: relevantBreaches,
      note: 'Domain-specific breach search requires HIBP Enterprise. Showing related breaches.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Claude AI - Attack Plan Generation
// ============================================================================
app.post('/api/attack-plan', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { domain, recon } = req.body;

  if (!domain || !recon) {
    return res.status(400).json({ error: 'Missing domain or recon data' });
  }

  try {
    const client = new Anthropic({ apiKey });

    const prompt = `You are a red team security consultant helping a blue team understand their attack surface.
Based on the following reconnaissance data for ${domain}, generate a realistic attack plan that an adversary might use.

RECONNAISSANCE DATA:
${JSON.stringify(recon, null, 2)}

Generate a 5-phase attack plan in this exact JSON format:
{
  "phases": [
    {
      "phase": "Phase name (e.g., Initial Access)",
      "tactic": "Specific technique based on the recon data",
      "time": "Estimated time (e.g., 2 min)",
      "risk": "critical|high|medium|low",
      "mitreId": "MITRE ATT&CK ID if applicable (e.g., T1566.001)"
    }
  ],
  "summary": "One sentence summary of the most likely attack path",
  "priorityDefenses": ["Top 3 defensive recommendations based on findings"]
}

Be specific to the actual findings. Reference real services, subdomains, or exposures found in the recon data.
Response must be valid JSON only, no markdown or explanation.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].text;

    // Parse the JSON response
    let attackPlan;
    try {
      attackPlan = JSON.parse(responseText);
    } catch {
      // If JSON parsing fails, try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        attackPlan = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    res.json({ domain, attackPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// Endpoint Attack Path Generator - For Attack Path Validator Demo
// ============================================================================
app.post('/api/endpoint-attack-path', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { endpointConfig } = req.body;

  if (!endpointConfig) {
    return res.status(400).json({ error: 'Missing endpoint configuration' });
  }

  try {
    const client = new Anthropic({ apiKey });

    const prompt = `You are a red team operator analyzing endpoint security configuration.
Given this endpoint config JSON, generate an attack path exploiting the security gaps found.

ENDPOINT CONFIGURATION:
${typeof endpointConfig === 'string' ? endpointConfig : JSON.stringify(endpointConfig, null, 2)}

Generate an attack path in this exact JSON format:
{
  "attacks": [
    {
      "step": 1,
      "technique": "MITRE ATT&CK ID (e.g., T1003.001)",
      "name": "Attack name",
      "description": "What this attack does",
      "exploits": "Which specific gap this exploits",
      "atomicTest": "Invoke-AtomicTest command to validate",
      "severity": "critical|high|medium",
      "expectedOutcome": "What happens if successful"
    }
  ],
  "summary": "One sentence describing the attack chain"
}

Focus on gaps like:
- Disabled ASR rules (especially LSASS protection)
- Defender exclusions
- Shared local admin accounts
- Disabled PowerShell logging

Response must be valid JSON only, no markdown.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }]
    });

    const responseText = message.content[0].text;

    let attackPath;
    try {
      attackPath = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        attackPath = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

    res.json({ attackPath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Streaming endpoint attack path with visible AI response
app.post('/api/endpoint-attack-path/stream', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { endpointConfig } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  if (!apiKey) {
    send({ type: 'error', message: 'ANTHROPIC_API_KEY not configured' });
    res.end();
    return;
  }

  try {
    const client = new Anthropic({ apiKey });

    const prompt = `You are a red team operator. Given this endpoint security configuration, explain step-by-step how you would exploit the gaps found.

ENDPOINT CONFIGURATION:
${typeof endpointConfig === 'string' ? endpointConfig : JSON.stringify(endpointConfig, null, 2)}

For each exploitable gap, explain:
1. What the gap is
2. The MITRE ATT&CK technique you'd use
3. The specific Atomic Red Team test command
4. What the successful attack enables

Be concise but specific. Reference the actual values from the config.`;

    send({ type: 'start' });

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }]
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
        send({ type: 'chunk', text: chunk.delta.text });
      }
    }

    send({ type: 'done' });
    res.end();
  } catch (error) {
    send({ type: 'error', message: error.message });
    res.end();
  }
});

// Streaming attack plan generation with visible AI thinking
app.post('/api/attack-plan/stream', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const { domain, recon } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Helper to send SSE
  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  if (!apiKey) {
    send({ type: 'error', message: 'ANTHROPIC_API_KEY not configured' });
    return res.end();
  }

  if (!domain) {
    send({ type: 'error', message: 'Missing domain' });
    return res.end();
  }

  try {
    const client = new Anthropic({ apiKey });

    send({ type: 'status', message: 'Starting attack plan generation...' });

    const prompt = `You are a red team security consultant. Analyze the target and generate a detailed attack playbook.

TARGET: ${domain}

RECONNAISSANCE DATA:
${JSON.stringify(recon || {}, null, 2)}

Think through this step by step, considering:
1. What attack surface is exposed?
2. What vulnerabilities might exist?
3. What's the most likely attack path?
4. How would an attacker chain techniques together?

Then generate a comprehensive 5-phase attack plan with MITRE ATT&CK mappings.

Format your response as:
<thinking>
Your step-by-step analysis here...
</thinking>

<plan>
{
  "target": "${domain}",
  "riskScore": 0-100,
  "phases": [
    {
      "id": 1,
      "name": "Phase name",
      "tactic": "Specific technique",
      "description": "Detailed description",
      "duration": "X min",
      "risk": "critical|high|medium|low",
      "mitreId": "T1XXX",
      "mitreName": "Technique Name",
      "tools": ["tool1", "tool2"],
      "indicators": ["IOC1", "IOC2"]
    }
  ],
  "summary": "One sentence summary",
  "totalTime": "~X minutes",
  "priorityDefenses": [
    {
      "priority": 1,
      "action": "Defense action",
      "rationale": "Why this matters"
    }
  ]
}
</plan>`;

    // Stream the response
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    });

    let fullResponse = '';
    let inThinking = false;
    let thinkingBuffer = '';

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        const text = event.delta.text;
        fullResponse += text;

        // Detect thinking section
        if (fullResponse.includes('<thinking>') && !fullResponse.includes('</thinking>')) {
          inThinking = true;
          const thinkingStart = fullResponse.indexOf('<thinking>') + 10;
          const newThinking = fullResponse.slice(thinkingStart);
          if (newThinking.length > thinkingBuffer.length) {
            const chunk = newThinking.slice(thinkingBuffer.length);
            send({ type: 'thinking', text: chunk });
            thinkingBuffer = newThinking;
          }
        } else if (inThinking && fullResponse.includes('</thinking>')) {
          inThinking = false;
          send({ type: 'status', message: 'Generating attack playbook...' });
        }
      }
    }

    // Extract and parse the plan
    const planMatch = fullResponse.match(/<plan>([\s\S]*?)<\/plan>/);
    if (planMatch) {
      try {
        const plan = JSON.parse(planMatch[1].trim());
        plan.generatedAt = new Date().toISOString();
        send({ type: 'complete', plan });
      } catch (e) {
        send({ type: 'error', message: 'Failed to parse attack plan' });
      }
    } else {
      // Try to extract JSON directly
      const jsonMatch = fullResponse.match(/\{[\s\S]*"phases"[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const plan = JSON.parse(jsonMatch[0]);
          plan.generatedAt = new Date().toISOString();
          send({ type: 'complete', plan });
        } catch (e) {
          send({ type: 'error', message: 'Failed to parse attack plan' });
        }
      } else {
        send({ type: 'error', message: 'No valid plan found in response' });
      }
    }
  } catch (error) {
    send({ type: 'error', message: error.message });
  }

  res.end();
});

// Demo attack plan endpoint (cached data)
app.post('/api/demo/attack-plan', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`);

  send({ type: 'status', message: 'Starting attack plan generation...' });

  // Stream thinking chunks
  let i = 0;
  const thinkingInterval = setInterval(() => {
    if (i < DEMO_ATTACK_PLAN_THINKING.length) {
      send(DEMO_ATTACK_PLAN_THINKING[i]);
      i++;
    } else {
      clearInterval(thinkingInterval);
      send({ type: 'status', message: 'Generating attack playbook...' });

      // Send complete plan after short delay
      setTimeout(() => {
        send({ type: 'complete', plan: { ...DEMO_ATTACK_PLAN, generatedAt: new Date().toISOString() } });
        res.end();
      }, DEMO_ATTACK_PLAN_TIMING.planGenerationDelay);
    }
  }, DEMO_ATTACK_PLAN_TIMING.thinkingInterval);
});

// Demo recon endpoint (cached data)
app.get('/api/demo/recon', (req, res) => {
  res.json({ ...DEMO_RECON_DATA, timestamp: new Date().toISOString() });
});

// ============================================================================
// Human Approval Workflow
// ============================================================================

// In-memory audit log for demo
const auditLog = [];

// Get AI recommendations
app.get('/api/recommendations', (req, res) => {
  // Return demo recommendations with fresh timestamps
  const recommendations = DEMO_RECOMMENDATIONS.map(r => ({
    ...r,
    timestamp: new Date().toISOString()
  }));
  res.json({ recommendations });
});

// Execute approved action
app.post('/api/actions/execute', async (req, res) => {
  const { recommendationId, action, target, approvedBy } = req.body;

  if (!action || !recommendationId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Find the recommendation
  const recommendation = DEMO_RECOMMENDATIONS.find(r => r.id === recommendationId);
  if (!recommendation) {
    return res.status(404).json({ error: 'Recommendation not found' });
  }

  // Get the simulated result
  const result = DEMO_ACTION_RESULTS[action];
  if (!result) {
    return res.status(400).json({ error: 'Unknown action' });
  }

  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, result.duration));

  // Create audit log entry
  const logEntry = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    recommendationId,
    action,
    target,
    approvedBy: approvedBy || 'operator',
    decision: 'approved',
    result: result.success ? 'success' : 'failed',
    details: result.details,
    verification: result.verification,
    executionTime: result.duration
  };

  auditLog.unshift(logEntry);

  res.json({
    success: result.success,
    logEntry,
    message: result.details,
    verification: result.verification
  });
});

// Reject a recommendation
app.post('/api/actions/reject', (req, res) => {
  const { recommendationId, action, target, reason, rejectedBy } = req.body;

  if (!recommendationId) {
    return res.status(400).json({ error: 'Missing recommendation ID' });
  }

  // Create audit log entry
  const logEntry = {
    id: randomUUID(),
    timestamp: new Date().toISOString(),
    recommendationId,
    action,
    target,
    rejectedBy: rejectedBy || 'operator',
    decision: 'rejected',
    reason: reason || 'No reason provided',
    result: 'skipped'
  };

  auditLog.unshift(logEntry);

  res.json({
    success: true,
    logEntry,
    message: 'Action rejected and logged'
  });
});

// Get audit log
app.get('/api/audit-log', (req, res) => {
  res.json({ entries: auditLog });
});

// Clear audit log (for demo reset)
app.delete('/api/audit-log', (req, res) => {
  auditLog.length = 0;
  res.json({ success: true, message: 'Audit log cleared' });
});

// ============================================================================
// Full Recon - Orchestrates all APIs
// ============================================================================
app.get('/api/recon/:domain', async (req, res) => {
  const { domain } = req.params;
  const results = {
    domain,
    timestamp: new Date().toISOString(),
    dns: null,
    subdomains: null,
    services: null,
    breaches: null,
    errors: []
  };

  // Run all recon in parallel
  const [dnsResult, subdomainsResult, servicesResult, breachesResult] = await Promise.allSettled([
    fetch(`http://localhost:${PORT}/api/dns/${domain}`).then(r => r.json()),
    fetch(`http://localhost:${PORT}/api/subdomains/${domain}`).then(r => r.json()),
    fetch(`http://localhost:${PORT}/api/shodan/${domain}`).then(r => r.json()),
    fetch(`http://localhost:${PORT}/api/breaches/${domain}`).then(r => r.json())
  ]);

  if (dnsResult.status === 'fulfilled') results.dns = dnsResult.value;
  else results.errors.push({ api: 'dns', error: dnsResult.reason?.message });

  if (subdomainsResult.status === 'fulfilled') results.subdomains = subdomainsResult.value;
  else results.errors.push({ api: 'subdomains', error: subdomainsResult.reason?.message });

  if (servicesResult.status === 'fulfilled') results.services = servicesResult.value;
  else results.errors.push({ api: 'shodan', error: servicesResult.reason?.message });

  if (breachesResult.status === 'fulfilled') results.breaches = breachesResult.value;
  else results.errors.push({ api: 'hibp', error: breachesResult.reason?.message });

  res.json(results);
});

// ============================================================================
// WebSocket Terminal Server (PTY)
// ============================================================================

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws, req) => {
  // SECURITY: Block non-localhost WebSocket connections
  const ip = req.socket.remoteAddress || '';
  if (!ALLOWED_IPS.some(allowed => ip.includes(allowed))) {
    console.warn(`[BLOCKED] Non-localhost WebSocket from ${ip}`);
    ws.send('\x1b[31mAccess denied: localhost only\x1b[0m\r\n');
    ws.close();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathParts = url.pathname.split('/').filter(Boolean);

  // Handle /terminal/claude endpoint
  if (pathParts[0] === 'terminal' && pathParts[1] === 'claude') {
    handleClaudeTerminal(ws, url);
  } else if (pathParts[0] === 'terminal' && pathParts[1] === 'attacker') {
    handleAttackerTerminal(ws, url);
  } else if (pathParts[0] === 'terminal' && pathParts[1] === 'shell') {
    handleShellTerminal(ws, url);
  } else {
    ws.send('\x1b[31mUnknown terminal endpoint\x1b[0m\r\n');
    ws.close();
  }
});

function handleClaudeTerminal(ws, url) {
  const sessionId = url.searchParams.get('sessionId');
  let session;

  // If no sessionId provided, clean up orphaned sessions (from HMR restarts)
  if (!sessionId) {
    for (const [id, oldSession] of ptySessions) {
      if (!oldSession.ws || oldSession.ws.readyState !== 1) {
        console.log(`Cleaning up orphaned Claude session ${id.slice(0, 8)}`);
        oldSession.pty.kill();
        ptySessions.delete(id);
      }
    }
  }

  // Try to reconnect to existing session
  if (sessionId && ptySessions.has(sessionId)) {
    session = ptySessions.get(sessionId);

    // Detach previous WebSocket if exists
    if (session.ws && session.ws.readyState === 1) {
      session.ws.send(JSON.stringify({
        type: 'takeover',
        message: 'Session taken over by another client'
      }));
      session.ws.close();
    }

    session.ws = ws;

    ws.send(JSON.stringify({
      type: 'session',
      sessionId: session.id,
      reconnected: true
    }));
    ws.send('\r\n\x1b[33mReconnected to existing Claude Code session\x1b[0m\r\n');
  } else {
    // Create new session
    const newSessionId = randomUUID();

    // Determine Claude Code command
    const nativePath = join(homedir(), '.local', 'bin', 'claude');
    const hasNative = existsSync(nativePath);

    const commandStr = '/bin/bash';
    let args;

    if (hasNative) {
      args = ['-c', `${nativePath} --dangerously-skip-permissions`];
    } else {
      args = ['-c', 'npx -y @anthropic-ai/claude-code@latest --dangerously-skip-permissions'];
    }

    const ptyProcess = pty.spawn(commandStr, args, {
      name: 'xterm-256color',
      cols: 120,
      rows: 30,
      cwd: process.cwd(),
      env: {
        ...process.env,
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor'
      }
    });

    session = {
      id: newSessionId,
      pty: ptyProcess,
      ws: ws,
      createdAt: new Date()
    };

    ptySessions.set(newSessionId, session);

    ws.send(JSON.stringify({
      type: 'session',
      sessionId: newSessionId,
      reconnected: false
    }));
    ws.send(`\r\n\x1b[32mStarting Claude Code session (ID: ${newSessionId.slice(0, 8)})\x1b[0m\r\n`);
  }

  const ptyProcess = session.pty;

  // PTY -> WebSocket
  const dataHandler = (data) => {
    if (ws.readyState === 1) { // WebSocket.OPEN
      ws.send(data);
    }
  };
  ptyProcess.onData(dataHandler);

  // WebSocket -> PTY
  ws.on('message', (data) => {
    const dataStr = Buffer.isBuffer(data) ? data.toString() : data.toString();

    // Handle control messages
    if (dataStr.length > 8 && dataStr[0] === '{' && dataStr.slice(0, 8) === '{"type":') {
      try {
        const msg = JSON.parse(dataStr);
        if (msg.type === 'resize' && msg.cols && msg.rows) {
          ptyProcess.resize(msg.cols, msg.rows);
          return;
        }
      } catch (e) {
        // Not valid JSON, treat as terminal input
      }
    }

    // Terminal input
    ptyProcess.write(dataStr);
  });

  // Handle WebSocket close
  ws.on('close', () => {
    // Keep PTY alive for reconnection
    console.log(`WebSocket closed for session ${session.id.slice(0, 8)}`);
    session.ws = null;
  });

  // Handle PTY exit
  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(`PTY exited for session ${session.id.slice(0, 8)} (code: ${exitCode}, signal: ${signal})`);
    ptySessions.delete(session.id);
    if (ws.readyState === 1) {
      ws.send(`\r\n\x1b[33mSession ended (exit code: ${exitCode})\x1b[0m\r\n`);
      ws.close();
    }
  });
}

// Attacker terminal sessions (separate from Claude sessions)
const attackerSessions = new Map();

function handleAttackerTerminal(ws, url) {
  const sessionId = url.searchParams.get('sessionId');
  let session;

  // If no sessionId provided, clean up orphaned sessions (from HMR restarts)
  if (!sessionId) {
    for (const [id, oldSession] of attackerSessions) {
      if (!oldSession.ws || oldSession.ws.readyState !== 1) {
        console.log(`Cleaning up orphaned attacker session ${id.slice(0, 8)}`);
        oldSession.pty.kill();
        attackerSessions.delete(id);
      }
    }
  }

  // Try to reconnect to existing session
  if (sessionId && attackerSessions.has(sessionId)) {
    session = attackerSessions.get(sessionId);

    // Detach previous WebSocket if exists
    if (session.ws && session.ws.readyState === 1) {
      session.ws.send(JSON.stringify({
        type: 'takeover',
        message: 'Session taken over by another client'
      }));
      session.ws.close();
    }

    session.ws = ws;

    ws.send(JSON.stringify({
      type: 'session',
      sessionId: session.id,
      reconnected: true
    }));
    ws.send('\r\n\x1b[33mReconnected to attacker session\x1b[0m\r\n');
  } else {
    // Create new session
    const newSessionId = randomUUID();

    // Spawn local bash shell for attacker terminal
    // Tools needed: nmap, python3, impacket (installed on host)
    const ptyProcess = pty.spawn('/bin/bash', [], {
      name: 'xterm-256color',
      cols: 120,
      rows: 30,
      cwd: process.cwd(),
      env: {
        ...process.env,
        TERM: 'xterm-256color',
        COLORTERM: 'truecolor'
      }
    });

    session = {
      id: newSessionId,
      pty: ptyProcess,
      ws: ws,
      createdAt: new Date(),
      type: 'attacker'
    };

    attackerSessions.set(newSessionId, session);

    ws.send(JSON.stringify({
      type: 'session',
      sessionId: newSessionId,
      reconnected: false
    }));
    ws.send(`\r\n\x1b[33mSession ID: ${newSessionId.slice(0, 8)}\x1b[0m\r\n\r\n`);
  }

  const ptyProcess = session.pty;

  // PTY -> WebSocket
  const dataHandler = (data) => {
    if (ws.readyState === 1) {
      ws.send(data);
    }
  };
  ptyProcess.onData(dataHandler);

  // WebSocket -> PTY
  ws.on('message', (data) => {
    const dataStr = Buffer.isBuffer(data) ? data.toString() : data.toString();

    // Handle control messages
    if (dataStr.length > 8 && dataStr[0] === '{' && dataStr.slice(0, 8) === '{"type":') {
      try {
        const msg = JSON.parse(dataStr);
        if (msg.type === 'resize' && msg.cols && msg.rows) {
          ptyProcess.resize(msg.cols, msg.rows);
          return;
        }
      } catch (e) {
        // Not valid JSON, treat as terminal input
      }
    }

    // Terminal input
    ptyProcess.write(dataStr);
  });

  // Handle WebSocket close
  ws.on('close', () => {
    console.log(`Attacker WebSocket closed for session ${session.id.slice(0, 8)}`);
    session.ws = null;
  });

  // Handle PTY exit
  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(`Attacker PTY exited for session ${session.id.slice(0, 8)} (code: ${exitCode}, signal: ${signal})`);
    attackerSessions.delete(session.id);
    if (ws.readyState === 1) {
      ws.send(`\r\n\x1b[33mAttacker session ended (exit code: ${exitCode})\x1b[0m\r\n`);
      ws.close();
    }
  });
}

// Plain shell terminal sessions (for demo purposes - just a bash shell)
const shellSessions = new Map();

function handleShellTerminal(ws, url) {
  const sessionId = url.searchParams.get('sessionId');
  let session;

  // Clean up orphaned sessions
  if (!sessionId) {
    for (const [id, oldSession] of shellSessions) {
      if (!oldSession.ws || oldSession.ws.readyState !== 1) {
        console.log(`Cleaning up orphaned shell session ${id.slice(0, 8)}`);
        oldSession.pty.kill();
        shellSessions.delete(id);
      }
    }
  }

  // Try to reconnect to existing session
  if (sessionId && shellSessions.has(sessionId)) {
    session = shellSessions.get(sessionId);
    session.ws = ws;
    ws.send(JSON.stringify({ type: 'session', sessionId: session.id }));
    console.log(`Reconnected to shell session ${session.id.slice(0, 8)}`);
  } else {
    // Create new session with bash shell
    const newSessionId = crypto.randomUUID();

    const ptyProcess = pty.spawn('/bin/bash', [], {
      name: 'xterm-256color',
      cols: 120,
      rows: 30,
      cwd: process.env.HOME || '/tmp',
      env: { ...process.env, TERM: 'xterm-256color' }
    });

    session = {
      id: newSessionId,
      pty: ptyProcess,
      ws: ws,
      createdAt: new Date()
    };

    shellSessions.set(newSessionId, session);
    ws.send(JSON.stringify({ type: 'session', sessionId: newSessionId }));
    console.log(`Created new shell session ${newSessionId.slice(0, 8)}`);
  }

  const ptyProcess = session.pty;

  // PTY -> WebSocket
  const dataHandler = (data) => {
    if (ws.readyState === 1) {
      ws.send(data);
    }
  };
  ptyProcess.onData(dataHandler);

  // WebSocket -> PTY
  ws.on('message', (data) => {
    const dataStr = data.toString();

    // Check for resize messages
    if (dataStr.startsWith('{')) {
      try {
        const msg = JSON.parse(dataStr);
        if (msg.type === 'resize' && msg.cols && msg.rows) {
          ptyProcess.resize(msg.cols, msg.rows);
          return;
        }
      } catch (e) {
        // Not valid JSON, treat as terminal input
      }
    }
    // Terminal input
    ptyProcess.write(dataStr);
  });

  ws.on('close', () => {
    console.log(`Shell session ${session.id.slice(0, 8)} client disconnected`);
    session.ws = null;
  });

  // Handle PTY exit
  ptyProcess.onExit(({ exitCode, signal }) => {
    console.log(`Shell PTY exited for session ${session.id.slice(0, 8)} (code: ${exitCode}, signal: ${signal})`);
    shellSessions.delete(session.id);
    if (ws.readyState === 1) {
      ws.close();
    }
  });
}

// Clean up old sessions periodically (1 hour timeout)
setInterval(() => {
  const now = Date.now();

  // Clean Claude sessions
  for (const [id, session] of ptySessions) {
    if (!session.ws && (now - session.createdAt.getTime()) > 3600000) {
      console.log(`Cleaning up stale Claude session ${id.slice(0, 8)}`);
      session.pty.kill();
      ptySessions.delete(id);
    }
  }

  // Clean attacker sessions
  for (const [id, session] of attackerSessions) {
    if (!session.ws && (now - session.createdAt.getTime()) > 3600000) {
      console.log(`Cleaning up stale attacker session ${id.slice(0, 8)}`);
      session.pty.kill();
      attackerSessions.delete(id);
    }
  }

  // Clean shell sessions
  for (const [id, session] of shellSessions) {
    if (!session.ws && (now - session.createdAt.getTime()) > 3600000) {
      console.log(`Cleaning up stale shell session ${id.slice(0, 8)}`);
      session.pty.kill();
      shellSessions.delete(id);
    }
  }
}, 60000);

// ============================================================================
// Live Attack Demo API Endpoints
// ============================================================================

// Demo infrastructure URLs (configurable via env)
const DEMO_SIEM_URL = process.env.DEMO_SIEM_URL || 'http://localhost:8081';
const DEMO_ATTACKER_URL = process.env.DEMO_ATTACKER_URL || 'http://localhost:8080';

// Proxy SIEM alert stream (SSE)
app.get('/api/siem/alerts/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const response = await fetch(`${DEMO_SIEM_URL}/api/alerts/stream`);

    if (!response.ok) {
      res.write(`data: ${JSON.stringify({ error: 'SIEM not available' })}\n\n`);
      return;
    }

    // Pipe the SIEM stream to client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const pump = async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(decoder.decode(value));
      }
    };

    pump().catch(err => {
      console.error('SIEM stream error:', err);
    });

    req.on('close', () => {
      reader.cancel();
    });
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  }
});

// Get SIEM alerts
app.get('/api/siem/alerts', async (req, res) => {
  try {
    const response = await fetch(`${DEMO_SIEM_URL}/api/alerts?limit=50`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, note: 'Is demo-infra running?' });
  }
});

// Get SIEM stats
app.get('/api/siem/stats', async (req, res) => {
  try {
    const response = await fetch(`${DEMO_SIEM_URL}/api/stats`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, note: 'Is demo-infra running?' });
  }
});

// Start attack - executes attack_runner in the attacker container and streams results
app.post('/api/attack/start', async (req, res) => {
  const speed = req.body.speed || 'normal';

  res.setHeader('Content-Type', 'application/x-ndjson');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    // Execute attack via podman/docker exec
    const { spawn } = await import('child_process');

    // Determine if we have podman or docker
    const containerRuntime = process.env.CONTAINER_RUNTIME || 'podman';

    const attackProcess = spawn(containerRuntime, [
      'exec',
      'red-team',
      'python', 'attack_runner.py',
      '--speed', speed
    ], {
      env: { ...process.env, JSON_OUTPUT: '1' }
    });

    attackProcess.stdout.on('data', (data) => {
      const lines = data.toString().split('\n').filter(l => l.trim());
      for (const line of lines) {
        // Try to parse as JSON for structured events
        try {
          const event = JSON.parse(line);
          res.write(JSON.stringify(event) + '\n');
        } catch {
          // Raw terminal output - extract phase/action/status if possible
          const phaseMatch = line.match(/\[([\w_]+)\]/i);
          const statusMatch = line.match(/\[(SUCCESS|FAILED|ATTEMPTED)\]/i);

          res.write(JSON.stringify({
            raw: line,
            phase: phaseMatch ? phaseMatch[1].toLowerCase() : null,
            status: statusMatch ? statusMatch[1].toLowerCase() : null
          }) + '\n');
        }
      }
    });

    attackProcess.stderr.on('data', (data) => {
      res.write(JSON.stringify({ stderr: data.toString() }) + '\n');
    });

    attackProcess.on('close', (code) => {
      res.write(JSON.stringify({ type: 'complete', exitCode: code }) + '\n');
      res.end();
    });

    attackProcess.on('error', (err) => {
      res.write(JSON.stringify({ error: err.message }) + '\n');
      res.end();
    });

    // Handle client disconnect
    req.on('close', () => {
      attackProcess.kill();
    });

  } catch (error) {
    res.write(JSON.stringify({ error: error.message }) + '\n');
    res.end();
  }
});

// Check demo infrastructure health
app.get('/api/demo/health', async (req, res) => {
  const health = {
    vulnerableApp: false,
    siem: false,
    ollama: false,
    attacker: false
  };

  try {
    const vuln = await fetch('http://localhost:8080/api/health', { timeout: 2000 });
    health.vulnerableApp = vuln.ok;
  } catch {}

  try {
    const siem = await fetch('http://localhost:8081/api/health', { timeout: 2000 });
    health.siem = siem.ok;
  } catch {}

  try {
    const ollama = await fetch('http://localhost:11434/api/tags', { timeout: 2000 });
    health.ollama = ollama.ok;
  } catch {}

  // Check if attacker container is running
  try {
    const { exec } = await import('child_process');
    const runtime = process.env.CONTAINER_RUNTIME || 'podman';
    await new Promise((resolve, reject) => {
      exec(`${runtime} ps --filter name=red-team --format '{{.Names}}'`, (err, stdout) => {
        health.attacker = stdout.includes('red-team');
        resolve();
      });
    });
  } catch {}

  res.json({
    status: Object.values(health).every(v => v) ? 'healthy' : 'degraded',
    services: health
  });
});

// ============================================================================
// Defender AI Endpoints
// ============================================================================

// Analyze alerts with AI
app.post('/api/defender/analyze', async (req, res) => {
  const { alerts } = req.body;

  if (!alerts || !Array.isArray(alerts)) {
    return res.status(400).json({ error: 'alerts array required' });
  }

  try {
    const analysis = await defenderAI.analyzeAlerts(alerts);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Stream analysis results
app.post('/api/defender/analyze/stream', async (req, res) => {
  const { alerts } = req.body;

  if (!alerts || !Array.isArray(alerts)) {
    return res.status(400).json({ error: 'alerts array required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    for await (const event of defenderAI.analyzeAlertsStream(alerts)) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
  } catch (error) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
  }

  res.end();
});

// Generate Sigma rule from pattern
app.post('/api/defender/sigma', async (req, res) => {
  const { pattern, logs } = req.body;

  if (!pattern) {
    return res.status(400).json({ error: 'pattern required' });
  }

  try {
    const rule = await defenderAI.generateSigmaRule(pattern, logs || []);
    res.json({ rule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Quick classify a single alert
app.post('/api/defender/classify', async (req, res) => {
  const { alert } = req.body;

  if (!alert) {
    return res.status(400).json({ error: 'alert required' });
  }

  try {
    const classification = await defenderAI.classifyAlert(alert);
    res.json(classification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate incident response playbook
app.post('/api/defender/playbook', async (req, res) => {
  const { incident } = req.body;

  if (!incident) {
    return res.status(400).json({ error: 'incident required' });
  }

  try {
    const playbook = await defenderAI.generatePlaybook(incident);
    res.json(playbook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Full analysis: fetch alerts from SIEM and analyze
app.post('/api/defender/full-analysis', async (req, res) => {
  const { hours = 1 } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Step 1: Fetch alerts from SIEM
    res.write(`data: ${JSON.stringify({ type: 'progress', phase: 'fetch', message: 'Fetching alerts from SIEM...' })}\n\n`);

    const siemResponse = await fetch(`${DEMO_SIEM_URL}/api/export?hours=${hours}`);
    if (!siemResponse.ok) {
      throw new Error('Failed to fetch from SIEM');
    }

    const siemData = await siemResponse.json();
    const alerts = siemData.alerts || [];

    res.write(`data: ${JSON.stringify({ type: 'progress', phase: 'fetch', message: `Retrieved ${alerts.length} alerts` })}\n\n`);

    if (alerts.length === 0) {
      res.write(`data: ${JSON.stringify({ type: 'complete', analysis: { message: 'No alerts to analyze' } })}\n\n`);
      return res.end();
    }

    // Step 2: Stream AI analysis
    for await (const event of defenderAI.analyzeAlertsStream(alerts)) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }

  } catch (error) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
  }

  res.end();
});

// Server binding - use BIND_HOST=127.0.0.1 for full localhost-only mode
const BIND_HOST = process.env.BIND_HOST || '0.0.0.0';

server.listen(PORT, BIND_HOST, () => {
  console.log(`🔒 Server bound to ${BIND_HOST}:${PORT}`);
  console.log(`   Terminal/attack endpoints: localhost only`);
  console.log(`   Demo/health endpoints: ${BIND_HOST === '127.0.0.1' ? 'localhost only' : 'open (safe endpoints)'}`);
  console.log(`🔍 OSINT API server running on http://localhost:${PORT}`);
  console.log(`🖥️  Terminal WebSocket available at ws://localhost:${PORT}/terminal/claude`);
  console.log(`   APIs configured:`);
  console.log(`   - Shodan: ${process.env.SHODAN_API_KEY ? '✓' : '✗'}`);
  console.log(`   - HIBP: ${process.env.HIBP_API_KEY ? '✓' : '✗'}`);
  console.log(`   - Claude: ${process.env.ANTHROPIC_API_KEY ? '✓' : '✗'}`);
});
