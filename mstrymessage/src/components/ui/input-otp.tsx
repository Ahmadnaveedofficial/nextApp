"use client";

// ==========================================
// React Imports
// ==========================================
import * as React from "react";

// ==========================================
// Third Party Imports
// ==========================================
import { OTPInput, OTPInputContext } from "input-otp";

// ==========================================
// Utils
// ==========================================
import { cn } from "@/lib/utils";

// ==========================================
// Root OTP Component
// ==========================================
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center justify-center gap-3",
      containerClassName
    )}
    className={cn(className)}
    {...props}
  />
));

InputOTP.displayName = "InputOTP";

// ==========================================
// OTP Group
// ==========================================
const InputOTPGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-center gap-3",
      className
    )}
    {...props}
  />
);

InputOTPGroup.displayName = "InputOTPGroup";

// ==========================================
// Individual OTP Box
// ==========================================
const InputOTPSlot = ({ index }: { index: number }) => {
  const inputContext = React.useContext(OTPInputContext);

  const slot = inputContext.slots[index];

  return (
    <div
      className={cn(
        "relative flex h-14 w-12 items-center justify-center overflow-hidden rounded-xl border text-lg font-semibold transition-all duration-300",

        // Default
        "border-slate-700 bg-slate-900/80 text-white backdrop-blur-sm",

        // Hover
        "hover:border-violet-500 hover:bg-slate-800",

        // Filled
        slot.char && "border-violet-500 bg-slate-800",

        // Active
        slot.isActive &&
          "scale-105 border-violet-500 ring-4 ring-violet-500/20",

        // Disabled
        "disabled:opacity-50"
      )}
    >
      <span>{slot.char ?? slot.placeholderChar}</span>

      {/* Animated Cursor */}
      {slot.isActive && (
        <div className="absolute h-6 w-[2px] animate-pulse bg-violet-400" />
      )}
    </div>
  );
};

InputOTPSlot.displayName = "InputOTPSlot";

// ==========================================
// Exports
// ==========================================
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
};