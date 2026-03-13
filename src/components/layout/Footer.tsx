import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-background/50 backdrop-blur-2xl py-12 mt-auto z-10 shadow-[0_-4px_32px_0_rgba(0,0,0,0.02)]">
      <div className="container px-4 mx-auto md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h4 className="font-heading text-xl font-black text-primary tracking-widest uppercase mb-2">EbOOk</h4>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              The premier marketplace for elegant and professional digital literature.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/browse" className="hover:text-primary hover:underline transition-colors">Browse Library</Link></li>
              <li><Link href="/sell" className="hover:text-primary hover:underline transition-colors">Become a Seller</Link></li>
              <li><Link href="/categories" className="hover:text-primary hover:underline transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary hover:underline transition-colors">About Us</Link></li>
              <li><Link href="/rules" className="hover:text-primary hover:underline transition-colors">Rules & Regulations</Link></li>
              <li><Link href="/privacy" className="hover:text-primary hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5 dark:border-white/5">
          <p className="text-sm text-muted-foreground font-medium">© 2026 EbOOk Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
