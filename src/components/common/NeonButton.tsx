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
            "relative transition-all duration-300 font-headingld tracking-wide rounded-md",
            {
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow":
                neonVariant === "primary",
              "bg-accent text-accent-foreground hover:bg-accent/90 shadow-md ring-1 ring-accent/20":
                neonVariant === "cta",
              "bg-transparent border border-input text-foreground hover:bg-accent hover:text-accent-foreground":
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
