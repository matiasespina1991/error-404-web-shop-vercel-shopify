import error404Cap from "../../input/Error404 Cap.jpeg";
import error404TShirt from "../../input/Error404 T-Shirt.png";
import lighterBase from "../../input/Lighter Base.jpg";
import r23299694Label from "../../input/R-23299694-1653103987-6874.jpg";
import r23299694 from "../../input/R-23299694-1653103994-9998.jpg";
import r34787453 from "../../input/R-34787453-1760307695-1263.jpg";
import r36015688 from "../../input/R-36015688-1770665623-7317.jpg";
import r36497119 from "../../input/R-36497119-1771900353-2230.jpg";
import r38053926 from "../../input/R-38053926-1785786336-8632.jpg";
import whiteTShirt from "../../input/T-Shirt white.jpeg";
import type { Collection, Image, Product, ProductVariant } from "./types";

const image = (url: string, altText: string): Image => ({
  url,
  altText,
  width: 1200,
  height: 1500,
});

const product = ({
  handle,
  title,
  description,
  price,
  imageUrl,
  imageUrls = [],
  tags,
}: {
  handle: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imageUrls?: string[];
  tags: string[];
}): Product => {
  const featuredImage = image(imageUrl, title);
  const images = [featuredImage, ...imageUrls.map((url) => image(url, title))];
  const variant: ProductVariant = {
    id: `mock-variant-${handle}`,
    title: "Default Title",
    availableForSale: true,
    selectedOptions: [{ name: "Title", value: "Default Title" }],
    price: { amount: price, currencyCode: "EUR" },
  };

  return {
    id: `mock-product-${handle}`,
    handle,
    availableForSale: true,
    title,
    description,
    descriptionHtml: `<p>${description}</p>`,
    options: [],
    priceRange: {
      minVariantPrice: variant.price,
      maxVariantPrice: variant.price,
    },
    variants: [variant],
    featuredImage,
    images,
    seo: { title, description },
    tags,
    updatedAt: "2026-09-25T00:00:00Z",
  };
};

export const MOCK_PRODUCTS: Product[] = [
  product({
    handle: "lighter-base",
    title: "Lighter Base",
    description: "A compact lighter base with the Error404 mark.",
    price: "24.00",
    imageUrl: lighterBase.src,
    tags: ["accesories", "featured"],
  }),
  product({
    handle: "r-23299694",
    title: "Zarem & Philippe Jeanneret - Sun Ray",
    description:
      "Error404-01 vinyl EP from Zarem and Philippe Jeanneret. Vinyl 12-inch EP, released in Germany on June 10, 2022. Electronic, Breaks, House, and Tech House. Artwork by Analogbrek. Mastered by Matthias Heinstein.",
    price: "28.00",
    imageUrl: r23299694.src,
    imageUrls: [r23299694Label.src],
    tags: ["vinyls"],
  }),
  product({
    handle: "r-34787453",
    title: "Delazar - Monkey Slayer EP",
    description:
      "Monkey Slayer EP by Delazar on Akasha Records (AKSH001). A five-track electronic EP spanning House, Ambient, Electro, and Techno, including a remix by Deep Mariano. Released in Spain on August 8, 2025.",
    price: "30.00",
    imageUrl: r34787453.src,
    tags: ["vinyls"],
  }),
  product({
    handle: "r-36015688",
    title: "Sancturu - The Last Romantic",
    description:
      "The Last Romantic by Sancturu on Error404 (ERROR404-02). A four-track electronic EP spanning Electro, House, Deep House, and Breakbeat, featuring vocals by Lourene and a rework by Light Blue File. Released in Spain in December 2025.",
    price: "32.00",
    imageUrl: r36015688.src,
    tags: ["vinyls"],
  }),
  product({
    handle: "r-36497119",
    title: "Light Blue File - Limpiaelmantel EP",
    description:
      "Limpiaelmantel EP by Light Blue File on Akasha Records (AKSH002). A three-track electronic EP spanning Techno, Deep Techno, Dub Techno, and Tribal. Released in Spain in 2026.",
    price: "30.00",
    imageUrl: r36497119.src,
    tags: ["vinyls"],
  }),
  product({
    handle: "r-38053926",
    title: "Demian - Akasha Records",
    description: "A warm limited pressing from Akasha Records.",
    price: "30.00",
    imageUrl: r38053926.src,
    tags: ["vinyls"],
  }),
  product({
    handle: "error404-t-shirt",
    title: "Error404 T-Shirt",
    description: "The official Error404 tee, printed for the after-hours web.",
    price: "35.00",
    imageUrl: error404TShirt.src,
    tags: ["merch", "featured"],
  }),
  product({
    handle: "white-t-shirt",
    title: "White T-Shirt",
    description: "A white Wasteparties tee with a clean front graphic.",
    price: "35.00",
    imageUrl: whiteTShirt.src,
    tags: ["merch"],
  }),
  product({
    handle: "error404-cap",
    title: "Error404 Cap",
    description: "A classic cap with the Error404 mark front and center.",
    price: "30.00",
    imageUrl: error404Cap.src,
    tags: ["accesories", "featured"],
  }),
  product({
    handle: "signal-cap",
    title: "Signal Cap",
    description: "Unstructured cotton cap with a low-key embroidered signal.",
    price: "28.00",
    imageUrl:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1200&q=85",
    tags: ["accesories", "featured"],
  }),
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    handle: "",
    title: "All",
    description: "The full Error404 collection.",
    seo: { title: "All", description: "The full Error404 collection." },
    path: "/search",
    updatedAt: "2026-09-25T00:00:00Z",
  },
  {
    handle: "vinyls",
    title: "Vinyls",
    description: "Limited Error404 vinyl releases.",
    seo: { title: "Vinyls", description: "Limited Error404 vinyl releases." },
    path: "/search/vinyls",
    updatedAt: "2026-09-25T00:00:00Z",
  },
  {
    handle: "merch",
    title: "Merch",
    description: "Error404 and Wasteparties apparel.",
    seo: { title: "Merch", description: "Error404 and Wasteparties apparel." },
    path: "/search/merch",
    updatedAt: "2026-09-25T00:00:00Z",
  },
  {
    handle: "accesories",
    title: "Accesories",
    description: "Error404 accessories and objects.",
    seo: {
      title: "Accesories",
      description: "Error404 accessories and objects.",
    },
    path: "/search/accesories",
    updatedAt: "2026-09-25T00:00:00Z",
  },
];

export const getMockProducts = ({
  collection,
  query,
  reverse,
  sortKey,
}: {
  collection?: string;
  query?: string;
  reverse?: boolean;
  sortKey?: string;
} = {}): Product[] => {
  let products = MOCK_PRODUCTS.filter((item) =>
    collection ? item.tags.includes(collection) : true,
  );

  if (query) {
    const normalizedQuery = query.toLowerCase();
    products = products.filter((item) =>
      `${item.title} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }

  if (sortKey === "PRICE") {
    products = [...products].sort(
      (a, b) =>
        Number(a.priceRange.minVariantPrice.amount) -
        Number(b.priceRange.minVariantPrice.amount),
    );
  } else if (sortKey === "CREATED_AT") {
    products = [...products].reverse();
  }

  return reverse ? products.reverse() : products;
};

export const MOCK_FEATURED_PRODUCTS = getMockProducts().slice(0, 8);
export const MOCK_CAROUSEL_PRODUCTS = getMockProducts().slice(3);
