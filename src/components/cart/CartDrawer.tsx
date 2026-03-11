"use client";

import { useCartStore } from "@/lib/stores/cartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItem } from "./CartItem";
import { NeonButton } from "@/components/common/NeonButton";
import { ShoppingCart, LayoutGrid, AlertCircle } from "lucide-react";
import { useState } from "react";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, getCartTotal } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(data.error);
        setIsProcessing(false);
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-bg-surface/95 backdrop-blur-2xl border-l border-white/10 p-0 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.9)] z-[100]">
        <SheetHeader className="p-6 border-b border-white/10 bg-bg-void/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-transparent pointer-events-none" />
          <SheetTitle className="font-orbitron tracking-tight text-2xl font-bold flex items-center gap-3 text-white shadow-none relative z-10">
             <div className="w-10 h-10 rounded-full bg-neon-purple/10 flex items-center justify-center border border-neon-purple/30 shadow-[0_0_15px_rgba(191,0,255,0.4)]">
                <ShoppingCart className="w-5 h-5 text-neon-purple" />
             </div>
             <div>
               <span>Cargo Bay</span>
               <span className="text-xs text-text-muted font-mono tracking-widest uppercase block mt-1 font-normal">Active Configuration</span>
             </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gradient-to-b from-transparent to-bg-void/30">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] opacity-60 space-y-4">
              <LayoutGrid className="w-16 h-16 text-text-muted drop-shadow-md" />
              <p className="text-sm font-orbitron tracking-widest uppercase font-bold text-white">No parameters loaded</p>
              <p className="text-xs text-text-muted text-center max-w-[200px]">Browse the database and add protocols to your cargo bay.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <CartItem key={item.book.id} item={item} />
              ))}
              
              <div className="mt-4 bg-neon-purple/10 border border-neon-purple/20 rounded-lg p-3 flex gap-3 text-sm text-neon-purple shadow-inner items-start">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 <p className="opacity-90 leading-tight">Proceeding activates a secure Stripe transmission protocol. Your funds are protected across the galaxy.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-bg-void shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-10 relative">
          <div className="flex justify-between mb-6 font-mono text-lg items-end">
            <span className="text-text-muted uppercase tracking-widest text-xs font-bold leading-none mb-1">Total Authorized Credit</span>
            <span className="font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] text-3xl leading-none">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          <NeonButton 
            className="w-full h-14 text-lg tracking-widest shadow-[0_0_20px_rgba(191,0,255,0.4)] hover:shadow-[0_0_30px_rgba(191,0,255,0.6)]" 
            neonVariant="outline"
            disabled={items.length === 0 || isProcessing}
            onClick={handleCheckout}
          >
            {isProcessing ? "INITIALIZING..." : "INITIATE TRANSFER"}
          </NeonButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
