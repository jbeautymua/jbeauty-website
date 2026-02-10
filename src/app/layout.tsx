import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAFAFA",
};

export const metadata: Metadata = {
  title: {
    default: "JSS Beauty | Professional Beauty Services in London",
    template: "%s | JSS Beauty",
  },
  description:
    "Premium beauty services in London including eyebrow threading, tinting, lash lifts, facials, waxing, and makeup. Book your appointment today.",
  keywords: [
    "beauty salon London",
    "eyebrow threading",
    "lash lift",
    "facial treatments",
    "waxing",
    "makeup artist London",
    "JSS Beauty",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "JSS Beauty",
    title: "JSS Beauty | Professional Beauty Services in London",
    description:
      "Premium beauty services in London. Eyebrow threading, lash lifts, facials, waxing, and makeup.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
