import Link from 'next/link'
import { TrendingUp, Mail, Phone, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-card/40 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-brand-green/30 bg-brand-green/10">
                <TrendingUp className="h-4 w-4 text-brand-green" />
              </div>
              <div className="leading-none">
                <span className="font-display text-sm font-700 text-white tracking-tight">FERGUSON</span>
                <span className="block font-mono text-[9px] text-brand-muted tracking-widest uppercase">Growth Capital</span>
              </div>
            </div>
            <p className="font-sans text-sm text-brand-muted leading-relaxed max-w-xs">
              Private equity investment fund backing high-growth Nigerian SMEs.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-brand-text mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 font-sans text-sm text-brand-muted">
                <Mail className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                info@fergusongrowthcapital.com
              </li>
              <li className="flex items-center gap-2 font-sans text-sm text-brand-muted">
                <Phone className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                +234 XXX XXX XXXX
              </li>
              <li className="flex items-center gap-2 font-sans text-sm text-brand-muted">
                <Globe className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                www.fergusongrowthcapital.com
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-brand-text mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/opportunity', label: 'Investment Opportunity' },
                { href: '/dashboard', label: 'Investor Dashboard' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-sans text-sm text-brand-muted hover:text-brand-green transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-brand-muted">
            © 2026 Ferguson Growth Capital.
          </p>
          <p className="font-sans text-[11px] text-brand-muted text-center sm:text-right max-w-md">
            Investing in private companies carries risks. Returns are not guaranteed.
          </p>
        </div>
      </div>
    </footer>
  )
}
