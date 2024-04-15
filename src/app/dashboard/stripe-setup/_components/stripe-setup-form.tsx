"use client";

import stripeCreateAccount from "@/actions/stripe-create-account";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { iso31661 } from "iso-3166";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  country: z
    .string({
      required_error: "Please enter the country you will be operating in",
    })
    .min(2)
    .max(2),
  email: z
    .string({ required_error: "Please enter your email address" })
    .email(),
});

type StripeSetupFormProps = {
  email: string | undefined;
};

export default function StripeSetupForm({ email }: StripeSetupFormProps) {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "GB",
      email: email || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const accountPromise = stripeCreateAccount(values);
    console.log(accountPromise);
    const account = accountPromise.then((accountLink) => {
      push(accountLink || "https://localhost:3000");
    });
  }

  const countries = iso31661
    .map((country) => ({
      label: country.name,
      value: country.alpha2,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[400px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? countries.find(
                            (country) => country.value === field.value,
                          )?.label
                        : "Select country"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] h-[600px] p-0">
                  <ScrollArea className="h-[600px]">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((country) => (
                          <CommandItem
                            value={country.label}
                            key={country.value}
                            defaultValue={"GB"}
                            onSelect={() => {
                              form.setValue("country", country.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {country.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the country that your business operates in.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormDescription>
                This is the email address you will use to log in to Stripe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
