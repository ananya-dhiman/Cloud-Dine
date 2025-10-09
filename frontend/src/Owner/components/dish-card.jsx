import { Card } from "@/components/ui/card"

export default function DishCard({ title, price, imgAlt }) {
  return (
    <Card className="overflow-hidden border border-(--color-border) bg-(--color-card)">
      <img
        src={`/.jpg?height=240&width=320&query=${encodeURIComponent(title)}`}
        alt={imgAlt || title}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-1 p-3">
        <p className="font-medium leading-tight">{title}</p>
        <p className="text-sm text-(--color-muted-foreground)">₹ {price}</p>
      </div>
    </Card>
  )
}
