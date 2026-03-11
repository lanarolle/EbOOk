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
        <GlassCard className="p-2 w-full aspect-[2/3] relative overflow-hidden flex items-center justify-center border-neon-cyan/20 shadow-[0_0_30px_rgba(0,245,255,0.15)] bg-bg-surface">
          {book.cover_image_url ? (
             <Image
             src={book.cover_image_url}
             alt={book.title}
             fill
             className="object-cover rounded-xl transition-transform duration-700 hover:scale-105"
           />
          ) : (
             <div className="flex flex-col items-center opacity-30">
               <span className="font-orbitron font-bold text-text-muted tracking-widest uppercase text-xl">Cover</span>
               <span className="font-orbitron font-bold text-text-muted tracking-widest uppercase text-xl">Missing</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 via-transparent to-transparent opacity-80 rounded-xl" />
        </GlassCard>

        <div className="flex flex-col gap-4 sticky top-24">
          <NeonButton neonVariant="cta" size="lg" className="w-full text-lg h-16 shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <span className="tracking-widest">BUY NOW</span> 
            <span className="ml-3 font-mono text-white/90">| ${Number(book.price).toFixed(2)}</span>
          </NeonButton>
          <NeonButton neonVariant="outline" size="lg" className="w-full h-14">
            Add to Configuration (Cart)
          </NeonButton>
          <div className="flex gap-4 w-full mt-2">
             <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-bg-surface border border-white/10 rounded-lg text-text-muted hover:text-neon-purple hover:border-neon-purple hover:shadow-[0_0_15px_rgba(191,0,255,0.2)] transition-all">
                <Heart className="w-4 h-4" /> Wishlist
             </button>
             <button className="flex-1 flex items-center justify-center gap-2 h-12 bg-bg-surface border border-white/10 rounded-lg text-text-muted hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all">
                <Share2 className="w-4 h-4" /> Transmit
             </button>
          </div>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            {book.category && (
               <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neon-purple border border-neon-purple/50 rounded-full shadow-[0_0_15px_rgba(191,0,255,0.3)] bg-neon-purple/5">
                  {book.category}
               </span>
            )}
            <div className="flex items-center space-x-2 shrink-0 bg-bg-surface/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
              <Star className="w-4 h-4 text-neon-gold fill-neon-gold drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
              <span className="text-sm font-mono font-bold text-neon-gold">{book.rating_avg ? book.rating_avg.toFixed(1) : '0.0'}</span>
              <span className="text-xs text-text-muted">({book.rating_count || 0} signals)</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-text-muted drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] leading-tight py-2">
            {book.title}
          </h1>

          <div className="flex items-center gap-4 border-b border-white/10 pb-8 mt-2">
             <div className="w-14 h-14 rounded-full bg-bg-void border-2 border-neon-cyan/50 overflow-hidden shadow-[0_0_15px_rgba(0,245,255,0.3)] flex items-center justify-center">
                <span className="font-orbitron font-bold text-neon-cyan text-lg">
                  {book.seller_id.substring(0, 1).toUpperCase()}
                </span>
             </div>
             <div>
                <p className="text-xs text-text-muted font-sans uppercase tracking-widest">Transmitted by</p>
                <p className="text-neon-cyan font-bold font-orbitron tracking-wider text-lg hover:underline cursor-pointer">
                  SELLER_{book.seller_id.substring(0, 6)}
                </p>
             </div>
          </div>
        </div>

        <div className="space-y-5">
           <h3 className="text-2xl font-orbitron font-bold text-white flex items-center gap-3">
             <span className="w-1 h-6 bg-neon-purple shadow-[0_0_10px_rgba(191,0,255,0.8)]"></span>
             Synopsis / Directive
           </h3>
           <p className="text-text-primary text-lg leading-relaxed whitespace-pre-wrap font-sans opacity-90">
              {book.description || "No transmission data found for this manuscript."}
           </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/10 bg-bg-surface/20 rounded-2xl p-6 backdrop-blur-md shadow-inner">
           <div className="flex flex-col gap-2 text-center items-center">
              <FileText className="w-6 h-6 text-neon-cyan mb-1 opacity-80" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Pages</span>
              <span className="font-mono text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{book.pages || '?'}</span>
           </div>
           <div className="flex flex-col gap-2 text-center items-center border-l border-white/10">
              <Download className="w-6 h-6 text-neon-gold mb-1 opacity-80" />
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Downloads</span>
              <span className="font-mono text-2xl font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{book.total_sales || 0}</span>
           </div>
           <div className="flex flex-col gap-2 text-center items-center col-span-2 md:col-span-2 bg-bg-void/60 rounded-xl p-4 border border-white/5 shadow-inner">
              <span className="text-[10px] text-neon-purple uppercase tracking-widest font-bold mb-1">Language Protocol</span>
              <span className="font-mono font-bold text-white text-xl tracking-widest">{book.language || 'EN-US'}</span>
           </div>
        </div>

        {/* Free Preview Section if preview_pages exist */}
        <div className="space-y-5 pt-4">
           <h3 className="text-2xl font-orbitron font-bold text-white flex items-center gap-3">
             <span className="w-1 h-6 bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)]"></span>
             Decrypted Preview
           </h3>
           <GlassCard className="p-10 flex flex-col items-center justify-center text-center gap-6 min-h-[250px] border-dashed border-white/20 bg-gradient-to-b from-transparent to-bg-surface/30">
              <div className="w-16 h-16 rounded-full bg-neon-cyan/10 flex items-center justify-center border border-neon-cyan/30">
                <FileText className="w-8 h-8 text-neon-cyan" />
              </div>
              <div className="space-y-2 max-w-sm">
                <p className="text-white font-bold tracking-wide">Stream Initialized</p>
                <p className="text-sm text-text-muted">A {book.preview_pages || 5}-page unencrypted preview is available for this transmission.</p>
              </div>
              <NeonButton neonVariant="outline" size="sm" className="px-8 shadow-none">
                <FileText className="w-4 h-4 mr-2" /> View Preview Stream
              </NeonButton>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
