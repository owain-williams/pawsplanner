'use server'

import { db } from "@/lib/db";
import { Service } from "@prisma/client";
import { log } from "console";
import { add } from "date-fns";

export default async function getAvailableSlots(date: Date, dogId: string, orgId: string, userId: string): Promise<Service[]> {
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
  const slots = await db.service.findMany({
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
  let filteredServices = slots.filter((service) => {
    return service.days.includes(date.getDay())
  })
  console.log(filteredServices)

  // Filter out slots that the dog is currently booked in for
  const dogIsBooked = bookings.filter((booking) => {
    if (booking.dogId === dogId) {
      return true
    } else {
      return false
    }

  })
  console.log(dogIsBooked)

  let badSlots = dogIsBooked.map((booking) => (booking.serviceId))
  console.log(badSlots)

  filteredServices = filteredServices.filter((service) => {
    return !badSlots.includes(service.id)
  })
  console.log(filteredServices)

  // Filter out slots that the dog is currently booked in for IN BASKET
  const dogIsInBasket = basket?.items.filter((item) => {
    if (item.dogId == dogId && item.date.getDate() === date.getDate()) {
      return true
    } else {
      return false
    }
  })
  console.log(dogIsInBasket)

  const badSlotsBasket = dogIsInBasket?.map((item) => (item.serviceId))
  console.log(badSlotsBasket)

  filteredServices = filteredServices.filter((slot) => {
    return !badSlotsBasket?.includes(slot.id)
  })
  // TODO: Filter out slots that are over capacity

  return filteredServices;
}
