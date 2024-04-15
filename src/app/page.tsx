import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Hero from "./_components/hero";
import Features from "./_components/features";
import Testimonials from "./_components/testimonials";
import CallToAction from "./_components/call-to-action";
import Footer from "./_components/footer";

export default function MarketingPage() {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
}
