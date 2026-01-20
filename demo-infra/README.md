# Right of Boom 2026 - Demo Infrastructure

Containerized demo environment for the AI Security masterclass. Runs entirely offline for conference reliability.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Demo Network                                │
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐       │
│  │  Vulnerable  │───>│    Mock      │    │   Ollama     │       │
│  │     App      │    │    SIEM      │    │  Local LLM   │       │
│  │  :8080       │    │  :8081       │    │  :11434      │       │
│  └──────────────┘    └──────────────┘    └──────────────┘       │
│         │                   ▲                   ▲                │
│         │ logs              │                   │                │
│         └───────────────────┘                   │                │
│                                                 │                │
│  ┌──────────────────────────────────────────────┼───────┐       │
│  │                  Attacker                    │       │       │
│  │            (red-team container)              │       │       │
│  │                                              │       │       │
│  │  attack_runner.py ─────────────────────────────────>│       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Pre-Conference Setup (requires internet)

```bash
# Pull and setup Ollama models
./scripts/setup-ollama.sh

# Build and start everything
podman-compose up -d
```

### 2. During Conference

```bash
# Reset between demos
./scripts/reset-demo.sh

# Run attack chain
podman exec red-team python attack_runner.py

# View SIEM alerts
curl http://localhost:8081/api/alerts | jq
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| Vulnerable App | 8080 | AcmeCorp Internal Portal (intentionally vulnerable) |
| Mock SIEM | 8081 | Log aggregation and alerting |
| Ollama | 11434 | Local LLM for offline AI inference |
| Attacker | - | Red team container with attack tools |

## Vulnerabilities in Demo App

The vulnerable app contains these intentional security flaws:

1. **SQL Injection** - Login and search forms
2. **Command Injection** - Ping utility
3. **Path Traversal** - File viewer
4. **Stored XSS** - Comments section
5. **Hardcoded Credentials** - Admin/admin123
6. **Debug Endpoint** - Exposes system info
7. **Verbose Errors** - Leaks query structure

## SIEM Detection Rules

The mock SIEM includes Sigma-like detection rules for:

- SQL Injection attempts
- Command Injection
- Path Traversal
- Brute Force Login
- Debug Endpoint Access
- Sensitive File Access
- XSS Attempts

## API Endpoints

### Vulnerable App
- `GET /api/health` - Health check
- `GET /api/users` - List users (no auth!)
- `GET /debug` - Debug info (sensitive!)

### Mock SIEM
- `GET /api/logs` - Query logs
- `GET /api/alerts` - Get security alerts
- `GET /api/stats` - SIEM statistics
- `GET /api/rules` - Detection rules
- `GET /api/export` - Export for AI analysis
- `GET /api/logs/stream` - SSE log stream
- `GET /api/alerts/stream` - SSE alert stream

## Files

```
demo-infra/
├── docker-compose.yml       # Main compose file
├── vulnerable-app/
│   ├── Dockerfile
│   ├── app.py              # Flask app with vulns
│   └── requirements.txt
├── siem/
│   ├── Dockerfile
│   ├── siem.py             # Mock SIEM
│   └── requirements.txt
├── attacker/
│   ├── Dockerfile
│   ├── attack_runner.py    # Scripted attacks
│   └── requirements.txt
└── scripts/
    ├── reset-demo.sh       # Reset between demos
    └── setup-ollama.sh     # Pre-pull LLM models
```

## Troubleshooting

### Ollama not responding
```bash
podman logs ollama-local
# May need to wait for model loading
```

### Vulnerable app database errors
```bash
# Reset the database
./scripts/reset-demo.sh
```

### Network issues
```bash
# Check if containers can reach each other
podman exec red-team curl http://vulnerable-app:5000/api/health
```
