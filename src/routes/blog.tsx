import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import beans from "@/assets/coffee-beans.jpg";
import barista from "@/assets/barista.jpg";
import latte from "@/assets/latte-art.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Brew Haven" },
      { name: "description", content: "Articles on coffee brewing techniques, bean origins, café news and barista craft from Brew Haven." },
      { property: "og:title", content: "Journal — Brew Haven" },
      { property: "og:description", content: "Coffee brewing, origins and café stories." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { slug: "pour-over-guide", title: "A Quiet Pour-Over Ritual", date: "May 28, 2026", excerpt: "The science (and patience) behind a flawless V60 at home.", img: latte, tag: "Brewing" },
  { slug: "ethiopia-yirgacheffe", title: "Why Yirgacheffe Tastes Like Sunshine", date: "May 12, 2026", excerpt: "Inside our latest Ethiopian micro-lot and the family behind it.", img: beans, tag: "Origins" },
  { slug: "milk-science", title: "The Physics of Silky Milk", date: "Apr 30, 2026", excerpt: "Steam wand technique, fat content, and why your foam is too bubbly.", img: barista, tag: "Craft" },
];

function Blog() {
  return (
    <Layout>
      <section className="container-page py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Journal</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Notes from the bar.</h1>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.map(p => (
            <article key={p.slug} className="group">
              <Link to="/blog" className="block overflow-hidden rounded-2xl aspect-[4/3] mb-5">
                <img src={p.img} alt="" loading="lazy" width={600} height={450} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <p className="text-xs uppercase tracking-wider text-accent">{p.tag} · {p.date}</p>
              <h2 className="mt-2 font-serif text-2xl leading-snug group-hover:text-primary transition">{p.title}</h2>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
              <Link to="/blog" className="mt-3 inline-block text-sm font-medium underline underline-offset-4">Read more</Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
