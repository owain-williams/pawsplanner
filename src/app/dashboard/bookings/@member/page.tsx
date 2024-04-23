import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function BookingsPage() {
  const { orgId, userId } = auth();
  if (!userId) {
    return;
  }
  const upcomingBookings = await db.booking.findMany({
    where: {
      customerId: userId,
    },
    include: {
      dog: {
        include: {
          owner: true,
        },
      },
      payment: true,
    },
  });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Bookings
        </h1>
      </div>
      <Button asChild>
        <Link href={"/dashboard/bookings/new"}>+ New</Link>
      </Button>
      <div className="flex flex-col rounded-lg ">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Upcoming Bookings
        </h4>
        <ScrollArea>
          {upcomingBookings.length === 0 && (
            <p>You have no upcoming bookings</p>
          )}
          {upcomingBookings.length > 1 &&
            upcomingBookings.map((booking) => booking.dog.name)}
        </ScrollArea>
      </div>
    </main>
  );
}
