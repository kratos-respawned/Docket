import { redis } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = data.id;
  try {
    const resp = await redis.del(id);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    return NextResponse.json({ message: "error occured" });
  }
}
