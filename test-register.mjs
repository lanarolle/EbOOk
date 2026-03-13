import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRegister() {
  const testEmail = `test3_${Date.now()}@example.com`;
  
  const { data, error } = await supabase.auth.signUp({
    email: testEmail,
    password: "securepassword123",
    options: {
      data: {
        username: `testuser_${Date.now()}`,
        full_name: "Test User",
        role: "buyer"
      }
    }
  });

  if (error) {
    console.error("Full Error:", JSON.stringify(error, null, 2));
  } else {
    console.log("SignUp Success!");
  }
}

testRegister();
