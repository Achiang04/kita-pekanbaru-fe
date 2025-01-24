import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import clsx from "clsx";
import CheckoutCartItems from "./CheckoutCartItems";
import CheckoutCartFooter from "./CheckoutCartFooter";
import CheckoutCartDiscountForm from "./CheckoutCartDiscountForm";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { IOrder } from "../../@types/order";
import { ITotal } from "../../@types/total";
import { cartCheckoutTotalDummy, cartOrder } from "../../dummy/data";

export default function CheckoutCart() {
  // TODO : integrate with real data
  const order: IOrder = cartOrder;
  const total: ITotal = cartCheckoutTotalDummy;
  const hasCouponCampaigns = false;

  const [fullOpened, setFullOpened] = useState(false);
  const { formatCurrency } = useFormatCurrency();

  const hasDisounts = order?.discounts && order?.discounts?.length > 0;

  const toggleCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    setFullOpened((prev) => !prev);
  };

  return (
    <div className="bdl-cart">
      <div className="bdl-cart__short">
        <a href="#" className="bdl-cart__show-summary" onClick={toggleCollapse}>
          <ShoppingCartIcon sx={{ fontSize: 16 }} />
          {fullOpened ? (
            <>
              Hide order summary
              <ExpandLess fontSize="small" />
            </>
          ) : (
            <>
              Show order summary
              <ExpandMore fontSize="small" />
            </>
          )}
        </a>
        <h4 className="bdl-cart__total">
          {total && formatCurrency(total.price)}
        </h4>
      </div>
      <div className={clsx("bdl-cart__full", { open: fullOpened })}>
        <CheckoutCartItems />
      </div>
      {hasCouponCampaigns && !hasDisounts && (
        <div className="bdl-cart__discount">
          <CheckoutCartDiscountForm />
        </div>
      )}
      <CheckoutCartFooter open={fullOpened} />
    </div>
  );
}
