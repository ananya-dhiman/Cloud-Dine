
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "../components/review-card";
import { RatingBar } from "../components/rating-bar";
import { useCart } from "../context/cartContext.jsx"; 
import SiteHeader from "../components/site-header";
import {ImageCarousel} from "../components/image-carousel.jsx"; 
import { DATA } from "../mock-data/kitchen.jsx" 

export default function KitchenPage() {
  const { slug } = useParams();
  const kitchen = DATA[slug];
  const { addItem } = useCart(); 

  const [currentImage, setCurrentImage] = useState(0);

  if (!kitchen) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Kitchen not found</h1>
        <p className="mt-2 text-muted-foreground">
          Please check the URL or return to the homepage.
        </p>
      </main>
    );
  }

  const handleAddToCart = (menuItem) => {
    const id = `${slug}-${menuItem.name.replace(/\s+/g, "-").toLowerCase()}`;
    addItem({ id, name: menuItem.name, price: menuItem.price, img: menuItem.img, kitchen: kitchen.name }, 1);
  };

  const mapUrl = `https://www.google.com/maps?q=${kitchen.location.lat},${kitchen.location.lng}&z=15&output=embed`;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 pb-16">

        {/* Header */}
        <header className="py-6">
          <h1 className="text-2xl font-semibold">{kitchen.name}</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            {kitchen.rating} ({kitchen.ratingsCount}+ ratings) · {kitchen.address}
          </p>
        </header>

       
        {/* Image Carousel */}
        <ImageCarousel images={kitchen.images} alt={kitchen.name} />
       


        {/* Menu */}
        <section className="pt-10">
          <h2 className="text-lg font-semibold">Menu</h2>
          <div className="mt-4 divide-y rounded-lg border">
            {kitchen.menu.map((item, i) => (
              <div key={i} className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[160px_1fr_auto] md:items-center">
                <img src={item.img || "/placeholder.svg"} alt={item.name} className="h-24 w-40 rounded-md object-cover" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <p className="text-sm font-medium">{item.price}</p>
                  <Button size="sm" className="rounded-md" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
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
        {/* Ratings & Reviews*/}
       <section className="pt-12">
         <h2 className="text-lg font-semibold">Ratings &amp; Reviews</h2>
         <div className="mt-5 grid gap-8 md:grid-cols-2">
           <Card>
             <CardContent className="p-5">
               <div className="flex items-center gap-6">
                 <div>
                   <p className="text-3xl font-semibold tabular-nums">
                    {kitchen.rating}
                   </p>
                   <div className="mt-1 flex items-center gap-1">
                     {Array.from({ length: 5 }).map((_, i) => (
                       <span
                         key={i}
                         className={`inline-block h-3 w-3 rounded-sm ${
                           i < 5 ? "bg-primary" : "bg-secondary"
                         }`}
                       />
                     ))}
                 </div>
                   <p className="mt-1 text-xs text-muted-foreground">
                     {kitchen.ratingsCount}+ reviews
                   </p>
                 </div>
                 <div className="flex-1 space-y-2">
                   {kitchen.distribution.map((d) => (
                     <RatingBar key={d.label} label={d.label} percent={d.percent} />
                   ))}
                 </div>
               </div>
             </CardContent>
           </Card>

           <div className="space-y-4">
             <ReviewCard
               name="Sophia Clark"
               date="1 month ago"
               content="The Chicken Biryani was absolutely delicious! The spices were perfectly balanced, and the chicken was tender. Highly recommend!"
               stars={5}
               avatar="/portrait-sophia.png"
             />
             <ReviewCard
               name="Ethan Bennett"
               date="2 months ago"
               content="I enjoyed the Dal Makhani, but it could have been a bit spicier. The naan bread was fresh and soft."
               stars={4}
               avatar="/portrait-ethan.png"
             />
             <div className="pt-2">
               <Button variant="secondary" className="rounded-md">
                 Add a Review
               </Button>
             </div>
           </div>
         </div>
       </section>

        
   {/* Owner */}
       <section className="pt-12">
         <h2 className="text-lg font-semibold">About the Owner</h2>
         <div className="mt-4 flex items-center gap-4">
           <img
             src={kitchen.owner.avatar || "/placeholder.svg"}
             alt={kitchen.owner.name}
             className="h-16 w-16 rounded-full object-cover"
           />
           <div>
             <p className="font-medium">{kitchen.owner.name}</p>
             <p className="text-sm text-muted-foreground">
              Passionate about authentic flavors and quality ingredients.
           </p>
           </div>
         </div>
    </section>
    

      </main>
    </>
  );
}



