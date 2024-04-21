import InviteForm from "./_components/invite-form";

export default function InvitePage() {
  return (
    <main className="p-8">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Customers
      </h1>
      <InviteForm />
    </main>
  );
}
