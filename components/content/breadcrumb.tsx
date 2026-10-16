import Link from "next/link";

export function ContentBreadcrumb({
  section,
  href,
  title,
}: {
  section: string;
  href: string;
  title: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-neutral-400">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="hover:text-white">
            Error404
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href={href} className="hover:text-white">
            {section}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-neutral-200">
          {title}
        </li>
      </ol>
    </nav>
  );
}
