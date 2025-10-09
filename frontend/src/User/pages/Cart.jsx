
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CartItem from "../components/cart-item";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, totalPrice, removeItem, formatCurrency } = useCart();

  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const summary = [
    { label: "Subtotal", value: formatCurrency(totalPrice) },
    { label: "Taxes", value: "$2.50" },
    { label: "Delivery Fee", value: "$3.00" },
  ];
  const finalTotal = formatCurrency(totalPrice + 2.5 + 3);

  useEffect(() => {
    // Fetch user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setError("Unable to fetch location")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const mapUrl = location
    ? `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`
    : null;

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Your Order
      </h1>

      {/* Items */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Items</h2>
        <div className="mt-2 divide-y divide-border rounded-xl border border-border bg-card px-4">
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id || item.name}
                {...item}
                onRemove={() => removeItem(item.id)}
              />
            ))
          ) : (
            <p className="p-4 text-center text-muted-foreground">
              Your cart is empty.
            </p>
          )}
        </div>
      </section>

      {/* Delivery Details */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Delivery Location</h2>
        <div className="mt-3 rounded-xl border border-border bg-card p-4 space-y-4">
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : location ? (
            <>
              <p className="text-sm text-foreground">
                Latitude: {location.lat.toFixed(4)}, Longitude: {location.lng.toFixed(4)}
              </p>
              <div className="rounded-lg overflow-hidden border border-border">
                <iframe
                  title="Current Location"
                  src={mapUrl}
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">Fetching your location...</p>
          )}
        </div>
      </section>

      {/* Payment Summary */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Payment Summary</h2>
        <div className="mt-3 space-y-2 rounded-xl border border-border bg-card p-4">
          {summary.map((row) => (
            <div key={row.label} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{row.label}</span>
              <span className="text-foreground">{row.value}</span>
            </div>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">{finalTotal}</span>
          </div>
        </div>
      </section>

      {/* Proceed Button */}
      <div className="flex justify-center bottom-4 mt-10">
        <Link to="/payment">
          <button
            type="button"
            className="rounded-2xl bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Proceed to Payment
          </button>
        </Link>
      </div>
    </main>
  );
}
