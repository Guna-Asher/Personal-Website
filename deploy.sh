#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$HOME/Personal-Website"
SERVICE_NAME="portfolio"
EXPECTED_BIND="127.0.0.1:3000"

MAX_ATTEMPTS=30
SLEEP_SECONDS=2

echo "==> Moving to application directory"
cd "$APP_DIR"

echo "==> Checking working tree"
if [[ -n "$(git status --porcelain)" ]]; then
    echo "ERROR: Working tree is not clean."
    echo "Commit, stash, or remove local changes before deploying."
    git status --short
    exit 1
fi

echo "==> Pulling latest code"
git pull --ff-only origin main

echo "==> Validating Docker Compose configuration"
docker compose config --quiet

echo "==> Validating application port mapping"
ACTUAL_BIND="$(docker compose port "$SERVICE_NAME" 3000)"

if [[ "$ACTUAL_BIND" != "$EXPECTED_BIND" ]]; then
    echo "ERROR: Unexpected port mapping."
    echo "Expected: $EXPECTED_BIND"
    echo "Actual:   $ACTUAL_BIND"
    exit 1
fi

echo "    Port mapping OK: $ACTUAL_BIND"

echo "==> Building Docker image"
docker compose build

echo "==> Starting application"
docker compose up -d

echo "==> Waiting for application to become ready"

for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do

    container_id="$(docker compose ps -q "$SERVICE_NAME" 2>/dev/null || true)"

    container_health="unknown"

    if [[ -n "$container_id" ]]; then
        container_health="$(
            docker inspect \
                --format '{{.State.Health.Status}}' \
                "$container_id" 2>/dev/null || true
        )"
    fi

    http_ok=false

    if curl --fail --silent \
        http://127.0.0.1:3000 > /dev/null 2>&1; then
        http_ok=true
    fi

    if [[ "$container_health" == "healthy" && "$http_ok" == "true" ]]; then
        echo "==> Application is ready and healthy"
        break
    fi

    if (( attempt == MAX_ATTEMPTS )); then
        echo "ERROR: Application did not become ready and healthy in time"
        docker compose ps
        exit 1
    fi

    echo "    Attempt $attempt/$MAX_ATTEMPTS: health=$container_health http=$http_ok"
    sleep "$SLEEP_SECONDS"
done

echo "==> Final container status"
docker compose ps

echo "==> Deployment successful"
