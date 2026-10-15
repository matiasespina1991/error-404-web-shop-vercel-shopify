import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { aptos, microgramma, shareTech } from "lib/fonts";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: "/icons/error404-v2.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/icons/error404-v2.png",
  },
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html
      lang="en"
      className={`${microgramma.variable} ${aptos.variable} ${shareTech.variable}`}
    >
      <body className="bg-black text-white selection:bg-[#8d75d5] selection:text-white">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
