
// import { useRef, useState, useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import axios from "axios";

// export default function OnboardingForm() {
//   const fileInputRef = useRef(null);
//   const [ownerId,setOwnerId]=useState(null);
//   const [photos, setPhotos] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     notes: "",
//     cuisine: "",
//     radius: "",
//   });

//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState("");
//  // Assuming ownerId stored on login
//   const idToken = localStorage.getItem("idToken");
   
//  useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("idToken");
//       if (!token) {
//         console.error("No token found");
//         return;
//       }

//       const profileRes = await axios.get(
//         `${import.meta.env.VITE_API}/users/profile`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
//           console.log("profilfeRes",profileRes);
//       const getOwnerId = profileRes.data?.user?._id;
      
//           console.log("getOwnerId",getOwnerId);
//       setOwnerId(getOwnerId);

//       if (!getOwnerId) {
//         console.error("Owner ID not found in /profile response");
//         return;
//       }
    
//     } catch (error) {
//       if (error.response?.status === 404) {
//     console.warn("Owner not found.");
//       } else {
//     console.error("Unexpected user fetch error:", error);
//   }
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);

//   useEffect(() => {
//     const fetchKitchen = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API}/kitchens/owner/${ownerId}`, {
//           headers: { Authorization: `Bearer ${idToken}` },
//         });
//         console.log(res.data);
//         if (res.data.kitchen) {
//           const k = res.data.kitchen;
//           setForm({
//             name: k.name,
//             address: k.address,
//             notes: k.notes || "",
//             cuisine: k.cuisineType[0] || "",
//             radius: k.deliveryRadius || "",
//           });
//           setPhotos(k.photos.ownerSubmitted || []);
//           setLocation(k.location || null);
//         }
       
//       } catch (err) {
//         console.error("Failed to fetch kitchen data:", err);
//       }
//     };
//     if (ownerId) fetchKitchen();
//   }, [ownerId, idToken]);

//   useEffect(() => {
//     if (!location && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setLocation({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         () => setError("Unable to fetch location")
//       );
//     } else if (!location) {
//       setError("Geolocation not supported");
//     }
//   }, [location]);

//   const mapUrl = location
//     ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
//     : null;

//   function updateField(key, value) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   }

//   function handleFiles(files) {
//   const list = Array.from(files || []);
//   setPhotos((prev) => [...prev, ...list]);
// }

// async function onSubmit(e) {
//   e.preventDefault();

//   if (!form.name || !form.address) {
//     return alert("Please fill all required fields");
//   }

//   const formData = new FormData();
//   formData.append("owner", ownerId);
//   formData.append("name", form.name);
//   formData.append("address", form.address);
//   formData.append("notes", form.notes);
//   formData.append("cuisineType", form.cuisine);


//     if (location) {
//   formData.append("location[lat]", location.lat);
//   formData.append("location[lng]", location.lng);
// }
  

//   photos.forEach((file) => {
//     formData.append("images", file); 
//   });

//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API}/kitchens/`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${idToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     alert("Kitchen & images uploaded successfully");
//     console.log("Created:", res.data);
//   } catch (err) {
//     console.error(err);
//     alert("Upload failed ");
//   }
// }


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
//   <div className="mt-3 grid grid-cols-3 gap-2">
//     {photos.map((file, i) => (
//       <img
//         key={i}
//         src={typeof file === "string" ? file : URL.createObjectURL(file)}
//         className="h-20 w-full object-cover rounded-md border border-red-300"
//         alt={`Kitchen photo ${i + 1}`}
//       />
//     ))}
//   </div>
// )}

//         </Card>
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6">
//           Add Kitchen
//         </Button>
//       </div>
//     </form>
//   );
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
  const [ownerId, setOwnerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [existingPhotos, setExistingPhotos] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    notes: "",
    cuisine: "",
    radius: "",
  });

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const idToken = localStorage.getItem("idToken");

  // Fetch owner profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("idToken");
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const profileRes = await axios.get(
          `${import.meta.env.VITE_API}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log("profileRes", profileRes);
        const getOwnerId = profileRes.data?.user?._id;
        
        console.log("getOwnerId", getOwnerId);
        setOwnerId(getOwnerId);

        if (!getOwnerId) {
          console.error("Owner ID not found in /profile response");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("Owner not found.");
        } else {
          console.error("Unexpected user fetch error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch existing kitchen data
  useEffect(() => {
  const fetchKitchen = async () => {
    console.log("🔍 Starting kitchen fetch...");
    console.log("ownerId:", ownerId);
    console.log("idToken:", idToken ? "exists" : "missing");
    
    try {
      const url = `${import.meta.env.VITE_API}/kitchens/owner/${ownerId}`;
      console.log("📡 Fetching from:", url);
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      
      console.log("✅ Kitchen response received:", res);
      console.log("✅ Kitchen data:", res.data);
      
      if (res.data) {
        const k = res.data;
        console.log("🍳 Kitchen object:", k);
        console.log("📝 Kitchen name:", k.name);
        console.log("📍 Kitchen address:", k.address);
        console.log("🍽️ Cuisine type:", k.cuisineType);
        
        // Update form with existing data
        const formData = {
          name: k.name || "",
          address: k.address || "",
          notes: k.notes || "",
          cuisine: k.cuisineType?.[0] || "",
          radius: k.deliveryRadius?.toString() || "",
        };
        
        console.log("📋 Setting form to:", formData);
        setForm(formData);
        
        // Store existing photos separately
        const existingPhotoUrls = k.photos?.ownerSubmitted || [];
        console.log("📸 Existing photos:", existingPhotoUrls);
        setExistingPhotos(existingPhotoUrls);
        
        // Set location if available
        if (k.location) {
          console.log("📍 Setting location:", k.location);
          setLocation(k.location);
        }
        
        console.log("✅ Form populated successfully");
      } else {
        console.log("⚠️ No kitchen found in response");
      }
    } catch (err) {
      console.log("❌ Kitchen fetch error:", err);
      console.log("❌ Error response:", err.response);
      console.log("❌ Error status:", err.response?.status);
      console.log("❌ Error data:", err.response?.data);
      
      if (err.response?.status === 404) {
        console.log("ℹ️ Kitchen not found (404) - this is normal for new users");
      }
    }
  };
  
  if (ownerId && idToken) {
    console.log("🚀 Conditions met, fetching kitchen...");
    fetchKitchen();
  } else {
    console.log("⏳ Waiting for ownerId and idToken...", { ownerId, idToken: !!idToken });
  }
}, [ownerId, idToken]);

  // Get user's geolocation if not already set
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
    } else if (!location && !navigator.geolocation) {
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

  function removeExistingPhoto(index) {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function removeNewPhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
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
    formData.append("deliveryRadius",form.radius);

    if (location) {
      formData.append("location[lat]", location.lat);
      formData.append("location[lng]", location.lng);
    }

    // Append new photos

photos.forEach((file) => {
  formData.append("photos", file);
});
    console.log(formData);
    for (const [key, value] of formData.entries()) {
  console.log(key, value);
}


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
      console.error("Whats the error ughhhhhhhhhhhhhhhhhh",err);
      alert("Upload failed");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">Loading...</div>
      </div>
    );
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

          {/* Existing Photos */}
          {existingPhotos.length > 0 && (
            <div className="w-full">
              <div className="text-xs text-red-600 font-medium mb-2">Existing Photos:</div>
              <div className="grid grid-cols-3 gap-2">
                {existingPhotos.map((url, i) => (
                  <div key={`existing-${i}`} className="relative">
                    <img
                      src={url}
                      className="h-20 w-full object-cover rounded-md border border-red-300"
                      alt={`Existing photo ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingPhoto(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Photos */}
          {photos.length > 0 && (
            <div className="w-full">
              <div className="text-xs text-red-600 font-medium mb-2">New Photos:</div>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((file, i) => (
                  <div key={`new-${i}`} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      className="h-20 w-full object-cover rounded-md border border-red-300"
                      alt={`New photo ${i + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeNewPhoto(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
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