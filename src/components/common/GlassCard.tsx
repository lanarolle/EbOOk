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
        "bg-background/40 backdrop-blur-xl text-card-foreground rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
        "relative overflow-hidden before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        "hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-all duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
