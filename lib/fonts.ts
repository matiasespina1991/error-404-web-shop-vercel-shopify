import localFont from "next/font/local";

export const shareTech = localFont({
  src: "../fonts/Share-Tech Regular.otf",
  variable: "--font-share-tech",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const aptos = localFont({
  src: "../fonts/Aptos.otf",
  variable: "--font-aptos",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const microgramma = localFont({
  src: "../fonts/microgramma-medium-extended.otf",
  variable: "--font-microgramma",
  weight: "500",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});
