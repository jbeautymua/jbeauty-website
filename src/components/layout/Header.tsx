"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  // Close on click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target as Node)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen, closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-text-primary tracking-tight"
            onClick={closeMobileMenu}
          >
            JSS Beauty
          </Link>

          {/* Right side content (Links + Actions) */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors duration-200 hover:text-primary ${
                        isActive
                          ? "font-semibold text-primary"
                          : "font-medium text-text-secondary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right-side actions */}
            <div className="flex items-center gap-3">
              {/* Phone button */}
              <a
                href="tel:+447533046269"
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-secondary hover:text-primary"
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
              </a>

              {/* Book Now CTA */}
              <a
                href="https://widget.treatwell.co.uk/place/jss-beauty/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md"
              >
                Book Now
              </a>

              {/* Mobile hamburger button */}
              <button
                ref={toggleButtonRef}
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors duration-200 hover:bg-secondary hover:text-primary md:hidden"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
              closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/98 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* Menu content */}
            <div className="relative flex h-full flex-col items-center justify-center px-6">
              <ul className="flex flex-col items-center gap-2 w-full max-w-sm">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.href}
                    className="w-full"
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: -20, opacity: 0 },
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="flex min-h-[48px] w-full items-center justify-center rounded-lg px-4 py-3 font-[family-name:var(--font-cormorant)] text-2xl font-medium text-text-primary transition-colors duration-200 hover:bg-secondary hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}

                {/* Mobile Book Now button */}
                <motion.li
                  className="w-full pt-4"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -20, opacity: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <a
                    href="https://widget.treatwell.co.uk/place/jss-beauty/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md"
                  >
                    Book Now
                  </a>
                </motion.li>

                {/* Mobile phone link */}
                <motion.li
                  className="w-full pt-2"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: -20, opacity: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <a
                    href="tel:+447533046269"
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-lg font-medium text-text-secondary transition-colors duration-200 hover:bg-secondary hover:text-primary"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
