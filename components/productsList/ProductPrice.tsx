import clsx from "clsx";
import { getPriceForTpl } from "../../lib/product";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { IFinalPrice } from "../../@types/price";
import { ListPrice } from "../../@types/newTypes/newTypes";

export default function ProductPrice({
  price,
  className = "products__price",
}: {
  price: ListPrice;
  className?: string;
}) {
  // const tplPrice = getPriceForTpl(price);
  const { formatRupiah } = useFormatCurrency();

  // if (tplPrice.price === null) return null;

  return (
    <div className={className}>
      {/* {tplPrice.isFrom && <span className={"from"}>From:</span>}
      {tplPrice.oldPrice && (
        <s className={"old"}>{formatCurrency(tplPrice.oldPrice)}</s>
      )} */}
      <span className={clsx("current", { "has-old": false })}>
        {formatRupiah(price.price)}
      </span>
    </div>
  );
}
