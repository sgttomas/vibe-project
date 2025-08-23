# AI Orchestrator: Meta-Learning Framework Monorepo

## 🧠 The Backend Framework

This monorepo implements the **Backend Framework** - a meta-ontological methodology for generating reliable knowledge about generating reliable knowledge. The framework operates through systematic **12-station semantic valley progression** and has been validated through self-referential implementation.

**Session 3 Validation**: Systematic AI-human collaboration methodology proven through competitive performance achievements and elegant solution principles.

### Core Framework Principles

**Meta-Learning Methodology**
The Backend Framework progresses through a 12-station semantic valley:
Problem Statement → Requirements → Objectives → Output → Verification → Validation → Evaluation → Assessment → Implementation → Instantiation → Reflection → Resolution

**Self-Referential Validation** (Session 3 Enhanced)
This implementation proves the framework's effectiveness by applying it to the meta-problem of "generating reliable knowledge" - successfully using the methodology to validate the methodology itself. Session 3 demonstrates systematic AI-human collaboration achieving competitive performance through elegant ~20-line solutions.

**LLM as Semantic Interpolation Engine** (Session 3 Validated)
Large Language Models serve exclusively as **semantic interpolation engines** that resolve abstract word pairings into coherent concepts through semantic multiplication (`*`), while the framework maintains strict separation between constructive operations (human-designed) and generative operations (LLM-resolved). Session 3 validates this approach through breakthrough performance results.

## 🏗️ Production Application Orchestrator

This repository serves as the **production application orchestrator** for the Backend Framework ecosystem. It demonstrates how all framework components integrate to create a complete meta-learning system.

### Component Architecture

**🔄 Complete Framework Ecosystem:**
- Backend Framework: Core semantic engine + backend services
- Chat Interface: Modern chat interfaces (2 variants)
- **This Repository**: Production orchestration + desktop packaging

### How Components Work Together

1. **Backend Services** (from Backend Framework)
   - GraphQL service provides semantic matrix operations
   - Admin service orchestrates CLI tools and processes
   - Neo4j database persists semantic valley progression

2. **Frontend Applications** (from Chat Interface)
   - Chat interfaces provide conversational access to framework
   - LLMs perform semantic interpolation within framework constraints
   - Real-time document generation and RAG integration

3. **Production Orchestration** (this repository)
   - Docker Compose configuration for unified deployment
   - Electron desktop wrapper for one-click experience
   - Development environment for integrated testing

## 🚀 Quick Production Setup (Session 3 Validated)

Desktop quickstart (preferred)
```bash
cd orchestration/desktop
npm install
# Provide roots (first run opens Settings if missing)
env ORCHESTRATOR_ROOT="$(pwd)/.." FRONTEND_APP_ROOT="$(pwd)/../../app" npm start
```

### Single-Command Deployment
```bash
# Start complete production stack
docker compose up -d

# Access applications:
# - Chat Interface: http://localhost:3000
# - GraphQL API: http://localhost:8080/graphql
# - Admin Dashboard: http://localhost:3001
# - Neo4j Browser: http://localhost:7474
```

**Session 3 Excellence**: This deployment stack has been validated through systematic AI-human collaboration achieving competitive performance results.

Compose profiles
- Some services (graphql/admin) are disabled by default and require images or build contexts. Enable with:
```bash
docker compose --profile full up -d
```
Adjust orchestration/compose/docker-compose.yml to point to your images/contexts.

### Desktop Application (One-Click Experience)
```bash
cd desktop
npm install
npm run build    # Creates platform-specific installers
npm run dev      # Development mode with auto-orchestration
```

Settings window (no nodeIntegration)
- Open via menu: Settings → Open Settings…
- Configure Project Root (orchestration) and Frontend Root (app)
- Validation: Test Backend, Test Frontend, Test Frontend UI, Test GraphQL, Test Admin, Validate Compose, Run Health Check

## 🛠️ Complete Developer Setup Guide

This guide gets you from zero to a working AI Orchestrator dev environment on macOS, following the simple → complex plan:

**Step 1**: GraphQL backend service  
**Step 2**: Dual frontend setup (Frontend App + Backend Framework)  
**Step 3**: Electron desktop wrapper for unified experience

---

## 0) Prerequisites (macOS)

Install dependencies:

```bash
# Docker Desktop (required for Neo4j)
# Install from https://www.docker.com/products/docker-desktop/
# After install, open Docker Desktop at least once so the daemon is running

# Node.js 20.x (recommended; LTS until April 2026)
# Install nvm (Node Version Manager) officially
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
# Close and reopen your terminal, or run: source ~/.zshrc
nvm install 20
nvm use 20
nvm alias default 20

# Optional but useful
brew install jq wget curl
```

Verify installation:
```bash
nvm --version  # Should show 0.40.0 or similar
node --version # Should show v20.x.x
docker --version # Should show Docker version
```

---

## 1) Project Structure

**Multi-Repository Structure** - AI Orchestrator is split across specialized repositories:

```
ai-env/                                    # Your workspace
├── app/                         # Document generation UI (port 3000)
│   ├── src/app/chirality-core/           # Core document workflow
│   ├── src/components/                   # UI components
│   └── package.json
├── framework/          # Backend framework (port 3002)
│   ├── graphql-service/                  # GraphQL API (port 8080)
│   ├── src/app/                         # Chat & matrix interfaces
│   └── package.json
└── orchestration/                        # Desktop wrapper (this repo)
    ├── desktop/                          # Electron app
    ├── scripts/                          # Setup scripts
    └── README.md                         # Complete setup guide (this file)
```

---

## 2) Clone Related Repositories

```bash
# Create workspace (if not already done)
mkdir -p ~/orchestrator-workspace && cd ~/orchestrator-workspace

# Clone the related repositories alongside this one
git clone https://github.com/sgttomas/Chat Interface.git app
git clone <backend-framework-repo-url> framework
# orchestrator repository is this current repo
```

---

## 3) Environment Configuration

Each service has its own `.env` configuration:

### **app/.env.local**
```env
# OpenAI API Key (required)
OPENAI_API_KEY=sk-proj-your-api-key
OPENAI_MODEL=gpt-4.1-nano
DEFAULT_TEMPERATURE=0.6

# Backend connections
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/graphql
NEXT_PUBLIC_ORCHESTRATOR_URL=http://localhost:3001

# Neo4j (optional, for legacy features)
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password
```

### **framework/.env.local**
```env
# Neo4j Configuration
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password

# OpenAI API
OPENAI_API_KEY=sk-proj-your-api-key
OPENAI_MODEL=gpt-4.1-nano

# GraphQL Service
NEXT_PUBLIC_GRAPH_API=http://localhost:8080/graphql
NEXT_PUBLIC_USE_GRAPHQL=true
```

### **framework/graphql-service/.env**
```env
# Neo4j Connection
NEO4J_URI=neo4j+s://your-instance.databases.neo4j.io
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
NEO4J_DATABASE=neo4j

# Service Configuration
PORT=8080
NODE_ENV=development
```

---

## 4) Step 1 — Start GraphQL Backend

```bash
cd ../framework/graphql-service
npm install
npm run dev
```

Verify GraphQL service:
- **GraphQL Playground**: http://localhost:8080/graphql
- **Health check**: `curl http://localhost:8080/health`

---

## 5) Step 2 — Start Frontend Services

### **Terminal 1: Backend Framework (port 3002)**
```bash
cd ../framework
npm install
PORT=3002 npm run dev
```

### **Terminal 2: Frontend App (port 3000)**
```bash
cd ../app
npm install
# Note: May need to remove predev linting if errors occur
npm run dev
```

**Service URLs:**
- **Frontend App**: http://localhost:3000 (main chat interface)
- **App Core**: http://localhost:3000/chirality-core ⭐ (document generation)
- **Backend Framework**: http://localhost:3002 (backend operations)

---

## 6) Step 3 — Electron Desktop App

```bash
cd desktop
npm install

# Development mode
npm run compile
npm start
```

The Electron app will:
- Detect existing services on ports 3000, 3002, 8080
- Display http://localhost:3000/chirality-core in native window
- Show service status in real-time

---

## 7) Complete URL Reference

### **Frontend App (Port 3000)**
- http://localhost:3000 - Main chat interface
- **http://localhost:3000/chirality-core** - Core document generation ⭐
- http://localhost:3000/chat-admin - Admin dashboard
- http://localhost:3000/dashboard - Application dashboard
- http://localhost:3000/matrix - Matrix visualization
- http://localhost:3000/mcp - Model Context Protocol interface

### **Backend Framework (Port 3002)**
- http://localhost:3002 - Main framework interface  
- http://localhost:3002/chat - Chat interface
- http://localhost:3002/matrices - Matrix operations
- http://localhost:3002/instantiate - Domain instantiation

### **Backend Services**
- http://localhost:8080/graphql - GraphQL Playground
- http://localhost:8080/health - Service health

### **Desktop App**
- **Electron Window**: Displays chirality-core interface natively
- **Service Status**: Real-time monitoring of all services

---

## 8) Health Checks

Verify all services are running:

```bash
# GraphQL Backend
curl -s http://localhost:8080/health | jq

# Frontend App
curl -s http://localhost:3000/api/healthz | jq

# Backend Framework  
curl -s http://localhost:3002/api/healthz | jq

# Port status
lsof -i :3000 -i :3002 -i :8080
```

Expected output:
```
✅ GraphQL: {"status":"healthy","neo4j":"connected"}
✅ Frontend App: {"ok":true,"service":"next-js-frontend"}  
✅ Framework: {"ok":true,"service":"next-js-frontend"}
✅ Ports: All three ports should show node processes
```

---

## 9) Daily Workflow

### **Quick Start (4 terminals)**
```bash
# Terminal 1: GraphQL
cd ../framework/graphql-service && npm run dev

# Terminal 2: Backend Framework  
cd ../framework && PORT=3002 npm run dev

# Terminal 3: Frontend App
cd ../app && npm run dev

# Terminal 4: Desktop (optional)
cd desktop && npm start
```

### **One-Command Start (helper script)**
Use the provided startup script:
```bash
chmod +x scripts/start-all.sh
./scripts/start-all.sh
```

---

## 10) What Runs Where

### **✅ Local Development Services**
- **GraphQL**: Standalone service (port 8080)
- **Frontend App**: Next.js with document generation (port 3000)
- **Framework**: Next.js with semantic operations (port 3002)
- **Electron**: Native desktop wrapper

### **☁️ Cloud Services**
- **Neo4j**: Aura cloud database
- **OpenAI**: API for language models

### **❌ Not Currently Used**
- Docker Compose (services run natively for development)
- Admin UI on port 3001 (optional)
- Local Neo4j (using cloud instead)

---

## Architecture Overview

### Backend Services (Dockerized)

*Note: Backend services are sourced from the main Backend Framework repository*

**Neo4j Database**
- Graph database with APOC plugins
- Persistent volumes for data
- Web interface at :7474

**GraphQL Service** 
- Built with GraphQL Yoga + @neo4j/graphql
- Direct Neo4j integration from `framework/graphql/`
- Health checks and logging
- Runs on port 8080

**Admin/Orchestrator Service**
- Express.js API wrapping Python CLI tools
- Sourced from `framework/admin/`
- Orchestrates semantic matrix operations
- Health monitoring and job management
- Runs on port 3001

### Frontend (Separate Repository)

**Chat Interface Interface**
- Located in `app/` repository
- Next.js 15.2.3 with OpenAI Responses API
- Graph-free App Core with document generation
- RAG-enhanced chat with document injection
- Streaming responses with SSE
- Runs on port 3000 (development)

### Desktop Application (Optional)

**Electron Wrapper**
- Orchestrates Docker Compose backend
- Launches frontend automatically
- Provides unified double-click experience
- Cross-platform installers (macOS, Windows, Linux)

---

## Key Features

### 🤖 Document Generation
- **Set Problem**: Define problem statements with initial analysis vectors
- **Generate DS**: Data Template with structured field definitions
- **Generate SP**: Procedural Checklist with step-by-step workflows  
- **Generate X**: Solution Template with narrative solutions
- **Generate M**: Guidance documents with justifications
- **Clear All**: Reset all documents and problem state

### 💬 RAG-Enhanced Chat
- **Document Injection**: All generated documents automatically injected into chat system prompt
- **Citation Support**: References to generated documents with ID tracking
- **Streaming Responses**: Real-time response streaming with robust SSE implementation
- **Command Support**: Natural language commands for document generation

### 🔧 Admin & Developer Tools
- **Admin Dashboard** (`:3001`): Service orchestration and monitoring
- **GraphQL Playground** (`:8080/graphql`): Direct API access
- **Neo4j Browser** (`:7474`): Graph database exploration
- **Health Checks**: Comprehensive service monitoring

---

## Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Check what's using ports
lsof -i :3000 -i :3002 -i :8080

# Kill specific port
kill $(lsof -t -i:3000)
```

**Service won't start:**
```bash
# Check logs in each terminal
# GraphQL service logs show Neo4j connection
# Frontend logs show compilation errors

# Clean restart
rm -rf node_modules package-lock.json
npm install
```

**Electron app shows blank screen:**
```bash
# Verify services are running first
curl http://localhost:3000/chirality-core
curl http://localhost:8080/health

# Check Electron console logs
# In Electron window: View → Toggle Developer Tools
```

**ESLint errors preventing startup:**
```bash
# Temporarily disable predev checks
# Edit package.json, remove: "predev": "npm run lint && npm run type-check"
```

**Neo4j connection errors:**
```bash
# Verify cloud Neo4j credentials in .env files
# Check Neo4j Aura console for connection strings
```

### Debug Commands

```bash
# Service health overview
echo "GraphQL: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/health)"
echo "Frontend App: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api/healthz)"  
echo "Framework: $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3002/api/healthz)"

# Test GraphQL connection
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'

# Check environment variables
cd ../app && node -e "console.log(process.env.OPENAI_API_KEY?.slice(0,20) + '...')"

# Monitor service logs
# Each service runs in its own terminal, check terminal output for errors
```

---

## Development Notes

### Environment Variables
- Single source of truth: `orchestration/.env`
- Frontend reads from its own `.env.local` but should use same ports
- Docker services get env vars via docker-compose.yml

### Service Dependencies
- Neo4j must start first (healthcheck)
- GraphQL depends on Neo4j
- Admin depends on Neo4j + GraphQL
- Frontend is independent but connects to GraphQL

### File Structure
```
orchestrator/
├── .env.example              # Environment template
├── compose/
│   └── docker-compose.yml    # Backend services
├── scripts/
│   └── chirality             # Helper script
├── desktop/                  # Electron app
│   ├── src/main.ts          # Main Electron process
│   └── package.json         # Electron dependencies
└── README.md                # This file
```

---

## 📚 Framework Documentation

- Backend Framework: Core semantic engine and GraphQL service
- Chat Interface: Modern chat interface implementation
- **[app](https://github.com/sgttomas/ai-app)**: Production application interface

## 🤝 Contributing

This project implements a **reasoning compiler** that systematically generates reliable knowledge across arbitrary domains. Contributions should maintain the framework's meta-learning integrity and respect the boundary between constructive (human-designed) and generative (LLM-resolved) operations.

---

*This monorepo demonstrates the Backend Framework's ability to bridge human meta-cognition with AI semantic interpolation capabilities, contributing to the advancement of AI reasoning methodology and knowledge generation systems.*

🤖 **Ready to build with the Backend Framework!**
