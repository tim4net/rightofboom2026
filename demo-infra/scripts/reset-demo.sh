#!/bin/bash
# Reset demo environment to clean state
# Run between demo presentations

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "Resetting Demo Environment"
echo "=========================================="

cd "$INFRA_DIR"

# Stop containers
echo "[1/5] Stopping containers..."
podman-compose down 2>/dev/null || docker-compose down 2>/dev/null || true

# Remove volumes (clears databases and logs)
echo "[2/5] Removing volumes..."
podman volume rm demo-infra_app-data demo-infra_app-logs demo-infra_siem-data demo-infra_attack-results 2>/dev/null || true
docker volume rm demo-infra_app-data demo-infra_app-logs demo-infra_siem-data demo-infra_attack-results 2>/dev/null || true

# Rebuild images (optional, uncomment if needed)
# echo "[3/5] Rebuilding images..."
# podman-compose build --no-cache

# Start fresh containers
echo "[3/5] Starting containers..."
podman-compose up -d 2>/dev/null || docker-compose up -d

# Wait for services to be healthy
echo "[4/5] Waiting for services to start..."
sleep 10

# Verify health
echo "[5/5] Checking service health..."
curl -sf http://localhost:8080/api/health && echo " - Vulnerable app: OK" || echo " - Vulnerable app: FAILED"
curl -sf http://localhost:8081/api/health && echo " - SIEM: OK" || echo " - SIEM: FAILED"
curl -sf http://localhost:11434/api/tags && echo " - Ollama: OK" || echo " - Ollama: FAILED"

echo ""
echo "=========================================="
echo "Demo Environment Reset Complete"
echo "=========================================="
echo ""
echo "Services:"
echo "  - Vulnerable App: http://localhost:8080"
echo "  - Mock SIEM:      http://localhost:8081"
echo "  - Ollama:         http://localhost:11434"
echo ""
echo "To run attack chain:"
echo "  podman exec red-team python attack_runner.py"
echo ""
