import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ORDERS = [
  { id: "12345", customer: "Alex", etaMin: 15, status: "preparing" },
  { id: "12346", customer: "Jordan", etaMin: 20, status: "preparing" },
  { id: "12347", customer: "Taylor", etaMin: 25, status: "preparing" },
];

export default function OrderStatusPage() {
  const { id } = useParams();
  const orderId = id || "12345";

  const order = useMemo(
    () => ORDERS.find((o) => o.id === orderId) || ORDERS[0],
    [orderId]
  );

  const [partner, setPartner] = useState("");
  const [status, setStatus] = useState(order.status);

  return (
    <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="space-y-4">
        <Card className="rounded-lg border border-border p-2">
          <Tabs defaultValue="in-progress">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>

        <Card className="rounded-lg border border-border">
          <ScrollArea className="h-[420px]">
            <ul className="divide-y divide-border">
              {ORDERS.map((o) => {
                const active = o.id === orderId;
                return (
                  <li key={o.id}>
                    <Link
                      to={`/orders/${o.id}`}
                      className={`block p-3 transition ${
                        active ? "bg-muted" : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">
                            Customer: {o.customer}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Order #{o.id}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {o.etaMin} min
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </Card>
      </aside>

      {/* Main content */}
      <section className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-bold">Order #{orderId}</h1>
        </header>

        {/* Delivery Partner */}
        <div className="space-y-2">
          <Label htmlFor="partner">Delivery Partner</Label>
          <Select value={partner} onValueChange={setPartner}>
            <SelectTrigger id="partner" className="max-w-md">
              <SelectValue placeholder="Select Delivery Partner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="door-dash">DoorDash</SelectItem>
              <SelectItem value="ubereats">Uber Eats</SelectItem>
              <SelectItem value="postmates">Postmates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Order Tracking */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Order Tracking</h2>
          <Card className="overflow-hidden rounded-lg border border-border">
            <img
              src="/san-francisco-map.jpg"
              alt="Map of San Francisco showing delivery route"
              className="h-auto w-full"
            />
          </Card>
        </div>

        {/* Order Status */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Order Status</h2>
          <Card className="rounded-lg border border-border p-2">
            <RadioGroup
              value={status}
              onValueChange={setStatus}
              className="grid gap-2"
            >
              <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="preparing" value="preparing" />
                  <Label htmlFor="preparing" className="cursor-pointer">
                    Preparing
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    id="out-for-delivery"
                    value="out-for-delivery"
                  />
                  <Label htmlFor="out-for-delivery" className="cursor-pointer">
                    Out for Delivery
                  </Label>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="delivered" value="delivered" />
                  <Label htmlFor="delivered" className="cursor-pointer">
                    Delivered
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            variant="destructive"
            onClick={() => {
              alert(
                `Updated order #${orderId} to "${status}"${
                  partner ? ` via ${partner}` : ""
                }`
              );
            }}
          >
            Update Status
          </Button>
        </div>
      </section>
    </main>
  );
}
