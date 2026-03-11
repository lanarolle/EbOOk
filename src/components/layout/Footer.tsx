import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-bg-void/80 backdrop-blur-md py-8 mt-auto z-10">
      <div className="container px-4 mx-auto md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <h4 className="font-orbitron font-bold text-neon-cyan tracking-widest uppercase">AntiGravity</h4>
            <p className="text-sm text-text-muted max-w-sm">
              The premier marketplace for futuristic and digital literature across the galaxy. Read beyond gravity.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-orbitron font-semibold text-text-primary uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/browse" className="hover:text-neon-cyan transition-colors">Browse Library</Link></li>
              <li><Link href="/sell" className="hover:text-neon-cyan transition-colors">Become a Seller</Link></li>
              <li><Link href="/categories" className="hover:text-neon-cyan transition-colors">Categories</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-orbitron font-semibold text-text-primary uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link href="/terms" className="hover:text-neon-cyan transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-neon-cyan transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-text-muted">© 2026 AntiGravity Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
