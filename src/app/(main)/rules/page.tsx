import { GlassCard } from "@/components/common/GlassCard";
import Image from "next/image";

export const metadata = {
  title: "Rules & Regulations | EbOOk",
  description: "Terms of service and operational regulations for the EbOOk platform.",
};

export default function RulesPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 block">
        <div className="text-left">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span>Compliance Protocol</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground mb-6 leading-[1.1]">
            Platform <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-cyan">
              Regulations
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Operational directives governing the EbOOk marketplace. Compliance is mandatory
            for all registered personnel and merchants to ensure a safe ecosystem.
          </p>
        </div>
        <div className="relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
          <Image src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80" alt="Legal and Compliance" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        </div>
      </div>

      <div className="space-y-8">
        <GlassCard className="p-8">
          <h2 className="text-2xl font-heading font-bold text-neon-gold mb-4 border-b border-white/10 pb-2">
            1. Content Distribution Guidelines
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>1.1. All transmitted manuscripts (PDFs) must be original works entirely owned by the uploading vendor or explicitly authorized for resale.</p>
            <p>1.2. The distribution of classified, malicious, or highly restricted data protocols is strictly prohibited.</p>
            <p>1.3. EbOOk reserves the right to terminate any transmission that violates interstellar copyright treaties.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-heading font-bold text-neon-cyan mb-4 border-b border-white/10 pb-2">
            2. Economic Obligations
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>2.1. A standard operating fee of 10% is deducted autonomously from all successful transactions.</p>
            <p>2.2. All transactions are final upon decrypted delivery. Refunds are only issued in the event of corrupted origin files.</p>
            <p>2.3. Vendors are responsible for reporting their generated revenue to their designated planetary tax authorities.</p>
          </div>
        </GlassCard>

        <GlassCard className="p-8">
          <h2 className="text-2xl font-heading font-bold text-neon-purple mb-4 border-b border-white/10 pb-2">
            3. Account Security
          </h2>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>3.1. Personnel must maintain secure authentication credentials. Sharing access tokens is a violation of protocol.</p>
            <p>3.2. Automated scraping, data harvesting, or reverse engineering of the EbOOk mainframe architecture is grounds for immediate sector banishment.</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
