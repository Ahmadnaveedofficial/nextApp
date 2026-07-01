import "next-auth";
import { DefaultSession } from "next-auth";

// Extend NextAuth's default types
declare module "next-auth" {
  // Add custom properties to the authenticated user
  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }

  // Extend the session object with custom user properties
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessage?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}

// Extend JWT token with custom user properties
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessage?: boolean;
    username?: string;
  }
}
