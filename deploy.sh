#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$HOME/Personal-Website"
MAX_ATTEMPTS=30
SLEEP_SECONDS=2

echo "==> Moving to application directory"
cd "$APP_DIR"

echo "==> Pulling latest code"
git pull --ff-only origin main

echo "==> Building Docker image"
docker compose build

echo "==> Starting application"
docker compose up -d

echo "==> Waiting for application to become ready"

for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do
    container_health=$(docker inspect \
        --format '{{.State.Health.Status}}' \
        personal-website-portfolio-1 2>/dev/null || true)

    http_ok=false

    if curl --fail --silent http://127.0.0.1:3000 > /dev/null; then
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

echo "==> Current container status"
docker compose ps

echo "==> Deployment successful"
