"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/hooks/useAuth";
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
        <h1 className="text-3xl font-black font-heading tracking-tight text-primary">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your terminal credentials to access EbOOk
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="reader@ebook.com"
            disabled={isLoading}
            className="bg-background border-input text-foreground focus-visible:ring-primary"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-foreground">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary hover:underline hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            className="bg-background border-input text-foreground focus-visible:ring-primary"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-destructive text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 flex justify-center items-center px-5 py-3 rounded-md bg-background/50 backdrop-blur-md text-foreground text-sm font-semibold hover:bg-background/80 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-none disabled:opacity-50"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Initialize Session
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        New to EbOOk?{" "}
        <Link href="/register" className="text-primary hover:underline font-medium">
          Create an account
        </Link>
      </div>
    </GlassCard>
  );
}
