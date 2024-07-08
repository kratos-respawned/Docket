import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";
export const r2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_URL,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_ID,
    secretAccessKey: env.CLOUDFLARE_ACCESS_KEY,
  },
});
