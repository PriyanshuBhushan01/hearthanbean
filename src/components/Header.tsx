import { Link } from "@tanstack/react-router";
import { Moon, ShoppingBag, Sun, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { theme, toggle } = useTheme();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="The Snug Mug" className="h-9 w-9 object-contain transition-transform group-hover:rotate-12" />
          <span className="font-serif text-2xl font-semibold tracking-tight">The Snug Mug</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary transition">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/order" aria-label="Cart" className="relative grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary transition">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-foreground">{count}</span>
            )}
          </Link>
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-secondary transition">
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-in">
          <div className="container-page flex flex-col py-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2.5 text-sm text-muted-foreground hover:text-foreground">{l.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
