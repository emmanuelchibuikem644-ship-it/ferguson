import Link from 'next/link'
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart2,
  FileText,
} from 'lucide-react'

import StatCard from '@/components/StatCard'
import FeatureCard from '@/components/FeatureCard'
import LiveMarketChart from '@/components/LiveMarketChart'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative grid-overlay px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* LEFT */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-3 py-1">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />

                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">
                  Live Market ·
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                Invest in{' '}
                <span className="text-brand-green">
                the World&apos;s
                </span>
                <br />
                Growth Story
              </h1>

              <p className="font-sans text-base text-brand-muted leading-relaxed mb-8 max-w-lg">
                Ferguson Growth Capital channels investor funds into vetted,
                high-growth world SMEs across Fintech, Agriculture,
                Logistics, Retail, and Healthcare — with transparent,
                real-time reporting like the markets you trust.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-6 py-3 font-display text-sm font-bold text-brand-dark transition-all hover:bg-brand-green/90 hover:gap-3"
                >
                  Open Investor Dashboard

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/opportunity"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-card/60 backdrop-blur-sm px-6 py-3 font-display text-sm font-semibold text-brand-text transition-all hover:bg-brand-card hover:text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
                >
                  View Opportunity
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <StatCard
                  label="Min. Investment"
                  value="₦50K"
                />

                <StatCard
                  label="Target Return"
                  value="20–40%"
                />

                <StatCard
                  label="Horizon"
                  value="3–6 mon"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <LiveMarketChart compact={true} />

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  '20–40% Target Returns',
                  'Vetted Businesses',
                  'Diversified Sectors',
                  'Transparent Reporting',
                ].map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 rounded-xl bg-brand-card/40 backdrop-blur-sm px-3 py-2.5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                  >
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green" />

                    <span className="font-sans text-xs text-brand-text">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-brand-card/10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-2">
                Live Market Data
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Real-Time world Market Overview
              </h2>

              <p className="font-sans text-sm text-brand-muted mt-2 max-w-lg">
                Live prices, order book depth, trade feed,
                and the full world board.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-green/10 px-5 py-2.5 font-display text-xs font-semibold text-brand-green hover:bg-brand-green/20 transition-all flex-shrink-0 shadow-[0_0_0_1px_rgba(0,255,140,0.15)]"
            >
              Open Dashboard

              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <LiveMarketChart compact={false} />
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-widest text-brand-green">
                About Us
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
                Backing the businesses building the world&apos;s future.
              </h2>

              <p className="font-sans text-sm text-brand-muted leading-relaxed mb-6 max-w-md">
                Ferguson Growth Capital invests in world
                businesses with high growth potential.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-green hover:gap-3 transition-all"
              >
                Learn More

                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl bg-brand-card/60 backdrop-blur-md p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                Worked Example
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-5">
                Investment: ₦50,000
              </h3>

              <div className="space-y-1">
                {[
                  {
                    label: 'Business profit in 3 months',
                    value: '₦80,000',
                  },
                  {
                    label: 'Management fee',
                    value: '₦16,000',
                    dim: true,
                  },
                  {
                    label: 'Investor profit share',
                    value: '₦64,000',
                  },
                  {
                    label: 'Total payout',
                    value: '₦114,000',
                    highlight: true,
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between py-3 ${
                      row.highlight
                        ? 'mt-3 pt-4 border-t border-brand-green/10'
                        : ''
                    }`}
                  >
                    <span
                      className={`font-sans text-sm ${
                        row.highlight
                          ? 'text-white font-semibold'
                          : 'text-brand-muted'
                      }`}
                    >
                      {row.label}
                    </span>

                    <span
                      className={`font-mono text-sm font-medium ${
                        row.highlight
                          ? 'text-brand-green text-base'
                          : row.dim
                          ? 'text-brand-muted'
                          : 'text-white'
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              icon={TrendingUp}
              title="20–40% Target Returns"
              description="Performance-based returns over 3–6 month cycles."
            />

            <FeatureCard
              icon={Shield}
              title="Vetted Businesses"
              description="We carefully select every investment."
            />

            <FeatureCard
              icon={BarChart2}
              title="Diversified Sectors"
              description="Fintech, Agriculture, Logistics, Retail, and Healthcare."
            />

            <FeatureCard
              icon={FileText}
              title="Transparent Reporting"
              description="Quarterly updates and open access."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-br from-brand-green/10 to-brand-card p-10 sm:p-14 text-center shadow-[0_0_60px_rgba(0,255,140,0.05)]">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to grow your capital with us?
            </h2>

            <p className="font-sans text-sm text-brand-muted mb-8">
              Join investors backing world&apos;s most promising SMEs.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-green px-8 py-3 font-display text-sm font-bold text-brand-dark hover:bg-brand-green/90 transition-colors"
              >
                Get Started

                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-card/60 backdrop-blur-sm px-8 py-3 font-display text-sm font-semibold text-brand-text hover:text-white transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}