import { ProductSection } from "components/home/product-section";
import Footer from "components/layout/footer";

export const metadata = {
  title: "Error404® Official Store",
  description: "Error404 official store.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      {/* <Carousel /> */}
      <ProductSection handle="releases" title="Releases" />
      <ProductSection handle="merch" title="Merch" />
      <ProductSection handle="accesories" title="Accesories" />
      <Footer />
    </>
  );
}
