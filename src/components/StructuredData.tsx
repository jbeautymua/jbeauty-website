export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "JSS Beauty",
    description:
      "Premium beauty services in London including eyebrow threading, tinting, lash lifts, facials, waxing, and makeup.",
    url: "https://jssbeauty.com",
    telephone: "+447533046269",
    email: "swanju2003@yahoo.co.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wellington",
      addressLocality: "London",
      postalCode: "SM6 8NF",
      addressCountry: "GB",
    },
    priceRange: "$$",
    openingHours: [
      "Mo-We 09:00-18:00",
      "Th-Fr 09:00-20:00",
      "Sa 10:00-17:00",
    ],
    sameAs: ["https://www.instagram.com/jbeauty_j"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
