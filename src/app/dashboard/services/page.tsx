import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function ServicesPage() {
  const { orgId } = auth();
  if (!orgId) return;
  const services = await db.service.findMany({
    where: {
      orgId,
    },
  });
  return (
    <main className="p-4">
      <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Services
      </h1>
      <Button asChild>
        <Link href={"/dashboard/services/new"}>+ Add New Service</Link>
      </Button>
      {services.map((service) => (
        <div key={service.id}>
          <p>{`${service.id}`}</p>
          <p>{`${service.startTime} to ${service.endTime}`}</p>
          <p>{`${service.price} ${service.currency}`}</p>
          <p>{`${service.stripeProductId}`}</p>
          <p>{`${service.stripePriceId}`}</p>
          <Separator />
        </div>
      ))}
    </main>
  );
}
