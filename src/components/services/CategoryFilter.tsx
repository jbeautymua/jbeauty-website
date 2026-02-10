"use client";

import { useRef, useEffect } from "react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      const scrollLeft =
        button.offsetLeft -
        container.offsetLeft -
        containerRect.width / 2 +
        buttonRect.width / 2;

      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory]);

  const allCategories = ["All", ...categories];

  return (
    <div className="sticky top-20 z-30 bg-background border-b border-border backdrop-blur-md">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3 pb-2 max-w-6xl mx-auto"
      >
        {allCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              ref={isActive ? activeRef : null}
              onClick={() => onSelect(category)}
              className={`rounded-full px-4 py-2 min-h-[44px] text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-text-secondary hover:border-border hover:text-text-primary"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
