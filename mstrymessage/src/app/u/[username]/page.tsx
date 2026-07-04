
"use client";

// ==========================================
// React & Next
// ==========================================

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// ==========================================
// Libraries
// ==========================================

import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================

import {
  Loader2,
  Wand2,
  Send,
  MessageSquare,
  MessageCircleMore,
} from "lucide-react";

// ==========================================
// UI Components
// ==========================================

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// ==========================================
// Types
// ==========================================

import {
  messageSchema,
  MessageSchema,
} from "@/schemas/message/messageSchema";

import { ApiResponse } from "@/utils/ApiResponse";

// ==========================================
// Constants
// ==========================================

const INITIAL_MESSAGES = [
  "What's one thing you admire about me?",
  "Describe me in one word.",
  "What's my biggest strength?",
];


// ==========================================
// Page
// ==========================================

export default function SendMessagePage() {
  const { username } = useParams<{ username: string }>();

  // ==========================================
  // React Hook Form
  // ==========================================

  const form = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageContent = form.watch("content");

  // ==========================================
  // Local State
  // ==========================================

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(
  INITIAL_MESSAGES
);

  // ==========================================
  // Select Suggested Message
  // ==========================================

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  // ==========================================
  // Send Anonymous Message
  // ==========================================

  const onSubmit = async (data: MessageSchema) => {
    try {
      setIsSubmitting(true);

      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });

      toast.success(response.data.message);

      form.reset({
        content: "",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? "Failed to send message."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // Fetch Suggested Messages
  // ==========================================

const fetchSuggestedMessages = async () => {
  try {
    setIsSuggestLoading(true);

    const response = await axios.get<ApiResponse<string[]>>(
      "/api/suggest-messages"
    );

    setSuggestedMessages(response.data.data ?? []);

    toast.success(response.data.message);
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    toast.error(
      axiosError.response?.data.message ??
        "Failed to generate suggestions."
    );
  } finally {
    setIsSuggestLoading(false);
  }
};

  // ==========================================
  // Render
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)] px-6 py-16">
      <section className="mx-auto max-w-3xl">
        {/* ==========================================
            Header
        ========================================== */}

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Send an Anonymous Message
          </h1>

          <p className="mt-4 text-slate-400">
            You're sending a message to{" "}
            <span className="font-semibold text-violet-400">
              @{username}
            </span>
            . They won't know it's from you.
          </p>
        </div>

        {/* ==========================================
            Message Form
        ========================================== */}

        <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">
                        Your anonymous message
                      </FormLabel>

                      <FormControl>
                        <Textarea
                          placeholder="Write your honest message here..."
                          className="min-h-[140px] resize-none mt-3 border-slate-700 bg-slate-950 text-white placeholder:text-slate-500"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !messageContent}
                    className="cursor-pointer p-6 w-45 text-lg rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 hover:from-violet-500 hover:to-indigo-500"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* ==========================================
            AI Suggestions
        ========================================== */}

        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Suggested Messages
              </h2>

              <p className="text-slate-400">
                Click any suggestion to use it instantly.
              </p>
            </div>

            <Button
              type="button"
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="cursor-pointer p-6 w-40 text-lg rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            >
              {isSuggestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>

          <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl">
            <CardContent className="space-y-4 p-6">
              {suggestedMessages.length === 0 ? (
                <p className="text-center text-slate-400">
                  Click <strong>Generate</strong> to receive AI suggestions.
                </p>
              ) : (
                suggestedMessages.map((message, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMessageClick(message)}
                    className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-4 text-left transition hover:border-violet-500 hover:bg-slate-900"
                  >
                    <div className="flex items-start gap-3">
                      <MessageSquare className="mt-1 h-5 w-5 text-violet-400" />

                      <span className="text-slate-300">{message}</span>
                    </div>
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10 bg-slate-800" />

        {/* ==========================================
            CTA
        ========================================== */}

        <section className="text-center">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600">
              <MessageCircleMore className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white">
              Create Your Own Anonymous Message Board
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Let your friends, classmates, audience or coworkers send
              anonymous messages to you through your own personal profile.
            </p>

                <Link href="/sign-up">

                  <Button className="h-12 mt-8 text-lg cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8  hover:from-violet-500 hover:to-indigo-500">

                    Create Free Account

                  </Button>

                </Link>
          </div>
        </section>
      </section>
    </main>
  );
}