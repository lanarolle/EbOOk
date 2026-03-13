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

  // Fetch authentic order history
  const { data: orders } = await supabase
    .from("orders")
    .select("id")
    .eq('buyer_id', user.id);
    
  let purchasedBooks: any[] = [];
  
  if (orders && orders.length > 0) {
    const orderIds = orders.map(o => o.id);
    const { data: orderItems } = await supabase
      .from("order_items")
      .select(`books (*)`)
      .in('order_id', orderIds);
      
    if (orderItems) {
      // @ts-ignore - Supabase types can occasionally nest joined relationships as arrays depending on schema mapping
      purchasedBooks = orderItems.map(item => Array.isArray(item.books) ? item.books[0] : item.books).filter(Boolean);
    }
  }

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
