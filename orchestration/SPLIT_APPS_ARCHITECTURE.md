# Split-Apps Architecture Implementation

## Overview

Successfully implemented and evolved the split-apps structure that preserves all working functionality while organizing the codebase for future unified deployment. The architecture now includes comprehensive documentation systems, knowledge transfer pipelines, and published packages.

**Session 3 Validation**: This architecture enables systematic AI-human collaboration achieving competitive performance through elegant solutions and clean baseline approaches.

## Current Directory Structure

```
/Users/ryan/ai-env/projects/vibe-project/
├── Documentation System (root)      # CLAUDE ONBOARDING SYSTEM
│   ├── AGENT_ONBOARDING_GUIDE.md       # Master entry point for agents
│   ├── AGENT_APP_SETUP_GUIDE.md        # Guide for app documentation work
│   ├── AGENT_FRAMEWORK_SETUP_GUIDE.md  # Guide for framework documentation setup
│   └── DIRECTORY_STRUCTURE.md          # Complete directory map
│
├── orchestration/                   # Orchestration (compose, desktop, docs)
│   ├── compose/
│   │   ├── docker-compose.yml       # Backend services (uses main framework)
│   │   └── .env                     # Environment configuration
│   ├── desktop/                     # Electron wrapper
│   └── .env                         # Shared environment configuration
│
├── app/                  # Product frontend (Next.js/TypeScript)
│   ├── lib/framework/  # FRAMEWORK DOCS MIRROR (29 files)
│   │   ├── KNOWLEDGE_TRANSFER_MANIFEST.md  # Canonical list
│   │   ├── CLAUDE.md                # AI collaboration for this mirror
│   │   └── Complete framework documentation
│   ├── CONTINUOUS_IMPROVEMENT_PLAN.md     # Ongoing documentation process
│   ├── KEY_PROJECT_FILES.md        # Documentation status tracking
│   └── Complete app documentation
│
├── framework/   # Core framework + backend services
│   ├── lib/app/         # APP DOCS MIRROR (27 files)
│   │   ├── KNOWLEDGE_TRANSFER_MANIFEST.md  # Canonical list
│   │   ├── CLAUDE.md               # AI collaboration for this mirror
│   │   └── Complete app documentation
│   ├── chirality/                  # Core CF14 Python package
│   │   ├── core/                   # Semantic operations (A×B→C, etc.)
│   │   ├── adapters/               # Neo4j and other adapters
│   │   ├── exporters/              # CF14 Neo4j export functionality
│   │   └── tests/                  # Test suite with fixtures
│   ├── admin/                      # Express.js orchestration service
│   ├── graphql/                    # Standalone GraphQL service
│   ├── orchestration-service/      # Salvaged orchestration service
│   ├── setup.py                    # PyPI package configuration
│   └── Complete framework documentation
│
└── Chat Interface/                 # Independent sandbox app (legacy)
```

## Knowledge Transfer Architecture

### Bidirectional Documentation Mirrors

The system maintains comprehensive documentation mirrors for knowledge transfer:

```
app/
└── lib/framework/  # How app devs learn framework
    ├── KNOWLEDGE_TRANSFER_MANIFEST.md (29 files listed)
    ├── Python examples (*.py)
    ├── CF14 execution traces (*.json)
    └── Complete framework docs

framework/
└── lib/app/                 # How framework devs learn app
    ├── KNOWLEDGE_TRANSFER_MANIFEST.md (27 files listed)
    ├── TypeScript configs (package.json, tsconfig.json)
    └── Complete app docs
```

### Documentation Improvement System

Both projects use the same systematic improvement cycle:

1. **CONTINUOUS_IMPROVEMENT_PLAN.md** - Ongoing process framework
2. **CONSOLIDATED_IMPROVEMENT_PLAN.md** - Specific implementation (when triggered)
3. **KEY_PROJECT_FILES.md** - Status tracking for all documentation

## Published Packages & Releases

### Python Framework
- **Package**: `Backend Framework` v14.3.1 on PyPI
- **Installation**: `pip install <backend-framework-package>==14.3.1`
- **CLI**: `python -m chirality.cli`
- **GitHub Release**: v14.3.1 with enhanced semantic operations

### TypeScript Application
- **GitHub Release**: v1.0.0 
- **Features**: Complete document generation with CF14 integration
- **Neo4j Integration**: Graph mirror for enhanced discovery

## Services & Ports

### Backend Services (via Docker Compose)
*Services now sourced from framework/*
- **Neo4j**: `localhost:7474` (HTTP), `localhost:7687` (Bolt)
- **GraphQL**: `localhost:8080` (from framework/graphql/)
- **Admin**: `localhost:3001` (from framework/admin/)

### Frontend Applications
- **Product App** (`app`): `localhost:3000`
- **Backend Framework**: Independent ports
- **Chat Sandbox**: Independent ports (legacy)

## Data Contracts

### CF14 Semantic Operations
```python
# CF14 Protocol Operations
op_multiply(A, B) → C       # Semantic intersection
op_interpret(C) → J         # Stakeholder translation  
op_elementwise(J, C) → F    # Element combination
op_add(A, F) → D           # Final synthesis
```

### Neo4j CF14 Integration
```cypher
# CF14 Matrix Nodes
(:CFMatrix {id: "sha1_hash", content: "json", thread: "id"})
(:CFNode {id: "sha1_hash", value: "content", row: 0, col: 0})

# Relationships
(:CFMatrix)-[:CONTAINS]->(:CFNode)
(:CFNode)-[:PART_OF]->(:CFMatrix)
```

### GraphQL API
```typescript
type Query {
  health: ServiceHealth!
  cfMatrices(threadId: String!): [CFMatrix!]!
  components(limit: Int): [Component!]!
}

type CFMatrix {
  id: String!
  threadId: String!
  matrixType: String!
  content: String!
  nodes: [CFNode!]!
}

type CFNode {
  id: String!
  value: String!
  row: Int!
  col: Int!
  matrixId: String!
}
```

### Component Selection Algorithm
```typescript
// Scoring rules for graph mirror
const score = 
  (crossRefs * 3) +        // +3 for each cross-reference
  (keywords * 2) +         // +2 for each keyword match  
  (sizeBonus) -            // Size considerations
  (sizePenalty * 2)        // -2 for oversized content

// Thresholds
const MIN_SCORE = 3        // Minimum for inclusion
const MAX_PER_DOC = 12     // Per document limit
const MAX_TOTAL = 50       // System-wide limit
```

## Environment Configuration

### Shared Environment (orchestrator/.env)
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini

# Neo4j Configuration (Cloud)
NEO4J_PASSWORD=nCyn72sE19a3qJQOfzAMCyL_X2KmCXmrTlHLglN3eHQ
NEO4J_URI=neo4j+s://c0a5bb06.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_DATABASE=neo4j

# Local Neo4j (Docker)
NEO4J_USERNAME=neo4j
NEO4J_LOCAL_PASSWORD=password

# Application Ports
ADMIN_PORT=3001
GRAPHQL_PORT=8080
NEO4J_HTTP_PORT=7474
NEO4J_BOLT_PORT=7687
FRONTEND_PORT=3000

# Feature Flags
FEATURE_GRAPH_ENABLED=true

# Application URLs
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

## Implementation Status

### ✅ Completed (August 2025) - Session 3 Validated
1. **CF14 Integration**: Complete semantic matrix operations with Neo4j export
2. **Document Generation**: Two-pass generation with RAG enhancement
3. **Graph Mirror**: Component selection with metadata-only mirroring
4. **PyPI Package**: Published Backend Framework v14.3.1
5. **GitHub Releases**: Both v14.3.1 (framework) and v1.0.0 (app)
6. **Knowledge Transfer**: Bidirectional documentation mirrors (29/27 files)
7. **Documentation System**: Systematic improvement cycle for both projects
8. **AI Collaboration**: Complete Claude onboarding and setup guides
9. **Session 3 Achievement**: Systematic methodology enabling competitive performance
10. **Clean Baseline Capability**: Prevention of P3-style artifact accumulation

### Services Status
- ✅ **Neo4j**: Running with CF14 matrix storage
- ✅ **GraphQL**: CF14 and component queries working
- ✅ **Admin**: Orchestration service operational
- ✅ **Frontend**: Complete document generation with streaming
- ✅ **Python CLI**: Published package with CF14 operations
- ✅ **Component Mirror**: Metadata mirroring with scoring algorithm

## Application Usage

### Product App Usage (Full Stack)
```bash
# Start Neo4j (local Docker)
cd /Users/ryan/ai-env/projects/vibe-project/app
docker compose -f docker-compose.neo4j.yml up -d

# Start backend services
cd /Users/ryan/ai-env/projects/vibe-project/orchestration/compose
docker compose up -d

# Start frontend
cd /Users/ryan/ai-env/projects/vibe-project/app
npm run dev  # Available at http://localhost:3000
```

### Framework Development
```bash
cd /Users/ryan/ai-env/projects/vibe-project/framework

# Use published package
pip install <backend-framework-package>==14.3.1
python -m chirality.cli run --thread "example" --A A.json --B B.json

# Test CF14 Neo4j export
python -m chirality.cli run --thread "test:$(date +%s)" \
  --A chirality/tests/fixtures/A.json \
  --B chirality/tests/fixtures/B.json \
  --resolver echo --write-cf14-neo4j
```

### Documentation Work
```bash
# For app documentation
cd /Users/ryan/ai-env/projects/vibe-project/
# Read AGENT_APP_SETUP_GUIDE.md

# For framework documentation  
cd /Users/ryan/ai-env/projects/vibe-project/
# Read AGENT_FRAMEWORK_SETUP_GUIDE.md

# For new Claude instances
cd /Users/ryan/ai-env/projects/vibe-project/
# Read AGENT_ONBOARDING_GUIDE.md
```

## Verification Commands

### CF14 Operations Test
```bash
cd /Users/ryan/ai-env/projects/vibe-project/framework
python -m chirality.cli run \
  --thread "verification:$(date +%s)" \
  --A chirality/tests/fixtures/A.json \
  --B chirality/tests/fixtures/B.json \
  --resolver echo --write-cf14-neo4j
```

### GraphQL Health Check
```bash
curl -s -X POST http://localhost:8080/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{health{status lastChecked}}"}'
```

### Component Mirror Check
```bash
curl -s -X POST http://localhost:8080/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{components(limit:5){id title score}}"}'
```

### Frontend Health Check
```bash
curl -s http://localhost:3000/api/healthz
# Expected: {"ok":true,"timestamp":"..."}
```

## Current Service Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend Applications                       │
│  ┌─────────────────┐    ┌─────────────────┐                  │
│  │ app   │    │  Chat Interface │                  │
│  │   (v1.0.0)      │    │    (legacy)     │                  │
│  └─────────────────┘    └─────────────────┘                  │
└─────────────┬───────────────────┬──────────────────────────────┘
              │                   │
              ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│          Backend Framework (v14.3.1 - PyPI Published)        │
│                                                                 │
│  CF14 Semantic Operations:                                      │
│  ├── A×B→C (semantic intersection)                             │
│  ├── C→J (stakeholder translation)                             │
│  ├── J⊙C→F (element combination)                               │
│  └── A⊕F→D (final synthesis)                                   │
│                                                                 │
│  Production Services (Docker-ready):                           │
│  ├── admin/ (Express.js orchestration)                         │
│  ├── graphql/ (CF14 + Component queries)                       │
│  └── orchestration-service/ (Service coordination)             │
│                                                                 │
│  Knowledge Transfer:                                            │
│  ├── lib/app/ (27 files - app docs mirror)          │
│  └── KNOWLEDGE_TRANSFER_MANIFEST.md                            │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Neo4j Database                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  CF14 Semantic Matrices    │    Document Components     │   │
│  │  (:CFMatrix, :CFNode)      │    (:Component, :Document)  │   │
│  │  SHA1-based IDs            │    Metadata mirror only    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Documentation Knowledge Transfer Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   Documentation System                         │
│                                                                 │
│  ┌─────────────────┐              ┌─────────────────┐           │
│  │ App Project     │◄────────────►│ Framework       │           │
│  │                 │              │ Project         │           │
│  │ CONTINUOUS_     │              │ CONTINUOUS_     │           │
│  │ IMPROVEMENT_    │              │ IMPROVEMENT_    │           │
│  │ PLAN.md         │              │ PLAN.md         │           │
│  │                 │              │                 │           │
│  │ lib/            │              │ lib/            │           │
│  │ chirality-      │              │ chirality-      │           │
│  │ semantic-       │              │ app/            │           │
│  │ framework/      │              │ (27 files)      │           │
│  │ (29 files)      │              │                 │           │
│  └─────────────────┘              └─────────────────┘           │
│                                                                 │
│  Coordinated by:                                                │
│  ├── AGENT_ONBOARDING_GUIDE.md (master entry point)            │
│  ├── AGENT_APP_SETUP_GUIDE.md (app maintenance)                │
│  └── AGENT_FRAMEWORK_SETUP_GUIDE.md (framework setup)          │
└─────────────────────────────────────────────────────────────────┘
```

## Benefits Achieved (Session 3 Validated)

### Technical Architecture
1. **CF14 Implementation**: Complete semantic matrix operations with Neo4j integration
2. **Package Distribution**: Published Python package on PyPI (v14.3.1)
3. **Document Generation**: Two-pass generation with RAG enhancement
4. **Graph Integration**: Metadata mirroring with component selection algorithm
5. **API Integration**: GraphQL layer supporting both CF14 and document queries
6. **Session 3 Excellence**: Elegant solutions achieving competitive performance

### Documentation System (Session 3 Enhanced)
1. **Knowledge Transfer**: Bidirectional mirrors enabling cross-project understanding
2. **Systematic Improvement**: Repeatable documentation improvement cycles
3. **AI Collaboration**: Complete onboarding system for future Claude instances
4. **Status Tracking**: Comprehensive documentation health monitoring
5. **Clean Baseline Support**: Prevention of complexity artifact accumulation
6. **Performance Validation**: Documentation supporting breakthrough results

### Development Experience (Session 3 Proven)
1. **Zero Downtime**: Preserved all functionality through evolution
2. **Independent Development**: Projects can iterate separately while staying coordinated
3. **Deployment Flexibility**: Multiple service deployment options
4. **Quality Assurance**: Systematic testing and validation workflows
5. **AI-Human Synergy**: Validated methodology for competitive performance
6. **Elegant Solution Focus**: ~20-line principle supporting maximum impact

## Future: Electron Desktop App

The current structure supports the planned Electron wrapper:

```javascript
// orchestrator/desktop/main.js
async function startApp() {
  // 1. Start Docker services
  await exec('docker compose -f ../compose/docker-compose.yml up -d')
  
  // 2. Wait for health checks
  await waitForHealthy('http://localhost:8080/graphql')
  await waitForHealthy('http://localhost:3001/health')
  
  // 3. Start frontend in embedded browser
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: false }
  })
  window.loadURL('http://localhost:3000')
}
```

## Maintenance Notes

### Documentation Coordination
- **Mirror Synchronization**: Keep KNOWLEDGE_TRANSFER_MANIFEST.md files accurate
- **Version Coordination**: Align PyPI and npm releases
- **Status Tracking**: Update KEY_PROJECT_FILES.md as documentation evolves
- **Claude Guides**: Update setup guides as processes improve

### Development Workflow
```bash
# Framework development (Python)
cd framework
pip install -e .  # Editable install
python -m chirality.cli --help

# App development (TypeScript)  
cd app
npm run dev  # Start with hot reload

# Documentation work
# Follow appropriate AGENT_*_SETUP_GUIDE.md
```

### Release Coordination
```bash
# Framework release
cd framework
# 1. Update setup.py and __init__.py versions
# 2. python setup.py sdist bdist_wheel
# 3. twine upload dist/*
# 4. gh release create v14.x.x

# App release
cd app  
# 1. Update package.json version
# 2. gh release create v1.x.x
```

---

**Current Status**: The split-apps architecture is fully operational with published packages, comprehensive documentation systems, and systematic improvement processes. Ready for continued development, production deployment, or desktop app packaging.

**Knowledge Transfer**: Complete bidirectional documentation mirrors enable seamless collaboration between Python framework and TypeScript application teams.

**AI Collaboration**: Systematic onboarding guides ensure future Claude instances can effectively maintain and evolve both projects.
