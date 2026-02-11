"use client";

import { useState } from "react";
import { Clock, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  icon?: LucideIcon;
}

export default function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedPrice = `\u00A3${service.price.toFixed(2)}`;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-border/50">
      {Icon && (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-text-primary" />
        </div>
      )}
      <h3 className="font-semibold text-lg text-text-primary">
        {service.name}
      </h3>

      <div className="flex items-center justify-between mt-2 text-text-secondary text-sm">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{service.duration} mins</span>
        </div>
        <span className="font-medium">{formattedPrice}</span>
      </div>

      {service.description && (
        <div className="mt-3">
          <AnimatePresence initial={false}>
            <motion.div
              key={isExpanded ? "expanded" : "collapsed"}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p
                className={`text-sm text-text-secondary leading-relaxed ${
                  !isExpanded ? "line-clamp-2" : ""
                }`}
              >
                {service.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {service.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-primary font-medium mt-1 hover:underline"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}

      <div className="mt-4">
        <a
          href="https://widget.treatwell.co.uk/place/jss-beauty/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white border-2 border-primary text-primary rounded-full px-6 py-2.5 min-h-[44px] text-sm font-medium transition-colors hover:bg-primary hover:text-white text-center"
        >
          Select
        </a>
      </div>
    </div>
  );
}
