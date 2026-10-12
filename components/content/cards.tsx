import { RichText } from "./rich-text";
import type { BodyFormat } from "lib/content/rich-text-format";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { contentImageUrl } from "lib/content/feed";
import type { InterviewContent } from "lib/content/entries";
export function InterviewCard({
  entry,
  compact = false,
}: {
  entry: InterviewContent;
  compact?: boolean;
}) {
  return (
    <Link href={`/interviews/${entry.slug}`} className="group block h-full">
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-neutral-900">
        {entry.cover && (
          <img
            src={contentImageUrl(entry.cover.id)}
            alt={entry.cover.alt}
            loading="lazy"
            width={800}
            height={600}
            className="size-full object-cover transition-opacity group-hover:opacity-80"
          />
        )}
      </div>
      <div className={compact ? "pt-3" : "pt-4"}>
        <p className="content-eyebrow">
          {entry.category} / {entry.artist}
        </p>
        <h3
          className={`mt-2 flex items-start justify-between gap-3 font-medium tracking-tight ${compact ? "text-sm" : "text-xl"}`}
        >
          {entry.title}
          <ArrowUpRightIcon
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-neutral-400"
          />
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-neutral-400 ${compact ? "line-clamp-2" : ""}`}
        >
          {entry.summary}
        </p>
      </div>
    </Link>
  );
}
export function Paragraphs({
  text,
  format,
}: {
  text: string;
  format?: BodyFormat;
}) {
  return (
    <RichText
      body={text}
      format={format}
      className="text-base leading-8 font-normal text-neutral-300"
    />
  );
}
