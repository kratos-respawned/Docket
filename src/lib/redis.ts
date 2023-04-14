import { Redis } from "ioredis";
const getRedisUrl = () => {
  if (process.env.NEXT_PUBLIC_REDIS_URL) {
    return process.env.NEXT_PUBLIC_REDIS_URL;
  }

  throw new Error("REDIS_URL is not defined");
};
export const redis = new Redis(getRedisUrl());
