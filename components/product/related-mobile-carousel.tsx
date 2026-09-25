"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Price from "components/price";
import type { Product } from "lib/shopify/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function RelatedMobileCarousel({ products }: { products: Product[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => {
      const step =
        (element.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
      const max = Math.max(0, element.scrollWidth - element.clientWidth);
      const count = Math.ceil(max / (step + 12)) + 1;
      setPage(
        element.scrollLeft >= max - 2
          ? count - 1
          : Math.round(element.scrollLeft / (step + 12)),
      );
      setAtStart(element.scrollLeft <= 2);
      setAtEnd(element.scrollLeft >= max - 2);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [products.length]);

  const go = (index: number) => {
    const element = rail.current;
    if (!element) return;
    const step =
      (element.firstElementChild as HTMLElement | null)?.offsetWidth ?? 1;
    element.scrollTo({
      left: index * (step + 12),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const arrows = (
    <div className="flex shrink-0 gap-1">
      <button
        type="button"
        aria-label="Previous related products"
        aria-controls="related-mobile-carousel"
        disabled={atStart}
        onClick={() => go(page - 1)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-200 disabled:opacity-25"
      >
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next related products"
        aria-controls="related-mobile-carousel"
        disabled={atEnd}
        onClick={() => go(page + 1)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 text-neutral-200 disabled:opacity-25"
      >
        <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <section
      aria-labelledby="related-mobile-heading"
      className="min-w-0 md:hidden"
    >
      <h2 id="related-mobile-heading" className="mb-3 text-base font-medium">
        Related Products
      </h2>
      <div className="relative">
        <ul
          ref={rail}
          id="related-mobile-carousel"
          tabIndex={0}
          aria-label="Related products, swipe to explore"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pt-1 pb-1 after:w-10 after:shrink-0 after:content-[''] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li key={product.id} className="w-[44%] flex-none snap-start">
              <Link
                href={`/product/${product.handle}`}
                className="flex h-full flex-col overflow-hidden rounded-lg"
              >
                <div className="relative aspect-square w-full shrink-0 overflow-hidden">
                  <Image
                    src={product.featuredImage.url}
                    alt={product.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex grow flex-col items-start gap-2 bg-[#171717] p-3 text-xs leading-snug">
                  <h4 className="line-clamp-3 font-medium text-neutral-200">
                    {product.title}
                  </h4>
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={
                      product.priceRange.maxVariantPrice.currencyCode
                    }
                    className="font-medium tabular-nums text-neutral-300"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-black to-transparent"
        />
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        {arrows}
      </div>
    </section>
  );
}
