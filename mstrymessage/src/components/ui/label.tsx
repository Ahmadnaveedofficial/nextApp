"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Label Variants
// Defines the default styling for all label components.
// -----------------------------------------------------------------------------
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

// -----------------------------------------------------------------------------
// Label Component
// Wrapper around Radix UI's Label component.
// Supports variants and forwards refs.
// -----------------------------------------------------------------------------
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));

// Set display name for better debugging in React DevTools
Label.displayName = LabelPrimitive.Root.displayName;

// -----------------------------------------------------------------------------
// Export Component
// -----------------------------------------------------------------------------
export { Label };