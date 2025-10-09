

import { useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OnboardingForm() {
  const fileInputRef = useRef(null)
  const [photos, setPhotos] = useState([])
  const [form, setForm] = useState({
    name: "",
    address: "",
    notes: "",
    cuisine: "",
    radius: "",
  })

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleFiles(files) {
    const list = Array.from(files || [])
    setPhotos(list)
  }

  function onSubmit(e) {
    e.preventDefault()
    // In a real app, you'd send this to your API.
    console.log("[v0] Onboarding submit:", { ...form, photosCount: photos.length })
    alert("Kitchen saved (demo)")
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="kitchen-name">Kitchen Name</Label>
        <Input
          id="kitchen-name"
          placeholder="Enter kitchen name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label>Location Preview</Label>
        <Card className="overflow-hidden border border-(--color-border) bg-(--color-card)">
          <img src="/san-francisco-map.png" alt="Map preview centered on San Francisco" className="w-full h-auto" />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Cuisine Type</Label>
          <Select value={form.cuisine} onValueChange={(v) => updateField("cuisine", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="mexican">Mexican</SelectItem>
              <SelectItem value="american">American</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="radius">Delivery Radius (miles)</Label>
          <Input
            id="radius"
            type="number"
            min="0"
            placeholder="Enter delivery radius"
            value={form.radius}
            onChange={(e) => updateField("radius", e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Optional notes about your kitchen"
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Card className="flex flex-col items-center justify-center gap-3 rounded-(--radius-lg) border border-dashed border-(--color-border) bg-(--color-muted)/10 px-6 py-10 text-center">
          <div className="text-sm font-medium">Upload Kitchen Photos</div>
          <p className="text-xs text-(--color-muted-foreground)">
            Drag and drop or click to upload photos of your kitchen. High-quality images are recommended.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Upload Photos
          </Button>
          {photos.length > 0 && (
            <ul className="mt-2 grid gap-1 text-xs text-(--color-muted-foreground)">
              {photos.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="px-6">
          Add Kitchen
        </Button>
      </div>
    </form>
  )
}
