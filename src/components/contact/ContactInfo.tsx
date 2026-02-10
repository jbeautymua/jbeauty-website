"use client";

import { MessageCircle, Phone, Instagram, Mail, MapPin, Clock } from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "Chat on WhatsApp",
    href: "https://wa.me/447533046269",
  },
  {
    icon: Phone,
    label: "07533 046269",
    href: "tel:+447533046269",
  },
  {
    icon: Instagram,
    label: "@jbeauty_j",
    href: "https://www.instagram.com/jbeauty_j",
  },
  {
    icon: Mail,
    label: "swanju2003@yahoo.co.in",
    href: "mailto:swanju2003@yahoo.co.in",
  },
  {
    icon: MapPin,
    label: "Wellington, London SM6 8NF",
    href: "https://maps.google.com/?q=Wellington,+London+SM6+8NF",
  },
];

const openingHours = [
  { day: "Monday - Wednesday", hours: "9:00 AM - 6:00 PM" },
  { day: "Thursday - Friday", hours: "9:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border/50">
        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

        <div className="space-y-5">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 group"
              >
                <span className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {method.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>We typically reply within 24 hours</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm border border-border/50">
        <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>

        <ul className="space-y-3">
          {openingHours.map((entry) => (
            <li key={entry.day} className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{entry.day}</span>
              <span className="text-muted-foreground">{entry.hours}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
