import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Coffee, Leaf, Heart, Star } from "lucide-react";
import hero from "@/assets/hero-cafe.jpg";
import { menu } from "@/lib/menu-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brew Haven — Crafted Coffee, Made with Passion" },
      { name: "description", content: "Specialty coffee shop in Brooklyn serving handcrafted espresso, cold brew, tea and fresh pastries. Order online or visit us." },
      { property: "og:title", content: "Brew Haven — Crafted Coffee" },
      { property: "og:description", content: "Handcrafted espresso, cold brew, tea and pastries in Brooklyn." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = menu.filter(m => m.bestseller).slice(0, 4);
  const testimonials = [
    { name: "Maya R.", quote: "The cold brew is unreal. I keep coming back for the vanilla cream version.", rating: 5 },
    { name: "Daniel K.", quote: "Brew Haven feels like a friend's living room — but with better coffee.", rating: 5 },
    { name: "Priya S.", quote: "Best latte art in the borough. The seasonal menu always surprises.", rating: 5 },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={hero} alt="Brew Haven cafe interior at golden hour" width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/55 to-espresso/85" />
        </div>
        <div className="container-page min-h-[88dvh] flex items-center py-24">
          <div className="max-w-2xl text-cream animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-cream/90 backdrop-blur">
              <Coffee className="h-3.5 w-3.5" /> Brooklyn · Specialty Roastery
            </span>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl md:text-7xl font-medium leading-[1.05] text-cream">
              Crafted Coffee, <br/><em className="text-accent not-italic font-normal">Made with Passion.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base sm:text-lg text-cream/80 leading-relaxed">
              Single-origin beans, slow rituals, and a warm seat by the window. Every cup at Brew Haven is poured with patience and a quiet kind of love.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/order" className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso transition hover:gap-3 hover:bg-accent hover:text-accent-foreground">
                Order Online <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/menu" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-medium text-cream transition hover:bg-cream/10">
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-3">
          {[
            { Icon: Leaf, title: "Ethically Sourced", text: "Direct-trade beans from farms we visit and trust." },
            { Icon: Coffee, title: "Small-Batch Roasted", text: "Roasted weekly in-house for peak freshness." },
            { Icon: Heart, title: "Handcrafted Daily", text: "Every drink poured with attention and care." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="flex gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Icon className="h-5 w-5" /></span>
              <div className="min-w-0">
                <h3 className="font-serif text-xl">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured drinks */}
      <section className="container-page py-24">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Bestsellers</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Loved by the Locals</h2>
          </div>
          <Link to="/menu" className="text-sm font-medium text-foreground inline-flex items-center gap-1 hover:gap-2 transition-all">
            See full menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map(d => (
            <article key={d.id} className="group rounded-2xl bg-card overflow-hidden border border-border hover-lift">
              <div className="aspect-square overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" width={600} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-baseline gap-3">
                  <h3 className="font-serif text-xl truncate">{d.name}</h3>
                  <span className="text-primary font-medium shrink-0">${d.price.toFixed(2)}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{d.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 border-y border-border py-24">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">Kind Words</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">From Our Regulars</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map(t => (
              <figure key={t.name} className="rounded-2xl bg-card p-7 border border-border">
                <div className="flex gap-1 text-accent mb-4">{Array.from({length: t.rating}).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <blockquote className="font-serif text-xl leading-snug text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-espresso text-primary-foreground p-12 md:p-16 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl">Pull up a chair.</h2>
          <p className="mt-4 max-w-xl mx-auto text-primary-foreground/80">Open daily from 7am. Whether you stay an hour or all afternoon, the coffee is on.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="rounded-full bg-cream px-6 py-3 text-sm font-medium text-espresso hover:bg-accent hover:text-accent-foreground transition">Find Us</Link>
            <Link to="/order" className="rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition">Order Ahead</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
