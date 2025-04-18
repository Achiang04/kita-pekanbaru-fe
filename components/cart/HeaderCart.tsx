import Link from "next/link";
import { useCart } from "../../hooks/cart";
import clsx from "clsx";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { useGetCartItemQuery } from "../../services/cart";

export default function HeaderCart({ className }: { className?: string }) {
  const { total } = useCart();
  const { data } = useGetCartItemQuery(undefined);
  const { formatCurrency } = useFormatCurrency();
  const isEmpty = !total || !total.qty;
  const isDoubleQty = total?.qty && total?.qty > 9 ? true : false;

  return (
    <Link
      href={"/cart"}
      className={clsx(
        "cart-header",
        {
          "cart-header_empty": isEmpty,
          "cart-header_active": !isEmpty,
        },
        className
      )}
    >
      <span className={"cart-header__icon"} />
      <b
        className={clsx("cart-header__qty", {
          "cart-header__qty_double": isDoubleQty,
        })}
      >
        {data?.length}
      </b>
      {/* <div className={"cart-header__total"}>
        {formatCurrency(total?.total || 0)}
      </div> */}
    </Link>
  );
}
