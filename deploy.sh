#!/usr/bin/env bash

set -euo pipefail

APP_DIR="$HOME/Personal-Website"

echo "==> Moving to application directory"
cd "$APP_DIR"

echo "==> Pulling latest code"
git pull --ff-only origin main

echo "==> Building Docker image"
docker compose build

echo "==> Starting application"
docker compose up -d

echo "==> Current container status"
docker compose ps

echo "==> Checking application health"
curl --fail --silent --show-error http://127.0.0.1:3000 > /dev/null

echo "==> Deployment successful"
