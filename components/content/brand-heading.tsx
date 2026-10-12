import { microgramma } from "lib/fonts";
import type { HTMLAttributes } from "react";

export function BrandHeading({
  as: Tag = "h2",
  variant = "section",
  className = "",
  style,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2";
  variant?: "section" | "page";
}) {
  return (
    <Tag
      {...props}
      className={`${microgramma.className} ${variant === "page" ? "content-title" : "section-title"} ${className}`}
      style={{
        ...style,
        fontFamily: microgramma.style.fontFamily,
        letterSpacing: "0.03em",
      }}
    />
  );
}
