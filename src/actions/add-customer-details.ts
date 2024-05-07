'use server'

import { db } from "@/lib/db";

import { CustomerDetails } from "@prisma/client";

type AddCustomerDetailsProps = {
  firstName: string,
  lastName: string,
  phone: string,
  address: string,
  city: string,
  postcode: string,
  country: string,
  userId: string,
}

export default async function addCustomerDetails(customerDetails: Omit<CustomerDetails, "id" | "createdAt" | "updatedAt">) {
  return db.customerDetails.create({
    data: customerDetails,
  });
}