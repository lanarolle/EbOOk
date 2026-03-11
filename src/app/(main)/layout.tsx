import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StarfieldBackground } from "@/components/common/StarfieldBackground";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col pt-0 selection:bg-neon-cyan/30 selection:text-white">
      <StarfieldBackground />
      <Navbar />
      <main className="flex-grow z-10 w-full relative">
        {children}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
