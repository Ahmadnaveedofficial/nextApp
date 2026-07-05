"use client";

// ==========================================
// React & Next Imports
// ==========================================
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ==========================================
// Third Party Libraries
// ==========================================
import axios, { AxiosError } from "axios";
import { useDebounceValue } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================
import { Loader2, Mail, User } from "lucide-react";

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
// Reusable Auth Components
// ==========================================
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import PasswordInput from "@/components/auth/PasswordInput";
import TextInput from "@/components/auth/TextInput";

// ==========================================
// Schemas & Types
// ==========================================
import { signUpSchema, SignUpSchema } from "@/schemas/auth/signUpSchema";

import { ApiResponse } from "@/utils/ApiResponse";

// ==========================================
// Sign Up Page
// ==========================================
const SignUpPage = () => {
  const router = useRouter();

  // ==========================================
  // Local States
  // ==========================================

  // Username entered by user
  const [username, setUsername] = useState("");

  // Username availability message
  const [usernameMessage, setUsernameMessage] = useState("");

  // Username checking loader
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Submit button loader
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced username
  const [debouncedUsername] = useDebounceValue(username, 500);

  // ==========================================
  // React Hook Form
  // ==========================================

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // ==========================================
  // Check Username Availability
  // ==========================================

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      // Don't call API if username is empty
      if (!debouncedUsername.trim()) {
        setUsernameMessage("");
        return;
      }

      try {
        setIsCheckingUsername(true);

        const response = await axios.get<ApiResponse>(
          `/api/check-username-unique?username=${debouncedUsername}`,
        );

        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        setUsernameMessage(
          axiosError.response?.data.message ?? "Unable to check username.",
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameAvailability();
  }, [debouncedUsername]);

  // ==========================================
  // Form Submit
  // ==========================================

  const onSubmit = async (data: SignUpSchema) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success(response.data.message);

      router.replace(`/verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? "Failed to create account.",
      );
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
          title="Mystery Message"
          description="Create your anonymous inbox and start receiving honest messages from anyone."
        />

        {/* ==========================================
            Sign Up Form
        ========================================== */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ==============================
                Username Field
            ============================== */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Username</FormLabel>

                  <TextInput
                    {...field}
                    icon={User}
                    placeholder="Choose a unique username"
                    autoComplete="username"
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />

                  {/* Username Availability */}
                  {isCheckingUsername ? (
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking availability...
                    </div>
                  ) : (
                    usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage === "Username is unique"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ==============================
                Email Field
            ============================== */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">
                    Email Address
                  </FormLabel>

                  <TextInput
                    {...field}
                    type="email"
                    icon={Mail}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />

                  <p className="text-xs text-slate-500">
                    We'll send a verification code to this email.
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
                  <FormLabel className="text-slate-200">Password</FormLabel>

                  <PasswordInput
                    {...field}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
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
              className="cursor-pointer h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            {/* ==============================
                Footer
            ============================== */}
            <div className="pt-2 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </AuthCard>
    </main>
  );
};

export default SignUpPage;
