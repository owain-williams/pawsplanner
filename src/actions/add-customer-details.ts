'use server'

import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";

import { CustomerDetails } from "@prisma/client";
import { z } from "zod";

const schema = z.object({
  userId: z.string().min(2).max(50),
  firstName: z.string().min(2).max(191),
  lastName: z.string().min(2).max(191),
  phone: z.string().min(2).max(18),
  address: z.string().min(2).max(191),
  city: z.string().min(2).max(191),
  postcode: z.string().min(6).max(9),
  country: z.string().min(2).max(191),
})

export const addCustomerDetails = action(schema, async ({ userId, firstName, lastName, phone, address, city, postcode, country }) => {
  return db.customerDetails.upsert({
    where: { userId },
    update: {
      firstName,
      lastName,
      phone,
      address,
      city,
      postcode,
      country
    },
    create: {
      userId,
      firstName,
      lastName,
      phone,
      address,
      city,
      postcode,
      country
    },
  });
})

