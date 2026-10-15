export default function Loading() {
  return (
    <div role="status" className="content-shell pb-16">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-neutral-900 motion-reduce:animate-none" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="aspect-square animate-pulse rounded-md bg-neutral-900 motion-reduce:animate-none"
          />
        ))}
      </div>
      <span className="sr-only">Loading releases</span>
    </div>
  );
}
