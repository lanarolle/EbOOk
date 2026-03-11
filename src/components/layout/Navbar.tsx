"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NeonButton } from "@/components/common/NeonButton";
import { CartToggle } from "@/components/cart/CartToggle";

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-bg-void/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-orbitron text-xl font-bold text-neon-cyan tracking-wider drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
            AntiGravity
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/browse" className={cn("text-sm transition-colors hover:text-neon-cyan font-semibold tracking-wide", pathname.startsWith("/browse") ? "text-neon-cyan" : "text-text-muted")}>Browse</Link>
          <Link href="/sell" className={cn("text-sm transition-colors hover:text-neon-purple font-semibold tracking-wide", pathname.startsWith("/sell") ? "text-neon-purple" : "text-text-muted")}>Sell</Link>
        </div>
        <div className="flex items-center space-x-4">
          <CartToggle />
          <Link href="/login">
            <NeonButton variant="ghost" className="hidden sm:inline-flex text-white hover:text-neon-cyan hover:bg-transparent" neonVariant="primary">
              Login
            </NeonButton>
          </Link>
          <Link href="/register">
            <NeonButton neonVariant="primary">
              Enlist
            </NeonButton>
          </Link>
        </div>
      </div>
    </nav>
  );
}
