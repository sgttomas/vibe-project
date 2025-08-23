#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $(basename "$0") [options]

Bootstrap local Neo4j and run CF14 export using this repo's app/framework.

Options:
  --app-only        Start Neo4j and app constraints only (skip Python export)
  --dry-run         Print commands without executing
  -h, --help        Show this help

Environment:
  Uses repo-local paths: projects/vibe-project/app and projects/vibe-project/framework
EOF
}

DRY_RUN=false
APP_ONLY=false
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --app-only) APP_ONLY=true ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; usage; exit 2 ;;
  esac
done

run() { if $DRY_RUN; then echo "+ $*"; else eval "$*"; fi }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJ_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"  # projects/vibe-project
APP_DIR="$PROJ_ROOT/app"
FRAMEWORK_DIR="$PROJ_ROOT/framework"

echo "▶ Starting Neo4j (if not already)..."
run "cd '$APP_DIR' && docker compose -f docker-compose.neo4j.yml up -d"
until curl -s http://localhost:7474 >/dev/null; do sleep 1; done
run "cd '$APP_DIR' && npm install >/dev/null 2>&1 || true"
run "cd '$APP_DIR' && npx tsx scripts/init-graph-constraints.ts || true"

echo "▶ Ensuring CF14 constraints (optional manual step)..."
cat > /tmp/cf14-indexes.cypher <<'CYPHER'
CREATE CONSTRAINT cf_matrix_id IF NOT EXISTS FOR (m:CFMatrix) REQUIRE m.id IS UNIQUE;
CREATE CONSTRAINT cf_node_id   IF NOT EXISTS FOR (n:CFNode)   REQUIRE n.id IS UNIQUE;
CREATE INDEX     cf_term_idx   IF NOT EXISTS FOR (n:CFNode)   ON (n.term);
CYPHER
echo "Open http://localhost:7474 and run /tmp/cf14-indexes.cypher if needed."

if ! $APP_ONLY; then
  echo "▶ Running CF14 pipeline with Neo4j export..."
  run "python3 -m venv '$FRAMEWORK_DIR/.venv'"
  # shellcheck disable=SC1091
  run "source '$FRAMEWORK_DIR/.venv/bin/activate' && pip install -r '$FRAMEWORK_DIR/requirements.txt'"
  run "source '$FRAMEWORK_DIR/.venv/bin/activate' && python -m chirality.cli run --thread 'demo:test' --A chirality/tests/fixtures/A.json --B chirality/tests/fixtures/B.json --resolver echo --write-cf14-neo4j"
fi

echo "✅ Done. Query via the app:"
echo "   cd '$APP_DIR' && npm run dev"
echo "   curl -s -H 'Authorization: Bearer dev-super-secret' -H 'Content-Type: application/json' \\
     -d '{\"query\":\"{ cfMatrices(kind:\\\"A\\\"){ id kind nodes(limit:5){ id term } } }\"}' \\
     http://localhost:3001/api/v1/graph/graphql | jq ."

