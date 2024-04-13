"use client";

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
import { useState, useEffect, useTransition } from "react";

type BasketItem = {
  date: Date;
  dogId: string;
  slotId: string;
};

export default function Basket() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basket</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">Your Basket is empty</ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
