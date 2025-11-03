


import { useState } from "react"
import { Plus, Trash2, ChefHat, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";


export default function MenuCreator({ ownerId,kitchenId, onMenuCreated }) {

  const [sections, setSections] = useState([
    {
      title: "Starters",
      dishes: []
    }
  ])
  const [loading, setLoading] = useState(false)

  const addSection = () => {
    setSections([...sections, { title: "", dishes: [] }])
  }

  const removeSection = (index) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const updateSectionTitle = (index, title) => {
    const updated = [...sections]
    updated[index].title = title
    setSections(updated)
  }

  const addDish = (sectionIndex) => {
    const updated = [...sections]
    updated[sectionIndex].dishes.push({
      name: "",
      description: "",
      price: "",
      image: "",
      isAvailable: true
    })
    setSections(updated)
  }

  const removeDish = (sectionIndex, dishIndex) => {
    const updated = [...sections]
    updated[sectionIndex].dishes = updated[sectionIndex].dishes.filter((_, i) => i !== dishIndex)
    setSections(updated)
  }

  const updateDish = (sectionIndex, dishIndex, field, value) => {
    const updated = [...sections]
    updated[sectionIndex].dishes[dishIndex][field] = value
    setSections(updated)
  }

  
const handleSubmit = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("idToken");

    if (!kitchenId || !ownerId) {
      alert("Missing kitchen or owner ID. Please refresh the page.");
      return;
    }

    const menuData = {
      kitchen: kitchenId,
      lastUpdatedBy: ownerId,
      sections: sections.map(section => ({
        title: section.title,
        dishes: section.dishes.map(dish => ({
          name: dish.name,
          description: dish.description,
          price: parseFloat(dish.price),
          image: dish.image,
          isAvailable: dish.isAvailable,
        })),
      })),
    };

    console.log("Submitting menuData:", menuData);

    const res = await axios.post(
      `${import.meta.env.VITE_API}/menus`,
      menuData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Menu creation response:", res.status, res.data);

    if (onMenuCreated) onMenuCreated(res.data);
  } catch (err) {
    console.error("Failed to create menu:", err);

    if (err.response) {
      // Server responded with a status other than 2xx
      alert(`Server Error: ${err.response.data.message || err.response.statusText}`);
      console.log("Response Data:", err.response.data);
    } else if (err.request) {
      // No response from server
      alert("No response from server. Check your backend connection.");
      console.log("Request Data:", err.request);
    } else {
      // Something else went wrong
      alert("Error: " + err.message);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
            <ChefHat className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Menu</h1>
          <p className="text-gray-600">Build your menu by adding sections and dishes</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-2 border-gray-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <UtensilsCrossed className="w-5 h-5" />
                    <Input
                      placeholder="Section name (e.g., Starters, Main Course)"
                      value={section.title}
                      onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70 font-semibold text-lg"
                    />
                  </div>
                  {sections.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSection(sectionIndex)}
                      className="text-white hover:bg-white/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Dishes */}
                {section.dishes.map((dish, dishIndex) => (
                  <div key={dishIndex} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-gray-700">Dish #{dishIndex + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeDish(sectionIndex, dishIndex)}
                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Dish Name *</Label>
                        <Input
                          placeholder="e.g., Butter Chicken"
                          value={dish.name}
                          onChange={(e) => updateDish(sectionIndex, dishIndex, "name", e.target.value)}
                          className="border-gray-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Price (₹) *</Label>
                        <Input
                          type="number"
                          placeholder="299"
                          value={dish.price}
                          onChange={(e) => updateDish(sectionIndex, dishIndex, "price", e.target.value)}
                          className="border-gray-300"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-medium">Description</Label>
                        <Input
                          placeholder="Describe your dish..."
                          value={dish.description}
                          onChange={(e) => updateDish(sectionIndex, dishIndex, "description", e.target.value)}
                          className="border-gray-300"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="text-sm font-medium">Image URL</Label>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={dish.image}
                          onChange={(e) => updateDish(sectionIndex, dishIndex, "image", e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Dish Button */}
                <Button
                  variant="outline"
                  onClick={() => addDish(sectionIndex)}
                  className="w-full border-dashed border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Dish to {section.title || "Section"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Section Button */}
        <Button
          variant="outline"
          onClick={addSection}
          className="w-full mt-6 border-dashed border-2 border-red-400 text-red-600 hover:bg-red-50 hover:border-red-500 h-14 text-lg font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Section
        </Button>

        {/* Submit Button */}
        <div className="mt-12 flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={loading || sections.length === 0}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-12 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Menu..." : "Create Menu"}
          </Button>
        </div>
      </div>
    </div>
  )
}