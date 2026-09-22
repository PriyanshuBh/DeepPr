import React from 'react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <main className="min-h-screen max-w-6xl mx-auto px-8 pt-40 pb-32">
      <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">Simple pricing.</h1>
        <p className="text-textMuted text-xl font-light">Install the GitHub App and pay exactly .00 to us. DeepPR is completely free and open-source for the Hackathon.</p>
      </div>

      <div className="max-w-md mx-auto card-soft relative border-beam shadow-2xl cursor-default">
        <div className="flex justify-between items-center mb-2 gap-4 relative z-10">
          <h3 className="text-2xl font-bold truncate">Hacker Tier</h3>
          <div className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shrink-0">
            Popular
          </div>
        </div>
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-6xl font-bold"></span>
          <span className="text-textMuted">/ forever</span>
        </div>
        <ul className="space-y-4 mb-12 text-inkSoft font-light">
          <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-ink"></div> One-Click GitHub App Installation</li>
          <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-ink"></div> Unlimited Repositories</li>
          <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-ink"></div> Vector DB RAG Enabled</li>
          <li className="flex items-center gap-4"><div className="w-1.5 h-1.5 rounded-full bg-ink"></div> mem0 Persistent Memory</li>
        </ul>
        <Link href="/dashboard" className="block text-center w-full pill-primary shine-effect">
          Get Started
        </Link>
      </div>
    </main>
  );
}
