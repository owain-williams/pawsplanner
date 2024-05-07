import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import AddCustomerDetailsForm from "./_components/customer-details-form";

export default async function AddCustomerDetailsPage() {
  const { userId } = auth();
  if (!userId) return;
  const customerDetails = await db.customerDetails.findUnique({
    where: { userId },
  });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Contact Details</h1>
      <AddCustomerDetailsForm customerDetails={customerDetails || undefined} />
    </main>
  );
}
