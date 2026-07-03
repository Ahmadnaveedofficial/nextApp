"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// ==========================================
// Reusable Password Input
// Includes:
// - Lock icon
// - Show / Hide password
// - Fully reusable
// ==========================================
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">

        {/* Left Lock Icon */}
        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

        {/* Password Input */}
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(
            "h-12 pl-10 pr-12 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500",
            className
          )}
          {...props}
        />

        {/* Toggle Password Visibility */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>

      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;