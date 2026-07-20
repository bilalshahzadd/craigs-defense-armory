"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  variant?: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, variant?: string) => void;
  setQty: (slug: string, variant: string | undefined, qty: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vanta-cart";

function keyOf(slug: string, variant?: string) {
  return `${slug}::${variant ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const k = keyOf(item.slug, item.variant);
      const existing = prev.find((p) => keyOf(p.slug, p.variant) === k);
      if (existing) {
        return prev.map((p) =>
          keyOf(p.slug, p.variant) === k ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string, variant?: string) => {
    const k = keyOf(slug, variant);
    setItems((prev) => prev.filter((p) => keyOf(p.slug, p.variant) !== k));
  }, []);

  const setQty = useCallback(
    (slug: string, variant: string | undefined, qty: number) => {
      const k = keyOf(slug, variant);
      setItems((prev) =>
        prev
          .map((p) =>
            keyOf(p.slug, p.variant) === k ? { ...p, qty: Math.max(0, qty) } : p
          )
          .filter((p) => p.qty > 0)
      );
    },
    []
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, p) => n + p.qty, 0);
    const subtotal = items.reduce((n, p) => n + p.qty * p.price, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      remove,
      setQty,
    };
  }, [items, isOpen, add, remove, setQty]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
