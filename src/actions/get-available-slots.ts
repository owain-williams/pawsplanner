'use server'

import { db } from "@/lib/db";
import { SlotPreset } from "@prisma/client";

export default async function getAvailableSlots(date: Date, dogId: string, orgId: string): Promise<SlotPreset[]> {
  const bookings = await db.booking.findMany({
    where: {
      orgId,
      date
    }
  })
  const slots = await db.slotPreset.findMany({
    where: {
      orgId
    }
  })
  // Slots, direct from db
  console.log(slots)

  return slots;
}
