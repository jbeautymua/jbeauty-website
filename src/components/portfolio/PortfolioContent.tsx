"use client";

import { useState, useMemo } from "react";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import type { PortfolioItem } from "@/types";

interface PortfolioContentProps {
  items: PortfolioItem[];
  categories: string[];
}

export default function PortfolioContent({ items, categories }: PortfolioContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return items;
    }
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <>
      {/* Filter */}
      <PortfolioFilter
        categories={categories}
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
