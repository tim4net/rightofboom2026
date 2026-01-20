# Attack Lab VM Setup Guide

Demo scenario: **CVE-2025-59287** - Critical RCE in Windows Server Update Services (WSUS)

*"The patch management tool you trust... was itself vulnerable. Attackers weaponized it in hours."*

## Why This Vulnerability?

- **October 2025** - Current, not historical
- **CVSS 9.8** - Unauthenticated RCE
- **Actively exploited** by ransomware groups
- **MSP-relevant** - WSUS is how you push updates to clients
- **Ironic** - The tool meant to patch vulnerabilities was vulnerable

## Quick Start

### 1. Create Windows Server VM

```bash
# Create disk
qemu-img create -f qcow2 /var/lib/libvirt/images/wsus-target.qcow2 60G

# Install (use Windows Server 2022 evaluation ISO)
virt-install \
  --name wsus-target \
  --ram 4096 \
  --vcpus 2 \
  --disk path=/var/lib/libvirt/images/wsus-target.qcow2 \
  --cdrom /path/to/windows-server-2022.iso \
  --os-variant win2k22 \
  --network network=isolated \
  --graphics spice,listen=127.0.0.1,port=5901
```

### 2. After Windows Install

1. Set static IP: `192.168.100.100`
2. Copy `setup-wsus-vulnerable.ps1` to the VM
3. Run as Administrator:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
.\setup-wsus-vulnerable.ps1
```

### 3. Verify Setup

From your Fedora host:

```bash
# Should see ports 8530/8531 open
nmap -p 8530,8531 192.168.100.100

# Should return XML
curl http://192.168.100.100:8530/ClientWebService/client.asmx
```

### 4. Create Snapshot

```bash
virsh shutdown wsus-target
virsh snapshot-create-as wsus-target vulnerable-baseline
```

## Attack Tools (Fedora Host)

```bash
sudo dnf install -y nmap python3-pip curl netcat
pip install requests impacket
```

## Demo Flow

| Phase | What Happens | Key Point |
|-------|--------------|-----------|
| **Recon** | Find WSUS on 8530/8531 | "AI identified the service in seconds" |
| **Exploit** | CVE-2025-59287 → SYSTEM shell | "Exploit code written by AI in minutes" |
| **Post-Ex** | Find client creds, infra passwords | "One WSUS = access to all clients" |
| **Persist** | Create backdoor account | "They're in permanently now" |

## Reset Between Demos

```bash
virsh snapshot-revert wsus-target vulnerable-baseline
virsh start wsus-target
```

## Files

- `setup-wsus-vulnerable.ps1` - Run on Windows VM to configure vulnerability
- `attack-commands.md` - Full list of attack commands with explanations

## Safety

- **Isolated network only** - Never connect to internet
- **Delete after demo** - Don't leave this running
- **This is intentionally vulnerable** - Treat it like malware
