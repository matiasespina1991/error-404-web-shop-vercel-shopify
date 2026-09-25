import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getCollectionProducts } from "lib/shopify";

export async function ProductSection({
  handle,
  title,
}: {
  handle: string;
  title: string;
}) {
  const products = await getCollectionProducts({ collection: handle });

  if (!products.length) return null;

  return (
    <section
      className="px-4 py-10 pt-3 sm:py-10 md:px-12"
      aria-labelledby={`${handle}-heading`}
    >
      <h2
        id={`${handle}-heading`}
        className="mb-5 text-left text-sm xs:text-xs font-medium uppercase tracking-[0.2em] text-neutral-400"
      >
        {title}
      </h2>
      <Grid className="grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <ProductGridItems
          products={products}
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
        />
      </Grid>
    </section>
  );
}
