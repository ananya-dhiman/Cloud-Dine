"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { day: "Mon", sales: 2200 },
  { day: "Tue", sales: 1800 },
  { day: "Wed", sales: 2100 },
  { day: "Thu", sales: 1900 },
  { day: "Fri", sales: 800 },
  { day: "Sat", sales: 2600 },
  { day: "Sun", sales: 2400 },
]

export default function SalesLineChart() {
  return (
    <Card className="border border-(--color-border) bg-(--color-card) p-4">
      <div className="mb-2 font-medium">Sales Trend</div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="sales" stroke="rgb(185, 28, 28)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-sm text-(--color-muted-foreground)">Last 7 Days +10%</div>
    </Card>
  )
}
