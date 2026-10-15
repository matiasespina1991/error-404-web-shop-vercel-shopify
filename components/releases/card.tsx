import Link from "next/link";
import type { ReleaseContent } from "lib/content/entries";
import { contentImageUrl } from "lib/content/feed";
import { releaseFormatLabel } from "lib/content/releases";

export function ReleaseCard({
  release,
  splitTitle = false,
}: {
  release: ReleaseContent;
  splitTitle?: boolean;
}) {
  const separator = release.title.indexOf(" - ");
  const artist = release.title.slice(0, separator).trim();
  const title = release.title.slice(separator + 3).trim();
  return (
    <Link
      href={`/releases/${release.slug}`}
      className="group flex h-full flex-col"
    >
      <div className="aspect-square overflow-hidden rounded-md bg-neutral-900">
        {release.cover && (
          <img
            src={contentImageUrl(release.cover.id)}
            alt={release.cover.alt}
            width={600}
            height={600}
            loading="lazy"
            className="size-full object-cover transition-opacity group-hover:opacity-80"
          />
        )}
      </div>
      <div className="pt-3">
        <h3 className="line-clamp-3 text-sm font-medium">
          {splitTitle && separator > 0 && artist && title ? (
            <>
              <span className="block text-left">{artist}</span>
              <span className="block text-left">{title}</span>
            </>
          ) : (
            release.title
          )}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          {releaseFormatLabel(release.format)}
          {release.genres.length ? ` · ${release.genres.join(" / ")}` : ""}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-400">
          {release.summary}
        </p>
      </div>
    </Link>
  );
}
