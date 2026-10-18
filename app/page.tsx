import { BrandHeading } from "components/content/brand-heading";
import { InterviewCard } from "components/content/cards";
import { EventList, eventDate } from "components/content/event-list";
import { ContentRail } from "components/content/rail";
import { Newsletter } from "components/home/newsletter";
import { LinkArrow } from "components/icons/link-arrow";
import Footer from "components/layout/footer";
import Price from "components/price";
import ProductCardTitle from "components/product/card-title";
import { ReleaseCard } from "components/releases/card";
import type { EventContent, InterviewContent } from "lib/content/entries";
import { contentImageUrl, getContentPage } from "lib/content/feed";
import { getProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";
export async function generateMetadata() {
  const [events, interviews] = await Promise.all([
    getContentPage("events"),
    getContentPage("interviews"),
  ]);
  return {
    title: "Error404 — Records, people & dance floors",
    description:
      "Independent electronic music. Discover new records, interviews and upcoming Error404 events.",
    robots: {
      index: events.source !== "mock" && interviews.source !== "mock",
      follow: true,
    },
  };
}
export default async function HomePage() {
  const [products, interviews, events, releases] = await Promise.all([
    getProducts({
      sortKey: "CREATED_AT",
      reverse: true,
    }),
    getContentPage("interviews"),
    getContentPage("events"),
    getContentPage("releases"),
  ]);
  const upcomingEvents = (events.items as EventContent[])
    .filter((event) => Date.parse(event.endsAt) >= Date.now())
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const nextEvent = upcomingEvents.find(
    (event) => event.ticketStatus !== "cancelled",
  );
  const followingEvents = upcomingEvents
    .filter((event) => !nextEvent?.cover || event.slug !== nextEvent.slug)
    .slice(0, 4);
  return (
    <>
      <h1 className="sr-only">Error404 — Records, interviews and events</h1>
      <section className="content-section" aria-labelledby="home-events-title">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 md:justify-start">
          <BrandHeading id="home-events-title">Next Events</BrandHeading>
          <Link
            href="/events"
            className="section-link ml-auto whitespace-nowrap text-neutral-300 hover:text-white md:ml-0"
          >
            See all events <LinkArrow />
          </Link>
        </div>
        <div
          className={`grid items-start gap-8 lg:gap-12 ${nextEvent?.cover ? "lg:grid-cols-[340px_minmax(0,1fr)]" : ""}`}
        >
          {nextEvent?.cover && (
            <figure className="mx-auto w-[95%] md:w-full md:max-w-[340px] lg:mx-0">
              <Link
                href={`/events/${nextEvent.slug}`}
                aria-label={`View ${nextEvent.title}`}
                className="block overflow-hidden"
              >
                <img
                  src={contentImageUrl(nextEvent.cover.id)}
                  alt={nextEvent.cover.alt}
                  fetchPriority="high"
                  className="w-full object-contain object-center md:max-h-[420px] lg:object-left"
                />
              </Link>
              <figcaption className="font-condensed mt-3 text-center text-sm">
                <h2 className="event-list-title text-sm font-medium tracking-tight md:text-base">
                  <Link
                    href={`/events/${nextEvent.slug}`}
                    className="text-[1.15rem] hover:underline"
                  >
                    {nextEvent.title.toUpperCase()}
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-neutral-400">
                  <time dateTime={nextEvent.startsAt}>
                    {eventDate(nextEvent)}
                  </time>
                  {" · "}
                  {nextEvent.venue} · {nextEvent.city}
                </p>
              </figcaption>
            </figure>
          )}
          {(followingEvents.length > 0 || !nextEvent?.cover) && (
            <div className="min-w-0">
              <EventList events={followingEvents} compact />
            </div>
          )}
        </div>
      </section>
      <ContentRail
        title="Releases"
        uppercaseTitle={false}
        link={
          <Link href="/releases" className="hover:text-white">
            See all releases <LinkArrow />
          </Link>
        }
      >
        {releases.items.slice(0, 12).map(
          (entry) =>
            entry.kind === "releases" && (
              <li key={entry.slug} className="record-slide release-slide">
                <ReleaseCard release={entry} splitTitle />
              </li>
            ),
        )}
        {!releases.items.length && (
          <li className="py-6 text-sm text-neutral-400">
            New releases coming soon.
          </li>
        )}
      </ContentRail>
      <ContentRail
        title="Shop"
        uppercaseTitle={false}
        className="!pt-2 md:!pt-0"
        link={
          <Link href="/shop" className="hover:text-white">
            To the shop <LinkArrow />
          </Link>
        }
      >
        {products.slice(0, 12).map((product) => (
          <li key={product.id} className="record-slide">
            <Link
              href={`/product/${product.handle}`}
              className="group flex h-full flex-col"
            >
              <div className="relative aspect-square overflow-hidden rounded-md">
                <Image
                  src={product.featuredImage.url}
                  alt={product.title}
                  fill
                  sizes="(min-width:1600px) 280px, (min-width:1024px) 20vw, (min-width:768px) 25vw, (min-width:640px) 33vw, 45vw"
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="product-card-copy grow pt-3">
                <h3 className="uppercase min-w-0 flex-1 line-clamp-3 font-semibold">
                  <ProductCardTitle product={product} />
                </h3>
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  className="shrink-0 font-medium text-neutral-300"
                />
              </div>
            </Link>
          </li>
        ))}
      </ContentRail>
      <ContentRail
        title="Interviews"
        className="!pt-2 md:!pt-0"
        uppercaseTitle={false}
        link={
          <Link href="/interviews" className="hover:text-white">
            See all interviews <LinkArrow />
          </Link>
        }
      >
        {interviews.items.slice(0, 8).map((entry) => (
          <li key={entry.slug} className="interview-slide">
            <InterviewCard entry={entry as InterviewContent} compact />
          </li>
        ))}
        {!interviews.items.length && (
          <li className="py-10 text-neutral-400">
            New conversations coming soon.
          </li>
        )}
      </ContentRail>

      <Newsletter />
      <Footer />
    </>
  );
}
