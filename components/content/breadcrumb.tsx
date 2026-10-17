import Link from "next/link";
import { dax } from "lib/fonts";

const MAX_TITLE_CHARACTERS = 65;

export function ContentBreadcrumb({
  section,
  href,
  title,
}: {
  section: string;
  href: string;
  title: string;
}) {
  const fullTitle = title.toUpperCase();
  const characters = Array.from(fullTitle);
  const displayTitle =
    characters.length > MAX_TITLE_CHARACTERS
      ? `${characters.slice(0, MAX_TITLE_CHARACTERS).join("").trimEnd()}…`
      : fullTitle;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${dax.className} text-base text-[#979797] uppercase`}
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-white">
            ERROR404
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href={href} className="hover:text-white">
            {section.toUpperCase()}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" title={fullTitle} aria-label={fullTitle}>
          {displayTitle}
        </li>
      </ol>
    </nav>
  );
}
