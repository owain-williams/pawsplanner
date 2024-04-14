'use server'

import { db } from "@/lib/db"

export default async function getDogNameFromId(id: string) {
  const dog = await db.dog.findUnique({
    where: {
      id
    }
  })

  return dog?.name;
}