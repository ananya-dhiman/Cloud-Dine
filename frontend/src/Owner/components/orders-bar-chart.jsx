

import { ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, Tooltip } from "recharts";
import { Card } from "@/components/ui/card"

const data = [
  { day: "Mon", orders: 90 },
  { day: "Tue", orders: 140 },
  { day: "Wed", orders: 60 },
  { day: "Thu", orders: 130 },
  { day: "Fri", orders: 110 },
  { day: "Sat", orders: 200 },
  { day: "Sun", orders: 120 },
]

export default function OrdersBarChart() {
  return (
    <Card className="border border-(--color-border) bg-(--color-card) p-4">
      <div className="mb-2 font-medium">Order Volume</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="orders" fill="rgb(203, 92, 80)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-sm text-(--color-muted-foreground)">Last 7 Days +5%</div>
    </Card>
  )
}
