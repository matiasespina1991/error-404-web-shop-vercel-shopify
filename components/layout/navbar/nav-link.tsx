"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export default function NavLink({
  href,
  className = "",
  showActiveUnderline = true,
  highlightActive = true,
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  showActiveUnderline?: boolean;
  highlightActive?: boolean;
}) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`)) ||
    (href === "/shop" &&
      (pathname === "/search" ||
        pathname.startsWith("/search/") ||
        pathname.startsWith("/product/")));

  return (
    <Link
      {...props}
      href={href}
      aria-current={active ? "page" : undefined}
      className={`nav-menu-link ${className} decoration-[0.6px] underline-offset-4 ${active && highlightActive ? "text-white" : ""} ${active && showActiveUnderline ? "underline" : "no-underline"}`}
    />
  );
}
