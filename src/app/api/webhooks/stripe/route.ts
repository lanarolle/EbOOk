import { NextResponse, type NextRequest } from "next/server";
import { getStripeAdmin } from "@/lib/stripe/helpers";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  // Initialize Supabase Admin client using Service Role to bypass RLS for webhook
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const payload = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = getStripeAdmin().webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const buyerId = session.metadata?.buyer_id;
    const bookIdsStr = session.metadata?.book_ids;
    
    if (buyerId && bookIdsStr) {
      const bookIds = JSON.parse(bookIdsStr) as string[];
      
      // 1. Create the Order
      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          buyer_id: buyerId,
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          total_amount: (session.amount_total || 0) / 100,
          currency: session.currency?.toUpperCase() || "USD",
          status: "completed"
        })
        .select()
        .single();
        
      if (orderError) {
        console.error("Error creating order:", orderError);
        return NextResponse.json({ error: "Order Creation Failed" }, { status: 500 });
      }

      // 2. Fetch all books to get their seller info and price
      const { data: books, error: booksError } = await supabaseAdmin
        .from("books")
        .select("id, price, seller_id")
        .in("id", bookIds);

      if (!booksError && books) {
        const platformFeePercent = Number(process.env.PLATFORM_FEE_PERCENT || 10);
        
        const orderItems = books.map((book: any) => {
          const price = Number(book.price);
          const platformFee = price * (platformFeePercent / 100);
          const sellerPayout = price - platformFee;
          
          return {
            order_id: order.id,
            book_id: book.id,
            seller_id: book.seller_id,
            price_at_purchase: price,
            platform_fee: platformFee,
            seller_payout: sellerPayout
          };
        });

        // 3. Insert Order Items
        await supabaseAdmin.from("order_items").insert(orderItems);
        
        // 4. Update sales counters for each book
        for (const book of books) {
           await supabaseAdmin.rpc('increment_sales', { book_id: book.id });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
