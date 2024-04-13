'use server'

import { db } from "@/lib/db";
import { SlotPreset } from "@prisma/client";
import { log } from "console";
import { add } from "date-fns";

export default async function getAvailableSlots(date: Date, dogId: string, orgId: string, userId: string): Promise<SlotPreset[]> {
  /** THIS IS STUPID
   *  Date Picker brings back 11pm from the day before the selected date
   * This should be fixed at source, and this line removed
   */
  date = add(date, { hours: 1 })
  // End of stupidity

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
  const basket = await db.basket.findFirst({
    where: {
      userId,
      finished: false
    },
    include: {
      items: true
    }
  })

  // Slots, direct from db
  console.log(slots)
  console.log(dogId)
  console.log(bookings)
  console.log(date)


  // Filter out slots that aren't available on the selected day
  let filteredSlots = slots.filter((slot) => {
    return slot.days.includes(date.getDay())
  })
  console.log(filteredSlots)

  // Filter out slots that the dog is currently booked in for
  const dogIsBooked = bookings.filter((booking) => {
    return booking.dogId === dogId
  })
  console.log(dogIsBooked)

  let badSlots = dogIsBooked.map((booking) => (booking.slotPresetId))
  console.log(badSlots)

  filteredSlots = filteredSlots.filter((slot) => {
    return !badSlots.includes(slot.id)
  })
  console.log(filteredSlots)

  // TODO: Filter out slots that the dog is currently booked in for IN BASKET
  const dogIsInBasket = basket?.items.filter((item) => {
    return item.dogId === dogId
  })
  console.log(dogIsInBasket)

  const badSlotsBasket = dogIsInBasket?.map((item) => (item.slotPresetId))
  console.log(badSlotsBasket)

  filteredSlots = filteredSlots.filter((slot) => {
    return !badSlotsBasket?.includes(slot.id)
  })
  // TODO: Filter out slots that are over capacity

  return filteredSlots;
}
