import { auth } from "@clerk/nextjs";

import StripeSetupForm from "./_components/stripe-setup-form";

export default function StripeSetupPage() {
  const { user } = auth();
  const email = user?.emailAddresses[0].emailAddress;
  return (
    <>
      <StripeSetupForm email={email} />
    </>
  );
}
