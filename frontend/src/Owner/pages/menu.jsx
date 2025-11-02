
// import SimpleNav from "../components/simple-nav"
// import DishCard from "../components/dish-card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"

// export default function MenuManagementPage() {
//   return (
//     <main className="min-h-dvh">
//       <SimpleNav />
//       <section className="mx-auto max-w-6xl px-4 py-8">
//         <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-balance">Menu Management</h1>
//             <p className="text-sm text-(--color-muted-foreground)">Manage your dishes, categories, and availability.</p>
//           </div>
//           <div className="w-full sm:w-64">
//             <Input placeholder="Search dishes" aria-label="Search menu" />
//           </div>
//         </div>

//         <Tabs defaultValue="starters">
//           <TabsList className="mb-4">
//             <TabsTrigger value="starters">Starters</TabsTrigger>
//             <TabsTrigger value="mains">Mains</TabsTrigger>
//             <TabsTrigger value="desserts">Desserts</TabsTrigger>
//             <TabsTrigger value="beverages">Beverages</TabsTrigger>
//           </TabsList>

//           <TabsContent value="starters">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               <DishCard title="Spicy Chicken Wings" price={250} image="/images/chicken-biryani-bowl.jpg" />
//               <DishCard title="Vegetable Spring Rolls" price={180} image="/images/fries.png" />
//               <DishCard title="Garlic Bread with Cheese" price={150} image="/images/logo.png" />
//               <DishCard title="Paneer Tikka" price={220} image="/images/indian-curry-and-rice.jpg" />
//               <DishCard title="Chicken Tikka" price={280} image="/images/burger1.png" />
//               <DishCard title="Onion Bhaji" price={120} image="/images/logo.png" />
//               <DishCard title="Tandoori Chicken" price={350} image="/images/burger3.png" />
//               <DishCard title="Samosa" price={80} image="/images/pasta.png" />
//             </div>
//           </TabsContent>

//           <TabsContent value="mains">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               <DishCard title="Butter Chicken" price={420} image="/images/indian-curry-and-rice.jpg" />
//               <DishCard title="Margherita Pizza" price={300} image="/images/burger2.png" />
//               <DishCard title="Veg Biryani" price={260} image="/images/chicken-biryani-bowl.jpg" />
//               <DishCard title="Pasta Alfredo" price={280} image="/images/pasta.png" />
//             </div>
//           </TabsContent>

//           <TabsContent value="desserts">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               <DishCard title="Gulab Jamun" price={120} image="/images/gulab-jamun.png" />
//               <DishCard title="Brownie" price={160} image="/images/logo.png" />
//               <DishCard title="Ice Cream" price={100} image="/images/miso.png" />
//               <DishCard title="Cheesecake" price={220} image="/images/home-design.jpg" />
//             </div>
//           </TabsContent>

//           <TabsContent value="beverages">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               <DishCard title="Masala Chai" price={60} image="/images/logo.png" />
//               <DishCard title="Cold Coffee" price={140} image="/images/logo.png" />
//               <DishCard title="Fresh Lime Soda" price={90} image="/images/logo.png" />
//               <DishCard title="Iced Tea" price={110} image="/images/logo.png" />
//             </div>
//           </TabsContent>
//         </Tabs>
//       </section>
//     </main>
//   )
// }




// import { useEffect, useState } from "react"
// import { useParams } from "react-router-dom"
// import SimpleNav from "../components/simple-nav"
// import DishCard from "../components/dish-card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"


// export default function MenuManagementPage() {
//   const { kitchenId } = useParams()
//   const [menuData, setMenuData] = useState(null)
//   const [loading, setLoading] = useState(true)
// const [open, setOpen] = useState(false)
// const [newDish, setNewDish] = useState({
//   section: "",
//   name: "",
//   price: "",
//   description: "",
//   image: "",
//   isAvailable: true
// })
//    const addDish = async () => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_API}/menus/${kitchenId}/add-dish`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newDish)
//     })

//     const updatedMenu = await res.json()
//     setMenuData(updatedMenu) // refresh UI
//     setOpen(false)
//   } catch (err) {
//     console.error("Failed to add dish:", err)
//   }
// }

//   const fetchMenu = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API}/menus/${kitchenId}`)
//       const data = await res.json()
//       setMenuData(data) 
//       setLoading(false)
//     } catch (err) {
//       console.error("Failed to fetch menu: ", err)
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchMenu()
//   }, [kitchenId])

//   if (loading) return <p className="mt-4 text-muted-foreground px-4">Loading...</p>

//   if (!menuData?.sections?.length)
//     return(     <main className="min-h-dvh"><SimpleNav /> <p className="mt-4 flex justify-center items-center text-muted-foreground px-4">No menu available</p></main>)

//   return (
//     <main className="min-h-dvh">
//       <SimpleNav />

//       <section className="mx-auto max-w-6xl px-4 py-8">
//         <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
//             <p className="text-sm text-muted-foreground">Manage your dishes.</p>
//           </div>
//           <div className="w-full sm:w-64">
//             <Input placeholder="Search dishes" aria-label="Search menu" />
//           </div>
//         </div>
//          <div className="flex justify-end mb-4">
//   <Dialog open={open} onOpenChange={setOpen}>
//     <DialogTrigger asChild>
//       <Button>Add Dish</Button>
//     </DialogTrigger>

//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>Add New Dish</DialogTitle>
//       </DialogHeader>

//       <div className="grid gap-4 py-4">

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label>Category</Label>
//           <select
//             className="col-span-3 border rounded p-2"
//             value={newDish.section}
//             onChange={(e) => setNewDish({ ...newDish, section: e.target.value })}
//           >
//             <option value="">Select category</option>
//             {menuData.sections.map((s) => (
//               <option key={s._id} value={s._id}>{s.title}</option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label>Name</Label>
//           <Input
//             className="col-span-3"
//             placeholder="Dish name"
//             onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label>Price</Label>
//           <Input
//             type="number"
//             className="col-span-3"
//             onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label>Description</Label>
//           <Input
//             className="col-span-3"
//             onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
//           />
//         </div>

//         <div className="grid grid-cols-4 items-center gap-4">
//           <Label>Image URL</Label>
//           <Input
//             className="col-span-3"
//             onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
//           />
//         </div>

//       </div>

//       <Button className="w-full" onClick={addDish}>
//         Add Dish ✅
//       </Button>
//     </DialogContent>
//   </Dialog>
// </div>

//         <Tabs defaultValue={menuData.sections[0]?.title.toLowerCase()}>
//           <TabsList className="mb-4">
//             {menuData.sections.map(section => (
//               <TabsTrigger
//                 key={section._id}
//                 value={section.title.toLowerCase()}
//               >
//                 {section.title}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {menuData.sections.map(section => (
//             <TabsContent
//               key={section._id}
//               value={section.title.toLowerCase()}
//             >
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//                 {section.dishes.map(dish => (
//                   <DishCard
//                     key={dish._id}
//                     title={dish.name}
//                     price={dish.price}
//                     image={dish.image || "/placeholder.jpg"}
//                   />
//                 ))}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </section>
//     </main>
//   )
// }




import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SimpleNav from "../components/simple-nav"
import DishCard from "../components/dish-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function MenuManagementPage() {
  const { kitchenId } = useParams()
  const [menuData, setMenuData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [newDish, setNewDish] = useState({
    section: "",
    name: "",
    price: "",
    description: "",
    image: "",
    isAvailable: true
  })

  const addDish = async () => {
    // Validate inputs
    if (!newDish.section || !newDish.name || !newDish.price) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/menus/${kitchenId}/add-dish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish)
      })

      if (!res.ok) {
        throw new Error("Failed to add dish")
      }

      const updatedMenu = await res.json()
      setMenuData(updatedMenu)
      
      // Reset form
      setNewDish({
        section: "",
        name: "",
        price: "",
        description: "",
        image: "",
        isAvailable: true
      })
      
      setOpen(false)
    } catch (err) {
      console.error("Failed to add dish:", err)
      alert("Failed to add dish. Please try again.")
    }
  }

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/menus/${kitchenId}`)
      
      if (!res.ok) {
        throw new Error("Failed to fetch menu")
      }
      
      const data = await res.json()
      setMenuData(data)
    } catch (err) {
      console.error("Failed to fetch menu:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (kitchenId) {
      fetchMenu()
    }
  }, [kitchenId])

  // Filter dishes based on search term
  const filterDishes = (dishes) => {
    if (!searchTerm) return dishes
    return dishes.filter(dish => 
      dish.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  if (loading) {
    return (
      <main className="min-h-dvh">
        <SimpleNav />
        <p className="mt-4 text-center text-muted-foreground px-4">Loading menu...</p>
      </main>
    )
  }

  if (!menuData?.sections?.length) {
    return (
      <main className="min-h-dvh">
        <SimpleNav />
        <p className="mt-4 flex justify-center items-center text-muted-foreground px-4">
          No menu available
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-dvh">
      <SimpleNav />

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
            <p className="text-sm text-muted-foreground">Manage your dishes.</p>
          </div>
          <div className="w-full sm:w-64">
            <Input 
              placeholder="Search dishes" 
              aria-label="Search menu"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>Add Dish</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Dish</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="col-span-3 border rounded p-2"
                    value={newDish.section}
                    onChange={(e) => setNewDish({ ...newDish, section: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {menuData.sections.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    placeholder="Dish name"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    className="col-span-3"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    className="col-span-3"
                    value={newDish.description}
                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    className="col-span-3"
                    value={newDish.image}
                    onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                  />
                </div>
              </div>

              <Button className="w-full" onClick={addDish}>
                Add Dish
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue={menuData.sections[0]?.title.toLowerCase()}>
          <TabsList className="mb-4">
            {menuData.sections.map((section) => (
              <TabsTrigger
                key={section._id}
                value={section.title.toLowerCase()}
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.sections.map((section) => {
            const filteredDishes = filterDishes(section.dishes)
            
            return (
              <TabsContent
                key={section._id}
                value={section.title.toLowerCase()}
              >
                {filteredDishes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    {searchTerm ? "No dishes match your search" : "No dishes in this category"}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredDishes.map((dish) => (
                      <DishCard
                        key={dish._id}
                        title={dish.name}
                        price={dish.price}
                        image={dish.image || "/placeholder.jpg"}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>
      </section>
    </main>
  )
}