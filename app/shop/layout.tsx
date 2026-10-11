import ProductListingLayout from "components/layout/search/listing-layout";
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductListingLayout basePath="/shop">{children}</ProductListingLayout>
  );
}
