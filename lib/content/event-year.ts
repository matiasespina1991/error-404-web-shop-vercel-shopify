function calendarDate(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const value = (type: string) =>
    Number(parts.find((part) => part.type === type)?.value);
  return { year: value("year"), month: value("month"), day: value("day") };
}

export function showUpcomingEventYear(
  startsAt: string,
  timeZone: string,
  now = new Date(),
) {
  const today = calendarDate(now, "Europe/Madrid");
  const event = calendarDate(new Date(startsAt), timeZone);
  // Clamp to the last day of the target month (e.g. June 30 + 8 months).
  const month = today.month - 1 + 8;
  const lastDay = new Date(Date.UTC(today.year, month + 1, 0)).getUTCDate();
  const cutoff = Date.UTC(today.year, month, Math.min(today.day, lastDay));
  return (
    event.year > today.year &&
    Date.UTC(event.year, event.month - 1, event.day) > cutoff
  );
}
