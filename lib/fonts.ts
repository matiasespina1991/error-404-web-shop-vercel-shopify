import localFont from "next/font/local";

export const alteDin = localFont({
  src: "../fonts/Alte DIN 1451 Mittelschrift gepraegt Regular/Alte DIN 1451 Mittelschrift gepraegt Regular.ttf",
  variable: "--font-alte-din",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const dax = localFont({
  src: "../fonts/DaxCompact-Medium Regular.otf",
  variable: "--font-dax",
  weight: "500",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const helveticaCondensed = localFont({
  src: [
    {
      path: "../fonts/helvetica-condensed/Helvetica37-CondensedThin Thin/Helvetica37-CondensedThin Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica37-CondensedThin ThinItalic/Helvetica37-CondensedThin ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica-CondensedLight Light/Helvetica-CondensedLight Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica-CondensedLight LightItalic/Helvetica-CondensedLight LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Helvetica Condensed Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica77-Condensed Bold/Helvetica77-Condensed Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica77-Condensed BoldItalic/Helvetica77-Condensed BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica97-CondensedBlack Black/Helvetica97-CondensedBlack Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/helvetica-condensed/Helvetica97-CondensedBlack BlackItalic/Helvetica97-CondensedBlack BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-helvetica-condensed",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

export const eurostile = localFont({
  src: "../fonts/eurostile/fonnts.com-Eurostile.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  adjustFontFallback: false,
});

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
