export function RatingBar({ label, percent }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-2 text-xs tabular-nums text-muted-foreground">{label}</span>
      <div className="h-2 flex-1 rounded-full bg-secondary">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${percent}%` }} aria-hidden />
      </div>
      <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{percent}%</span>
    </div>
  )
}
