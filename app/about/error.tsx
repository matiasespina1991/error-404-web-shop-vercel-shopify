"use client";
export default function AboutError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-4 text-3xl">About</h1>
      <p className="mb-6 text-neutral-400">
        We couldn’t load this page. Please try again.
      </p>
      <button
        className="rounded-full bg-[#8d75d5] px-5 py-3 text-white"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
