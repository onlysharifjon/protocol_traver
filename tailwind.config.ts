import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette pulled from the Figma design tokens
        ink: {
          DEFAULT: "#0a0a0a", // page background
          900: "#070707",
          800: "#0c0c0c",
          700: "#0e0e0e",
          600: "#111111",
          500: "#222222",
        },
        gold: {
          DEFAULT: "#c9a84c", // primary accent
        },
        cream: {
          DEFAULT: "#f0ead6", // primary light text
          dim: "#d8d0ba",
        },
        muted: {
          DEFAULT: "#9a9076",
          400: "#6b6b6b",
          500: "#5a5a5a",
          600: "#4a4a4a",
          700: "#3a3a3a",
          800: "#333333",
          900: "#2a2a2a",
        },
        danger: "#8b3a3a",
        success: "#2a4a2a",
        whatsapp: "#25d366",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 1s ease-out forwards",
        slowZoom: "slowZoom 18s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
