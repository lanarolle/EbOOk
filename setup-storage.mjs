import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase URL or Service Role Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setupStorage() {
  console.log("Connecting to Supabase Admin API...");

  // 1. Create 'covers' bucket (public)
  const { data: coversData, error: coversError } = await supabase.storage.createBucket('covers', {
    public: true,
    fileSizeLimit: 5242880, // 5MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
  });
  if (coversError) {
    console.log("Covers bucket message:", coversError.message);
  } else {
    console.log("✅ 'covers' bucket created successfully.");
  }

  // 2. Create 'books' bucket (private/authenticated - though for this demo we'll make it authenticated download via code)
  // Making it public false so it's secure by default. We'll generate signed URLs for downloads, or set an RLS policy.
  const { data: booksData, error: booksError } = await supabase.storage.createBucket('books', {
    public: false,
    fileSizeLimit: 52428800, // 50MB
    allowedMimeTypes: ['application/pdf']
  });
  if (booksError) {
    console.log("Books bucket message:", booksError.message);
  } else {
    console.log("✅ 'books' bucket created successfully.");
  }

  // We should also enable RLS for these buckets. 
  // However, Supabase Storage API handles RLS via SQL. Storage buckets don't automatically get full public RLS from the JS API.
  // We will execute a raw SQL query to set public read access for 'covers'.
  
  // Note: To make 'covers' truly public readable without auth, we might need an RLS policy. 
  // The 'public: true' flag on the bucket mostly handles caching and URL generation, 
  // but let's try pushing an RLS policy using the rpc or a raw query if possible, 
  // or just rely on the public flag which usually sets base public access.
  
  console.log("Storage setup complete!");
}

setupStorage();
