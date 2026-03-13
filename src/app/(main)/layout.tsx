import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PageTransition } from "@/components/layout/PageTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col pt-0 bg-background text-foreground transition-colors selection:bg-neon-cyan/30 selection:text-white">
      <Navbar />
      <PageTransition>
        <main className="flex-grow z-10 w-full relative">
          {children}
        </main>
      </PageTransition>
      <Footer />
      <CartDrawer />
    </div>
  );
}
