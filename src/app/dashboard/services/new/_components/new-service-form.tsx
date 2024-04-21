"use client";

import createService from "@/actions/createService";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { data } from "currency-codes";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  startTime: z.string().min(3).max(8),
  endTime: z.string().min(3).max(8),
  maxDogs: z.string().min(1),
  price: z.string().min(0),
  currency: z.string().length(3),
  days: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
export type NewServiceFormSchema = z.infer<typeof formSchema>;

const days = [
  {
    id: 0,
    label: "Sunday",
  },
  {
    id: 1,
    label: "Monday",
  },
  {
    id: 2,
    label: "Tuesday",
  },
  {
    id: 3,
    label: "Wednesday",
  },
  {
    id: 4,
    label: "Thursday",
  },
  {
    id: 5,
    label: "Friday",
  },
  {
    id: 6,
    label: "Saturday",
  },
] as const;

const cc = data.map((cc) => ({
  value: cc.code,
  label: cc.code,
}));

export default function NewServiceForm() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      days: [],
    },
  });

  const { orgId } = useAuth();
  if (!orgId) {
    return;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setSubmitting(true);
    toast.info("Creating Service");
    console.log(values);

    createService(orgId!, values);
    setSubmitting(false);
    toast.success("Service Created!");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input disabled={submitting} {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input disabled={submitting} {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxDogs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input disabled={submitting} type="number" {...field} />
              </FormControl>
              <FormDescription>
                This is maximum amount of dogs in this session.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  disabled={submitting}
                  type="number"
                  step="any"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is cost for one dog to occupy a space in this session.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Currency</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={submitting}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? cc.find((currency) => currency.value === field.value)
                            ?.label
                        : "Select currency"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-[600px] p-0">
                  <ScrollArea className="h-[600px]">
                    <Command>
                      <CommandInput placeholder="Search currency..." />
                      <CommandEmpty>No currency found.</CommandEmpty>
                      <CommandGroup>
                        {cc.map((currency) => (
                          <CommandItem
                            value={currency.label}
                            key={currency.value}
                            defaultValue={"GBP"}
                            onSelect={() => {
                              form.setValue("currency", currency.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                currency.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {currency.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the days you want this service to be available on.
                </FormDescription>
              </div>
              {days.map((day) => (
                <FormField
                  key={day.id}
                  control={form.control}
                  name="days"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={day.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            disabled={submitting}
                            checked={field.value?.includes(day.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, day.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {day.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={submitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
