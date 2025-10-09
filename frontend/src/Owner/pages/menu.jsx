import SimpleNav from "../components/simple-nav "
import DishCard from "../components/dish-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function MenuManagementPage() {
  return (
    <main className="min-h-dvh">
      <SimpleNav />
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-balance">Menu Management</h1>
            <p className="text-sm text-(--color-muted-foreground)">Manage your dishes, categories, and availability.</p>
          </div>
          <div className="w-full sm:w-64">
            <Input placeholder="Search dishes" aria-label="Search menu" />
          </div>
        </div>

        <Tabs defaultValue="starters">
          <TabsList className="mb-4">
            <TabsTrigger value="starters">Starters</TabsTrigger>
            <TabsTrigger value="mains">Mains</TabsTrigger>
            <TabsTrigger value="desserts">Desserts</TabsTrigger>
            <TabsTrigger value="beverages">Beverages</TabsTrigger>
          </TabsList>

          <TabsContent value="starters" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DishCard title="Spicy Chicken Wings" price={250} />
              <DishCard title="Vegetable Spring Rolls" price={180} />
              <DishCard title="Garlic Bread with Cheese" price={150} />
              <DishCard title="Paneer Tikka" price={220} />
              <DishCard title="Chicken Tikka" price={280} />
              <DishCard title="Onion Bhaji" price={120} />
              <DishCard title="Tandoori Chicken" price={350} />
              <DishCard title="Samosa" price={80} />
            </div>
          </TabsContent>

          <TabsContent value="mains" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DishCard title="Butter Chicken" price={420} />
              <DishCard title="Margherita Pizza" price={300} />
              <DishCard title="Veg Biryani" price={260} />
              <DishCard title="Pasta Alfredo" price={280} />
            </div>
          </TabsContent>

          <TabsContent value="desserts" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DishCard title="Gulab Jamun" price={120} />
              <DishCard title="Brownie" price={160} />
              <DishCard title="Ice Cream" price={100} />
              <DishCard title="Cheesecake" price={220} />
            </div>
          </TabsContent>

          <TabsContent value="beverages" className="mt-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <DishCard title="Masala Chai" price={60} />
              <DishCard title="Cold Coffee" price={140} />
              <DishCard title="Fresh Lime Soda" price={90} />
              <DishCard title="Iced Tea" price={110} />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}
