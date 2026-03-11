"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CartToggle } from "@/components/cart/CartToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/50 backdrop-blur-2xl shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-heading text-2xl font-black text-primary tracking-widest">
            EbOOk
          </span>
        </Link>
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/about" className={cn("text-sm transition-colors hover:text-primary font-semibold tracking-wide", pathname.startsWith("/about") ? "text-primary" : "text-muted-foreground")}>About Us</Link>
          <Link href="/browse" className={cn("text-sm transition-colors hover:text-primary font-semibold tracking-wide", pathname.startsWith("/browse") ? "text-primary" : "text-muted-foreground")}>Browse Library</Link>
          <Link href="/sell" className={cn("text-sm transition-colors hover:text-primary font-semibold tracking-wide", pathname.startsWith("/sell") ? "text-primary" : "text-muted-foreground")}>Become a Seller</Link>
          <Link href="/browse" className="text-sm transition-colors hover:text-primary font-semibold tracking-wide text-muted-foreground">Categories</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <CartToggle />
          <Link href="/login">
            <button className="hidden sm:inline-flex px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-background/60 bg-transparent text-foreground border-none hover:shadow-sm">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="px-5 py-2 rounded-md bg-background/50 backdrop-blur-md text-foreground text-sm font-semibold hover:bg-background/80 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-none">
              Enlist
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
