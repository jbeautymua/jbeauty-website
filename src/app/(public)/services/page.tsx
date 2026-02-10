"use client";

import { useState } from "react";
import { serviceCategories } from "@/data/mockData";
import CategoryFilter from "@/components/services/CategoryFilter";
import ServiceList from "@/components/services/ServiceList";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categoryNames = serviceCategories.map((cat) => cat.name);

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Page Header */}
      <section className="px-4 pt-24 pb-4 max-w-6xl mx-auto">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-bold text-text-primary">
          Our Services
        </h1>
        <p className="mt-2 text-text-secondary text-base md:text-lg max-w-2xl">
          Browse our full range of beauty and wellness treatments. Select a
          category to find the perfect service for you.
        </p>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        categories={categoryNames}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Service Listings */}
      <section className="pt-6">
        <ServiceList
          categories={serviceCategories}
          activeCategory={activeCategory}
        />
      </section>
    </main>
  );
}
