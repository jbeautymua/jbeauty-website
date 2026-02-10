"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="bg-secondary/30 py-20 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-bold mb-4">
          Ready to Enhance Your Beauty?
        </h2>
        <p className="text-text-secondary mb-8">
          Book your appointment today and experience the JSS Beauty difference.
        </p>

        <a
          href="https://widget.treatwell.co.uk/place/jss-beauty/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white rounded-full px-8 py-4 font-medium hover:opacity-90 transition"
        >
          Book on Treatwell
        </a>

        <p className="mt-6 text-sm text-text-secondary">
          Or{" "}
          <a
            href="https://wa.me/447533046269"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-medium hover:underline"
          >
            WhatsApp Us
          </a>
        </p>
      </motion.div>
    </section>
  );
}
