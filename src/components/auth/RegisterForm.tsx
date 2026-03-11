"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/hooks/useAuth";
import { NeonButton } from "@/components/common/NeonButton";
import { GlassCard } from "@/components/common/GlassCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["buyer", "seller", "both"]),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", email: "", password: "", role: "buyer" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await register(
      { email: data.email, password: data.password },
      { username: data.username, full_name: data.username, role: data.role }
    );
  };

  return (
    <GlassCard className="w-full max-w-md p-8">
      <div className="flex flex-col space-y-2 text-center mb-6">
        <h1 className="text-3xl font-bold font-orbitron tracking-tighter text-neon-purple drop-shadow-[0_0_10px_rgba(191,0,255,0.8)]">
          Enlist Now
        </h1>
        <p className="text-sm text-text-muted">
          Create your AntiGravity account
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <Label htmlFor="username" className="text-text-primary">Callsign (Username)</Label>
          <Input
            id="username"
            disabled={isLoading}
            className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-purple"
            {...form.register("username")}
          />
          {form.formState.errors.username && (
            <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-text-primary">Transmission Email</Label>
          <Input
            id="email"
            type="email"
            disabled={isLoading}
            className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-purple"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-text-primary">Security Passcode</Label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-purple"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2 pb-2">
          <Label htmlFor="role" className="text-text-primary">Primary Directive</Label>
          <select
            id="role"
            className="flex h-10 w-full rounded-md border border-white/10 bg-bg-void px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            {...form.register("role")}
          >
            <option value="buyer">Explorer (Buyer)</option>
            <option value="seller">Creator (Seller)</option>
            <option value="both">Both</option>
          </select>
          {form.formState.errors.role && (
            <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <NeonButton
          type="submit"
          disabled={isLoading}
          className="w-full mt-6"
          neonVariant="outline"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Engage Thrusters
        </NeonButton>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Already registered?{" "}
        <Link href="/login" className="text-neon-cyan hover:underline">
          Return to login
        </Link>
      </div>
    </GlassCard>
  );
}
