import clsx from "clsx";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  const labelBelow = label && label.position !== "center";

  return (
    <div
      className={clsx(
        "group flex h-full w-full overflow-hidden rounded-lg bg-white dark:bg-black",
        {
          relative: label,
          "flex-col items-stretch justify-start": labelBelow,
          "items-center justify-center": !labelBelow,
          "border-2 border-[#8D75D5]": active,
        },
      )}
    >
      <div
        className={clsx(
          "relative w-full overflow-hidden",
          labelBelow ? "aspect-square shrink-0" : "h-full",
        )}
      >
        {props.src ? (
          <Image
            className={clsx("relative h-full w-full object-cover", {
              "transition duration-300 ease-in-out group-hover:scale-105":
                isInteractive,
            })}
            {...props}
          />
        ) : null}
      </div>
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
