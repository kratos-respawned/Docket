import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = data.id;
  try {
    const resp = await redis.del(id);
    return NextResponse.json("success");
  } catch (e) {
    throw new Error("error occured");
  }
}
