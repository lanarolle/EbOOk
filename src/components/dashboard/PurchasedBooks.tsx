import { GlassCard } from "@/components/common/GlassCard";
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
         <h3 className="text-xl font-heading text-white">No Protocols Acquired</h3>
         <p className="text-muted-foreground">Your database is empty. Visit the browse hub to acquire new knowledge.</p>
         <Link href="/browse" className="mt-4">
            <button className="px-6 py-2 rounded-md bg-background/50 backdrop-blur-md border-none shadow-sm text-foreground font-medium hover:bg-background/80 transition-colors">Browse Hub</button>
         </Link>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {books.map((book) => (
        <GlassCard key={book.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-all bg-background/40 backdrop-blur-xl hover:bg-background/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border-none">
          <div className="relative w-32 h-44 shrink-0 rounded-lg overflow-hidden border-none shadow-sm">
            {book.cover_image_url ? (
              <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-bg-void flex items-center justify-center">
                 <span className="text-xs uppercase text-text-muted tracking-widest font-heading">No Cover</span>
              </div>
            )}
            <div className="absolute top-2 right-2 bg-background/80 rounded-full p-1 border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)]">
               <CheckCircle2 className="w-4 h-4 text-primary drop-shadow-sm" />
            </div>
          </div>
          
          <div className="flex flex-col flex-grow text-center sm:text-left h-full justify-between">
            <div className="space-y-2">
               <h3 className="font-heading font-bold text-xl text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{book.title}</h3>
               <p className="text-sm text-neon-purple uppercase tracking-widest font-bold font-sans">
                  Seller_{book.seller_id.substring(0, 8)}
               </p>
               <p className="text-sm text-text-muted line-clamp-2 mt-2">{book.description}</p>
            </div>
            
            <div className="mt-6 sm:mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/10">
               {book.pdf_url ? (
                  <a href={book.pdf_url} download target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors shadow-sm">
                     <Download className="w-4 h-4" /> Download Authenticated PDF
                  </a>
               ) : (
                  <button disabled className="flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-muted/20 text-muted-foreground font-medium cursor-not-allowed">
                     <Download className="w-4 h-4" /> File Unavailable
                  </button>
               )}
               <Link href={`/book/${book.id}`} className="flex items-center justify-center px-6 py-2 rounded-md bg-background/50 backdrop-blur-md text-foreground font-medium hover:bg-background/80 transition-colors shadow-sm w-full sm:w-auto">
                  View Details
               </Link>
               <button className="flex items-center justify-center px-6 py-2 rounded-md bg-transparent text-muted-foreground hover:text-foreground font-medium transition-colors w-full sm:w-auto">
                  Leave Review
               </button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
