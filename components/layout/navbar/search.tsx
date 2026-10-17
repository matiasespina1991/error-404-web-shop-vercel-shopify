"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export default function Search({
  expandable = false,
}: {
  expandable?: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const query = searchParams?.get("q") || "";
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, query]);

  useEffect(() => {
    if (!expandable || !open) return;
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [expandable, open]);

  function close() {
    setOpen(false);
    requestAnimationFrame(() => toggle.current?.focus());
  }

  return (
    <div
      ref={container}
      className={expandable ? "header-search-control" : "relative w-full"}
      data-open={expandable && open}
      onKeyDown={(event) => {
        if (expandable && event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
      }}
    >
      {expandable && !open ? (
        <button
          ref={toggle}
          type="button"
          className="header-search-toggle"
          aria-label="Open product search"
          aria-expanded={false}
          aria-controls={id}
          onClick={() => setOpen(true)}
        >
          <MagnifyingGlassIcon className="size-[22px]" aria-hidden="true" />
        </button>
      ) : (
        <Form
          id={id}
          action="/search"
          role="search"
          className="relative w-full"
        >
          <input
            ref={input}
            key={query}
            aria-label="Search for products"
            type="search"
            name="q"
            placeholder="Search for products..."
            autoComplete="off"
            defaultValue={query}
            className="header-search-input"
            style={{ paddingRight: expandable ? "5.75rem" : "3.25rem" }}
          />
          <div className="absolute inset-y-0 right-1 flex items-center">
            <button
              type="submit"
              aria-label="Search"
              className="header-search-toggle"
            >
              <MagnifyingGlassIcon className="size-[22px]" aria-hidden="true" />
            </button>
            {expandable && (
              <button
                type="button"
                onClick={close}
                aria-label="Close product search"
                className="header-search-toggle"
              >
                <XMarkIcon className="size-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export function SearchSkeleton({
  expandable = false,
}: {
  expandable?: boolean;
}) {
  if (expandable) {
    return (
      <div className="header-search-control" aria-hidden="true">
        <span className="header-search-toggle">
          <MagnifyingGlassIcon className="size-[22px]" />
        </span>
      </div>
    );
  }
  return (
    <div className="relative w-full" aria-hidden="true">
      <div className="header-search-input text-neutral-400">
        Search for products...
      </div>
    </div>
  );
}
