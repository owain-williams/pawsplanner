"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { type EmailAddress } from "@clerk/nextjs/server";

export default function CheckoutButton({
  qty,
  email,
}: {
  qty: number;
  email: EmailAddress;
}) {
  const { userId, orgId } = useAuth();
  const priceId = "price_1P1ZeoCrsjSd784TMEnhVmkW";
  const handleCheckout = async () => {
    if (!userId) {
      toast.error("No user logged in");
      return;
    }
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        email,
        userId,
        orgId,
        qty,
      }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <>
      <Button onClick={handleCheckout}>Buy Now</Button>
    </>
  );
}
