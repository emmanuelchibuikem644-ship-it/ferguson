'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Market Data ───────────────────────────────────────────────────────────────

const MARKETS = {
  'US': {
    label: 'United States', flag: '🇺🇸', exchange: 'NYSE / NASDAQ',
    securities: [
      { sym: 'AAPL',  name: 'Apple Inc.',         price: 22845, change: +1.24, volume: 58_200_000, sector: 'Technology',   currency: '$' },
      { sym: 'MSFT',  name: 'Microsoft Corp.',     price: 41380, change: +0.87, volume: 22_100_000, sector: 'Technology',   currency: '$' },
      { sym: 'NVDA',  name: 'NVIDIA Corp.',        price: 87620, change: +3.41, volume: 41_500_000, sector: 'Semiconductors',currency: '$' },
      { sym: 'GOOGL', name: 'Alphabet Inc.',       price: 17250, change: -0.31, volume: 19_800_000, sector: 'Technology',   currency: '$' },
      { sym: 'AMZN',  name: 'Amazon.com Inc.',     price: 18940, change: +1.66, volume: 31_200_000, sector: 'Consumer',     currency: '$' },
      { sym: 'META',  name: 'Meta Platforms',      price: 51230, change: +2.10, volume: 16_700_000, sector: 'Technology',   currency: '$' },
      { sym: 'TSLA',  name: 'Tesla Inc.',          price: 17480, change: -1.82, volume: 89_300_000, sector: 'Auto/Energy',  currency: '$' },
      { sym: 'BRK.B', name: 'Berkshire Hathaway',  price: 43620, change: +0.44, volume: 3_200_000,  sector: 'Financials',   currency: '$' },
      { sym: 'JPM',   name: 'JPMorgan Chase',      price: 23180, change: +0.92, volume: 9_800_000,  sector: 'Financials',   currency: '$' },
      { sym: 'V',     name: 'Visa Inc.',           price: 27930, change: +0.61, volume: 6_100_000,  sector: 'Financials',   currency: '$' },
    ]
  },
  'EU': {
    label: 'Europe', flag: '🇪🇺', exchange: 'LSE / EURONEXT',
    securities: [
      { sym: 'SHEL',  name: 'Shell PLC',           price: 2847,  change: +0.73, volume: 14_200_000, sector: 'Energy',       currency: '£' },
      { sym: 'HSBA',  name: 'HSBC Holdings',       price: 812,   change: -0.28, volume: 28_500_000, sector: 'Financials',   currency: '£' },
      { sym: 'AZN',   name: 'AstraZeneca',         price: 12480, change: +1.34, volume: 3_100_000,  sector: 'Healthcare',   currency: '£' },
      { sym: 'ULVR',  name: 'Unilever PLC',        price: 4230,  change: +0.19, volume: 7_800_000,  sector: 'Consumer',     currency: '£' },
      { sym: 'BP',    name: 'BP PLC',              price: 478,   change: -0.92, volume: 42_600_000, sector: 'Energy',       currency: '£' },
      { sym: 'SAP',   name: 'SAP SE',              price: 19840, change: +1.67, volume: 2_300_000,  sector: 'Technology',   currency: '€' },
      { sym: 'ASML',  name: 'ASML Holding',        price: 68920, change: +2.88, volume: 890_000,    sector: 'Semiconductors',currency: '€' },
      { sym: 'LVMH',  name: 'LVMH Moët Hennessy', price: 71350, change: -0.54, volume: 620_000,    sector: 'Luxury',       currency: '€' },
      { sym: 'SIE',   name: 'Siemens AG',          price: 18760, change: +0.82, volume: 1_800_000,  sector: 'Industrials',  currency: '€' },
      { sym: 'NESN',  name: 'Nestlé SA',           price: 8950,  change: -0.17, volume: 4_200_000,  sector: 'Consumer',     currency: 'CHF' },
    ]
  },
  'ASIA': {
    label: 'Asia Pacific', flag: '🌏', exchange: 'TSE / HKEx / SGX',
    securities: [
      { sym: '7203',  name: 'Toyota Motor Corp.',  price: 2980,  change: +1.12, volume: 8_900_000,  sector: 'Auto',         currency: '¥' },
      { sym: '9984',  name: 'SoftBank Group',      price: 8740,  change: -0.63, volume: 6_200_000,  sector: 'Technology',   currency: '¥' },
      { sym: '9988',  name: 'Alibaba Group',       price: 8420,  change: +2.34, volume: 18_400_000, sector: 'Technology',   currency: 'HK$' },
      { sym: '0700',  name: 'Tencent Holdings',    price: 38650, change: +1.87, volume: 12_700_000, sector: 'Technology',   currency: 'HK$' },
      { sym: '005930',name: 'Samsung Electronics', price: 78400, change: -0.38, volume: 9_300_000,  sector: 'Technology',   currency: '₩' },
      { sym: 'D05',   name: 'DBS Group Holdings',  price: 3842,  change: +0.54, volume: 2_100_000,  sector: 'Financials',   currency: 'S$' },
      { sym: 'RELIANCE',name:'Reliance Industries',price: 2945,  change: +0.91, volume: 7_600_000,  sector: 'Conglomerate', currency: '₹' },
      { sym: 'TCS',   name: 'Tata Consultancy',    price: 3780,  change: +1.43, volume: 3_400_000,  sector: 'Technology',   currency: '₹' },
    ]
  },
  'AFRICA': {
    label: 'Africa', flag: '🌍', exchange: 'NGX / JSE / NSE',
    securities: [
      { sym: 'DANGCEM',name:'Dangote Cement',      price: 62850, change: +1.20, volume: 3_200_000,  sector: 'Industrials',  currency: '₦' },
      { sym: 'GTCO',   name:'GT Holdings',         price: 5680,  change: +0.80, volume: 8_100_000,  sector: 'Financials',   currency: '₦' },
      { sym: 'ZENITH', name:'Zenith Bank',         price: 4230,  change: -0.40, volume: 6_500_000,  sector: 'Financials',   currency: '₦' },
      { sym: 'AIRTEL', name:'Airtel Africa',       price: 234000,change: +2.10, volume: 1_200_000,  sector: 'Telecom',      currency: '₦' },
      { sym: 'NPN',    name:'Naspers Ltd.',        price: 298450,change: +1.56, volume: 680_000,    sector: 'Technology',   currency: 'R' },
      { sym: 'GLD',    name:'Gold Fields Ltd.',    price: 24780, change: +0.83, volume: 3_400_000,  sector: 'Mining',       currency: 'R' },
      { sym: 'MTN',    name:'MTN Group Ltd.',      price: 13640, change: -0.45, volume: 5_200_000,  sector: 'Telecom',      currency: 'R' },
      { sym: 'EQT',    name:'Equity Group (KE)',   price: 4820,  change: +1.10, volume: 2_800_000,  sector: 'Financials',   currency: 'KSh' },
    ]
  },
  'CRYPTO': {
    label: 'Crypto', flag: '₿', exchange: 'Global 24/7',
    securities: [
      { sym: 'BTC',   name: 'Bitcoin',             price: 9654320,change: +2.84, volume: 28_400_000_000, sector: 'Layer 1',  currency: '$' },
      { sym: 'ETH',   name: 'Ethereum',            price: 363480, change: +3.12, volume: 14_200_000_000, sector: 'Layer 1',  currency: '$' },
      { sym: 'BNB',   name: 'BNB Chain',           price: 59840,  change: +1.44, volume: 1_800_000_000,  sector: 'Exchange', currency: '$' },
      { sym: 'SOL',   name: 'Solana',              price: 17280,  change: +4.67, volume: 3_200_000_000,  sector: 'Layer 1',  currency: '$' },
      { sym: 'XRP',   name: 'XRP',                 price: 234,    change: -0.82, volume: 4_100_000_000,  sector: 'Payments', currency: '$' },
      { sym: 'ADA',   name: 'Cardano',             price: 48,     change: +1.21, volume: 620_000_000,    sector: 'Layer 1',  currency: '$' },
      { sym: 'AVAX',  name: 'Avalanche',           price: 3820,   change: +2.94, volume: 890_000_000,    sector: 'Layer 1',  currency: '$' },
      { sym: 'DOT',   name: 'Polkadot',            price: 782,    change: -1.34, volume: 340_000_000,    sector: 'Layer 0',  currency: '$' },
    ]
  },
  'FOREX': {
    label: 'Forex', flag: '💱', exchange: 'OTC / FX Markets',
    securities: [
      { sym: 'EUR/USD',name:'Euro / US Dollar',    price: 10924,  change: +0.12, volume: 612_000_000_000,sector: 'Major',    currency: '' },
      { sym: 'GBP/USD',name:'British Pound / USD', price: 12841,  change: -0.08, volume: 284_000_000_000,sector: 'Major',    currency: '' },
      { sym: 'USD/JPY',name:'US Dollar / Yen',     price: 15423,  change: +0.31, volume: 578_000_000_000,sector: 'Major',    currency: '' },
      { sym: 'USD/NGN',name:'US Dollar / Naira',   price: 164800, change: +0.04, volume: 1_200_000_000,  sector: 'Africa',   currency: '' },
      { sym: 'GBP/NGN',name:'British Pound / NGN', price: 213400, change: -0.11, volume: 480_000_000,    sector: 'Africa',   currency: '' },
      { sym: 'USD/ZAR',name:'US Dollar / Rand',    price: 18650,  change: +0.22, volume: 24_000_000_000, sector: 'Africa',   currency: '' },
      { sym: 'USD/KES',name:'US Dollar / KSh',     price: 12850,  change: +0.09, volume: 860_000_000,    sector: 'Africa',   currency: '' },
      { sym: 'XAU/USD',name:'Gold / US Dollar',    price: 231840, change: +0.67, volume: 0,              sector: 'Commodity',currency: '' },
    ]
  },
  'COMMODITIES': {
    label: 'Commodities', flag: '🛢️', exchange: 'CME / ICE / LME',
    securities: [
      { sym: 'GOLD',  name: 'Gold (XAU)',           price: 231840, change: +0.67, volume: 142_000,    sector: 'Precious Metals',currency: '$' },
      { sym: 'SILVER',name: 'Silver (XAG)',          price: 2748,   change: +1.23, volume: 384_000,    sector: 'Precious Metals',currency: '$' },
      { sym: 'OIL',   name: 'Crude Oil (WTI)',       price: 7824,   change: -0.94, volume: 412_000,    sector: 'Energy',    currency: '$' },
      { sym: 'BRENT', name: 'Brent Crude',           price: 8136,   change: -0.78, volume: 298_000,    sector: 'Energy',    currency: '$' },
      { sym: 'NATGAS',name: 'Natural Gas',           price: 368,    change: +2.14, volume: 178_000,    sector: 'Energy',    currency: '$' },
      { sym: 'COPPER',name: 'Copper (HG)',           price: 468,    change: +1.42, volume: 89_000,     sector: 'Base Metals',currency: '$' },
      { sym: 'WHEAT', name: 'Wheat (CBOT)',          price: 584,    change: -0.36, volume: 62_000,     sector: 'Agriculture',currency: '$' },
      { sym: 'COCOA', name: 'Cocoa (ICE)',           price: 8420,   change: +3.21, volume: 24_000,     sector: 'Agriculture',currency: '$' },
    ]
  }
}

const RANGE_CFG = {
  '1D':  { count: 96,  ms: 15*60*1000,       label: '15m' },
  '1W':  { count: 168, ms: 60*60*1000,        label: '1h'  },
  '1M':  { count: 120, ms: 6*60*60*1000,     label: '6h'  },
  '3M':  { count: 90,  ms: 24*60*60*1000,    label: '1D'  },
  '1Y':  { count: 52,  ms: 7*24*60*60*1000,  label: '1W'  },
  'ALL': { count: 60,  ms: 30*24*60*60*1000, label: '1Mo' },
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function seedCandles(count, ms, base) {
  const now = Date.now(); const out = []; let p = base
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

function fmtPrice(n, currency) {
  const val = n / 100
  if (val >= 1000) return `${currency}${val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (val >= 1) return `${currency}${val.toFixed(2)}`
  return `${currency}${val.toFixed(4)}`
}

function fmtVol(n) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

// ─── Market Indices Bar ────────────────────────────────────────────────────────
const INDICES = [
  { name: 'S&P 500',   value: '5,842.47',  change: '+0.84%',  up: true  },
  { name: 'NASDAQ',    value: '18,963.12', change: '+1.24%',  up: true  },
  { name: 'DOW',       value: '42,418.30', change: '+0.31%',  up: true  },
  { name: 'FTSE 100',  value: '8,614.73',  change: '-0.18%',  up: false },
  { name: 'DAX',       value: '18,492.80', change: '+0.62%',  up: true  },
  { name: 'NIKKEI 225',value: '38,281.45', change: '+0.47%',  up: true  },
  { name: 'HANG SENG', value: '18,746.30', change: '+1.91%',  up: true  },
  { name: 'NGX ASI',   value: '98,724.60', change: '+0.55%',  up: true  },
  { name: 'JSE TOP 40',value: '72,381.20', change: '-0.29%',  up: false },
  { name: 'BTC/USD',   value: '$96,543',   change: '+2.84%',  up: true  },
  { name: 'EUR/USD',   value: '1.0924',    change: '+0.12%',  up: true  },
  { name: 'GOLD',      value: '$2,318',    change: '+0.67%',  up: true  },
  { name: 'OIL (WTI)', value: '$78.24',    change: '-0.94%',  up: false },
]

function IndicesBar() {
  const doubled = [...INDICES, ...INDICES]
  return (
    <div className="border-b border-brand-border/40 bg-brand-dark/60 overflow-hidden">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-r border-brand-border bg-brand-card/80 z-10">
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-brand-green whitespace-nowrap">Global Indices</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex whitespace-nowrap">
            {doubled.map((idx, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-2 border-r border-brand-border/20">
                <span className="font-mono text-[10px] text-brand-muted">{idx.name}</span>
                <span className="font-mono text-[10px] font-medium text-white">{idx.value}</span>
                <span className={`font-mono text-[10px] ${idx.up ? 'text-brand-green' : 'text-red-400'}`}>
                  {idx.up ? '▲' : '▼'} {idx.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Market Board ──────────────────────────────────────────────────────────────
function MarketBoard({ activeMarket, securities, onSelectSecurity, selectedSym }) {
  const [liveSecurities, setLiveSecurities] = useState(securities)

  useEffect(() => {
    setLiveSecurities(securities)
  }, [activeMarket, securities])

  useEffect(() => {
    const id = setInterval(() => {
      setLiveSecurities(prev => prev.map(s => ({
        ...s,
        price: Math.max(1, s.price + (Math.random() - 0.5) * s.price * 0.0014),
        change: parseFloat((s.change + (Math.random() - 0.5) * 0.04).toFixed(2)),
        volume: Math.max(0, s.volume + Math.floor((Math.random() - 0.4) * s.volume * 0.01)),
      })))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-brand-border/40">
              {['Symbol', 'Name', 'Price', 'Change', 'Volume', 'Sector'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 font-mono text-[9px] uppercase tracking-widest text-brand-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {liveSecurities.map(s => {
              const up = s.change >= 0
              const isSelected = s.sym === selectedSym
              return (
                <tr
                  key={s.sym}
                  onClick={() => onSelectSecurity(s)}
                  className={`border-b border-brand-border/20 cursor-pointer transition-colors ${isSelected ? 'bg-brand-green/5 border-l-2 border-l-brand-green' : 'hover:bg-brand-dark/60'}`}
                >
                  <td className="px-4 py-2.5">
                    <span className={`font-mono text-[11px] font-bold ${isSelected ? 'text-brand-green' : 'text-white'}`}>{s.sym}</span>
                  </td>
                  <td className="px-4 py-2.5 font-sans text-[11px] text-brand-muted max-w-[140px] truncate">{s.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-white">{fmtPrice(s.price, s.currency)}</td>
                  <td className={`px-4 py-2.5 font-mono text-[11px] font-medium ${up ? 'text-brand-green' : 'text-red-400'}`}>
                    {up ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-brand-muted">{fmtVol(s.volume)}</td>
                  <td className="px-4 py-2.5">
                    <span className="rounded-sm border border-brand-border/60 bg-brand-dark px-1.5 py-0.5 font-mono text-[9px] text-brand-muted">{s.sector}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LiveMarketChart({ compact = false }) {
  const [activeMarket, setActiveMarket] = useState('US')
  const [range, setRange] = useState('1D')
  const [chartType, setChartType] = useState('area')
  const [candles, setCandles] = useState([])
  const [livePrice, setLivePrice] = useState(0)
  const [prevPrice, setPrevPrice] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [mouseX, setMouseX] = useState(null)
  const [selectedSecurity, setSelectedSecurity] = useState(null)
  const svgRef = useRef(null)

  const W = 700; const H = 220; const PAD = 32

  const market = MARKETS[activeMarket]
  const security = selectedSecurity ?? market.securities[0]

  // Re-seed when market or range changes
  useEffect(() => {
    const sec = MARKETS[activeMarket].securities[0]
    setSelectedSecurity(sec)
  }, [activeMarket])

  useEffect(() => {
    if (!security) return
    const cfg = RANGE_CFG[range]
    const c = seedCandles(cfg.count, cfg.ms, security.price)
    setCandles(c)
    const last = c[c.length - 1].close
    setLivePrice(last); setPrevPrice(c[c.length - 2]?.close ?? last)
  }, [security?.sym, range])

  // Live tick
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
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const openPrice = candles[0]?.close ?? livePrice
  const change = livePrice - openPrice
  const changePct = openPrice ? (change / openPrice) * 100 : 0
  const isUp = change >= 0

  const prices = candles.map(c => c.close)
  const minP = Math.min(...prices, livePrice) * 0.998
  const maxP = Math.max(...prices, livePrice) * 1.002
  const rangeP = maxP - minP || 1
  const priceToY = p => H - PAD - ((p - minP) / rangeP) * (H - PAD * 2)
  const indexToX = i => PAD + (i / Math.max(1, candles.length - 1)) * (W - PAD * 2)

  const linePath = candles.length > 1
    ? candles.map((c, i) => `${i === 0 ? 'M' : 'L'} ${indexToX(i).toFixed(1)} ${priceToY(c.close).toFixed(1)}`).join(' ')
    : ''
  const areaPath = linePath
    ? `${linePath} L ${(W - PAD).toFixed(1)} ${(H - PAD).toFixed(1)} L ${PAD.toFixed(1)} ${(H - PAD).toFixed(1)} Z`
    : ''

  const liveDotX = W - PAD
  const liveDotY = priceToY(livePrice)
  const candleW = Math.max(1, Math.min(8, (W - PAD * 2) / candles.length - 1))

  const handleMouseMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || !candles.length) return
    const relX = ((e.clientX - rect.left) / rect.width) * W
    const idx = Math.max(0, Math.min(candles.length - 1, Math.round(((relX - PAD) / (W - PAD * 2)) * (candles.length - 1))))
    setHovered(candles[idx]); setMouseX(relX)
  }, [candles])

  const displayed = hovered ?? candles[candles.length - 1]
  const curr = security?.currency ?? '$'
  const mktKeys = Object.keys(MARKETS)

  return (
    <div className="space-y-4">
      {/* ── Global indices ticker ── */}
      <IndicesBar />

      {/* ── Market selector tabs ── */}
      <div className="flex flex-wrap gap-2">
        {mktKeys.map(key => {
          const m = MARKETS[key]
          const active = activeMarket === key
          return (
            <button
              key={key}
              onClick={() => setActiveMarket(key)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 font-display text-xs font-semibold transition-all ${
                active
                  ? 'border-brand-green/50 bg-brand-green/10 text-brand-green'
                  : 'border-brand-border bg-brand-card text-brand-muted hover:border-brand-green/30 hover:text-brand-text'
              }`}
            >
              <span className="text-sm">{m.flag}</span>
              <span>{m.label}</span>
              {active && <span className="animate-pulse-dot inline-block h-1 w-1 rounded-full bg-brand-green ml-0.5" />}
            </button>
          )
        })}
      </div>

      {/* ── Chart card ── */}
      <div className="rounded-xl border border-brand-border bg-brand-card overflow-hidden">
        {/* Chart header */}
        <div className="px-5 pt-5 pb-3 border-b border-brand-border/40">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-green">
                  {market.flag} {market.exchange} · LIVE
                </span>
                <span className="rounded border border-brand-border px-1.5 py-0.5 font-mono text-[9px] text-brand-muted">
                  {security?.sym}
                </span>
              </div>
              <div className="flex items-end gap-3 flex-wrap">
                <span className={`font-display text-3xl font-extrabold transition-colors duration-200 ${isUp ? 'text-white' : 'text-red-300'}`}>
                  {fmtPrice(livePrice, curr)}
                </span>
                <span className={`font-mono text-sm mb-1 ${isUp ? 'text-brand-green' : 'text-red-400'}`}>
                  {isUp ? '▲' : '▼'} {fmtPrice(Math.abs(change), curr)} ({isUp ? '+' : ''}{changePct.toFixed(2)}%)
                </span>
              </div>
              {displayed && (
                <div className="mt-1.5 flex gap-3 flex-wrap">
                  {[
                    ['O', fmtPrice(displayed.open, curr)],
                    ['H', fmtPrice(displayed.high, curr)],
                    ['L', fmtPrice(displayed.low, curr)],
                    ['C', fmtPrice(displayed.close, curr)],
                    ['Vol', fmtVol(displayed.volume)],
                  ].map(([l, v]) => (
                    <span key={l} className="font-mono text-[9px]">
                      <span className="text-brand-muted">{l} </span>
                      <span className="text-brand-text">{v}</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-1.5 font-sans text-xs text-brand-muted">{security?.name} · {security?.sector}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1 rounded-lg border border-brand-border bg-brand-dark p-0.5">
                {['area', 'line', 'candle'].map(t => (
                  <button key={t} onClick={() => setChartType(t)}
                    className={`rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-widest transition-all ${chartType === t ? 'bg-brand-green/20 text-brand-green' : 'text-brand-muted hover:text-brand-text'}`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                {Object.keys(RANGE_CFG).map(r => (
                  <button key={r} onClick={() => setRange(r)}
                    className={`rounded px-2 py-1 font-mono text-[9px] transition-all border ${range === r ? 'bg-brand-green/20 text-brand-green border-brand-green/40' : 'text-brand-muted border-transparent hover:text-brand-text'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SVG chart */}
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
            <linearGradient id="lgUp3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lgDn3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0" />
            </linearGradient>
            <clipPath id="cc3"><rect x={PAD} y={PAD} width={W - PAD * 2} height={H - PAD * 2} /></clipPath>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map(t => {
            const y = PAD + t * (H - PAD * 2)
            const p = maxP - t * rangeP
            return (
              <g key={t}>
                <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#2A3D2E" strokeWidth="0.8" />
                <text x={2} y={y + 3} fontSize="7" fill="#5A7A64" fontFamily="monospace">
                  {fmtPrice(p, curr)}
                </text>
              </g>
            )
          })}

          {/* Area */}
          {chartType === 'area' && areaPath && (
            <>
              <path d={areaPath} fill={isUp ? 'url(#lgUp3)' : 'url(#lgDn3)'} clipPath="url(#cc3)" />
              <path d={linePath} fill="none" stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="1.8" clipPath="url(#cc3)" className="chart-line" />
            </>
          )}

          {/* Line */}
          {chartType === 'line' && linePath && (
            <path d={linePath} fill="none" stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="1.8" clipPath="url(#cc3)" className="chart-line" />
          )}

          {/* Candles */}
          {chartType === 'candle' && candles.map((c, i) => {
            const x = indexToX(i)
            const openY = priceToY(c.open); const closeY = priceToY(c.close)
            const highY = priceToY(c.high); const lowY = priceToY(c.low)
            const up = c.close >= c.open; const col = up ? '#00FF85' : '#f87171'
            const bodyTop = Math.min(openY, closeY)
            const bodyH = Math.max(1, Math.abs(closeY - openY))
            return (
              <g key={i} clipPath="url(#cc3)">
                <line x1={x} y1={highY} x2={x} y2={lowY} stroke={col} strokeWidth="0.8" strokeOpacity="0.7" />
                <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH}
                  fill={up ? col : 'transparent'} stroke={col} strokeWidth="0.8" rx="0.5" />
              </g>
            )
          })}

          {/* Crosshair */}
          {mouseX !== null && hovered && (
            <>
              <line x1={mouseX} y1={PAD} x2={mouseX} y2={H - PAD} stroke="#5A7A64" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1={PAD} y1={priceToY(hovered.close)} x2={W - PAD} y2={priceToY(hovered.close)} stroke="#5A7A64" strokeWidth="0.8" strokeDasharray="3,3" />
              <circle cx={mouseX} cy={priceToY(hovered.close)} r="3.5" fill={isUp ? '#00FF85' : '#f87171'} stroke="#141F18" strokeWidth="1.5" />
            </>
          )}

          {/* Live dot */}
          {livePrice > 0 && (
            <>
              <circle cx={liveDotX} cy={liveDotY} r="6" fill={isUp ? '#00FF85' : '#f87171'} opacity="0.2"
                className="animate-ping" style={{ transformOrigin: `${liveDotX}px ${liveDotY}px` }} />
              <circle cx={liveDotX} cy={liveDotY} r="3" fill={isUp ? '#00FF85' : '#f87171'} />
              <line x1={PAD} y1={liveDotY} x2={W - PAD} y2={liveDotY}
                stroke={isUp ? '#00FF85' : '#f87171'} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="4,3" />
            </>
          )}
        </svg>

        {/* Volume bars */}
        <div className="px-5 pb-3">
          <div className="flex items-end gap-px h-8">
            {candles.slice(-80).map((c, i) => {
              const vols = candles.slice(-80).map(x => x.volume)
              const maxVol = Math.max(...vols, 1)
              return (
                <div key={i}
                  className={`flex-1 rounded-t-sm ${c.close >= c.open ? 'bg-brand-green/25' : 'bg-red-400/20'}`}
                  style={{ height: `${Math.max(4, (c.volume / maxVol) * 100)}%` }} />
              )
            })}
          </div>
          <div className="font-mono text-[8px] text-brand-muted mt-0.5">VOLUME</div>
        </div>

        {/* Market summary */}
        <div className="border-t border-brand-border/40 px-5 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Open',   value: fmtPrice(openPrice, curr) },
            { label: 'High',   value: fmtPrice(Math.max(...prices, livePrice), curr) },
            { label: 'Low',    value: fmtPrice(Math.min(...prices.filter(Boolean), livePrice), curr) },
            { label: 'Volume', value: fmtVol(candles.reduce((a, c) => a + c.volume, 0)) },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-brand-muted">{label}</div>
              <div className="font-mono text-xs text-white">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Securities board (hidden in compact mode) ── */}
      {!compact && (
        <MarketBoard
          activeMarket={activeMarket}
          securities={market.securities}
          selectedSym={security?.sym}
          onSelectSecurity={(s) => setSelectedSecurity(s)}
        />
      )}
    </div>
  )
}
