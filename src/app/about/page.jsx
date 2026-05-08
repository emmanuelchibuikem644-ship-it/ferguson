import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Users,
  Globe,
  Award,
} from 'lucide-react'

const values = [
  {
    icon: Target,
    title: 'Precision Selection',
    desc: 'We apply rigorous due diligence before committing capital to any SME.',
  },
  {
    icon: Users,
    title: 'Partnership Model',
    desc: 'We actively support businesses beyond funding alone.',
  },
  {
    icon: Globe,
    title: 'Nigeria First',
    desc: "Our investment thesis is built around Nigeria's long-term growth opportunity.",
  },
  {
    icon: Award,
    title: 'Investor Commitment',
    desc: 'We are transparent, accountable, and focused on measurable returns.',
  },
]

const sectors = [
  'Fintech',
  'Agriculture',
  'Logistics',
  'Retail',
  'Healthcare',
]

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="py-24">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-4">
            About Ferguson Growth Capital
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white max-w-2xl leading-tight mb-6">
            Backing the businesses building Nigeria&apos;s future.
          </h1>

          <p className="font-sans text-base text-brand-muted leading-relaxed max-w-xl">
            Ferguson Growth Capital invests in high-growth Nigerian
            businesses, helping them scale while generating attractive
            returns for investors.
          </p>
        </div>

        {/* MISSION */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-5">
              Our Mission
            </h2>

            <p className="font-sans text-sm text-brand-muted leading-relaxed mb-5">
              Nigeria&apos;s SME sector is one of the largest drivers of
              economic growth, yet access to growth capital remains limited.
              We exist to bridge that gap by connecting investors with
              carefully selected businesses already showing traction.
            </p>

            <p className="font-sans text-sm text-brand-muted leading-relaxed">
              Every investment is actively monitored with transparent
              reporting, disciplined risk management, and a clear focus
              on sustainable returns.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-2 gap-3">
            {sectors.map((sector) => (
              <div
                key={sector}
                className="rounded-2xl bg-brand-card/50 backdrop-blur-sm px-4 py-4 flex items-center gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green flex-shrink-0" />

                <span className="font-display text-sm font-medium text-white">
                  {sector}
                </span>
              </div>
            ))}

            <div className="rounded-2xl bg-brand-card/50 backdrop-blur-sm px-4 py-4 flex items-center gap-2 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-muted flex-shrink-0" />

              <span className="font-display text-sm font-medium text-brand-muted">
                More Coming
              </span>
            </div>
          </div>
        </div>

        {/* VALUES */}
        <div className="py-20">
          <div className="mb-10">
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-3">
              Core Values
            </div>

            <h2 className="font-display text-3xl font-bold text-white">
              Principles Behind Every Investment
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-3xl bg-brand-card/60 backdrop-blur-md p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,255,140,0.06)] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                <div className="mb-5 h-11 w-11 rounded-2xl bg-brand-dark/80 flex items-center justify-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                  <Icon className="h-5 w-5 text-brand-green" />
                </div>

                <h3 className="font-display text-base font-bold text-white mb-3">
                  {title}
                </h3>

                <p className="font-sans text-sm text-brand-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="py-20">
          <div className="rounded-3xl bg-gradient-to-br from-brand-green/10 to-brand-card p-10 sm:p-14 text-center shadow-[0_0_60px_rgba(0,255,140,0.05)]">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to invest?
            </h2>

            <p className="font-sans text-sm text-brand-muted mb-8">
              Start investing in Nigeria&apos;s growth story with as little
              as ₦200,000.
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
                href="/opportunity"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-card/60 backdrop-blur-sm px-8 py-3 font-display text-sm font-semibold text-brand-text hover:text-white transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
              >
                View Opportunity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}