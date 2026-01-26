/**
 * Pre-recorded Demo Data for Fallback Mode
 * ==========================================
 * Used when live demo fails or for rehearsals.
 * Data is realistic and matches what live systems produce.
 */

// Pre-recorded attack events (what attack_runner.py produces)
export const DEMO_ATTACK_EVENTS = [
  // Phase 1: Reconnaissance
  { phase: 'recon', action: 'Fetch robots.txt', status: 'success', technique: 'T1592.002', details: 'Found 4 hidden paths', elapsed: 0.5 },
  { phase: 'recon', action: 'Access debug endpoint', status: 'success', technique: 'T1592.004', details: 'System info exposed!', elapsed: 1.3 },
  { phase: 'recon', action: 'Enumerate API users', status: 'success', technique: 'T1087.001', details: 'Found 3 user accounts', elapsed: 2.1 },

  // Phase 2: Initial Access
  { phase: 'initial_access', action: 'SQL Injection auth bypass', status: 'success', technique: 'T1190', details: "Payload: ' OR '1'='1' --", elapsed: 4.5 },
  { phase: 'initial_access', action: 'Extract credentials (UNION)', status: 'success', technique: 'T1190', details: 'Credentials dumped!', elapsed: 5.8 },

  // Phase 3: Execution
  { phase: 'execution', action: 'Command injection: id', status: 'success', technique: 'T1059.004', details: 'Got shell access!', elapsed: 8.2 },
  { phase: 'execution', action: 'Read /etc/passwd', status: 'success', technique: 'T1059.004', details: 'System users extracted', elapsed: 9.5 },
  { phase: 'execution', action: 'Reverse shell attempt', status: 'attempted', technique: 'T1059.004', details: 'Connection attempt made', elapsed: 10.8 },

  // Phase 4: Discovery
  { phase: 'discovery', action: 'Path traversal: /etc/passwd', status: 'success', technique: 'T1083', details: 'File contents exposed', elapsed: 13.2 },
  { phase: 'discovery', action: 'Read process environment', status: 'failed', technique: 'T1083', details: 'File not accessible', elapsed: 14.5 },

  // Phase 5: Exfiltration
  { phase: 'exfiltration', action: 'Extract secrets table', status: 'success', technique: 'T1041', details: 'API keys and secrets dumped!', elapsed: 17.0 },
  { phase: 'exfiltration', action: 'Extract API keys', status: 'success', technique: 'T1041', details: 'User API keys compromised!', elapsed: 18.3 },

  // Complete
  { type: 'complete', exitCode: 0, elapsed: 20.0 }
];

// Pre-recorded SIEM alerts
export const DEMO_ALERTS = [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    rule_id: 'DEBUG_ENDPOINT_ACCESS',
    rule_name: 'Debug Endpoint Accessed',
    severity: 'medium',
    message: 'Sensitive debug information endpoint was accessed from 172.18.0.5',
    source_ip: '172.18.0.5',
    mitre_attack: 'T1592'
  },
  {
    id: 2,
    timestamp: new Date().toISOString(),
    rule_id: 'SQL_INJECTION_ATTEMPT',
    rule_name: 'SQL Injection Attempt Detected',
    severity: 'high',
    message: "Potential SQL injection: ' OR '1'='1' -- in login form",
    source_ip: '172.18.0.5',
    mitre_attack: 'T1190'
  },
  {
    id: 3,
    timestamp: new Date().toISOString(),
    rule_id: 'SQL_INJECTION_ATTEMPT',
    rule_name: 'SQL Injection Attempt Detected',
    severity: 'high',
    message: "UNION-based injection detected in search: UNION SELECT...FROM users",
    source_ip: '172.18.0.5',
    mitre_attack: 'T1190'
  },
  {
    id: 4,
    timestamp: new Date().toISOString(),
    rule_id: 'COMMAND_INJECTION_ATTEMPT',
    rule_name: 'Command Injection Attempt',
    severity: 'critical',
    message: 'Command injection in ping utility: 127.0.0.1; id',
    source_ip: '172.18.0.5',
    mitre_attack: 'T1059'
  },
  {
    id: 5,
    timestamp: new Date().toISOString(),
    rule_id: 'COMMAND_INJECTION_ATTEMPT',
    rule_name: 'Command Injection Attempt',
    severity: 'critical',
    message: 'Sensitive file read attempt: cat /etc/passwd',
    source_ip: '172.18.0.5',
    mitre_attack: 'T1059'
  },
  {
    id: 6,
    timestamp: new Date().toISOString(),
    rule_id: 'PATH_TRAVERSAL_ATTEMPT',
    rule_name: 'Path Traversal Attempt',
    severity: 'high',
    message: 'Path traversal detected: ../../../etc/passwd',
    source_ip: '172.18.0.5',
    mitre_attack: 'T1083'
  },
  {
    id: 7,
    timestamp: new Date().toISOString(),
    rule_id: 'SQL_INJECTION_ATTEMPT',
    rule_name: 'SQL Injection Attempt Detected',
    severity: 'critical',
    message: "Data exfiltration via SQLi: UNION SELECT...FROM secrets",
    source_ip: '172.18.0.5',
    mitre_attack: 'T1041'
  }
];

// Pre-recorded AI analysis result
export const DEMO_ANALYSIS = {
  incident_summary: {
    title: 'Multi-Stage Web Application Attack',
    severity: 'critical',
    confidence: 95,
    attack_type: 'Automated penetration test / Web application exploitation',
    mitre_tactics: ['Reconnaissance', 'Initial Access', 'Execution', 'Discovery', 'Exfiltration'],
    mitre_techniques: ['T1592 - Gather Victim Host Information', 'T1190 - Exploit Public-Facing Application', 'T1059.004 - Unix Shell', 'T1083 - File and Directory Discovery', 'T1041 - Exfiltration Over C2 Channel']
  },
  chain_of_thought: [
    'Initial reconnaissance began at timestamp T+0s with robots.txt enumeration, revealing hidden admin paths - this is a common first step in automated scanning.',
    'The attacker discovered and accessed an exposed debug endpoint, which leaked system information including Python version, platform details, and environment variables.',
    'SQL injection attacks were detected in both the login form and search functionality, using classic payloads like OR 1=1 and UNION SELECT statements.',
    'Successful authentication bypass was followed by credential extraction, indicating the attacker gained access to the user database including passwords and API keys.',
    'Command injection via the ping utility allowed arbitrary command execution, confirmed by successful id and cat /etc/passwd commands.',
    'Path traversal attacks were used as an alternative method to read sensitive system files, showing the attacker is using multiple techniques.',
    'The final phase focused on data exfiltration, specifically targeting the secrets table which likely contains API keys and credentials.',
    'The entire attack chain completed in approximately 20 seconds, indicating this is an automated attack tool rather than manual exploitation.'
  ],
  iocs: {
    ip_addresses: ['172.18.0.5'],
    domains: [],
    file_hashes: [],
    user_accounts: ['admin', 'jsmith', 'developer'],
    other: ['SQL injection payloads', 'Command injection patterns', 'Path traversal sequences']
  },
  sigma_rule: {
    title: 'Web Application Multi-Stage Attack Detection',
    description: 'Detects the combination of SQL injection, command injection, and path traversal attacks indicative of automated web app exploitation',
    rule_yaml: `title: Web Application Multi-Stage Attack Detection
id: 8f4e2d1a-3b5c-4d6e-9f0a-1b2c3d4e5f6a
status: experimental
description: Detects combination of SQL injection, command injection, and path traversal from same source
author: AI Security Analyst
date: 2026/01/05
references:
    - https://attack.mitre.org/techniques/T1190/
    - https://attack.mitre.org/techniques/T1059/
logsource:
    category: webserver
    product: apache
detection:
    sqli_patterns:
        cs-uri-query|contains:
            - "UNION SELECT"
            - "' OR '"
            - "1=1"
            - "-- "
    cmdi_patterns:
        cs-uri-query|contains:
            - "; id"
            - "; cat "
            - "; whoami"
            - "| /bin/"
    traversal_patterns:
        cs-uri-query|contains:
            - "../"
            - "..%2f"
            - "/etc/passwd"
    condition: (sqli_patterns or cmdi_patterns or traversal_patterns)
fields:
    - c-ip
    - cs-uri-query
    - sc-status
falsepositives:
    - Security scanners
    - Penetration testing
level: high
tags:
    - attack.initial_access
    - attack.t1190
    - attack.execution
    - attack.t1059`
  },
  recommended_actions: [
    {
      priority: 1,
      action: 'Block source IP 172.18.0.5 immediately at the WAF/firewall level',
      rationale: 'Active exploitation in progress - immediate containment required',
      automated: true
    },
    {
      priority: 1,
      action: 'Rotate all API keys and credentials in the secrets table',
      rationale: 'Secrets table was successfully exfiltrated via SQL injection',
      automated: false
    },
    {
      priority: 2,
      action: 'Reset passwords for admin, jsmith, and developer accounts',
      rationale: 'User credentials were extracted from the database',
      automated: false
    },
    {
      priority: 2,
      action: 'Disable the /debug endpoint and ping utility in production',
      rationale: 'These endpoints enabled information disclosure and command execution',
      automated: true
    },
    {
      priority: 3,
      action: 'Deploy parameterized queries to fix SQL injection vulnerabilities',
      rationale: 'Multiple SQL injection points were exploited successfully',
      automated: false
    },
    {
      priority: 3,
      action: 'Implement input validation and WAF rules for command injection patterns',
      rationale: 'Command injection in ping utility allowed arbitrary code execution',
      automated: true
    }
  ],
  executive_summary: 'A sophisticated automated attack successfully exploited multiple vulnerabilities in the AcmeCorp web application, resulting in full database compromise including user credentials and API secrets. The attacker used SQL injection for initial access, command injection for code execution, and path traversal for file access. Immediate containment actions are required, and all exposed credentials should be considered compromised.'
};

// Timing configuration for demo playback
export const DEMO_TIMING = {
  attackEventInterval: 1500,  // ms between attack events
  alertDelay: 500,            // ms delay before alert appears after attack
  analysisDelay: 2000,        // ms to simulate AI "thinking"
  progressMessages: [
    { delay: 0, message: 'Fetching alerts from SIEM...' },
    { delay: 500, message: 'Retrieved 7 alerts' },
    { delay: 1000, message: 'AI analyzing patterns...' },
    { delay: 3000, message: 'Correlating attack chain...' },
    { delay: 5000, message: 'Generating Sigma rule...' },
    { delay: 6500, message: 'Building response playbook...' },
    { delay: 8000, message: 'Structuring results...' }
  ],
  totalAnalysisTime: 9000     // Total time for analysis animation
};

// ============================================================================
// Attack Planner Demo Data
// ============================================================================

// Pre-recorded reconnaissance data for AcmeCorp
export const DEMO_RECON_DATA = {
  domain: 'acmecorp.com',
  timestamp: new Date().toISOString(),
  dns: {
    A: ['93.184.216.34', '93.184.216.35'],
    MX: ['mail.acmecorp.com', 'mail2.acmecorp.com'],
    TXT: ['v=spf1 include:_spf.google.com ~all'],
    NS: ['ns1.acmecorp.com', 'ns2.acmecorp.com']
  },
  subdomains: {
    subdomains: [
      'www.acmecorp.com',
      'mail.acmecorp.com',
      'vpn.acmecorp.com',
      'dev.acmecorp.com',
      'staging.acmecorp.com',
      'api.acmecorp.com',
      'jenkins.acmecorp.com',
      'gitlab.acmecorp.com'
    ]
  },
  services: {
    services: [
      { port: 22, product: 'OpenSSH', version: '7.9' },
      { port: 80, product: 'nginx', version: '1.18.0' },
      { port: 443, product: 'nginx', version: '1.18.0' },
      { port: 8080, product: 'Jenkins', version: '2.289' },
      { port: 8443, product: 'Apache Tomcat', version: '9.0.41' },
      { port: 3306, product: 'MySQL', version: '5.7.32' }
    ],
    vulns: ['CVE-2021-44228', 'CVE-2020-14882']
  },
  breaches: {
    breaches: [
      {
        name: 'AcmeCorp 2023 Breach',
        date: '2023-06-15',
        pwnCount: 45000,
        dataClasses: ['Emails', 'Passwords', 'Names']
      }
    ]
  }
};

// Pre-recorded attack plan with streaming chunks
export const DEMO_ATTACK_PLAN_THINKING = [
  { type: 'thinking', text: 'Analyzing target reconnaissance data for acmecorp.com...\n\n' },
  { type: 'thinking', text: 'Key findings from recon:\n' },
  { type: 'thinking', text: '- 8 subdomains discovered including dev, staging, jenkins, gitlab\n' },
  { type: 'thinking', text: '- Jenkins (port 8080) and GitLab exposed to internet\n' },
  { type: 'thinking', text: '- MySQL database (3306) externally accessible - CRITICAL\n' },
  { type: 'thinking', text: '- Known CVEs: Log4Shell (CVE-2021-44228), WebLogic RCE (CVE-2020-14882)\n' },
  { type: 'thinking', text: '- Previous breach in 2023 exposed 45k credentials\n\n' },
  { type: 'thinking', text: 'Considering attack vectors:\n' },
  { type: 'thinking', text: '1. Credential stuffing using leaked credentials from 2023 breach\n' },
  { type: 'thinking', text: '2. Log4Shell exploitation on Java-based services (Jenkins, Tomcat)\n' },
  { type: 'thinking', text: '3. CI/CD pipeline compromise via Jenkins/GitLab\n' },
  { type: 'thinking', text: '4. Direct database access if MySQL allows remote connections\n\n' },
  { type: 'thinking', text: 'Mapping to MITRE ATT&CK framework...\n' },
  { type: 'thinking', text: 'Generating prioritized attack playbook...\n\n' }
];

export const DEMO_ATTACK_PLAN = {
  target: 'acmecorp.com',
  generatedAt: new Date().toISOString(),
  riskScore: 87,
  phases: [
    {
      id: 1,
      name: 'Reconnaissance',
      tactic: 'OSINT and credential harvesting',
      description: 'Leverage 2023 breach data (45k credentials) to build targeted credential list. Enumerate employees via LinkedIn and correlate with leaked emails.',
      duration: '2 min',
      risk: 'low',
      mitreId: 'T1589',
      mitreName: 'Gather Victim Identity Information',
      tools: ['theHarvester', 'h8mail', 'LinkedIn'],
      indicators: ['Increased OSINT queries', 'Dark web monitoring alerts']
    },
    {
      id: 2,
      name: 'Initial Access',
      tactic: 'Credential stuffing + Log4Shell',
      description: 'Attempt credential stuffing against VPN (vpn.acmecorp.com) using leaked credentials. Parallel exploitation of Log4Shell (CVE-2021-44228) on Jenkins and Tomcat services.',
      duration: '5 min',
      risk: 'critical',
      mitreId: 'T1190',
      mitreName: 'Exploit Public-Facing Application',
      tools: ['hydra', 'log4j-scan', 'curl'],
      indicators: ['Multiple failed login attempts', 'JNDI lookup strings in logs']
    },
    {
      id: 3,
      name: 'Execution',
      tactic: 'Reverse shell via Log4Shell',
      description: 'Deploy JNDI callback to establish reverse shell on compromised Jenkins server. Leverage Jenkins Script Console for additional code execution.',
      duration: '3 min',
      risk: 'critical',
      mitreId: 'T1059.004',
      mitreName: 'Unix Shell',
      tools: ['netcat', 'JNDI-Injection-Exploit'],
      indicators: ['Outbound connections to unknown IPs', 'Jenkins script execution logs']
    },
    {
      id: 4,
      name: 'Persistence & Lateral Movement',
      tactic: 'CI/CD pipeline backdoor',
      description: 'Inject malicious build step into Jenkins pipelines. Access GitLab using harvested credentials to implant backdoors in source code. Pivot to staging/dev environments.',
      duration: '8 min',
      risk: 'high',
      mitreId: 'T1195.002',
      mitreName: 'Compromise Software Supply Chain',
      tools: ['git', 'Jenkins CLI'],
      indicators: ['Unauthorized pipeline modifications', 'Unusual git commits']
    },
    {
      id: 5,
      name: 'Exfiltration',
      tactic: 'Database dump via exposed MySQL',
      description: 'Connect to externally-accessible MySQL (port 3306) using credentials found in Jenkins environment variables. Dump customer data and API keys.',
      duration: '4 min',
      risk: 'critical',
      mitreId: 'T1041',
      mitreName: 'Exfiltration Over C2 Channel',
      tools: ['mysqldump', 'encrypted tunnel'],
      indicators: ['Large database queries', 'Unusual outbound data volume']
    }
  ],
  summary: 'High-confidence attack path using leaked credentials and Log4Shell to compromise CI/CD pipeline, with direct database access for data exfiltration.',
  totalTime: '~22 minutes',
  priorityDefenses: [
    {
      priority: 1,
      action: 'Patch Log4Shell immediately on Jenkins (8080) and Tomcat (8443)',
      rationale: 'CVE-2021-44228 provides immediate RCE capability'
    },
    {
      priority: 2,
      action: 'Block external access to MySQL (3306) and move behind VPN',
      rationale: 'Direct database access enables trivial data exfiltration'
    },
    {
      priority: 3,
      action: 'Force password reset for all users in 2023 breach',
      rationale: '45k credentials are available for credential stuffing attacks'
    },
    {
      priority: 4,
      action: 'Implement MFA on Jenkins, GitLab, and VPN',
      rationale: 'Prevents lateral movement even with valid credentials'
    },
    {
      priority: 5,
      action: 'Deploy Web Application Firewall with Log4Shell signatures',
      rationale: 'Blocks exploitation attempts at network perimeter'
    }
  ]
};

export const DEMO_ATTACK_PLAN_TIMING = {
  thinkingInterval: 150,      // ms between thinking chunks
  planGenerationDelay: 500,   // ms before showing final plan
  totalTime: 8000             // Total animation time
};

// ============================================================================
// Human Approval Workflow Demo Data
// ============================================================================

// Pre-recorded AI recommendations requiring human approval
export const DEMO_RECOMMENDATIONS = [
  {
    id: 'rec-001',
    timestamp: new Date().toISOString(),
    type: 'containment',
    action: 'Block IP Address',
    target: '172.18.0.5',
    confidence: 94,
    severity: 'critical',
    rationale: 'Source IP for SQL injection, command injection, and path traversal attacks. 7 alerts triggered from this address in the last 60 seconds.',
    mitre: 'T1190 - Exploit Public-Facing Application',
    automated: true,
    reversible: true,
    estimatedImpact: 'Low - Single external IP, no legitimate traffic expected'
  },
  {
    id: 'rec-002',
    timestamp: new Date().toISOString(),
    type: 'credential',
    action: 'Revoke Active Sessions',
    target: 'admin, jsmith, developer',
    confidence: 87,
    severity: 'high',
    rationale: 'User credentials were extracted via SQL injection. Attacker may have active authenticated sessions.',
    mitre: 'T1078 - Valid Accounts',
    automated: true,
    reversible: true,
    estimatedImpact: 'Medium - Users will need to re-authenticate'
  },
  {
    id: 'rec-003',
    timestamp: new Date().toISOString(),
    type: 'isolation',
    action: 'Disable Vulnerable Service',
    target: '/debug endpoint',
    confidence: 92,
    severity: 'high',
    rationale: 'Debug endpoint exposed sensitive system information including environment variables and Python version.',
    mitre: 'T1592.004 - Gather Victim Host Information: Client Configurations',
    automated: true,
    reversible: true,
    estimatedImpact: 'None - Debug endpoint should not exist in production'
  },
  {
    id: 'rec-004',
    timestamp: new Date().toISOString(),
    type: 'credential',
    action: 'Rotate API Keys',
    target: 'secrets table (12 keys)',
    confidence: 96,
    severity: 'critical',
    rationale: 'Secrets table was successfully exfiltrated via UNION-based SQL injection. All API keys must be considered compromised.',
    mitre: 'T1041 - Exfiltration Over C2 Channel',
    automated: false,
    reversible: false,
    estimatedImpact: 'High - External integrations will break until updated'
  },
  {
    id: 'rec-005',
    timestamp: new Date().toISOString(),
    type: 'isolation',
    action: 'Isolate Database Server',
    target: 'mysql-primary (10.0.0.42)',
    confidence: 78,
    severity: 'high',
    rationale: 'Database was accessed via SQL injection. May contain backdoor or malicious triggers. Requires forensic analysis.',
    mitre: 'T1505 - Server Software Component',
    automated: false,
    reversible: true,
    estimatedImpact: 'Critical - Application downtime until restored'
  }
];

// Simulated action execution results
export const DEMO_ACTION_RESULTS = {
  'Block IP Address': {
    success: true,
    duration: 1200,
    details: 'IP 172.18.0.5 added to WAF blocklist. Firewall rule #4872 created.',
    verification: 'Connection attempts from 172.18.0.5 now return 403 Forbidden'
  },
  'Revoke Active Sessions': {
    success: true,
    duration: 800,
    details: 'Terminated 4 active sessions for admin, jsmith, developer. Session tokens invalidated.',
    verification: 'Users redirected to login page on next request'
  },
  'Disable Vulnerable Service': {
    success: true,
    duration: 500,
    details: 'Route /debug removed from nginx configuration. Service reloaded.',
    verification: 'GET /debug now returns 404 Not Found'
  },
  'Rotate API Keys': {
    success: true,
    duration: 3500,
    details: '12 API keys rotated in secrets table. Notification sent to key owners.',
    verification: 'Old keys return 401 Unauthorized'
  },
  'Isolate Database Server': {
    success: true,
    duration: 2000,
    details: 'Network ACL updated. Database isolated to forensics VLAN. Read replica promoted to primary.',
    verification: 'Application failover complete. Original server accessible only via jump host.'
  }
};

export default {
  DEMO_ATTACK_EVENTS,
  DEMO_ALERTS,
  DEMO_ANALYSIS,
  DEMO_TIMING,
  DEMO_RECON_DATA,
  DEMO_ATTACK_PLAN_THINKING,
  DEMO_ATTACK_PLAN,
  DEMO_ATTACK_PLAN_TIMING,
  DEMO_RECOMMENDATIONS,
  DEMO_ACTION_RESULTS
};
