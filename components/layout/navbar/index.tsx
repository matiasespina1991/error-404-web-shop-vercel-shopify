import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { siteNavigation } from "lib/navigation";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import NavLink from "./nav-link";
import ScrollHeader from "./scroll-header";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const menu = siteNavigation;

  return (
    <ScrollHeader>
      <nav aria-label="Main navigation" className="site-header">
        <div className="site-header-menu-toggle">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <ul className="site-header-links header-menu-type header-nav-type">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink href={item.path} className="text-neutral-400">
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link href="/" aria-label="Error404 home" className="site-header-logo">
          <LogoSquare />
        </Link>
        <div className="site-header-actions">
          <div className="site-header-search">
            <Suspense fallback={<SearchSkeleton expandable />}>
              <Search expandable />
            </Suspense>
          </div>
          <div className="site-header-cart">
            <CartModal />
          </div>
        </div>
      </nav>
    </ScrollHeader>
  );
}
