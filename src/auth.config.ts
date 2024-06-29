import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

import { env } from "@/env";
import { getUserByEmail } from "@/lib/auth/account/user";
import { LoginSchema } from "@/validators/auth-schema";

const Config = {
  providers: [
    Github({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      const { email } = token;
      if (!email) return session;
      const user = await getUserByEmail(email);
      if (!user) return session;
      session.user.id = user.id;
      return session;
    },
    // async jwt({ token }) {
    //   return token;
    // },
  },
} satisfies NextAuthConfig;
export default Config;
