import { CartItemType, useCartStore } from "@/lib/stores/cartStore";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export function CartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 py-4 border-b border-white/10 items-center bg-bg-surface/30 px-3 rounded-lg mb-2 shadow-inner group transition-colors hover:bg-bg-surface">
      <div className="relative w-16 h-20 shrink-0 rounded overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] border border-white/5">
        {item.book.cover_image_url ? (
          <Image
            src={item.book.cover_image_url}
            alt={item.book.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-bg-void flex items-center justify-center opacity-70">
             <span className="text-[8px] uppercase tracking-widest text-text-muted font-bold">Missing</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow truncate space-y-1">
        <h4 className="font-heading font-bold text-sm text-text-primary truncate">{item.book.title}</h4>
        <p className="text-[10px] text-neon-cyan mt-1 font-sans uppercase tracking-widest bg-neon-cyan/5 border border-neon-cyan/20 inline-block px-1.5 py-0.5 rounded w-max">
          Seller_{item.book.seller_id.substring(0, 5)}
        </p>
        <div className="mt-auto font-sans text-neon-gold text-sm font-bold drop-shadow-[0_0_5px_rgba(255,215,0,0.4)] pt-1">
          Rs {Number(item.book.price).toFixed(2)}
        </div>
      </div>

      <button
        onClick={() => removeItem(item.book.id)}
        className="p-2 text-text-muted hover:text-red-500 hover:bg-red-500/10 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] rounded transition-all ml-auto"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
