"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-background transition-colors duration-1000">
      <div className="absolute inset-0 z-0">
        <motion.div
           animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 100, 0],
              y: [0, -50, 0]
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/20 blur-[100px] mix-blend-normal"
        />
        <motion.div
           animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -150, 0],
              y: [0, 100, 0]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] mix-blend-normal"
        />
        <motion.div
           animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, -100, 0]
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[90px] mix-blend-normal"
        />
      </div>
      
      {/* SVG Noise Overlay for premium texture */}
      <div 
        className="absolute inset-0 z-10 opacity-[0.04] dark:opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
