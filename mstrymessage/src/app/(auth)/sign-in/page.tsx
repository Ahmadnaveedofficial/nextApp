"use client";

// ==========================================
// React & Next Imports
// ==========================================
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ==========================================
// Third Party Libraries
// ==========================================
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================
import { Loader2, User } from "lucide-react";

// ==========================================
// UI Components
// ==========================================
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// ==========================================
// Reusable Components
// ==========================================
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import TextInput from "@/components/auth/TextInput";

// ==========================================
// Schemas
// ==========================================
import {
  signInSchema,
  SignInSchema,
} from "@/schemas/auth/signInSchema";

// ==========================================
// Sign In Page
// ==========================================
const SignInPage = () => {
  const router = useRouter();

  // ==========================================
  // Local State
  // ==========================================

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // React Hook Form
  // ==========================================

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // ==========================================
  // Handle Sign In
  // ==========================================

  const onSubmit = async (data: SignInSchema) => {
    try {
      setIsSubmitting(true);

      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            toast.error("Invalid email/username or password.");
            break;

          default:
            toast.error(result.error);
            break;
        }

        return;
      }

      toast.success("Signed in successfully.");

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Sign In Error:", error);

      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)] px-4 py-10">
      {/* ==========================================
          Background Blur Effects
      ========================================== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-violet-700/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-700/20 blur-3xl" />
      </div>

      {/* ==========================================
          Authentication Card
      ========================================== */}
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          description="Sign in to your Mystery Message account and continue receiving anonymous messages."
        />

        {/* ==========================================
            Sign In Form
        ========================================== */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* ==============================
                Identifier Field
            ============================== */}
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">
                    Email Address or Username
                  </FormLabel>

                  <TextInput
                    {...field}
                    type="text"
                    icon={User}
                    placeholder="Enter your email or username"
                    autoComplete="username"
                  />

                  <p className="text-xs text-slate-500">
                    Use your registered email address or username.
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ==============================
                Password Field
            ============================== */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">
                    Password
                  </FormLabel>

                  <PasswordInput
                    {...field}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ==============================
                Submit Button
            ============================== */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* ==============================
                Footer
            ============================== */}
            <div className="pt-2 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </AuthCard>
    </main>
  );
};

export default SignInPage;