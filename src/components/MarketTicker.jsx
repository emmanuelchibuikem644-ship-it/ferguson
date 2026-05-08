'use client'

const tickers = [
  { label: 'DANGCEM', value: '₦628.50', change: '+1.2%', up: true },
  { label: 'GTCO', value: '₦56.80', change: '+0.8%', up: true },
  { label: 'ZENITH', value: '₦42.30', change: '-0.4%', up: false },
  { label: 'AIRTEL', value: '₦2,340', change: '+2.1%', up: true },
  { label: 'MTNN', value: '₦295.00', change: '-0.2%', up: false },
  { label: 'ACCESSCORP', value: '₦24.15', change: '+1.5%', up: true },
  { label: 'UBA', value: '₦19.80', change: '+0.3%', up: true },
  { label: 'FBN', value: '₦17.50', change: '-0.9%', up: false },
]

// Duplicate for seamless loop
const items = [...tickers, ...tickers]

export default function MarketTicker() {
  return (
    <div className="border-b border-brand-border bg-brand-card/60 overflow-hidden">
      <div className="flex items-center">
        {/* Static label */}
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border-r border-brand-border bg-brand-card z-10">
          <span className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-brand-green" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-brand-green">
            LIVE · NGX
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex gap-0 whitespace-nowrap">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-2 border-r border-brand-border/30">
                <span className="font-mono text-[11px] font-medium text-brand-text">{item.label}</span>
                <span className="font-mono text-[11px] text-white">{item.value}</span>
                <span className={`font-mono text-[11px] ${item.up ? 'text-brand-green' : 'text-red-400'}`}>
                  {item.up ? '▲' : '▼'} {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
