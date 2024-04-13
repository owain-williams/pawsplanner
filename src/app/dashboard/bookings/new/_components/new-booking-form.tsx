"use client";

import { DogWithImageAndMetadata } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { GetAvailableSlotsType } from "../page";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useState, useTransition } from "react";
import { SlotPreset } from "@prisma/client";
import getAvailableSlots from "@/actions/get-available-slots";

const formSchema = z.object({
  dogId: z.string({ required_error: "Please select a dog" }),
  date: z.date({ required_error: "A date is required" }),
  slot: z.string(),
});

type NewBookingFormProps = {
  dogs: DogWithImageAndMetadata[];
  orgId: string;
};

export default function NewBookingForm({ dogs, orgId }: NewBookingFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const [isPending, startTransition] = useTransition();
  const [availableSlots, setAvailableSlots] = useState<SlotPreset[]>([]);

  const selectedDate = form.watch("date");
  const selectedDogId = form.watch("dogId");

  useEffect(() => {
    startTransition(async () => {
      const slots = await getAvailableSlots(selectedDate, selectedDogId, orgId);
      setAvailableSlots(slots);
    });
  }, [selectedDate, selectedDogId, orgId]);

  const dogsCombo = dogs.map((dog) => ({
    label: dog.name,
    value: dog.id,
  }));

  const slotsCombo = availableSlots.map((slot) => ({
    label: `£${slot.price} - ${slot.startTime} to ${slot.endTime}`,
    value: slot.id,
  }));

  console.log(dogs);
  console.log(dogsCombo);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dogId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dog</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? dogsCombo.find((dog) => dog.value === field.value)
                            ?.label
                        : "Select dog"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search dog..." />
                    <CommandEmpty>No dog found.</CommandEmpty>
                    <CommandGroup>
                      {dogsCombo.map((dog) => (
                        <CommandItem
                          value={dog.label}
                          key={dog.value}
                          onSelect={() => {
                            form.setValue("dogId", dog.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              dog.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {dog.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slot"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Slot</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isPending}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? slotsCombo.find((slot) => slot.value === field.value)
                            ?.label
                        : "Select slot"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search slot..." />
                    <CommandEmpty>No slot found.</CommandEmpty>
                    <CommandGroup>
                      {slotsCombo.map((slot) => (
                        <CommandItem
                          value={slot.label}
                          key={slot.value}
                          onSelect={() => {
                            form.setValue("slot", slot.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              slot.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {slot.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
