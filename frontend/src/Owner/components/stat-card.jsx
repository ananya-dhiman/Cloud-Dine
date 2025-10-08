import { Card } from "@/components/ui/card"

export default function StatCard({ label, value, delta, positive }) {
  return (
    <Card className="grid gap-1 rounded-(--radius-lg) border border-(--color-border) bg-(--color-card) p-4">
      <div className="text-sm text-(--color-muted-foreground)">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {delta != null && (
        <div className={`text-sm ${positive ? "text-emerald-600" : "text-red-600"}`}>
          {positive ? "+" : "-"}
          {Math.abs(delta)}%
        </div>
      )}
    </Card>
  )
}
import { Card } from "@/components/ui/card"

export default function StatCard({ label, value, delta, positive }) {
  return (
    <Card className="grid gap-1 rounded-(--radius-lg) border border-(--color-border) bg-(--color-card) p-4">
      <div className="text-sm text-(--color-muted-foreground)">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {delta != null && (
        <div className={`text-sm ${positive ? "text-emerald-600" : "text-red-600"}`}>
          {positive ? "+" : "-"}
          {Math.abs(delta)}%
        </div>
      )}
    </Card>
  )
}
