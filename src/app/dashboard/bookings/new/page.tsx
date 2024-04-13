import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import NewBookingForm from "./_components/new-booking-form";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { SlotPreset } from "@prisma/client";

export type GetAvailableSlotsType = (date: Date, dogId: string) => SlotPreset[];

export default async function NewBookingsPage() {
  const { userId, orgId } = auth();
  if (!orgId) {
    return;
  }
  console.log(userId);
  console.log(orgId);
  // Get Slot Presets
  const slotPresets = await db.slotPreset.findMany({
    where: {
      orgId,
    },
  });
  console.log(slotPresets);
  const dogs = await db.dog.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      image: true,
      metadata: true,
    },
  });
  console.log(dogs);

  // Get available bookings for a date, on date change
  const getAvailableSlots: GetAvailableSlotsType = async (date, dogId) => {
    "use server";
    console.log(`Received date: ${date}`);
    const slotPresets = await db.slotPreset.findMany({
      where: {
        orgId,
      },
    });
    console.log(slotPresets);

    const bookings = await db.booking.findMany({
      where: {
        date,
      },
    });
    console.log(bookings);

    console.log(slotPresets);

    const availableSlots = slotPresets;
    // TODO: Filter out slots that aren't available on the selected day

    // TODO: Filter out slots that the dog is currently booked in for

    // TODO: Filter out slots that are over capacity

    console.log(availableSlots);
    return availableSlots;
  };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">New Bookings</h1>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="lg:basis-2/3">
            <Card>
              <CardHeader>
                <CardTitle>New Booking</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardContent>
                <NewBookingForm
                  dogs={dogs}
                  getAvailableSlots={getAvailableSlots}
                />
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
          <div className="lg:basis-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Basket</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  Your Basket is empty
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
