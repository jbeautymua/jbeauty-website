"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  Sparkles, 
  Eye, 
  Flower2, 
  Scissors, 
  Heart, 
  MessageSquare,
  Zap,
  Ear
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ServiceCategory } from "@/types";
import ServiceCard from "./ServiceCard";

interface ServiceListProps {
  categories: ServiceCategory[];
  activeCategory: string;
}

// Map category names to icons
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes("brow")) return Sparkles;
  if (name.includes("lash") || name.includes("eye")) return Eye;
  if (name.includes("face") || name.includes("skin")) return Flower2;
  if (name.includes("hair")) return Scissors;
  if (name.includes("wax")) return Zap;
  if (name.includes("massage")) return Heart;
  if (name.includes("pierc")) return Ear;
  return Sparkles; // Default
};

function CategoryAccordion({ category }: { category: ServiceCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const CategoryIcon = getCategoryIcon(category.name);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 px-1 min-h-[44px] md:hidden"
      >
        <h2 className="text-lg font-semibold text-text-primary font-[family-name:var(--font-cormorant)]">
          {category.name}
        </h2>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-text-secondary" />
        </motion.div>
      </button>

      {/* Desktop: always visible heading */}
      <h2 className="hidden md:block text-xl font-semibold text-text-primary font-[family-name:var(--font-cormorant)] pt-2 pb-4">
        {category.name}
      </h2>

      {/* Mobile: accordion content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="grid grid-cols-1 gap-4 pb-4">
              {category.services.map((service) => (
                <ServiceCard key={service.id} service={service} icon={CategoryIcon} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: always visible grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        {category.services.map((service) => (
          <ServiceCard key={service.id} service={service} icon={CategoryIcon} />
        ))}
      </div>
    </div>
  );
}

export default function ServiceList({
  categories,
  activeCategory,
}: ServiceListProps) {
  const filteredCategories =
    activeCategory === "All"
      ? categories
      : categories.filter((cat) => cat.name === activeCategory);

  return (
    <div className="px-4 max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategoryAccordion key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-12 text-text-secondary">
              <p className="text-lg">No services found in this category.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
