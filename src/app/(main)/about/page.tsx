import { GlassCard } from "@/components/common/GlassCard";
import { Heart, Users, Globe, Shield } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | EbOOk",
  description: "Learn about EbOOk's mission to revolutionize digital literature.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="text-left">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <span>Our Target</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-foreground mb-6 leading-[1.1]">
            Empowering <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-cyan">
              Digital Authors
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            EbOOk exists to bridge the gap between global authors and passionate readers 
            through a seamless, modern, and transparent digital marketplace platform.
          </p>
        </div>
        <div className="relative w-full h-[350px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-border/50 group">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team Collaboration" fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        </div>
      </div>

      <div className="mb-8 text-center">
         <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Platform Core Values</h2>
         <p className="text-muted-foreground">The foundational pillars holding up the EbOOk ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <GlassCard className="p-8">
          <Globe className="w-12 h-12 text-neon-cyan mb-6" />
          <h3 className="text-2xl font-bold font-heading text-white mb-4">Global Reach</h3>
          <p className="text-text-muted leading-relaxed">
            We break down geographical barriers, ensuring that high-quality literature 
            and knowledge protocols are accessible anytime, from anywhere across the globe.
          </p>
        </GlassCard>

        <GlassCard className="p-8">
          <Users className="w-12 h-12 text-neon-purple mb-6" />
          <h3 className="text-2xl font-bold font-heading text-white mb-4">Empowering Creators</h3>
          <p className="text-text-muted leading-relaxed">
            Writers and educators receive industry-leading 90% payout splits on every 
            sale. We believe content creators should retain the maximum value of their work.
          </p>
        </GlassCard>

        <GlassCard className="p-8">
          <Shield className="w-12 h-12 text-neon-gold mb-6" />
          <h3 className="text-2xl font-bold font-heading text-white mb-4">Secure Infrastructure</h3>
          <p className="text-text-muted leading-relaxed">
            All protocols are encrypted via state-of-the-art standards. User funds and 
            digital assets are meticulously guarded against unauthorized breaches.
          </p>
        </GlassCard>

        <GlassCard className="p-8">
          <Heart className="w-12 h-12 text-red-500 mb-6" />
          <h3 className="text-2xl font-bold font-heading text-white mb-4">Community Driven</h3>
          <p className="text-text-muted leading-relaxed">
            We operate transparently. The EbOOk marketplace evolves continuously based 
            on feedback from our dedicated readers and independent artists.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
