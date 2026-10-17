import clsx from "clsx";
import Image from "next/image";
import logoHeader from "../input/logo_header.png";

export default function LogoSquare({
  size,
}: {
  size?: "sm" | "lg" | undefined;
}) {
  return (
    <div
      className={clsx("relative flex flex-none items-center justify-center", {
        "h-[48px] w-[144px] md:h-[60px] md:w-[180px]": !size,
        "h-[30px] w-[85px]": size === "sm",
        "h-[86.4px] w-[259.2px] md:h-[108px] md:w-[324px]": size === "lg",
      })}
    >
      <Image
        src={logoHeader}
        alt=""
        fill
        priority={!size}
        sizes={
          size === "sm"
            ? "85px"
            : size === "lg"
              ? "(min-width: 768px) 324px, 260px"
              : "(min-width: 768px) 180px, 144px"
        }
        className="object-contain"
      />
    </div>
  );
}
