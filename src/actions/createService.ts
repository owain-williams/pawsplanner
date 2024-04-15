'use server'

import { NewServiceFormSchema } from "@/app/dashboard/services/new/_components/new-service-form"
import { db } from "@/lib/db"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"

export default async function createService(orgId: string, values: NewServiceFormSchema) {

  const newService = await db.service.create({
    data: {
      orgId,
      startTime: values.startTime,
      endTime: values.endTime,
      price: Number(values.price) * 100,
      currency: values.currency,
      maxDogs: Number(values.maxDogs),
      days: values.days,
    }
  })

  const name = `${values.startTime} to ${values.endTime} - ${newService.id}`

  // Create product in stripe
  const product: Stripe.Product = await stripe.products.create({
    name,
  });

  await db.service.update({
    where: {
      id: newService.id
    },
    data: {
      stripeProductId: product.id
    }
  })

  // Create price in stripe
  const price = await stripe.prices.create({
    currency: newService.currency.toLowerCase(),
    unit_amount: newService.price,
    product: product.id,
  });

  await db.service.update({
    where: {
      id: newService.id
    },
    data: {
      stripePriceId: price.id
    }
  })
}