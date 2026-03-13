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

import { createClient } from "@/lib/supabase/server";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';
  const categoryParam = typeof resolvedParams.category === 'string' ? resolvedParams.category : '';
  
  const supabase = await createClient();
  
  let queryBuilder = supabase.from('books').select('*').eq('is_published', true);
  
  if (query) {
    queryBuilder = queryBuilder.ilike('title', `%${query}%`);
  }
  if (categoryParam && categoryParam !== 'All') {
    queryBuilder = queryBuilder.eq('category', categoryParam);
  }

  // Execute actual database request
  const { data: books } = await queryBuilder.order('created_at', { ascending: false });
  const filteredBooks = books || [];

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
