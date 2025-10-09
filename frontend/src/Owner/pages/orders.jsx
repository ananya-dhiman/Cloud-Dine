
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const ORDERS = [
  { id: "12345", customer: "Ethan Carter", items: 2, total: 25.5, status: "new" },
  { id: "12346", customer: "Olivia Bennett", items: 3, total: 32.75, status: "new" },
  { id: "12347", customer: "Noah Thompson", items: 1, total: 15.0, status: "in-progress" },
  { id: "12348", customer: "Ava Martinez", items: 4, total: 45.2, status: "in-progress" },
  { id: "12349", customer: "Liam Harris", items: 2, total: 28.9, status: "delivered" },
]

function StatusBadge({ status }) {
  const label = status === "new" ? "Pending" : status === "in-progress" ? "In Progress" : "Delivered"
  const variantClass =
    status === "delivered"
      ? "bg-(--color-accent) text-(--color-accent-foreground)"
      : "bg-(--color-muted) text-(--color-muted-foreground)"
  return <Badge className={`rounded-full px-3 ${variantClass}`}>{label}</Badge>
}

function OrdersTable({ data }) {
  return (
    <Card className="overflow-hidden rounded-(--radius-lg) border border-(--color-border)">
      <Table>
        <TableHeader className="bg-(--color-muted)">
          <TableRow>
            <TableHead className="w-[140px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="w-[120px]">Items</TableHead>
            <TableHead className="w-[120px] text-right">Total</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((o) => (
            <TableRow key={o.id}>
              <TableCell>#{o.id}</TableCell>
              <TableCell className="font-medium">
                <Link href={`/orders/${o.id}`} className="text-(--color-primary)">
                  {o.customer}
                </Link>
              </TableCell>
              <TableCell>
                {o.items} {o.items === 1 ? "item" : "items"}
              </TableCell>
              <TableCell className="text-right">${o.total.toFixed(2)}</TableCell>
              <TableCell>
                <StatusBadge status={o.status} />
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/orders/${o.id}`} className="font-semibold text-(--color-primary)">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default function OrdersPage() {
  const filterBy = (status) => (status === "all" ? ORDERS : ORDERS.filter((o) => o.status === status))

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="text-balance text-3xl font-bold">Orders</h1>
        <p className="text-(--color-muted-foreground)">Manage incoming, ongoing, and completed orders</p>
      </header>

      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <OrdersTable data={filterBy("new")} />
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <OrdersTable data={filterBy("in-progress")} />
        </TabsContent>

        <TabsContent value="delivered" className="space-y-4">
          <OrdersTable data={filterBy("delivered")} />
        </TabsContent>
      </Tabs>
    </main>
  )
}
