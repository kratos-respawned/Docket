import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // get all key values
    const keys = await redis.keys("*");
    const values = await redis.mget(keys);
    if (!values) return NextResponse.json([]);
    const rawNotes: Note[] = values.map((value, index) => {
      if (!value) return;
      return {
        id: keys[index],
        ...JSON.parse(value),
      };
    });
    const notes: Note[] = rawNotes.sort(
      (a: Note, b: Note) => b.timestamp - a.timestamp
    );
    return NextResponse.json(notes);
  } catch (e) {
    return NextResponse.json([]);
  }
}
