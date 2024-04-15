import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Ready to simplify your dog walking business?
          </h2>
          <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Sign up for our booking system today and take the first step towards
            a more efficient business.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild>
            <Link href="#">Sign Up</Link>
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href="/contact">Request a Demo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
