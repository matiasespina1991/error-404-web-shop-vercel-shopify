import type { Menu } from "lib/shopify/types";
import NavLink from "./navbar/nav-link";

export function FooterMenuItem({ item }: { item: Menu }) {
  return (
    <li>
      <NavLink
        href={item.path}
        className="inline-block py-1 leading-tight text-neutral-400"
        showActiveUnderline={false}
      >
        {item.title}
      </NavLink>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;
  return (
    <nav aria-label="Footer navigation" className="pt-[0.1rem]">
      <ul className="md:grid md:grid-flow-col md:grid-rows-3 md:gap-x-10">
        {menu.map((item) => (
          <FooterMenuItem key={item.path} item={item} />
        ))}
      </ul>
    </nav>
  );
}
