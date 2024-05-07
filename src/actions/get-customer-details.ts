'use server'

import { db } from "@/lib/db"
import { action } from "@/lib/safe-action"
import { z } from "zod"

const schema = z.object({
  userId: z.string().min(2).max(50)
})

export const getCustomerDetails = action(schema, async ({ userId }) => {
  return await db.customerDetails.findUnique({
    where: { userId }
  })
})