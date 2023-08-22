import { db } from "@/lib/prisma";
import { Note } from "@/typings/note";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const req = await request.json();
  const data: Note = {
    id: req.id,
    content: req.content,
    accent: req.accent,
    editing: false,
    timestamp: new Date().getTime().toString(),
  };

  try {
    await db.note.update({
      where: {
        id: data.id,
      },
      data: {
        content: data.content,
        accent: data.accent,
        editing: data.editing,
        timestamp: data.timestamp,
      },
    });
    return NextResponse.json(data);
  } catch (e) {
    throw new Error("Error mutating note");
  }
}
