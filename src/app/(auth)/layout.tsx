import { StarfieldBackground } from "@/components/common/StarfieldBackground";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <StarfieldBackground />
      {children}
    </div>
  );
}
