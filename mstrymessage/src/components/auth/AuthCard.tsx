"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

// ==========================================
// Reusable Authentication Card
// ==========================================
const AuthCard = ({ children, className }: AuthCardProps) => {
  return (
    <div
      className={cn(
        "relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_50px_rgba(139,92,246,0.15)] backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_80px_rgba(139,92,246,0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default AuthCard;
