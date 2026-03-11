"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export interface NeonButtonProps extends React.ComponentProps<typeof Button> {
  neonVariant?: "primary" | "cta" | "outline";
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neonVariant = "primary", ...props }, ref) => {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          ref={ref}
          className={cn(
            "relative transition-all duration-300 font-bold tracking-wide uppercase font-orbitron",
            {
              "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_15px_rgba(0,245,255,0.5)]":
                neonVariant === "primary",
              "bg-neon-gold/10 text-neon-gold border border-neon-gold hover:bg-neon-gold/20 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]":
                neonVariant === "cta",
              "bg-neon-purple/10 text-neon-purple border border-neon-purple hover:bg-neon-purple/20 hover:shadow-[0_0_15px_rgba(191,0,255,0.5)]":
                neonVariant === "outline",
            },
            className
          )}
          {...props}
        />
      </motion.div>
    );
  }
);
NeonButton.displayName = "NeonButton";
