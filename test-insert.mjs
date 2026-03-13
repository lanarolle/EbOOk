import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testTrigger() {
  console.log("Attempting direct insert into profiles...");
  
  // Create a random UUID
  const randomUUID = crypto.randomUUID();
  
  const { data, error } = await supabase.from('profiles').insert([
    {
       id: randomUUID,
       username: `testuser_${Date.now()}`,
       full_name: "Test User",
       role: "buyer"
    }
  ]);

  if (error) {
    console.error("Insert Error:", error.message, error);
  } else {
    console.log("Insert Success!", data);
  }
}

testTrigger();
