import { BookUploadForm } from "@/components/books/BookUploadForm";
import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import Link from "next/link";
import Image from "next/image";
import { Activity, LayoutDashboard, CreditCard, ArrowRight } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Seller Integration | AntiGravity",
};

export default async function SellPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Restrict to admins
  if (user.user_metadata?.role !== 'admin') {
    redirect("/dashboard");
  }

  // Double check if the user is explicitly set as a buyer. 
  // For the demo, we might just allow anyone logged in, but we can do a profile check here if strict.

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 min-h-screen">
      
      {/* Top Banner specific for sellers */}
      <div className="relative w-full overflow-hidden rounded-3xl border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] mb-12">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80" 
          alt="Creator Workspace" 
          fill 
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-center bg-background/50 backdrop-blur-2xl p-8 sm:p-12">
           <div className="max-w-xl text-left">
              <div className="inline-flex items-center rounded-full border-none bg-background/50 backdrop-blur-md shadow-sm px-3 py-1 text-sm font-medium text-primary mb-4">
                <span>Creator Portal</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-foreground mb-4 leading-tight">
                 TRANSMISSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple">TERMINAL</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Welcome to the Seller portal. Upload your original protocols and monitor live sales telemetry globally.
              </p>
           </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-0">
              <Link href="/sell/dashboard">
                 <button className="w-full sm:w-auto px-6 h-12 rounded-md bg-background/40 backdrop-blur-md border-none shadow-sm hover:bg-background/60 hover:text-foreground flex items-center justify-center gap-2 font-medium transition-all text-foreground">
                    <LayoutDashboard className="w-4 h-4" /> Telemetry Dashboard
                 </button>
              </Link>
              <button disabled className="w-full sm:w-auto px-6 h-12 rounded-md bg-primary text-primary-foreground opacity-90 flex items-center justify-center gap-2 font-medium shadow-md">
                 <CreditCard className="w-4 h-4 text-white" /> Stripe Connected
              </button>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Main Form Area */}
         <div className="lg:col-span-2 flex-grow">
            <BookUploadForm />
         </div>

         {/* Sidebar Stats Brief */}
         <div className="w-full lg:w-80 shrink-0 space-y-6">
            <GlassCard className="p-6 border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
               <h3 className="text-sm font-heading font-bold text-foreground tracking-widest uppercase mb-4 flex items-center gap-2 border-none pb-2">
                  <Activity className="w-4 h-4 text-primary" /> Link Status
               </h3>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-muted-foreground text-sm">Clearance Level</span>
                     <span className="text-primary font-medium uppercase bg-primary/10 px-2 py-0.5 rounded text-xs border-none shadow-sm backdrop-blur-sm">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-muted-foreground text-sm">Active Protocols</span>
                     <span className="text-foreground font-medium">14</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-muted-foreground text-xs">UNLIMITED</span>
                  </div>
               </div>
            </GlassCard>

            <GlassCard className="p-6 bg-primary/5 border-none shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] relative overflow-hidden backdrop-blur-xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <h3 className="text-sm font-heading font-bold text-primary tracking-widest uppercase mb-4 border-none pb-2 flex items-center gap-2 relative z-10">
                  Pending Payout
               </h3>
               <p className="text-4xl font-heading font-black text-foreground relative z-10">Rs. 84,500</p>
               <p className="text-xs text-muted-foreground mt-2 relative z-10">Next automated sweep: T-minus 4 Days</p>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
