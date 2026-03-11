import { GlassCard } from "@/components/common/GlassCard";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Contact | EbOOk",
  description: "Get in touch with the EbOOk team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="order-2 lg:order-1 relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" alt="Modern Corporate Office" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        </div>
        <div className="order-1 lg:order-2 text-left lg:pl-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span>24/7 Global Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground mb-6 leading-[1.1]">
            Contact <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple">
              Headquarters
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Experiencing transmission issues? Require platform partnership details? 
            Our support network is online around the clock. Connect with us anytime.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <GlassCard className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neon-cyan/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-neon-cyan" />
          </div>
          <h3 className="font-bold font-heading text-white mb-2">Comms Stream</h3>
          <p className="text-sm text-text-muted">support@ebook.dev</p>
          <p className="text-sm text-text-muted">business@ebook.dev</p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neon-purple/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-neon-purple" />
          </div>
          <h3 className="font-bold font-heading text-white mb-2">Physical Location</h3>
          <p className="text-sm text-text-muted">Sector 7G, Cyber District</p>
          <p className="text-sm text-text-muted">Neo-Tokyo, Earth</p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-neon-gold/10 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-neon-gold" />
          </div>
          <h3 className="font-bold font-heading text-white mb-2">Voice Channel</h3>
          <p className="text-sm text-text-muted">+94 77 123 4567</p>
          <p className="text-sm text-text-muted">Mon-Fri (09:00 - 18:00)</p>
        </GlassCard>
      </div>
    </div>
  );
}
