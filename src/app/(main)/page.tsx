import { NeonButton } from "@/components/common/NeonButton";
import { BookCard } from "@/components/books/BookCard";
import Link from "next/link";
import { Book } from "@/types";

// Mock data for featured books (To be replaced with real Supabase data)
const FEATURED_BOOKS: Book[] = [
  {
    id: "1",
    seller_id: "s1",
    title: "Neuromancer Chronicles",
    slug: "neuromancer-chronicles",
    description: "A deep dive into the cyberpunk reality of the next century.",
    price: 14.99,
    currency: "USD",
    category: "Sci-Fi",
    rating_avg: 4.8,
    is_published: true,
    is_featured: true,
    total_sales: 1540,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    seller_id: "s2",
    title: "Digital Fortress",
    slug: "digital-fortress",
    description: "The ultimate guide to cyberspace security protocols.",
    price: 29.99,
    currency: "USD",
    category: "Technology",
    rating_avg: 4.9,
    is_published: true,
    is_featured: true,
    total_sales: 890,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    seller_id: "s3",
    title: "Zero-G Combat Tactics",
    slug: "zero-g-combat",
    description: "Military strategies for low-gravity environments.",
    price: 19.50,
    currency: "USD",
    category: "Action",
    rating_avg: 4.6,
    is_published: true,
    is_featured: true,
    total_sales: 420,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    seller_id: "s4",
    title: "Syntax of the Stars",
    slug: "syntax-stars",
    description: "Programming languages used by extraterrestrial colonizers.",
    price: 49.99,
    currency: "USD",
    category: "Programming",
    rating_avg: 5.0,
    is_published: true,
    is_featured: true,
    total_sales: 2100,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const metadata = {
  title: "AntiGravity | Read Beyond Gravity",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-void/50 to-bg-void z-0" />
        
        <div className="z-10 container px-4 mx-auto text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple drop-shadow-[0_0_25px_rgba(0,245,255,0.6)] mb-6">
            READ BEYOND GRAVITY
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-text-muted mb-10 font-sans">
            Discover and trade digital literature in the premier futuristic marketplace. Join thousands of pilots charting new worlds of fiction and non-fiction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/browse">
              <NeonButton neonVariant="primary" size="lg" className="w-full sm:w-auto text-lg px-8 h-14">
                Explore Library
              </NeonButton>
            </Link>
            <Link href="/sell">
              <NeonButton neonVariant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 h-14">
                Become a Seller
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="w-full border-y border-white/10 bg-bg-surface/30 backdrop-blur-sm py-8 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
            <div className="flex flex-col">
              <span className="text-4xl font-orbitron font-bold text-neon-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]">42K+</span>
              <span className="text-sm text-text-muted uppercase tracking-widest mt-2">Books Sold</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-orbitron font-bold text-neon-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">8,500</span>
              <span className="text-sm text-text-muted uppercase tracking-widest mt-2">Active Sellers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-orbitron font-bold text-neon-purple drop-shadow-[0_0_8px_rgba(191,0,255,0.5)]">15+</span>
              <span className="text-sm text-text-muted uppercase tracking-widest mt-2">Categories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-orbitron font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">4.9</span>
              <span className="text-sm text-text-muted uppercase tracking-widest mt-2">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full py-24 z-10 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white flex items-center gap-4">
            <span className="w-8 h-1 bg-neon-cyan drop-shadow-[0_0_5px_rgba(0,245,255,1)]"></span>
            Trending Downloads
          </h2>
          <Link href="/browse" className="text-neon-cyan hover:underline hidden sm:block tracking-wider font-semibold text-sm transition-colors">
            VIEW ALL PROTOCOLS &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
          <Link href="/browse">
            <NeonButton neonVariant="outline" className="w-full">
              View All Protocols
            </NeonButton>
          </Link>
        </div>
      </section>
      
      {/* Seller CTA Section */}
      <section className="w-full py-24 relative overflow-hidden z-10 border-t border-white/5 bg-bg-surface/50">
        <div className="absolute inset-0 bg-gradient-to-tr from-bg-void via-bg-surface to-neon-purple/10 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(191,0,255,0.6)]">
            TRANSMIT YOUR KNOWLEDGE
          </h2>
          <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-2xl mx-auto">
            Keep 90% of your earnings. Connect your Stripe account and start selling your digital manuscripts across the galaxy in minutes.
          </p>
          <Link href="/sell">
            <NeonButton neonVariant="cta" size="lg" className="px-10 h-16 text-xl">
              Launch Seller Portal
            </NeonButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
