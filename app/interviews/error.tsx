"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="content-shell py-16">
      <h1 className="text-2xl">Content is temporarily unavailable</h1>
      <p className="mt-4 text-neutral-400">Please try again in a moment.</p>
      <button onClick={reset} className="content-button mt-6">
        Try again
      </button>
    </div>
  );
}
