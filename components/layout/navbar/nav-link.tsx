"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export default function NavLink({
  href,
  className = "",
  ...props
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string }) {
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
      className={`${className} decoration-[1px] underline-offset-4 ${active ? "underline" : "no-underline"}`}
    />
  );
}
