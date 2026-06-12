import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import beans from "@/assets/coffee-beans.jpg";
import barista from "@/assets/barista.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — The Snug Mug" },
      { name: "description", content: "The Snug Mug began as a tiny corner roastery in Brooklyn. Today we serve ethically sourced, handcrafted coffee with a passion for sustainability." },
      { property: "og:title", content: "Our Story — The Snug Mug" },
      { property: "og:description", content: "Ethically sourced beans, sustainable practices, handcrafted beverages." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <Layout>
      <section className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Our Story</p>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl leading-[1.05]">A quiet love letter to coffee.</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">The Snug Mug started in 2014 as a single roaster in a Williamsburg garage. Ten years on, we still roast every bean ourselves — small batch, every week — because we believe a good cup begins long before the espresso pulls.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">We partner directly with growers in Ethiopia, Colombia and Guatemala, paying above fair-trade so the people behind every harvest can thrive. What lands in your cup is the result of countless hands — and we honor every one of them.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={beans} alt="Roasted coffee beans" loading="lazy" width={600} height={600} className="rounded-2xl aspect-square object-cover row-span-2 h-full" />
            <img src={barista} alt="Barista pouring latte art" loading="lazy" width={600} height={750} className="rounded-2xl aspect-[4/5] object-cover" />
            <div className="rounded-2xl bg-secondary p-6 flex flex-col justify-center">
              <p className="font-serif text-4xl text-primary">10<span className="text-accent">+</span></p>
              <p className="text-sm text-muted-foreground mt-1">Years roasting in Brooklyn</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border py-20">
        <div className="container-page grid md:grid-cols-3 gap-10">
          {[
            { title: "Quality first", text: "Every batch is cupped before it reaches the bar. If it doesn't meet our standard, it doesn't pour." },
            { title: "Sustainability", text: "Compostable cups, ceramic-first, and a roastery powered by renewable electricity since 2019." },
            { title: "Community", text: "We host open cuppings, host local artists on our walls, and donate 1% of revenue to literacy programs." },
          ].map(v => (
            <div key={v.title}>
              <h2 className="font-serif text-2xl">{v.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
