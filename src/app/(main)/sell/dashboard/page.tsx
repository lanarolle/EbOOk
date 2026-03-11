import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { SellerStats } from "@/components/dashboard/SellerStats";
import { NeonButton } from "@/components/common/NeonButton";
import Link from "next/link";
import { Upload } from "lucide-react";

export const metadata = {
  title: "Seller Telemetry | AntiGravity",
};

export default async function SellerDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-10 gap-4">
        <div>
           <h1 className="text-4xl font-black font-heading tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-2">
             SELLER TELEMETRY
           </h1>
           <p className="text-text-muted">Analyze your transmission metrics and revenue streams.</p>
        </div>
        <Link href="/sell">
           <NeonButton neonVariant="primary" className="flex items-center gap-2">
              <Upload className="w-4 h-4" /> New Protocol
           </NeonButton>
        </Link>
      </div>

      <SellerStats />
    </div>
  );
}
