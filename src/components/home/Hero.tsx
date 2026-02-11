"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const headlines = [
  "Enhance Your Beauty, | Embrace Your Glow",
  "Reveal Your Radiance, | Embrace Confidence",
  "Elevate Your Beauty, | Express Yourself",
  "Transform Your Look, | Embrace Your Power",
  "Discover Your Glow, | Celebrate You",
  "Refine Your Beauty, | Radiate Confidence",
  "Unlock Your Radiance, | Own Your Glow",
  "Perfect Your Beauty, | Embrace Excellence",
];

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.1,
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  const [currentHeadline, setCurrentHeadline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4500); // Increased duration to allow typing to finish
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center"
      style={{ background: "var(--gradient-hero)" }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <motion.img
          src="/hero-image.jpg"
          alt=""
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      </div>
      {/* Centered content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="flex min-h-[200px] items-center justify-center sm:min-h-[180px] md:min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentHeadline}
              className="font-[family-name:var(--font-cormorant)] text-5xl font-bold text-primary md:text-6xl lg:text-7xl"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {headlines[currentHeadline].split("").map((char, i) => (
                char === "|" ? (
                  <br key={i} />
                ) : (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                )
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-text-secondary"
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
