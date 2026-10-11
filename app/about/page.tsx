import type { Metadata } from "next";
import Footer from "components/layout/footer";
import { aboutImageUrl, getPublishedAbout } from "lib/content/about";

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
      <article className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
        <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#b7a2ef]">
          Error404
        </p>
        <h1 className="mb-8 text-4xl font-medium tracking-tight md:text-6xl">
          {content?.title || "About"}
        </h1>
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
            <div className="max-w-2xl space-y-6 text-base font-light leading-8 text-neutral-300">
              {content.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
            </div>
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
