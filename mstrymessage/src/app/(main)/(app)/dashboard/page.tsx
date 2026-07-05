"use client";

// ==========================================
// React & Next Imports
// ==========================================
import { useCallback, useEffect, useState } from "react";

// ==========================================
// Third Party Libraries
// ==========================================
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================
import { Copy, Loader2, RefreshCcw, Link2, MessagesSquare } from "lucide-react";

// ==========================================
// UI Components
// ==========================================
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// ==========================================
// Components
// ==========================================
import MessageCard from "@/components/layout/MessageCard";

// ==========================================
// Schemas & Types
// ==========================================
import { acceptMessageSchema } from "@/schemas/message/acceptMessageSchema";
import { ApiResponse } from "@/utils/ApiResponse";
import { Message } from "@/models/user.model";

// ==========================================
// Dashboard Page
// ==========================================
const UserDashboardPage = () => {
  const { data: session } = useSession();

  // ==========================================
  // Local State
  // ==========================================

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // ==========================================
  // React Hook Form
  // ==========================================

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      isAcceptingMessage: false,
    },
  });
  const { watch, setValue } = form;

  const acceptMessages = watch("isAcceptingMessage");

  // ==========================================
  // Delete Message
  // ==========================================

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.filter((message) => message._id.toString() !== messageId),
    );
  };

  // ==========================================
  // Fetch Accept Messages Setting
  // ==========================================

  const fetchAcceptMessages = useCallback(async () => {
    try {
      setIsSwitchLoading(true);

      const response = await axios.get<ApiResponse>("/api/accept-messages");

      setValue("isAcceptingMessage", response.data.data as boolean);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ??
          "Failed to fetch message settings.",
      );
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // ==========================================
  // Fetch Messages
  // ==========================================

  const fetchMessages = useCallback(async (refresh = false) => {
    try {
      setIsLoading(true);

      const response = await axios.get<ApiResponse>("/api/get-messages");

      setMessages((response.data.data as Message[]) ?? []);

      if (refresh) {
        toast.success("Messages refreshed.");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? "Failed to fetch messages.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ==========================================
  // Initial Data Load
  // ==========================================

  useEffect(() => {
    if (!session?.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchMessages, fetchAcceptMessages]);

  // ==========================================
  // Toggle Accept Messages
  // ==========================================

  const handleSwitchChange = async () => {
    try {
      const newValue = !acceptMessages;

      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        isAcceptingMessage: newValue,
      });

      setValue("isAcceptingMessage", newValue);

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ??
          "Failed to update message settings.",
      );
    }
  };

  // ==========================================
  // Authentication Check
  // ==========================================

  if (!session?.user) {
    return null;
  }

  const { username } = session.user as User;

  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";

  const profileUrl = `${baseUrl}/u/${username}`;

  // ==========================================
  // Copy Profile URL
  // ==========================================

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Profile link copied successfully.");
    } catch {
      toast.error("Failed to copy profile link.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#312e81_0%,#0f172a_35%,#020617_100%)] px-4 py-10">
      {/* ==========================================
        Background Glow
    ========================================== */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-violet-700/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-700/20 blur-3xl" />
      </div>

      {/* ==========================================
        Dashboard Container
    ========================================== */}
      <section className="relative mx-auto max-w-7xl">
        {/* ==========================================
          Heading
      ========================================== */}
        <div className="mb-8">
          <h1 className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-4xl font-bold text-transparent">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your anonymous messages and share your profile with others.
          </p>
        </div>

        {/* ==========================================
          Top Grid
      ========================================== */}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ==========================================
            Share Profile Card
        ========================================== */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-violet-600/20 p-3">
                <Link2 className="h-6 w-6 text-violet-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Your Public Link
                </h2>

                <p className="text-sm text-slate-400">
                  Share this link to receive anonymous messages.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                value={profileUrl}
                disabled
                className="h-12 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 text-slate-300 outline-none"
              />

              <Button
                onClick={copyToClipboard}
                className="cursor-pointer h-12 p-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>

          {/* ==========================================
            Settings Card
        ========================================== */}

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-cyan-600/20 p-3">
                <MessagesSquare className="h-6 w-6 text-cyan-400" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white">
                  Message Settings
                </h2>

                <p className="text-sm text-slate-400">
                  Control whether people can send you anonymous messages.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <p className="font-medium text-white">Accept Messages</p>

                <p className="text-sm text-slate-400">
                  {acceptMessages
                    ? "Anyone can send you messages."
                    : "Receiving messages is disabled."}
                </p>
              </div>

              <Switch
              className="cursor-pointer bg-slate-800 data-[state=checked]:bg-indigo-600"
                checked={acceptMessages}
                disabled={isSwitchLoading}
                onCheckedChange={handleSwitchChange}
              />
            </div>
          </div>
        </div>

        {/* ==========================================
          Refresh
      ========================================== */}

        <div className="my-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Your Messages</h2>

          <Button
            variant="outline"
            onClick={() => fetchMessages(true)}
            className="border-slate-700 p-4 bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>

        <Separator className="mb-8 bg-slate-800" />

        {/* ==========================================
          Messages Grid
      ========================================== */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id.toString()}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 px-8 py-20 backdrop-blur-xl">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-600/20 to-indigo-600/20">
                  <MessagesSquare className="h-10 w-10 text-violet-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  No Messages Yet
                </h3>

                <p className="mt-3 max-w-md text-center text-slate-400">
                  Once someone sends you an anonymous message using your public
                  profile link, it will appear here.
                </p>

                <Button
                  onClick={copyToClipboard}
                  className="mt-8 rounded-xl p-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 cursor-pointer"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Your Link
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default UserDashboardPage;
