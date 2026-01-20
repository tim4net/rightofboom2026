#!/bin/bash
# Pre-pull Ollama models for offline demo use
# Run this BEFORE the conference while you have good internet

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$(dirname "$SCRIPT_DIR")"

echo "=========================================="
echo "Setting Up Ollama for Offline Demo"
echo "=========================================="

cd "$INFRA_DIR"

# Start just Ollama
echo "[1/4] Starting Ollama container..."
podman-compose up -d ollama 2>/dev/null || docker-compose up -d ollama

# Wait for Ollama to be ready
echo "[2/4] Waiting for Ollama to start..."
until curl -sf http://localhost:11434/api/tags > /dev/null 2>&1; do
    sleep 2
    echo "  Waiting..."
done
echo "  Ollama is ready!"

# Pull models
echo "[3/4] Pulling models (this may take a while)..."

# Llama 3.2 3B - good balance of speed and capability
echo "  Pulling llama3.2:3b..."
curl -X POST http://localhost:11434/api/pull -d '{"name": "llama3.2:3b"}' | jq -r '.status // empty'

# Optional: smaller model for faster response
echo "  Pulling llama3.2:1b..."
curl -X POST http://localhost:11434/api/pull -d '{"name": "llama3.2:1b"}' | jq -r '.status // empty'

# Verify models
echo ""
echo "[4/4] Verifying installed models..."
curl -s http://localhost:11434/api/tags | jq -r '.models[].name'

echo ""
echo "=========================================="
echo "Ollama Setup Complete"
echo "=========================================="
echo ""
echo "Available models:"
curl -s http://localhost:11434/api/tags | jq -r '.models[] | "  - \(.name) (\(.size / 1024 / 1024 / 1024 | floor)GB)"'
echo ""
echo "The models are stored in a Docker volume and will persist."
echo "You can now run the demo offline!"
echo ""
