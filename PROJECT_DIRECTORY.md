# Vibe Project - Project Directory Structure

**Generated**: 2025-08-18  
**Updated**: 2025-08-19 - Session 3 successful completion
**Purpose**: Complete map of the AI co-development environment  
**Status**: Session 3 elegant solution achieved competitive performance

## Overview

The Vibe Project is a split-apps development environment designed for AI-assisted development. It consists of three interconnected projects with bidirectional knowledge transfer capabilities.

Note: devhistory/ directories are intentionally excluded from this directory map to reduce noise. Refer to version control for historical artifacts.

## Root Structure

```
vibe-project/
├── AGENT_ONBOARDING_GUIDE.md          # Master AI collaboration entry point
├── AGENT_FRONTEND_SETUP_GUIDE.md      # Frontend-specific AI documentation
├── AGENT_BACKEND_SETUP_GUIDE.md       # Backend-specific AI documentation
├── AGENT_PERFORMANCE_OPTIMIZATION_GUIDE.md # Performance engineering methodology
├── DIRECTORY_STRUCTURE.md             # Environment architecture overview
├── SPLIT_APPS_ARCHITECTURE.md         # Detailed architecture documentation
├── PROJECT_DIRECTORY.md               # This file - complete structure map
├── AI_PERFORMANCE_COLLABORATION_CASE_STUDY.md # Real-world performance case study
│
├── app/                                # Frontend application (Next.js/TypeScript)
├── framework/                          # Backend framework (Python)
├── orchestration/                     # Deployment and orchestration (compose + desktop)
│   ├── compose/                      # docker-compose (Neo4j, optional GraphQL/Admin via profile)
│   │   └── docker-compose.yml
│   ├── desktop/                      # Electron-based AI Orchestrator app
│   │   ├── src/main.ts              # Main process (settings window, validation, health)
│   │   ├── resources/settings.html  # Settings UI (no nodeIntegration)
│   │   ├── resources/settings-preload.js
│   │   ├── resources/health-report.html
│   │   └── resources/health-report-preload.js
│   └── scripts/
│       └── chirality                 # Compose helper: up/down/logs/status/reset
├── rapid/                             # Performance challenge - previous sessions (P3 artifacts)
│   ├── benchmark/results/
│   ├── docs/challenge/
│   └── AGENT.md                      # Historical session documentation
└── rapid-clean/                       # Session 3 - SUCCESSFUL elegant solution
    ├── benchmark/
    │   └── results/
    │       ├── benchmarks-session3-clean-elegant-final.json  # Competitive performance results
    │       └── benchmarks-session3-clean-elegant.json
    ├── core/jvm/src/main/scala/rapid/
    │   ├── FixedThreadPoolFiber.scala  # Elegant ~20-line trampolined solution
    │   └── Platform.scala              # Non-blocking sleep implementation
    ├── core/shared/src/main/scala/rapid/
    │   ├── Task.scala                 # Fixed Task.unit bug
    │   └── task/CompletableTask.scala # Added failure callbacks
    ├── docs/
    │   └── ai-dev/                    # Complete AI collaboration logs
    │       ├── ClaudeCODE_LOGS.txt
    │       ├── ChatGPT_LOGS.txt
    │       ├── Gemini_LOGS.txt
    │       ├── Grok_LOGS.txt
    │       └── LOGS_*.txt            # Multiple iteration logs
    ├── AGENT.md                       # Session 3 clean implementation docs
    └── build.sbt
```

## App (Frontend Application)

```
app/
├── .claude/                           # Claude-specific configuration
│   └── settings.local.json
├── .devcontainer/                     # Dev container configuration
│   └── devcontainer.json
├── .github/                           # GitHub Actions and workflows
│   ├── workflows/
│   │   ├── ci.yml                    # Continuous integration
│   │   └── release.yml               # Release automation
│   ├── CODEOWNERS
│   └── Simple5.py
├── .husky/                            # Git hooks configuration
│   └── pre-commit
├── .vscode/                           # VS Code settings
│   ├── extensions.json
│   ├── launch.json
│   ├── settings.json
│   └── tasks.json
│
├── __tests__/                         # Test files
│   └── selector.test.ts
├── config/                            # Application configuration
│   └── selection.json
├── devhistory/                        # Development history (excluded from this map)
│
├── docs/                              # Documentation
│   ├── adr/                          # Architecture Decision Records
│   │   └── frontend/
│   │       ├── 008-react-app-router.md
│   │       ├── 009-zustand-state-management.md
│   │       ├── 010-tailwind-design-system.md
│   │       ├── 011-sse-streaming-pattern.md
│   │       └── 012-component-composition.md
│   ├── components/                   # Component documentation
│   │   ├── atoms/
│   │   │   └── Button.md
│   │   ├── organisms/
│   │   │   └── ChatWindow.md
│   │   └── README.md
│   ├── FRONTEND_DOCUMENTATION_INDEX.md
│   └── UI_DESIGN_SYSTEM.md
│
├── lib/                               # Libraries and mirrors
│   ├── ai-env/                      # Environment documentation mirror
│   │   ├── AGENT_APP_SETUP_GUIDE.md
│   │   ├── AGENT_FRAMEWORK_SETUP_GUIDE.md
│   │   ├── AGENT_ONBOARDING_GUIDE.md
│   │   ├── DIRECTORY_STRUCTURE.md
│   │   └── SPLIT_APPS_ARCHITECTURE.md
│   ├── framework/ # Backend documentation mirror
│   │   ├── KNOWLEDGE_TRANSFER_MANIFEST.md
│   │   ├── AGENT.md
│   │   └── [29 documentation files]
│   └── graph/                        # Graph utilities
│       ├── integration.ts
│       ├── mirror.ts
│       └── selector.ts
│
├── pages/                             # Next.js pages (if using Pages Router)
│   └── api/
├── public/                            # Static assets
│   ├── favicon.ico
│   ├── manifest.json
│   ├── offline.html
│   └── sw.js
├── scripts/                           # Utility scripts
│   ├── backfill-graph-from-files.ts
│   ├── bootstrap-cf14-to-neo4j.sh
│   ├── cf14-indexes.cypher
│   ├── init-graph-constraints.ts
│   ├── link-cf-to-components.ts
│   ├── smoke-rest.mjs
│   ├── test-orchestration-enhanced.ts
│   ├── test-orchestration.ts
│   ├── update-docs-index.js
│   ├── validate-env.js
│   ├── validate-graph-env.ts
│   └── README.md
│
├── src/                               # Source code
│   ├── app/                          # Next.js App Router
│   │   ├── api/                     # API routes
│   │   │   ├── chat/
│   │   │   ├── core/
│   │   │   ├── healthz/
│   │   │   ├── readyz/
│   │   │   └── v1/
│   │   ├── chat-admin/
│   │   │   └── page.tsx
│   │   ├── chirality-core/
│   │   │   └── page.tsx
│   │   ├── chirality-graph/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── README.md
│   ├── chirality-core/               # Core business logic
│   │   ├── export/
│   │   │   └── formatters.ts
│   │   ├── rag/
│   │   │   ├── chunk.ts
│   │   │   ├── retrieve.ts
│   │   │   └── vectorStore.ts
│   │   ├── state/
│   │   │   └── store.ts
│   │   ├── util/
│   │   ├── vendor/
│   │   │   ├── embed.ts
│   │   │   └── llm.ts
│   │   ├── compactor.ts
│   │   ├── contracts.ts
│   │   ├── orchestrate.ts
│   │   ├── systemPrompt.ts
│   │   ├── userPrompt.ts
│   │   ├── validators.ts
│   │   └── README.md
│   ├── components/                   # React components
│   │   ├── chat/
│   │   │   ├── ChatInput.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── Message.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── index.ts
│   │   ├── ui/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── CellWarnings.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   ├── ErrorBoundary.tsx
│   │   └── README.md
│   ├── hooks/                        # React hooks
│   │   ├── useStream.ts
│   │   └── README.md
│   ├── lib/                          # Frontend utilities
│   │   ├── prompt/
│   │   │   ├── builders.ts
│   │   │   ├── formatters.table.ts
│   │   │   ├── formatters.ts
│   │   │   ├── index.ts
│   │   │   ├── llmContracts.ts
│   │   │   ├── system.ts
│   │   │   ├── temperatures.ts
│   │   │   ├── user.ts
│   │   │   └── validators.ts
│   │   └── api.ts
│   └── types/                        # TypeScript type definitions
│       └── global.d.ts
│
├── store/                             # Application state
│   └── state.json
├── types/                             # Additional type definitions
│   ├── graphql-depth-limit.d.ts
│   └── graphql-validation-complexity.d.ts
│
├── AGENTS.md                          # Agent documentation
├── API.md                             # API documentation
├── ARCHITECTURE.md                    # Architecture overview
├── CHANGELOG.md                       # Change log
├── CLAUDE.md                          # Claude collaboration guide
├── COMMIT_HOOKS.md                    # Git hooks documentation
├── CONSOLIDATED_IMPROVEMENT_PLAN.md   # Improvement execution plan
├── CONTINUOUS_IMPROVEMENT_PLAN.md     # Ongoing improvement process
├── CONTRIBUTING.md                    # Contribution guidelines
├── CURRENT_STATUS.md                  # Current project status
├── GETTING_STARTED.md                 # Getting started guide
├── GRAPHQL_NEO4J_INTEGRATION_PLAN.md  # GraphQL integration plan
├── HELP.md                            # Help documentation
├── INTEGRATION_ARCHITECTURE.md        # Integration architecture
├── KEY_DECISIONS.md                   # Key architectural decisions
├── KEY_PROJECT_FILES.md               # Documentation status tracking
├── LICENSE                            # License file
├── MVP_IMPLEMENTATION_PLAN.md         # MVP implementation plan
├── NEO4J_SEMANTIC_INTEGRATION.md      # Neo4j integration docs
├── ONBOARDING.md                      # Onboarding guide
├── PROJECT_DIRECTORY.md               # Project structure
├── README.md                          # Main readme
├── RELEASE_NOTES_v1.0.0.md           # Release notes
├── ROADMAP.md                         # Project roadmap
├── TROUBLESHOOTING.md                 # Troubleshooting guide
├── VERSION.md                         # Version information
├── Simple5.py                         # Python utility
├── docker-compose.neo4j.yml           # Neo4j Docker configuration
├── jest.config.js                     # Jest test configuration
├── next-env.d.ts                      # Next.js environment types
├── next.config.js                     # Next.js configuration
├── package.json                       # NPM package definition
├── postcss.config.js                  # PostCSS configuration
├── requirements.txt                   # Python dependencies
├── tailwind.config.js                 # Tailwind CSS configuration
└── tsconfig.json                      # TypeScript configuration
```

## Framework (Backend Framework)

```
framework/
├── .husky/                            # Git hooks
│   └── _/
│       └── [husky configuration files]
├── .next/                             # Next.js build output (if present)
├── .venv/                             # Python virtual environment
│   ├── bin/
│   ├── include/
│   └── lib/
│
├── canonical-test/                    # Canonical test matrices
│   ├── matrix_A.json
│   ├── matrix_B.json
│   ├── matrix_C.json
│   ├── matrix_D.json
│   ├── matrix_F.json
│   ├── matrix_J.json
│   └── summary.txt
├── chirality/                         # Core framework package
│   ├── adapters/
│   │   ├── __init__.py
│   │   └── neo4j_adapter.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── cell_resolver.py
│   │   ├── ids.py
│   │   ├── ops.py
│   │   ├── prompts.py
│   │   ├── provenance.py
│   │   ├── serialize.py
│   │   ├── stations.py
│   │   ├── types.py
│   │   └── validate.py
│   ├── exporters/
│   │   ├── __init__.py
│   │   └── neo4j_cf14_exporter.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── fixtures/
│   │   │   ├── A.json
│   │   │   └── B.json
│   │   ├── test_ids.py
│   │   ├── test_ops.py
│   │   └── test_validate.py
│   ├── __init__.py
│   ├── cf14_spec.json
│   ├── cli.py
│   └── normative_spec.txt
│
├── devhistory/                        # Development history (excluded from this map)
│
├── echo-test/                         # Echo test matrices
├── lib/                               # Library mirrors
│   ├── ai-env/                      # Environment documentation
│   │   ├── AGENT_APP_SETUP_GUIDE.md
│   │   ├── AGENT_FRAMEWORK_SETUP_GUIDE.md
│   │   ├── AGENT_ONBOARDING_GUIDE.md
│   │   ├── DIRECTORY_STRUCTURE.md
│   │   └── SPLIT_APPS_ARCHITECTURE.md
│   └── ai-app/            # Frontend documentation mirror
│       ├── KNOWLEDGE_TRANSFER_MANIFEST.md
│       ├── AGENT.md
│       └── [27 documentation files]
│
├── openai-validated/                  # OpenAI validation results
├── output/                            # Output directory
├── verification/                      # Verification test results
│
├── 4_DOCUMENTS_ANALYSIS.md            # Documents analysis
├── AGENTS.md                          # Agent documentation
├── API.md                             # API documentation
├── ARCHITECTURE.md                    # Architecture overview
├── CHANGELOG.md                       # Change log
├── AGENT.md                           # Agent collaboration guide
├── COMMIT_HOOKS.md                    # Git hooks documentation
├── CONSOLIDATED_IMPROVEMENT_PLAN.md   # Improvement execution
├── CONTINUOUS_IMPROVEMENT_PLAN.md     # Improvement process
├── CONTRIBUTING.md                    # Contribution guidelines
├── CURRENT_STATUS.md                  # Current status
├── GRAPHQL_NEO4J_INTEGRATION_PLAN.md  # GraphQL integration
├── INTEGRATION_ARCHITECTURE.md        # Integration architecture
├── KEY_DECISIONS.md                   # Key decisions
├── KEY_PROJECT_FILES.md               # File status tracking
├── LICENSE                            # License
├── MANIFEST.in                        # Python manifest
├── MVP_IMPLEMENTATION_PLAN.md         # MVP plan
├── NEO4J_SEMANTIC_INTEGRATION.md      # Neo4j integration
├── PROJECT_DIRECTORY.md               # Project structure
├── README.md                          # Main readme
├── RELEASE_NOTES_14.3.0.md           # Release notes
├── ROADMAP.md                         # Project roadmap
├── SPECULATIVE_CLAIMS.md              # Speculative claims
├── TROUBLESHOOTING.md                 # Troubleshooting
├── VERSION.md                         # Version info
├── cf14_execution_trace.json          # Execution trace
├── cf14_integration_example.py        # Integration example
├── component_viewer.py                # Component viewer
├── next-env.d.ts                      # Next.js types
├── requirements.txt                   # Python dependencies
├── semantic_component_tracker.py      # Component tracker
├── semantic_components.json           # Components config
└── setup.py                           # Python package setup
```

## Rapid Performance Challenge (Scala)

**Status**: ✅ Elegant trampolined solution implemented (23% faster than Cats Effect)  
**Warning**: ⚠️ Contains P3 artifacts that cause OOM on 10M operations - see AGENT.md

```
rapid/
├── AGENT.md                           # ⭐ CRITICAL: Complete development session docs
├── DEVELOPMENT_SESSION_SUMMARY.md     # Executive summary with P3 artifact warnings
├── README.md                          # Updated with performance challenge results
│
├── benchmark/                         # JMH performance benchmarks
│   ├── src/main/scala/benchmark/
│   │   ├── ManySleepsBenchmark.scala # 10M sleep operations benchmark (OOM issue)
│   │   ├── ManyTasksBenchmark.scala  # High-throughput task processing
│   │   ├── OverheadBenchmark.scala   # Per-task allocation overhead
│   │   └── modified/                 # Various benchmark variations
│   └── results/
│       └── benchmarks-*.json         # Historical benchmark results
│
├── core/                              # Core Rapid library
│   ├── jvm/src/main/scala/rapid/
│   │   ├── FixedThreadPoolFiber.scala # ⭐ Elegant solution + P3 artifacts
│   │   ├── Platform.scala            # Platform abstractions
│   │   ├── VirtualThreadFiber.scala  # Virtual thread implementation
│   │   ├── runtime/
│   │   │   ├── RapidRuntime.scala    # ⚠️ P3 artifact - complex timer system
│   │   │   ├── ReadyQueue.scala      # P3 timer queue implementation
│   │   │   └── TimerWakeable.scala   # Timer callback interface
│   │   ├── scheduler/
│   │   │   └── HashedWheelTimer2.scala # ⚠️ P3 artifact - allocation-heavy timer
│   │   └── util/
│   │       └── OneShot.scala         # ✅ Correct completion primitive
│   │
│   └── shared/src/main/scala/rapid/
│       ├── Sleep.scala               # ⚠️ P3 artifact - per-sleep Runnable closures
│       ├── Task.scala                # Core task definitions
│       ├── Fiber.scala               # Fiber interface
│       ├── scheduler/
│       │   ├── Timer.scala           # Old timer interface
│       │   └── Timer2.scala          # New timer interface (unused)
│       └── task/
│           ├── FlatMapTask.scala     # ✅ Contains lazy val contAny optimization
│           ├── AsyncTask.scala       # Async task implementation
│           ├── SleepTask.scala       # Sleep task (should be used instead of P3)
│           └── [other task types]
│
├── project/                           # SBT build configuration
│   ├── build.properties              # SBT version
│   └── plugins.sbt                   # SBT plugins including JMH
│
├── build.sbt                          # Main build configuration
└── scripts/                          # Benchmark runner scripts
    ├── run_full_bench.sh             # Run complete benchmark suite
    └── run_min_bench.sh              # Run minimal benchmarks
```

### Key Files for Future Development:

**Must Read First**:
- `AGENT.md` - Complete development session documentation
- `DEVELOPMENT_SESSION_SUMMARY.md` - Executive summary with recommendations

**Implementation Status**:
- ✅ `FixedThreadPoolFiber.scala` - Contains elegant solution (lines 70-229)
- ✅ `FlatMapTask.scala` - Allocation-free contAny lazy val
- ⚠️ `Sleep.scala:10` - P3 artifact causing OOM (per-sleep Runnable closures)
- ⚠️ `RapidRuntime.scala` - P3 timer infrastructure to remove
- ⚠️ `HashedWheelTimer2.scala` - Complex P3 timer implementation

**Next Session Options**:
- Option A (recommended): Start fresh from baseline
- Option B: Remove P3 artifacts systematically

## Orchestration (Deployment & Desktop)

```
orchestration/
├── compose/                           # Docker orchestration
│   ├── docker-compose.yml            # Main compose file
│   └── .env                          # Environment variables
├── desktop/                           # Desktop application
│   ├── resources/                    # Desktop app resources
│   ├── src/
│   │   └── main.ts                   # Electron/Tauri main
│   ├── package-lock.json
│   ├── package.json                  # Desktop package config
│   └── tsconfig.json                 # TypeScript config
├── scripts/                           # Deployment scripts
│   ├── chirality                     # Main CLI script
│   ├── health-check.sh               # Health check script
│   └── start-all.sh                  # Start all services
│
├── AGENT_APP_SETUP_GUIDE.md          # App setup guide
├── AGENT_FRAMEWORK_SETUP_GUIDE.md    # Framework setup guide
├── AGENT_ONBOARDING_GUIDE.md         # Onboarding guide
├── DIRECTORY_STRUCTURE.md            # Directory structure
├── README.md                          # Main readme
└── SPLIT_APPS_ARCHITECTURE.md        # Architecture docs
```

## Knowledge Transfer Structure

### Frontend → Backend Mirror
```
app/lib/framework/
├── KNOWLEDGE_TRANSFER_MANIFEST.md    # Canonical file list
├── AGENT.md                           # AI collaboration guide
└── [Complete backend documentation]
```

### Backend → Frontend Mirror
```
framework/lib/app/
├── KNOWLEDGE_TRANSFER_MANIFEST.md    # Canonical file list
├── AGENT.md                           # AI collaboration guide
└── [Complete frontend documentation]
```

## File Categories

### Documentation Files
- `*.md` - Markdown documentation
- `README.md` - Project overviews
- `AGENT*.md` - AI collaboration guides
- `*_PLAN.md` - Planning documents

### Configuration Files
- `package.json` - Node.js dependencies
- `setup.py` - Python package config
- `tsconfig.json` - TypeScript config
- `*.config.js` - Various JS configs
- `.env*` - Environment variables

### Source Code
- `*.ts`, `*.tsx` - TypeScript/React
- `*.py` - Python
- `*.js`, `*.mjs` - JavaScript
- `*.scala` - Scala (Rapid performance challenge)
- `*.json` - Data files

### Test Files
- `__tests__/` - Test directories
- `test_*.py` - Python tests
- `*.test.ts` - TypeScript tests
- `*-test/` - Test data directories

## Environment Variables

### Required Variables
```env
# API Keys
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Database
NEO4J_URI=
NEO4J_USERNAME=
NEO4J_PASSWORD=

# Application
NEXT_PUBLIC_API_URL=http://localhost:8080
BACKEND_PORT=8080
FRONTEND_PORT=3000
```

### Optional Variables
```env
# Features
FEATURE_ADVANCED_MODE=true
DEBUG_MODE=false

# External Services
EXTERNAL_SERVICE_URL=
```

## Quick Navigation

### For Frontend Development
Start in: `app/`
Key files: `src/`, `package.json`, `CONTINUOUS_IMPROVEMENT_PLAN.md`

### For Backend Development
Start in: `framework/`
Key files: `chirality/`, `setup.py`, `CONTINUOUS_IMPROVEMENT_PLAN.md`

### For Deployment
Start in: `orchestration/`
Key files: `compose/`, `desktop/`, scripts/`

### For Performance Optimization Challenges
Start in: `rapid/`
Key files: `core/`, `benchmark/`, `docs/challenge/`
Evidence: `benchmark/results/benchmarks-manysleeps-triptych.json`

### For Documentation
Check: Each project's root for `*.md` files
Mirrors: `lib/` directories in each project
Performance: `AGENT_PERFORMANCE_OPTIMIZATION_GUIDE.md`, `AI_PERFORMANCE_COLLABORATION_CASE_STUDY.md`

## Status Indicators

- ✅ **Complete**: All core structure in place
- ⚠️ **Rapid Challenge**: Performance challenge attempted but not successfully completed due to incorrect benchmarks and implementation artifacts
- 🔄 **In Progress**: Knowledge transfer setup ongoing
- 📝 **TODO**: Environment-specific configurations needed

## Performance Challenge Results

**Rapid Performance Challenge (August 2025)**: ⚠️ **ATTEMPTED BUT NOT COMPLETED**
- **Status**: First iteration showed apparent improvements but benchmarks were later found to be incorrect
- **Second Iteration**: Not completed due to failures caused by accumulated P3 artifacts from previous attempts
- **Learning Achievement**: Valuable AI-human collaborative methodology insights and documentation of pitfalls
- **Documentation**: Complete case study and development logs available showing both approaches and failures
- **Key Lesson**: Importance of benchmark validation and clean implementation approaches

---

*This directory structure represents the complete Vibe Project AI co-development environment. It maintains separation of concerns while enabling seamless knowledge transfer between projects. The Rapid Performance Challenge attempt provides valuable lessons about the importance of proper benchmark validation and clean implementation approaches in AI-human collaborative development.*
## CI & Health

- .github/workflows/
  - doc-slug-guard.yml            # Prevents legacy slugs (naming drift)
  - paired-docs.yml               # Paired doc headers + divergence policy
- projects/ai-env/scripts/        # Canonical tools referenced by CI
  - doc-slug-guard.sh             # Slug guard (canonical)
- scripts/ (vibe-project root)
  - genericize-docs.sh            # One-shot docs genericization helper
  - paired-docs-check.sh          # Mirrors/paired docs checker (headers/divergence)
