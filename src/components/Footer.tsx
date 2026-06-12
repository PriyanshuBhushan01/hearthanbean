import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Brew Haven" className="h-9 w-9 object-contain" />
            <span className="font-serif text-2xl font-semibold">Brew Haven</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">Crafted coffee, made with passion. Ethically sourced, freshly roasted, served with care.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Visit</h3>
          <p className="text-sm text-muted-foreground leading-relaxed text-balance">jhangirabad, bhopal,<br/>madhya pradesh.<br/>pin - 462022.<br/>Mon–Fri 7am–8pm<br/>Sat–Sun 8am–9pm</p>
          <p className="mt-2 text-sm text-muted-foreground">9425795775</p>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            {[
              ["/menu", "Menu"], ["/order", "Order Online"], ["/about", "Our Story"],
              ["/events", "Events"], ["/blog", "Journal"], ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}><Link to={to as string} className="text-muted-foreground hover:text-foreground transition">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg mb-4">Newsletter</h3>
          <p className="text-sm text-muted-foreground mb-3">New roasts, events, and stories — once a month.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }} className="flex gap-2">
            <label className="sr-only" htmlFor="newsletter-email">Email</label>
            <input id="newsletter-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition" aria-label="Subscribe"><Mail className="h-4 w-4" /></button>
          </form>
          {done && <p className="mt-2 text-xs text-accent">Thanks — see you in your inbox.</p>}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} Brew Haven. All rights reserved.</span>
          <span>Crafted with care.</span>
        </div>
      </div>
    </footer>
  );
}
