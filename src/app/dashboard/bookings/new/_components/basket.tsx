"use client";

import deleteFromBasket from "@/actions/delete-from-basket";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { BasketWithItems } from "@/lib/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import getDogNameFromId from "@/actions/get-dog-name-from-id";

type BasketProps = {
  basket: BasketWithItems;
};

export default function Basket({ basket }: BasketProps) {
  const { refresh } = useRouter();

  function clickHandler(itemId: string) {
    deleteFromBasket(itemId);
    refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basket</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[258px] border border-dashed rounded-md px-2 py-1">
          {basket.items.map((item) => (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-normal">
                  <p>{item.date.toLocaleDateString()}</p>
                  <p>{item.dog.name}</p>
                  <p>{`${item.slot.startTime} - ${item.slot.endTime}`}</p>
                </div>
                <div>
                  <p>{`£${item.slot.price}`}</p>
                </div>
                <Button size={"icon"} onClick={() => clickHandler(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
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
