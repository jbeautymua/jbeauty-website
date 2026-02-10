import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <PortfolioPreview />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
