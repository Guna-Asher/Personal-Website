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

echo "==> Identifying currently running version"

CURRENT_CONTAINER_ID="$(
    docker compose ps -q "$SERVICE_NAME" 2>/dev/null || true
)"

PREVIOUS_IMAGE_ID=""

if [[ -n "$CURRENT_CONTAINER_ID" ]]; then
    PREVIOUS_IMAGE_ID="$(
        docker inspect \
            --format '{{.Image}}' \
            "$CURRENT_CONTAINER_ID" \
            2>/dev/null || true
    )"
fi

if [[ -n "$PREVIOUS_IMAGE_ID" ]]; then
    docker tag "$PREVIOUS_IMAGE_ID" guna-portfolio:rollback
    echo "    Previous image saved as guna-portfolio:rollback"
else
    echo "    No previous image available for rollback"
fi

echo "==> Building Docker image"
docker compose build

echo "==> Starting application"
docker compose up -d --no-build

wait_for_healthy() {
    echo "==> Waiting for application to become ready"

    for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do

        container_id="$(
            docker compose ps -q "$SERVICE_NAME" 2>/dev/null || true
        )"

        container_health="unknown"

        if [[ -n "$container_id" ]]; then
            container_health="$(
                docker inspect \
                    --format '{{.State.Health.Status}}' \
                    "$container_id" \
                    2>/dev/null || true
            )"
        fi

        http_ok=false

        if curl --fail --silent \
            http://127.0.0.1:3000 > /dev/null 2>&1; then
            http_ok=true
        fi

        if [[ "$container_health" == "healthy" && "$http_ok" == "true" ]]; then
            echo "==> Application is ready and healthy"
            return 0
        fi

        if (( attempt == MAX_ATTEMPTS )); then
            echo "ERROR: Application did not become ready and healthy in time"
            return 1
        fi

        echo "    Attempt $attempt/$MAX_ATTEMPTS: health=$container_health http=$http_ok"
        sleep "$SLEEP_SECONDS"
    done
}

rollback() {
    if [[ -z "$PREVIOUS_IMAGE_ID" ]]; then
        echo "ERROR: No previous image is available for rollback."
        return 1
    fi

    echo "==> Rolling back to previous image"

    docker tag "$PREVIOUS_IMAGE_ID" guna-portfolio:latest

    docker compose up -d --force-recreate --no-build

    echo "==> Verifying rollback"

    if wait_for_healthy; then
        echo "==> Rollback successful"
        return 0
    fi

    echo "ERROR: Rollback failed"
    docker compose ps
    docker compose logs --tail=100 "$SERVICE_NAME" || true

    return 1
}

if wait_for_healthy; then

    echo "==> Final container status"
    docker compose ps

    echo "==> Deployment successful"

else

    echo "ERROR: New deployment failed health verification"

    docker compose ps
    docker compose logs --tail=100 "$SERVICE_NAME" || true

    if rollback; then
        echo "==> Deployment failed, but service was successfully rolled back"
        exit 1
    else
        echo "ERROR: Deployment failed and rollback also failed"
        exit 1
    fi

fi
