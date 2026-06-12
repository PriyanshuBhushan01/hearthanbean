import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brew Haven" },
      { name: "description", content: "Visit Brew Haven in Bhopal. Find our location, hours, phone and contact form." },
      { property: "og:title", content: "Contact — Brew Haven" },
      { property: "og:description", content: "Find us in Bhopal. Hours, map and contact form." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(1, "Required").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) { setErr(r.error.issues[0]?.message ?? "Invalid input"); return; }
    setErr(null); setDone(true); setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="container-page py-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
        <h1 className="mt-3 font-serif text-5xl md:text-6xl">Come say hello.</h1>

        <div className="mt-14 grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[
              { Icon: MapPin, label: "Visit", value: "jhangirabad, bhopal, madhya pradesh" },
              { Icon: Clock, label: "Hours", value: "Mon–Fri 7am–8pm · Sat–Sun 8am–9pm" },
              { Icon: Phone, label: "Call", value: "(718) 555-0142" },
              { Icon: Mail, label: "Email", value: "hello@brewhaven.cafe" },
            ].map(i => (
              <div key={i.label} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><i.Icon className="h-5 w-5" /></span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{i.label}</p>
                  <p className="text-foreground">{i.value}</p>
                </div>
              </div>
            ))}

            <div className="overflow-hidden rounded-2xl border border-border aspect-[4/3]">
              <iframe
                title="Brew Haven location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-73.965%2C40.706%2C-73.940%2C40.722&layer=mapnik"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-7 space-y-4">
            <h2 className="font-serif text-2xl">Send a note</h2>
            <div>
              <label htmlFor="name" className="block text-sm mb-1.5">Name</label>
              <input id="name" required maxLength={100} value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1.5">Email</label>
              <input id="email" type="email" required maxLength={255} value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm mb-1.5">Message</label>
              <textarea id="message" required maxLength={1000} rows={5} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-ring resize-y" />
            </div>
            {err && <p className="text-sm text-destructive" role="alert">{err}</p>}
            {done && <p className="text-sm text-accent" role="status">Got it — we'll be in touch soon.</p>}
            <button className="w-full rounded-full bg-primary text-primary-foreground py-3 text-sm font-medium hover:opacity-90 transition">Send message</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
