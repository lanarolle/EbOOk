"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function CartToggle() {
  const { items, toggleCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-text-muted hover:text-neon-cyan transition-all focus:outline-none hover:scale-110 active:scale-95"
    >
      <ShoppingCart className="w-5 h-5 drop-shadow-[0_0_5px_rgba(0,245,255,0)] hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.8)] transition-all" />
      {mounted && items.length > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-bg-void bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,245,255,0.8)] translate-x-1/4 -translate-y-1/4 border border-bg-void">
          {items.length}
        </span>
      )}
    </button>
  );
}
