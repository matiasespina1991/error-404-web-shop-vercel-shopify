import clsx from "clsx";
import Image from "next/image";
import logoHeader from "../input/logo_header.png";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <div
      className={clsx("relative flex flex-none items-center justify-center", {
        "h-[40px] w-[120px]": !size,
        "h-[30px] w-[85px]": size === "sm",
      })}
    >
      <Image
        src={logoHeader}
        alt=""
        fill
        priority={!size}
        sizes={size ? "85px" : "120px"}
        className="object-contain"
      />
    </div>
  );
}
