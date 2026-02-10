"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Eye, Flower2, Scissors } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Eyebrow Threading",
    description: "Precision threading for perfectly shaped brows",
  },
  {
    icon: Eye,
    title: "Lash Treatments",
    description: "Lash lifts and tints for stunning eyes",
  },
  {
    icon: Flower2,
    title: "Facials",
    description: "Rejuvenating treatments for glowing skin",
  },
  {
    icon: Scissors,
    title: "Hair Styling",
    description: "Beautiful styles for every occasion",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function FeaturedServices() {
  return (
    <section className="bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Discover our range of professional beauty treatments designed to
            make you look and feel your best.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition border border-border/50"
                variants={cardVariants}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm mb-4">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Learn More &rarr;
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
