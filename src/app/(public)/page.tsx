import Hero from "@/components/home/Hero";
import FeaturedServices from "@/components/home/FeaturedServices";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import { getPortfolioItems } from "@/lib/data";

export default async function HomePage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <>
      <Hero />
      <FeaturedServices />
      <PortfolioPreview items={portfolioItems.slice(0, 6)} />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
