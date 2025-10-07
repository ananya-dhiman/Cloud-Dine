

import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ReviewCard from "../components/review-card";
import { RatingBar } from "../components/rating-bar";

const DATA = {
  "spice-merchant": {
    name: "The Spice Merchant",
    address: "123 Elm Street, Anytown",
    rating: 4.5,
    ratingsCount: 120,
    hero: "/images/kitchen-hero.png",
    menu: [
      {
        name: "Chicken Biryani",
        desc: "Aromatic basmati rice cooked with tender chicken pieces and a blend of spices.",
        price: "$12.99",
        img: "/chicken-biryani-bowl.jpg",
      },
    ],
    owner: { name: "Rajesh Patel", avatar: "/person-holding-keys.png" },
    distribution: [
      { label: "5", percent: 40 },
      { label: "4", percent: 30 },
      { label: "3", percent: 15 },
      { label: "2", percent: 10 },
      { label: "1", percent: 5 },
    ],
  },
  "spice-route": {
    name: "The Spice Route",
    address: "45 Market Lane, Foodville",
    rating: 4.8,
    ratingsCount: 230,
    hero: "/images/spice-route-hero.jpg",
    menu: [
      {
        name: "Paneer Butter Masala",
        desc: "Creamy tomato-based curry with cubes of soft paneer and fragrant spices.",
        price: "$10.99",
        img: "/paneer-butter-masala.jpg",
      },
      {
        name: "Garlic Naan",
        desc: "Soft Indian flatbread with a garlic butter glaze.",
        price: "$3.50",
        img: "/garlic-naan.jpg",
      },
    ],
    owner: { name: "Anita Sharma", avatar: "/chef-anita.png" },
    distribution: [
      { label: "5", percent: 55 },
      { label: "4", percent: 30 },
      { label: "3", percent: 10 },
      { label: "2", percent: 3 },
      { label: "1", percent: 2 },
    ],
  },
  "flavors-of-italy": {
    name: "Flavors of Italy",
    address: "78 Olive Street, Bella City",
    rating: 4.6,
    ratingsCount: 190,
    hero: "/images/italian-hero.jpg",
    menu: [
      {
        name: "Margherita Pizza",
        desc: "Classic pizza topped with mozzarella, tomato, and fresh basil.",
        price: "$9.99",
        img: "/margherita-pizza.jpg",
      },
      {
        name: "Pasta Alfredo",
        desc: "Creamy Alfredo sauce tossed with fettuccine pasta and parmesan cheese.",
        price: "$11.99",
        img: "/pasta-alfredo.jpg",
      },
    ],
    owner: { name: "Giovanni Rossi", avatar: "/chef-giovanni.png" },
    distribution: [
      { label: "5", percent: 50 },
      { label: "4", percent: 35 },
      { label: "3", percent: 10 },
      { label: "2", percent: 3 },
      { label: "1", percent: 2 },
    ],
  },
};

export default function KitchenPage() {
  const { slug } = useParams();
  const kitchen = DATA[slug];

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

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16">
      {/* Header */}
      <header className="py-6">
        <h1 className="text-2xl font-semibold">{kitchen.name}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {kitchen.rating} ({kitchen.ratingsCount}+ ratings) · {kitchen.address}
        </p>
      </header>

      {/* Hero */}
      <section className="overflow-hidden rounded-xl">
        <img
          src={kitchen.hero || "/placeholder.svg"}
          alt={kitchen.name}
          className="w-full object-cover md:h-[380px]"
        />
      </section>

      {/* Menu */}
      <section className="pt-10">
        <h2 className="text-lg font-semibold">Menu</h2>
        <div className="mt-4 divide-y rounded-lg border">
          {kitchen.menu.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[160px_1fr_auto] md:items-center"
            >
              <img
                src={item.img || "/placeholder.svg"}
                alt={item.name}
                className="h-24 w-40 rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <p className="text-sm font-medium">{item.price}</p>
                <Button size="sm" className="rounded-md">
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ratings & Reviews */}
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
  );
}
