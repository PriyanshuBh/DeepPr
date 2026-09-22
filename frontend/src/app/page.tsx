import React from 'react';
import { Activity, Shield, Zap, GitBranch, Database, BrainCircuit, Github, Key, Terminal } from 'lucide-react';
import Link from 'next/link';
import { DeepPRLogo } from '@/components/logo';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-8 pt-40 pb-32 text-center space-y-8 flex flex-col items-center">
        <h1 className="text-6xl md:text-[80px] font-bold leading-[1.05] tracking-tight fade-in-section">
          The AI code reviewer that learns.
        </h1>
        <p className="text-textMuted text-xl md:text-2xl max-w-2xl font-light leading-relaxed fade-in-section delay-100">
          DeepPR hooks into your GitHub repos, analyzes massive diffs using Vector RAG, and enforces your specific team rules using persistent memory.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 w-full justify-center fade-in-section delay-200">
          <Link href="/dashboard" className="pill-primary text-lg px-8 py-4 shine-effect">
            Start Reviewing for Free
          </Link>
          <a href="#features" className="pill-outline text-lg px-8 py-4">
            Explore Intelligence Stack
          </a>
        </div>
      </section>

      {/* Marquee / Mock App Section */}
      <section className="max-w-5xl mx-auto px-8 pb-32 fade-in-section delay-300">
        <div className="w-full bg-canvasSoft rounded-md p-8 border-beam shadow-2xl">
          <div className="flex gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-hairline"></div>
            <div className="w-3 h-3 rounded-full bg-hairline"></div>
            <div className="w-3 h-3 rounded-full bg-hairline"></div>
          </div>
          <div className="font-mono text-sm md:text-base text-textMuted space-y-4 leading-relaxed">
            <p><span className="text-ink font-semibold">deeppr</span> analyze PR #42</p>
            <p>&gt; Fetching massive diff... (42 files changed, 18,400 lines)</p>
            <p>&gt; Chunking & Embedding into Pinecone Vector DB...</p>
            <p>&gt; Querying mem0 for repo context... <span className="text-accent">(Found 3 past rules)</span></p>
            <p className="text-ink">✓ Security scan complete. Score: 92/100</p>
            <p className="text-ink">⚠ 2 performance bottlenecks found in src/db.ts</p>
            <p>&gt; Generating patch & posting inline comments to GitHub...</p>
          </div>
        </div>
      </section>

      {/* Deep Dive Feature Detail Section */}
      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-hairline">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Serverless scaling.<br/>Zero idle costs.</h2>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              Traditional AI bots require expensive 24/7 servers. DeepPR runs entirely on AWS Lambda. It wakes up when a PR is opened, reviews the code in milliseconds, and goes back to sleep. You pay exactly .00 for idle time.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-ink font-semibold">
                <div className="w-2 h-2 bg-accent rounded-full"></div> Fully stateless AWS SAM Architecture
              </li>
              <li className="flex items-center gap-4 text-ink font-semibold">
                <div className="w-2 h-2 bg-accent rounded-full"></div> Background Task processing beats GitHub timeouts
              </li>
            </ul>
          </div>
          <div className="card-soft border border-hairline h-full flex items-center justify-center min-h-[300px] overflow-hidden p-0 relative aspect-square md:aspect-auto">
            <img src="/serverless.png" alt="Serverless Architecture" className="w-full h-full object-cover rounded-md absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Secondary Feature Detail */}
      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-hairline">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="card-soft border border-hairline h-full flex items-center justify-center min-h-[300px] order-2 md:order-1 overflow-hidden p-0 relative aspect-square md:aspect-auto">
            <img src="/byok.png" alt="One-Click Install" className="w-full h-full object-cover rounded-md absolute inset-0" />
          </div>
          <div className="space-y-8 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">One-Click GitHub App.</h2>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              Install DeepPR directly onto your repositories in seconds. Configure custom instructions for your team, and let the AI automatically enforce your coding standards on every single Pull Request.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-ink font-semibold">
                <div className="w-2 h-2 bg-accent rounded-full"></div> No API keys or configuration files required
              </li>
              <li className="flex items-center gap-4 text-ink font-semibold">
                <div className="w-2 h-2 bg-accent rounded-full"></div> Works instantly across unlimited repositories
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works (Step by Step) */}
      <section className="bg-canvasSoft border-t border-b border-hairline py-32 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center">How DeepPR Works.</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 group cursor-pointer">
              <div className="text-6xl font-bold text-hairline group-hover:text-ink transition-colors duration-500">01</div>
              <h3 className="text-2xl font-bold">Webhook</h3>
              <p className="text-textMuted font-light leading-relaxed">
                When a developer opens a Pull Request, GitHub fires a webhook instantly to the DeepPR AWS API Gateway.
              </p>
            </div>
            <div className="space-y-4 group cursor-pointer">
              <div className="text-6xl font-bold text-hairline group-hover:text-ink transition-colors duration-500">02</div>
              <h3 className="text-2xl font-bold">RAG Retrieval</h3>
              <p className="text-textMuted font-light leading-relaxed">
                If the diff is massive, it is chunked and embedded. Pinecone semantic search retrieves only the critical code blocks.
              </p>
            </div>
            <div className="space-y-4 group cursor-pointer">
              <div className="text-6xl font-bold text-hairline group-hover:text-ink transition-colors duration-500">03</div>
              <h3 className="text-2xl font-bold">Memory Check</h3>
              <p className="text-textMuted font-light leading-relaxed">
                DeepPR queries mem0 to recall your team's specific coding guidelines, framework choices, and past bugs.
              </p>
            </div>
            <div className="space-y-4 group cursor-pointer">
              <div className="text-6xl font-bold text-accent group-hover:text-blue-400 transition-colors duration-500">04</div>
              <h3 className="text-2xl font-bold">Inline Review</h3>
              <p className="text-ink font-light leading-relaxed">
                The LangChain agent executes the review and posts precise inline comments back to the GitHub PR thread.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-32">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Next-Generation Intelligence.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-soft space-y-6 hover:-translate-y-2 hover:border-ink/50 transition-all duration-500 cursor-default">
            <div className="bg-canvas w-12 h-12 rounded-sm flex items-center justify-center border border-hairline">
              <Database className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-bold text-2xl">Vector DB RAG</h3>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              Massive 20k+ line PRs? No problem. DeepPR chunks the diff and uses semantic search to only review relevant context.
            </p>
          </div>
          <div className="card-soft space-y-6 hover:-translate-y-2 hover:border-ink/50 transition-all duration-500 cursor-default">
            <div className="bg-canvas w-12 h-12 rounded-sm flex items-center justify-center border border-hairline">
              <BrainCircuit className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-bold text-2xl">Persistent Memory</h3>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              DeepPR cures LLM amnesia. It remembers past mistakes and automatically learns your team's coding conventions.
            </p>
          </div>
          <div className="card-soft space-y-6 hover:-translate-y-2 hover:border-ink/50 transition-all duration-500 cursor-default">
            <div className="bg-canvas w-12 h-12 rounded-sm flex items-center justify-center border border-hairline">
              <GitBranch className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-bold text-2xl">Multi-Agent Debate</h3>
            <p className="text-textMuted text-lg font-light leading-relaxed">
              A Mixture of Experts. Specialized agents debate the code before finalizing the review.
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full bg-ink text-canvas rounded-t-md py-16 px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <DeepPRLogo className="w-10 h-10" />
            <h2 className="text-4xl font-bold">DeepPR.</h2>
          </div>
          <p className="text-canvas/50">© 2026 DeepPR. Built by Priyanshu Bharti.</p>
        </div>
      </footer>
    </main>
  );
}
