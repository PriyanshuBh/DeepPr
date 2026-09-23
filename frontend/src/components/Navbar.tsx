import React from 'react';
import Link from 'next/link';
import { DeepPRLogo } from './logo';

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-canvas/80 backdrop-blur-md border border-hairline shadow-2xl rounded-full px-6 h-16 flex items-center justify-between gap-12 transition-all hover:border-textMuted/30">
        <Link href="/" className="flex items-center gap-2">
          <DeepPRLogo className="w-7 h-7" />
          <span className="font-bold text-lg tracking-tight">DeepPR.</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm font-semibold text-textMuted hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="pill-primary text-sm py-2 px-5">
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
