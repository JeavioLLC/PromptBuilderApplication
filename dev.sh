#!/bin/bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$ROOT_DIR/logs"
mkdir -p "$LOG_DIR"

echo "[dev] Starting backend (Flask) and frontend (Vite) in background..."

# Start backend (uses .env via python-dotenv in run.py). Requires venv already set up.
if [ -d "$ROOT_DIR/.venv" ]; then
  (
    cd "$ROOT_DIR"
    source .venv/bin/activate
    nohup python run.py > "$LOG_DIR/backend.log" 2>&1 &
  )
else
  echo "[dev] Warning: .venv not found. Please create it and install requirements first."
fi

# Start frontend (Vite dev server)
(
  cd "$ROOT_DIR/frontend"
  nohup npm run dev --silent > "$LOG_DIR/frontend.log" 2>&1 &
)

echo "[dev] Backend logs: $LOG_DIR/backend.log"
echo "[dev] Frontend logs: $LOG_DIR/frontend.log"
echo "[dev] Backend URL: http://localhost:5000 (or PORT env if overridden)"
echo "[dev] Frontend URL: http://localhost:3000"


