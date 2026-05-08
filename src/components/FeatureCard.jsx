
export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-xl border border-brand-border bg-brand-card p-6 transition-all hover:border-brand-green/30 hover:bg-brand-card/80">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-dark group-hover:border-brand-green/30 transition-colors">
        <Icon className="h-5 w-5 text-brand-green" />
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-2">{title}</h3>
      <p className="font-sans text-sm text-brand-muted leading-relaxed">{description}</p>
    </div>
  )
}
