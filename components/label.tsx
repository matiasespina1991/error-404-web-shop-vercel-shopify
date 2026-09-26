import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div
      className={clsx("flex w-full @container/label", {
        grow: position === "bottom",
        "absolute bottom-0 left-0 px-4 pb-4 lg:px-20 lg:pb-[35%]":
          position === "center",
      })}
    >
      <div className="flex w-full items-start gap-3 bg-[#171717] p-[0.844rem] text-xs font-normal leading-snug text-neutral-200">
        <h3 className="min-w-0 grow line-clamp-3 font-normal leading-snug text-[0.85rem] tracking-normal">
          {title}
        </h3>
        <Price
          className="flex-none font-light tabular-nums text-neutral-300"
          amount={amount}
          currencyCode={currencyCode}
          // currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
