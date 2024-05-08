import AddCustomerDetailsForm from "./_components/customer-details-page";

export default function CustomerDetailsByIdPage({
  params,
}: {
  params: { userId: string };
}) {
  return (
    <>
      <AddCustomerDetailsForm userId={params.userId} />
    </>
  );
}
