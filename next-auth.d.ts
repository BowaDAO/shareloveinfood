import { DefaultSession, User, Profile } from "next-auth";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    _id?: string;
    role?: string;
  }

  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    role?: string;
  }
}
