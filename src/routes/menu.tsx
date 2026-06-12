import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { menu, categories } from "@/lib/menu-data";
import { useCart } from "@/lib/cart";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Brew Haven" },
      { name: "description", content: "Explore Brew Haven's full menu of espresso, cappuccino, latte, cold brew, tea, pastries and seasonal specials." },
      { property: "og:title", content: "Menu — Brew Haven" },
      { property: "og:description", content: "Espresso, lattes, cold brew, tea and fresh pastries." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { add, items } = useCart();
  const [active, setActive] = useState<string>("All");
  const [added, setAdded] = useState<string | null>(null);
  const cats = ["All", ...categories];
  const visible = active === "All" ? menu : menu.filter(m => m.category === active);

  const onAdd = (m: typeof menu[number]) => {
    add({ id: m.id, name: m.name, price: m.price, image: m.image });
    setAdded(m.id); setTimeout(() => setAdded(null), 1200);
  };

  return (
    <Layout>
      <section className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">The Menu</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">Every cup, with intention.</h1>
          <p className="mt-4 text-muted-foreground">Prices include tax. Oat, almond and soy milks available on request.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`rounded-full px-4 py-2 text-sm transition border ${active === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"}`}>{c}</button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(m => {
            const inCart = items.find(i => i.id === m.id);
            return (
              <article key={m.id} className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" width={600} height={450} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl truncate">{m.name}</h3>
                    <span className="font-medium text-primary shrink-0">${m.price.toFixed(2)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground flex-1">{m.description}</p>
                  <button onClick={() => onAdd(m)} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-secondary text-secondary-foreground py-2.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition">
                    {added === m.id ? <><Check className="h-4 w-4" /> Added</> : <><Plus className="h-4 w-4" /> Add{inCart ? ` (${inCart.qty})` : ""}</>}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
