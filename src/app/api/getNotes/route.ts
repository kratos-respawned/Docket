import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const notes = await redis.hvals("notes");
    const parsedNotes: Note[] = notes
      .map((note) => JSON.parse(note))
      .sort((a: Note, b: Note) => b.timestamp - a.timestamp);
    return NextResponse.json({ notes: parsedNotes });
  } catch (e) {
    return NextResponse.json({ message: "error occured" });
  }
}
