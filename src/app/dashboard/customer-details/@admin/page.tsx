import getCustomerList from "@/actions/get-customer-list";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import CustomerDetailsForm from "./_components/customer-details-form";
import SelectCustomerForm from "./_components/select-customer-form";

export default async function AddCustomerDetailsPage() {
  const { orgId } = auth();
  if (!orgId) return;
  const customerList = await getCustomerList(orgId);

  // const customerDetails = await db.customerDetails.findUnique({
  //   where: { userId },
  // });
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Contact Details</h1>
      {/* <SelectCustomerForm users={customerList} /> */}
      <CustomerDetailsForm users={customerList} />
    </main>
  );
}
