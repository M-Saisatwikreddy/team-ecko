import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { Truck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sign in — TransitOps" }] }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  remember: z.boolean().optional(),
  role: z.enum(["Fleet Manager", "Driver", "Safety Officer", "Financial Analyst", "Administrator"]),
});
type FormValues = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => { if (user) navigate({ to: "/" }); }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true, role: "Fleet Manager" },
  });

  const onSubmit = async (v: FormValues) => {
    await login(v.email, v.password, v.role as UserRole);
    toast.success("Signed in", { description: `Welcome, ${v.email}` });
    navigate({ to: "/" });
  };

  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      {/* Left panel */}
      <div className="hidden flex-col justify-between bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Truck className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold">TransitOps</div>
            <div className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Enterprise Fleet ERP</div>
          </div>
        </div>
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold">Run your fleet like an enterprise.</h2>
          <p className="mt-3 text-sm text-sidebar-foreground/75">
            Real-time dashboards, driver safety, maintenance workflows, fuel and expense
            controls — engineered for logistics operations at scale.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-sidebar-foreground/85">
            <li>• Role-based access for managers, drivers, safety & finance</li>
            <li>• Trip lifecycle from dispatch to close-out</li>
            <li>• Maintenance workflow, license & compliance alerts</li>
            <li>• API-ready for Node.js + Express + PostgreSQL</li>
          </ul>
        </div>
        <div className="text-xs text-sidebar-foreground/50">© {new Date().getFullYear()} TransitOps. All rights reserved.</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-6 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <Truck className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">TransitOps</div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Access your fleet operations workspace.</p>

          <form className="mt-6 flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" {...form.register("email")} />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline" onClick={() => toast.info("Password reset link would be sent to your email.")}>
                  Forgot password?
                </button>
              </div>
              <Input id="password" type="password" autoComplete="current-password" placeholder="••••••••" {...form.register("password")} />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Role (demo)</Label>
              <Select
                defaultValue={form.getValues("role")}
                onValueChange={(v) => form.setValue("role", v as UserRole)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fleet Manager">Fleet Manager</SelectItem>
                  <SelectItem value="Administrator">Administrator</SelectItem>
                  <SelectItem value="Safety Officer">Safety Officer</SelectItem>
                  <SelectItem value="Financial Analyst">Financial Analyst</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox
                checked={form.watch("remember")}
                onCheckedChange={(c) => form.setValue("remember", Boolean(c))}
              />
              Remember me on this device
            </label>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              Sign in
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Protected by role-based access control. Contact your administrator for provisioning.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
