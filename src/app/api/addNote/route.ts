import { NextResponse } from "next/server";
import { Note } from "@/typings/note";
import { db } from "@/lib/prisma";

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
    timestamp: (new Date().getTime()).toString(),
  };
  try {
    await db.note.create({
      data:{
        accent: noteData.accent,
        content: noteData.content,
        editing: noteData.editing,
        timestamp: noteData.timestamp,
        id: noteData.id
      }
    })
    return NextResponse.json(noteData);
  } catch (e) {
    throw new Error("Error adding note");
  }
}
