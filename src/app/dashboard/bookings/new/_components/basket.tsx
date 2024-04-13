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
import { BasketWithItems } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect, useTransition } from "react";

type BasketItem = {
  date: Date;
  dogId: string;
  slotId: string;
};

type BasketProps = {
  basket: BasketWithItems;
};

export default function Basket({ basket }: BasketProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basket</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {basket.items.map((item) => (
            <div key={item.id}>
              <h4>{item.id}</h4>
              <p>{item.dogId}</p>
              <p>{item.date.toDateString()}</p>
            </div>
          ))}
        </ScrollArea>
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
