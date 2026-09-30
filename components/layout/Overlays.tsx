"use client";

import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchOverlay } from "@/components/shop/SearchOverlay";
import { WishlistDrawer } from "@/components/shop/WishlistDrawer";
import { MobileNav } from "./MobileNav";

/** All global dialogs, mounted once in the root layout. */
export function Overlays() {
  return (
    <>
      <MobileNav />
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
    </>
  );
}
