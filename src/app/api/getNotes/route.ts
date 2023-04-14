import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // get all key values
    const keys = await redis.keys("*");
    const values = await redis.mget(keys);
    if (!values) return NextResponse.json({ notes: [] });
    const notes: Note[] = values.map((value, index) => {
      if (!value) return;
      return {
        id: keys[index],
        ...JSON.parse(value),
      };
    });
    const parsedNotes: Note[] = notes.sort(
      (a: Note, b: Note) => b.timestamp - a.timestamp
    );
    return NextResponse.json({ notes: parsedNotes });
  } catch (e) {
    return NextResponse.json({ message: "error occured" });
  }
}
