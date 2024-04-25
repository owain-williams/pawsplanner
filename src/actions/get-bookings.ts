'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function getAdminBookings(fromDate: Date, toDate: Date) {
  const { orgId } = auth();
  if (!orgId) return;
  const bookingsFromDb = await db.booking.findMany({
    where: {
      orgId,
      date: {
        gte: fromDate,
        lte: toDate,
      },
    },
    include: {
      dog: true,
      payment: true,
      slot: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return bookingsFromDb.map((booking) => ({
    id: booking.id,
    date: booking.date.toLocaleDateString(),
    dog: booking.dog.name,
    slot: `${booking.slot.startTime} - ${booking.slot.endTime}`,
    isPaid: booking.isPaid,
  }));
}