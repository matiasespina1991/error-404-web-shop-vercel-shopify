import { SkeletonTransition } from "components/content/loading-transition";

export default function Loading() {
  return (
    <SkeletonTransition
      role="status"
      aria-label="Loading content"
      className="content-shell pb-20"
    >
      <div className="h-14 w-1/2 animate-pulse rounded bg-neutral-900" />
      <div className="mt-10 h-72 animate-pulse rounded bg-neutral-900" />
      <span className="sr-only">Loading…</span>
    </SkeletonTransition>
  );
}
