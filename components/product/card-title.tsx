import type { Product } from "lib/shopify/types";

export default function ProductCardTitle({
  product,
  splitTitle = true,
}: {
  product: Product;
  splitTitle?: boolean;
}) {
  const isRelease = product.tags.some(
    (tag) => tag.toLowerCase() === "releases",
  );
  const separator = product.title.indexOf(" - ");
  if (!splitTitle || !isRelease || separator < 1)
    return <span className="uppercase">{product.title}</span>;
  const artist = product.title.slice(0, separator).trim();
  const title = product.title.slice(separator + 3).trim();
  if (!title) return <span className="uppercase">{product.title}</span>;
  return (
    <>
      <span className="block text-left uppercase">{artist}</span>
      <span className="block text-left uppercase">{title}</span>
    </>
  );
}
