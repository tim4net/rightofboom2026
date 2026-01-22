# Lab VM Setup for Attack Path Validator Demo

This guide explains how to set up a Windows VM with intentional security gaps for the **AI Attack Path Validator** demo. The demo shows how attackers use AI to identify exploitable configurations — and how defenders can do it first.

## Overview

The demo requires:
1. A Windows 10/11 VM (or Windows Server 2019+)
2. Intentional security misconfigurations (we provide scripts)
3. Atomic Red Team for safe attack simulation
4. The endpoint collector script

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR DEMO ENVIRONMENT                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────┐         ┌─────────────┐                  │
│   │  Presenter  │ ──────► │   Lab VM    │                  │
│   │   Laptop    │   RDP   │  (Gapped)   │                  │
│   └─────────────┘         └─────────────┘                  │
│         │                       │                          │
│         │                       ▼                          │
│         │              ┌─────────────────┐                 │
│         │              │ Atomic Red Team │                 │
│         │              │     Tests       │                 │
│         │              └─────────────────┘                 │
│         │                                                  │
│         ▼                                                  │
│   ┌─────────────┐                                          │
│   │ Claude/GPT  │  (for attack path generation)            │
│   └─────────────┘                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Start

### Option A: Automated Setup (Recommended)

Run this one-liner in an **elevated PowerShell** on your target VM:

```powershell
# Download and run the setup script
iex (irm https://github.com/tim4net/rightofboom2026/releases/latest/download/setup-lab-vm.ps1)
```

This will:
- Create intentional security gaps (ASR disabled, exclusions, etc.)
- Install Atomic Red Team
- Download the endpoint collector script
- Create a desktop shortcut for easy access

### Option B: Manual Setup

If you prefer to set things up manually, follow the sections below.

---

## VM Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| OS | Windows 10 21H2+ | Windows 11 23H2 |
| RAM | 4 GB | 8 GB |
| Disk | 40 GB | 60 GB |
| Network | NAT or Bridged | Isolated/NAT |

### Recommended VM Platforms
- **Hyper-V** (Windows Pro/Enterprise)
- **VMware Workstation/Player**
- **VirtualBox**
- **Parallels** (Mac)

### Windows Licensing
- Windows 10/11 evaluation ISOs work fine for demos
- Download from: https://www.microsoft.com/en-us/evalcenter/

---

## Step 1: Create the VM

1. Create a new VM with the specs above
2. Install Windows 10/11 (skip product key for evaluation)
3. Create a local admin account (e.g., `LabAdmin`)
4. Install VMware Tools / Hyper-V Integration Services / VirtualBox Guest Additions
5. Take a **snapshot** named "Clean Install"

---

## Step 2: Stage Intentional Gaps

These scripts create the security misconfigurations that the demo will detect and exploit.

### Download the staging script:

```powershell
# Run as Administrator
$scriptsDir = "C:\LabScripts"
New-Item -ItemType Directory -Force -Path $scriptsDir
Invoke-WebRequest -Uri "https://github.com/tim4net/rightofboom2026/releases/latest/download/stage-gaps.ps1" -OutFile "$scriptsDir\stage-gaps.ps1"
```

### Run the staging script:

```powershell
# Review what it does first
Get-Content C:\LabScripts\stage-gaps.ps1

# Then run it
Set-ExecutionPolicy Bypass -Scope Process -Force
& C:\LabScripts\stage-gaps.ps1
```

### What Gets Configured

The staging script creates these intentional gaps:

| Gap | What It Does | MITRE Technique |
|-----|-------------|-----------------|
| **ASR: LSASS Disabled** | Allows credential dumping from LSASS memory | T1003.001 |
| **ASR: Obfuscated Scripts → Audit** | Logs but doesn't block obfuscated PowerShell | T1027 |
| **Defender Exclusion: C:\Temp** | Files in C:\Temp skip AV scanning | T1562.001 |
| **Defender Exclusion: *.ps1 in Downloads** | PowerShell scripts in Downloads skip scanning | T1059.001 |
| **Shared Local Admin: helpdesk** | Creates a local admin account (simulates shared creds) | T1078.003 |
| **PowerShell Logging: Disabled** | Script block logging turned off | T1562.002 |

---

## Step 3: Install Atomic Red Team

Atomic Red Team provides safe, controlled attack simulations.

```powershell
# Install the module
Install-Module -Name invoke-atomicredteam -Scope CurrentUser -Force

# Install the atomics (attack definitions)
Install-AtomicRedTeam -getAtomics -Force

# Verify installation
Invoke-AtomicTest T1003.001 -ShowDetailsBrief
```

### Test a safe atomic:

```powershell
# This lists what T1003.001 (LSASS dump) would do — doesn't execute
Invoke-AtomicTest T1003.001 -ShowDetails

# Run the test (safe simulation)
Invoke-AtomicTest T1003.001 -TestNumbers 1

# Clean up after test
Invoke-AtomicTest T1003.001 -TestNumbers 1 -Cleanup
```

---

## Step 4: Install the Endpoint Collector

```powershell
# Download the collector script
Invoke-WebRequest -Uri "https://github.com/tim4net/rightofboom2026/releases/latest/download/endpoint-collector.ps1" -OutFile "C:\LabScripts\endpoint-collector.ps1"

# Test it
& C:\LabScripts\endpoint-collector.ps1
```

The collector outputs JSON that you'll paste into Claude/GPT during the demo.

---

## Step 5: Take a "Ready" Snapshot

Before the demo:

```powershell
# Verify gaps are in place
& C:\LabScripts\endpoint-collector.ps1

# You should see:
# [!] ASR GAPS: 2+ rules not protecting
# [!] EXCLUSIONS: 2+ exclusions configured
# [!] LOGGING: PowerShell script block logging DISABLED
```

Take a snapshot named **"Demo Ready"** so you can reset between demos.

---

## Running the Demo

### Pre-flight Checklist

- [ ] VM is running and RDP accessible
- [ ] Snapshot "Demo Ready" exists
- [ ] `C:\LabScripts\endpoint-collector.ps1` is present
- [ ] Atomic Red Team is installed (`Get-Module invoke-atomicredteam -ListAvailable`)
- [ ] Claude/ChatGPT tab open on presenter laptop
- [ ] Presentation is on slide 22 (Attack Path Validator)

### Demo Flow

1. **Collect** — Run `endpoint-collector.ps1`, show output
2. **Analyze** — Copy JSON to Claude/GPT with red team prompt
3. **Attack Path** — Walk through AI-generated exploit chain
4. **Validate** — Run Atomic tests, mark results
5. **Results** — Show confirmed gaps, remediation priorities

### Key Commands for Demo

```powershell
# Collect endpoint config
& C:\LabScripts\endpoint-collector.ps1

# Run LSASS dump test (T1003.001)
Invoke-AtomicTest T1003.001 -TestNumbers 1

# Run obfuscated script test (T1027)
Invoke-AtomicTest T1027 -TestNumbers 1

# Run payload drop test (T1059.001)
Invoke-AtomicTest T1059.001 -TestNumbers 1

# Cleanup after tests
Invoke-AtomicTest T1003.001 -Cleanup
Invoke-AtomicTest T1027 -Cleanup
Invoke-AtomicTest T1059.001 -Cleanup
```

---

## Teardown

### Reset to Clean State

```powershell
# Download and run teardown
iex (irm https://github.com/tim4net/rightofboom2026/releases/latest/download/teardown-lab-vm.ps1)
```

Or revert to the "Clean Install" snapshot.

### What Teardown Does

- Re-enables ASR rules
- Removes Defender exclusions
- Removes the `helpdesk` local admin
- Re-enables PowerShell logging
- Removes C:\LabScripts

---

## Troubleshooting

### "Atomic Red Team not found"

```powershell
# Re-import the module
Import-Module invoke-atomicredteam -Force

# If still missing, reinstall
Install-Module -Name invoke-atomicredteam -Scope CurrentUser -Force
Install-AtomicRedTeam -getAtomics -Force
```

### "Access Denied" on ASR commands

- Ensure you're running PowerShell as Administrator
- Some commands require Windows Defender to be the active AV

### "Execution Policy" errors

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
```

### Defender keeps re-enabling protections

Windows Security may re-enable ASR rules via cloud protection. For demos:
1. Disconnect the VM from internet, OR
2. Disable cloud-delivered protection temporarily:
   ```powershell
   Set-MpPreference -MAPSReporting Disabled
   Set-MpPreference -SubmitSamplesConsent NeverSend
   ```

---

## Security Notice

**These scripts intentionally weaken system security.**

- Only run on isolated VMs
- Never run on production systems
- Never run on domain-joined machines
- Always teardown or revert snapshot after demos

The gaps created are real and exploitable. That's the point — you're demonstrating actual attack paths.

---

## Files Reference

| File | Purpose | Location |
|------|---------|----------|
| `setup-lab-vm.ps1` | One-liner bootstrap | GitHub Release |
| `stage-gaps.ps1` | Creates intentional misconfigurations | GitHub Release |
| `teardown-lab-vm.ps1` | Removes gaps, cleans up | GitHub Release |
| `endpoint-collector.ps1` | Collects config for AI analysis | GitHub Release + `public/scripts/` |

All scripts are available at:
https://github.com/tim4net/rightofboom2026/releases/latest
