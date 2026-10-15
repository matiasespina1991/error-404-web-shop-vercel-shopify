import { emptyEntry, type ContentEntry, type ContentKind } from "./entries";
const image = (name: string, alt: string) => ({ id: `demo-${name}`, alt });
export const mockEntries: ContentEntry[] = [
  ...[
    {
      slug: "error404-night-01",
      title: "Error404 Night / 01",
      startsAt: "2026-11-14T23:00:00+01:00",
      endsAt: "2026-11-15T06:00:00+01:00",
      city: "Barcelona",
      venue: "Warehouse 404",
      lineup: ["Artist 01", "Artist 02", "Error404 residents"],
      cover: "club",
      ticketStatus: "available",
    },
    {
      slug: "listening-room",
      title: "The Listening Room",
      startsAt: "2026-12-05T18:00:00+01:00",
      endsAt: "2026-12-05T23:00:00+01:00",
      city: "Madrid",
      venue: "Listening Space",
      lineup: ["Guest selector", "Error404 residents"],
      cover: "studio",
      ticketStatus: "free",
    },
    {
      slug: "after-hours-02",
      title: "After Hours / 02",
      startsAt: "2026-12-19T23:00:00+01:00",
      endsAt: "2026-12-20T07:00:00+01:00",
      city: "Barcelona",
      venue: "Warehouse 404",
      lineup: ["Artist 03", "Artist 04"],
      cover: "crowd",
      ticketStatus: "sold-out",
    },
    {
      slug: "summer-sessions",
      title: "Summer Sessions",
      startsAt: "2026-08-22T18:00:00+02:00",
      endsAt: "2026-08-23T02:00:00+02:00",
      city: "Valencia",
      venue: "Open Air 404",
      lineup: ["Guest selector", "Error404 residents"],
      cover: "crowd",
      ticketStatus: "available",
    },
    {
      slug: "club-session-03",
      title: "Club Session / 03",
      startsAt: "2026-10-31T23:00:00+01:00",
      endsAt: "2026-11-01T06:00:00+01:00",
      city: "Madrid",
      venue: "Club 404",
      lineup: ["Artist 05", "Error404 residents"],
      cover: "club",
      ticketStatus: "cancelled",
    },
  ].map(
    (item) =>
      ({
        ...emptyEntry("events", item.slug).draft,
        ...item,
        startsAt: new Date(item.startsAt).toISOString(),
        endsAt: new Date(item.endsAt).toISOString(),
        kind: "events",
        timeZone: "Europe/Madrid",
        country: "Spain",
        address: "Example address · location to be confirmed",
        region: "",
        postalCode: "",
        eventType: "Club night",
        cover: image(item.cover, "Stock photograph illustrating a music event"),
        gallery: [
          image("club", "Audience and stage lights at a concert"),
          image("crowd", "Audience at an open-air concert"),
        ],
        summary:
          "A night of independent electronic music. Shared frequencies, new discoveries and a dance floor without a script.",
        body: "This is a fictional event created to preview the new Error404 events section. The venue, artists, address and dates are examples.\n\nDoors open at the announced time. The final running order, venue details and ticket link will appear here when the event is published from the dashboard.",
        ticketUrl: "",
        websiteUrl: "",
        facebookUrl: "",
        contactEmail: "",
        price: item.ticketStatus === "free" ? "Free entry" : "From €15",
      }) as ContentEntry,
  ),
  ...[
    {
      slug: "inside-the-studio",
      title: "Inside the studio",
      artist: "Artist 01",
      cover: "studio",
      category: "Process",
    },
    {
      slug: "records-that-stay",
      title: "The records that stay with us",
      artist: "Guest selector",
      cover: "club",
      category: "Selections",
    },
    {
      slug: "a-shared-frequency",
      title: "A shared frequency",
      artist: "Artist 02",
      cover: "crowd",
      category: "Conversation",
    },
    {
      slug: "after-the-last-track",
      title: "After the last track",
      artist: "Error404 residents",
      cover: "club",
      category: "Community",
    },
  ].map(
    (item, index) =>
      ({
        ...emptyEntry("interviews", item.slug).draft,
        ...item,
        kind: "interviews",
        cover: image(item.cover, "Stock photograph illustrating an interview"),
        gallery: [],
        interviewer: "Error404",
        publishedDate: `2026-10-0${8 - index}T12:00:00.000Z`,
        summary:
          "A conversation about the sounds, places and people behind the music.",
        body: "This is a sample interview for the Error404 website. Names and text are placeholders, not a real conversation.\n\nWhat draws you to a record?\nThe feeling that there is something left to discover. A rhythm, a texture, a small detail that changes with every listen.\n\nAnd what comes next?\nMore time in the studio, more shared records and more reasons to meet on a dance floor.",
      }) as ContentEntry,
  ),
];
export function mockPage(
  kind: ContentKind,
  timeline = "upcoming",
  cursor?: string,
) {
  const now = new Date().toISOString();
  const items = mockEntries
    .filter(
      (item) =>
        item.kind === kind &&
        (item.kind !== "events" ||
          (timeline === "past" ? item.endsAt < now : item.endsAt >= now)),
    )
    .sort((a, b) => {
      const dateA =
        a.kind === "events"
          ? a.endsAt
          : a.kind === "interviews"
            ? a.publishedDate
            : "";
      const dateB =
        b.kind === "events"
          ? b.endsAt
          : b.kind === "interviews"
            ? b.publishedDate
            : "";
      return kind === "events" && timeline !== "past"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });
  return { items: cursor ? [] : items, cursor: null, source: "mock" as const };
}
