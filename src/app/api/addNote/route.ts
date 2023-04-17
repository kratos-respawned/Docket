import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { RedisKey } from "ioredis";

export async function POST(request: Request) {
  const req = await request.json();
  if (!req.accent) return NextResponse.json("No accent");
  const data = req.accent as string;
  const id = req.id;
  const noteData: Note = {
    id: id,
    accent: data,
    content: "",
    editing: false,
    timestamp: new Date().getTime(),
  };
  try {
    const ID = id as unknown as RedisKey;
    const resp = await redis.set(ID, JSON.stringify(noteData));
    return NextResponse.json(noteData);
  } catch (e) {
    throw new Error("Error adding note");
  }
}
