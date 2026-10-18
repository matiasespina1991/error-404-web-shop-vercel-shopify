import { BrandHeading } from "components/content/brand-heading";
import { ContentBreadcrumb } from "components/content/breadcrumb";
import { Paragraphs } from "components/content/cards";
import Footer from "components/layout/footer";
import { contentImageUrl, getContentEntry } from "lib/content/feed";
import { notFound } from "next/navigation";
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
        <ContentBreadcrumb
          section="Interviews"
          href="/interviews"
          title={entry.title}
        />
        <BrandHeading as="h1" variant="page" className="mt-4 !text-[2rem]">
          {entry.title}
        </BrandHeading>
        <div className="mt-6 flex flex-col lg:flow-root">
          {entry.cover && (
            <img
              src={contentImageUrl(entry.cover.id)}
              alt={entry.cover.alt}
              width={1400}
              height={800}
              fetchPriority="high"
              className="order-2 mb-6 aspect-[16/9] w-full rounded-md object-cover lg:float-right lg:ml-8 lg:w-1/2"
            />
          )}
          <header className="order-1 mb-8">
            <p className="text-[1.05rem] leading-relaxed text-neutral-300 italic">
              {entry.summary}
            </p>
            <p className="mt-5 text-sm text-neutral-400">
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "long",
                timeZone: "UTC",
              }).format(new Date(entry.publishedDate))}{" "}
              · By {entry.interviewer || "Error404"}
            </p>
          </header>
          <div className="order-3">
            <Paragraphs text={entry.body} format={entry.bodyFormat} />
          </div>
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
