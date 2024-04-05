"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CreateStripeAccountButton() {
  const { push } = useRouter();
  const { userId } = useAuth();
  const { user } = useUser();
  const email = user?.emailAddresses[0].toString();
  const handleClick = async () => {
    if (!userId) {
      toast.error("No user logged in");
      return;
    }
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    const stripe = await stripePromise;
    const response = await fetch("/api/stripe-account-setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email,
      }),
    });
    const session = await response.json();
    push(session.url);
  };
  return (
    <>
      <Button onClick={handleClick}>Create Stripe Account</Button>
    </>
  );
}
