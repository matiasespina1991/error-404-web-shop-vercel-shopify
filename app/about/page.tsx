import { BrandHeading } from "components/content/brand-heading";
import { RichText } from "components/content/rich-text";
import Footer from "components/layout/footer";
import { aboutImageUrl, getPublishedAbout } from "lib/content/about";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedAbout();
  return {
    title: content?.title || "About",
    description: content?.seoDescription || content?.intro || "About Error404.",
    robots: content
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function AboutPage() {
  const content = await getPublishedAbout();
  return (
    <>
      <article className="content-shell pb-20 ">
        <BrandHeading as="h1" variant="page" className="mb-6">
          {content?.title || "About"}
        </BrandHeading>
        {content ? (
          <>
            <p className="mb-10 max-w-3xl whitespace-pre-line text-xl font-light leading-relaxed text-neutral-300 md:text-2xl">
              {content.intro}
            </p>
            {content.imageId && (
              <img
                src={aboutImageUrl(content.imageId)}
                alt={content.imageAlt}
                className="mb-12 max-h-[650px] w-full rounded-md object-contain"
              />
            )}
            <RichText
              body={content.body}
              format={content.bodyFormat}
              className="max-w-2xl text-base font-normal leading-[1.5] text-neutral-300"
            />
          </>
        ) : (
          <p className="text-neutral-400">
            More about Error404 will be available here soon.
          </p>
        )}
      </article>
      <Footer />
    </>
  );
}
