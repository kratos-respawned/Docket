import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.string(),
    AUTH_SECRET: z.string().min(3),
    AUTH_GITHUB_ID: z.string().min(3),
    AUTH_GITHUB_SECRET: z.string().min(3),
    AUTH_RESEND_KEY: z.string().min(3),
    CLOUDFLARE_URL: z.string().url(),
    CLOUDFLARE_ACCESS_KEY: z.string().min(3),
    CLOUDFLARE_ACCESS_ID: z.string().min(3),
    CLOUDFLARE_BUCKET_NAME: z.string().min(3),
    CLOUDFLARE_PUBLIC_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    // AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    // AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    CLOUDFLARE_URL: process.env.CLOUDFLARE_URL,
    CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
    CLOUDFLARE_ACCESS_ID: process.env.CLOUDFLARE_ACCESS_ID,
    CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,
    CLOUDFLARE_PUBLIC_URL: process.env.CLOUDFLARE_PUBLIC_URL,
    // NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    NODE_ENV:
      process.env.NODE_ENV === "development" ? "development" : "production",
    NEXT_PUBLIC_APP_URL:
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  emptyStringAsUndefined: true,
});
