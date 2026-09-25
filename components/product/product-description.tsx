import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { RELEASE_DETAILS } from "lib/shopify/release-details";
import { Product } from "lib/shopify/types";
import { Fragment } from "react";
import { RecordPlayer } from "./record-player";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  const category = product.tags.includes("vinyls")
    ? "Vinyls"
    : product.tags.includes("merch")
      ? "Merch"
      : "Accesories";
  const release = RELEASE_DETAILS[product.handle];

  return (
    <>
      <div className="mb-3 flex flex-col md:mb-6">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.5em] text-neutral-400">
          {category}
        </p>
        <h1 className="max-w-2xl text-2xl font-medium leading-tight md:text-3xl">
          {product.title}
        </h1>
        <div className="mt-2 text-[22px] font-light text-white md:mt-4">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
        <p className="mt-1 text-[10px] font-light text-neutral-400">
          Incl. VAT plus Shipping Costs
        </p>
      </div>
      <div className="">
        <AddToCart product={product} />
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mt-7 mb-6 max-w-2xl text-base font-light leading-7 text-neutral-300 md:mt-8"
          html={product.descriptionHtml}
        />
      ) : null}
      {release ? (
        <div className="space-y-5 pt-2">
          <div>
            <h2 className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Tracklist
            </h2>
            <ol className="space-y-2 text-md">
              {release.tracks.map((track) => (
                <li
                  key={track.position}
                  className="flex gap-6 border-b border-neutral-800 pb-2 last:border-b-0"
                >
                  <span className="text-neutral-500">{track.position}</span>
                  <span>
                    {track.title}{" "}
                    {track.duration ? (
                      <span className="text-neutral-500">{track.duration}</span>
                    ) : null}
                    {track.vocalsBy ? (
                      <span className="mt-1 block text-xs text-neutral-400">
                        Vocals – {track.vocalsBy}
                      </span>
                    ) : null}
                    {track.remixBy ? (
                      <span className="mt-1 block text-xs text-neutral-400">
                        Remix – {track.remixBy}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <RecordPlayer
            title={product.title}
            duration={release.tracks[0]?.duration}
          />

          <div>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Release details
            </h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              {release.details.map(([label, value]) => (
                <Fragment key={label}>
                  <dt className="text-neutral-500">{label}</dt>
                  <dd>{value}</dd>
                </Fragment>
              ))}
            </dl>
          </div>

          {/* <div className="text-sm text-neutral-400">
            {release.credits.map(([label, name], index) => (
              <Fragment key={label}>
                {index > 0 ? " " : ""}
                {label} <span className="text-white">{name}</span>.
              </Fragment>
            ))}
          </div> */}
          {release.identifiers ? (
            <dl className="space-y-2 text-xs text-neutral-400">
              {release.identifiers.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className="mt-1 text-neutral-300">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
