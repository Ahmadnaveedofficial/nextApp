"use client";

import { Toaster } from "sonner";

// Global toast provider
export function SonnerProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
    />
  );
}