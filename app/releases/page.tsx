import Link from "next/link";
import Footer from "components/layout/footer";
import { BrandHeading } from "components/content/brand-heading";
import { ReleaseCard } from "components/releases/card";
import { getContentPage } from "lib/content/feed";

export async function generateMetadata() {
  const page = await getContentPage("releases");
  return {
    title: "Releases",
    description:
      "Discover releases, tracklists and audio previews from Error404.",
    robots: { index: page.source !== "mock", follow: true },
  };
}

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string }>;
}) {
  const { cursor } = await searchParams;
  const page = await getContentPage("releases", "upcoming", cursor);
  return (
    <>
      <section className="content-shell pb-16">
        <BrandHeading as="h1" variant="page" className="mb-8">
          Releases
        </BrandHeading>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {page.items.map(
            (entry) =>
              entry.kind === "releases" && (
                <li key={entry.slug}>
                  <ReleaseCard release={entry} />
                </li>
              ),
          )}
        </ul>
        {!page.items.length && (
          <p className="py-6 text-sm text-neutral-400">
            New releases coming soon.
          </p>
        )}
        <nav aria-label="Release pages" className="mt-8 flex gap-6 text-sm">
          {cursor && <Link href="/releases">Back to first page</Link>}
          {page.cursor && (
            <Link
              href={`/releases?${new URLSearchParams({ cursor: page.cursor })}`}
            >
              More releases →
            </Link>
          )}
        </nav>
      </section>
      <Footer />
    </>
  );
}
