'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-cream-50/90 backdrop-blur-md border-b border-cream-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center text-cream-100 text-sm font-display font-bold group-hover:bg-forest-600 transition-colors">
            E
          </div>
          <span className="font-display font-semibold text-forest-800 text-lg tracking-tight">
            ecoyaan
          </span>
        </Link>

        <div className="flex items-center gap-1 text-xs text-forest-500 font-body">
          <svg className="w-3.5 h-3.5 text-forest-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure Checkout</span>
        </div>
      </div>
    </header>
  )
}
