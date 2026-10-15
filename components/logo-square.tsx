import clsx from "clsx";
import Image from "next/image";
import logoHeader from "../input/logo_header.png";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx("relative flex flex-none items-center justify-center", {
        "h-[48px] w-[144px] md:h-[60px] md:w-[180px]": !size,
        "h-[30px] w-[85px]": size === "sm",
      })}
    >
      <Image
        src={logoHeader}
        alt=""
        fill
        priority={!size}
        sizes={size ? "85px" : "(min-width: 768px) 180px, 144px"}
        className="object-contain"
      />
    </div>
  );
}
