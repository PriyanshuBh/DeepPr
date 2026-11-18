<br />
<div align="center">
  <a href="https://github.com/priyanshubh/DeepPR">
    <img src="assets/banner.png" alt="DeepPR Banner" width="100%">
  </a>

  <h3 align="center">DeepPR</h3>

  <p align="center">
    <strong>An Autonomous AI Code Reviewer with Vector RAG & Persistent Memory</strong>
    <br />
    <br />
    <a href="https://deeppr.d1i2c97iv74gio.amplifyapp.com/">Live Demo</a>
    ·
    <a href="https://github.com/apps/deeppr-ai-reviewer/installations/new">Install GitHub App</a>
    ·
    <a href="https://github.com/priyanshubh/DeepPR/issues">Report Bug</a>
    ·
    <a href="https://github.com/priyanshubh/DeepPR/issues">Request Feature</a>
  </p>
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.11" />
  <img src="https://img.shields.io/badge/AWS_Amplify-FF9900?style=for-the-badge&logo=aws-amplify&logoColor=white" alt="AWS Amplify" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render" />
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Pinecone-000000?style=for-the-badge&logo=pinecone&logoColor=white" alt="Pinecone" />
  <img src="https://img.shields.io/badge/mem0-FF4F00?style=for-the-badge&logo=brain&logoColor=white" alt="mem0" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
</div>

<br />

<details>
<summary>Table of Contents</summary>
<ol>
<li><a href="#-about-the-project">About The Project</a></li>
<li><a href="#-key-features">Key Features</a></li>
<li><a href="#-screenshots--demo">Screenshots & Demo</a></li>
<li><a href="#-how-it-works">How It Works</a></li>
<li><a href="#-tech-stack">Tech Stack</a></li>
<li><a href="#-project-structure">Project Structure</a></li>
<li><a href="#-getting-started">Getting Started</a></li>
<li><a href="#-deployment">Deployment</a></li>
<li><a href="#-future-roadmap">Future Roadmap</a></li>
<li><a href="#-follow-me">Follow Me</a></li>
</ol>
</details>

---

## 🤖 About The Project

**DeepPR** is an automated, context-aware AI GitHub Code Reviewer that integrates into any repository via a native GitHub App.

Traditional static code linters and standard AI review wrappers suffer from two fatal flaws:
1. **Context Blindness / Token Limits:** Massive pull requests with thousands of lines either crash LLM token windows or get blindly truncated.
2. **LLM Amnesia:** Reviewers forget team preferences, recurring architectural issues, and past feedback between pull requests.

DeepPR solves both:
- **Vector RAG (Pinecone):** Intelligently chunks and retrieves the most critical code paths across large pull requests.
- **Persistent Memory (mem0):** Retains repository-level memory across reviews so the AI enforces recurring team conventions and never makes the same suggestion twice.
- **Frictionless One-Click Install:** No user API keys or personal access tokens needed. Teams install the **DeepPR GitHub App** once, and pull requests are analyzed automatically in the background.

---

## 🔥 Key Features

- **⚡ Native GitHub App Integration**
  Uses dynamic RS256 JWT signatures (`PyJWT` & `cryptography`) to generate short-lived GitHub Installation Access Tokens on demand. No personal access tokens (PAT) or user configuration required.
- **⚡ Asynchronous Webhook Processing**
  FastAPI instantly returns a `200 OK` to GitHub upon event receipt to satisfy GitHub's 10-second webhook timeout, then processes the deep code review asynchronously via background tasks.
- **🧠 Persistent Cross-PR Memory (mem0 + Pinecone)**
  Learns from past reviews. DeepPR records resolved issues, team style rules, and repo-specific quirks into Pinecone Serverless vector storage. Subsequent PRs query this memory to enforce repository conventions.
- **🌌 Pinecone Vector RAG for Massive Diffs**
  Large changesets are automatically chunked with LangChain text splitters and embedded into Pinecone, allowing semantic similarity search to extract relevant logic without choking token boundaries.
- **🎯 High-Throughput AI Review Engine**
  Powered by **Google Gemini 3.1 Flash Lite** (with optional support for **AWS Bedrock Claude 3 Haiku**). Produces structured Pydantic outputs with zero-shot code analysis, actionable security vulnerability detection, and performance pitfall warnings.
- **💎 Line-by-Line Inline Comments & PR Summary**
  DeepPR posts an overall markdown summary comment on the Pull Request conversation tab, plus precise inline code comments targeting the exact lines and files that require attention.
- **🎨 Midnight Slate Dashboard (AWS Amplify)**
  A sleek, modern Next.js 14 App Router landing page and getting-started portal hosted on AWS Amplify. Includes a silent client-side health ping to pre-warm the backend when visitors land on the site.

---

## 📸 Screenshots & Demo

<div align="center">
  <p><strong>Autonomous Pull Request Review & Summary Comment</strong></p>
  <img src="assets/demo1.png" alt="DeepPR Pull Request Review Summary" width="95%" />
  <br /><br />
  <p><strong>Actionable Inline Code Comments with Suggested Fixes</strong></p>
  <img src="assets/demo2.png" alt="DeepPR Inline Code Comments" width="95%" />
</div>

---

## 🔄 How It Works

```mermaid
flowchart TD
    Developer["👨‍💻 Developer opens PR"] --> GitHub["🐙 GitHub PR Webhook"]
    GitHub --> FastAPIServer["⚡ FastAPI Webhook Endpoint (Render)"]
    FastAPIServer -->|Instant 200 OK| GitHub
    FastAPIServer --> BackgroundWorker["⚙️ Background Task Worker"]
    
    BackgroundWorker --> GitHubAuth["🔑 GitHub App Auth (JWT / RS256)"]
    GitHubAuth --> FetchDiff["📄 Fetch Raw PR Diff"]
    
    FetchDiff --> MemorySearch["🧠 mem0: Query Past Repo Learnings (Pinecone)"]
    FetchDiff --> RAGPipeline{"Diff > 200k chars?"}
    
    RAGPipeline -->|Yes| VectorRAG["🌌 Chunk & Embed Diff into Pinecone RAG"]
    RAGPipeline -->|No| DirectDiff["⚡ Direct Optimized Diff"]
    
    VectorRAG --> GeminiEngine["🤖 Gemini 3.1 Flash Lite + LangChain"]
    DirectDiff --> GeminiEngine
    MemorySearch --> GeminiEngine
    
    GeminiEngine --> StructuredOutput["📋 Structured Pydantic Review"]
    StructuredOutput --> PostSummary["📝 Post PR Summary Comment"]
    StructuredOutput --> PostInline["💬 Post Inline Code Comments"]
    StructuredOutput --> StoreMemory["💾 mem0: Save New Learnings to Pinecone"]
    
    PostSummary --> GitHubPR["✅ GitHub Pull Request UI"]
    PostInline --> GitHubPR
```

1. **Trigger:** A developer opens or updates a Pull Request.
2. **Handshake:** GitHub sends a webhook to the FastAPI backend. FastAPI immediately responds with `200 OK` to prevent webhook retry loops, then spins up an asynchronous background review task.
3. **Authentication:** The backend signs a JWT using the GitHub App's private key and fetches a temporary installation token.
4. **Context Gathering:** 
   - Fetches the PR diff from GitHub.
   - Searches `mem0` (Pinecone) for past rules and learned conventions specific to that repository (`owner/repo`).
   - If the diff exceeds safe boundaries, it triggers the Pinecone Vector RAG pipeline to chunk and retrieve critical diff sections.
5. **Review Generation:** The LangChain pipeline prompts Google Gemini with the code diff and repo memory, outputting a strictly typed Pydantic `PRReviewResult`.
6. **Delivery & Learning:** 
   - Posts a high-level summary review to the PR conversation.
   - Posts line-level inline comments with suggested fixes.
   - Stores new review findings into `mem0` so the AI remembers them for future PRs.

---

## ⚙️ Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (App Router)** | Modern React UI with Tailwind CSS, Lucide icons, and silent backend wake-up ping |
| **Frontend Hosting** | **AWS Amplify** | Scalable global CDN edge deployment with continuous deployment from GitHub |
| **Backend API** | **FastAPI (Python 3.11)** | High-performance asynchronous API for GitHub webhooks and review processing |
| **Backend Hosting** | **Render** | Cloud web service running Uvicorn with background task execution |
| **AI Model** | **Google Gemini 3.1 Flash Lite** | Blazing-fast diff analysis, generous rate limits, structured JSON/Pydantic output |
| **AI Orchestration** | **LangChain Core** | Prompt templates, model abstractions, and structured output chains |
| **Long-Term Memory** | **mem0ai** | Persistent cross-PR repository memory engine |
| **Vector Database** | **Pinecone (Serverless)** | Vector index (`deeppr`) storing repository memories and RAG diff embeddings |
| **Security & Auth** | **PyJWT & Cryptography** | RS256 JWT generation for GitHub App dynamic installation access tokens |

---

## 📂 Project Structure

```text
DeepPR/
├── frontend/                     # Next.js 14 Web Application (AWS Amplify)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout with Midnight Slate theme & WakeUpBackend
│   │   │   ├── page.tsx          # Landing page (Hero, intelligence stack demo)
│   │   │   ├── dashboard/        # 3-step Getting Started guide & App install link
│   │   │   └── pricing/          # Tier comparison & feature matrix
│   │   └── components/
│   │       ├── Navbar.tsx        # Floating pill navigation bar
│   │       ├── WakeUp.tsx        # Silent background fetch to warm the backend
│   │       └── logo.tsx          # Custom DeepPR vector logo
│   ├── tailwind.config.js        # Midnight Slate theme palette
│   └── package.json
│
├── backend/                      # Python FastAPI Backend (Render)
│   ├── app/
│   │   ├── main.py               # FastAPI entrypoint, CORS, router mounting
│   │   ├── core/
│   │   │   ├── github_auth.py    # GitHub App JWT & Installation Token generation
│   │   │   ├── github_client.py  # Diff fetching, summary & inline comment poster
│   │   │   └── diff_parser.py    # Diff truncation & formatting utilities
│   │   ├── engine/
│   │   │   ├── llm_factory.py    # Gemini 3.1 Flash Lite / Bedrock provider selector
│   │   │   ├── reviewer.py       # LangChain structured output review pipeline
│   │   │   ├── schemas.py        # Pydantic schema (PRReviewResult, InlineComment)
│   │   │   ├── memory.py         # mem0 + Pinecone repo memory retrieve & store
│   │   │   └── rag.py            # Recursive character diff splitting & Pinecone RAG
│   │   └── api/v1/
│   │       ├── health.py         # Healthcheck endpoint (used by WakeUp component)
│   │       └── webhooks.py       # GitHub webhook handler & background task queue
│   └── requirements.txt          # Python dependencies
│
├── SaaS_ARCHITECTURE_FLOW.md     # Detailed architecture & execution flow
├── FUTURE_ROADMAP.md             # Planned multi-agent & enterprise features
└── README.md
```

---

## 🧰 Getting Started

### Prerequisites

- **Python 3.11**
- **Node.js 18+**
- A **Pinecone** account & vector index (named `deeppr`, dimension `768` for Gemini embeddings)
- A **Google AI Studio** API Key (`GEMINI_API_KEY`)
- A **GitHub App** created in GitHub Developer Settings

---

### 1. GitHub App Setup

1. Go to **GitHub Settings > Developer Settings > GitHub Apps > New GitHub App**.
2. Set **Webhook URL** to your backend URL: `https://deeppr.onrender.com/api/v1/webhooks/github` (or an ngrok forwarding URL for local testing).
3. Set a **Webhook Secret** (any secure string).
4. Under **Permissions > Repository permissions**:
   - **Pull requests:** Read & Write
   - **Contents:** Read-only (required to fetch PR diffs)
   - **Metadata:** Read-only
5. Under **Subscribe to events**, check **Pull request**.
6. Generate and download a **Private Key** (`.pem` file). Note your **App ID**.

---

### 2. Backend Setup

```bash
# Clone the repository
git clone https://github.com/priyanshubh/DeepPR.git
cd DeepPR/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
# AI Model Configuration
DEFAULT_LLM_PROVIDER=gemini
GEMINI_API_KEY=your_google_gemini_api_key

# Pinecone Vector DB
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=deeppr
PINECONE_REGION=us-east-1

# GitHub App Credentials
GITHUB_APP_ID=your_github_app_id
GITHUB_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
WEBHOOK_SECRET=your_webhook_secret

# Optional Fallback PAT (used only if GitHub App credentials are not provided)
GITHUB_TOKEN=ghp_your_personal_access_token
```

Start the backend server:

```bash
uvicorn app.main:app --reload --port 8000
```

Verify the health check at: `http://localhost:8000/api/v1/health`

---

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🚀 Deployment

### Frontend on AWS Amplify
1. Open the **AWS Amplify Console** and click **Create new app > Host web app**.
2. Connect your GitHub repository (`DeepPR`) and choose your branch (e.g. `main` or `deeppr`).
3. Check the **Monorepo** option and specify the root directory as `frontend`.
4. Build configuration:
   ```yaml
   version: 1
   appRoot: frontend
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```
5. Deploy. AWS Amplify provides a live URL (e.g. `https://deeppr.d1i2c97iv74gio.amplifyapp.com/`).

### Backend on Render
1. In [Render.com](https://render.com), create a new **Web Service** from your GitHub repo.
2. Set **Root Directory** to `backend`.
3. Set **Runtime** to `Python 3`.
4. In **Environment Variables**, set:
   - `PYTHON_VERSION`: `3.11.9`
   - `GEMINI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_NAME`, `PINECONE_REGION`
   - `GITHUB_APP_ID`, `GITHUB_PRIVATE_KEY`, `WEBHOOK_SECRET`
5. Set **Build Command**: `pip install -r requirements.txt`
6. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
7. Copy the live Render backend URL (`https://deeppr.onrender.com/api/v1/webhooks/github`) into your GitHub App's Webhook URL setting.

---

## 🔮 Future Roadmap

DeepPR is designed as a foundational engine that will expand into a full multi-agent review ecosystem. See [FUTURE_ROADMAP.md](FUTURE_ROADMAP.md) for detailed planning:

- **🤖 Multi-Agent Specialist Teams:** Spawning specialized autonomous sub-agents (Security Auditor, Performance Benchmark Agent, Test Coverage Agent) coordinating via LangGraph.
- **🛠️ Automated Fix Pull Requests:** One-click PR patches where the agent commits corrective code directly to the branch.
- **📊 Team Analytics Dashboard:** Tracking code health metrics, recurring antipattern trends, and team review velocity over time.
- **🔐 Enterprise Custom Guidelines:** Upload custom linting configs, stylebooks, and architectural diagrams directly through the web UI.

---

## 🚀 Follow Me

<div align="center">
  <a href="https://github.com/priyanshubh">
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://linkedin.com/in/priyanshu-bharti">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://priyanshubh.vercel.app">
    <img src="https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
</div>

<br />
<p align="center">Built with ❤️ by <a href="https://github.com/priyanshubh">Priyanshu Bharti</a></p>
