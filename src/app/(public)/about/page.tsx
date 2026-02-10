"use client";

import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Award,
  Users,
  ShieldCheck,
  MessageCircle,
  Home,
  Heart,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const credentials = [
  {
    icon: GraduationCap,
    title: "NVQ Certified",
    description: "Fully qualified with nationally recognised beauty qualifications",
  },
  {
    icon: Award,
    title: "8+ Years Experience",
    description: "Dedicated years of perfecting techniques and delivering results",
  },
  {
    icon: Users,
    title: "1000+ Clients",
    description: "Trusted by a growing community of loyal, happy clients",
  },
  {
    icon: ShieldCheck,
    title: "Premium Products",
    description: "Only the highest quality, professionally sourced products used",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Personalised Consultations",
    description:
      "Every treatment begins with understanding your unique needs, skin type, and desired outcome to ensure a truly tailored experience.",
  },
  {
    icon: Home,
    title: "Relaxing Environment",
    description:
      "Step into our calm, clean space designed for your comfort — a peaceful retreat where you can unwind and enjoy every moment.",
  },
  {
    icon: Heart,
    title: "Aftercare Support",
    description:
      "We provide detailed aftercare advice to maintain your results, ensuring long-lasting beauty and complete satisfaction.",
  },
];

const openingHours = [
  { day: "Monday", hours: "9:00 AM – 6:00 PM" },
  { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
  { day: "Friday", hours: "9:00 AM – 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Page Header */}
      <motion.section
        className="pt-24 pb-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-bold text-primary mb-4">
          About JSS Beauty
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Discover our story, our passion for beauty, and why hundreds of clients
          trust us with their care.
        </p>
      </motion.section>

      {/* Brand Story */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={fadeInUp}>
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <User className="w-24 h-24 text-primary/30" strokeWidth={1} />
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-5">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-semibold text-primary">
              Our Story
            </h2>
            <p className="text-text-secondary leading-relaxed">
              JSS Beauty is a London-based beauty salon founded with a genuine
              passion for enhancing natural beauty. What started as a dream to
              create a space where clients feel truly pampered has grown into a
              thriving practice built on trust, skill, and an unwavering
              commitment to excellence.
            </p>
            <p className="text-text-secondary leading-relaxed">
              With over 8 years of professional experience and continuous
              advanced training, we stay at the forefront of beauty techniques
              and trends. From lash extensions and brow sculpting to skincare
              treatments, every service is delivered with precision, care, and an
              eye for detail that sets us apart.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Our commitment to quality means we only use premium,
              professionally sourced products that are kind to your skin and
              deliver stunning, long-lasting results. At JSS Beauty, you are not
              just a client — you are part of our community.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Credentials & Certifications */}
      <motion.section
        className="py-14 my-12 bg-secondary/30 rounded-2xl px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-semibold text-primary">
            Credentials &amp; Certifications
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            Qualified, experienced, and dedicated to delivering the highest
            standard of beauty care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {credentials.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              className="text-center space-y-3"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mx-auto">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-primary text-sm md:text-base">
                {item.title}
              </h3>
              <p className="text-text-secondary text-xs md:text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose JSS Beauty */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-semibold text-primary">
            Why Choose JSS Beauty
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            We go beyond treatments — we create experiences that leave you
            feeling confident and cared for.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="text-center space-y-4 p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-primary text-lg">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Location */}
      <motion.section
        className="py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-semibold text-primary">
            Visit Us
          </h2>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            We would love to welcome you. Find us at our Wellington studio.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Address</h3>
                <p className="text-text-secondary text-sm">Wellington, UK</p>
                <a
                  href="https://maps.google.com/?q=Wellington,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm mt-2 transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-primary mb-3">
                  Opening Hours
                </h3>
                <div className="space-y-2">
                  {openingHours.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0"
                    >
                      <span className="text-primary font-medium">
                        {item.day}
                      </span>
                      <span
                        className={
                          item.hours === "Closed"
                            ? "text-text-secondary/60"
                            : "text-text-secondary"
                        }
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div variants={fadeInUp}>
            <div className="rounded-lg overflow-hidden aspect-video">
              <iframe
                src="https://www.google.com/maps?q=Wellington,+UK&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JSS Beauty location on Google Maps"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
