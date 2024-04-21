import NewDogForm from "./_components/new-dog-form";

export default function NewDogPage() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <NewDogForm />
      </main>
    </>
  );
}
