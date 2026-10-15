import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "components/layout/footer";
import { BrandHeading } from "components/content/brand-heading";
import { RichText } from "components/content/rich-text";
import { ReleaseTrackPlayer } from "components/releases/track-player";
import { contentImageUrl, getContentEntry } from "lib/content/feed";
import { releaseFormatLabel } from "lib/content/releases";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { content, source } = await getContentEntry("releases", slug);
  return {
    title: content?.title || "Release not found",
    description: content?.seoDescription || content?.summary,
    robots: { index: Boolean(content) && source !== "mock", follow: true },
  };
}
export default async function ReleasePage({ params }: Props) {
  const { slug } = await params;
  const { content: release } = await getContentEntry("releases", slug);
  if (!release || release.kind !== "releases") notFound();
  return (
    <>
      <article className="content-shell pb-16">
        <Link
          href="/releases"
          className="text-sm text-neutral-400 hover:text-white"
        >
          ← All releases
        </Link>
        <div className="mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <div className="w-full max-w-md space-y-4">
            {release.cover && (
              <div className="overflow-hidden rounded-md bg-neutral-900">
                <img
                  src={contentImageUrl(release.cover.id)}
                  alt={release.cover.alt}
                  width={700}
                  height={700}
                  fetchPriority="high"
                  className="aspect-square w-full object-contain"
                />
              </div>
            )}
            {release.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {release.gallery.map((image, index) => (
                  <img
                    key={`${image.id}-${index}`}
                    src={contentImageUrl(image.id)}
                    alt={image.alt}
                    width={350}
                    height={350}
                    loading="lazy"
                    className="aspect-square w-full rounded-md object-contain"
                  />
                ))}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <BrandHeading as="h1" variant="page">
              {release.title}
            </BrandHeading>
            <p className="mt-5 max-w-2xl text-base leading-snug text-neutral-300">
              {release.summary}
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="text-neutral-400">Format</dt>
                <dd>{releaseFormatLabel(release.format)}</dd>
              </div>
              {release.genres.length > 0 && (
                <div className="flex gap-3">
                  <dt className="text-neutral-400">Genres</dt>
                  <dd>{release.genres.join(" / ")}</dd>
                </div>
              )}
            </dl>
            {release.purchaseUrl && (
              <a
                href={release.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="content-button mt-6"
              >
                Buy release ↗
              </a>
            )}
            <section className="mt-8" aria-labelledby="release-tracklist">
              <h2 id="release-tracklist" className="mb-5 text-sm">
                Tracklist
              </h2>
              <ReleaseTrackPlayer tracks={release.tracks} />
            </section>
            <section className="mt-8" aria-labelledby="release-content">
              <h2 id="release-content" className="mb-5 text-sm">
                About the release
              </h2>
              <RichText
                body={release.body}
                format={release.bodyFormat}
                className="release-body max-w-2xl text-sm leading-[1.5] text-neutral-300"
              />
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
