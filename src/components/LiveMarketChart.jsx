'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────── 

// ─── Constants ─────────────────────────────────────────────────────────────────
const BASE = 148_250

const NGX_STOCKS = [
  { sym: 'DANGCEM', name: 'Dangote Cement',    price: 62850,  change: +1.20, volume: 3_200_000, sector: 'Industrials' },
  { sym: 'GTCO',    name: 'GT Holdings',        price: 5680,   change: +0.80, volume: 8_100_000, sector: 'Financials'  },
  { sym: 'ZENITH',  name: 'Zenith Bank',        price: 4230,   change: -0.40, volume: 6_500_000, sector: 'Financials'  },
  { sym: 'AIRTEL',  name: 'Airtel Africa',      price: 234000, change: +2.10, volume: 1_200_000, sector: 'Telecom'     },
  { sym: 'MTNN',    name: 'MTN Nigeria',        price: 29500,  change: -0.20, volume: 4_800_000, sector: 'Telecom'     },
  { sym: 'ACCESS',  name: 'Access Corp',        price: 2415,   change: +1.50, volume: 9_200_000, sector: 'Financials'  },
  { sym: 'UBA',     name: 'UBA',                price: 1980,   change: +0.30, volume: 7_300_000, sector: 'Financials'  },
  { sym: 'FBN',     name: 'FBN Holdings',       price: 1750,   change: -0.90, volume: 5_100_000, sector: 'Financials'  },
  { sym: 'SEPLAT',  name: 'Seplat Energy',      price: 34500,  change: +3.20, volume: 980_000,   sector: 'Energy'      },
  { sym: 'BUACEM',  name: 'BUA Cement',         price: 11800,  change: -0.60, volume: 2_300_000, sector: 'Industrials' },
  { sym: 'NESTLE',  name: 'Nestlé Nigeria',     price: 87000,  change: +0.40, volume: 320_000,   sector: 'Consumer'    },
  { sym: 'NB',      name: 'Nigerian Breweries', price: 2480,   change: -1.10, volume: 1_800_000, sector: 'Consumer'    },
]

const RANGE_CFG = {
  '1D':  { count: 96,  ms: 15*60*1000,      label: '15m' },
  '1W':  { count: 168, ms: 60*60*1000,       label: '1h'  },
  '1M':  { count: 120, ms: 6*60*60*1000,    label: '6h'  },
  '3M':  { count: 90,  ms: 24*60*60*1000,   label: '1D'  },
  '1Y':  { count: 52,  ms: 7*24*60*60*1000, label: '1W'  },
  'ALL': { count: 60,  ms: 30*24*60*60*1000,label: '1Mo' },
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function seedCandles(count, ms) {
  const now = Date.now(); const out = []; let p = BASE
  for (let i = count; i >= 0; i--) {
    const t = now - i * ms
    const open = p
    const chg = (Math.random() - 0.46) * p * 0.013
    const close = Math.max(p * 0.5, p + chg)
    const high = Math.max(open, close) * (1 + Math.random() * 0.004)
    const low  = Math.min(open, close) * (1 - Math.random() * 0.004)
    const volume = Math.floor(Math.random() * 1_500_000 + 300_000)
    out.push({ time: t, open, high, low, close, volume }); p = close
  }
  return out
}

function fmt(n) {
  return (n / 100).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function fmtVol(n) {
  if (n >= 1_000_000) return `${(n/1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n/1_000).toFixed(0)}K`
  return `${n}`
}
function fmtTime(ts) {
  return new Date(ts).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function genOrderBook(mid) {
  const spread = mid * 0.0004
  let bidTotal = 0, askTotal = 0
  const bids = Array.from({ length: 8 }, (_, i) => {
    const price = mid - spread - i * mid * 0.0002
    const qty = Math.floor(Math.random() * 50000 + 5000)
    bidTotal += qty
    return { price, qty, total: bidTotal }
  })
  const asks = Array.from({ length: 8 }, (_, i) => {
    const price = mid + spread + i * mid * 0.0002
    const qty = Math.floor(Math.random() * 50000 + 5000)
    askTotal += qty
    return { price, qty, total: askTotal }
  })
  return { bids, asks }
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function OrderBook({ mid }) {
  const [book, setBook] = useState(() => genOrderBook(mid))
  useEffect(() => {
    const id = setInterval(() => setBook(genOrderBook(mid)), 1800)
    return () => clearInterval(id)
  }, [mid])
  const maxTotal = Math.max(book.bids[book.bids.length-1]?.total ?? 1, book.asks[book.asks.length-1]?.total ?? 1)
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
      <div className="px-4 py-3 border-b border-brand-border/50 flex items-center gap-2">
        <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">Order Book</span>
        <span className="ml-auto font-mono text-[10px] text-brand-muted">₦{fmt(mid)}</span>
      </div>
      <div className="px-4 py-2">
        <div className="grid grid-cols-3 mb-1">
          {['Price (₦)', 'Size', 'Total'].map(h => (
            <span key={h} className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">{h}</span>
          ))}
        </div>
        {/* Asks (reversed — lowest ask at top) */}
        {[...book.asks].reverse().map((row, i) => (
          <div key={i} className="relative grid grid-cols-3 py-0.5">
            <div className="absolute inset-0 right-0 bg-red-400/8 rounded-sm"
              style={{ width: `${(row.total / maxTotal) * 100}%`, marginLeft: 'auto' }} />
            <span className="font-mono text-[10px] text-red-400 relative z-10">{fmt(row.price)}</span>
            <span className="font-mono text-[10px] text-brand-text relative z-10">{fmtVol(row.qty)}</span>
            <span className="font-mono text-[10px] text-brand-muted relative z-10">{fmtVol(row.total)}</span>
          </div>
        ))}
        {/* Spread */}
        <div className="my-1 py-1 border-y border-brand-border/30 flex items-center justify-between">
          <span className="font-mono text-[9px] text-brand-muted">Spread</span>
          <span className="font-mono text-[9px] text-brand-green">{((book.asks[0]?.price - book.bids[0]?.price) / 100).toFixed(2)}</span>
        </div>
        {/* Bids */}
        {book.bids.map((row, i) => (
          <div key={i} className="relative grid grid-cols-3 py-0.5">
            <div className="absolute inset-0 bg-brand-green/8 rounded-sm"
              style={{ width: `${(row.total / maxTotal) * 100}%` }} />
            <span className="font-mono text-[10px] text-brand-green relative z-10">{fmt(row.price)}</span>
            <span className="font-mono text-[10px] text-brand-text relative z-10">{fmtVol(row.qty)}</span>
            <span className="font-mono text-[10px] text-brand-muted relative z-10">{fmtVol(row.total)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TradeFeed({ price }) {
  const [trades, setTrades] = useState([])
  const idRef = useRef(0)
  useEffect(() => {
    // Seed initial trades
    const now = Date.now()
    const initial = Array.from({ length: 12 }, (_, i) => ({
      id: idRef.current++,
      price: price * (1 + (Math.random() - 0.5) * 0.002),
      qty: Math.floor(Math.random() * 10000 + 500),
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      time: now - (12 - i) * 3000
    }))
    setTrades(initial)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const id = setInterval(() => {
      const newTrade = {
        id: idRef.current++,
        price: price * (1 + (Math.random() - 0.5) * 0.0015),
        qty: Math.floor(Math.random() * 15000 + 200),
        side: Math.random() > 0.48 ? 'buy' : 'sell',
        time: Date.now()
      }
      setTrades(t => [newTrade, ...t.slice(0, 19)])
    }, 1200)
    return () => clearInterval(id)
  }, [price])

  return (
    <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
      <div className="px-4 py-3 border-b border-brand-border/50 flex items-center gap-2">
        <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">Recent Trades</span>
      </div>
      <div className="px-4 py-2">
        <div className="grid grid-cols-3 mb-1">
          {['Price (₦)', 'Size', 'Time'].map(h => (
            <span key={h} className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">{h}</span>
          ))}
        </div>
        <div className="space-y-0.5 max-h-48 overflow-hidden">
          {trades.map((tr, i) => (
            <div key={tr.id} className={`grid grid-cols-3 py-0.5 transition-opacity ${i === 0 ? 'animate-fade-in' : ''}`}>
              <span className={`font-mono text-[10px] ${tr.side === 'buy' ? 'text-brand-green' : 'text-red-400'}`}>
                {fmt(tr.price)}
              </span>
              <span className="font-mono text-[10px] text-brand-text">{fmtVol(tr.qty)}</span>
              <span className="font-mono text-[10px] text-brand-muted">{fmtTime(tr.time)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NGXBoard({ stocks }) {
  const [selected, setSelected] = useState('DANGCEM')
  const sel = stocks.find(s => s.sym === selected) ?? stocks[0]
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
      <div className="px-4 py-3 border-b border-brand-border/50 flex items-center gap-2">
        <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">NGX Live Board</span>
        <span className="ml-auto font-mono text-[9px] text-brand-muted">12 securities</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-brand-border/30">
              {['Symbol', 'Name', 'Price', 'Chg%', 'Volume'].map(h => (
                <th key={h} className="text-left px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-brand-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map(s => {
              const up = s.change >= 0
              return (
                <tr
                  key={s.sym}
                  onClick={() => setSelected(s.sym)}
                  className={`border-b border-brand-border/20 cursor-pointer transition-colors ${selected === s.sym ? 'bg-brand-green/5' : 'hover:bg-brand-dark/50'}`}
                >
                  <td className="px-4 py-2">
                    <span className={`font-mono text-[10px] font-bold ${selected === s.sym ? 'text-brand-green' : 'text-white'}`}>{s.sym}</span>
                  </td>
                  <td className="px-4 py-2 font-sans text-[11px] text-brand-muted">{s.name}</td>
                  <td className="px-4 py-2 font-mono text-[10px] text-white">₦{fmt(s.price)}</td>
                  <td className={`px-4 py-2 font-mono text-[10px] ${up ? 'text-brand-green' : 'text-red-400'}`}>
                    {up ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 font-mono text-[10px] text-brand-muted">{fmtVol(s.volume)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {/* Selected stock detail */}
      <div className="border-t border-brand-border/50 px-4 py-3 grid grid-cols-3 gap-3">
        {[
          { label: 'Selected', value: sel.sym },
          { label: 'Sector', value: sel.sector },
          { label: 'Vol', value: fmtVol(sel.volume) },
        ].map(({ label, value }) => (
          <div key={label}>
            <div className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">{label}</div>
            <div className="font-mono text-[11px] text-white">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Chart ────────────────────────────────────────────────────────────────
export default function LiveMarketChart({ compact = false }) {
  const [range, setRange]         = useState('1D')
  const [chartType, setChartType] = useState('area')
  const [candles, setCandles]     = useState([])
  const [livePrice, setLivePrice] = useState(BASE)
  const [prevPrice, setPrevPrice] = useState(BASE)
  const [hovered, setHovered]     = useState(null)
  const [mouseX, setMouseX]       = useState(null)
  const [stocks, setStocks]       = useState(NGX_STOCKS)
  const svgRef = useRef(null)

  const W = 700; const H = 220; const PAD = 28

  // Seed candles on range change
  useEffect(() => {
    const cfg = RANGE_CFG[range]
    const c = seedCandles(cfg.count, cfg.ms)
    setCandles(c)
    const last = c[c.length - 1].close
    setLivePrice(last); setPrevPrice(c[c.length - 2]?.close ?? last)
  }, [range])

  // Live tick every 1.4s
  useEffect(() => {
    const id = setInterval(() => {
      setLivePrice(prev => {
        const drift = (Math.random() - 0.47) * prev * 0.0016
        const next = Math.max(prev * 0.5, prev + drift)
        setPrevPrice(prev)
        setCandles(c => {
          if (!c.length) return c
          const updated = [...c]
          const last = updated[updated.length - 1]
          updated[updated.length - 1] = { ...last, close: next, high: Math.max(last.high, next), low: Math.min(last.low, next) }
          return updated
        })
        return next
      })
      setStocks(s => s.map(st => ({
        ...st,
        price: Math.max(100, st.price + (Math.random() - 0.5) * st.price * 0.0018),
        change: parseFloat((st.change + (Math.random() - 0.5) * 0.06).toFixed(2)),
        volume: Math.max(0, st.volume + Math.floor((Math.random() - 0.4) * 50000)),
      })))
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const openPrice = candles[0]?.close ?? livePrice
  const change = livePrice - openPrice
  const changePct = (change / openPrice) * 100
  const isUp = change >= 0

  // Price scale
  const prices = candles.map(c => c.close)
  const minP = Math.min(...prices, livePrice) * 0.998
  const maxP = Math.max(...prices, livePrice) * 1.002
  const rangeP = maxP - minP || 1
  const priceToY = (p) => H - PAD - ((p - minP) / rangeP) * (H - PAD * 2)
  const indexToX = (i) => PAD + (i / (candles.length - 1)) * (W - PAD * 2)

  // Paths
  const linePath = candles.length > 1
    ? candles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${indexToX(i).toFixed(1)} ${priceToY(c.close).toFixed(1)}`).join(' ')
    : ''
  const areaPath = linePath
    ? `${linePath} L ${(W - PAD).toFixed(1)} ${(H - PAD).toFixed(1)} L ${PAD.toFixed(1)} ${(H - PAD).toFixed(1)} Z`
    : ''

  const liveDotX = W - PAD
  const liveDotY = priceToY(livePrice)

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || !candles.length) return
    const relX = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.max(0, Math.min(candles.length - 1, Math.round(((relX - PAD) / (W - PAD * 2)) * (candles.length - 1))))
    setHovered(candles[idx]); setMouseX(relX)
  }, [candles])

  // Candle width
  const candleW = Math.max(1, Math.min(8, (W - PAD * 2) / candles.length - 1))

  const displayed = hovered ?? candles[candles.length - 1]

  return (
    <div className="space-y-4">
      {/* ── Main chart card ── */}
      <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-brand-border/40">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">FGC Growth Index · LIVE</span>
              </div>
              <div className="flex items-end gap-3 flex-wrap">
                <span className={`font-display text-3xl font-extrabold transition-colors duration-200 ${isUp ? 'text-white' : 'text-red-300'}`}>
                  ₦{fmt(livePrice)}
                </span>
                <span className={`font-mono text-sm mb-1 ${isUp ? 'text-brand-green' : 'text-red-400'}`}>
                  {isUp ? '▲' : '▼'} ₦{fmt(Math.abs(change))} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                </span>
              </div>
              {/* OHLCV bar */}
              {displayed && (
                <div className="mt-1.5 flex gap-3 flex-wrap">
                  {[
                    ['O', fmt(displayed.open)],
                    ['H', fmt(displayed.high)],
                    ['L', fmt(displayed.low)],
                    ['C', fmt(displayed.close)],
                    ['Vol', fmtVol(displayed.volume)],
                  ].map(([l, v]) => (
                    <span key={l} className="font-mono text-[9px]">
                      <span className="text-brand-muted">{l} </span>
                      <span className="text-brand-text">{l === 'Vol' ? v : `₦${v}`}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              {/* Chart */}
              <div className="flex gap-1 rounded-lg border border-brand-border bg-brand-dark p-0.5">
                {(['area', 'line', 'candle']).map(t => (
                  <button key={t} onClick={() => setChartType(t)}
                    className={`rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-all ${chartType === t ? 'bg-brand-green/20 text-brand-green' : 'text-brand-muted hover:text-brand-text'}`}>
                    {t}
                  </button>
                ))}
              </div>
              {/* Range */}
              <div className="flex gap-1">
                {(Object.keys(RANGE_CFG)).map(r => (
                  <button key={r} onClick={() => setRange(r)}
                    className={`rounded px-2 py-1 font-mono text-[9px] transition-all border ${range === r ? 'bg-brand-green/20 text-brand-green border-brand-green/40' : 'text-brand-muted border-transparent hover:text-brand-text'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SVG */}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          style={{ height: compact ? '160px' : '200px' }}
          preserveAspectRatio="none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { setHovered(null); setMouseX(null) }}
        >
          <defs>
            <linearGradient id="lgUp2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lgDn2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </linearGradient>
            <clipPath id="cc">
              <rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} />
            </clipPath>
          </defs>

          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map(t => {
            const y = PAD + t * (H - PAD * 2)
            const p = maxP - t * rangeP
            return (
              <g key={t}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#1E2D22" strokeWidth="0.8" />
                <text x={2} y={y + 3} fontSize="7" fill="#3A5242" fontFamily="monospace">₦{fmt(p)}</text>
              </g>
            )
          })}

          {/* AREA mode */}
          {chartType === 'area' && areaPath && (
            <>
              <path d={areaPath} fill={isUp ? 'url(#lgUp2)' : 'url(#lgDn2)'} clipPath="url(#cc)" />
              <path d={linePath} fill="none" stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="1.8" clipPath="url(#cc)" className="chart-line" />
            </>
          )}

          {/* LINE mode */}
          {chartType === 'line' && linePath && (
            <path d={linePath} fill="none" stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="1.8" clipPath="url(#cc)" className="chart-line" />
          )}

          {/* CANDLE mode */}
          {chartType === 'candle' && candles.map((c, i) => {
            const x = indexToX(i)
            const openY = priceToY(c.open); const closeY = priceToY(c.close)
            const highY = priceToY(c.high);  const lowY  = priceToY(c.low)
            const up = c.close >= c.open
            const col = up ? '#00FF85' : '#f87171'
            const bodyTop = Math.min(openY, closeY)
            const bodyH = Math.max(1, Math.abs(closeY - openY))
            return (
              <g key={i} clipPath="url(#cc)">
                {/* Wick */}
                <line x1={x} y1={highY} x2={x} y2={lowY} stroke={col} strokeWidth="0.8" strokeOpacity="0.7" />
                {/* Body */}
                <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH} fill={up ? col : 'transparent'} stroke={col} strokeWidth="0.8" rx="0.5" />
              </g>
            )
          })}

          {/* Crosshair */}
          {mouseX !== null && hovered && (
            <>
              <line x1={mouseX} y1={PAD} x2={mouseX} y2={H - PAD} stroke="#3A5242" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1={PAD} y1={priceToY(hovered.close)} x2={W - PAD} y2={priceToY(hovered.close)} stroke="#3A5242" strokeWidth="0.8" strokeDasharray="3,3" />
              <circle cx={mouseX} cy={priceToY(hovered.close)} r="3.5" fill={isUp ? '#00FF85' : '#f87171'} stroke="#0A0F0D" strokeWidth="1.5" />
            </>
          )}

          {/* Live dot */}
          <circle cx={liveDotX} cy={liveDotY} r="6" fill={isUp ? '#00FF85' : '#f87171'} opacity="0.2" className="animate-ping" style={{ transformOrigin: `${liveDotX}px ${liveDotY}px` }} />
          <circle cx={liveDotX} cy={liveDotY} r="3" fill={isUp ? '#00FF85' : '#f87171'} />
          <line x1={PAD} y1={liveDotY} x2={W - PAD} y2={liveDotY} stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4,3" />
        </svg>

        {/* Volume bars */}
        <div className="px-5 pb-3">
          <div className="flex items-end gap-px h-8">
            {candles.slice(-80).map((c, i) => {
              const vols = candles.slice(-80).map(x => x.volume)
              const maxVol = Math.max(...vols)
              return (
                <div key={i} className={`flex-1 rounded-t-sm ${c.close >= c.open ? 'bg-brand-green/25' : 'bg-red-400/20'}`}
                  style={{ height: `${Math.max(3, (c.volume / maxVol) * 100)}%` }} />
              )
            })}
          </div>
          <div className="font-mono text-[8px] text-brand-muted mt-0.5">VOLUME</div>
        </div>

        {/* Market summary bar */}
        <div className="border-t border-brand-border/40 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Open',     value: `₦${fmt(openPrice)}` },
            { label: 'High',     value: `₦${fmt(Math.max(...prices, livePrice))}` },
            { label: 'Low',      value: `₦${fmt(Math.min(...prices, livePrice))}` },
            { label: 'Volume',   value: fmtVol(candles.reduce((a, c) => a + c.volume, 0)) },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">{label}</div>
              <div className="font-mono text-xs text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom panels (hidden in compact mode) ── */}
      {!compact && (
        <>
          {/* Order book + Trade feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <OrderBook mid={livePrice} />
            <TradeFeed price={livePrice} />
          </div>

          {/* NGX Board */}
          <NGXBoard stocks={stocks} />
        </>
      )}
    </div>
  )
}
