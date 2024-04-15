import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Simplify Your Dog Walking Business
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our booking system is designed to make managing your dog walking
                or doggie day care business a breeze.
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
          {/* TODO: Add screenshot of the main app */}
          <Image
            alt="Dog Walking"
            className="mx-auto overflow-hidden rounded-xl object-bottom px-24 sm:w-full lg:order-last lg:aspect-square lg:px-0"
            height="550"
            src="/img/dog-drawing.webp"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
