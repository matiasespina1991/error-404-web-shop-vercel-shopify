import { BrandHeading } from "components/content/brand-heading";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { Paragraphs } from "components/content/cards";
import { eventDate, ticketLabels } from "components/content/event-list";
import { contentImageUrl, getContentEntry } from "lib/content/feed";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { content, source } = await getContentEntry("events", slug);
  return {
    title: content?.title || "Event not found",
    description: content?.seoDescription || content?.summary,
    robots: { index: source !== "mock", follow: true },
  };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const { content: event, source } = await getContentEntry("events", slug);
  if (!event || event.kind !== "events") notFound();
  const past = event.endsAt < new Date().toISOString();
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([event.venue, event.address, event.city, event.country].filter(Boolean).join(", "))}`;
  const time = (value: string) =>
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: event.timeZone,
    }).format(new Date(value));
  return (
    <>
      <article className="content-shell pb-20">
        <Link
          href="/events"
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← All events
        </Link>
        <header className="mt-10 mb-8">
          <BrandHeading as="h1" variant="page" className="max-w-5xl">
            {event.title}
          </BrandHeading>
          <p className="mt-4 text-neutral-400">
            {eventDate(event)} · {event.venue}
          </p>
        </header>
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            {event.cover && (
              <div className="overflow-hidden rounded-md bg-neutral-900">
                <img
                  src={contentImageUrl(event.cover.id)}
                  alt={event.cover.alt}
                  width={1000}
                  height={1100}
                  fetchPriority="high"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              {event.ticketStatus === "available" &&
              event.ticketUrl &&
              !past ? (
                <a
                  href={event.ticketUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="content-button"
                >
                  Get tickets {event.price && `· ${event.price}`} ↗
                </a>
              ) : (
                <span className="rounded-full bg-white/10 px-5 py-3 text-sm">
                  {past
                    ? "Past event"
                    : event.ticketStatus === "available"
                      ? "Tickets coming soon"
                      : ticketLabels[event.ticketStatus]}
                </span>
              )}
              {event.facebookUrl && (
                <a
                  href={event.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="content-button secondary-content"
                >
                  Facebook event ↗
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-neutral-200">
              {event.summary}
            </p>
            <section className="my-10">
              <h2 className="content-eyebrow mb-5">Line-up</h2>
              <ul className="space-y-2 text-2xl font-light">
                {event.lineup.map((artist, i) => (
                  <li key={i}>{artist}</li>
                ))}
              </ul>
            </section>
            <dl className="mb-10 grid grid-cols-[90px_minmax(0,1fr)] gap-x-5 gap-y-4 text-sm leading-relaxed">
              <dt className="text-neutral-400">Starts</dt>
              <dd>{time(event.startsAt)}</dd>
              <dt className="text-neutral-400">Ends</dt>
              <dd>
                {time(event.endsAt)}
                <span className="mt-1 block text-xs text-neutral-400">
                  {event.timeZone}
                </span>
              </dd>
              <dt className="text-neutral-400">Venue</dt>
              <dd>{event.venue}</dd>
              <dt className="text-neutral-400">Address</dt>
              <dd>
                {[
                  event.address,
                  event.postalCode,
                  event.city,
                  event.region,
                  event.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
                {source !== "mock" && (
                  <a
                    href={map}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block underline underline-offset-4"
                  >
                    Get directions ↗
                  </a>
                )}
              </dd>
              {event.price && (
                <>
                  <dt className="text-neutral-400">Entry</dt>
                  <dd>{event.price}</dd>
                </>
              )}
              {event.contactEmail && (
                <>
                  <dt className="text-neutral-400">Contact</dt>
                  <dd>
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="break-all underline"
                    >
                      {event.contactEmail}
                    </a>
                  </dd>
                </>
              )}
              {event.websiteUrl && (
                <>
                  <dt className="text-neutral-400">Website</dt>
                  <dd>
                    <a
                      href={event.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Visit website ↗
                    </a>
                  </dd>
                </>
              )}
            </dl>
            <section>
              <h2 className="content-eyebrow mb-5">About the event</h2>
              <Paragraphs text={event.body} format={event.bodyFormat} />
            </section>
          </div>
        </div>
        {event.gallery.length > 0 && (
          <section className="mt-16">
            <h2 className="content-eyebrow mb-5">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.gallery.map((image, i) => (
                <img
                  key={`${image.id}-${i}`}
                  src={contentImageUrl(image.id)}
                  alt={image.alt}
                  width={1000}
                  height={700}
                  loading="lazy"
                  className="aspect-[3/2] w-full rounded-md object-cover"
                />
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
