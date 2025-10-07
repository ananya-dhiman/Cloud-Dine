import React from "react";
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

export default function CartPage() {
  const items = [
    { name: "Spicy Chicken Burger", quantity: 2, price: "15.98", image: "/spicy-chicken-burger.png" },
    { name: "Vegetable Spring Rolls", quantity: 1, price: "7.99", image: "/vegetable-spring-rolls.jpg" },
    { name: "Iced Tea", quantity: 3, price: "6.00", image: "/iced-tea.png" },
  ];

  const summary = [
    { label: "Subtotal", value: "$29.97" },
    { label: "Taxes", value: "$2.50" },
    { label: "Delivery Fee", value: "$3.00" },
  ];

  const total = "$35.47";

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 md:py-12">
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

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Your Order</h1>

      {/* Items Section */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Items</h2>
        <div className="mt-2 divide-y divide-border rounded-xl border border-border bg-card px-4">
          {items.map((i) => (
            <CartItem key={i.name} {...i} />
          ))}
        </div>
      </section>

      {/* Delivery Details Section */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Delivery Details</h2>
        <div className="mt-3 flex items-start justify-between rounded-xl border border-border bg-card p-4">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-foreground/80">
              <span aria-hidden>📍</span>
              <span className="sr-only">Address</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Address: 123 Maple Street, Anytown</p>
              <p className="text-sm text-muted-foreground">Estimated Delivery: 30–45 minutes</p>
            </div>
          </div>
          <button className="rounded-full bg-muted px-4 py-1.5 text-sm text-foreground hover:bg-muted/80">
            Edit
          </button>
        </div>
      </section>

      {/* Payment Summary Section */}
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
            <span className="text-foreground">{total}</span>
          </div>
        </div>
      </section>

      {/* Proceed Button */}
      <div className="sticky bottom-4 mt-10">
        <Link to="/payment" />  
        <button
          type="button"
          className="w-full rounded-full bg-primary px-6 py-4 text-center text-base font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Proceed to payment"
        >
          Proceed to Payment
        </button>
        
      
      </div>
    </main>
  );
}
