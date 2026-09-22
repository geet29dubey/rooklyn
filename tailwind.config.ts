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
        night: "#0B131C",
        "night-2": "#0F1B29",
        card: "#13243A",
        "card-2": "#0F1D2B",
        ink: "#13243A",
        porcelain: "#F7F4EF",
        "text-2": "rgba(247,244,239,0.86)",
        "text-3": "rgba(247,244,239,0.68)",
        champagne: "#C9A96E",
        "champagne-light": "#E0C994",
        apricot: "#F4A36C",
        garnet: "#9E2A45",
        "garnet-deep": "#5C1628",
        "garnet-night": "#2A1018",
        lagoon: "#8FD3C1",
        "lagoon-deep": "#117A6D",
        atlantic: "#2A5CAA",
        sky: "#A9C4EC",
        error: "#F0A0AA",
        hairline: "rgba(247,244,239,0.13)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        "mint-glow":
          "radial-gradient(circle, rgba(17,122,109,0.16), transparent 65%)",
        "garnet-glow":
          "radial-gradient(circle, rgba(158,42,69,0.18), transparent 70%)",
        tide: "linear-gradient(125deg, #117A6D, #2A5CAA)",
      },
      spacing: {
        section: "120px",
        "section-tablet": "88px",
        "section-mobile": "64px",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-3%, 2%)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateX(var(--orbit-radius, 110px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateX(var(--orbit-radius, 110px)) rotate(-360deg)",
          },
        },
      },
      animation: {
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
