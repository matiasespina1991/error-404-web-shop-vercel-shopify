import { BrandHeading } from "components/content/brand-heading";
import { EventList } from "components/content/event-list";
import Footer from "components/layout/footer";
import type { EventContent } from "lib/content/entries";
import { getContentPage } from "lib/content/feed";
import Link from "next/link";
export async function generateMetadata() {
  const page = await getContentPage("events");
  return {
    title: "Events",
    description: "Discover our last events.",
    robots: { index: page.source !== "mock", follow: true },
  };
}
export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ timeline?: string; cursor?: string }>;
}) {
  const params = await searchParams,
    timeline = params.timeline === "past" ? "past" : "upcoming";
  const page = await getContentPage("events", timeline, params.cursor);
  return (
    <>
      <div className="content-shell pb-16">
        <header className="mb-6">
          <BrandHeading as="h1" variant="page">
            Events
          </BrandHeading>
        </header>
        <nav
          aria-label="Event timeline"
          className="event-timeline mb-4 flex gap-7"
        >
          {["upcoming", "past"].map((value) => (
            <Link
              key={value}
              href={`/events?timeline=${value}`}
              aria-current={timeline === value ? "page" : undefined}
              className={
                timeline === value
                  ? "border-b-[0.5px] border-white pb-2"
                  : "pb-2 text-neutral-400 hover:text-white"
              }
            >
              {value === "past" ? "Past Events" : "Upcoming Events"}
            </Link>
          ))}
        </nav>
        <EventList events={page.items as EventContent[]} />
        <div className="mt-8 flex gap-6 text-sm">
          {params.cursor && (
            <Link
              href={`/events?timeline=${timeline}`}
              className="underline underline-offset-4"
            >
              Back to first page
            </Link>
          )}
          {page.cursor && (
            <Link
              href={`/events?${new URLSearchParams({ timeline, cursor: page.cursor })}`}
              className="underline underline-offset-4"
            >
              More events →
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
