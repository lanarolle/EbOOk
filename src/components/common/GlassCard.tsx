import { cn } from "@/lib/utils";
import React from "react";

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl",
        "hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
