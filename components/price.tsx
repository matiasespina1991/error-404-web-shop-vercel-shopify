import { eurostileMedium } from "lib/fonts";

const Price = ({
  amount,
  className,
  currencyCode = "EUR",
}: {
  amount: string;
  className?: string;
  currencyCode?: string;
} & React.ComponentProps<"p">) => (
  <p
    suppressHydrationWarning
    style={{ fontWeight: 500 }}
    className={`${eurostileMedium.className} ${className || ""}`}
  >
    {new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount))}{" "}
    {currencyCode === "EUR" ? "€" : currencyCode}
  </p>
);

export default Price;
