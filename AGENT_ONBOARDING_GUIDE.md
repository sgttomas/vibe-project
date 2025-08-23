# Claude Onboarding Guide

**For future Claude instances working on Backend Framework projects**

**Code at its best is filigree: elegance revealed through structure and repetition. 
What looks complex is pattern born of clarity, shaped by architecture, and refined through iteration.**

## Quick Start

You're working with a dual-project system inside this repository. First, determine which project needs work:
- **app**: TypeScript/Next.js document generation app with Neo4j (`projects/vibe-project/app`)
- **framework**: Python CF14 semantic operations (`projects/vibe-project/framework`)

Then use the appropriate setup guide:
- **For app work**: Read `orchestration/AGENT_APP_SETUP_GUIDE.md`
- **For framework work**: Read `orchestration/AGENT_FRAMEWORK_SETUP_GUIDE.md`
- **New agent instances**: Continue reading this guide

## The System Overview

**Three Areas, One Environment:**
```
/Users/ryan/ai-env/projects/vibe-project/
├── app/                 (TypeScript/Next.js app)
│   └── lib/framework/   (Framework docs mirror)
├── framework/           (Python CF14 framework)
│   └── lib/app/         (App docs mirror)
└── orchestration/       (Scripts, desktop tooling, setup guides)
```

**Key Guides:**
- `AGENT_ONBOARDING_GUIDE.md` (this file) — Start here
- `orchestration/AGENT_APP_SETUP_GUIDE.md` — App documentation/workflow setup
- `orchestration/AGENT_FRAMEWORK_SETUP_GUIDE.md` — Framework documentation/workflow setup
- `AGENT_PERFORMANCE_OPTIMIZATION_GUIDE.md` — Performance work overview

## Step 1: Determine Your Task

Check which project you're working on (relative to repo root `projects/vibe-project`):
```bash
pwd  # Should end with .../projects/vibe-project/(app|framework|orchestration)
```

- In `app/`: App documentation and related code
- In `framework/`: Framework documentation and CF14 code
- In `orchestration/`: Setup guides and tooling

## Step 2: Read the Knowledge Transfer Pipeline

### For App Work
Read these in `/ai-app/lib/framework/`:
1. **KNOWLEDGE_TRANSFER_MANIFEST.md** - The canonical list (29 files)
2. **AGENT.md** - Your role for this mirror
3. **README.md** through **VERSION.md** - All framework docs
4. Review the Python examples and config files

### For Framework Work  
Read these in `/framework/lib/ai-app/`:
1. **KNOWLEDGE_TRANSFER_MANIFEST.md** - The canonical list (27 files)
2. **AGENT.md** - Your role for this mirror
3. **README.md** through **VERSION.md** - All app docs
4. Review the TypeScript configs and package files

### For Performance Work
See `AGENT_PERFORMANCE_OPTIMIZATION_GUIDE.md` in the project root for current guidance.

## Step 3: Read Project-Specific Documentation

### In the App Project Root
Key files to understand:
- **CONTINUOUS_IMPROVEMENT_PLAN.md** - The ongoing process
- **KEY_PROJECT_FILES.md** - Documentation status tracking
- **CONSOLIDATED_IMPROVEMENT_PLAN.md** - May exist from previous cycle

### In the Framework Project Root
Key files to check/create:
- **CONTINUOUS_IMPROVEMENT_PLAN.md** - Create if missing
- **KEY_PROJECT_FILES.md** - Create if missing
- **AGENT.md** - Update existing one

## Step 4: Understand the Improvement Cycle

The documentation system cycles between two states:

1. **CONTINUOUS_IMPROVEMENT_PLAN.md** - Ongoing process framework (always exists)
2. **CONSOLIDATED_IMPROVEMENT_PLAN.md** - Specific implementation plan (created when triggered)

The cycle:
- Git commit or trigger → Generate CONSOLIDATED plan from CONTINUOUS
- Execute improvements → Update KEY_PROJECT_FILES.md
- Complete cycle → Rename CONSOLIDATED back to CONTINUOUS
- Capture lessons learned → Update this guide if needed

## Step 5: Check Both Projects

Even if working on one project, check the other:
- Version coordination (PyPI vs npm)
- Integration documentation alignment
- Mirror directories staying in sync
- KNOWLEDGE_TRANSFER_MANIFEST.md accuracy

## Quality Standards

**Do:**
- Follow existing patterns
- Update status tracking continuously
- Test code examples
- Keep mirrors synchronized
- Coordinate versions between projects

**Don't:**
- Break established patterns
- Skip status updates
- Create docs without need
- Ignore the other project
- Over-engineer simple updates

## Common Tasks Reference

### Setting Up Framework Documentation System
→ Read AGENT_FRAMEWORK_SETUP_GUIDE.md

### Maintaining App Documentation
→ Read AGENT_APP_SETUP_GUIDE.md

### Creating New Release
1. Update VERSION.md
2. Create RELEASE_NOTES_v*.md
3. Update CHANGELOG.md
4. Coordinate PyPI/npm releases

### Updating Mirrors
1. Check KNOWLEDGE_TRANSFER_MANIFEST.md in both mirrors
2. Sync changed files
3. Update AGENT.md if needed
4. Test integration points

## File Location Quick Reference

```
/Users/ryan/ai-env/projects/vibe-project/
├── AGENT_ONBOARDING_GUIDE.md (this file)
├── AGENT_PERFORMANCE_OPTIMIZATION_GUIDE.md
├── orchestration/
│   ├── AGENT_APP_SETUP_GUIDE.md
│   └── AGENT_FRAMEWORK_SETUP_GUIDE.md
├── app/
│   ├── CONTINUOUS_IMPROVEMENT_PLAN.md
│   ├── KEY_PROJECT_FILES.md
│   └── lib/framework/
│       ├── KNOWLEDGE_TRANSFER_MANIFEST.md
│       └── AGENT.md
└── framework/
    ├── CONTINUOUS_IMPROVEMENT_PLAN.md
    ├── KEY_PROJECT_FILES.md
    └── lib/app/
        ├── KNOWLEDGE_TRANSFER_MANIFEST.md
        └── AGENT.md
```

## Next Steps

1. Identify which project needs work
2. Read the appropriate setup guide
3. Follow the knowledge transfer pipeline
4. Execute the improvement methodology
5. Update status tracking
6. Consider mirror synchronization

---

*This guide helps future Claude instances navigate the complete Documentation system.*
