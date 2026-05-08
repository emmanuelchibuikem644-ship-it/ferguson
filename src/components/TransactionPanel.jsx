'use client'

import { useState } from 'react'
import {
  X, ArrowDownLeft, ArrowUpRight, Copy, CheckCircle2,
  Building2, CreditCard, Wifi, Coins, ChevronRight, AlertCircle
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────── 

// ─── Method definitions ──────────────────────────────────────────────────────
const methods = [
  {
    id: 'usdt',
    label: 'USDT (TRC-20)',
    sub: 'Tether stablecoin',
    icon: <Coins className="h-5 w-5" />,
    fee: '0%',
    eta: '~10 mins',
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    sub: 'Nigerian bank account',
    icon: <Building2 className="h-5 w-5" />,
    fee: '0%',
    eta: '1–2 business days',
  },
  {
    id: 'wire',
    label: 'Wire Transfer',
    sub: 'International SWIFT',
    icon: <Wifi className="h-5 w-5" />,
    fee: '0.5%',
    eta: '2–5 business days',
  },
  {
    id: 'card',
    label: 'Debit / Credit Card',
    sub: 'Visa or Mastercard',
    icon: <CreditCard className="h-5 w-5" />,
    fee: '1.5%',
    eta: 'Instant',
  },
]

// ─── Sub-form per method ─────────────────────────────────────────────────────
function DepositDetails({ method, amount }) {
  const [copied, setCopied] = useState(false)

  const copy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const naira = amount ? `₦${Number(amount.replace(/,/g, '')).toLocaleString()}` : '—'

  if (method === 'usdt') {
    const addr = 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE'
    return (
      <div className="space-y-4">
        <InfoRow label="Network" value="TRON (TRC-20)" />
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">Wallet Address</div>
          <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-dark px-3 py-2.5">
            <span className="font-mono text-xs text-brand-green break-all flex-1">{addr}</span>
            <button onClick={() => copy(addr)} className="flex-shrink-0 text-brand-muted hover:text-brand-green transition-colors">
              {copied ? <CheckCircle2 className="h-4 w-4 text-brand-green" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <Alert text="Only send USDT on the TRC-20 (TRON) network. Sending on another network will result in permanent loss." />
        <InfoRow label="Amount to Send" value={amount ? `${(Number(amount.replace(/,/g, '')) / 1500).toFixed(2)} USDT` : '—'} highlight />
      </div>
    )
  }

  if (method === 'bank') {
    return (
      <div className="space-y-3">
        <InfoRow label="Bank Name" value="Zenith Bank PLC" />
        <InfoRow label="Account Name" value="Ferguson Growth Capital Ltd" />
        <InfoRow label="Account Number" value="1234567890" copyable />
        <InfoRow label="Amount" value={naira} highlight />
        <Alert text="Use your registered name narration so we can match your deposit." />
      </div>
    )
  }

  if (method === 'wire') {
    return (
      <div className="space-y-3">
        <InfoRow label="Bank" value="Zenith Bank PLC, Lagos Nigeria" />
        <InfoRow label="SWIFT / BIC" value="ZEIBNGLA" copyable />
        <InfoRow label="Account Name" value="Ferguson Growth Capital Ltd" />
        <InfoRow label="IBAN / Account No." value="NG99 1234 5678 9012 3456" copyable />
        <InfoRow label="Amount" value={naira} highlight />
        <Alert text="Include your email address in the wire reference to expedite processing." />
      </div>
    )
  }

  // card
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <FormInput label="Card Number" placeholder="0000 0000 0000 0000" />
        <div className="grid grid-cols-2 gap-3">
          <FormInput label="Expiry" placeholder="MM / YY" />
          <FormInput label="CVV" placeholder="•••" />
        </div>
        <FormInput label="Cardholder Name" placeholder="As on card" />
      </div>
      <InfoRow label="Amount" value={naira} highlight />
      <InfoRow label="Processing Fee (1.5%)" value={amount ? `₦${(Number(amount.replace(/,/g, '')) * 0.015).toLocaleString()}` : '—'} />
    </div>
  )
}

function WithdrawDetails({ method, amount }) {
  const naira = amount ? `₦${Number(amount.replace(/,/g, '')).toLocaleString()}` : '—'

  if (method === 'usdt') {
    return (
      <div className="space-y-4">
        <FormInput label="Your USDT Wallet Address (TRC-20)" placeholder="TQn9Y2k..." />
        <InfoRow label="You Receive" value={amount ? `${(Number(amount.replace(/,/g, '')) / 1500).toFixed(2)} USDT` : '—'} highlight />
        <InfoRow label="Network Fee" value="~1 USDT" />
        <Alert text="Double-check the address. Crypto withdrawals are irreversible." />
      </div>
    )
  }

  if (method === 'bank') {
    return (
      <div className="space-y-3">
        <FormInput label="Account Name" placeholder="Your full name" />
        <FormInput label="Bank Name" placeholder="e.g. GTBank" />
        <FormInput label="Account Number" placeholder="0123456789" />
        <InfoRow label="You Receive" value={naira} highlight />
        <Alert text="Withdrawals are processed within 1–2 business days." />
      </div>
    )
  }

  if (method === 'wire') {
    return (
      <div className="space-y-3">
        <FormInput label="Beneficiary Name" placeholder="Your full name" />
        <FormInput label="Bank Name & Country" placeholder="e.g. Barclays, UK" />
        <FormInput label="SWIFT / BIC" placeholder="BARCGB22" />
        <FormInput label="IBAN / Account No." placeholder="GB00 0000 0000 0000" />
        <InfoRow label="You Receive" value={naira} highlight />
        <InfoRow label="Wire Fee (0.5%)" value={amount ? `₦${(Number(amount.replace(/,/g, '')) * 0.005).toLocaleString()}` : '—'} />
      </div>
    )
  }

  // card refund
  return (
    <div className="space-y-3">
      <Alert text="Card withdrawals are refunded to your original deposit card only." />
      <FormInput label="Last 4 Digits of Card" placeholder="e.g. 4242" />
      <InfoRow label="Refund Amount" value={naira} highlight />
      <InfoRow label="Processing Fee (1.5%)" value={amount ? `₦${(Number(amount.replace(/,/g, '')) * 0.015).toLocaleString()}` : '—'} />
    </div>
  )
}

// ─── Small helper components ─────────────────────────────────────────────────
function InfoRow({ label, value, highlight, copyable }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-center justify-between py-2 border-b border-brand-border/40 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`font-mono text-xs ${highlight ? 'text-brand-green font-semibold' : 'text-brand-text'}`}>{value}</span>
        {copyable && (
          <button onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="text-brand-muted hover:text-brand-green transition-colors">
            {copied ? <CheckCircle2 className="h-3 w-3 text-brand-green" /> : <Copy className="h-3 w-3" />}
          </button>
        )}
      </div>
    </div>
  )
}

function FormInput({ label, placeholder }) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 font-sans text-sm text-brand-text placeholder:text-brand-muted/40 focus:border-brand-green/50 focus:outline-none focus:ring-1 focus:ring-brand-green/10 transition-colors"
      />
    </div>
  )
}

function Alert({ text }) {
  return (
    <div className="flex gap-2.5 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2.5">
      <AlertCircle className="h-4 w-4 flex-shrink-0 text-yellow-500 mt-0.5" />
      <p className="font-sans text-xs text-yellow-200/70 leading-relaxed">{text}</p>
    </div>
  )
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export default function TransactionPanel({ onClose }) {
  const [mode, setMode] = useState('deposit')
  const [method, setMethod] = useState(null)
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState('method')

  const selectedMethod = methods.find(m => m.id === method)

  const reset = () => {
    setMethod(null)
    setAmount('')
    setStep('method')
  }

  const handleModeSwitch = (m) => {
    setMode(m)
    reset()
  }

  const formatAmount = (val) => {
    const raw = val.replace(/\D/g, '')
    return raw ? Number(raw).toLocaleString() : ''
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
        <div className="flex items-center gap-1 rounded-lg border border-brand-border bg-brand-dark p-1">
          {(['deposit', 'withdraw']).map((m) => (
            <button
              key={m}
              onClick={() => handleModeSwitch(m)}
              className={`flex items-center gap-2 rounded-md px-4 py-1.5 font-display text-xs font-semibold capitalize transition-all ${mode === m ? (m === 'deposit' ? 'bg-brand-green text-brand-dark' : 'bg-red-500/80 text-white') : 'text-brand-muted hover:text-brand-text'}`}
            >
              {m === 'deposit' ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {step !== 'method' && (
            <button onClick={reset} className="font-mono text-[11px] text-brand-muted hover:text-brand-text transition-colors">
              ← Back
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-brand-muted hover:text-brand-text transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {/* Step: Select method */}
        {step === 'method' && (
          <div className="space-y-3">
            <div className="mb-5">
              <h2 className="font-display text-lg font-bold text-white">
                {mode === 'deposit' ? 'Add Funds' : 'Withdraw Funds'}
              </h2>
              <p className="font-sans text-xs text-brand-muted mt-1">
                Select your preferred {mode === 'deposit' ? 'deposit' : 'withdrawal'} method
              </p>
            </div>

            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMethod(m.id); setStep('details') }}
                className={`group w-full flex items-center gap-4 rounded-xl border px-4 py-4 transition-all text-left ${method === m.id ? 'border-brand-green/50 bg-brand-green/5' : 'border-brand-border bg-brand-dark hover:border-brand-green/30 hover:bg-brand-dark/80'}`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-brand-border bg-brand-card text-brand-green group-hover:border-brand-green/30 transition-colors">
                  {m.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-semibold text-white">{m.label}</div>
                  <div className="font-sans text-xs text-brand-muted">{m.sub}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-[10px] text-brand-green">Fee: {m.fee}</div>
                  <div className="font-mono text-[10px] text-brand-muted">{m.eta}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-brand-muted group-hover:text-brand-green transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Step: Enter amount + method details */}
        {step === 'details' && selectedMethod && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-green/30 bg-brand-green/10 text-brand-green">
                {selectedMethod.icon}
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">{selectedMethod.label}</div>
                <div className="font-mono text-[10px] text-brand-muted">Fee {selectedMethod.fee} · {selectedMethod.eta}</div>
              </div>
            </div>

            {/* Amount input */}
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1.5">
                Amount (₦)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-lg font-bold text-brand-muted">₦</span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(formatAmount(e.target.value))}
                  placeholder="200,000"
                  className="w-full rounded-lg border border-brand-border bg-brand-dark pl-8 pr-4 py-3 font-display text-lg font-bold text-white placeholder:text-brand-muted/30 focus:border-brand-green/50 focus:outline-none focus:ring-1 focus:ring-brand-green/10 transition-colors"
                />
              </div>
              {/* Quick amounts */}
              <div className="flex gap-2 mt-2">
                {['200,000', '500,000', '1,000,000'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setAmount(q)}
                    className="rounded-md border border-brand-border bg-brand-dark px-3 py-1 font-mono text-[10px] text-brand-muted hover:border-brand-green/40 hover:text-brand-green transition-colors"
                  >
                    ₦{q}
                  </button>
                ))}
              </div>
            </div>

            {/* Method-specific fields */}
            {mode === 'deposit'
              ? <DepositDetails method={selectedMethod.id} amount={amount} />
              : <WithdrawDetails method={selectedMethod.id} amount={amount} />
            }

            <button
              onClick={() => amount ? setStep('confirm') : null}
              disabled={!amount}
              className="w-full rounded-lg bg-brand-green py-3 font-display text-sm font-bold text-brand-dark transition-all hover:bg-brand-green/90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {mode === 'deposit' ? 'Confirm Deposit' : 'Confirm Withdrawal'} →
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === 'confirm' && selectedMethod && (
          <div className="space-y-5">
            <div className="mb-2">
              <h2 className="font-display text-lg font-bold text-white">Confirm {mode === 'deposit' ? 'Deposit' : 'Withdrawal'}</h2>
              <p className="font-sans text-xs text-brand-muted mt-1">Review the details below before proceeding.</p>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-dark divide-y divide-brand-border/50">
              {[
                { label: 'Type', value: mode === 'deposit' ? 'Deposit' : 'Withdrawal' },
                { label: 'Method', value: selectedMethod.label },
                { label: 'Amount', value: `₦${amount}` },
                { label: 'Fee', value: selectedMethod.fee },
                { label: 'ETA', value: selectedMethod.eta },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">{label}</span>
                  <span className="font-mono text-xs text-brand-text">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('success')}
              className={`w-full rounded-lg py-3 font-display text-sm font-bold transition-all ${mode === 'deposit' ? 'bg-brand-green text-brand-dark hover:bg-brand-green/90' : 'bg-red-500/80 text-white hover:bg-red-500'}`}
            >
              Submit {mode === 'deposit' ? 'Deposit' : 'Withdrawal'}
            </button>
            <button onClick={() => setStep('details')} className="w-full text-center font-sans text-xs text-brand-muted hover:text-brand-text transition-colors">
              ← Edit Details
            </button>
          </div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <div className="flex flex-col items-center py-10 text-center gap-4">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full border-2 ${mode === 'deposit' ? 'border-brand-green bg-brand-green/10' : 'border-red-400 bg-red-400/10'}`}>
              <CheckCircle2 className={`h-8 w-8 ${mode === 'deposit' ? 'text-brand-green' : 'text-red-400'}`} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                {mode === 'deposit' ? 'Deposit Submitted!' : 'Withdrawal Requested!'}
              </h3>
              <p className="font-sans text-sm text-brand-muted mt-2 max-w-xs">
                {mode === 'deposit'
                  ? `Your deposit of ₦${amount} via ${selectedMethod?.label} has been received. We'll confirm once payment clears.`
                  : `Your withdrawal of ₦${amount} via ${selectedMethod?.label} is being processed. ETA: ${selectedMethod?.eta}.`}
              </p>
            </div>
            <div className="mt-2 rounded-lg border border-brand-border bg-brand-dark px-5 py-2">
              <span className="font-mono text-xs text-brand-muted">Ref: </span>
              <span className="font-mono text-xs text-brand-green">FGC-{Date.now().toString().slice(-8)}</span>
            </div>
            <button
              onClick={reset}
              className="mt-4 rounded-lg border border-brand-border bg-brand-dark px-6 py-2.5 font-display text-xs font-semibold text-brand-text hover:border-brand-green/40 hover:text-white transition-all"
            >
              Make Another Transaction
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
