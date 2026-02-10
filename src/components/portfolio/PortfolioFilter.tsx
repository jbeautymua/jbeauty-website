"use client";

import { useRef } from "react";

interface PortfolioFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function PortfolioFilter({
  categories,
  activeCategory,
  onSelect,
}: PortfolioFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`min-h-[44px] px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
