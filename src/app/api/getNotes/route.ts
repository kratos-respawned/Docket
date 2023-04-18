import { redis } from "@/lib/redis";
// import { Note } from "@/typings/note";
import { NextResponse } from "next/server";
export const revalidate = true;
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const keys = await redis.keys("*");
    const values = await redis.mget(keys);
    if (!values) return NextResponse.json([]);
    const notes = values
      .map((value, index) => {
        if (!value) return;
        return {
          id: keys[index],
          ...JSON.parse(value),
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    return NextResponse.json(notes);
  } catch (e) {
    return NextResponse.json([]);
  }
}
