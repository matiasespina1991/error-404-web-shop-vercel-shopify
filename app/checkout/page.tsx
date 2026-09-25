import Link from "next/link";

export const metadata = {
  title: "Checkout",
  description: "Demo checkout for the Error404 store.",
};

export default function CheckoutPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-[#8D75D5]">
        Error404 checkout
      </p>
      <h1 className="mb-4 text-4xl font-semibold">Demo checkout</h1>
      <p className="mb-8 max-w-md text-neutral-400">
        Shopify is not connected yet. This local checkout is ready for the
        storefront demo.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#8D75D5] px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Continue shopping
      </Link>
    </main>
  );
}
