import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import { Book } from "@/types";
import { Download, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PurchasedBooksProps {
  books: Book[];
}

export function PurchasedBooks({ books }: PurchasedBooksProps) {
  if (!books || books.length === 0) {
    return (
      <GlassCard className="p-12 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-white/20">
         <FileText className="w-16 h-16 text-text-muted opacity-50" />
         <h3 className="text-xl font-orbitron text-white">No Protocols Acquired</h3>
         <p className="text-text-muted">Your database is empty. Visit the browse hub to acquire new knowledge.</p>
         <Link href="/browse" className="mt-4">
            <NeonButton neonVariant="outline">Browse Hub</NeonButton>
         </Link>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {books.map((book) => (
        <GlassCard key={book.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-all hover:bg-bg-surface/50">
          <div className="relative w-32 h-44 shrink-0 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {book.cover_image_url ? (
              <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-bg-void flex items-center justify-center">
                 <span className="text-xs uppercase text-text-muted tracking-widest font-orbitron">No Cover</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-bg-void/80 rounded-full p-1 border border-neon-cyan/50 shadow-inner">
               <CheckCircle2 className="w-4 h-4 text-neon-cyan drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]" />
            </div>
          </div>
          
          <div className="flex flex-col flex-grow text-center sm:text-left h-full justify-between">
            <div className="space-y-2">
               <h3 className="font-orbitron font-bold text-xl text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{book.title}</h3>
               <p className="text-sm text-neon-purple uppercase tracking-widest font-bold font-mono">
                  Seller_{book.seller_id.substring(0, 8)}
               </p>
               <p className="text-sm text-text-muted line-clamp-2 mt-2">{book.description}</p>
            </div>
            
            <div className="mt-6 sm:mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
               <NeonButton neonVariant="primary" className="flex items-center gap-2 px-6">
                  <Download className="w-4 h-4" /> Download Authenticated PDF
               </NeonButton>
               <Link href={`/book/${book.id}`}>
                  <NeonButton neonVariant="outline" className="w-full sm:w-auto">View Details</NeonButton>
               </Link>
               <NeonButton variant="ghost" className="text-text-muted hover:text-white" neonVariant="outline">
                  Leave Review
               </NeonButton>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
