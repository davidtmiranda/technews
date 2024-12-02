import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["nb_international_proregular", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#088935",
        body: "rgb(33, 38, 35)",
        dark: "#000000",
      },
      spacing: {
        reading: "728px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
      fontSize: {
        base: "19px",
        h1: [
          "44px",
          {
            lineHeight: "48px",
            letterSpacing: "-0.6px",
          },
        ],
        h2: [
          "34px",
          {
            lineHeight: "38px",
            letterSpacing: "-0.4px",
          },
        ],
        h3: [
          "26px",
          {
            lineHeight: "30px",
            letterSpacing: "-0.3px",
          },
        ],
        quote: ["21px", "32px"],
        stats: ["24px", "28px"],
        cta: ["19px", "22px"],
      },
      fontWeight: {
        "extra-bold": "800",
      },
    },
  },
  plugins: [],
} satisfies Config;
