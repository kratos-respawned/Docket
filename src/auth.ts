import { db } from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
export const adapter = PrismaAdapter(db);
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
