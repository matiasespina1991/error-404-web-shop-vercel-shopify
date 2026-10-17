import ChildrenWrapper from "app/search/children-wrapper";
import { BrandHeading } from "components/content/brand-heading";
import Footer from "components/layout/footer";
import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";

export default function ProductListingLayout({
  children,
  basePath = "/search",
}: {
  children: React.ReactNode;
  basePath?: "/search" | "/shop";
}) {
  return (
    <>
      {basePath === "/shop" && (
        <div className="content-shell mb-8">
          <BrandHeading as="h1" variant="page">
            Shop
          </BrandHeading>
        </div>
      )}
      <div className="content-shell flex flex-col gap-4 pb-14 sm:pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          <Collections basePath={basePath} />
        </div>
        <div className="order-last min-h-screen pr-4 w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
      <Footer />
    </>
  );
}
