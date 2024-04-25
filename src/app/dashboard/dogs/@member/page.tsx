import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import type { DogWithImageAndMetadata } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

import DogDisplay from "./_components/dogdisplay";

export default async function DogsPage() {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const dogs: DogWithImageAndMetadata[] = await db.dog.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      metadata: true,
      image: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Dogs</h1>
        </div>
        <div className="flex flex-1 justify-center rounded-lg">
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
                <Button asChild className="mt-4">
                  <Link href="/dashboard/dogs/new">Add Dog</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col w-full">
              {dogs.map((dog) => (
                <div key={dog.id} className="py-2">
                  <DogDisplay key={dog.id} dog={dog} />
                </div>
              ))}
              <Button asChild className="mt-4">
                <Link href="/dashboard/dogs/new">Add Dog</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
