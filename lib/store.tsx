"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct } from "./products";

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export type Panel = "cart" | "wishlist" | "search" | "menu" | null;

interface StoreValue {
  cart: CartLine[];
  wishlist: string[];
  panel: Panel;
  cartCount: number;
  subtotal: number;
  openPanel: (panel: Panel) => void;
  closePanel: () => void;
  addToCart: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  removeFromCart: (slug: string, size: string) => void;
  toggleWishlist: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
}

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "kairo:cart";
const WISH_KEY = "kairo:wishlist";

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state simply won't persist */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Drop anything that no longer exists in the catalogue.
    setCart(readJSON<CartLine[]>(CART_KEY, []).filter((l) => getProduct(l.slug)));
    setWishlist(readJSON<string[]>(WISH_KEY, []).filter((s) => getProduct(s)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeJSON(CART_KEY, cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) writeJSON(WISH_KEY, wishlist);
  }, [wishlist, hydrated]);

  const closePanel = useCallback(() => setPanel(null), []);

  const addToCart = useCallback((slug: string, size: string, qty = 1) => {
    setCart((lines) => {
      const hit = lines.find((l) => l.slug === slug && l.size === size);
      if (hit) return lines.map((l) => (l === hit ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
      return [...lines, { slug, size, qty }];
    });
    setPanel("cart");
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setCart((lines) =>
      lines
        .map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(0, Math.min(9, qty)) } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, size: string) => {
    setCart((lines) => lines.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((list) => (list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug]));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = cart.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return {
      cart,
      wishlist,
      panel,
      cartCount,
      subtotal,
      openPanel: setPanel,
      closePanel,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      isWishlisted: (slug) => wishlist.includes(slug),
    };
  }, [cart, wishlist, panel, closePanel, addToCart, setQty, removeFromCart, toggleWishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
