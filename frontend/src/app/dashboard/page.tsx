import React from 'react';
import { ArrowRight, Github, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 pt-40 md:p-12 md:pt-40 max-w-5xl mx-auto space-y-12">
      <header className="border-b border-hairline pb-8">
        <h1 className="text-4xl md:text-5xl font-bold">Getting Started.</h1>
        <p className="text-textMuted font-light mt-4 text-lg">Install DeepPR in seconds and let AI handle your code reviews.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Installation Card */}
        <div className="card space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">1. Install the App</h2>
            <p className="text-textMuted font-light">
              Click below to install the DeepPR GitHub App on your personal account or organization.
            </p>
          </div>
          
          <div className="p-6 bg-canvasSoft rounded-md border border-hairline space-y-4">
            <h3 className="font-bold flex items-center gap-2"><Github className="w-5 h-5"/> DeepPR AI Reviewer</h3>
            <p className="text-sm text-textMuted">Requires Read/Write access to Pull Requests.</p>
            <Link 
              href="https://github.com/apps/deeppr-ai-reviewer/installations/new" 
              target="_blank"
              className="w-full pill-primary shine-effect flex items-center justify-center gap-2 mt-4 hover:-translate-y-1 transition-transform"
            >
              Install on GitHub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="space-y-8">
          <div className="card-soft space-y-6">
            <h2 className="text-2xl font-bold">2. How it works</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Zero Configuration</h4>
                  <p className="text-sm text-textMuted font-light mt-1">Once installed, DeepPR runs entirely in the background. No API keys or webhooks required.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Open a Pull Request</h4>
                  <p className="text-sm text-textMuted font-light mt-1">Whenever a developer opens a PR, DeepPR will instantly fetch the diff, embed it into Pinecone, and analyze it.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Get Instant Feedback</h4>
                  <p className="text-sm text-textMuted font-light mt-1">Within seconds, the bot will post a detailed summary and drop precise, inline comments on bugs directly on the code.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
