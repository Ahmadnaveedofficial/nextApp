"use client";

// ==========================================
// React
// ==========================================

import React from "react";

// ==========================================
// Third Party Libraries
// ==========================================

import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toast } from "sonner";

// ==========================================
// Icons
// ==========================================

import { Trash2, MessageCircle, CalendarDays } from "lucide-react";

// ==========================================
// UI Components
// ==========================================

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ==========================================
// Types
// ==========================================

import { Message } from "@/models/user.model";
import { ApiResponse } from "@/utils/ApiResponse";

// ==========================================
// DayJS
// ==========================================

dayjs.extend(relativeTime);

// ==========================================
// Props
// ==========================================

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

// ==========================================
// Component
// ==========================================

export default function MessageCard({
  message,
  onMessageDelete,
}: MessageCardProps) {
  // ==========================================
  // Delete Message
  // ==========================================

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`,
      );

      toast.success(response.data.message);

      onMessageDelete(message._id.toString());
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;

      toast.error(
        axiosError.response?.data.message ?? "Failed to delete message.",
      );
    }
  };

  return (
    <Card className="group overflow-hidden rounded-3xl border border-violet-500/10 bg-slate-900/60 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-violet-900/30">
      <CardContent className="flex items-start gap-5 p-6">
        {/* ==========================================
            Left Side
        ========================================== */}

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start gap-4">
            {/* Avatar */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-700/40">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>

            {/* Message */}

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-white">
                Anonymous Message
              </h3>

              <p className="mt-3 whitespace-pre-wrap break-words leading-7 text-slate-300">
                {message.content}
              </p>
            </div>
          </div>

          {/* Date */}

          <div className="mt-6 flex flex-wrap items-center gap-3 pl-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              <CalendarDays className="h-3.5 w-3.5" />

              {dayjs(message.createdAt).format("MMM D, YYYY • h:mm A")}
            </span>

            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              {dayjs(message.createdAt).fromNow()}
            </span>
          </div>
        </div>

        {/* ==========================================
            Delete Button
        ========================================== */}

        <div className="ml-auto flex-shrink-0">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                className="h-11 w-11 cursor-pointer rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 transition-all duration-300 hover:scale-105 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-10 rounded-3xl border border-violet-500/20 bg-slate-900 text-white shadow-2xl shadow-violet-900/30">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold text-white">
                  Delete Message?
                </AlertDialogTitle>

                <AlertDialogDescription className="leading-7 text-slate-400">
                  This action cannot be undone.
                  <br />
                  Once deleted, this anonymous message will be permanently
                  removed from your inbox.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-4 bg-slate-900">
                <AlertDialogCancel
                  className="
                  p-5
                    cursor-pointer
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    text-slate-200
                    transition-all
                    duration-300
                    hover:bg-slate-700
                    hover:text-white
                  "
                >
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="
                  p-5
                    cursor-pointer
                    rounded-xl
                    bg-gradient-to-r
                    from-red-600
                    to-red-500
                    text-white
                    transition-all
                    duration-300
                    hover:from-red-500
                    hover:to-red-400
                  "
                >
                  Delete Message
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
