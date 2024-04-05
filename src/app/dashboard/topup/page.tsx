import CheckoutButton from "./_components/checkout-button";
import { auth } from "@clerk/nextjs";

export default async function TopupPage() {
  const { user } = auth();
  const email = user?.emailAddresses[0]!;
  return (
    <>
      <CheckoutButton qty={10} email={email} />
    </>
  );
}
