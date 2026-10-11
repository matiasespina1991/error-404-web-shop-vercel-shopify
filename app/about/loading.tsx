export default function AboutLoading() {
  return (
    <div
      role="status"
      aria-label="Loading About"
      className="content-shell pb-20"
    >
      <div
        aria-hidden="true"
        className="animate-pulse motion-reduce:animate-none"
      >
        <div className="mb-8 h-12 w-2/3 rounded bg-neutral-800" />
        <div className="mb-4 h-6 w-full rounded bg-neutral-800" />
        <div className="mb-10 h-6 w-3/4 rounded bg-neutral-800" />
        <div className="aspect-[3/2] w-full rounded bg-neutral-900" />
      </div>
    </div>
  );
}
