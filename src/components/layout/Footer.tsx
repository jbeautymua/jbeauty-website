import Link from "next/link";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const openingHours = [
  { days: "Mon - Wed", hours: "9am - 6pm" },
  { days: "Thu - Fri", hours: "9am - 8pm" },
  { days: "Saturday", hours: "10am - 5pm" },
  { days: "Sunday", hours: "Closed" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Business Info */}
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-primary">
              JSS Beauty
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Enhancing your natural beauty with professional care and attention
              to detail.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/jbeauty_j"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/447533046269"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="tel:07533046269"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  07533 046269
                </a>
              </li>
              <li>
                <a
                  href="mailto:swanju2003@yahoo.co.in"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  swanju2003@yahoo.co.in
                </a>
              </li>
              <li>
                <span className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Wellington, London SM6 8NF
                </span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Opening Hours
            </h3>
            <ul className="mt-4 space-y-3">
              {openingHours.map((entry) => (
                <li
                  key={entry.days}
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>{entry.days}</span>
                  <span>{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 JSS Beauty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
