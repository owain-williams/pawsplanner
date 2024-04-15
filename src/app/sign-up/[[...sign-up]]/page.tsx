import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex md:pt-24 items-center justify-center">
      <SignUp />
    </div>
  );
}
