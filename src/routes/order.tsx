import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useCart } from "@/lib/cart";
import { menu } from "@/lib/menu-data";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Order Online — Brew Haven" },
      { name: "description", content: "Order your Brew Haven favorites for pickup. Browse bestsellers and customize your drinks." },
      { property: "og:title", content: "Order Online — Brew Haven" },
      { property: "og:description", content: "Order specialty coffee for pickup." },
      { property: "og:url", content: "/order" },
    ],
    links: [{ rel: "canonical", href: "/order" }],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { items, add, setQty, remove, total, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const bestsellers = menu.filter(m => m.bestseller);

  if (placed) {
    return (
      <Layout>
        <section className="container-page py-32 text-center">
          <div className="mx-auto max-w-md">
            <span className="grid h-16 w-16 mx-auto place-items-center rounded-full bg-accent text-accent-foreground"><ShoppingBag className="h-7 w-7" /></span>
            <h1 className="mt-6 font-serif text-4xl">Order placed</h1>
            <p className="mt-3 text-muted-foreground">Thanks! Your order will be ready for pickup in about 10 minutes.</p>
            <button onClick={() => setPlaced(false)} className="mt-8 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90">Order more</button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-page py-16 md:py-20">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Order Online</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Pick up in 10.</h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Bestsellers */}
          <div>
            <h2 className="font-serif text-2xl mb-5">Featured Bestsellers</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {bestsellers.map(m => (
                <article key={m.id} className="flex gap-4 rounded-2xl border border-border bg-card p-3 hover-lift">
                  <img src={m.image} alt={m.name} loading="lazy" width={120} height={120} className="h-24 w-24 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-serif text-lg truncate">{m.name}</h3>
                      <span className="text-primary font-medium shrink-0">${m.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{m.description}</p>
                    <button onClick={() => add({ id: m.id, name: m.name, price: m.price, image: m.image })} className="mt-auto self-start text-sm font-medium text-accent hover:underline">+ Add to cart</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/menu" className="text-sm font-medium underline underline-offset-4">Browse full menu →</Link>
            </div>
          </div>

          {/* Cart */}
          <aside className="rounded-2xl border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl">Your Order</h2>
            {items.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Your cart is empty. Add a drink to get started.</p>
            ) : (
              <>
                <ul className="mt-5 divide-y divide-border">
                  {items.map(i => (
                    <li key={i.id} className="py-4 flex gap-3">
                      <img src={i.image} alt="" width={56} height={56} className="h-14 w-14 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-medium truncate">{i.name}</p>
                          <button onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`} className="text-muted-foreground hover:text-destructive shrink-0"><Trash2 className="h-4 w-4" /></button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease" className="grid h-7 w-7 place-items-center hover:bg-secondary rounded-l-full"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="w-7 text-center text-sm">{i.qty}</span>
                            <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase" className="grid h-7 w-7 place-items-center hover:bg-secondary rounded-r-full"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <span className="text-sm font-medium">${(i.price * i.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-5 border-t border-border flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                </div>
                <button onClick={() => { setPlaced(true); clear(); }} className="mt-5 w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:opacity-90 transition">Place pickup order</button>
              </>
            )}
          </aside>
        </div>
      </section>
    </Layout>
  );
}
