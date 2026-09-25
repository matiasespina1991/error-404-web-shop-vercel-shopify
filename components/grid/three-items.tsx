import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  priority,
}: {
  item: Product;
  priority?: boolean;
}) {
  return (
    <div>
      <Link
        className="relative block h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          priority={priority}
          alt={item.title}
          label={{
            position: "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getCollectionProducts({
    collection: "hidden-homepage-featured-items",
  });

  if (homepageItems.length < 8) return null;

  return (
    <section className="px-12 pb-4 pt-8" aria-labelledby="highlights-heading">
      <h2
        id="highlights-heading"
        className="mb-5 text-left text-xs font-medium uppercase tracking-[0.2em] text-neutral-400"
      >
        Highlights
      </h2>
      <div className="mx-auto grid max-w-(--breakpoint-2xl) grid-cols-2 gap-4 md:grid-cols-4">
        {homepageItems.slice(0, 8).map((product, index) => (
          <ThreeItemGridItem
            key={product.handle}
            item={product}
            priority={index < 4}
          />
        ))}
      </div>
    </section>
  );
}
