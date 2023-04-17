import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { RedisKey } from "ioredis";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const req = await request.json();
  const data: Note = {
    id: req.id,
    content: req.content,
    accent: req.accent,
    editing: false,
    timestamp: new Date().getTime(),
  };

  try {
    const ID = data.id as unknown as RedisKey;
    await redis.set(ID, JSON.stringify(data));
    return NextResponse.json(data);
  } catch (e) {
    throw new Error("Error mutating note");
  }
}
