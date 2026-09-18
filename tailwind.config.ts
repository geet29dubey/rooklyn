import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "20px", sm: "28px", lg: "40px" },
    },
    extend: {
      colors: {
        // Deep Atlantic — main background
        night: "#0D1923",
        "night-2": "#0A141C",
        // Slate Navy — elevated surfaces
        card: "#1D323F",
        "card-2": "#16262F",
        ink: "#1D323F",
        // Warm Ivory — primary text
        porcelain: "#F4F1EB",
        // Soft Silver — secondary / tertiary text
        "text-2": "#B8C0C5",
        "text-3": "#7E8891",
        // Champagne Gold — brand emphasis
        champagne: "#C2AB76",
        "champagne-light": "#DBC79A",
        // Muted Garnet — problem states / atmosphere only
        garnet: "#4E2938",
        "garnet-deep": "#4E2938",
        "garnet-night": "#341B25",
        // Lagoon Mint — automation / success / active-system
        lagoon: "#78C8C2",
        error: "#E2949E",
        hairline: "rgba(184,192,197,0.16)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      backgroundImage: {
        "mint-glow":
          "radial-gradient(circle, rgba(120,200,194,0.10), transparent 65%)",
        "garnet-glow":
          "radial-gradient(circle, rgba(78,41,56,0.17), transparent 70%)",
      },
      spacing: {
        section: "96px",
        "section-tablet": "72px",
        "section-mobile": "56px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-3%, 2%)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(110px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(110px) rotate(-360deg)",
          },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        drift: "drift 18s ease-in-out infinite",
        bob: "bob 6s ease-in-out infinite",
        orbit: "orbit 22s linear infinite",
      },
    },
  },
  plugins: [
    ({ addVariant }: { addVariant: (name: string, def: string | string[]) => void }) => {
      addVariant(
        "landscape-phone",
        "@media (orientation: landscape) and (max-height: 500px)"
      );
      addVariant("portrait", "@media (orientation: portrait)");
      addVariant("landscape", "@media (orientation: landscape)");
      addVariant("touch", "@media (hover: none) and (pointer: coarse)");
      addVariant("hover-fine", "@media (hover: hover) and (pointer: fine)");
    },
  ],
};

export default config;
