'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, TrendingUp } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/opportunity', label: 'Opportunity' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/settings', label: 'Settings' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-dark/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded border border-brand-green/30 bg-brand-green/10 transition-all group-hover:bg-brand-green/20">
              <TrendingUp className="h-4 w-4 text-brand-green" />
            </div>
            <div className="leading-none">
              <span className="font-display text-sm font-700 text-white tracking-tight">FERGUSON</span>
              <span className="block font-mono text-[9px] text-brand-muted tracking-widest uppercase">Growth Capital</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-sans text-sm transition-colors',
                  pathname === link.href
                    ? 'text-brand-green'
                    : 'text-brand-muted hover:text-brand-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 font-sans text-xs font-medium text-brand-green transition-all hover:bg-brand-green/20 hover:border-brand-green/60"
            >
              Investor Login
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-brand-text"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-brand-border bg-brand-dark/95 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={clsx(
                'block py-2 font-sans text-sm transition-colors',
                pathname === link.href
                  ? 'text-brand-green'
                  : 'text-brand-muted hover:text-brand-text'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block rounded border border-brand-green/40 bg-brand-green/10 px-4 py-1.5 font-sans text-xs font-medium text-brand-green"
          >
            Investor Login
          </Link>
        </div>
      )}
    </header>
  )
}
