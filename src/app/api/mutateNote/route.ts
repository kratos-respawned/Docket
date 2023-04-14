import { redis } from "@/lib/redis";
import { Note } from "@/typings/note";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const data: Note = req.data;
  data.editing = false;
  data.timestamp = new Date().getTime();
  const id = data.id;
  console.log(id);
  try {
    const resp = await redis.hset("notes", id, JSON.stringify(data));
    return NextResponse.json({ message: "Success" });
  } catch (e) {
    return NextResponse.json({ message: "error occured" });
  }
}
