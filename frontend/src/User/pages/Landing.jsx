import SiteHeader from "../components/site-header"
import RestaurantCard from "../components/restaurant-card"
import { Card, CardContent } from "@/components/ui/card"

export default function LandingPage() {
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
        <h2 className="text-xl font-semibold">Featured Restaurants</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RestaurantCard
            href="/kitchen/spice-merchant"
            title="Spice Route"
            subtitle="Authentic Indian"
            imgSrc="/assorted-indian-dishes.jpg"
            imgAlt="Assorted Indian dishes"
          />
          <RestaurantCard
            href="/kitchen/spice-route"
            title="The Gourmet Kitchen"
            subtitle="Modern European"
            imgSrc="/modern-european-plating.jpg"
            imgAlt="Modern European plate"
          />
          <RestaurantCard
            href="/kitchen/flavors-of-italy"
            title="The Italian Job"
            subtitle="Classic Italian"
            imgSrc="/classic-italian-pizza.jpg"
            imgAlt="Classic Italian pizza"
          />
          <RestaurantCard
            href="#"
            title="Green Bites"
            subtitle="Healthy & Fresh"
            imgSrc="/colorful-salad-bowl.jpg"
            imgAlt="Healthy colorful salad"
          />
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold">What Our Customers Say</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              image:"/images/portrait-sophia.jpg",
              name: "Sarah L.",
              role: "Food Blogger",
              quote:
                "The food from CloudKitchen is always fresh, delicious, and delivered right on time. Their selection is fantastic!",
            },
            {
               image:"/images/portrait-sophia.jpg",
              name: "Mike P.",
              role: "Busy Professional",
              quote:
                "With a hectic schedule, CloudKitchen has been a lifesaver. I get high‑quality meals without the hassle of cooking.",
            },
            
            {
               image:"/images/portrait-sophia.jpg",
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
              <span className="font-semibold">CloudKitchen</span>
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
            © 2025 CloudKitchen. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
