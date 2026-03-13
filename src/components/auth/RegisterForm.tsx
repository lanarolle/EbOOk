"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/hooks/useAuth";
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
        <h1 className="text-3xl font-black font-heading tracking-tight text-primary">
          Enlist Now
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your EbOOk account
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2 text-left">
          <Label htmlFor="username" className="text-foreground">Callsign (Username)</Label>
          <Input
            id="username"
            disabled={isLoading}
            className="bg-background border-input text-foreground focus-visible:ring-primary"
            {...form.register("username")}
          />
          {form.formState.errors.username && (
            <p className="text-sm text-destructive">{form.formState.errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="email" className="text-foreground">Transmission Email</Label>
          <Input
            id="email"
            type="email"
            disabled={isLoading}
            className="bg-background border-input text-foreground focus-visible:ring-primary"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 text-left">
          <Label htmlFor="password" className="text-foreground">Security Passcode</Label>
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

        <div className="space-y-2 pb-2 text-left">
          <Label htmlFor="role" className="text-foreground">Primary Directive</Label>
          <select
            id="role"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
            {...form.register("role")}
          >
            <option value="buyer">Explorer (Buyer)</option>
            <option value="seller">Creator (Seller)</option>
            <option value="both">Both</option>
          </select>
          {form.formState.errors.role && (
            <p className="text-sm text-destructive">{form.formState.errors.role.message}</p>
          )}
        </div>

        {error && <p className="text-sm text-destructive text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 flex justify-center items-center px-5 py-3 rounded-md bg-background/50 backdrop-blur-md text-foreground text-sm font-semibold hover:bg-background/80 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.05)] border-none disabled:opacity-50"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Join Network
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already registered?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Return to login
        </Link>
      </div>
    </GlassCard>
  );
}
