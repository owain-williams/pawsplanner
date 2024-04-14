import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const { userId, email } = await req.json();
  try {
    const account: Stripe.Account = await stripe.accounts.create({
      type: "standard",
      country: "GB",
      email,
      business_type: "individual",
      individual: {
        email,
      },
      metadata: {
        clerkId: userId,
      },
    });
    const accountLink: Stripe.AccountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `https://localhost:3000/reauth`,
      return_url: `https://localhost:3000/return`,
      type: "account_onboarding",
    });
    return NextResponse.json({ message: "Success!" }, { url: accountLink.url });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: `Error creating stripe account: ${error}` },
      { status: 400 }
    );
  }
}
