"use client";

// ==========================================
// React & Next Imports
// ==========================================
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// ==========================================
// Third Party Libraries
// ==========================================
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================
import { Loader2 } from "lucide-react";

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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// ==========================================
// Reusable Components
// ==========================================
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";

// ==========================================
// Schemas & Types
// ==========================================
import {
  verifySchema,
  VerifySchema,
} from "@/schemas/auth/verifySchema";

import { ApiResponse } from "@/utils/ApiResponse";

// ==========================================
// Verify Account Page
// ==========================================
const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ==========================================
  // React Hook Form
  // ==========================================

  const form = useForm<VerifySchema>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  // ==========================================
  // Verify OTP
  // ==========================================

  const onSubmit = async (data: VerifySchema) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post<ApiResponse>(
        "/api/verify-code",
        {
          username: params.username,
          code: data.code,
        }
      );

      toast.success(response.data.message);

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ??
          "Verification failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)] px-4">

      {/* Background Blur */}
      <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-violet-700/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-cyan-700/20 blur-3xl" />

      <AuthCard>

        <AuthHeader
          title="Verify Your Account"
          description={`Enter the 6-digit verification code sent to your email.`}
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>

                  <FormLabel className="text-slate-200">
                    Verification Code
                  </FormLabel>

                  <div className="flex justify-center">

                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      containerClassName="justify-center"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

                  </div>

                  <FormMessage />

                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-indigo-500 active:scale-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>

            <div className="text-center text-sm text-slate-400">
              Didn't receive the verification code?
              <button
                type="button"
                className="ml-2 font-medium text-violet-400 transition hover:text-violet-300 cursor-pointer"
              >
                Resend Code
              </button>
            </div>

          </form>
        </Form>

      </AuthCard>
    </main>
  );
};

export default VerifyAccount;