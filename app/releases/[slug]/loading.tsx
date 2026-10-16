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
        <div className="flex h-[1.5em] items-center text-base">
          <Placeholder className="h-[1em] w-1/2 max-w-md" />
        </div>
        <div className="mt-4 grid items-start gap-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
          <div className="w-full max-w-md pt-[0.7rem]">
            <Placeholder className="aspect-square w-full rounded-md" />
          </div>
          <div className="min-w-0">
            <div className="content-title">
              <div className="flex h-[1.6rem] items-center">
                <Placeholder className="h-[0.8em] w-1/2" />
              </div>
              <div className="flex h-[1.6rem] items-center">
                <Placeholder className="h-[0.8em] w-5/6" />
              </div>
            </div>
            <div className="mt-5 max-w-2xl">
              <div className="flex h-[1.375rem] items-center">
                <Placeholder className="h-4 w-full" />
              </div>
              <div className="flex h-[1.375rem] items-center">
                <Placeholder className="h-4 w-3/4" />
              </div>
            </div>
            <Placeholder className="mt-5 h-5 w-28" />
            <div className="mt-8">
              <Placeholder className="mb-2 h-5 w-28" />
              <div className="space-y-1">
                {["w-3/4", "w-1/2", "w-2/3"].map((width) => (
                  <div key={width} className="flex h-5 items-center gap-1">
                    <Placeholder className="h-3 w-5 shrink-0" />
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
