import { db } from "@/lib/db";
import { DogWithImageAndMetadata } from "@/lib/types";
import { auth } from "@clerk/nextjs";

export default async function DogsAdminPage() {
  const { orgId } = auth();
  if (!orgId) return;
  const customers = await db.user.findMany({
    where: {
      orgId,
    },
    include: {
      dogs: {
        include: {
          metadata: true,
          image: true,
        },
      },
    },
  });

  const allDogs = customers.flatMap((customer) => customer.dogs);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Dogs</h1>
    </main>
  );
}
