import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const revalidate = true;
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const notes= (await db.note.findMany()).sort((a,b)=>Number(b.timestamp)-Number(a.timestamp));
    return NextResponse.json(notes);
  } catch (e) {
    return NextResponse.json([]);
  }
}
