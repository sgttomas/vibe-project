# AI Environment Directory Structure

**Session 3 Validated**: This environment structure supports systematic AI-human collaboration achieving competitive performance through elegant solution principles.

```
ai-env/
├── .grok/                          # Grok configuration
├── .venv/                          # Python virtual environment
│
├── Documentation Guides (root)     # CLAUDE ONBOARDING SYSTEM
├── AGENT_ONBOARDING_GUIDE.md       # Master entry point for agents
├── AGENT_APP_SETUP_GUIDE.md        # Guide for app documentation work
├── AGENT_FRAMEWORK_SETUP_GUIDE.md  # Guide for framework documentation setup
├── DIRECTORY_STRUCTURE.md          # This file - complete directory map
│
├── archive/                        # Archived projects and experiments
│   └── experimental/
│       └── chirality-ReasonFlux/   # ReasonFlux experimental implementations
│           ├── ReasonFlux_Coder/
│           ├── ReasonFlux_F1/
│           ├── ReasonFlux_PRM/
│           ├── ReasonFlux_v1/
│           └── ReasonFlux_v2/
│
├── bin/                            # Binary executables
│
├── orchestration/                  # Orchestration and desktop tooling
│   ├── compose/                    # Docker compose configurations
│   ├── desktop/                    # Desktop application (Electron)
│   └── scripts/                    # Utility scripts
│
├── app/                  # Frontend Application (TypeScript/Next.js)
│   ├── docs/                       # Frontend documentation
│   │   ├── adr/                    # Architecture Decision Records
│   │   │   └── frontend/           # Frontend-specific ADRs
│   │   └── components/             # Component documentation
│   │       ├── atoms/
│   │       └── organisms/
│   ├── lib/                        # Library code and KNOWLEDGE TRANSFER
│   │   ├── framework/  # FRAMEWORK DOCS MIRROR (29 files)
│   │   │   ├── KNOWLEDGE_TRANSFER_MANIFEST.md  # Canonical list
│   │   │   ├── CLAUDE.md           # AI collaboration for this mirror
│   │   │   ├── README.md through VERSION.md
│   │   │   ├── *.py files          # Python examples
│   │   │   └── *.json files        # Configuration and data
│   │   └── graph/                  # Graph integration
│   │       ├── integration.ts
│   │       ├── mirror.ts
│   │       └── selector.ts
│   ├── pages/                      # Next.js pages (API routes)
│   ├── public/                     # Public assets
│   ├── scripts/                    # Build and test scripts
│   ├── src/                        # Source code
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── api/                # API routes
│   │   │   │   ├── chat/
│   │   │   │   ├── core/
│   │   │   │   ├── healthz/
│   │   │   │   └── v1/graph/
│   │   │   ├── chat-admin/
│   │   │   ├── chirality-core/
│   │   │   └── chirality-graph/
│   │   ├── chirality-core/         # Core chirality functionality
│   │   ├── components/             # React components
│   │   │   ├── chat/
│   │   │   └── ui/
│   │   ├── hooks/                  # Custom React hooks
│   │   └── lib/                    # Library utilities
│   ├── store/                      # Application state store
│   │   └── state.json              # Persistent state
│   ├── Documentation Files (root)  # APP DOCUMENTATION SYSTEM
│   ├── CONTINUOUS_IMPROVEMENT_PLAN.md  # Ongoing improvement process
│   ├── CONSOLIDATED_IMPROVEMENT_PLAN.md # May exist from previous cycle
│   ├── KEY_PROJECT_FILES.md        # Documentation status tracking
│   ├── README.md, API.md, etc.     # All project documentation
│   └── package.json                # Node.js configuration
│
├── framework/   # Core Backend Framework (Python/CF14)
│   ├── chirality/                  # Core chirality modules
│   │   ├── adapters/               # Neo4j and other adapters
│   │   ├── core/                   # Core CF14 operations
│   │   ├── exporters/              # Export functionality
│   │   └── tests/                  # Test suite
│   │       └── fixtures/           # Test data (A.json, B.json)
│   ├── lib/                        # Library code and KNOWLEDGE TRANSFER
│   │   └── app/         # APP DOCS MIRROR (27 files)
│   │       ├── KNOWLEDGE_TRANSFER_MANIFEST.md  # Canonical list
│   │       ├── CLAUDE.md           # AI collaboration for this mirror
│   │       ├── README.md through VERSION.md
│   │       ├── package*.json       # Node.js configs
│   │       └── tsconfig.json       # TypeScript config
│   ├── admin/                      # Admin service (Express.js)
│   ├── graphql/                    # GraphQL service
│   ├── orchestration-service/      # Orchestration service
│   ├── ontology/                   # Ontology definitions
│   │   └── domains/                # Domain-specific ontologies
│   ├── scripts/                    # Utility scripts
│   ├── Documentation Files (root)  # FRAMEWORK DOCUMENTATION
│   ├── README.md                   # Framework overview
│   ├── API.md                      # Python SDK/CLI reference
│   ├── CLAUDE.md                   # AI collaboration guide
│   ├── setup.py                    # Python package configuration
│   └── requirements.txt            # Python dependencies
│
├── docs/                           # Project documentation
│   ├── export_data/                # Exported data
│   └── templates/                  # Document templates
│
├── include/                        # Python include files
│   └── python3.13/
│
├── lib/                            # Python libraries
│   └── python3.13/
│       └── site-packages/
│
├── Configuration Files (root)      # Various configurations and logs
├── API keys copy 2.txt
├── CF14_Implementation_Guide_Python_Nextjs_(alt).txt
├── CLEANUP_COMPLETED.md
├── CONSOLIDATION_COMPLETE.md
├── Backend Framework 9.3.1 Implementation (GPT o1-pro).pdf
├── DOCUMENTATION-CONSISTENCY-REPORT.md
├── ELECTRON_REFERENCES_UPDATED.md
├── MERGE_COMPLETED.md
├── MERGE_PLAN.md
├── Neo4j-ae7bea0f-Created-2025-08-12.txt
├── POST_CONSOLIDATION_DOCUMENTATION_PLAN.md
├── SPLIT_APPS_ARCHITECTURE.md
├── init-Chat Interface.sh
├── pyvenv.cfg
└── test.py

## Key Directories

### Documentation System
- **AGENT_*.md files (root)**: Master documentation guides for AI collaboration
- **app/lib/framework/**: Framework docs mirror (29 files)
- **framework/lib/app/**: App docs mirror (27 files)
- **KNOWLEDGE_TRANSFER_MANIFEST.md**: Canonical file lists in each mirror

### Frontend Applications
- **app/**: Main user-facing application (Next.js/TypeScript)
  - Two-pass document generation
  - RAG-enhanced chat interface
  - Neo4j graph integration
  - CF14 semantic matrix consumption

### Backend Framework
- **framework/**: Core CF14 implementation (Python)
  - Semantic matrix operations (A×B→C, C→J, etc.)
  - PyPI package distribution
  - CLI tools for semantic processing
  - Neo4j CF14 export functionality

### Mirror Structure for Knowledge Transfer
```
app/
└── lib/framework/  # How app devs learn framework
    └── 29 files including Python examples

framework/
└── lib/app/                 # How framework devs learn app
    └── 27 files including TypeScript configs
```

### Documentation Improvement Cycle
Both projects use the same cycle:
1. **CONTINUOUS_IMPROVEMENT_PLAN.md** - Ongoing process framework
2. **CONSOLIDATED_IMPROVEMENT_PLAN.md** - Specific implementation (when triggered)
3. **KEY_PROJECT_FILES.md** - Status tracking for all documentation

### Development Tools
- **orchestrator/desktop/**: Electron desktop application
- **archive/experimental/**: Experimental features and prototypes
- **.venv/**: Python 3.13 virtual environment
- **Docker**: Neo4j via docker-compose.neo4j.yml

### Python Components
- **chirality CLI**: `python -m chirality.cli`
- **Package**: `pip install <backend-framework-package>`
- **Version**: 14.3.1 (PyPI published)

### TypeScript/Node.js Components
- **Next.js 15.2.3**: App framework
- **React 18**: UI components
- **GraphQL**: API layer with Neo4j
- **Version**: 1.0.0 (GitHub release)

## Integration Points

### Shared Technologies
- **Neo4j**: Graph database for semantic matrices and document metadata
- **GraphQL**: API layer for graph queries
- **Docker**: Container infrastructure

### Data Flow
1. Python framework generates CF14 semantic matrices
2. Matrices exported to Neo4j with stable SHA1 IDs
3. TypeScript app queries via GraphQL
4. Document generation enhanced with semantic context
5. Results stored in files + graph mirror

---

*This structure represents the complete system with bidirectional knowledge transfer between Python Backend Framework and TypeScript application.*

**Session 3 Achievement**: This environment enabled breakthrough performance through systematic AI-human collaboration, achieving competitive results with elegant ~20-line solutions and clean baseline methodology.
