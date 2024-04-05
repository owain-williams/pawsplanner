import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export default async function DogsPage() {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const dogs = await db.dog.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      metadata: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // console.log(dogs.length);

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          {/* IF NO DOGS HAVE BEEN ADDED */}
          {dogs.length <= 0 ? (
            <>
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no dogs added
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start making bookings as soon as you add your furry
                  friends.
                </p>
                <Button className="mt-4">Add Dog</Button>
              </div>
            </>
          ) : (
            <>
              <ul>
                {dogs.map((dog) => (
                  <li key={dog.id}>{dog.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}
