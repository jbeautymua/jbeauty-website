import { getPortfolioItems, getPortfolioCategories } from "@/lib/data";
import PortfolioContent from "@/components/portfolio/PortfolioContent";

export default async function PortfolioPage() {
  const [items, categories] = await Promise.all([
    getPortfolioItems(),
    getPortfolioCategories(),
  ]);

  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-cormorant)] text-foreground">
            Our Portfolio
          </h1>
          <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Browse our collection of beauty transformations and find inspiration
            for your next look.
          </p>
        </div>
      </section>

      <PortfolioContent items={items} categories={categories} />
    </>
  );
}
