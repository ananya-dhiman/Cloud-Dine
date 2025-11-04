import SiteHeader from "../components/site-header"
import RestaurantCard from "../components/restaurant-card"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
const navigate = useNavigate();

  const [kitchens, setKitchens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const idToken = localStorage.getItem("idToken"); 
        if(idToken == null) {
          navigate("/");
          return;
        }
        console.log("Firebase Token",idToken)
        const res = await axios.get( `${import.meta.env.VITE_API}/kitchens`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        console.log("Fetched kitchens:", res.data);
        setKitchens(res.data);

      } catch (error) {
        if(error.status==401){
          navigate("/");
        }
        console.error("Error fetching kitchens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchens();
  }, []);
  return (
    <main>
      <SiteHeader />

      {/* Hero */}
      <section aria-labelledby="hero-title" className="mx-auto mt-6 max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src="/images/landing-hero.jpg"
            alt="Collage of appetizing dishes from featured cloud kitchens"
            className="h-[360px] w-full object-cover md:h-[420px]"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden />
          <div className="absolute inset-0 flex flex-col items-start justify-center gap-4 p-8 text-primary-foreground sm:p-12">
            <h1 id="hero-title" className="max-w-2xl text-balance text-3xl font-bold sm:text-4xl">
              Deliciously Delivered: Your Favorite Cuisines, Right to Your Doorstep.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/90">
              Explore a world of flavors from our curated selection of top‑rated restaurants, all prepared in our
              state‑of‑the‑art cloud kitchens.
            </p>
            <a
              href="/kitchen"
              className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
       <section id="restaurants" className="mx-auto max-w-6xl px-4 pb-10 pt-10">
        <h2 className="text-xl font-semibold">Featured Kitchens</h2>
        {loading ? (
          <p className="mt-4 text-muted-foreground">Loading kitchens...</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kitchens.slice(0, 4).map((kitchen) => (
              <RestaurantCard
                key={kitchen._id}
                href={`/kitchen/${kitchen._id}`}
                title={kitchen.name}
                subtitle={kitchen.cuisineType.join(", ")}
                          imgSrc={
              kitchen.photos?.adminVerified?.[0]?.url
              || kitchen.photos?.ownerSubmitted?.[0]?.url
              || "/images/default-restaurant.jpg"
            }
                imgAlt={kitchen.name}
              />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold">What Our Customers Say</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              image:"/av/ma2.jpg",
              name: "Sam K.",
              role: "Food Blogger",
              quote:
                "The food from CloudDine is always fresh, delicious, and delivered right on time. Their selection is fantastic!",
            },
            {
               image:"/av/ma1.jpg",
              name: "Mike P.",
              role: "Busy Professional",
              quote:
                "With a hectic schedule, CloudDine has been a lifesaver. I get high‑quality meals without the hassle of cooking.",
            },
            
            {
               image:"/av/fe.png",
              name: "Jessica T.",
              role: "Family Mom",
              quote:
                "My family loves the variety. We can order what we want from different restaurants in one single order!",
            },
          ].map((t, i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{`"${t.quote}"`}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-sm bg-primary" aria-hidden />
              <span className="font-semibold">CloudDine</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Our mission is to bring you a diverse range of culinary experiences, prepared with the freshest
              ingredients and delivered with care.
            </p>
          </div>
          <div>
            <p className="font-medium">Quick Links</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#restaurants">Restaurants</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6">
          <p className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
            © 2025 CloudDine. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
