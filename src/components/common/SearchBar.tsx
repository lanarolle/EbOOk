"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q")?.toString() || "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }
      if (!pathname.startsWith("/browse")) {
        router.push(`/browse?${params.toString()}`);
      } else {
        router.push(`${pathname}?${params.toString()}`);
      }
    }
  };

  return (
    <div className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-neon-cyan group-focus-within:text-neon-purple transition-colors" />
      </div>
      <Input
        type="text"
        placeholder="Search protocols & manuscripts..."
        className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-bg-surface/50 text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan sm:text-sm transition-all backdrop-blur-md shadow-inner"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
