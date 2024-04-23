import { db } from "@/lib/db";
import { DogWithImageAndMetadata } from "@/lib/types";
import { Protect, auth, clerkClient } from "@clerk/nextjs";

import { DogTable, columns } from "./columns";
import { DataTable } from "./data-table";

async function getUser(userId: string) {
  "use server";
  return await clerkClient.users.getUser(userId);
}

export default async function DogsAdminPage() {
  const { orgId } = auth();
  if (!orgId) return;
  const dogs = await db.dog.findMany({
    include: {
      metadata: {
        include: {
          vaccinationRecords: true,
        },
      },
      image: true,
      owner: true,
    },
  });
  const data: DogTable[] = dogs
    .filter((dog) => {
      return dog.owner.orgId === orgId;
    })
    .map((dog) => ({
      name: dog.name,
      breed: dog.breed,
      canBook: dog.canBook,
      canBookUntil: dog.canBookUntil?.toLocaleDateString() || "-",
    }));
  console.log(data);
  console.log(orgId);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Dogs</h1>
      <Protect
        permission="org:dogs:read"
        fallback={<p>You don&apos;t have permission to view this page</p>}
      >
        <DataTable columns={columns} data={data} />
      </Protect>
    </main>
  );
}
