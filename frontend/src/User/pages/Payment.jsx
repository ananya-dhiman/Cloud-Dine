
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext.jsx";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    save: false,
  });

  const { items, totalPrice, formatCurrency } = useCart();

  // Fixed charges
  const delivery = 3.99;
  const taxes = 2.5;
  const tip = 2.0;

  // Calculate total
  const total = totalPrice + delivery + taxes + tip;

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/order-placed", {
      state: {
        order: items,
        summary: { subtotal: totalPrice, delivery, taxes, tip, total },
      },
    });
  }

  const isCard = method === "card";

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Checkout</h1>

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
            />
            <div className="flex-1">Credit Card</div>
          </label>

          <label className="flex items-center gap-3 rounded-md border border-input bg-background px-4 py-3">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={method === "paypal"}
              onChange={() => setMethod("paypal")}
              className="h-4 w-4"
            />
            <div className="flex-1">PayPal</div>
          </label>
        </fieldset>

        {/* Card Fields */}
        {isCard && (
          <section className="space-y-3">
            <input
              type="text"
              placeholder="Card Number"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: e.target.value })}
              className="w-full rounded-md border px-4 py-3"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                className="w-full rounded-md border px-4 py-3"
              />
              <input
                type="text"
                placeholder="CVV"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                className="w-full rounded-md border px-4 py-3"
              />
            </div>
            <input
              type="text"
              placeholder="Name on Card"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              className="w-full rounded-md border px-4 py-3"
            />
          </section>
        )}

        {/* Order Summary */}
        <section>
          <h2 className="font-medium mb-2">Order Summary</h2>
          <dl>
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatCurrency(totalPrice)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd>{formatCurrency(delivery)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Taxes</dt>
              <dd>{formatCurrency(taxes)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tip</dt>
              <dd>{formatCurrency(tip)}</dd>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <dt>Total</dt>
              <dd>{formatCurrency(total)}</dd>
            </div>
          </dl>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-3 text-white font-medium"
        >
          Place Order
        </button>
      </form>
    </main>
  );
}
