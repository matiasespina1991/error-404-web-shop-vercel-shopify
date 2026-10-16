"use client";
import { BrandHeading } from "components/content/brand-heading";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useId, useState, type FormEvent } from "react";

export function Newsletter() {
  const id = useId();
  const [notice, setNotice] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The newsletter provider has not been connected yet. Never report a fake signup.
    setNotice("Subscriptions aren't available yet. Please check back soon.");
  }

  return (
    <section className="content-section" aria-labelledby={`${id}-title`}>
      <div className="flex flex-col items-center gap-5 border-t border-white/15 pt-12 pb-10 text-center md:pt-16 md:pb-12">
        <div>
          <BrandHeading as="h2" id={`${id}-title`} className="newsletter-title">
            Join our newsletter
          </BrandHeading>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
            New records, interviews and the next gathering. Straight to your
            inbox.
          </p>
        </div>
        <form onSubmit={subscribe} className="w-full max-w-xs">
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <div className="flex flex-col gap-2">
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              required
              maxLength={254}
              aria-describedby={`${id}-notice`}
              className="h-10 w-full rounded-md border border-white/25 bg-transparent px-3 py-2 text-center text-sm text-white placeholder:text-neutral-400"
            />
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#b7a2ef] px-3 py-2 text-sm font-medium text-black hover:bg-[#c7b4fa]"
            >
              Subscribe <ArrowRightIcon aria-hidden="true" className="size-4" />
            </button>
          </div>
          <p
            id={`${id}-notice`}
            role="status"
            className="mt-3 text-xs leading-relaxed text-neutral-400"
          >
            {notice || "Sign-up coming soon."}
          </p>
        </form>
      </div>
    </section>
  );
}
