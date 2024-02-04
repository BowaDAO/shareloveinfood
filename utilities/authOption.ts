import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { connectDatabase } from "./connectDatabase";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        return await axios
          .post(`${process.env.NEXTAUTH_URL}/api/signin`, {
            email,
            password,
          })
          .then((res) => {
            const user = res.data;

            if (user) {
              return user;
            } else {
              return null;
            }
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.message);
          });
      },
    }),
  ],

  callbacks: {
    async jwt({ account, token, user }) {
      if (account) {
        await connectDatabase();

        const accountUser = await User.findOne({ email: user?.email });

        token._id = accountUser._id.toString();

        token.role = accountUser.role;
      }

      return token;
    },

    async session({ token, session }) {
      session.user._id = token._id;

      session.user.role = token.role;

      return session;
    },

    async signIn({ profile, credentials }) {
      await connectDatabase();

      await User.findOne({ email: credentials?.email });

      return true;
    },
  },

  pages: {
    signIn: "/",
  },
};
