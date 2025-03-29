import Grid from "@mui/material/Grid2";
import React from "react";
import useFormatCurrency from "../../hooks/useFormatCurrency";

export default function OrderTotalRow({
  price,
  qty,
  isSubTotal,
}: {
  price: string | number;
  qty: string | number;
  isSubTotal?: boolean;
}) {
  const { formatRupiah } = useFormatCurrency();

  return (
    <Grid container className="bdl-order-items__total-row">
      <Grid
        size={{ xs: 12, sm: 8 }}
        className="bdl-order-items__total-cell bdl-order-items__total-cell_title"
      >
        {isSubTotal ? "Subtotal" : "Total:"}
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }} className="bdl-order-items__total-cell">
        <span className="bdl-order-items__label">Qty: </span>
        <span className="bdl-order-items__value">{qty}</span>
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }} className="bdl-order-items__total-cell">
        <span className="bdl-order-items__label">Price:</span>
        <span className="bdl-order-items__value">{formatRupiah(+price)}</span>
      </Grid>
    </Grid>
  );
}
