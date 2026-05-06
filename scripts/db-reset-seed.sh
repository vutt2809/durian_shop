#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

echo "Starting MySQL via docker compose..."
docker compose up -d mysql

echo "Waiting for MySQL to be healthy..."
for i in {1..60}; do
  status="$(docker inspect --format='{{json .State.Health.Status}}' durian_shop_mysql 2>/dev/null || true)"
  if [[ "$status" == "\"healthy\"" ]]; then
    break
  fi
  sleep 2
done

cd "$ROOT_DIR/backend"

if ! grep -qE '^APP_KEY=.+$' .env; then
  echo "Generating APP_KEY..."
  php artisan key:generate --force
fi

echo "Running migrate:fresh --seed..."
DB_PORT=3307 php artisan migrate:fresh --seed

echo "Done."

