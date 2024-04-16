import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";

import CallToAction from "./_components/call-to-action";
import Features from "./_components/features";
import Footer from "./_components/footer";
import Hero from "./_components/hero";
import Testimonials from "./_components/testimonials";

export default function MarketingPage() {
  const { userId, orgId } = auth();
  console.log(userId);
  console.log(orgId);
  if (userId && !orgId) redirect("/no-org");
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
