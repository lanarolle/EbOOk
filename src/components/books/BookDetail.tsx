"use client";

import { Book } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import { Star, FileText, Download, Share2, Heart } from "lucide-react";
import Image from "next/image";

interface BookDetailProps {
  book: Book;
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl flex flex-col md:flex-row gap-12 mt-4 md:mt-8">
      {/* Left Column: Cover & Actions */}
      <div className="w-full md:w-1/3 flex flex-col gap-8 shrink-0">
        <GlassCard className="p-2 w-full aspect-[2/3] relative overflow-hidden flex items-center justify-center border-none bg-background/40 backdrop-blur-xl group">
          {book.cover_image_url ? (
             <Image
             src={book.cover_image_url}
             alt={book.title}
             fill
             className="object-cover rounded-xl transition-transform duration-700 hover:scale-105"
           />
          ) : (
             <div className="flex flex-col items-center opacity-30">
               <span className="font-heading font-bold text-muted-foreground tracking-widest uppercase text-xl">Cover</span>
               <span className="font-heading font-bold text-muted-foreground tracking-widest uppercase text-xl">Missing</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80 rounded-xl" />
        </GlassCard>

        <div className="flex flex-col gap-4 sticky top-24">
          <button className="w-full text-lg h-16 rounded-md bg-primary text-primary-foreground font-semibold shadow-[0_8px_32px_0_rgba(var(--primary),0.2)] hover:opacity-90 transition-all">
            <span className="tracking-widest">BUY NOW</span> 
            <span className="ml-3 font-sans opacity-90">| Rs {Number(book.price).toFixed(2)}</span>
          </button>
          <button className="w-full h-14 rounded-md bg-background/40 backdrop-blur-md border border-white/5 text-foreground font-medium hover:bg-background/60 transition-colors shadow-sm">
            Add to Bag
          </button>
          <div className="flex gap-4 w-full mt-2">
             <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-background/40 backdrop-blur-md border-none rounded-lg text-muted-foreground hover:text-primary transition-all shadow-sm">
                <Heart className="w-4 h-4" /> Wishlist
             </button>
             <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-background/40 backdrop-blur-md border-none rounded-lg text-muted-foreground hover:text-primary transition-all shadow-sm">
                <Share2 className="w-4 h-4" /> Share
             </button>
          </div>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            {book.category && (
               <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary border-none rounded-full bg-primary/10 shadow-sm backdrop-blur-sm">
                  {book.category}
               </span>
            )}
            <div className="flex items-center space-x-2 shrink-0 bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-full border-none shadow-sm">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-sans font-bold text-foreground">{book.rating_avg ? book.rating_avg.toFixed(1) : '0.0'}</span>
              <span className="text-xs text-muted-foreground">({book.rating_count || 0} reviews)</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground leading-tight py-2">
            {book.title}
          </h1>

          <div className="flex items-center gap-4 border-none pb-8 mt-2">
             <div className="w-14 h-14 rounded-full bg-background/40 backdrop-blur-md border-none overflow-hidden flex items-center justify-center shadow-sm">
                <span className="font-heading font-bold text-foreground text-lg">
                  {book.seller_id.substring(0, 1).toUpperCase()}
                </span>
             </div>
             <div>
                <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest">Published by</p>
                <p className="text-foreground font-bold font-heading tracking-wider text-lg hover:underline cursor-pointer">
                  AUTHOR_{book.seller_id.substring(0, 6)}
                </p>
             </div>
          </div>
        </div>

        <div className="space-y-5">
           <h3 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
             <span className="w-1 h-6 bg-primary"></span>
             Synopsis
           </h3>
           <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap font-sans opacity-90">
              {book.description || "No description found for this manuscript."}
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-none bg-background/40 backdrop-blur-xl rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
           <div className="flex flex-col gap-2 text-center items-center">
              <FileText className="w-6 h-6 text-primary mb-1 opacity-80" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Pages</span>
              <span className="font-sans text-2xl font-bold text-foreground">{book.pages || '?'}</span>
           </div>
           <div className="flex flex-col gap-2 text-center items-center border-none">
              <Download className="w-6 h-6 text-primary mb-1 opacity-80" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Downloads</span>
              <span className="font-sans text-2xl font-bold text-foreground">{book.total_sales || 0}</span>
           </div>
           <div className="flex flex-col gap-2 text-center items-center col-span-2 md:col-span-2 bg-background/50 rounded-xl p-4 border-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold mb-1">Language</span>
              <span className="font-sans font-bold text-foreground text-xl tracking-widest">{book.language || 'EN-US'}</span>
           </div>
        </div>

        {/* Free Preview Section if preview_pages exist */}
        <div className="space-y-5 pt-4">
           <h3 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
             <span className="w-1 h-6 bg-primary"></span>
             Preview
           </h3>
           <GlassCard className="p-10 flex flex-col items-center justify-center text-center gap-6 min-h-[250px] border-none bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-none shadow-inner">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2 max-w-sm">
                <p className="text-foreground font-bold tracking-wide">Available</p>
                <p className="text-sm text-muted-foreground">A {book.preview_pages || 5}-page preview is available for this manuscript.</p>
              </div>
              <button className="px-6 py-2 rounded-md bg-background/50 backdrop-blur-md border-none shadow-sm text-foreground font-medium hover:bg-background/80 transition-colors flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" /> View Preview
              </button>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
