"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const portfolioItems = [
  { title: "Natural Brows", gradient: "from-stone-100 to-stone-200" },
  { title: "Bridal Glam", gradient: "from-neutral-100 to-neutral-200" },
  { title: "Lash Lift", gradient: "from-stone-200 to-stone-300" },
  { title: "Hair Styling", gradient: "from-amber-50 to-amber-100" },
  { title: "Facial Glow", gradient: "from-neutral-50 to-neutral-100" },
  { title: "Brow Lamination", gradient: "from-stone-50 to-stone-100" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function PortfolioPreview() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-bold mb-4">
            Our Work
          </h2>
          <p className="text-muted-foreground text-lg">
            A glimpse of our recent transformations
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white font-semibold text-lg">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-block bg-primary text-white rounded-full px-8 py-4 font-semibold hover:opacity-90 transition-opacity"
          >
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
