import React from "react";
import currency from "currency.js";
import Grid from "@mui/material/Grid2";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { IOrderItem } from "../../@types/order";
import { OrderItem } from "../../@types/newTypes/newTypes";

export default function OrderRow({ item }: { item: OrderItem }) {
  const { formatRupiah } = useFormatCurrency();

  return (
    <>
      <Grid className="bdl-order-item" container>
        <Grid
          className="bdl-order-item__description-col"
          size={{ sm: 6, xs: 12 }}
        >
          {item.product.medias ? (
            <div className="bdl-order-item__img">
              <img
                src={item.product.medias[0].fileUrl}
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className="bdl-order-item__img no-image" />
          )}
          <div className="bdl-order-item__title">
            <div className="bdl-order-item__title-row">{item.product.name}</div>
          </div>
        </Grid>
        <Grid className="bdl-order-item__col" size={{ sm: 2, xs: 12 }}>
          <span className="bdl-order-items__label">
            <strong>Price: </strong>
          </span>
          <span className="bdl-order-items__value">
            {formatRupiah(item.price)}
          </span>
        </Grid>
        <Grid className="bdl-order-item__col" size={{ sm: 2, xs: 12 }}>
          <span className="bdl-order-items__label">
            <strong>QTY: </strong>
          </span>
          <span className="bdl-order-items__value">{item.qty}</span>
        </Grid>
        <Grid className="bdl-order-item__col" size={{ sm: 2, xs: 12 }}>
          <span className="bdl-order-items__label">
            <strong>Total: </strong>
          </span>
          <span className="bdl-order-items__value">
            {formatRupiah(item.price * item.qty)}
          </span>
        </Grid>
      </Grid>
    </>
  );
}
