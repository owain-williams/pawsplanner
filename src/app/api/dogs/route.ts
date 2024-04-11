import { NextRequest, NextResponse } from "next/server";
import { type Dog, type Image } from "@prisma/client";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, breed, ownerId, contentDisposition, contentType, downloadUrl, pathname, url }: Dog & Image = await req.json();

  const dog = await db.dog.create({
    data: {
      name,
      breed,
      ownerId
    }
  })
  const image = await db.image.create({
    data: {
      contentDisposition,
      contentType,
      downloadUrl,
      pathname,
      url,
      dogId: dog.id
    }
  })
  return NextResponse.json({ dog, image })

}