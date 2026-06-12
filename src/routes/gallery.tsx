import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import hero from "@/assets/hero-cafe.jpg";
import latte from "@/assets/latte-art.jpg";
import beans from "@/assets/coffee-beans.jpg";
import barista from "@/assets/barista.jpg";
import coldBrew from "@/assets/cold-brew.jpg";
import cappuccino from "@/assets/cappuccino.jpg";
import pastries from "@/assets/pastries.jpg";
import espresso from "@/assets/espresso.jpg";
import tea from "@/assets/tea.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — The Snug Mug" },
      { name: "description", content: "Step inside The Snug Mug — coffee drinks, baristas at work, café ambiance and seasonal food in photos." },
      { property: "og:title", content: "Gallery — The Snug Mug" },
      { property: "og:description", content: "A visual walk through The Snug Mug." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const images = [
  { src: hero, alt: "Cafe interior at golden hour", span: "md:col-span-2 md:row-span-2" },
  { src: latte, alt: "Latte with rosetta art" },
  { src: beans, alt: "Roasted coffee beans macro" },
  { src: barista, alt: "Barista pouring latte art", span: "md:row-span-2" },
  { src: coldBrew, alt: "Iced cold brew in tall glass" },
  { src: cappuccino, alt: "Cappuccino with croissant" },
  { src: pastries, alt: "Artisan pastries on display", span: "md:col-span-2" },
  { src: espresso, alt: "Espresso shot with crema" },
  { src: tea, alt: "Herbal tea with honey" },
];

function Gallery() {
  return (
    <Layout>
      <section className="container-page py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Gallery</p>
          <h1 className="mt-3 font-serif text-5xl md:text-6xl">A walk through the haven.</h1>
        </div>
        <div className="mt-12 grid gap-3 grid-cols-2 md:grid-cols-4 auto-rows-[200px]">
          {images.map((img, i) => (
            <figure key={i} className={`relative overflow-hidden rounded-2xl group ${img.span ?? ""}`}>
              <img src={img.src} alt={img.alt} loading="lazy" width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-xs text-cream bg-gradient-to-t from-espresso/80 to-transparent opacity-0 group-hover:opacity-100 transition">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  );
}
