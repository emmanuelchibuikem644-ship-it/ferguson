'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react'

// Exchange rate used for display (1 USD = ₦1,600)
const RATE = 1600

// ─── Investment tiers ──────────────────────────────────────────────────────────
// All profit calculations based on 20–40% target return range
// Management fee: 20% of profits (deducted from gross profit)
// Net investor profit = gross profit × 80%

const TIERS = [
  {
    label: 'Starter',
    horizon: '3 months',
    featured: false,
    ngn: {
      principal: 50_000,
      grossProfitMin: 10_000,   // 20% of 50k
      grossProfitMax: 20_000,   // 40% of 50k
      mgmtFeeMin: 2_000,        // 20% of 10k
      mgmtFeeMax: 4_000,        // 20% of 20k
      netProfitMin: 8_000,      // 80% of 10k
      netProfitMax: 16_000,     // 80% of 20k
      totalMin: 58_000,
      totalMax: 66_000,
    },
    usd: {
      principal: 31.25,         // 50000 / 1600
      grossProfitMin: 6.25,
      grossProfitMax: 12.50,
      mgmtFeeMin: 1.25,
      mgmtFeeMax: 2.50,
      netProfitMin: 5.00,
      netProfitMax: 10.00,
      totalMin: 36.25,
      totalMax: 41.25,
    }
  },
  {
    label: 'Growth',
    horizon: '3–4 months',
    featured: true,
    ngn: {
      principal: 100_000,
      grossProfitMin: 20_000,
      grossProfitMax: 40_000,
      mgmtFeeMin: 4_000,
      mgmtFeeMax: 8_000,
      netProfitMin: 16_000,
      netProfitMax: 32_000,
      totalMin: 116_000,
      totalMax: 132_000,
    },
    usd: {
      principal: 62.50,
      grossProfitMin: 12.50,
      grossProfitMax: 25.00,
      mgmtFeeMin: 2.50,
      mgmtFeeMax: 5.00,
      netProfitMin: 10.00,
      netProfitMax: 20.00,
      totalMin: 72.50,
      totalMax: 82.50,
    }
  },
  {
    label: 'Premium',
    horizon: '4–6 months',
    featured: false,
    ngn: {
      principal: 200_000,
      grossProfitMin: 40_000,
      grossProfitMax: 80_000,
      mgmtFeeMin: 8_000,
      mgmtFeeMax: 16_000,
      netProfitMin: 32_000,
      netProfitMax: 64_000,
      totalMin: 232_000,
      totalMax: 264_000,
    },
    usd: {
      principal: 125.00,
      grossProfitMin: 25.00,
      grossProfitMax: 50.00,
      mgmtFeeMin: 5.00,
      mgmtFeeMax: 10.00,
      netProfitMin: 20.00,
      netProfitMax: 40.00,
      totalMin: 145.00,
      totalMax: 165.00,
    }
  }
]

function fmtNGN(n) {
  return '₦' + n.toLocaleString('en-NG')
}
function fmtUSD(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const steps = [
  { n: '01', title: 'Register & Verify', desc: 'Create your investor profile and complete our simple KYC verification process.' },
  { n: '02', title: 'Choose Your Tier', desc: 'Select ₦50K, ₦100K or ₦200K (or the USD equivalent) and transfer funds.' },
  { n: '03', title: 'We Deploy Capital', desc: 'Ferguson Growth Capital deploys your funds into carefully vetted global SMEs.' },
  { n: '04', title: 'Receive Returns', desc: 'At cycle end, receive your principal back plus your net profit share.' },
]

export default function OpportunityPage() {
  const [currency, setCurrency] = useState('ngn')

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="py-20 border-b border-brand-border text-center">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-4">The Opportunity</div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            20–40% Target Returns.<br />3–6 Month Cycles.
          </h1>
          <p className="font-sans text-base text-brand-muted max-w-lg mx-auto">
            Invest in high-growth global SMEs. Choose your amount, see exactly how your profit is calculated — no hidden fees.
          </p>

          {/* Exchange rate note */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-1.5">
            <span className="font-mono text-[10px] text-brand-muted">Reference rate:</span>
            <span className="font-mono text-[10px] text-brand-green">$1 = ₦{RATE.toLocaleString()}</span>
          </div>
        </div>

        {/* ── Currency toggle ── */}
        <div className="pt-14 pb-8 flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">Select your currency</p>
          <div className="flex gap-1 rounded-xl border border-brand-border bg-brand-card p-1">
            <button
              onClick={() => setCurrency('ngn')}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-display text-sm font-bold transition-all ${currency === 'ngn' ? 'bg-brand-green text-brand-dark' : 'text-brand-muted hover:text-brand-text'}`}
            >
              <span className="text-base">₦</span> Nigerian Naira
            </button>
            <button
              onClick={() => setCurrency('usd')}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-display text-sm font-bold transition-all ${currency === 'usd' ? 'bg-brand-green text-brand-dark' : 'text-brand-muted hover:text-brand-text'}`}
            >
              <DollarSign className="h-4 w-4" /> US Dollar
            </button>
          </div>
        </div>

        {/* ── Tier cards ── */}
        <div className="pb-6 border-b border-brand-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier) => {
              const d = currency === 'ngn' ? tier.ngn : tier.usd
              const fmt = currency === 'ngn' ? fmtNGN : fmtUSD
              return (
                <div
                  key={tier.label}
                  className={`rounded-2xl border p-6 relative flex flex-col ${tier.featured ? 'border-brand-green/60 bg-brand-green/5' : 'border-brand-border bg-brand-card'}`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border border-brand-green/40 bg-brand-green/20 px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-brand-green whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  {/* Tier label + horizon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{tier.label}</span>
                    <span className="rounded border border-brand-border px-2 py-0.5 font-mono text-[10px] text-brand-muted">{tier.horizon}</span>
                  </div>

                  {/* Principal */}
                  <div className="mb-1 font-display text-4xl font-extrabold text-white">{fmt(d.principal)}</div>
                  <div className="mb-6 font-sans text-xs text-brand-muted">Investment principal</div>

                  {/* Profit breakdown table */}
                  <div className="rounded-lg border border-brand-border/60 bg-brand-dark/40 divide-y divide-brand-border/40 mb-6">
                    {[
                      {
                        label: 'Gross profit (20–40%)',
                        min: d.grossProfitMin,
                        max: d.grossProfitMax,
                        color: 'text-white',
                      },
                      {
                        label: 'Mgmt fee (20% of profit)',
                        min: d.mgmtFeeMin,
                        max: d.mgmtFeeMax,
                        color: 'text-red-400',
                        prefix: '−',
                      },
                      {
                        label: 'Your net profit',
                        min: d.netProfitMin,
                        max: d.netProfitMax,
                        color: 'text-brand-green',
                        bold: true,
                      },
                      {
                        label: 'Total payout',
                        min: d.totalMin,
                        max: d.totalMax,
                        color: 'text-brand-green',
                        bold: true,
                        highlight: true,
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className={`flex items-center justify-between px-3 py-2.5 ${row.highlight ? 'bg-brand-green/8 rounded-b-lg' : ''}`}
                      >
                        <span className={`font-sans text-xs ${row.bold ? 'text-brand-text font-semibold' : 'text-brand-muted'}`}>
                          {row.label}
                        </span>
                        <span className={`font-mono text-xs ${row.color} ${row.bold ? 'font-bold' : ''}`}>
                          {row.prefix || ''}{fmt(row.min)} – {fmt(row.max)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Return range badges */}
                  <div className="flex gap-2 mb-6">
                    <div className="flex-1 rounded-lg border border-brand-green/20 bg-brand-green/5 p-3 text-center">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1">Min Return</div>
                      <div className="font-display text-base font-bold text-brand-green">
                        +{((d.netProfitMin / d.principal) * 100).toFixed(0)}%
                      </div>
                      <div className="font-mono text-[10px] text-brand-green">{fmt(d.netProfitMin)}</div>
                    </div>
                    <div className="flex-1 rounded-lg border border-brand-green/30 bg-brand-green/10 p-3 text-center">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-brand-muted mb-1">Max Return</div>
                      <div className="font-display text-base font-bold text-brand-green">
                        +{((d.netProfitMax / d.principal) * 100).toFixed(0)}%
                      </div>
                      <div className="font-mono text-[10px] text-brand-green">{fmt(d.netProfitMax)}</div>
                    </div>
                  </div>

                  {/* Checks */}
                  <div className="space-y-2 mb-6 flex-1">
                    {[
                      'Principal fully returned at cycle end',
                      'Real-time portfolio tracking',
                      'Quarterly performance report',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-xs text-brand-muted">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className={`block w-full text-center rounded-xl py-3 font-display text-sm font-bold transition-all ${tier.featured ? 'bg-brand-green text-brand-dark hover:bg-brand-green/90' : 'border border-brand-border bg-brand-dark text-brand-text hover:border-brand-green/40 hover:text-white'}`}
                  >
                    Invest {fmt(d.principal)} →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Fee structure explainer ── */}
        <div className="py-14 border-b border-brand-border">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">How the profit split works</h2>
            <p className="font-sans text-sm text-brand-muted text-center mb-8">Simple, transparent — no surprises.</p>

            <div className="rounded-2xl border border-brand-border bg-brand-card overflow-hidden">
              {/* Visual bar */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex rounded-lg overflow-hidden h-10 mb-3">
                  <div className="flex items-center justify-center bg-brand-green text-brand-dark font-display text-xs font-bold" style={{ width: '80%' }}>
                    80% → You
                  </div>
                  <div className="flex items-center justify-center bg-brand-border text-brand-muted font-display text-xs font-bold" style={{ width: '20%' }}>
                    20% Fee
                  </div>
                </div>
                <p className="font-sans text-xs text-brand-muted text-center">Of gross profit generated</p>
              </div>

              <div className="divide-y divide-brand-border/50">
                {[
                  { step: '1', text: 'Your capital is deployed into vetted SMEs for the investment period.' },
                  { step: '2', text: 'At cycle end, the business profit is calculated.' },
                  { step: '3', text: 'Ferguson takes a 20% management fee from the gross profit only — not your principal.' },
                  { step: '4', text: 'You receive 80% of the gross profit + your full principal back.' },
                ].map((row) => (
                  <div key={row.step} className="flex items-start gap-4 px-6 py-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full border border-brand-green/40 bg-brand-green/10 flex items-center justify-center font-mono text-[10px] text-brand-green">
                      {row.step}
                    </div>
                    <p className="font-sans text-sm text-brand-muted leading-relaxed">{row.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── How it works steps ── */}
        <div className="py-16 border-b border-brand-border">
          <h2 className="font-display text-2xl font-bold text-white mb-10 text-center">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n}>
                <div className="font-display text-5xl font-extrabold text-brand-border mb-4">{step.n}</div>
                <h3 className="font-display text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="font-sans text-sm text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Disclaimer + CTA ── */}
        <div className="py-16 text-center">
          <p className="font-sans text-xs text-brand-muted max-w-lg mx-auto mb-8">
            <strong className="text-brand-text">Disclaimer:</strong> Returns are target projections based on historical SME performance. Investing carries risk and returns are not guaranteed. Only invest what you can afford to keep locked in for the investment horizon.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand-green px-8 py-3 font-display text-sm font-bold text-brand-dark hover:bg-brand-green/90 transition-colors">
            Start Investing <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
