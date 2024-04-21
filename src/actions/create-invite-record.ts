'use server'

import { db } from "@/lib/db"

export default async function createInviteRecord(email: string, orgId: string) {
  const data = {
    email,
    orgId
  }
  return await db.invitedCustomer.upsert({
    where: {
      email
    },
    create: {
      email: data.email,
      orgId: data.orgId
    },
    update: {
      orgId: data.orgId
    }

  })
}