import { DataTable } from "@/components/ui/data-table";
import { Protect, auth, clerkClient } from "@clerk/nextjs";

import InviteForm from "./_components/invite-form";
import { columns } from "./columns";

export default async function InvitePage() {
  const { orgId } = auth();
  if (!orgId) return;

  const allUsers =
    await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });

  console.log(allUsers);
  const data = allUsers.map((user) => ({
    id: user.publicUserData?.userId || "",
    name: `${user.publicUserData?.firstName} ${user.publicUserData?.lastName}`,
    emailAddress: user.publicUserData?.identifier || "",
    role: user.role,
  }));

  return (
    <main className="p-8">
      <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Customers
      </h1>
      <Protect
        permission="org:customers:create"
        fallback={
          <p>You don&apos;t have the permissions to invite customers</p>
        }
      >
        <InviteForm />
      </Protect>
      <Protect permission="org:customers:read">
        <DataTable columns={columns} data={data}></DataTable>
      </Protect>
    </main>
  );
}
