'use server'

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { auth, clerkClient } from "@clerk/nextjs";

type Values = {
  country: string,
  email: string
}

export default async function stripeCreateAccount(values: Values) {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const account = await stripe.accounts.create({
    country: values.country,
    email: values.email,
    type: 'standard',
  });

  const stripeCustomner = await db.stripeCustomer.create({
    data: {
      stripeCustomerId: account.id,
      email: account.email || '',
      userId
    }
  })

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://localhost:3000',
    return_url: 'https://localhost:3000/dashboard',
    type: 'account_onboarding',
  });

  return accountLink.url

}