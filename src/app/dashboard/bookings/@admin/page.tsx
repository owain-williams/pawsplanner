import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { Booking, columns } from "./columns";
import { DataTable } from "./data-table";

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
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-semibold md:text-2xl">Bookings</h1>
        <Button asChild>
          <Link href="/dashboard/bookings/new">+ New Booking</Link>
        </Button>
      </div>
      <DataTable data={data} columns={columns} />
    </main>
  );
}
