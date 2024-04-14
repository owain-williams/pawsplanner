'use server'

import { stripe } from "@/lib/stripe";

export default async function listStripeAccounts() {
  return await stripe.accounts.list()
}