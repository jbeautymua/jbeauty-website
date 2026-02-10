"use client";

import { motion } from "framer-motion";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      {/* Page Header */}
      <motion.div
        className="text-center pt-24 pb-12 md:pb-16"
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-cormorant)] mb-4">
          Get in Touch
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
          Have a question or want to book an appointment? We&apos;d love to hear
          from you. Reach out and we&apos;ll get back to you as soon as possible.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeIn}
        >
          <ContactInfo />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeIn}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
