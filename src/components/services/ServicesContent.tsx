"use client";

import { useState } from "react";
import CategoryFilter from "@/components/services/CategoryFilter";
import ServiceList from "@/components/services/ServiceList";
import type { ServiceCategory } from "@/types";

interface ServicesContentProps {
  categories: ServiceCategory[];
}

export default function ServicesContent({ categories }: ServicesContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryNames = categories.map((cat) => cat.name);

  return (
    <>
      {/* Category Filter */}
      <CategoryFilter
        categories={categoryNames}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Service Listings */}
      <section className="pt-6">
        <ServiceList
          categories={categories}
          activeCategory={activeCategory}
        />
      </section>
    </>
  );
}
