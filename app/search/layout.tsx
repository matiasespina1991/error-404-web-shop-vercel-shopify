import ProductListingLayout from "components/layout/search/listing-layout";
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProductListingLayout>{children}</ProductListingLayout>;
}
