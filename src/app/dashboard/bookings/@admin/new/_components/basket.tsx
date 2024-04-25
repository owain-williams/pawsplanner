"use client";

import deleteFromBasket from "@/actions/delete-from-basket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { format } from "date-fns";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

type BasketProps = {
  basket: BasketWithItems;
};

export default function Basket({ basket }: BasketProps) {
  const { refresh } = useRouter();

  const basketTotal = basket.items
    .map((item) => item.slot.price)
    .reduce((acc, curr) => acc + curr, 0);

  function deleteButtonClickHandler(itemId: string) {
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
        <ScrollArea className="h-[586px] border border-dashed rounded-md px-2 py-1">
          {basket.items.map((item) => (
            <div key={item.id} className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-row gap-4 items-center justify-normal">
                  <Avatar>
                    <AvatarImage src={item.dog.image[0].url!} />
                    <AvatarFallback>DOG</AvatarFallback>
                  </Avatar>

                  <p>
                    <strong>{item.dog.name}</strong>
                  </p>
                  <div className="flex flex-col">
                    <p>{format(item.date, "EEE do LLL")}</p>
                    <p>{`${item.slot.startTime} - ${item.slot.endTime}`}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p>{`£${(Math.round(item.slot.price) / 100).toFixed(
                      2,
                    )}`}</p>
                  </div>
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    onClick={() => deleteButtonClickHandler(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Separator className="mt-2" />
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Checkout
        </Button>
        <p>Price: {`£${(Math.round(basketTotal) / 100).toFixed(2)}`}</p>
      </CardFooter>
    </Card>
  );
}
