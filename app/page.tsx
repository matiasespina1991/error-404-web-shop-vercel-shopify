import Link from "next/link";
import Image from "next/image";
import Footer from "components/layout/footer";
import Price from "components/price";
import { ContentRail } from "components/content/rail";
import { InterviewCard } from "components/content/cards";
import { EventList, eventDate } from "components/content/event-list";
import { BrandHeading } from "components/content/brand-heading";
import { getCollectionProducts } from "lib/shopify";
import { contentImageUrl, getContentPage } from "lib/content/feed";
import { Newsletter } from "components/home/newsletter";
import type { EventContent, InterviewContent } from "lib/content/entries";
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
  const [releases, interviews, events] = await Promise.all([
    getCollectionProducts({
      collection: "releases",
      sortKey: "CREATED_AT",
      reverse: true,
    }),
    getContentPage("interviews"),
    getContentPage("events"),
  ]);
  const upcomingEvents = (events.items as EventContent[])
    .filter((event) => Date.parse(event.endsAt) >= Date.now())
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  const nextEvent = upcomingEvents.find(
    (event) => event.ticketStatus !== "cancelled",
  );
  return (
    <>
      <h1 className="sr-only">Error404 — Records, interviews and events</h1>
      <ContentRail
        title="Releases"
        link={
          <Link href="/shop/releases" className="hover:text-white">
            All releases ↗
          </Link>
        }
      >
        {releases.slice(0, 12).map((product) => (
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
              <div className="flex grow flex-col gap-1.5 pt-3">
                <h3 className="line-clamp-3 text-sm font-medium">
                  {product.title}
                </h3>
                <Price
                  amount={product.priceRange.maxVariantPrice.amount}
                  currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  className="text-sm font-medium text-neutral-300"
                />
              </div>
            </Link>
          </li>
        ))}
      </ContentRail>
      <ContentRail
        title="Interviews"
        link={
          <Link href="/interviews" className="hover:text-white">
            All interviews ↗
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
      <section className="content-section" aria-labelledby="home-events-title">
        <div className="mb-5 flex flex-col items-start gap-2">
          <BrandHeading id="home-events-title">Next Events</BrandHeading>
          <Link
            href="/events"
            className="text-xs text-neutral-300 hover:text-white"
          >
            See all events ↗
          </Link>
        </div>
        {nextEvent?.cover && (
          <figure className="mb-8 w-full max-w-[340px]">
            <Link
              href={`/events/${nextEvent.slug}`}
              aria-label={`View ${nextEvent.title}`}
              className="block overflow-hidden rounded-md"
            >
              <img
                src={contentImageUrl(nextEvent.cover.id)}
                alt={nextEvent.cover.alt}
                loading="lazy"
                className="max-h-[420px] w-full object-contain object-left"
              />
            </Link>
            <figcaption className="mt-3 text-left text-sm">
              <Link
                href={`/events/${nextEvent.slug}`}
                className="hover:underline"
              >
                {nextEvent.title}
              </Link>
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
        <EventList events={upcomingEvents.slice(0, 4)} compact />
      </section>
      <Newsletter />
      <Footer />
    </>
  );
}
