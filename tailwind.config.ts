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
      padding: { DEFAULT: "20px", lg: "32px" },
    },
    extend: {
      colors: {
        night: "#0B131C",
        "night-2": "#0E1822",
        "night-3": "#132131",
        card: "#142333",
        "card-2": "#1B2B3D",
        ink: "#13243A",
        porcelain: "#F2EEE8",
        "text-2": "#B9C4CF",
        "text-3": "#8A99A8",
        champagne: "#C9A96E",
        "champagne-light": "#D9BE8C",
        garnet: "#9E2A45",
        "garnet-deep": "#5C1628",
        "garnet-night": "#3A0F1C",
        lagoon: "#117A6D",
        atlantic: "#2A5CAA",
        "sea-glass": "#8FD3C1",
        sky: "#A9C4EC",
        apricot: "#F4A36C",
        error: "#E39A86",
        hairline: "rgba(242,238,232,0.09)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      backgroundImage: {
        tide: "linear-gradient(125deg, #117A6D, #2A5CAA)",
        "garnet-glow":
          "radial-gradient(70% 60% at 100% 0%, rgba(158,42,69,.5), transparent 70%)",
      },
      spacing: {
        section: "120px",
        "section-mobile": "80px",
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
