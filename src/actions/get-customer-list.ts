'use server'

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";

export default async function getCustomerList(orgId: string) {
  async function getNameFromClerk(userId: string) {
    const user = await clerkClient.users.getUser(userId)
    return `${user.firstName} ${user.lastName}`
  }

  const users = await db.user.findMany({
    where: { orgId },
    include: {
      CustomerDetails: true
    }
  })
  const clerkUsers = await clerkClient.users.getUserList({ query: orgId })
  return users.map((user) => ({
    label: user.CustomerDetails ? `${user.CustomerDetails.firstName} ${user.CustomerDetails.lastName}` : `${clerkUsers.find((clerkUser) => clerkUser.id === user.clerkId)?.firstName} ${clerkUsers.find((clerkUser) => clerkUser.id === user.clerkId)?.lastName}` || 'Unknown',
    value: user.clerkId
  }))
} 