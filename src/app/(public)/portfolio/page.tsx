"use client";

import { useState, useMemo } from "react";
import { portfolioItems, portfolioCategories } from "@/data/mockData";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import type { PortfolioItem } from "@/types";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return portfolioItems;
    }
    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

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

      {/* Filter */}
      <PortfolioFilter
        categories={portfolioCategories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Grid */}
      <section className="px-4 pt-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <PortfolioGrid
            items={filteredItems}
            onItemClick={setSelectedItem}
          />

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
