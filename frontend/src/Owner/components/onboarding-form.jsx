
// import { useRef, useState, useCallback } from "react"
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

// // 🔴 Map container styling
// const containerStyle = {
//   width: "100%",
//   height: "300px",
//   borderRadius: "0.5rem",
// }

// // 🔴 Default location (San Francisco)
// const defaultCenter = { lat: 37.7749, lng: -122.4194 }

// // 🔴 Simple red map style
// const redMapStyle = [
//   {
//     elementType: "geometry",
//     stylers: [{ color: "#fef3f2" }],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [{ color: "#fca5a5" }],
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ color: "#fecaca" }],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#991b1b" }],
//   },
//   {
//     featureType: "administrative",
//     elementType: "labels.text.fill",
//     stylers: [{ color: "#b91c1c" }],
//   },
// ]

// export default function OnboardingForm() {
//   const fileInputRef = useRef(null)
//   const [photos, setPhotos] = useState([])
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     notes: "",
//     cuisine: "",
//     radius: "",
//   })
//   const [location, setLocation] = useState(defaultCenter)

//   // Load Google Maps JS API
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 Replace this
//   })

//   const onMapClick = useCallback((e) => {
//     setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
//   }, [])

//   function updateField(key, value) {
//     setForm((prev) => ({ ...prev, [key]: value }))
//   }

//   function handleFiles(files) {
//     const list = Array.from(files || [])
//     setPhotos(list)
//   }

//   function onSubmit(e) {
//     e.preventDefault()
//     console.log("Submitted:", { ...form, photosCount: photos.length, location })
//     alert("Kitchen saved (demo)")
//   }

//   return (
//     <form onSubmit={onSubmit} className="grid gap-6">
//       {/* Basic Details */}
//       <div className="grid gap-2">
//         <Label htmlFor="kitchen-name">Kitchen Name</Label>
//         <Input
//           id="kitchen-name"
//           placeholder="Enter kitchen name"
//           value={form.name}
//           onChange={(e) => updateField("name", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="address">Address</Label>
//         <Input
//           id="address"
//           placeholder="Enter address"
//           value={form.address}
//           onChange={(e) => updateField("address", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

     
//       <div className="grid gap-2">
//         <Label>Location Preview</Label>
//         <Card className="overflow-hidden border border-red-300">
//           {isLoaded ? (
//             <GoogleMap
//               mapContainerStyle={containerStyle}
//               center={location}
//               zoom={13}
//               options={{ styles: redMapStyle, disableDefaultUI: false }}
//               onClick={onMapClick}
//             >
//               <Marker position={location} icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }} />
//             </GoogleMap>
//           ) : (
//             <div className="h-[300px] flex items-center justify-center text-red-500">Loading map...</div>
//           )}
//         </Card>
//         <p className="text-xs text-red-600">Click on the map to set your kitchen’s exact location.</p>
//       </div>

//       {/* Cuisine and Radius */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <div className="grid gap-2">
//           <Label>Cuisine Type</Label>
//           <Select value={form.cuisine} onValueChange={(v) => updateField("cuisine", v)}>
//             <SelectTrigger className="border-red-500 focus:ring-red-500">
//               <SelectValue placeholder="Select cuisine" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="indian">Indian</SelectItem>
//               <SelectItem value="italian">Italian</SelectItem>
//               <SelectItem value="chinese">Chinese</SelectItem>
//               <SelectItem value="mexican">Mexican</SelectItem>
//               <SelectItem value="american">American</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="radius">Delivery Radius (miles)</Label>
//           <Input
//             id="radius"
//             type="number"
//             min="0"
//             placeholder="Enter delivery radius"
//             value={form.radius}
//             onChange={(e) => updateField("radius", e.target.value)}
//             className="border-red-500 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Notes */}
//       <div className="grid gap-2">
//         <Label htmlFor="notes">Notes</Label>
//         <Textarea
//           id="notes"
//           placeholder="Optional notes about your kitchen"
//           value={form.notes}
//           onChange={(e) => updateField("notes", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

//       {/* Upload Photos */}
//       <div className="grid gap-3">
//         <Card className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-red-400 bg-red-50/30 px-6 py-10 text-center">
//           <div className="text-sm font-medium text-red-700">Upload Kitchen Photos</div>
//           <p className="text-xs text-red-500">
//             Drag and drop or click to upload photos of your kitchen. High-quality images are recommended.
//           </p>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFiles(e.target.files)}
//           />
//           <Button
//             type="button"
//             className="bg-red-600 hover:bg-red-700 text-white"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             Upload Photos
//           </Button>
//           {photos.length > 0 && (
//             <ul className="mt-2 grid gap-1 text-xs text-red-600">
//               {photos.map((f, i) => (
//                 <li key={i}>{f.name}</li>
//               ))}
//             </ul>
//           )}
//         </Card>
//       </div>

//       <div className="flex justify-end">
//         <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
//           Add Kitchen
//         </Button>
//       </div>
//     </form>
//   )
// }
// import { useRef, useState, useEffect } from "react"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

// export default function OnboardingForm() {
//   const fileInputRef = useRef(null)
//   const [photos, setPhotos] = useState([])
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     notes: "",
//     cuisine: "",
//     radius: "",
//   })

//   const [location, setLocation] = useState(null)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           })
//         },
//         () => setError("Unable to fetch location")
//       )
//     } else {
//       setError("Geolocation not supported")
//     }
//   }, [])

//   const mapUrl = location
//     ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
//     : null

//   function updateField(key, value) {
//     setForm((prev) => ({ ...prev, [key]: value }))
//   }

//   function handleFiles(files) {
//     const list = Array.from(files || [])
//     setPhotos(list)
//   }

//   function onSubmit(e) {
//     e.preventDefault()
//     console.log("Submitted:", { ...form, photosCount: photos.length, location })
//     alert("Kitchen saved (demo)")
//   }

//   return (
//     <form onSubmit={onSubmit} className="grid gap-6">
//       {/* Basic Info */}
//       <div className="grid gap-2">
//         <Label htmlFor="kitchen-name">Kitchen Name</Label>
//         <Input
//           id="kitchen-name"
//           placeholder="Enter kitchen name"
//           value={form.name}
//           onChange={(e) => updateField("name", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

//       <div className="grid gap-2">
//         <Label htmlFor="address">Address</Label>
//         <Input
//           id="address"
//           placeholder="Enter address"
//           value={form.address}
//           onChange={(e) => updateField("address", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

//       {/* Location Preview */}
//       <div className="grid gap-2">
//         <Label>Kitchen Location</Label>
//         <Card className="overflow-hidden border border-red-300">
//           {error ? (
//             <div className="p-4 text-red-600 text-sm">{error}</div>
//           ) : location ? (
//             <iframe
//               title="Kitchen Location"
//               src={mapUrl}
//               width="100%"
//               height="300"
//               style={{ border: 0 }}
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           ) : (
//             <div className="h-[300px] flex items-center justify-center text-red-500">
//               Fetching your location...
//             </div>
//           )}
//         </Card>
//         <p className="text-xs text-red-600">
//           This shows your current location. You can adjust it later if needed.
//         </p>
//       </div>

//       {/* Cuisine and Radius */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//         <div className="grid gap-2">
//           <Label>Cuisine Type</Label>
//           <Select value={form.cuisine} onValueChange={(v) => updateField("cuisine", v)}>
//             <SelectTrigger className="border-red-500 focus:ring-red-500">
//               <SelectValue placeholder="Select cuisine" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="indian">Indian</SelectItem>
//               <SelectItem value="italian">Italian</SelectItem>
//               <SelectItem value="chinese">Chinese</SelectItem>
//               <SelectItem value="mexican">Mexican</SelectItem>
//               <SelectItem value="american">American</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="radius">Delivery Radius (miles)</Label>
//           <Input
//             id="radius"
//             type="number"
//             min="0"
//             placeholder="Enter delivery radius"
//             value={form.radius}
//             onChange={(e) => updateField("radius", e.target.value)}
//             className="border-red-500 focus:ring-red-500"
//           />
//         </div>
//       </div>

//       {/* Notes */}
//       <div className="grid gap-2">
//         <Label htmlFor="notes">Notes</Label>
//         <Textarea
//           id="notes"
//           placeholder="Optional notes about your kitchen"
//           value={form.notes}
//           onChange={(e) => updateField("notes", e.target.value)}
//           className="border-red-500 focus:ring-red-500"
//         />
//       </div>

//       {/* Upload Photos */}
//       <div className="grid gap-3">
//         <Card className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-red-400 bg-red-50/30 px-6 py-10 text-center">
//           <div className="text-sm font-medium text-red-700">Upload Kitchen Photos</div>
//           <p className="text-xs text-red-500">
//             Drag and drop or click to upload photos of your kitchen.
//           </p>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             multiple
//             className="hidden"
//             onChange={(e) => handleFiles(e.target.files)}
//           />
//           <Button
//             type="button"
//             className="bg-red-600 hover:bg-red-700 text-white"
//             onClick={() => fileInputRef.current?.click()}
//           >
//             Upload Photos
//           </Button>
//           {photos.length > 0 && (
//             <ul className="mt-2 grid gap-1 text-xs text-red-600">
//               {photos.map((f, i) => (
//                 <li key={i}>{f.name}</li>
//               ))}
//             </ul>
//           )}
//         </Card>
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
//           Add Kitchen
//         </Button>
//       </div>
//     </form>
//   )
// }
import { useRef, useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";

export default function OnboardingForm() {
  const fileInputRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    notes: "",
    cuisine: "",
    radius: "",
  });

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const ownerId = localStorage.getItem("ownerId"); // Assuming ownerId stored on login
  const idToken = localStorage.getItem("idToken");

  // Fetch existing kitchen data
  useEffect(() => {
    const fetchKitchen = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API}/owner/${ownerId}`, {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        if (res.data.kitchen) {
          const k = res.data.kitchen;
          setForm({
            name: k.name,
            address: k.address,
            notes: k.notes || "",
            cuisine: k.cuisineType[0] || "",
            radius: k.deliveryRadius || "",
          });
          setPhotos(k.photos.ownerSubmitted || []);
          setLocation(k.location || null);
        }
      } catch (err) {
        console.error("Failed to fetch kitchen data:", err);
      }
    };
    if (ownerId) fetchKitchen();
  }, [ownerId, idToken]);

  useEffect(() => {
    if (!location && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setError("Unable to fetch location")
      );
    } else if (!location) {
      setError("Geolocation not supported");
    }
  }, [location]);

  const mapUrl = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
    : null;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleFiles(files) {
  const list = Array.from(files || []);
  setPhotos((prev) => [...prev, ...list]);
}

async function onSubmit(e) {
  e.preventDefault();

  if (!form.name || !form.address) {
    return alert("Please fill all required fields");
  }

  const formData = new FormData();
  formData.append("owner", ownerId);
  formData.append("name", form.name);
  formData.append("address", form.address);
  formData.append("notes", form.notes);
  formData.append("cuisineType", form.cuisine);


    if (location) {
  formData.append("location[lat]", location.lat);
  formData.append("location[lng]", location.lng);
}
  

  photos.forEach((file) => {
    formData.append("images", file); 
  });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API}/kitchens/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Kitchen & images uploaded successfully");
    console.log("Created:", res.data);
  } catch (err) {
    console.error(err);
    alert("Upload failed ");
  }
}


  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Basic Info */}
      <div className="grid gap-2">
        <Label htmlFor="kitchen-name">Kitchen Name</Label>
        <Input
          id="kitchen-name"
          placeholder="Enter kitchen name"
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
          className="border-red-500 focus:ring-red-500"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter address"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className="border-red-500 focus:ring-red-500"
        />
      </div>

      {/* Location Preview */}
      <div className="grid gap-2">
        <Label>Kitchen Location</Label>
        <Card className="overflow-hidden border border-red-300">
          {error ? (
            <div className="p-4 text-red-600 text-sm">{error}</div>
          ) : location ? (
            <iframe
              title="Kitchen Location"
              src={mapUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-red-500">
              Fetching your location...
            </div>
          )}
        </Card>
      </div>

      {/* Cuisine and Radius */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="grid gap-2">
          <Label>Cuisine Type</Label>
          <Select value={form.cuisine} onValueChange={(v) => updateField("cuisine", v)}>
            <SelectTrigger className="border-red-500 focus:ring-red-500">
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
            className="border-red-500 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Notes */}
      <div className="grid gap-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Optional notes about your kitchen"
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="border-red-500 focus:ring-red-500"
        />
      </div>

      {/* Upload Photos */}
      <div className="grid gap-3">
        <Card className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-red-400 bg-red-50/30 px-6 py-10 text-center">
          <div className="text-sm font-medium text-red-700">Upload Kitchen Photos</div>
          <p className="text-xs text-red-500">
            Drag and drop or click to upload photos of your kitchen.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photos
          </Button>
          {photos.length > 0 && (
  <div className="mt-3 grid grid-cols-3 gap-2">
    {photos.map((file, i) => (
      <img
        key={i}
        src={typeof file === "string" ? file : URL.createObjectURL(file)}
        className="h-20 w-full object-cover rounded-md border border-red-300"
        alt={`Kitchen photo ${i + 1}`}
      />
    ))}
  </div>
)}

        </Card>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
          Add Kitchen
        </Button>
      </div>
    </form>
  );
}
