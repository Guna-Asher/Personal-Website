#!/usr/bin/env bash

set -euo pipefail

SERVICE_NAME="portfolio"
APP_URL="http://127.0.0.1:3000"

echo "==> Checking container"

CONTAINER_ID="$(docker compose ps -q "$SERVICE_NAME" 2>/dev/null || true)"

if [[ -z "$CONTAINER_ID" ]]; then
    echo "ERROR: Container does not exist"
    exit 1
fi

CONTAINER_HEALTH="$(
    docker inspect \
        --format '{{.State.Health.Status}}' \
        "$CONTAINER_ID"
)"

echo "    Container health: $CONTAINER_HEALTH"

if [[ "$CONTAINER_HEALTH" != "healthy" ]]; then
    echo "ERROR: Container is not healthy"
    exit 1
fi

echo "==> Checking HTTP endpoint"

if ! curl --fail --silent --show-error \
    "$APP_URL" > /dev/null; then
    echo "ERROR: Application HTTP check failed"
    exit 1
fi

echo "    HTTP check: OK"

echo "==> Checking Nginx"

if ! curl --fail --silent --show-error \
    http://127.0.0.1 > /dev/null; then
    echo "ERROR: Nginx/public endpoint check failed"
    exit 1
fi

echo "    Nginx check: OK"

echo "==> System health check passed"
