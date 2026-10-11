import { cache } from "react";

export type PublishedAbout = {
  title: string;
  intro: string;
  body: string;
  imageId: string | null;
  imageAlt: string;
  seoDescription: string;
};

export function dashboardOrigin(): string | null {
  const value = process.env.DASHBOARD_URL;
  if (!value) return null;
  const url = new URL(value);
  if (
    url.protocol !== "https:" &&
    !(
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    )
  ) {
    throw new Error(
      "DASHBOARD_URL must use HTTPS (or localhost during development).",
    );
  }
  return url.origin;
}

export function aboutImageUrl(imageId: string): string {
  if (!/^[a-z0-9]+-[a-f0-9-]{36}$/.test(imageId))
    throw new Error("Invalid content image ID.");
  return `${dashboardOrigin()}/api/media/${imageId}`;
}

// The website consumes published content only. It has no Firebase admin credentials.
export const getPublishedAbout = cache(
  async (): Promise<PublishedAbout | null> => {
    const origin = dashboardOrigin();
    if (!origin) return null;
    const response = await fetch(`${origin}/api/content/about`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("The content service is unavailable.");
    const data = await response.json();
    if (data.schemaVersion !== 1)
      throw new Error("Unsupported content schema.");
    if (data.content === null) return null;
    const content = data.content;
    if (
      !content ||
      !["title", "intro", "body", "imageAlt", "seoDescription"].every(
        (field) => typeof content[field] === "string",
      ) ||
      (content.imageId !== null &&
        (typeof content.imageId !== "string" ||
          !/^[a-z0-9]+-[a-f0-9-]{36}$/.test(content.imageId)))
    ) {
      throw new Error("Invalid About content received.");
    }
    return content as PublishedAbout;
  },
);
