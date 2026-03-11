import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
       {/* Left Photo Split */}
       <div className="hidden lg:block relative w-1/2 h-full">
         <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
         <Image 
            src="https://images.unsplash.com/photo-1455390582262-044cdead2708?auto=format&fit=crop&q=80"
            alt="Writer's Desk"
            fill
            className="object-cover"
            priority
         />
       </div>

       {/* Right Auth Forms */}
       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
         {children}
       </div>
    </div>);
}
