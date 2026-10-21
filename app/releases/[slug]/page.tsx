import { BrandHeading } from "components/content/brand-heading";
import { ContentBreadcrumb } from "components/content/breadcrumb";
import { RichText } from "components/content/rich-text";
import { DiscIcon } from "components/icons/disc";
import { LinkArrow } from "components/icons/link-arrow";
import Footer from "components/layout/footer";
import { ReleaseTrackPlayer } from "components/releases/track-player";
import { contentImageUrl, getContentEntry } from "lib/content/feed";
import { releaseFormatLabel } from "lib/content/releases";
import { notFound } from "next/navigation";

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
  const separator = release.title.indexOf(" - ");
  const producer = release.title.slice(0, separator).trim();
  const title = release.title.slice(separator + 3).trim();
  return (
    <>
      <article className="content-shell pb-16">
        <ContentBreadcrumb
          section="Releases"
          href="/releases"
          title={release.title}
        />
        <div className="mt-4 grid items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <div className="w-full max-w-md space-y-4 pt-[0.7rem]">
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
              {separator > 0 && producer && title ? (
                <>
                  <span className="block leading-[2.3rem]">{producer}</span>
                  <span className="block leading-[2.3rem]">{title}</span>
                </>
              ) : (
                release.title
              )}
            </BrandHeading>

            <dl className="mt-2 space-y-2 text-sm">
              {release.genres.length > 0 && (
                <div className="flex gap-3">
                  <dt className="text-neutral-400">Genres</dt>
                  <dd>{release.genres.join(" / ")}</dd>
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <dt>
                  <span className="sr-only">Format</span>
                  <DiscIcon className="size-4 text-neutral-400" />
                </dt>
                <dd className="text-neutral-400">
                  {releaseFormatLabel(release.format)}
                </dd>
              </div>

              <section className="mt-5" aria-labelledby="release-content">
                <RichText
                  body={release.body}
                  format={release.bodyFormat}
                  className="release-body max-w-2xl text-base leading-[1.5] text-neutral-300"
                />
              </section>
            </dl>
            {release.purchaseUrl && (
              <a
                href={release.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="content-button mt-6"
                style={{ color: "#fff" }}
              >
                Buy release <LinkArrow />
              </a>
            )}
            <section className="mt-8" aria-labelledby="release-tracklist">
              <h2 id="release-tracklist" className="mb-2 text-sm">
                Tracklist
              </h2>
              <ReleaseTrackPlayer tracks={release.tracks} />
            </section>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
