import Grid from "@mui/material/Grid2";
import React, { useMemo } from "react";
import OrderDiscounts from "./OrderDiscounts";
import OrderPayment from "./OrderPayment";
import OrderRow from "./OrderRow";
import OrderShipping from "./OrderShipping";
import OrderTotalRow from "./OrderTotalRow";
import currency from "currency.js";
import OrderTaxes from "./OrderTaxes";
import { IDetailedOrder } from "../../@types/order";
import { OrderItemType } from "../../@types/newTypes/newTypes";

export default function OrderItems({ order }: { order: OrderItemType }) {
  const { orderItems, total } = order;

  const totalQty = useMemo(() => {
    let total = 0;
    orderItems.forEach((val) => {
      total = total + val.qty;
    });

    return total;
  }, [orderItems]);

  // const hasTaxes = order.tax_amount !== null;
  // const showSubtotal =
  //   order.services?.length ||
  //   order.discounts.length ||
  //   order.paymentMethod ||
  //   hasTaxes;

  // const itemsSubTotal = useMemo(() => {
  //   let totalQty = 0,
  //     totalPrice = "0";
  //   items.forEach(({ qty, total_price }) => {
  //     totalQty += qty;
  //     totalPrice = currency(total_price || 0)
  //       .add(totalPrice)
  //       .toString();
  //   });
  //   return { totalQty, totalPrice };
  // }, [items]);

  return (
    <>
      <div className="bdl-order-items">
        <Grid container className="bdl-order-items__thead">
          <Grid
            size={{ xs: 12, sm: 6 }}
            className="bdl-order-items__thead-cell"
          ></Grid>
          <Grid
            size={{ xs: 12, sm: 2 }}
            className="bdl-order-items__thead-cell"
          >
            Price
          </Grid>
          <Grid
            size={{ xs: 12, sm: 2 }}
            className="bdl-order-items__thead-cell"
          >
            Qty
          </Grid>
          <Grid
            size={{ xs: 12, sm: 2 }}
            className="bdl-order-items__thead-cell"
          >
            Total
          </Grid>
        </Grid>
        {orderItems.map((item) => (
          <OrderRow item={item} key={item.id} />
        ))}
        {/* {showSubtotal && (
          <OrderTotalRow
            price={itemsSubTotal.totalPrice}
            qty={itemsSubTotal.totalQty}
            isSubTotal
          />
        )} */}
        {/* <OrderDiscounts order={order} />
        {order.paymentMethod && <OrderPayment order={order} />}
        {hasTaxes && <OrderTaxes order={order} />} */}
        {total && <OrderTotalRow price={total} qty={totalQty} />}
        <OrderShipping order={order} />
      </div>
    </>
  );
}
