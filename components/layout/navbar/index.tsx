import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import NavLink from "./nav-link";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const pages = [
    { title: "Home", path: "/" },
    { title: "Shop", path: "/shop" },
    { title: "Events", path: "/events" },
    { title: "Interviews", path: "/interviews" },
    { title: "About", path: "/about" },
  ];
  const menu = pages;

  return (
    <nav aria-label="Main navigation" className="site-header">
      <div className="site-header-menu-toggle">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>
      <Link href="/" aria-label="Error404 home" className="site-header-logo">
        <LogoSquare />
      </Link>
      <ul className="site-header-links header-menu-type">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              href={item.path}
              className="text-neutral-400 hover:text-white"
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="site-header-search">
        <Suspense fallback={<SearchSkeleton expandable />}>
          <Search expandable />
        </Suspense>
      </div>
      <div className="site-header-cart">
        <CartModal />
      </div>
    </nav>
  );
}
