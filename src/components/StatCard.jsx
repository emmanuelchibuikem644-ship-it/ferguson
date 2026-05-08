
export default function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card px-5 py-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-muted mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      {sub && <div className="font-sans text-xs text-brand-muted mt-0.5">{sub}</div>}
    </div>
  )
}
