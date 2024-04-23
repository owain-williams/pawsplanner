import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { Booking, columns } from "./columns";

export default async function AdminBookingsPage() {
  const { orgId } = auth();
  if (!orgId) return;
  const bookingsFromDb = await db.booking.findMany({
    where: {
      orgId,
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
  const data = bookingsFromDb.map((booking) => ({
    id: booking.id,
    date: booking.date.toLocaleDateString(),
    dog: booking.dog.name,
    slot: `${booking.slot.startTime} - ${booking.slot.endTime}`,
    isPaid: booking.isPaid,
  }));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Bookings</h1>
      <DataTable data={data} columns={columns} />
    </main>
  );
}
