import { useState, useMemo } from "react"

export default function CheckoutPage() {
  const [method, setMethod] = useState("card")
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    save: false,
  })

  const prices = {
    subtotal: 25.0,
    delivery: 3.99,
    taxes: 2.5,
    tip: 2.0,
  }

  const total = useMemo(() => Object.values(prices).reduce((sum, v) => sum + Number(v || 0), 0), [prices])

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n)

  function handleSubmit(e) {
    e.preventDefault()
    // In a real app you'd call your API here.
    console.log("[v0] Order submitted:", { method, card, prices, total })
    alert("Order placed!")
  }

  const isCard = method === "card"

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-6">
        <ol className="flex items-center gap-2">
          <li>Cart</li>
          <li aria-hidden="true" className="opacity-60">
            /
          </li>
          <li className="text-foreground">Checkout</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight mb-6 text-balance">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Payment Method */}
        <fieldset className="space-y-3">
          <legend className="font-medium">Payment Method</legend>

          <label className="flex items-center gap-3 rounded-md border border-input bg-background px-4 py-3">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={method === "card"}
              onChange={() => setMethod("card")}
              className="h-4 w-4"
              aria-describedby="pm-card-desc"
            />
            <div className="flex-1">
              <div className="text-sm">Credit Card</div>
              <p id="pm-card-desc" className="sr-only">
                Pay with credit or debit card
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 rounded-md border border-input bg-background px-4 py-3">
            <input
              type="radio"
              name="payment"
              value="gift"
              checked={method === "gift"}
              onChange={() => setMethod("gift")}
              className="h-4 w-4"
              aria-describedby="pm-gift-desc"
            />
            <div className="flex-1">
              <div className="text-sm">Foodie Gift Card</div>
              <p id="pm-gift-desc" className="sr-only">
                Pay with Foodie gift card
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 rounded-md border border-input bg-background px-4 py-3">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
              className="h-4 w-4"
              aria-describedby="pm-paypal-desc"
            />
            <div className="flex-1">
              <div className="text-sm">PayPal</div>
              <p id="pm-paypal-desc" className="sr-only">
                Pay with PayPal
              </p>
            </div>
          </label>
        </fieldset>

        {/* Card fields */}
        <section aria-labelledby="card-fields" className="space-y-3">
          <h2 id="card-fields" className="sr-only">
            Card details
          </h2>

          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="Card  Number"
            disabled={!isCard}
            value={card.number}
            onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
            className="w-full rounded-md border border-input bg-muted px-4 py-3 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-ring"
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              disabled={!isCard}
              value={card.expiry}
              onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
              className="w-full rounded-md border border-input bg-muted px-4 py-3 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-ring"
            />
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              placeholder="CVV"
              disabled={!isCard}
              value={card.cvv}
              onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
              className="w-full rounded-md border border-input bg-muted px-4 py-3 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-ring"
            />
          </div>

          <input
            type="text"
            autoComplete="cc-name"
            placeholder="Name  on Card"
            disabled={!isCard}
            value={card.name}
            onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
            className="w-full rounded-md border border-input bg-muted px-4 py-3 text-sm outline-none focus:bg-background focus:ring-2 focus:ring-ring"
          />

          <label className="flex items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              disabled={!isCard}
              checked={card.save}
              onChange={(e) => setCard((c) => ({ ...c, save: e.target.checked }))}
              className="h-4 w-4"
            />
            <span>Save this card for future purchases</span>
          </label>
        </section>

        {/* Order Summary */}
        <section aria-labelledby="order-summary" className="space-y-4">
          <h2 id="order-summary" className="font-medium">
            Order Summary
          </h2>

          <dl className="space-y-2 text-sm">
            <Row label="Subtotal" value={fmt(prices.subtotal)} />
            <Row label="Delivery Fee" value={fmt(prices.delivery)} />
            <Row label="Taxes" value={fmt(prices.taxes)} />
            <Row label="Tip" value={fmt(prices.tip)} />
            <div className="pt-2">
              <Row label={<strong>Total</strong>} value={<strong>{fmt(total)}</strong>} />
            </div>
          </dl>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Place Order"
        >
          Place Order
        </button>
      </form>
    </main>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{typeof label === "string" ? label : label}</dt>
      <dd className="tabular-nums">{typeof value === "string" ? value : value}</dd>
    </div>
  )
}
