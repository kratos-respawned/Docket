import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const id = data.id;
  try {
    // const resp = await redis.del(id);
    await db.note.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json("success");
  } catch (e) {
    console.log(e);
    throw new Error("error occured");
  }
}
