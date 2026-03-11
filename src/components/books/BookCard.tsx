import { Book } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <GlassCard className="group relative flex flex-col overflow-hidden h-full hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] hover:border-neon-cyan/50 hover:-translate-y-2 transition-all duration-500">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-bg-surface">
        {book.cover_image_url ? (
          <Image
            src={book.cover_image_url}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
            <span className="text-text-muted font-orbitron tracking-widest text-sm uppercase">Cover</span>
            <span className="text-text-muted font-orbitron tracking-widest text-sm uppercase">Missing</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-bg-surface/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute top-3 left-3 z-10">
          {book.category && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-bg-void/90 text-neon-purple border border-neon-purple/50 rounded-full backdrop-blur-md shadow-[0_0_10px_rgba(191,0,255,0.3)]">
              {book.category}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 space-y-4 z-10 -mt-16">
        <div className="flex justify-between items-start gap-3">
          <Link href={`/book/${book.slug || book.id}`} className="hover:underline decoration-neon-cyan decoration-2 underline-offset-4 flex-grow">
            <h3 className="font-orbitron font-bold text-lg text-text-primary line-clamp-2 leading-tight drop-shadow-md">
              {book.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 shrink-0 bg-bg-void/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <Star className="w-3.5 h-3.5 text-neon-gold fill-neon-gold shrink-0 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
            <span className="text-xs font-mono font-bold text-neon-gold">{book.rating_avg ? book.rating_avg.toFixed(1) : '0.0'}</span>
          </div>
        </div>
        
        <p className="text-sm text-text-muted line-clamp-2 flex-grow leading-relaxed">
          {book.description || "No description available."}
        </p>

        <div className="pt-4 flex items-center justify-between mt-auto border-t border-white/10">
          <div className="font-mono text-2xl font-bold text-neon-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
            ${Number(book.price).toFixed(2)}
          </div>
          <NeonButton size="sm" neonVariant="cta" className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-xs px-4">
            Add to Cart
          </NeonButton>
        </div>
      </div>
    </GlassCard>
  );
}
