"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedIndex = Number(searchParams.get("image") ?? 0);
  const imageIndex =
    Number.isInteger(requestedIndex) &&
    requestedIndex >= 0 &&
    requestedIndex < images.length
      ? requestedIndex
      : 0;
  const selectedImage = images[imageIndex];

  const updateImage = (index: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("image", index.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full max-w-[420px]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-neutral-100">
        {selectedImage && (
          <Image
            className="object-contain"
            fill
            sizes="(min-width: 640px) 420px, 100vw"
            alt={selectedImage.altText}
            src={selectedImage.src}
            priority
          />
        )}
      </div>

      {images.length > 1 ? (
        <ul className="mt-4 flex flex-wrap items-start justify-start gap-4">
          {images.map((image, index) => (
            <li key={image.src} className="h-20 w-20 sm:h-[106px] sm:w-[106px]">
              <button
                type="button"
                onClick={() => updateImage(index)}
                aria-label={`View product image ${index + 1}: ${image.altText}`}
                aria-pressed={index === imageIndex}
                className={`relative block h-full w-full cursor-pointer border bg-white/15 transition-opacity hover:opacity-80 ${index === imageIndex ? "border-white/40" : "border-white/15"}`}
              >
                <Image
                  alt={image.altText}
                  src={image.src}
                  fill
                  sizes="(min-width: 640px) 106px, 80px"
                  className="object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
