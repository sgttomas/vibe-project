# Paired Documentation: App ↔ Framework Perspectives

Purpose: Keep frontend (app) and backend (framework) “talking to each other” by maintaining co-named documents from each side’s perspective.

- App-perspective docs: `app/lib/framework/`
- Framework-perspective docs: `framework/lib/app/`

How it works
- Co-named pairs (e.g., `ARCHITECTURE.md`) exist in both folders.
- Each file reflects its source perspective and references its counterpart.
- When one side changes, update the counterpart or explicitly mark divergence and why.

Recommended header snippet (copy into the top of each paired file)
- In `app/lib/framework/<NAME>.md`:
  - Note: App perspective of `<NAME>`. Paired with framework at `../../../framework/lib/app/<NAME>`.
- In `framework/lib/app/<NAME>.md`:
  - Note: Framework perspective of `<NAME>`. Paired with app at `../../../app/lib/framework/<NAME>`.

Quick status check
- Run checker (list pairs and missing counterparts):
  - `bash scripts/paired-docs-check.sh --list`
  - Fail build if pairs missing: `bash scripts/paired-docs-check.sh --fail-on-missing`

Current pairs (auto-detected by the checker)
- AGENT.md
- API.md
- ARCHITECTURE.md
- CHANGELOG.md
- COMMIT_HOOKS.md
- CONTINUOUS_IMPROVEMENT_PLAN.md
- CONTRIBUTING.md
- CURRENT_STATUS.md
- GRAPHQL_NEO4J_INTEGRATION_PLAN.md
- INTEGRATION_ARCHITECTURE.md
- KEY_DECISIONS.md
- KEY_PROJECT_FILES.md
- KNOWLEDGE_TRANSFER_MANIFEST.md
- LICENSE
- MVP_IMPLEMENTATION_PLAN.md
- NEO4J_SEMANTIC_INTEGRATION.md
- PROJECT_DIRECTORY.md
- README.md
- requirements.txt
- TROUBLESHOOTING.md
- VERSION.md

Outliers
- App-only examples/utilities (e.g., `component_viewer.py`, `semantic_component_tracker.py`) do not require pairs.
- Framework-only onboarding/build files (e.g., `ONBOARDING.md`, `package.json`) are expected asymmetries.

Maintenance rules
- Prefer short, perspective-specific deltas; link to canonical specs instead of duplicating.
- If content diverges for good reason, add a “Divergence” note explaining why and how to reconcile.
- Use PR check: wire `paired-docs-check.sh --fail-on-missing` in CI if you want strict pairing.
