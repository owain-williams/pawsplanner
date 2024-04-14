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
import Basket from "./_components/basket";
import { BasketWithItems } from "@/lib/types";

export type GetAvailableSlotsType = (date: Date, dogId: string) => SlotPreset[];

export default async function NewBookingsPage() {
  const { userId, orgId } = auth();
  if (!orgId || !userId) {
    return;
  }
  console.log(userId);
  console.log(orgId);

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

  let basket = await db.basket.findFirst({
    where: {
      userId,
      finished: false,
    },
    include: {
      items: {
        include: {
          dog: true,
          slot: true,
        },
      },
    },
  });
  let newBasket;
  if (!basket) {
    newBasket = await db.basket.create({
      data: {
        userId,
        orgId,
      },
      include: {
        items: {
          include: {
            dog: true,
            slot: true,
          },
        },
      },
    });
    basket = newBasket;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">New Bookings</h1>
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
        <div className="lg:basis-1/3">
          <Basket basket={basket} />
        </div>
      </div>
    </main>
  );
}
