/**
 * Defender AI - Security Alert Triage and Response
 * =================================================
 * Uses LLM to analyze security alerts, generate detection rules,
 * and recommend response actions.
 *
 * Supports:
 * - Claude API (cloud)
 * - Ollama (local/offline)
 */

import Anthropic from '@anthropic-ai/sdk';

// Analysis prompts
const TRIAGE_PROMPT = `You are an expert SOC analyst performing alert triage and incident response.

Analyze the following security alerts and logs from our SIEM. Provide a comprehensive security analysis.

ALERTS AND LOGS:
{alerts}

Provide your analysis in the following JSON structure:
{
  "incident_summary": {
    "title": "Brief incident title",
    "severity": "critical|high|medium|low",
    "confidence": 0-100,
    "attack_type": "Type of attack detected",
    "mitre_tactics": ["List of MITRE ATT&CK tactics observed"],
    "mitre_techniques": ["List of MITRE ATT&CK techniques with IDs"]
  },
  "chain_of_thought": [
    "Step-by-step reasoning about why these alerts indicate malicious activity",
    "Each step should explain a specific observation and its significance",
    "Include timeline correlation if multiple events are related"
  ],
  "iocs": {
    "ip_addresses": ["Suspicious IPs"],
    "domains": ["Suspicious domains"],
    "file_hashes": ["Any file hashes"],
    "user_accounts": ["Compromised or suspicious accounts"],
    "other": ["Other indicators"]
  },
  "sigma_rule": {
    "title": "Detection rule name",
    "description": "What this rule detects",
    "rule_yaml": "Complete Sigma rule in YAML format"
  },
  "recommended_actions": [
    {
      "priority": 1,
      "action": "Specific action to take",
      "rationale": "Why this action is recommended",
      "automated": true/false
    }
  ],
  "executive_summary": "2-3 sentence summary for non-technical stakeholders"
}

Be specific and reference actual data from the alerts. Generate a real, usable Sigma rule.
Response must be valid JSON only.`;

const SIGMA_RULE_PROMPT = `You are a detection engineering expert. Generate a Sigma detection rule for the following attack pattern.

ATTACK PATTERN:
{pattern}

SAMPLE LOGS:
{logs}

Generate a complete, production-ready Sigma rule in YAML format that would detect this attack pattern.
The rule should:
1. Have appropriate metadata (title, description, author, date, references)
2. Use correct Sigma syntax and field mappings
3. Include appropriate detection logic with selection and condition
4. Set appropriate severity level
5. Include MITRE ATT&CK mapping in tags

Return ONLY the Sigma rule YAML, no explanation.`;

/**
 * Defender AI class for security analysis
 */
export class DefenderAI {
  constructor(options = {}) {
    this.useOllama = options.useOllama || false;
    this.ollamaUrl = options.ollamaUrl || 'http://localhost:11434';
    this.ollamaModel = options.ollamaModel || 'llama3.2:3b';
    this.anthropicKey = options.anthropicKey || process.env.ANTHROPIC_API_KEY;

    if (this.anthropicKey) {
      this.claude = new Anthropic({ apiKey: this.anthropicKey });
    }
  }

  /**
   * Query LLM (Claude or Ollama)
   */
  async query(prompt, options = {}) {
    if (this.useOllama) {
      return this.queryOllama(prompt, options);
    } else if (this.claude) {
      return this.queryClaude(prompt, options);
    } else {
      throw new Error('No LLM configured. Set ANTHROPIC_API_KEY or enable Ollama.');
    }
  }

  /**
   * Query Claude API
   */
  async queryClaude(prompt, options = {}) {
    const message = await this.claude.messages.create({
      model: options.model || 'claude-sonnet-4-20250514',
      max_tokens: options.maxTokens || 4096,
      messages: [{ role: 'user', content: prompt }]
    });

    return message.content[0].text;
  }

  /**
   * Query Ollama (local LLM)
   */
  async queryOllama(prompt, options = {}) {
    const response = await fetch(`${this.ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: options.model || this.ollamaModel,
        prompt: prompt,
        stream: false,
        options: {
          temperature: options.temperature || 0.3,
          num_predict: options.maxTokens || 4096
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  }

  /**
   * Analyze security alerts and generate triage report
   */
  async analyzeAlerts(alerts, options = {}) {
    // Format alerts for the prompt
    const alertsJson = JSON.stringify(alerts, null, 2);
    const prompt = TRIAGE_PROMPT.replace('{alerts}', alertsJson);

    const response = await this.query(prompt, options);

    // Parse JSON response
    try {
      // Try to extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('No JSON found in response');
    } catch (e) {
      // Return raw response if parsing fails
      return {
        error: 'Failed to parse structured response',
        raw_response: response
      };
    }
  }

  /**
   * Generate Sigma detection rule from attack pattern
   */
  async generateSigmaRule(pattern, sampleLogs = [], options = {}) {
    const prompt = SIGMA_RULE_PROMPT
      .replace('{pattern}', pattern)
      .replace('{logs}', JSON.stringify(sampleLogs, null, 2));

    const response = await this.query(prompt, options);

    // Extract YAML from response
    const yamlMatch = response.match(/```ya?ml\n?([\s\S]*?)```/) ||
                      response.match(/^(title:[\s\S]*)/m);

    if (yamlMatch) {
      return yamlMatch[1].trim();
    }

    return response.trim();
  }

  /**
   * Stream analysis results (for real-time UI updates)
   */
  async *analyzeAlertsStream(alerts, options = {}) {
    const alertsJson = JSON.stringify(alerts, null, 2);
    const prompt = TRIAGE_PROMPT.replace('{alerts}', alertsJson);

    // Emit progress events
    yield { type: 'start', message: 'Starting security analysis...' };

    yield { type: 'progress', phase: 'ingestion', message: `Analyzing ${alerts.length} alerts...` };

    // For streaming with Ollama
    if (this.useOllama) {
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: options.model || this.ollamaModel,
          prompt: prompt,
          stream: true
        })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      yield { type: 'progress', phase: 'analysis', message: 'AI analyzing patterns...' };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.response) {
              fullResponse += data.response;
              yield { type: 'chunk', content: data.response };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }

      yield { type: 'progress', phase: 'parsing', message: 'Structuring results...' };

      // Parse final response
      try {
        const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          yield { type: 'complete', analysis };
        } else {
          yield { type: 'complete', analysis: { raw_response: fullResponse } };
        }
      } catch (e) {
        yield { type: 'complete', analysis: { raw_response: fullResponse } };
      }
    } else {
      // Non-streaming for Claude
      yield { type: 'progress', phase: 'analysis', message: 'AI analyzing patterns...' };

      const response = await this.queryClaude(prompt, options);

      yield { type: 'progress', phase: 'parsing', message: 'Structuring results...' };

      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          yield { type: 'complete', analysis };
        } else {
          yield { type: 'complete', analysis: { raw_response: response } };
        }
      } catch (e) {
        yield { type: 'complete', analysis: { raw_response: response } };
      }
    }
  }

  /**
   * Quick classification of alert severity
   */
  async classifyAlert(alert, options = {}) {
    const prompt = `Classify this security alert. Respond with JSON only:
{"severity": "critical|high|medium|low", "attack_type": "type", "confidence": 0-100, "brief": "one line explanation"}

Alert: ${JSON.stringify(alert)}`;

    const response = await this.query(prompt, { ...options, maxTokens: 200 });

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Fall through
    }

    return { severity: 'medium', attack_type: 'unknown', confidence: 50, brief: 'Unable to classify' };
  }

  /**
   * Generate response playbook for incident
   */
  async generatePlaybook(incident, options = {}) {
    const prompt = `Generate an incident response playbook for the following security incident.
Include specific commands and actions for each step.

Incident: ${JSON.stringify(incident, null, 2)}

Respond with JSON:
{
  "playbook_name": "Name",
  "estimated_time": "X minutes",
  "steps": [
    {
      "step": 1,
      "title": "Step title",
      "description": "What to do",
      "commands": ["command1", "command2"],
      "verification": "How to verify completion"
    }
  ]
}`;

    const response = await this.query(prompt, options);

    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      // Fall through
    }

    return { error: 'Failed to generate playbook', raw: response };
  }
}

export default DefenderAI;
