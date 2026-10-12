import { BrandHeading } from "components/content/brand-heading";
import Link from "next/link";
import Footer from "components/layout/footer";
import { InterviewCard } from "components/content/cards";
import { getContentPage } from "lib/content/feed";
import type { InterviewContent } from "lib/content/entries";
export async function generateMetadata() {
  const page = await getContentPage("interviews");
  return {
    title: "Interviews",
    description: "Conversations with the people behind the music.",
    robots: { index: page.source !== "mock", follow: true },
  };
}
export default async function InterviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ cursor?: string }>;
}) {
  const { cursor } = await searchParams;
  const page = await getContentPage("interviews", "upcoming", cursor);
  return (
    <>
      <div className="content-shell pb-20">
        <header className="mb-12">
          <BrandHeading as="h1" variant="page">
            Interviews
          </BrandHeading>
          <p className="mt-5 text-neutral-400">
            A closer look at the ideas, records and stories that connect us.
          </p>
        </header>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {page.items.map((entry) => (
            <li key={entry.slug}>
              <InterviewCard entry={entry as InterviewContent} />
            </li>
          ))}
        </ul>
        {!page.items.length && (
          <p className="text-neutral-400">New conversations coming soon.</p>
        )}
        <div className="mt-8 flex gap-6 text-sm">
          {cursor && <Link href="/interviews">Back to first page</Link>}
          {page.cursor && (
            <Link
              href={`/interviews?${new URLSearchParams({ cursor: page.cursor })}`}
            >
              More interviews →
            </Link>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
