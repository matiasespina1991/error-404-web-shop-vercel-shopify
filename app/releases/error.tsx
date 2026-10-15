"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="content-shell pb-16">
      <h1 className="content-title">Releases</h1>
      <p role="alert" className="my-5 text-sm text-neutral-400">
        Releases are temporarily unavailable.
      </p>
      <button type="button" onClick={reset} className="content-button">
        Try again
      </button>
    </section>
  );
}
