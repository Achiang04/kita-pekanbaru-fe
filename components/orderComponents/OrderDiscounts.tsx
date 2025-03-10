import React from "react";
import Grid from "@mui/material/Grid2";
import {
  IDetailedOrder,
  IOrderDiscount,
  TDiscountType,
} from "../../@types/order";
import PercentIcon from "@mui/icons-material/Percent";
import useFormatCurrency from "../../hooks/useFormatCurrency";

export default function OrderDiscounts({ order }: { order: IDetailedOrder }) {
  const { formatCurrency } = useFormatCurrency();
  const discounts = order.discounts;

  if (!discounts.length) return null;

  const getDiscountTitleWithAmount = (discount: IOrderDiscount) => {
    if (discount.discount_type === TDiscountType.percent)
      return `${discount.title} (${discounts[0].value}%)`;

    return discount.title;
  };

  return (
    <div className="bdl-order-items__service-row">
      <h5 className="bdl-order-items__service-heading">
        <PercentIcon
          className="bdl-order-items__service-ico"
          fontSize="small"
        />
        Discounts
      </h5>
      <Grid container>
        <Grid
          size={{ sm: 8, xs: 12 }}
          className="bdl-order-items__service-cell bdl-order-items__service-cell_title"
        >
          {discounts.map((discount) => (
            <div key={discount.discount_id}>
              {getDiscountTitleWithAmount(discount)}
            </div>
          ))}
        </Grid>
        <Grid
          size={{ sm: 2, xs: 12 }}
          className="bdl-order-items__service-cell"
        ></Grid>
        <Grid
          size={{ sm: 2, xs: 12 }}
          className="bdl-order-items__service-cell"
        >
          <span className="bdl-order-items__label">Total:</span>
          {order.discount_for_order && (
            <span className="bdl-order-items__value">
              -{formatCurrency(order.discount_for_order)}
            </span>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
