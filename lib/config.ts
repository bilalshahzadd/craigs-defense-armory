/**
 * Central brand configuration.
 * Swap these values to re-skin the entire storefront for a client.
 */
export const brand = {
  name: "CRAIGS",
  sub: "DEFENSE ARMORY",
  fullName: "CRAIGS DEFENSE ARMORY",
  tagline: "Precision Built. American Made.",
  legal: "Craigs Defense Armory, LLC",
  // trademark suffix used next to the wordmark
  tm: "®",
  email: "support@craigsdefense.com",
  phone: "1-800-555-0142",
  address: "1140 Industrial Way, Bend, OR 97701",
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    facebook: "https://facebook.com",
    x: "https://x.com",
  },
} as const;

export type Brand = typeof brand;
