function Placeholder({ className }: { className: string }) {
  return <div className={`rounded bg-neutral-900 ${className}`} />;
}

export default function ReleaseLoading() {
  return (
    <div role="status" className="content-shell pb-16">
      <span className="sr-only">Loading release</span>
      <div
        aria-hidden="true"
        className="animate-pulse motion-reduce:animate-none"
      >
        <Placeholder className="h-5 w-1/2 max-w-md" />
        <div className="mt-4 grid items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <Placeholder className="aspect-square w-full max-w-md rounded-md" />
          <div className="min-w-0">
            <div className="space-y-2">
              <Placeholder className="h-8 w-1/2 md:h-10" />
              <Placeholder className="h-8 w-5/6 md:h-10" />
            </div>
            <div className="mt-5 max-w-2xl space-y-2">
              <Placeholder className="h-4 w-full" />
              <Placeholder className="h-4 w-3/4" />
            </div>
            <Placeholder className="mt-5 h-5 w-28" />
            <div className="mt-8">
              <Placeholder className="mb-5 h-5 w-28" />
              <div className="space-y-1">
                {["w-3/4", "w-1/2", "w-2/3"].map((width) => (
                  <div key={width} className="flex items-center gap-4 py-1">
                    <Placeholder className="h-3 w-9 shrink-0" />
                    <Placeholder className={`h-4 ${width}`} />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <Placeholder className="mb-5 h-5 w-44" />
              <div className="max-w-2xl space-y-2.5">
                <Placeholder className="h-3 w-full" />
                <Placeholder className="h-3 w-11/12" />
                <Placeholder className="h-3 w-full" />
                <Placeholder className="h-3 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
