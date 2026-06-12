import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Calendar, Music, Sparkles } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Promotions — Brew Haven" },
      { name: "description", content: "Live music nights, coffee workshops, latte art classes and seasonal promotions at Brew Haven." },
      { property: "og:title", content: "Events & Promotions — Brew Haven" },
      { property: "og:description", content: "Live music, workshops and seasonal offers." },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: Events,
});

const events = [
  { Icon: Music, date: "Every Friday · 7pm", title: "Acoustic Sessions", text: "Local songwriters take the back room. Free entry, espresso martinis half off." },
  { Icon: Sparkles, date: "Sat Jun 28 · 10am", title: "Latte Art Workshop", text: "Two hours with our head barista. Learn the heart, tulip and rosetta. $45." },
  { Icon: Calendar, date: "Sun Jul 14 · 11am", title: "Origins Cupping", text: "Taste through Ethiopia, Colombia and Guatemala side by side. $25 incl. a bag." },
];

const promos = [
  { title: "Happy Hour", text: "All cold brews $1 off, Mon–Thu after 3pm." },
  { title: "Bring a Friend", text: "Two drinks for the price of one every Tuesday morning." },
  { title: "Seasonal Bundle", text: "Maple Pecan Latte + Almond Danish for $9 — through August." },
];

function Events() {
  return (
    <Layout>
      <section className="container-page py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Events & Promotions</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Come for the coffee, stay for the company.</h1>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {events.map(e => (
            <article key={e.title} className="rounded-2xl border border-border bg-card p-7 hover-lift">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent"><e.Icon className="h-5 w-5" /></span>
              <p className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">{e.date}</p>
              <h2 className="mt-1 font-serif text-2xl">{e.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="font-serif text-3xl">Now on</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {promos.map(p => (
              <div key={p.title} className="rounded-2xl bg-secondary p-6">
                <h3 className="font-serif text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
