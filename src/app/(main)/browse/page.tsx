import { BookGrid } from "@/components/books/BookGrid";
import { SearchBar } from "@/components/common/SearchBar";
import { GlassCard } from "@/components/common/GlassCard";
import { Label } from "@/components/ui/label";
import { Book } from "@/types";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Browse Library | AntiGravity",
};

// Mock data
const MOCK_BOOKS: Book[] = [
  { id: "1", seller_id: "s1", title: "Neuromancer Chronicles", slug: "neuromancer", price: 14.99, currency: "USD", category: "Sci-Fi", rating_avg: 4.8, is_published: true, is_featured: true, total_sales: 1540, cover_image_url: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "2", seller_id: "s2", title: "Digital Fortress", slug: "digital-fortress", price: 29.99, currency: "USD", category: "Technology", rating_avg: 4.9, is_published: true, is_featured: true, total_sales: 890, cover_image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "3", seller_id: "s3", title: "Zero-G Combat Tactics", slug: "zero-g", price: 19.50, currency: "USD", category: "Action", rating_avg: 4.6, is_published: true, is_featured: true, total_sales: 420, cover_image_url: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "4", seller_id: "s4", title: "Syntax of the Stars", slug: "syntax-stars", price: 49.99, currency: "USD", category: "Programming", rating_avg: 5.0, is_published: true, is_featured: true, total_sales: 2100, cover_image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "5", seller_id: "s5", title: "Cybernetic Enhancements", slug: "cyber-enhancements", price: 89.99, currency: "USD", category: "Technology", rating_avg: 4.2, is_published: true, is_featured: false, total_sales: 110, cover_image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "6", seller_id: "s6", title: "Quantum Computing for Dummies", slug: "quantum-dummies", price: 34.50, currency: "USD", category: "Education", rating_avg: 4.7, is_published: true, is_featured: false, total_sales: 650, cover_image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "7", seller_id: "s7", title: "The Martian Architecture", slug: "martian-arch", price: 42.00, currency: "USD", category: "Sci-Fi", rating_avg: 4.9, is_published: true, is_featured: false, total_sales: 1200, cover_image_url: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: "8", seller_id: "s8", title: "Advanced React Patterns", slug: "advanced-react", price: 55.00, currency: "USD", category: "Programming", rating_avg: 4.9, is_published: true, is_featured: false, total_sales: 3100, cover_image_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
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
    <div className="flex flex-col min-h-[80vh]">
       {/* Sleek Landscape Header */}
       <div className="relative w-full h-[250px] overflow-hidden border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]">
          <Image 
             src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80"
             alt="Library Books"
             fill
             className="object-cover"
             priority
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
             <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-foreground mb-4">
                   EXPLORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple">LIBRARY</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                   Discover restricted knowledge and global bestsellers.
                </p>
             </div>
          </div>
       </div>

    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6">
        <GlassCard className="p-5 flex flex-col gap-6 sticky top-24 border-none shadow-lg">
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-foreground tracking-wider uppercase text-sm border-b border-border pb-2">
              Search Parameters
            </h3>
            <SearchBar />
          </div>

          <div className="space-y-3">
            <h3 className="font-heading font-bold text-foreground tracking-wider uppercase text-sm border-b border-border pb-2">
              Categories
            </h3>
            <div className="flex flex-col space-y-2">
              {CATEGORIES.map(cat => {
                const isActive = categoryParam === cat || (cat === 'All' && !categoryParam);
                return (
                  <Link 
                    key={cat}
                    href={`/browse?category=${cat === 'All' ? '' : cat}${query ? `&q=${query}` : ''}`}
                    className={`text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-foreground tracking-wider uppercase text-sm border-b border-border pb-2">
              Price Range
            </h3>
            <div className="flex items-center justify-between gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Min Rs.</Label>
                <input type="number" placeholder="0" className="w-full bg-background/50 backdrop-blur-md border-none rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Max Rs.</Label>
                <input type="number" placeholder="1000" className="w-full bg-background/50 backdrop-blur-md border-none rounded px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
              </div>
            </div>
          </div>
        </GlassCard>
      </aside>

      {/* Main Grid */}
      <div className="flex-grow flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-background/40 backdrop-blur-xl border-none rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] gap-4">
          <h2 className="font-heading text-xl font-bold flex items-center gap-2">
            <span className="text-muted-foreground">Showing:</span>
            <span className="text-primary tracking-wide">
              {categoryParam && categoryParam !== 'All' ? categoryParam : 'All Books'}
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <Label className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">Sort By:</Label>
            <select className="bg-background/50 backdrop-blur-md border-none rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary py-1.5 px-3 shadow-sm">
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
    </div>
  );
}
