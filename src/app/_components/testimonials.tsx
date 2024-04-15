import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">
          What Our Customers Say
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Image
              alt="Testimonial"
              className="mb-4 rounded-full"
              height="100"
              src="/img/jane-doe.jpeg"
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
            <blockquote className="text-gray-500 dark:text-gray-400">
              &quot;This booking system has made managing my dog walking
              business so much easier. I can&apos;t imagine going back to the
              old way of doing things.&quot;
            </blockquote>
            <p className="mt-4 font-bold">
              - Jane Doe, Happy Tails Dog Walking
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              alt="Testimonial"
              className="mb-4 rounded-full"
              height="100"
              src="/img/john-smith.jpeg"
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
            <blockquote className="text-gray-500 dark:text-gray-400">
              &quot;The client management feature is a game changer. It&apos;s
              so easy to keep track of my clients and their pets.&quot;
            </blockquote>
            <p className="mt-4 font-bold">
              - John Smith, Paws & Claws Doggie Day Care
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              alt="Testimonial"
              className="mb-4 rounded-full"
              height="100"
              src="/img/sarah-johnson.jpeg"
              style={{
                aspectRatio: "100/100",
                objectFit: "cover",
              }}
              width="100"
            />
            <blockquote className="text-gray-500 dark:text-gray-400">
              &quot;I love that I can accept payments directly through the
              booking system. It&apos;s made my life so much easier.&quot;
            </blockquote>
            <p className="mt-4 font-bold">
              - Sarah Johnson, Walkies Dog Walking
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
