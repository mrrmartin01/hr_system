import { FeaturesSection } from "@/components/featureSection/feature.section";
import Hero from "@/components/hero/hero";
import Interact from "@/components/interact/interact";
import { Testimonials } from "@/components/testimonials/testimonials";
export default function Home() {
  return (
    <>
      <Hero />
      <Interact />
      <div className="mt-[10%]" />
      <FeaturesSection />
      <div className="mt-[%]" />
      <Testimonials />
    </>
  );
}
