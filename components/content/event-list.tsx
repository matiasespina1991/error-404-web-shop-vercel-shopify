import Link from "next/link";
import { showUpcomingEventYear } from "lib/content/event-year";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { EventContent } from "lib/content/entries";
import { contentImageUrl } from "lib/content/feed";
export function eventDate(
  event: EventContent,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
) {
  return new Intl.DateTimeFormat("en-GB", {
    ...options,
    timeZone: event.timeZone,
  }).format(new Date(event.startsAt));
}
export const ticketLabels = {
  available: "Tickets",
  free: "Free entry",
  "sold-out": "Sold out",
  cancelled: "Cancelled",
};
export function EventList({
  events,
  compact = false,
}: {
  events: EventContent[];
  compact?: boolean;
}) {
  const now = new Date();
  if (!events.length)
    return (
      <p className="py-12 text-neutral-400">
        No events announced here yet. Check back soon.
      </p>
    );
  return (
    <ul
      className={`font-condensed divide-y divide-white/15 border-y border-white/15 ${compact ? "next-event-tiles" : ""}`}
    >
      {events.map((event) => (
        <li key={event.slug}>
          <Link
            href={`/events/${event.slug}`}
            className={`group grid items-center transition-colors hover:bg-white/[0.03] ${
              compact
                ? "grid-cols-[48px_minmax(0,1fr)_auto] gap-3 py-3 md:grid-cols-[64px_72px_minmax(0,1fr)_minmax(120px,0.5fr)_7rem] md:gap-4 md:py-4"
                : "grid-cols-[64px_minmax(0,1fr)_auto] gap-4 py-3 md:grid-cols-[90px_128px_minmax(0,1fr)_minmax(120px,0.5fr)_7rem] md:gap-7 md:py-4"
            }`}
          >
            <time dateTime={event.startsAt} className="flex flex-col gap-1">
              <span
                className={`font-light tracking-tight ${compact ? "text-base leading-none md:text-lg" : "text-2xl md:text-3xl"}`}
              >
                {compact
                  ? eventDate(event, { day: "2-digit", month: "2-digit" })
                  : eventDate(event, { day: "2-digit" })}
              </span>
              {(!compact ||
                showUpcomingEventYear(event.startsAt, event.timeZone, now)) && (
                <span
                  className={`uppercase tracking-widest text-neutral-400 ${compact ? "text-[11px] leading-tight" : "text-xs"}`}
                >
                  {eventDate(
                    event,
                    compact
                      ? { year: "numeric" }
                      : { month: "short", year: "numeric" },
                  )}
                </span>
              )}
            </time>
            <div className="hidden aspect-square overflow-hidden md:block">
              {event.cover && (
                <img
                  src={contentImageUrl(event.cover.id)}
                  alt={event.cover.alt}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}
            </div>
            <div>
              <p
                className={
                  compact
                    ? "text-[10px] uppercase tracking-widest text-neutral-400"
                    : "content-eyebrow"
                }
              >
                {event.eventType}
              </p>
              <h2
                className={`event-list-title font-medium tracking-tight ${compact ? "mt-1 text-sm md:text-base" : "mt-2 text-[1.0625rem] md:text-[1.375rem]"}`}
              >
                {event.title.toUpperCase()}
              </h2>
              <p
                className={
                  compact
                    ? "mt-1 text-xs text-neutral-400"
                    : "mt-2 text-sm text-neutral-400"
                }
              >
                {event.lineup.join(" / ")}
              </p>
              <div className={`text-xs md:hidden ${compact ? "mt-1" : "mt-2"}`}>
                <p>{event.venue}</p>
                <p className="mt-1 text-neutral-400">
                  {event.city}, {event.country}
                </p>
              </div>
            </div>
            <div
              className={`hidden md:block ${compact ? "text-xs" : "text-sm"}`}
            >
              <p>{event.venue}</p>
              <p className={`text-neutral-400 ${compact ? "mt-1" : "mt-2"}`}>
                {event.city}, {event.country}
              </p>
            </div>
            <div className="flex items-center justify-end gap-4">
              <span className="hidden text-xs text-neutral-300 lg:block">
                {ticketLabels[event.ticketStatus]}
              </span>
              <ArrowUpRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-neutral-400 group-hover:text-white"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
