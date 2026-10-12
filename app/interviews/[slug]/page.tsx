import { BrandHeading } from "components/content/brand-heading";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { Paragraphs } from "components/content/cards";
import { contentImageUrl, getContentEntry } from "lib/content/feed";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { content, source } = await getContentEntry("interviews", slug);
  return {
    title: content?.title || "Interview not found",
    description: content?.seoDescription || content?.summary,
    robots: { index: source !== "mock", follow: true },
  };
}
export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const { content: entry, source } = await getContentEntry("interviews", slug);
  if (!entry || entry.kind !== "interviews") notFound();
  return (
    <>
      <article className="content-shell pb-20">
        <Link href="/interviews" className="text-sm text-neutral-400">
          ← All interviews
        </Link>
        <header className="my-10 max-w-4xl">
          <BrandHeading as="h1" variant="page">
            {entry.title}
          </BrandHeading>
          <p className="mt-6 text-xl leading-relaxed text-neutral-300">
            {entry.summary}
          </p>
          <p className="mt-5 text-xs text-neutral-400">
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "long",
              timeZone: "UTC",
            }).format(new Date(entry.publishedDate))}{" "}
            · By {entry.interviewer || "Error404"}
          </p>
        </header>
        {entry.cover && (
          <img
            src={contentImageUrl(entry.cover.id)}
            alt={entry.cover.alt}
            width={1400}
            height={800}
            fetchPriority="high"
            className="mb-12 aspect-[16/9] w-full rounded-md object-cover"
          />
        )}
        <div className="mx-auto max-w-2xl">
          <Paragraphs text={entry.body} format={entry.bodyFormat} />
        </div>
        {entry.gallery.length > 0 && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {entry.gallery.map((image, i) => (
              <img
                key={`${image.id}-${i}`}
                src={contentImageUrl(image.id)}
                alt={image.alt}
                loading="lazy"
                width={900}
                height={600}
                className="aspect-[3/2] w-full rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </article>
      <Footer />
    </>
  );
}
