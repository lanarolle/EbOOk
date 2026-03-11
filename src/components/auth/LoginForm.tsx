"use client";

import { useState } from "react";
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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    await login(data);
  };

  return (
    <GlassCard className="w-full max-w-md p-8">
      <div className="flex flex-col space-y-2 text-center mb-8">
        <h1 className="text-3xl font-bold font-orbitron tracking-tighter text-neon-cyan drop-shadow-[0_0_10px_rgba(0,245,255,0.8)]">
          Welcome Back
        </h1>
        <p className="text-sm text-text-muted">
          Enter your terminal credentials to access AntiGravity
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-text-primary">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="pilot@starship.com"
            disabled={isLoading}
            className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-cyan"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-text-primary">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-neon-cyan hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            className="bg-bg-void border-white/10 text-white focus-visible:ring-neon-cyan"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <NeonButton
          type="submit"
          disabled={isLoading}
          className="w-full mt-4"
          neonVariant="primary"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Initialize Session
        </NeonButton>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        New pilot?{" "}
        <Link href="/register" className="text-neon-purple hover:underline">
          Register for clearance
        </Link>
      </div>
    </GlassCard>
  );
}
