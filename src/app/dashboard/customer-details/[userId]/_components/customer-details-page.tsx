"use client";

import { addCustomerDetails } from "@/actions/add-customer-details";
import { getCustomerDetails } from "@/actions/get-customer-details";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { CustomerDetails } from "@prisma/client";
import { iso31661 } from "iso-3166";
import { Check, ChevronsUpDown } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(2).max(191),
  lastName: z.string().min(2).max(191),
  phone: z.string().min(2).max(18),
  address: z.string().min(2).max(191),
  city: z.string().min(2).max(191),
  postcode: z.string().min(6).max(9),
  country: z.string().min(2).max(191),
});

type AddCustomerDetailsFormProps = {
  userId: string;
};

export default function AddCustomerDetailsForm({
  userId,
}: AddCustomerDetailsFormProps) {
  const {
    execute: executeAddCustomerDetails,
    status: statusAddCustomerDetails,
    result: resultAddCustomerDetails,
    reset: resetAddCustomerDetails,
  } = useAction(addCustomerDetails);
  const {
    execute: executeGetCustomerDetails,
    status: statusGetCustomerDetails,
    result: resultGetCustomerDetails,
    reset: resetGetCustomerDetails,
  } = useAction(getCustomerDetails);
  executeGetCustomerDetails({ userId });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: resultGetCustomerDetails.data?.firstName || "",
      lastName: resultGetCustomerDetails.data?.lastName || "",
      phone: resultGetCustomerDetails.data?.phone || "",
      address: resultGetCustomerDetails.data?.address || "",
      city: resultGetCustomerDetails.data?.city || "",
      postcode: resultGetCustomerDetails.data?.postcode || "",
      country: resultGetCustomerDetails.data?.country || "GB",
    },
  });

  const [disableFormFields, setDisableFormFields] = useState<boolean>(false);
  useEffect(() => {
    if (
      statusAddCustomerDetails === "executing" ||
      statusGetCustomerDetails === "executing"
    ) {
      setDisableFormFields(true);
    } else {
      setDisableFormFields(false);
    }
  }, [statusAddCustomerDetails, statusGetCustomerDetails]);

  const { push } = useRouter();

  const countries = iso31661
    .map((country) => ({
      label: country.name,
      value: country.alpha2,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const data: Omit<CustomerDetails, "id" | "createdAt" | "updatedAt"> = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
      city: values.city,
      postcode: values.postcode,
      country: values.country,
      userId: userId || "",
    };
    executeAddCustomerDetails(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postcode</FormLabel>
              <FormControl>
                <Input placeholder="Postcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                        <CommandList>
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
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </ScrollArea>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <p className="text-destructive">
          {resultAddCustomerDetails.fetchError}
        </p>
        <p className="text-destructive">
          {resultAddCustomerDetails.serverError}
        </p>
        <p className="text-destructive">
          {resultAddCustomerDetails.validationErrors?._root}
        </p>
      </form>
    </Form>
  );
}
