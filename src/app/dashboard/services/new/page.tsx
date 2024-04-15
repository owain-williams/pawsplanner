import NewServiceForm from "./_components/new-service-form";

export default async function NewServicePage() {
  return (
    <main className="p-4">
      <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        New Service
      </h1>
      <NewServiceForm />
    </main>
  );
}
