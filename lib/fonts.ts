import localFont from "next/font/local";

export const microgramma = localFont({
  src: "../fonts/microgramma-medium-extended.otf",
  variable: "--font-microgramma",
  weight: "500",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});
