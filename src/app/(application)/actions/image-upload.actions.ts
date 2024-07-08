"use server";
import { env } from "@/env";
import { authedProcedure } from "@/lib/procedures";
import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import { z } from "zod";
export const getSignedUrlAction = authedProcedure
  .input(
    z.object({
      filename: z.string(),
      size: z.number(),
      type: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const hash = nanoid(18);
    const { filename, size, type } = input;
    const sizeLimit = 5 * 1024 ** 2;
    if (size > sizeLimit) {
      throw new Error("File size limit exceeded");
    }
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.]/g, "");
    // const objectkey = `${sanitizedFilename}-${hash}`;
    const objectkey = hash;
    const cmd = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: objectkey,
      ContentType: type,
      ContentLength: size,
    });
    const imageUrl = `${env.CLOUDFLARE_PUBLIC_URL}/${objectkey}`;
    const presignedUrl = await getSignedUrl(r2, cmd, { expiresIn: 3600 });
    return { imageUrl, presignedUrl };
  });
