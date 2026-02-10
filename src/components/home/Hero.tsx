"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center"
      style={{ background: "var(--gradient-hero)" }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 opacity-20">
        <img src="/hero-image.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
      </div>
      {/* Centered content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="font-[family-name:var(--font-cormorant)] text-4xl leading-tight font-bold text-primary md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Enhance Your Beauty, <br /> Embrace Your Glow
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg text-text-secondary"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Professional beauty services tailored to enhance your natural beauty.
          Based in Wellington, London.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <a
            href="https://widget.treatwell.co.uk/place/jss-beauty/"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] min-w-[48px] rounded-full bg-primary px-8 py-4 text-center font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book Consultation
          </a>

          <Link
            href="/portfolio"
            className="min-h-[48px] min-w-[48px] rounded-full border-2 border-primary px-8 py-4 text-center font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — mobile only */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-primary" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
