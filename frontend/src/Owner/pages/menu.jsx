




import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SimpleNav from "../components/simple-nav"
import DishCard from "../components/dish-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import axios from "axios"
import MenuCreator from "../components/create-menu"

export default function MenuManagementPage() {
 
  const [menuData, setMenuData] = useState(null)
  const [ownerId, setOwnerId] = useState(null);
const [newSectionName, setNewSectionName] = useState("");
  const [loading, setLoading] = useState(true)
const [open, setOpen] = useState(false)
const [kitchenId, setKitchenId] = useState(null);
const [newDish, setNewDish] = useState({
  section: "",
  name: "",
  price: "",
  description: "",
  image: "",
  isAvailable: true
})
// ------------------------
// Add Dish (axios version)
// ------------------------
const addDish = async () => {
  if (!newDish.section || !newDish.name || !newDish.price) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const token = localStorage.getItem("idToken");

    // Clone and update menuData locally first
    const updatedMenu = { ...menuData };

    const sectionIndex = updatedMenu.sections.findIndex(
      (s) => s._id === newDish.section || s.title === newDish.section
    );

    if (sectionIndex === -1) {
      alert("Invalid section selected.");
      return;
    }

    const newDishData = {
      name: newDish.name,
      description: newDish.description,
      price: parseFloat(newDish.price),
      image: newDish.image,
      isAvailable: newDish.isAvailable,
    };

    // Update locally
    updatedMenu.sections[sectionIndex].dishes.push(newDishData);
    setMenuData(updatedMenu);
    setOpen(false);
    console.log(menuData);

    // Send full updated menu to backend
    const res = await axios.put(
      `${import.meta.env.VITE_API}/menus/${kitchenId}`,
      updatedMenu,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Menu updated successfully:", res.data);
    setMenuData(res.data); 
  } catch (err) {
    console.error("Failed to add dish:", err);
    alert(err.response?.data?.message || "Failed to add dish");
  }
};



// ------------------------
// Add Section (backend version)
// ------------------------
const addSection = async (sectionName) => {
  if (!sectionName.trim()) return alert("Please enter a section name");

  try {
    const token = localStorage.getItem("idToken");
    if (!token) return alert("Not authenticated");

    const res = await axios.post(
      `${import.meta.env.VITE_API}/menus/${kitchenId}/sections`,
      { title: sectionName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Update menuData with latest menu from backend
    setMenuData(res.data);
    setNewSectionName("");
    setOpen(false);
    alert(`Section "${sectionName}" created successfully!`);
  } catch (err) {
    console.error("Error adding section:", err);
    alert(err.response?.data?.message || "Failed to add section");
  }
};





 useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("idToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      const profileRes = await axios.get(
        `${import.meta.env.VITE_API}/users/profile`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
          console.log("profilfeRes",profileRes);
      const getOwnerId = profileRes.data?.user?._id;
      
          console.log("getOwnerId",getOwnerId);
      setOwnerId(getOwnerId);

      if (!getOwnerId) {
        console.error("Owner ID not found in /profile response");
        return;
      }


      const kitchenRes = await axios.get(
        `${import.meta.env.VITE_API}/kitchens/owner/${getOwnerId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const fetchedKitchenId = kitchenRes.data?._id;
      setKitchenId(fetchedKitchenId);

      if (!fetchedKitchenId) {
        console.warn("No kitchen found for this owner");
        return;
      }

  
      const menuRes = await axios.get(
        `${import.meta.env.VITE_API}/menus/${fetchedKitchenId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMenuData(menuRes.data);
    } catch (error) {
      if (error.response?.status === 404) {
    console.warn("Menu not found. Allow user to create menu.");
      } else {
    console.error("Unexpected menu fetch error:", error);
  }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  if (loading) return <p className="mt-4 text-muted-foreground px-4">Loading...</p>

  if (!menuData) {
  return (
  <>

     <MenuCreator ownerId={ownerId} kitchenId={kitchenId} />
  </>
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
            <Input placeholder="Search dishes" aria-label="Search menu" />
          </div>
        </div>
         <div className="flex justify-end gap-3 mb-4">
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
        <span className="mr-2">+</span> Add Dish
      </Button>
    </DialogTrigger>

    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader className="space-y-3 pb-4 border-b">
        <DialogTitle className="text-2xl font-bold text-red-600">Add New Dish</DialogTitle>
        <p className="text-sm text-muted-foreground">Fill in the details to add a new dish to your menu</p>
      </DialogHeader>

      <div className="space-y-6 py-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Category *</Label>
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            value={newDish.section}
            onChange={(e) => setNewDish({ ...newDish, section: e.target.value })}
          >
            <option value="">Select a category</option>
            {menuData.sections.map((s) => (
              <option key={s._id} value={s._id}>{s.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Dish Name *</Label>
            <Input
              className="border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., Margherita Pizza"
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Price *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                className="pl-8 border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="0.00"
                onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Description</Label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
            placeholder="Describe your dish..."
            onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Image URL</Label>
          <Input
            className="border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
            onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="availability"
            checked={newDish.isAvailable}
            onChange={(e) => setNewDish({ ...newDish, isAvailable: e.target.checked })}
            className="w-5 h-5 text-red-600 focus:ring-red-500 rounded"
          />
          <Label htmlFor="availability" className="text-sm font-medium cursor-pointer">
            Available for orders
          </Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg" 
          onClick={addDish}
        >
          Add Dish
        </Button>
      </div>
    </DialogContent>
  </Dialog>

  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
        <span className="mr-2">+</span> Add Section
      </Button>
    </DialogTrigger>

    <DialogContent className="max-w-md">
      <DialogHeader className="space-y-3 pb-4 border-b">
        <DialogTitle className="text-2xl font-bold text-red-600">Add New Section</DialogTitle>
        <p className="text-sm text-muted-foreground">Create a new category for your menu</p>
      </DialogHeader>

      <div className="space-y-6 py-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-700">Section Name *</Label>
          <Input
  className="border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
  placeholder="e.g., Appetizers, Main Course, Desserts"
  value={newSectionName}
  onChange={(e) => setNewSectionName(e.target.value)}
/>

        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
       <Button
  className="flex-1 bg-red-600 hover:bg-red-700 text-white shadow-lg"
  onClick={() => addSection(newSectionName)}
>
  Create Section
</Button>

      </div>
    </DialogContent>
  </Dialog>
</div>

        <Tabs defaultValue={menuData.sections[0]?.title.toLowerCase()}>
          <TabsList className="mb-4">
            {menuData.sections.map(section => (
              <TabsTrigger
                key={section._id}
                value={section.title.toLowerCase()}
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.sections.map(section => (
            <TabsContent
              key={section._id}
              value={section.title.toLowerCase()}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.dishes.map(dish => (
                  <DishCard
                    key={dish._id}
                    title={dish.name}
                    price={dish.price}
                    image={dish.image || "/placeholder.jpg"}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  )

  
}















