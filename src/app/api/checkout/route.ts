import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { priceId, email, userId, orgId, qty } = await req.json();
    const session = await stripe.checkout.sessions.create({
      metadata: {
        user_id: userId,
        org_id: orgId
      },
      customer_email: email,
      payment_method_types: ['card'],
      line_items: [
        { price: priceId, quantity: qty }
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    })
    console.log(session)
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
