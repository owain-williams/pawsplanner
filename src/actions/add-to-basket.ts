'use server'

import { Basket, SlotPreset } from "@prisma/client";
import { db } from "@/lib/db";
import { add } from "date-fns";

export default async function addToBasket(userId: string, dogId: string, date: Date, slotPresetId: string, orgId: string) {
  date = add(date, { hours: 1 });
  let basket: Basket | null = null;
  // Find a basket
  const existingBasket = await db.basket.findFirst({
    where: {
      userId,
      finished: false
    }
  })
  let newBasket;
  existingBasket ? basket = existingBasket : null
  if (!basket) {
    newBasket = await db.basket.create({
      data: {
        userId,
        orgId
      }
    })
    basket = newBasket
  }

  return await db.basketItem.create({
    data: {
      dogId,
      date,
      slotPresetId,
      orgId,
      basketId: basket.id
    }
  })
}