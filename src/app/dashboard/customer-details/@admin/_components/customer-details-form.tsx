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
  userId: z.string().min(2).max(50),
  firstName: z.string().min(2).max(191),
  lastName: z.string().min(2).max(191),
  phone: z.string().min(2).max(18),
  address: z.string().min(2).max(191),
  city: z.string().min(2).max(191),
  postcode: z.string().min(6).max(9),
  country: z.string().min(2).max(191),
});

type CustomerDetailsFormProps = {
  users: {
    value: string;
    label: string;
  }[];
};

export default function CustomerDetailsForm({
  users,
}: CustomerDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      country: "",
    },
  });

  const { refresh } = useRouter();

  const {
    execute: executeAddCustomerDetails,
    reset: resetAddCustomerDetails,
    result: resultAddCustomerDetails,
    status: statusAddCustomerDetails,
  } = useAction(addCustomerDetails);

  const {
    execute: executeGetCustomerDetails,
    reset: resetGetCustomerDetails,
    result: resultGetCustomerDetails,
    status: statusGetCustomerDetails,
  } = useAction(getCustomerDetails);

  const selectedUserId = form.watch("userId");
  const [selectedUser, setSelectedUser] =
    useState<Omit<CustomerDetails, "id" | "createdAt" | "updatedAt">>();

  const [disableFormFields, setDisableFormFields] = useState<boolean>(false);
  useEffect(() => {
    if (
      statusGetCustomerDetails === "executing" ||
      statusAddCustomerDetails === "executing"
    ) {
      setDisableFormFields(true);
    } else {
      setDisableFormFields(false);
    }
  }, [statusGetCustomerDetails, statusAddCustomerDetails]);

  useEffect(() => {
    executeGetCustomerDetails({ userId: selectedUserId });
    form.setValue("firstName", resultGetCustomerDetails.data?.firstName || "");
    form.setValue("lastName", resultGetCustomerDetails.data?.lastName || "");
    form.setValue("phone", resultGetCustomerDetails.data?.phone || "");
    form.setValue("address", resultGetCustomerDetails.data?.address || "");
    form.setValue("city", resultGetCustomerDetails.data?.city || "");
    form.setValue("postcode", resultGetCustomerDetails.data?.postcode || "");
    form.setValue("country", resultGetCustomerDetails.data?.country || "");
    console.log(resultGetCustomerDetails.data);
  }, [selectedUserId]);

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
      userId: values.userId,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      address: values.address,
      city: values.city,
      postcode: values.postcode,
      country: values.country,
    };
    executeAddCustomerDetails({ ...data });
    if (statusAddCustomerDetails === "hasErrored") {
      toast.error("There was an error saving the customer's contact details");
    }
    if (statusAddCustomerDetails === "hasSucceeded") {
      toast.success("Contact details saved successfully!");
    }
    // push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={disableFormFields}
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? users.find((user) => user.value === field.value)
                            ?.label
                        : "Select user"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search user..." />
                    <CommandEmpty>No user found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          value={user.label}
                          key={user.value}
                          disabled={disableFormFields}
                          onSelect={() => {
                            form.setValue("userId", user.value);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              user.value === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {user.label}
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disableFormFields}
                  placeholder="First Name"
                  {...field}
                />
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
                <Input
                  disabled={disableFormFields}
                  placeholder="Last Name"
                  {...field}
                />
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
                <Input
                  disabled={disableFormFields}
                  placeholder="Phone Number"
                  {...field}
                />
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
                <Input
                  disabled={disableFormFields}
                  placeholder="Address"
                  {...field}
                />
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
                <Input
                  disabled={disableFormFields}
                  placeholder="City"
                  {...field}
                />
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
                <Input
                  disabled={disableFormFields}
                  placeholder="Postcode"
                  {...field}
                />
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
                      disabled={disableFormFields}
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
