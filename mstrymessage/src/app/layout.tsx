import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import AuthProvider from "@/context/AuthProvider";
import { SonnerProvider } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MysteryMessage",
  description: "A secure and private messaging platform for sharing secrets with friends and family.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col">
          {children}
          {/* Global toast notifications */}
          <SonnerProvider />
        </body>
      </AuthProvider>
    </html>
  );
}
