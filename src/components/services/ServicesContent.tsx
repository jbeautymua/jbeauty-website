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

        {/* Services Footer Info */}
        <div className="mt-16 text-center space-y-4 max-w-2xl mx-auto px-4">
          <p className="text-text-secondary">
            All services include a consultation to understand your needs and preferences
          </p>
          <a 
            href="/contact"
            className="inline-block font-semibold text-primary hover:underline"
          >
            Contact me for custom packages and group bookings &rarr;
          </a>
        </div>
      </section>
    </>
  );
}
