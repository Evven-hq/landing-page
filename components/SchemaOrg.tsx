import { JsonLdScript } from "next-seo";

type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

type OrganizationSchema = {
  "@context": "https://schema.org";
  "@type": "Organization";
  [key: string]: JsonLdValue;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Evven",
  url: "https://evven.xyz",
  logo: {
    "@type": "ImageObject",
    url: "https://evven.xyz/Evven-white.svg",
    width: 180,
    height: 60,
  },
  sameAs: [
    "https://github.com/Evven-hq",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@evven.xyz",
      contactType: "Customer service",
      areaServed: "India",
      availableLanguage: ["English", "Hindi", "Punjabi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 23, Chandigarh",
    addressLocality: "Chandigarh",
    addressRegion: "Chandigarh",
    postalCode: "160017",
    addressCountry: "IN",
  },
} satisfies OrganizationSchema;

export default function OrganizationSchema() {
  return (
    <JsonLdScript
      data={organizationSchema}
      scriptKey="organization-schema"
    />
  );
}
