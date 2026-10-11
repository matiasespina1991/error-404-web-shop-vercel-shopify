import { cache } from "react";
import { aboutImageUrl, dashboardOrigin } from "./about";
import {
  isContentKind,
  validateEntry,
  type ContentEntry,
  type ContentKind,
  type ContentPage,
} from "./entries";
import { mockEntries, mockPage } from "./mock";
export function contentImageUrl(id: string): string {
  if (["demo-club", "demo-studio", "demo-crowd"].includes(id))
    return `/demo/${id.slice(5)}.jpg`;
  return aboutImageUrl(id);
}
async function read(path: string) {
  const origin = dashboardOrigin();
  if (!origin) return null;
  const response = await fetch(`${origin}/api/content/${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (response.status === 404)
    return { schemaVersion: 1, content: null, source: "firebase" };
  if (!response.ok) throw new Error("The content service is unavailable.");
  const result = await response.json();
  if (
    result.schemaVersion !== 1 ||
    !["firebase", "mock"].includes(result.source)
  )
    throw new Error("Unsupported content contract.");
  return result;
}
export const getContentPage = cache(
  async (
    kind: ContentKind,
    timeline = "upcoming",
    cursor?: string,
  ): Promise<ContentPage> => {
    const params = new URLSearchParams({ timeline });
    if (cursor) params.set("cursor", cursor);
    const result = await read(`${kind}?${params}`);
    if (!result || result.source === "mock")
      return mockPage(kind, timeline, cursor);
    if (
      !Array.isArray(result.items) ||
      result.items.length > 24 ||
      (result.cursor !== null && typeof result.cursor !== "string")
    )
      throw new Error("Invalid content feed.");
    return {
      items: result.items.map((item: ContentEntry) =>
        validateEntry(item, kind, item.slug, true),
      ),
      cursor: result.cursor,
      source: "firebase",
    };
  },
);
export const getContentEntry = cache(
  async (
    kind: ContentKind,
    slug: string,
  ): Promise<{ content: ContentEntry | null; source: "mock" | "firebase" }> => {
    if (!isContentKind(kind) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      return { content: null, source: "firebase" };
    const result = await read(`${kind}/${slug}`);
    if (!result || result.source === "mock")
      return {
        content:
          mockEntries.find(
            (item) => item.kind === kind && item.slug === slug,
          ) || null,
        source: "mock",
      };
    return {
      content: result.content
        ? validateEntry(result.content, kind, slug, true)
        : null,
      source: "firebase",
    };
  },
);
