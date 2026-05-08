'use client'

import { useState } from 'react'
import MiniChart from '@/components/MiniChart'
import TransactionPanel from '@/components/TransactionPanel'

import {
  TrendingUp,
  DollarSign,
  Clock,
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react'

const portfolio = [
  {
    name: 'Agro-Fintech Collective',
    sector: 'Fintech',
    invested: '₦200,000',
    current: '₦256,000',
    return: '+28.0%',
    status: 'Active',
    up: true,
  },
  {
    name: 'Lagos Fresh Logistics',
    sector: 'Logistics',
    invested: '₦500,000',
    current: '₦635,000',
    return: '+27.0%',
    status: 'Active',
    up: true,
  },
  {
    name: 'Kano Health Chain',
    sector: 'Healthcare',
    invested: '₦300,000',
    current: '₦372,000',
    return: '+24.0%',
    status: 'Matured',
    up: true,
  },
]

export default function DashboardPage() {
  const [tab, setTab] = useState('overview')

  // Portfolio overview balance
  const [balance, setBalance] = useState(0)

  // Inputs
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  // Loading states
  const [depositLoading, setDepositLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  // Transactions
  const [transactions, setTransactions] = useState([])

  // Currency formatter
  const formatMoney = (amount) => {
    return `₦${Number(amount).toLocaleString()}`
  }

  // Dynamic stats
  const stats = [
    {
      label: 'Portfolio Overview',
      value: formatMoney(balance),
      icon: DollarSign,
    },
    {
      label: 'Total Current Value',
      value: '₦1,263,000',
      icon: TrendingUp,
    },
    {
      label: 'Overall Return',
      value: '+26.3%',
      icon: Activity,
    },
    {
      label: 'Active Cycles',
      value: '2',
      icon: Clock,
    },
  ]

  // Deposit Function
  const handleDeposit = () => {
    if (!depositAmount) return

    setDepositLoading(true)

    const amount = Number(depositAmount)

    const pendingTransaction = {
      id: Date.now(),
      type: 'Deposit',
      amount,
      status: 'Pending',
    }

    setTransactions((prev) => [pendingTransaction, ...prev])

    setTimeout(() => {
      const success = Math.random() > 0.2

      if (success) {
        setBalance((prev) => prev + amount)
      }

      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === pendingTransaction.id
            ? {
                ...tx,
                status: success ? 'Successful' : 'Failed',
              }
            : tx
        )
      )

      setDepositLoading(false)
      setDepositAmount('')
    }, 30000)
  }

  // Withdraw Function
  const handleWithdraw = () => {
    if (!withdrawAmount) return

    const amount = Number(withdrawAmount)

    if (amount > balance) {
      alert('Insufficient balance')
      return
    }

    setWithdrawLoading(true)

    const pendingTransaction = {
      id: Date.now(),
      type: 'Withdraw',
      amount,
      status: 'Pending',
    }

    setTransactions((prev) => [pendingTransaction, ...prev])

    setTimeout(() => {
      const success = Math.random() > 0.2

      if (success) {
        setBalance((prev) => prev - amount)
      }

      setTransactions((prev) =>
        prev.map((tx) =>
          tx.id === pendingTransaction.id
            ? {
                ...tx,
                status: success ? 'Successful' : 'Failed',
              }
            : tx
        )
      )

      setWithdrawLoading(false)
      setWithdrawAmount('')
    }, 30000)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-brand-green mb-1">
              Investor Dashboard
            </div>

            <h1 className="font-display text-3xl font-bold text-white">
              Portfolio Overview
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setTab('deposit')}
              className="flex items-center gap-2 rounded-lg border border-brand-green/40 bg-brand-green/10 px-4 py-2 font-display text-xs font-semibold text-brand-green hover:bg-brand-green/20 transition-all"
            >
              <ArrowDownLeft className="h-3.5 w-3.5" />

              Deposit
            </button>

            <button
              onClick={() => setTab('withdraw')}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 font-display text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />

              Withdraw
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-card px-4 py-2">
              <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />

              <span className="font-mono text-[11px] text-brand-green">
                Live Data
              </span>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-brand-border bg-brand-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-muted">
                  {label}
                </span>

                <Icon className="h-4 w-4 text-brand-green" />
              </div>

              <div className="font-display text-xl font-bold text-white">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-8">
          <MiniChart />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'portfolio', label: 'Portfolio' },
            { id: 'deposit', label: '↓ Deposit' },
            { id: 'withdraw', label: '↑ Withdraw' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-4 py-2 font-display text-xs font-semibold transition-colors border ${
                tab === t.id
                  ? t.id === 'withdraw'
                    ? 'bg-red-500/20 text-red-400 border-red-500/30'
                    : 'bg-brand-green/20 text-brand-green border-brand-green/40'
                  : 'text-brand-muted border-brand-border hover:text-brand-text'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Deposit */}
        {tab === 'deposit' && (
          <div className="max-w-xl rounded-xl border border-brand-border bg-brand-card p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-white mb-4">
              Deposit Funds
            </h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-3 text-white outline-none mb-4"
            />

            <button
              onClick={handleDeposit}
              disabled={depositLoading}
              className="w-full rounded-lg bg-brand-green px-5 py-3 font-display text-sm font-bold text-brand-dark hover:bg-brand-green/90 transition-colors disabled:opacity-50"
            >
              {depositLoading ? 'Processing Deposit...' : 'Deposit Funds'}
            </button>

            <div className="mt-6">
              <TransactionPanel />
            </div>
          </div>
        )}

        {/* Withdraw */}
        {tab === 'withdraw' && (
          <div className="max-w-xl rounded-xl border border-brand-border bg-brand-card p-6 mb-8">
            <h2 className="font-display text-xl font-bold text-white mb-4">
              Withdraw Funds
            </h2>

            <input
              type="number"
              placeholder="Enter amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-3 text-white outline-none mb-4"
            />

            <button
              onClick={handleWithdraw}
              disabled={withdrawLoading}
              className="w-full rounded-lg bg-red-500 px-5 py-3 font-display text-sm font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {withdrawLoading ? 'Processing Withdrawal...' : 'Withdraw Funds'}
            </button>

            <div className="mt-6">
              <TransactionPanel />
            </div>
          </div>
        )}

        {/* Transaction Table */}
        {transactions.length > 0 && (
          <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden mb-8">
            <div className="px-4 py-4 border-b border-brand-border">
              <h2 className="font-display text-lg font-bold text-white">
                Transaction History
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-border">
                    {['Type', 'Amount', 'Status'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-brand-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id}
                      className="border-b border-brand-border/50"
                    >
                      <td className="px-4 py-4 text-white">
                        {tx.type}
                      </td>

                      <td className="px-4 py-4 text-brand-text">
                        {formatMoney(tx.amount)}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px]
                          ${
                            tx.status === 'Successful'
                              ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                              : tx.status === 'Failed'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          }`}
                        >
                          {tx.status}

                          {tx.status === 'Pending' && (
                            <span className="h-1 w-1 rounded-full bg-yellow-400 animate-pulse" />
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Portfolio table */}
        {tab === 'portfolio' && (
          <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brand-border">
                    {[
                      'Business',
                      'Sector',
                      'Invested',
                      'Current Value',
                      'Return',
                      'Status',
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-brand-muted"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {portfolio.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-brand-border/50 hover:bg-brand-dark/40 transition-colors"
                    >
                      <td className="px-4 py-4 font-sans text-sm font-medium text-white">
                        {row.name}
                      </td>

                      <td className="px-4 py-4 font-mono text-xs text-brand-muted">
                        {row.sector}
                      </td>

                      <td className="px-4 py-4 font-mono text-sm text-brand-text">
                        {row.invested}
                      </td>

                      <td className="px-4 py-4 font-mono text-sm text-white">
                        {row.current}
                      </td>

                      <td
                        className={`px-4 py-4 font-mono text-sm ${
                          row.up ? 'text-brand-green' : 'text-red-400'
                        }`}
                      >
                        {row.return}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                            row.status === 'Active'
                              ? 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                              : 'bg-brand-muted/10 text-brand-muted border border-brand-border'
                          }`}
                        >
                          {row.status === 'Active' && (
                            <span className="h-1 w-1 rounded-full bg-brand-green animate-pulse-dot" />
                          )}

                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'overview' && (
          <div className="rounded-xl border border-brand-border bg-brand-card p-8 text-center">
            <p className="font-sans text-sm text-brand-muted mb-6">
              Login to view your full portfolio overview and reporting.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setTab('deposit')}
                className="flex items-center gap-2 rounded-lg bg-brand-green px-5 py-2.5 font-display text-xs font-bold text-brand-dark hover:bg-brand-green/90 transition-colors"
              >
                <ArrowDownLeft className="h-3.5 w-3.5" />

                Deposit Funds
              </button>

              <button
                onClick={() => setTab('withdraw')}
                className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-dark px-5 py-2.5 font-display text-xs font-semibold text-brand-text hover:border-red-500/30 hover:text-red-400 transition-all"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />

                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}