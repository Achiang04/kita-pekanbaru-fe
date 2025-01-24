import React from "react";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import Grid from "@mui/material/Grid2";
import { taxSettingsDummy } from "../../dummy/data";
import { ISystemTax } from "../../@types/settings";
import { IDetailedOrder } from "../../@types/order";

export default function OrderTaxes({ order }: { order: IDetailedOrder }) {
  const { formatCurrency } = useFormatCurrency();
  // TODO: Integrate with real data
  const taxSettings: ISystemTax = taxSettingsDummy;

  return (
    <div className="bdl-order-items__service-row">
      <h5 className="bdl-order-items__service-heading">
        {taxSettings && taxSettings.taxTitle}
      </h5>
      <Grid container style={{ justifyContent: "flex-end" }}>
        <Grid
          size={{ xs: 12, sm: 2 }}
          className="bdl-order-items__service-cell"
        >
          {order.tax_amount && formatCurrency(order.tax_amount)}
        </Grid>
      </Grid>
    </div>
  );
}
