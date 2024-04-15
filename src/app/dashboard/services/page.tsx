import { db } from "@/lib/db";

export default async function ServicesPage() {
  const services = await db.service.findMany({});
  return (
    <main className="p-4">
      <h1>Services</h1>
    </main>
  );
}
