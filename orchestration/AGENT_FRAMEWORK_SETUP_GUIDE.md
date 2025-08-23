# Claude Framework Setup Guide

**For: Future Claude setting up documentation improvement cycle in framework**  
**Purpose: Replicate the continuous improvement system in the Python framework project**  
**Session 3 Validated**: Clean baseline approach enabling elegant solutions and competitive performance

## Context

You're about to set up the same iterative documentation improvement system that exists in the `app` for its sister project `framework`. These are the two halves of the system:
- **app**: TypeScript document generation with Neo4j (where you just updated CONTINUOUS_IMPROVEMENT_PLAN.md)
- **framework**: Python CF14 semantic operations (where you need to set this up)

## Step 1: Navigate to the Framework Project

```bash
cd /Users/ryan/ai-env/projects/vibe-project/framework/
```

## Step 2: Create the Core Documentation Files

You need to create or update these files based on the patterns in the app, but adapted for the Python framework:

### 1. CONTINUOUS_IMPROVEMENT_PLAN.md
Create this by adapting `../app/CONTINUOUS_IMPROVEMENT_PLAN.md`:
- Change "Frontend App" → "Backend Framework"
- Update document categories to match Python project structure
- Keep the same improvement methodology and git integration workflow
- Reference Python-specific files (setup.py, requirements.txt, etc.)
- Include references to PyPI publishing workflow

### 2. KEY_PROJECT_FILES.md
Create a tracking document for all framework documentation:
- List all .md files in the project
- Use same status categories (✅ CURRENT, 🆕 UPDATED, 🔄 NEEDS_UPDATE, etc.)
- Track Python-specific docs (API.md for Python SDK, setup instructions, etc.)

### 3. AGENT.md (Update Existing)
The framework already has a AGENT.md but update it to:
- Reference the continuous improvement cycle
- Point to the onboarding guide
- Explain the relationship with app documentation

### 4. AGENT_ONBOARDING_GUIDE.md
Ensure the project root onboarding guide (`../AGENT_ONBOARDING_GUIDE.md`) includes framework-specific instructions:
- Reading sequence for framework documentation
- How to work with Python/CF14 documentation
- Integration points with app docs

## Step 3: Key Differences to Account For

### Python Project Specifics (Session 3 Enhanced)
- **Package Distribution**: Documentation must align with PyPI releases
- **API Documentation**: Focus on Python SDK and CLI usage
- **Mathematical Concepts**: CF14 semantic operations need clear explanation
- **Test Coverage**: Document test matrices and fixtures
- **Session 3 Principles**: Support elegant ~20-line solutions and systematic validation
- **Performance Focus**: Documentation enabling competitive benchmark results

### Document Categories to Include
```
Primary User Documents:
- README.md (Python package focus)
- GETTING_STARTED.md (pip install, CLI usage)
- API.md (Python SDK reference)

Technical Documents:
- ARCHITECTURE.md (CF14 implementation)
- MATHEMATICAL_FOUNDATIONS.md (if keeping)
- SPECULATIVE_CLAIMS.md

Project Management:
- VERSION.md (PyPI versioning)
- CHANGELOG.md
- RELEASE_NOTES_*.md
```

## Step 4: Create the Integration Points

### Link to app
In the CONTINUOUS_IMPROVEMENT_PLAN.md, add a section:
```markdown
### Integration with app
- Companion project: `/Users/ryan/ai-env/projects/vibe-project/app/`
- Shared documentation patterns in `lib/framework/`
- Coordinate version releases between Python package and TypeScript app
```

### Shared Knowledge Transfer Pipeline

**IMPORTANT: The framework project has its own mirror directory!**

Just like the app has `app/lib/framework/`, the framework has:
`framework/lib/app/`

This directory contains the following 27 files:
1. API.md
2. ARCHITECTURE.md
3. CHANGELOG.md
4. AGENT - to be replaced with a new instance for this folder specificalliy as per instructions.md
5. COMMIT_HOOKS.md
6. CONTINUOUS_IMPROVEMENT_PLAN.md
7. CONTRIBUTING.md
8. CURRENT_STATUS.md
9. GRAPHQL_NEO4J_INTEGRATION_PLAN.md
10. HELP.md
11. INTEGRATION_ARCHITECTURE.md
12. KEY_DECISIONS.md
13. KEY_PROJECT_FILES.md
14. KNOWLEDGE_TRANSFER_MANIFEST.md (the canonical list - just created!)
15. LICENSE
16. MVP_IMPLEMENTATION_PLAN.md
17. NEO4J_SEMANTIC_INTEGRATION.md
18. ONBOARDING.md
19. PROJECT_DIRECTORY.md
20. README.md
21. RELEASE_NOTES_v1.0.0.md
22. TROUBLESHOOTING.md
23. VERSION.md
24. package-lock.json
25. package.json
26. requirements.txt
27. tsconfig.json

**Key Task**: The AGENT.md file in this directory needs to be replaced with a new version that explains:
- This is the app documentation mirror in the framework project
- How to use these docs to understand the TypeScript/app side
- The bidirectional knowledge transfer between projects

## Step 5: Implementation Sequence

1. **First, read existing framework documentation** to understand current state
2. **Create CONTINUOUS_IMPROVEMENT_PLAN.md** adapting the app version
3. **Create KEY_PROJECT_FILES.md** listing all current docs with status
4. **Update existing AGENT.md** to reference the new system
5. **Ensure framework-specific notes exist in AGENT_ONBOARDING_GUIDE.md**
6. **Test the cycle** by following your own onboarding guide

## Step 6: Special Considerations

### PyPI Publishing Integration
The improvement cycle should account for:
- Version bumps in setup.py and __init__.py
- PyPI release coordination
- Documentation updates for new package versions

### CLI Documentation
The framework has a CLI that needs:
- Command reference documentation
- Example usage patterns
- Integration with app workflows

### Mathematical Notation
Keep documentation accessible while maintaining technical accuracy:
- Explain CF14 operations in practical terms
- Provide concrete examples with test matrices
- Link to theoretical foundations as optional reading

## Step 7: Validation

After setup, verify:
- [ ] CONTINUOUS_IMPROVEMENT_PLAN.md exists and references correct Python files
- [ ] KEY_PROJECT_FILES.md lists all documentation with current status
- [ ] AGENT.md explains the improvement cycle
- [ ] Onboarding guide works when followed step-by-step
- [ ] Git integration workflow makes sense for Python project
- [ ] PyPI publishing is accounted for in the process

## Why This Matters (Session 3 Validated)

Setting up the same systematic improvement cycle in both projects ensures:
- Consistent documentation quality across the full system
- Knowledge transfer between Python and TypeScript components
- Systematic evolution of both halves of the architecture
- Clear onboarding for future contributors to either project
- **Session 3 Success Pattern**: Reproducible methodology for breakthrough performance
- **Clean Baseline Capability**: Prevention of P3-style artifact accumulation
- **AI Collaboration Excellence**: Systematic approach enabling competitive results

## Quick Reference for File Locations

```
/Users/ryan/ai-env/projects/vibe-project/
├── AGENT_ONBOARDING_GUIDE.md (project root)
├── app/
│   ├── CONTINUOUS_IMPROVEMENT_PLAN.md ✓
│   ├── KEY_PROJECT_FILES.md ✓
│   └── lib/framework/ (mirror of framework docs)
└── framework/
    ├── CONTINUOUS_IMPROVEMENT_PLAN.md (create/update)
    ├── KEY_PROJECT_FILES.md (create/update)
    ├── AGENT.md (update)
    └── lib/app/ (mirror of app docs)
```

---

*This guide helps establish documentation consistency across both parts of the system.*
