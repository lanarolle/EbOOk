import { NextResponse, type NextRequest } from "next/server";
import { getStripeAdmin } from "@/lib/stripe/helpers";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized access. Please enlist." }, { status: 401 });
    }

    const { items } = await request.json(); // Array of CartItemType
    
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cargo bay is empty" }, { status: 400 });
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.book.title,
          images: item.book.cover_image_url ? [item.book.cover_image_url] : [],
          metadata: {
            book_id: item.book.id,
            seller_id: item.book.seller_id,
          }
        },
        unit_amount: Math.round(Number(item.book.price) * 100), // convert to cents
      },
      quantity: 1,
    }));

    // For simplicity, we create a basic Checkout Session.
    // In a real app with Stripe Connect for Sellers, we'd add `transfer_data` pointing to the seller's connected account ID
    // and extract the platform fee.
    
    // As per prompt: Platform takes 10% fee. Setup stripe connect later in webhooks or here if each cart item has different sellers.
    // Since Next.js cart checkout is a combined session, transferring per item requires either separate sessions 
    // or using `payment_intent_data.transfer_group` which is done via Webhook after completion.

    const session = await getStripeAdmin().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=true`,
      customer_email: user.email,
      metadata: {
        buyer_id: user.id,
        // serialize cart book ids for fulfillment
        book_ids: JSON.stringify(items.map((i: any) => i.book.id))
      }
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
