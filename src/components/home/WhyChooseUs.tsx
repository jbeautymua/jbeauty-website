"use client";

import { motion } from "framer-motion";
import { Award, Shield, Heart, Sparkles } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Years of Experience",
    description: "Over 8 years of professional beauty expertise",
  },
  {
    icon: Shield,
    title: "Premium Products",
    description: "Only the finest, salon-grade products for every treatment",
  },
  {
    icon: Heart,
    title: "Personalised Service",
    description: "Every treatment tailored to your unique needs",
  },
  {
    icon: Sparkles,
    title: "Hygiene First",
    description: "Strict hygiene protocols for your safety and comfort",
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-center mb-12">
          Why Choose JSS Beauty
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
