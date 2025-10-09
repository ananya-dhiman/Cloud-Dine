import SimpleNav from "../components/simple-nav"
import StatCard from "../components/stat-card"
import SalesLineChart from "../components/sales-line-chart"
import OrdersBarChart from "../components/orders-bar-chart"

export default function DashboardPage() {
  return (
    <main className="min-h-dvh">
      <SimpleNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="mb-6 text-sm text-(--color-muted-foreground)">Overview of your kitchen&apos;s performance.</p>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Sales" value="$12,500" delta={10} positive />
          <StatCard label="Pending Orders" value="15" delta={5} />
          <StatCard label="Top Dish" value="Spicy Chicken Wings" delta={15} positive />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SalesLineChart />
          <OrdersBarChart />
        </div>
      </section>
    </main>
  )
}
