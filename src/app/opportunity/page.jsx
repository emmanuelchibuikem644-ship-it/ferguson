import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const tiers = [
  { amount: '₦200,000', label: 'Starter', minReturn: '₦240,000', maxReturn: '₦280,000', horizon: '3 months' },
  { amount: '₦500,000', label: 'Growth', minReturn: '₦600,000', maxReturn: '₦700,000', horizon: '3–4 months', featured: true },
  { amount: '₦1,000,000', label: 'Premium', minReturn: '₦1,200,000', maxReturn: '₦1,400,000', horizon: '4–6 months' },
]

const steps = [
  { n: '01', title: 'Register & Verify', desc: 'Create your investor profile and complete our simple KYC verification process.' },
  { n: '02', title: 'Choose Your Investment', desc: 'Select an investment tier and transfer funds to our designated account.' },
  { n: '03', title: 'We Deploy Capital', desc: 'Ferguson Growth Capital deploys your funds into carefully vetted SMEs.' },
  { n: '04', title: 'Receive Returns', desc: 'At the end of the investment cycle, receive your principal plus profit share.' },
]

export default function OpportunityPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="py-20 border-b border-brand-border text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-4">The Opportunity</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            20–40% Returns.<br />3–6 Month Cycles.
          </h1>
          <p className="font-sans text-base text-brand-muted max-w-lg mx-auto">
            Invest in Nigeria&apos;s fastest-growing SMEs with transparent reporting, active management, and performance-based returns.
          </p>
        </div>

        {/* Investment tiers */}
        <div className="py-16 border-b border-brand-border">
          <h2 className="font-display text-2xl font-bold text-white mb-10 text-center">Investment Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier) => (
              <div
                key={tier.label}
                className={`rounded-xl border p-6 relative ${tier.featured ? 'border-brand-green/50 bg-brand-green/5' : 'border-brand-border bg-brand-card'}`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-brand-green/40 bg-brand-green/20 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-green">
                    Most Popular
                  </div>
                )}
                <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-2">{tier.label}</div>
                <div className="font-display text-3xl font-bold text-white mb-1">{tier.amount}</div>
                <div className="font-sans text-xs text-brand-muted mb-5">Minimum investment</div>
                <div className="space-y-2 mb-6">
                  {[
                    `Min. return: ${tier.minReturn}`,
                    `Max. return: ${tier.maxReturn}`,
                    `Horizon: ${tier.horizon}`,
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0" />
                      <span className="font-sans text-sm text-brand-text">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className={`block w-full text-center rounded-lg py-2.5 font-display text-sm font-bold transition-colors ${tier.featured ? 'bg-brand-green text-brand-dark hover:bg-brand-green/90' : 'border border-brand-border bg-brand-dark text-brand-text hover:border-brand-green/40 hover:text-white'}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="py-16 border-b border-brand-border">
          <h2 className="font-display text-2xl font-bold text-white mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="relative">
                <div className="font-display text-5xl font-extrabold text-brand-border mb-4">{step.n}</div>
                <h3 className="font-display text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-16 text-center">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3 font-display text-sm font-bold text-brand-dark hover:bg-brand-green/90 transition-colors">
            Start Investing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
