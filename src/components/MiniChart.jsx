// Dashboard uses a compact variant of LiveMarketChart
'use client'
import LiveMarketChart from './LiveMarketChart'
export default function MiniChart() {
  return <LiveMarketChart compact={true} />
}
