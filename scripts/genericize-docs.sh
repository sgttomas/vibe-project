#!/usr/bin/env bash
set -euo pipefail

ROOT="projects/vibe-project"
APPLY=0
FILES_GLOB="**/*.{md,MD,mdx,yml,yaml}"

usage(){ cat <<'EOF'
genericize-docs.sh — replace product-specific names with generic terms

Usage:
  bash projects/vibe-project/scripts/genericize-docs.sh [--apply] [--root PATH]

Replacements (case-insensitive):
  Chirality AI                    → AI Orchestrator
  Chirality AI App                → AI App
  Chirality Chat                  → Chat Interface
  Chirality Core                  → App Core
  Chirality Semantic Framework    → Semantic Framework
  Chirality Framework             → Semantic Framework
  chirality-ai-app                → ai-app
  chirality-semantic-framework    → framework
  chirality-ai                    → orchestrator

Notes:
  - Only processes documentation files: *.md, *.mdx, *.yml, *.yaml
  - Dry-run by default: prints a summary of matches. Use --apply to write changes.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --apply) APPLY=1; shift;;
    --root) ROOT="$2"; shift 2;;
    --help|-h) usage; exit 0;;
    *) echo "Unknown option: $1" >&2; usage; exit 2;;
  esac
done

cd "$ROOT"

# Build ripgrep pattern for a quick count
PATTERN='Chirality AI App|Chirality Semantic Framework|Chirality Framework|Chirality AI|Chirality Chat|Chirality Core|Chirality-Framework|Chirality-chat|Chirality system|Chirality Document|Chirality Core Chat|chirality-ai-app|chirality-semantic-framework|chirality-ai|Semantic Framework|AI App'

echo "Scanning for product-specific terms under $ROOT ..." >&2
rg -n -S -i "$PATTERN" --glob "$FILES_GLOB" || true

if [[ "$APPLY" -eq 0 ]]; then
  echo "Dry-run complete. Use --apply to write changes." >&2
  exit 0
fi

echo "Applying replacements ..." >&2

# Find files and perform ordered replacements using perl for case-insensitive, whole-phrase
while IFS= read -r -d '' f; do
  perl -0777 -pe '
    s/Chirality AI App/AI App/gi;
    s/Chirality AI/AI Orchestrator/gi;
    s/Chirality Chat/Chat Interface/gi;
    s/Chirality Core/App Core/gi;
    s/Chirality Semantic Framework/Semantic Framework/gi;
    s/Chirality Framework/Semantic Framework/gi;
    s/Chirality-Framework/Semantic Framework/gi;
    s/Chirality-chat/Chat Interface/gi;
    s/Chirality system/system/gi;
    s/Chirality Document/Document/gi;
    s/Chirality Core Chat/Core Chat/gi;
    s/chirality-ai-app/ai-app/gi;
    s/chirality-semantic-framework/framework/gi;
    s/chirality-ai/orchestrator/gi;
    # Final canonical generic terms per request
    s/AI App/Frontend App/gi;
    s/Semantic Framework/Backend Framework/gi;
  ' -i "$f"
done < <(rg -l -S -i "$PATTERN" --glob "$FILES_GLOB" -0 || true)

echo "Replacement complete." >&2
