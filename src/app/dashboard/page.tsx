import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export default async function TempPage() {
  const { userId, orgRole } = auth();
  if (!userId) {
    return;
  }
  const dbUser = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
  if (!dbUser) {
    const newDbUser = await db.user.create({
      data: {
        clerkId: userId,
      },
    });
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no dogs added
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start making bookings as soon as you add your Dog.
          </p>
          <Button className="mt-4">Add Dog</Button>
        </div>
      </div>
    </main>
  );
}
