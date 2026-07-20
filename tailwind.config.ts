import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#F5B31C",
          bright: "#FFC72C",
          dark: "#C88E15",
          deep: "#8A6410",
        },
        ink: {
          DEFAULT: "#0A0A0B",
          800: "#111113",
          700: "#161618",
          600: "#1C1C1F",
          500: "#242428",
          400: "#2E2E33",
        },
        muted: {
          DEFAULT: "#9A9AA2",
          light: "#C4C4CC",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Oswald", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        site: "1440px",
      },
      boxShadow: {
        gold: "0 10px 40px -12px rgba(245, 179, 28, 0.45)",
        panel: "0 30px 80px -20px rgba(0, 0, 0, 0.85)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "menu-in": {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "menu-in": "menu-in 0.2s ease-out both",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
