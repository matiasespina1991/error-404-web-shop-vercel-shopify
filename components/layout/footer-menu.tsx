import type { Menu } from "lib/shopify/types";
import NavLink from "./navbar/nav-link";

export function FooterMenuItem({ item }: { item: Menu }) {
  return (
    <li>
      <NavLink
        href={item.path}
        className="inline-block py-1 leading-tight text-neutral-200 hover:text-white"
        style={{ textDecoration: "none" }}
      >
        {item.title}
      </NavLink>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;
  return (
    <nav aria-label="Footer navigation">
      <ul className="header-menu-type md:grid md:grid-flow-col md:grid-rows-3 md:gap-x-10">
        {menu.map((item) => (
          <FooterMenuItem key={item.path} item={item} />
        ))}
      </ul>
    </nav>
  );
}
