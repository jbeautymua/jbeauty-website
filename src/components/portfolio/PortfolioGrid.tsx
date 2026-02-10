"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import type { PortfolioItem } from "@/types";

interface PortfolioGridProps {
  items: PortfolioItem[];
  onItemClick: (item: PortfolioItem) => void;
}

export default function PortfolioGrid({ items, onItemClick }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onItemClick(item)}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group"
            style={{
              background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
            }}
          >
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                <Camera className="w-6 h-6" />
                <span className="text-sm font-medium px-3 text-center">{item.title}</span>
              </div>
            </div>

            {/* Bottom title overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 pt-8">
              <p className="text-white text-xs md:text-sm font-medium truncate">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
