"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CartToggle } from "@/components/cart/CartToggle";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { LogOut, User as UserIcon } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (login, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
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
          
          {user ? (
            <div className="flex items-center space-x-3 bg-background/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/10 shadow-sm ml-2">
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <UserIcon className="w-4 h-4 text-primary" />
               </div>
               <span className="text-sm font-medium text-foreground max-w-[120px] truncate hidden sm:block">
                  {user.user_metadata?.username || user.email}
               </span>
               <button 
                 onClick={handleLogout}
                 className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors ml-1"
                 title="Logout"
               >
                  <LogOut className="w-4 h-4" />
               </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
