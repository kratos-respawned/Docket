import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";

export async function POST(request: Request) {
  const req = await request.json();
  if (!req.accent) return NextResponse.json({ message: "No accent" });
  const data = req.accent as string;
  const id = new Date().getTime();
  const noteData: Note = {
    id: id,
    accent: data,
    content: "Enter your text here",
    editing: false,
    timestamp: new Date().getTime(),
  };
  try {
    const resp = await redis.hset("notes", id, JSON.stringify(noteData));
    return NextResponse.json({ message: resp });
  } catch (e) {
    return NextResponse.json({ message: "error occured" });
  }
}
