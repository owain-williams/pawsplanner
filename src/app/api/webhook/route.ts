import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);

    } catch (error: any) {
      console.error(`Webhook Signature verification failed: ${error.message}`);
      return NextResponse.json({ message: 'Webhook Error' }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session: Stripe.Checkout.Session = event.data.object;
      console.log(session);

      const userId = session.metadata?.user_id;

      // TODO: Fulfill Order

      if (!userId) {
        console.error(`No user id found in stripe session metadata`);
        return NextResponse.json({ message: `No user id found in stripe session metadata` }, { status: 400 })
      }
      let user = await db.stripeCustomer.upsert({
        create: {
          clerkId: userId,
          stripeCustomerId: session.customer?.toString()!,
          credits: Number(session.metadata?.quantity),
          
        }
      })

      return NextResponse.json({ message: 'Success!' })
    } catch (error: any) {

      return NextResponse.json({ message: error.message }, { status: 500 })
    }
  }