import { createClient } from "@/lib/supabase/server";
import { PurchasedBooks } from "@/components/dashboard/PurchasedBooks";
import { redirect } from "next/navigation";
import { Book } from "@/types";

export const metadata = {
  title: "Command Center | AntiGravity",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch orders and corresponding books
  // In a real database, we'd query order_items inner join books where buyer_id = user.id
  // Using direct Supabase queries here for logic reference
  const { data: orderItems, error } = await supabase
    .from("order_items")
    .select(`
      book_id,
      books (
        id, seller_id, title, slug, description, cover_image_url, price, pdf_url
      )
    `)
    .eq('orders.buyer_id', user.id); // This would require a view or double query in standard Supabase without a proper join configuration

  // Mock mapped books for UI visualization
  const purchasedBooks: Book[] = [
    {
      id: "1",
      seller_id: "s1",
      title: "Neuromancer Chronicles",
      slug: "neuromancer",
      description: "A deep dive into the cyberpunk reality of the next century.",
      price: 14.99,
      currency: "USD",
      category: "Sci-Fi",
      rating_avg: 4.8,
      rating_count: 124,
      is_published: true,
      is_featured: true,
      total_sales: 1540,
      cover_image_url: "https://images.unsplash.com/photo-1541873676-a18131494184?auto=format&fit=crop&q=80",
      pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 border-b border-border/10 pb-6">
        <h1 className="text-4xl font-black font-heading tracking-tighter text-foreground drop-shadow-sm mb-2">
           COMMAND CENTER
        </h1>
        <p className="text-muted-foreground">Welcome, <span className="text-primary font-sans">{user.email}</span>. Your authenticated assets are ready.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-3">
           <span className="w-1.5 h-6 bg-primary shadow-sm"></span>
           Acquired Manuscripts
        </h2>
        
        <PurchasedBooks books={purchasedBooks} />
      </div>
    </div>
  );
}
