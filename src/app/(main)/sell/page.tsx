import { BookUploadForm } from "@/components/books/BookUploadForm";
import { GlassCard } from "@/components/common/GlassCard";
import { NeonButton } from "@/components/common/NeonButton";
import Link from "next/link";
import { Activity, LayoutDashboard, CreditCard } from "lucide-react";

export const metadata = {
  title: "Seller Integration | AntiGravity",
};

export default function SellPage() {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 min-h-screen">
      
      {/* Top Banner specific for sellers */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-bg-surface/60 border border-white/10 rounded-2xl p-6 mb-12 backdrop-blur-md shadow-lg">
         <div>
            <h1 className="text-3xl font-black font-orbitron tracking-tighter text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.4)] mb-2">
               TRANSMISSION TERMINAL
            </h1>
            <p className="text-text-muted">Welcome to the Seller portal. Upload protocols and monitor telemetry.</p>
         </div>
         <div className="flex gap-4 mt-6 md:mt-0">
            <Link href="/sell/dashboard">
               <NeonButton neonVariant="outline" className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Telemetry Dashboard
               </NeonButton>
            </Link>
            <NeonButton neonVariant="cta" className="flex items-center gap-2 px-6 shadow-none hover:shadow-none" disabled>
               <CreditCard className="w-4 h-4 text-neon-gold" /> Stripe Connected
            </NeonButton>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         {/* Main Form Area */}
         <div className="lg:col-span-2 flex-grow">
            <BookUploadForm />
         </div>

         {/* Sidebar Stats Brief */}
         <div className="w-full lg:w-80 shrink-0 space-y-6">
            <GlassCard className="p-6">
               <h3 className="text-sm font-orbitron font-bold text-text-muted tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                  <Activity className="w-4 h-4 text-neon-purple" /> Link Status
               </h3>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-white text-sm">Clearance Level</span>
                     <span className="text-neon-cyan font-mono uppercase bg-neon-cyan/10 px-2 py-0.5 rounded text-xs border border-neon-cyan/20">Verified</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white text-sm">Active Protocols</span>
                     <span className="text-white font-mono font-bold">14</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-white text-sm">Available Bandwidth</span>
                     <span className="text-white font-mono font-bold text-xs">UNLIMITED</span>
                  </div>
               </div>
            </GlassCard>

            <GlassCard className="p-6 bg-neon-gold/5 border-neon-gold/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <h3 className="text-sm font-orbitron font-bold text-neon-gold tracking-widest uppercase mb-4 border-b border-neon-gold/20 pb-2 flex items-center gap-2 relative z-10">
                  Pending Payout
               </h3>
               <p className="text-4xl font-mono font-bold text-neon-gold drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] relative z-10">$1,420.50</p>
               <p className="text-xs text-text-muted mt-2 relative z-10">Next automated sweep: T-minus 4 Days</p>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
