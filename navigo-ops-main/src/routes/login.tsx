import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Sign in — Beayrik" }],
  }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  remember: z.boolean().optional(),
  role: z.enum([
    "Fleet Manager",
    "Driver",
    "Safety Officer",
    "Financial Analyst",
    "Administrator",
  ]),
});

type FormValues = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      navigate({ to: "/" });
    }
  }, [user, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: true,
      role: "Fleet Manager",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(
        values.email,
        values.password,
        values.role as UserRole,
      );

      toast.success("Signed in successfully", {
        description: `Welcome back, ${values.email}`,
      });

      navigate({ to: "/" });
    } catch {
      toast.error("Unable to sign in", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  const features = [
    "Live vehicle tracking and route monitoring",
    "Driver safety and incident management",
    "Maintenance and compliance alerts",
    "Fuel, expense, and performance analytics",
  ];

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      {/* Left information panel */}
      <section className="relative hidden min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute -left-32 top-28 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-16 top-24 h-32 w-32 rounded-full border border-white/5" />
        <div className="pointer-events-none absolute bottom-32 left-20 h-20 w-20 rounded-full border border-blue-400/10" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-950/30">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <div className="text-base font-semibold tracking-tight">
              Beayrik
            </div>

            <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-400">
              Enterprise Fleet ERP
            </div>
          </div>
        </div>

        {/* Main information */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-5 inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
            Smart fleet operations platform
          </div>

          <h1 className="max-w-md text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Smarter transport operations, all in one place.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300 xl:text-base">
            Track vehicles, manage drivers, monitor routes, and respond to
            incidents in real time through one connected workspace.
          </p>

          <div className="mt-8 space-y-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-sm text-slate-200"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} Beayrik. All rights reserved.
        </div>
      </section>

      {/* Right login section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        {/* Mobile background decorations */}
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-slate-200/70 blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile brand */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 text-white shadow-md">
              <Building2 className="h-5 w-5" />
            </div>

            <div>
              <div className="text-base font-semibold text-slate-900">
                Beayrik
              </div>

              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Enterprise Fleet ERP
              </div>
            </div>
          </div>

          {/* Login card */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="mb-7">
              <div className="mb-3 inline-flex rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Secure access
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to access your fleet operations workspace.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              {/* Email */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-sm text-slate-700">
                  Email address
                </Label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 transition focus:bg-white"
                    aria-invalid={Boolean(form.formState.errors.email)}
                    {...form.register("email")}
                  />
                </div>

                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm text-slate-700"
                  >
                    Password
                  </Label>

                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                    onClick={() =>
                      toast.info(
                        "A password reset link would be sent to your email.",
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 pr-11 transition focus:bg-white"
                    aria-invalid={Boolean(
                      form.formState.errors.password,
                    )}
                    {...form.register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-slate-700">
                  Select your role
                </Label>

                <Select
                  value={form.watch("role")}
                  onValueChange={(value) =>
                    form.setValue("role", value as UserRole, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Fleet Manager">
                      Fleet Manager
                    </SelectItem>

                    <SelectItem value="Administrator">
                      Administrator
                    </SelectItem>

                    <SelectItem value="Safety Officer">
                      Safety Officer
                    </SelectItem>

                    <SelectItem value="Financial Analyst">
                      Financial Analyst
                    </SelectItem>

                    <SelectItem value="Driver">Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remember me */}
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                <Checkbox
                  checked={form.watch("remember")}
                  onCheckedChange={(checked) =>
                    form.setValue("remember", Boolean(checked))
                  }
                />

                <span>Remember me on this device</span>
              </label>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-11 w-full rounded-xl bg-blue-600 font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg disabled:cursor-not-allowed"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-xs leading-5 text-slate-400">
                Protected by role-based access control. Contact your
                administrator for account provisioning.
              </p>
            </form>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400 lg:hidden">
            © {new Date().getFullYear()} Beayrik. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}