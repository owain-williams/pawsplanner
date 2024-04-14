'use server'

import { db } from "@/lib/db"

export default async function deleteFromBasket(basketItemId: string) {
  return await db.basketItem.delete({
    where: {
      id: basketItemId
    }
  })
}