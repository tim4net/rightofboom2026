"""
Mock SIEM for Right of Boom 2026 Demo
======================================
A simple log aggregator and alerting system that simulates SIEM functionality.
Provides APIs for:
- Real-time log streaming
- Alert generation based on detection rules
- Log querying for AI defender analysis
"""

import os
import re
import json
import sqlite3
import threading
import time
from datetime import datetime, timedelta
from collections import deque
from flask import Flask, jsonify, request, Response

app = Flask(__name__)

DATABASE = '/data/siem.db'
LOG_PATH = os.getenv('LOG_PATH', '/logs')

# In-memory buffer for real-time streaming
log_buffer = deque(maxlen=1000)
alert_buffer = deque(maxlen=100)

# Detection rules (Sigma-like patterns)
DETECTION_RULES = [
    {
        'id': 'SQL_INJECTION_ATTEMPT',
        'name': 'SQL Injection Attempt Detected',
        'severity': 'high',
        'pattern': r"(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|--|'|;).*FROM",
        'log_field': 'message',
        'mitre_attack': 'T1190',
        'description': 'Potential SQL injection attack detected in web request'
    },
    {
        'id': 'COMMAND_INJECTION_ATTEMPT',
        'name': 'Command Injection Attempt',
        'severity': 'critical',
        'pattern': r'(;|\||`|\$\(|&&)',
        'log_field': 'message',
        'context_pattern': r'ping.*request',
        'mitre_attack': 'T1059',
        'description': 'Potential command injection in system command execution'
    },
    {
        'id': 'PATH_TRAVERSAL_ATTEMPT',
        'name': 'Path Traversal Attempt',
        'severity': 'high',
        'pattern': r'\.\./',
        'log_field': 'message',
        'mitre_attack': 'T1083',
        'description': 'Potential path traversal attack to access sensitive files'
    },
    {
        'id': 'BRUTE_FORCE_LOGIN',
        'name': 'Brute Force Login Attempt',
        'severity': 'medium',
        'pattern': r'Failed login attempt',
        'log_field': 'message',
        'threshold': 5,
        'window_seconds': 60,
        'mitre_attack': 'T1110',
        'description': 'Multiple failed login attempts from same source'
    },
    {
        'id': 'DEBUG_ENDPOINT_ACCESS',
        'name': 'Debug Endpoint Accessed',
        'severity': 'medium',
        'pattern': r'Debug endpoint accessed',
        'log_field': 'message',
        'mitre_attack': 'T1592',
        'description': 'Sensitive debug information endpoint was accessed'
    },
    {
        'id': 'SENSITIVE_FILE_ACCESS',
        'name': 'Sensitive File Access Attempt',
        'severity': 'high',
        'pattern': r'(passwd|shadow|\.env|config|secret)',
        'log_field': 'message',
        'context_pattern': r'File.*request',
        'mitre_attack': 'T1005',
        'description': 'Attempt to access sensitive system files'
    },
    {
        'id': 'XSS_ATTEMPT',
        'name': 'Cross-Site Scripting Attempt',
        'severity': 'medium',
        'pattern': r'(<script|javascript:|onerror=|onload=)',
        'log_field': 'message',
        'mitre_attack': 'T1059.007',
        'description': 'Potential XSS payload detected in user input'
    }
]

# Track events for threshold-based rules
event_tracker = {}

def init_db():
    """Initialize SQLite database for log storage."""
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)
    conn = sqlite3.connect(DATABASE)
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS logs
                 (id INTEGER PRIMARY KEY,
                  timestamp TEXT,
                  level TEXT,
                  logger TEXT,
                  message TEXT,
                  source_ip TEXT,
                  raw TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS alerts
                 (id INTEGER PRIMARY KEY,
                  timestamp TEXT,
                  rule_id TEXT,
                  rule_name TEXT,
                  severity TEXT,
                  message TEXT,
                  source_ip TEXT,
                  mitre_attack TEXT,
                  log_id INTEGER,
                  acknowledged INTEGER DEFAULT 0,
                  FOREIGN KEY(log_id) REFERENCES logs(id))''')

    c.execute('CREATE INDEX IF NOT EXISTS idx_logs_timestamp ON logs(timestamp)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp)')
    c.execute('CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity)')

    conn.commit()
    conn.close()

def get_db():
    """Get database connection."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def parse_log_line(line):
    """Parse a log line into structured data."""
    # Expected format: 2026-01-05 10:30:45,123 [INFO] logger - message
    pattern = r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) \[(\w+)\] (\S+) - (.+)'
    match = re.match(pattern, line)

    if match:
        timestamp, level, logger, message = match.groups()
        # Extract IP if present
        ip_match = re.search(r'(\d+\.\d+\.\d+\.\d+)', message)
        source_ip = ip_match.group(1) if ip_match else None

        return {
            'timestamp': timestamp,
            'level': level,
            'logger': logger,
            'message': message,
            'source_ip': source_ip,
            'raw': line
        }

    return {
        'timestamp': datetime.now().isoformat(),
        'level': 'UNKNOWN',
        'logger': 'unknown',
        'message': line,
        'source_ip': None,
        'raw': line
    }

def check_detection_rules(log_entry, log_id):
    """Check log entry against detection rules and generate alerts."""
    alerts = []

    for rule in DETECTION_RULES:
        message = log_entry.get('message', '')

        # Check context pattern first if defined
        if 'context_pattern' in rule:
            if not re.search(rule['context_pattern'], message, re.IGNORECASE):
                continue

        # Check main pattern
        if re.search(rule['pattern'], message, re.IGNORECASE):
            # Handle threshold-based rules
            if 'threshold' in rule:
                key = f"{rule['id']}:{log_entry.get('source_ip', 'unknown')}"
                now = datetime.now()

                if key not in event_tracker:
                    event_tracker[key] = []

                # Clean old events
                cutoff = now - timedelta(seconds=rule['window_seconds'])
                event_tracker[key] = [t for t in event_tracker[key] if t > cutoff]
                event_tracker[key].append(now)

                if len(event_tracker[key]) < rule['threshold']:
                    continue

            alert = {
                'timestamp': datetime.now().isoformat(),
                'rule_id': rule['id'],
                'rule_name': rule['name'],
                'severity': rule['severity'],
                'message': f"{rule['description']}. Log: {message[:200]}",
                'source_ip': log_entry.get('source_ip'),
                'mitre_attack': rule['mitre_attack'],
                'log_id': log_id
            }

            alerts.append(alert)
            alert_buffer.append(alert)

            # Store alert in database
            conn = get_db()
            conn.execute('''INSERT INTO alerts
                           (timestamp, rule_id, rule_name, severity, message, source_ip, mitre_attack, log_id)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                        (alert['timestamp'], alert['rule_id'], alert['rule_name'],
                         alert['severity'], alert['message'], alert['source_ip'],
                         alert['mitre_attack'], alert['log_id']))
            conn.commit()
            conn.close()

    return alerts

def process_log_file(filepath):
    """Process a log file and extract new entries."""
    try:
        with open(filepath, 'r') as f:
            # Seek to end for initial read
            f.seek(0, 2)

            while True:
                line = f.readline()
                if line:
                    line = line.strip()
                    if line:
                        log_entry = parse_log_line(line)
                        log_buffer.append(log_entry)

                        # Store in database
                        conn = get_db()
                        cursor = conn.execute('''INSERT INTO logs
                                   (timestamp, level, logger, message, source_ip, raw)
                                   VALUES (?, ?, ?, ?, ?, ?)''',
                                (log_entry['timestamp'], log_entry['level'],
                                 log_entry['logger'], log_entry['message'],
                                 log_entry['source_ip'], log_entry['raw']))
                        log_id = cursor.lastrowid
                        conn.commit()
                        conn.close()

                        # Check detection rules
                        check_detection_rules(log_entry, log_id)
                else:
                    time.sleep(0.5)
    except FileNotFoundError:
        print(f"Log file not found: {filepath}, waiting...")
        time.sleep(5)
        process_log_file(filepath)

# API Routes

@app.route('/api/health')
def health():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'log_buffer_size': len(log_buffer),
        'alert_buffer_size': len(alert_buffer)
    })

@app.route('/api/logs')
def get_logs():
    """Get recent logs with optional filtering."""
    limit = request.args.get('limit', 100, type=int)
    level = request.args.get('level')
    since = request.args.get('since')
    search = request.args.get('q')

    conn = get_db()
    query = 'SELECT * FROM logs WHERE 1=1'
    params = []

    if level:
        query += ' AND level = ?'
        params.append(level.upper())

    if since:
        query += ' AND timestamp > ?'
        params.append(since)

    if search:
        query += ' AND message LIKE ?'
        params.append(f'%{search}%')

    query += ' ORDER BY id DESC LIMIT ?'
    params.append(limit)

    logs = conn.execute(query, params).fetchall()
    conn.close()

    return jsonify([dict(log) for log in logs])

@app.route('/api/logs/stream')
def stream_logs():
    """Server-sent events stream for real-time logs."""
    def generate():
        last_sent = len(log_buffer)
        while True:
            current = len(log_buffer)
            if current > last_sent:
                for log in list(log_buffer)[last_sent:current]:
                    yield f"data: {json.dumps(log)}\n\n"
                last_sent = current
            time.sleep(0.5)

    return Response(generate(), mimetype='text/event-stream')

@app.route('/api/alerts')
def get_alerts():
    """Get security alerts with optional filtering."""
    limit = request.args.get('limit', 50, type=int)
    severity = request.args.get('severity')
    since = request.args.get('since')
    unacknowledged = request.args.get('unacknowledged', 'false').lower() == 'true'

    conn = get_db()
    query = 'SELECT * FROM alerts WHERE 1=1'
    params = []

    if severity:
        query += ' AND severity = ?'
        params.append(severity.lower())

    if since:
        query += ' AND timestamp > ?'
        params.append(since)

    if unacknowledged:
        query += ' AND acknowledged = 0'

    query += ' ORDER BY id DESC LIMIT ?'
    params.append(limit)

    alerts = conn.execute(query, params).fetchall()
    conn.close()

    return jsonify([dict(alert) for alert in alerts])

@app.route('/api/alerts/stream')
def stream_alerts():
    """Server-sent events stream for real-time alerts."""
    def generate():
        last_sent = len(alert_buffer)
        while True:
            current = len(alert_buffer)
            if current > last_sent:
                for alert in list(alert_buffer)[last_sent:current]:
                    yield f"data: {json.dumps(alert)}\n\n"
                last_sent = current
            time.sleep(0.5)

    return Response(generate(), mimetype='text/event-stream')

@app.route('/api/alerts/<int:alert_id>/acknowledge', methods=['POST'])
def acknowledge_alert(alert_id):
    """Acknowledge an alert."""
    conn = get_db()
    conn.execute('UPDATE alerts SET acknowledged = 1 WHERE id = ?', (alert_id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'acknowledged', 'alert_id': alert_id})

@app.route('/api/stats')
def get_stats():
    """Get SIEM statistics."""
    conn = get_db()

    total_logs = conn.execute('SELECT COUNT(*) FROM logs').fetchone()[0]
    total_alerts = conn.execute('SELECT COUNT(*) FROM alerts').fetchone()[0]
    unacked_alerts = conn.execute('SELECT COUNT(*) FROM alerts WHERE acknowledged = 0').fetchone()[0]

    severity_counts = {}
    for row in conn.execute('SELECT severity, COUNT(*) as count FROM alerts GROUP BY severity'):
        severity_counts[row[0]] = row[1]

    rule_counts = {}
    for row in conn.execute('SELECT rule_id, COUNT(*) as count FROM alerts GROUP BY rule_id'):
        rule_counts[row[0]] = row[1]

    conn.close()

    return jsonify({
        'total_logs': total_logs,
        'total_alerts': total_alerts,
        'unacknowledged_alerts': unacked_alerts,
        'alerts_by_severity': severity_counts,
        'alerts_by_rule': rule_counts,
        'timestamp': datetime.now().isoformat()
    })

@app.route('/api/rules')
def get_rules():
    """Get all detection rules."""
    return jsonify(DETECTION_RULES)

@app.route('/api/context/<int:alert_id>')
def get_alert_context(alert_id):
    """Get surrounding log context for an alert."""
    conn = get_db()

    alert = conn.execute('SELECT * FROM alerts WHERE id = ?', (alert_id,)).fetchone()
    if not alert:
        return jsonify({'error': 'Alert not found'}), 404

    log_id = alert['log_id']

    # Get surrounding logs (5 before, 5 after)
    context_logs = conn.execute('''
        SELECT * FROM logs
        WHERE id BETWEEN ? AND ?
        ORDER BY id
    ''', (log_id - 5, log_id + 5)).fetchall()

    conn.close()

    return jsonify({
        'alert': dict(alert),
        'context_logs': [dict(log) for log in context_logs]
    })

@app.route('/api/export')
def export_data():
    """Export logs and alerts for AI analysis."""
    hours = request.args.get('hours', 1, type=int)
    since = (datetime.now() - timedelta(hours=hours)).isoformat()

    conn = get_db()

    logs = conn.execute('SELECT * FROM logs WHERE timestamp > ? ORDER BY id', (since,)).fetchall()
    alerts = conn.execute('SELECT * FROM alerts WHERE timestamp > ? ORDER BY id', (since,)).fetchall()

    conn.close()

    return jsonify({
        'export_timestamp': datetime.now().isoformat(),
        'period_hours': hours,
        'logs': [dict(log) for log in logs],
        'alerts': [dict(alert) for alert in alerts],
        'detection_rules': DETECTION_RULES
    })

if __name__ == '__main__':
    init_db()

    # Start log file watcher in background thread
    log_file = os.path.join(LOG_PATH, 'access.log')
    watcher_thread = threading.Thread(target=process_log_file, args=(log_file,), daemon=True)
    watcher_thread.start()

    port = int(os.getenv('SIEM_PORT', 8081))
    app.run(host='0.0.0.0', port=port, threaded=True)
