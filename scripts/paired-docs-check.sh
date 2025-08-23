#!/usr/bin/env bash
set -euo pipefail

APP_DIR="projects/vibe-project/app/lib/framework"
FW_DIR="projects/vibe-project/framework/lib/app"
FAIL=0
LIST=0
FAIL_POLICY=0
DIV_THRESHOLD=0.30

usage() {
  cat <<'EOF'
paired-docs-check.sh — verify app/framework co-named doc pairs

Usage:
  bash scripts/paired-docs-check.sh [--list] [--fail-on-missing] [--fail-on-policy] [--divergence-threshold N.NN]

Checks:
  - Lists co-named pairs present in both locations
  - Reports app-only and framework-only files
  - Verifies pairing headers exist in Markdown pairs
  - Optionally enforces divergence policy (size delta vs Divergence note)

Options:
  --list             Print detected pairs
  --fail-on-missing      Exit 1 if any unpaired files exist
  --fail-on-policy       Exit 1 on missing headers or divergence violations
  --divergence-threshold Fractional size delta to trigger divergence check (default 0.30)
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --list) LIST=1; shift;;
    --fail-on-missing) FAIL=1; shift;;
    --fail-on-policy) FAIL_POLICY=1; shift;;
    --divergence-threshold) DIV_THRESHOLD="$2"; shift 2;;
    --help|-h) usage; exit 0;;
    *) echo "Unknown option: $1" >&2; usage; exit 2;;
  esac
done

if [[ ! -d "$APP_DIR" || ! -d "$FW_DIR" ]]; then
  echo "Expected directories not found: $APP_DIR or $FW_DIR" >&2
  exit 2
fi

ls -1 "$APP_DIR" | sort > /tmp/app.$$
ls -1 "$FW_DIR" | sort > /tmp/fw.$$

# Build sets
comm -12 /tmp/app.$$ /tmp/fw.$$ > /tmp/pairs.$$
comm -23 /tmp/app.$$ /tmp/fw.$$ > /tmp/app_only.$$
comm -13 /tmp/app.$$ /tmp/fw.$$ > /tmp/fw_only.$$

PAIRS=$(wc -l </tmp/pairs.$$ | tr -d ' ')
APP_ONLY=$(wc -l </tmp/app_only.$$ | tr -d ' ')
FW_ONLY=$(wc -l </tmp/fw_only.$$ | tr -d ' ')

echo "Paired docs: $PAIRS" >&2
if [[ "$LIST" -eq 1 ]]; then
  sed 's/^/ - /' /tmp/pairs.$$ || true
fi

if [[ "$APP_ONLY" -gt 0 ]]; then
  echo "App-only docs ($APP_ONLY):" >&2
  sed 's/^/ - /' /tmp/app_only.$$ >&2
fi

if [[ "$FW_ONLY" -gt 0 ]]; then
  echo "Framework-only docs ($FW_ONLY):" >&2
  sed 's/^/ - /' /tmp/fw_only.$$ >&2
fi

rm -f /tmp/app.$$ /tmp/fw.$$. /tmp/pairs.$$ /tmp/app_only.$$ /tmp/fw_only.$$ || true

if [[ "$FAIL" -eq 1 && ( "$APP_ONLY" -gt 0 || "$FW_ONLY" -gt 0 ) ]]; then
  exit 1
fi

# Policy checks: headers and divergence (Markdown pairs only)
POLICY_FAIL=0
if [[ "$PAIRS" -gt 0 ]]; then
  while IFS= read -r name; do
    case "$name" in
      *.md|*.MD)
        app_path="$APP_DIR/$name"
        fw_path="$FW_DIR/$name"
        # Header presence checks
        if ! rg -q "^Note: App perspective of .*Paired with framework at \\.\./\./\./framework/lib/app/$name\." "$app_path"; then
          echo "Missing pairing header in: $app_path" >&2
          POLICY_FAIL=1
        fi
        if ! rg -q "^Note: Framework perspective of .*Paired with app at \\.\./\./\./app/lib/framework/$name\." "$fw_path"; then
          echo "Missing pairing header in: $fw_path" >&2
          POLICY_FAIL=1
        fi
        # Divergence policy
        app_size=$(wc -c <"$app_path")
        fw_size=$(wc -c <"$fw_path")
        # Avoid division by zero
        base=$(( app_size > fw_size ? app_size : fw_size ))
        diff=$(( app_size > fw_size ? app_size - fw_size : fw_size - app_size ))
        # compute fractional difference using awk
        frac=$(awk -v d="$diff" -v b="$base" 'BEGIN{ if (b==0) print 0; else printf "%.4f", d/b }')
        has_div_app=0; has_div_fw=0
        rg -qi '^Divergence:' "$app_path" && has_div_app=1 || true
        rg -qi '^Divergence:' "$fw_path" && has_div_fw=1 || true
        # If sizes differ beyond threshold and neither has Divergence, flag
        awk -v f="$frac" -v t="$DIV_THRESHOLD" 'BEGIN{exit !(f>t)}' || frac_ok=1
        if awk -v f="$frac" -v t="$DIV_THRESHOLD" 'BEGIN{exit !(f>t)}'; then
          if [[ "$has_div_app" -ne 1 && "$has_div_fw" -ne 1 ]]; then
            echo "Divergence note required for: $name (size delta $(printf '%.2f' "${frac}") > ${DIV_THRESHOLD})" >&2
            POLICY_FAIL=1
          fi
        fi
        # If only one side has Divergence note, flag
        if [[ "$has_div_app" -ne "$has_div_fw" ]]; then
          echo "Divergence note mismatch between app/framework for: $name" >&2
          POLICY_FAIL=1
        fi
        ;;
      *) : ;; # skip non-markdown
    esac
  done < <(cat /tmp/pairs.$$)
fi

if [[ "$FAIL_POLICY" -eq 1 && "$POLICY_FAIL" -eq 1 ]]; then
  exit 1
fi

exit 0
