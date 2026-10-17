import Link from "next/link";

import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import { siteNavigation } from "lib/navigation";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");

  return (
    <footer className="header-menu-type text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 border-t border-neutral-200 px-6 py-12 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link
            className="flex items-center gap-2 pl-1 pt-0 text-black dark:text-white"
            href="/"
          >
            <LogoSquare size="sm" />
          </Link>
        </div>
        <FooterMenu menu={siteNavigation} />
      </div>
      <div className="border-t border-neutral-200 py-6 dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p className="footer-copyright">
            &copy; {copyrightDate}. All rights reserved. Error404
            <sup className="text-[0.65em]">®</sup>.
          </p>
        </div>
      </div>
    </footer>
  );
}
