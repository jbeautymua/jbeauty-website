"use client";

import { useState, useMemo } from "react";
import PortfolioFilter from "@/components/portfolio/PortfolioFilter";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import ImageLightbox from "@/components/portfolio/ImageLightbox";
import { Instagram } from "lucide-react";
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

          {/* Instagram CTA */}
          <div className="mt-20 flex flex-col items-center gap-6 text-center">
            <p className="text-muted-foreground">
              Follow me on Instagram for more updates and behind-the-scenes
            </p>
            <a
              href="https://www.instagram.com/jbeauty_j"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-white transition-opacity hover:opacity-90"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">@jbeauty_j</span>
            </a>
          </div>
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
