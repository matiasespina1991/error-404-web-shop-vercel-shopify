"use client";

import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function RecordPlayer({
  title,
  duration,
}: {
  title: string;
  duration?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="pb-5" aria-label={`${title} player`}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
          aria-pressed={isPlaying}
          onClick={() => setIsPlaying((playing) => !playing)}
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#8D75D5] text-white transition-opacity hover:opacity-85"
        >
          {isPlaying ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="ml-0.5 h-5 w-5" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-neutral-400">
            <span>{isPlaying ? "Now playing" : "Listen preview"}</span>
            <span>
              {isPlaying ? "0:42" : "0:00"}
              {duration ? ` / ${duration}` : ""}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-neutral-800">
            <div
              className={`h-full bg-[#8D75D5] transition-all ${isPlaying ? "w-[18%]" : "w-0"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
