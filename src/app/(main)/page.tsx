import { BookCard } from "@/components/books/BookCard";
import Image from "next/image";
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
    price: 1499,
    currency: "LKR",
    category: "Sci-Fi",
    rating_avg: 4.8,
    is_published: true,
    is_featured: true,
    total_sales: 1540,
    cover_image_url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    seller_id: "s2",
    title: "Digital Fortress",
    slug: "digital-fortress",
    description: "The ultimate guide to cyberspace security protocols.",
    price: 2999,
    currency: "LKR",
    category: "Technology",
    rating_avg: 4.9,
    is_published: true,
    is_featured: true,
    total_sales: 890,
    cover_image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    seller_id: "s3",
    title: "Zero-G Combat Tactics",
    slug: "zero-g-combat",
    description: "Military strategies for low-gravity environments.",
    price: 1950,
    currency: "LKR",
    category: "Action",
    rating_avg: 4.6,
    is_published: true,
    is_featured: true,
    total_sales: 420,
    cover_image_url: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    seller_id: "s4",
    title: "Syntax of the Stars",
    slug: "syntax-stars",
    description: "Programming languages used by extraterrestrial colonizers.",
    price: 4999,
    currency: "LKR",
    category: "Programming",
    rating_avg: 5.0,
    is_published: true,
    is_featured: true,
    total_sales: 2100,
    cover_image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const metadata = {
  title: "EbOOk | Modern Library",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center bg-background border-none overflow-hidden">
        {/* Subtle background gradient layer */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="z-10 container px-4 mx-auto pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content (Directional layout) */}
            <div className="flex flex-col items-start text-left max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <span>The Premier Marketplace</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight text-foreground mb-6 leading-[1.1]">
                Elevate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-cyan">
                  Digital Library
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 font-sans leading-relaxed">
                Discover, collect, and trade premium digital literature in an advanced ecosystem. Join thousands of readers charting new worlds of fiction and non-fiction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/browse" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 h-14 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-lg shadow-lg shadow-primary/20">
                    Explore Library
                  </button>
                </Link>
                <Link href="/sell" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 h-14 rounded-md border-none bg-background/40 backdrop-blur-md hover:bg-background/60 hover:text-foreground font-medium transition-all text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                    Become a Seller
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] border-none group">
              <Image 
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80" 
                alt="Modern Digital Library" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="w-full border-none bg-background/40 backdrop-blur-xl py-8 z-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/30">
            <div className="flex flex-col">
              <span className="text-4xl font-heading font-bold text-foreground">42K+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Books Sold</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-heading font-bold text-foreground">8,500</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Active Sellers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-heading font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Categories</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-heading font-bold text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground uppercase tracking-widest mt-2">Avg Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full py-24 z-10 container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground flex items-center gap-4">
            <span className="w-8 h-1 bg-primary drop-shadow-sm"></span>
            Trending Books
          </h2>
          <Link href="/browse" className="text-primary hover:underline hidden sm:block tracking-wider font-semibold text-sm transition-colors">
            VIEW ALL BOOKS &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURED_BOOKS.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        <div className="mt-12 text-center sm:hidden">
          <Link href="/browse">
            <button className="w-full px-8 h-12 rounded-md border-none bg-background/40 backdrop-blur-md hover:bg-background/60 hover:text-foreground font-medium transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
              View All Books
            </button>
          </Link>
        </div>
      </section>
      
      {/* Seller CTA Section */}
      <section className="w-full py-24 relative overflow-hidden z-10 border-none bg-background/40 backdrop-blur-2xl">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
            TRANSMIT YOUR KNOWLEDGE
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Keep 90% of your earnings. Connect your Stripe account and start selling your digital manuscripts to readers across the globe.
          </p>
          <Link href="/sell">
            <button className="px-10 h-16 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-xl shadow-xl shadow-primary/20">
              Launch Seller Portal
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
