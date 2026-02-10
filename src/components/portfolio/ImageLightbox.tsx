"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import type { PortfolioItem } from "@/types";

interface ImageLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function ImageLightbox({ item, onClose }: ImageLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [item, handleKeyDown]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.4}
            onDragEnd={(_e, info) => {
              if (Math.abs(info.offset.y) > 100) {
                onClose();
              }
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="w-full max-w-2xl flex flex-col items-center"
          >
            {/* Image / gradient fallback */}
            <div
              className="relative w-full aspect-[3/4] md:aspect-square rounded-xl overflow-hidden shadow-2xl"
              style={
                item.imageUrl
                  ? undefined
                  : { background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})` }
              }
            >
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              )}
            </div>

            {/* Title */}
            <div className="mt-4 text-center">
              <h3 className="text-white text-lg md:text-xl font-semibold">
                {item.title}
              </h3>
              <p className="text-white/60 text-sm mt-1">{item.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
