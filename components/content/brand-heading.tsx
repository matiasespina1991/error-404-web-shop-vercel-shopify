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
  const font = microgramma;
  return (
    <Tag
      {...props}
      className={`${font.className} ${variant === "page" ? "content-title" : "section-title"} ${className}`}
      style={{
        ...style,
        fontFamily: font.style.fontFamily,
        letterSpacing: "0.03em",
      }}
    />
  );
}
