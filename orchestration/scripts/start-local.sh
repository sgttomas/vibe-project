#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: start-local.sh [options]

Start local dev services for this repo only.
Runs the Next.js app in projects/vibe-project/app and optionally prepares the Python framework venv.

Options:
  --app-only         Start app only (default behavior)
  --with-framework   Create/update Python venv and install requirements (no server)
  --background       Run the app in background and print PID
  --no-port-check    Skip port availability checks
  --dry-run          Print commands without executing
  -h, --help         Show this help

Notes:
- This script does not start external repos. For multi-repo orchestration, use start-all.sh.
- Expects Node.js and npm to be installed for the app.
EOF
}

DRY=false
CHECK_PORTS=true
WITH_FRAMEWORK=false
BACKGROUND=false

for arg in "$@"; do
  case "$arg" in
    --app-only) ;; # default
    --with-framework) WITH_FRAMEWORK=true ;;
    --background) BACKGROUND=true ;;
    --no-port-check) CHECK_PORTS=false ;;
    --dry-run) DRY=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage; exit 2 ;;
  esac
done

run() { if $DRY; then echo "+ $*"; else eval "$*"; fi }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ORCH_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
PROJ_ROOT="$(cd "$ORCH_DIR/.." && pwd)"  # projects/vibe-project
APP_DIR="$PROJ_ROOT/app"
FW_DIR="$PROJ_ROOT/framework"

echo "📁 Project root: $PROJ_ROOT"

check_port() {
  local port=$1
  if lsof -i :"$port" >/dev/null 2>&1; then
    echo "⚠️  Port $port is already in use"
    return 1
  fi
  return 0
}

if $CHECK_PORTS; then
  echo "🔍 Checking ports..."
  check_port 3000 || echo "   App (3000) busy — the app may already be running."
fi

echo "🧩 Preparing app..."
run "cd '$APP_DIR' && npm install"

if $WITH_FRAMEWORK; then
  echo "🐍 Preparing Python framework venv..."
  run "python3 -m venv '$FW_DIR/.venv'"
  # shellcheck disable=SC1091
  run "source '$FW_DIR/.venv/bin/activate' && pip install -r '$FW_DIR/requirements.txt'"
fi

echo "🚀 Starting app (Next.js on :3000)..."
if $BACKGROUND; then
  if $DRY; then
    echo "+ cd '$APP_DIR' && npm run dev &"; echo "+ echo \$!"
  else
    cd "$APP_DIR" && npm run dev &
    APP_PID=$!
    echo "✅ App started in background (PID: $APP_PID)"
  fi
else
  echo "CTRL+C to stop."
  run "cd '$APP_DIR' && npm run dev"
fi

echo "📎 Quick URLs:\n  - Frontend: http://localhost:3000\n  - App Core: http://localhost:3000/chirality-core\n"

