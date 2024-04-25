import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { BasketWithItems } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import { Service } from "@prisma/client";
import { ShoppingCart } from "lucide-react";

import Basket from "./_components/basket";
import NewBookingForm from "./_components/new-booking-form";

export type GetAvailableSlotsType = (date: Date, dogId: string) => Service[];

export default async function NewBookingsPage() {
  const { orgId, userId } = auth();
  if (!orgId || !userId) return;

  console.log(orgId);

  const dogs = await db.dog.findMany({
    where: {
      archived: false,
      orgId,
    },
    include: {
      image: true,
      metadata: true,
      owner: true,
    },
  });
  console.log(dogs);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          New Bookings
        </h1>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="lg:basis-2/3">
          <Card>
            <CardHeader>
              <CardTitle>New Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <NewBookingForm dogs={dogs} orgId={orgId} userId={userId} />
            </CardContent>
          </Card>
        </div>
        {/* <div className="lg:basis-1/3"><Basket basket={basket} /></div> */}
      </div>
    </main>
  );
}
