"use client";

import { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  className?: string;
}

// ==========================================
// Reusable Text Input
// Supports:
// - Username
// - Email
// - Any text input
// ==========================================
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ icon: Icon, className, ...props }, ref) => {
    return (
      <div className="relative">
        {/* Left Icon */}
        <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

        {/* Input */}
        <Input
          ref={ref}
          className={cn(
            "h-12 pl-10 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;