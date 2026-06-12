import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { id: string; name: string; price: number; image: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  count: number;
};
const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    try { const s = localStorage.getItem("cart"); if (s) setItems(JSON.parse(s)); } catch {}
  }, []);
  useEffect(() => { try { localStorage.setItem("cart", JSON.stringify(items)); } catch {} }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (item) => setItems(prev => {
      const ex = prev.find(p => p.id === item.id);
      return ex ? prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p) : [...prev, { ...item, qty: 1 }];
    }),
    remove: (id) => setItems(prev => prev.filter(p => p.id !== id)),
    setQty: (id, qty) => setItems(prev => qty <= 0 ? prev.filter(p => p.id !== id) : prev.map(p => p.id === id ? { ...p, qty } : p)),
    clear: () => setItems([]),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    count: items.reduce((s, i) => s + i.qty, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
};
