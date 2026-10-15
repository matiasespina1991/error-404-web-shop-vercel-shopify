"use client";
import { microgramma } from "lib/fonts";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
export function ContentRail({
  title,
  children,
  link,
}: {
  title: string;
  children: ReactNode;
  link: ReactNode;
}) {
  const id = useId(),
    rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () =>
      setEdges({
        start: element.scrollLeft < 2,
        end:
          element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
      });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, []);
  function move(direction: number) {
    const element = rail.current;
    if (!element) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    element.scrollBy({
      left: direction * element.clientWidth * 0.85,
      behavior: reduced ? "instant" : "smooth",
    });
  }
  return (
    <section aria-labelledby={`${id}-title`} className="content-section">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id={`${id}-title`}
            className="section-title carousel-title"
            style={{ fontFamily: microgramma.style.fontFamily, fontWeight: 500 }}
          >
            {title}
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-300">
          {link}
          <div className="flex gap-1">
            <button
              className="rail-arrow"
              aria-label={`Previous ${title}`}
              aria-controls={id}
              disabled={edges.start}
              onClick={() => move(-1)}
            >
              <ArrowLeftIcon className="size-5" />
            </button>
            <button
              className="rail-arrow"
              aria-label={`Next ${title}`}
              aria-controls={id}
              disabled={edges.end}
              onClick={() => move(1)}
            >
              <ArrowRightIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <ul
          id={id}
          ref={rail}
          tabIndex={0}
          aria-label={title}
          className="content-rail"
        >
          {children}
        </ul>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-black to-transparent"
        />
      </div>
    </section>
  );
}
