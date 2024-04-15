import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col md:pt-24 items-center justify-center">
      <SignIn />
    </div>
  );
}
