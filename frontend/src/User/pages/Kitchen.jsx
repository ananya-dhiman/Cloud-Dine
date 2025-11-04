



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "../components/review-card";
import { RatingBar } from "../components/rating-bar";
import { useCart } from "../context/cartContext.jsx";
import SiteHeader from "../components/site-header";
import { ImageCarousel } from "../components/image-carousel.jsx";
import axios from "axios";

export default function KitchenPage() {
  const { kitchenId } = useParams(); 
  const { addItem } = useCart();

  const [kitchen, setKitchen] = useState(null);
  const [loading, setLoading] = useState(true);

const [menu, setMenu] = useState([]);

useEffect(() => {
  const fetchKitchenAndMenu = async () => {
    try {
      console.log("Fetching kitchen with ID:", kitchenId);
      const idToken = localStorage.getItem("idToken");

      
      const kitchenRes = await axios.get(
        `${import.meta.env.VITE_API}/kitchens/${kitchenId}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      setKitchen(kitchenRes.data.kitchen ?? kitchenRes.data);

     
      const menuRes = await axios.get(
        `${import.meta.env.VITE_API}/menus/${kitchenId}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );

      const menuData =
        menuRes.data?.sections?.flatMap((section) =>
          section.dishes.map((dish) => ({
            ...dish,
            section: section.title,
          }))
        ) || [];

      console.log("Menu Items:", menuData);
      setMenu(menuData);

    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (kitchenId) fetchKitchenAndMenu();
}, [kitchenId]);



  if (loading)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-muted-foreground">Loading kitchen...</p>
      </main>
    );

  if (!kitchen)
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Kitchen not found</h1>
      </main>
    );

  const handleAddToCart = (menuItem) => {
    const id = menuItem.dishId;
    addItem(
      {
        dishId: id,
    kitchenId: kitchen._id,
        name: menuItem.name,
        price: menuItem.price,
        img: menuItem.image,
        kitchen: kitchen.name,
      },
      1
    );
  };

  const mapUrl = `https://www.google.com/maps?q=${kitchen.location.lat},${kitchen.location.lng}&z=15&output=embed`;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16">
        <header className="py-6">
          <h1 className="text-2xl font-semibold">{kitchen.name}</h1>
          <p className="mt-2 text-xs text-muted-foreground">{kitchen.address}</p>
        </header>

        {/* ✅ Uses backend photos */}
       {/* ✅ Uses backend photos (adminVerified preferred) */}
<ImageCarousel
  images={
    kitchen.photos?.adminVerified?.length
      ? kitchen.photos.adminVerified.map(p =>
          p.url.startsWith("http")
            ? p.url
            : `${import.meta.env.VITE_PHOTO_API}${p.url}`
        )
      : kitchen.photos?.ownerSubmitted?.length
      ? kitchen.photos.ownerSubmitted.map(p =>
          p.url.startsWith("http")
            ? p.url
            : `${import.meta.env.VITE_PHOTO_API}${p.url}`
        )
      : ["/images/default-restaurant.jpg"]
  }
  alt={kitchen.name}
/>

        {/* Menu Future → backend once added */}
        <section className="pt-10">
          <h2 className="text-lg font-semibold">Menu</h2>
{menu.length === 0 ? (
  <p className="mt-2 text-sm text-muted-foreground">No menu added yet.</p>
) : (
  <div className="mt-4 divide-y rounded-lg border">
    {menu.map((item) => (
      <div
        key={item._id}
        className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[160px_1fr_auto] md:items-center"
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="h-24 w-40 rounded-md object-cover"
        />

        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.section}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>

        <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
          <p className="text-sm font-medium">₹{item.price}</p>

          <Button
            onClick={() =>
              handleAddToCart({
                dishId: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
              })
            }
            size="sm"
            className="rounded-md"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    ))}
  </div>
)}
        </section>

        {/* Location */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Location</h2>
          <div className="mt-2 rounded-lg overflow-hidden border border-border">
            <iframe
              title="Kitchen Location"
              src={mapUrl}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Ratings & Reviews Placeholder */}
        <section className="pt-12">
          <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
          <p className="text-muted-foreground mt-2">Reviews coming soon...</p>
        </section>

        {/* Owner Info */}
        {kitchen.owner && (
          <section className="pt-12">
            <h2 className="text-lg font-semibold">About the Owner</h2>
            <div className="mt-4 flex items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Owner"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{kitchen.owner.name || "Kitchen Owner"}</p>
              </div>
            </div>
          </section>
        )}

      </main>
    </>
  );
}
