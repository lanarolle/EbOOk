import { Book } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <GlassCard className="group relative flex flex-col overflow-hidden h-full border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 bg-background/40 backdrop-blur-xl">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-background">
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
            <span className="text-muted-foreground font-heading tracking-widest text-sm uppercase">Cover</span>
            <span className="text-muted-foreground font-heading tracking-widest text-sm uppercase">Missing</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute top-3 left-3 z-10">
          {book.category && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-background/60 text-primary border-none rounded-full backdrop-blur-md shadow-sm">
              {book.category}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 space-y-4 z-10 -mt-16">
        <div className="flex justify-between items-start gap-3">
          <Link href={`/book/${book.slug || book.id}`} className="hover:underline decoration-primary decoration-2 underline-offset-4 flex-grow">
            <h3 className="font-heading font-bold text-lg text-foreground line-clamp-2 leading-tight drop-shadow-sm">
              {book.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 shrink-0 bg-background/50 backdrop-blur-md px-2 py-1 rounded-md border-none shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="text-xs font-sans font-bold text-foreground">{book.rating_avg ? book.rating_avg.toFixed(1) : '0.0'}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow leading-relaxed">
          {book.description || "No description available."}
        </p>

        <div className="pt-4 flex items-center justify-between mt-auto border-t border-border/30">
          <div className="font-sans text-2xl font-bold text-foreground drop-shadow-sm">
            Rs. {Number(book.price).toFixed(2)}
          </div>
          <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-xs px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-sm font-semibold hover:bg-primary/90">
            Add to Bag
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
