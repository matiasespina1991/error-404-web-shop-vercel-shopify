import type { Product } from "lib/shopify/types";

export default function ProductCardTitle({ product }: { product: Product }) {
  const isRelease = product.tags.some(
    (tag) => tag.toLowerCase() === "releases",
  );
  const separator = product.title.indexOf(" - ");
  if (!isRelease || separator < 1) return <>{product.title}</>;
  const artist = product.title.slice(0, separator).trim();
  const title = product.title.slice(separator + 3).trim();
  if (!title) return <>{product.title}</>;
  return (
    <>
      <span className="block text-left">{artist}</span>
      <span className="block text-left">{title}</span>
    </>
  );
}
