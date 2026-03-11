import { BookGrid } from "@/components/books/BookGrid";
import { SearchBar } from "@/components/common/SearchBar";
import { GlassCard } from "@/components/common/GlassCard";
import { Label } from "@/components/ui/label";
import { Book } from "@/types";
import Link from "next/link";

export const metadata = {
  title: "Browse Library | AntiGravity",
};

// Mock data
const MOCK_BOOKS: Book[] = [
  { id: "1", seller_id: "s1", title: "Neuromancer Chronicles", slug: "neuromancer", price: 14.99, currency: "USD", category: "Sci-Fi", rating_avg: 4.8, is_published: true, is_featured: true, total_sales: 1540, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "2", seller_id: "s2", title: "Digital Fortress", slug: "digital-fortress", price: 29.99, currency: "USD", category: "Technology", rating_avg: 4.9, is_published: true, is_featured: true, total_sales: 890, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "3", seller_id: "s3", title: "Zero-G Combat Tactics", slug: "zero-g", price: 19.50, currency: "USD", category: "Action", rating_avg: 4.6, is_published: true, is_featured: true, total_sales: 420, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "4", seller_id: "s4", title: "Syntax of the Stars", slug: "syntax-stars", price: 49.99, currency: "USD", category: "Programming", rating_avg: 5.0, is_published: true, is_featured: true, total_sales: 2100, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "5", seller_id: "s5", title: "Cybernetic Enhancements", slug: "cyber-enhancements", price: 89.99, currency: "USD", category: "Technology", rating_avg: 4.2, is_published: true, is_featured: false, total_sales: 110, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "6", seller_id: "s6", title: "Quantum Computing for Dummies", slug: "quantum-dummies", price: 34.50, currency: "USD", category: "Education", rating_avg: 4.7, is_published: true, is_featured: false, total_sales: 650, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const categoryParam = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  
  // Basic mock filtering
  let filteredBooks = MOCK_BOOKS;
  if (query) {
    filteredBooks = filteredBooks.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));
  }
  if (categoryParam && categoryParam !== 'All') {
    filteredBooks = filteredBooks.filter(b => b.category === categoryParam);
  }

  const CATEGORIES = ["All", "Sci-Fi", "Technology", "Programming", "Action", "Education"];

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 min-h-[80vh]">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        <GlassCard className="p-5 flex flex-col gap-6 sticky top-24">
          <div className="space-y-3">
            <h3 className="font-orbitron font-bold text-neon-cyan tracking-wider uppercase text-sm border-b border-white/10 pb-2">
              Search Parameters
            </h3>
            <SearchBar />
          </div>

          <div className="space-y-3">
            <h3 className="font-orbitron font-bold text-neon-purple tracking-wider uppercase text-sm border-b border-white/10 pb-2">
              Categories
            </h3>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map(cat => {
                const isActive = categoryParam === cat || (cat === 'All' && !categoryParam);
                return (
                  <Link 
                    key={cat}
                    href={`/browse?category=${cat === 'All' ? '' : cat}${query ? `&q=${query}` : ''}`}
                    className={`text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive ? 'text-neon-cyan font-bold drop-shadow-[0_0_5px_rgba(0,245,255,0.8)]' : 'text-text-muted hover:text-white'}`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />}
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-orbitron font-bold text-neon-gold tracking-wider uppercase text-sm border-b border-white/10 pb-2">
              Price Range
            </h3>
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-text-muted">Min $</Label>
                <input type="number" placeholder="0" className="w-full bg-bg-void border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-neon-gold" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-text-muted">Max $</Label>
                <input type="number" placeholder="100" className="w-full bg-bg-void border border-white/10 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-neon-gold" />
              </div>
            </div>
          </div>
        </GlassCard>
      </aside>

      {/* Main Grid */}
      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-bg-surface/50 border border-white/5 rounded-2xl p-4 backdrop-blur-md shadow-lg gap-4">
          <h2 className="font-orbitron text-xl font-bold flex items-center gap-2">
            <span className="text-text-muted">DATABASE:</span>
            <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,245,255,0.5)] tracking-wider">
              {categoryParam && categoryParam !== 'All' ? categoryParam.toUpperCase() : 'ALL PROTOCOLS'}
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <Label className="text-sm text-text-muted whitespace-nowrap hidden sm:block">Sort By:</Label>
            <select className="bg-bg-void border border-white/10 rounded text-sm text-white focus:outline-none focus:border-neon-cyan py-1.5 px-3">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        <BookGrid books={filteredBooks} />
      </div>
    </div>
  );
}
