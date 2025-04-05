import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import useFormatCurrency from "../../hooks/useFormatCurrency";
import { IOrderService } from "../../@types/order";
import { ICustomer } from "../../@types/customer";
import { IAddress, TAddressType } from "../../@types/delivery";
import { NewShipping, OrderItemType } from "../../@types/newTypes/newTypes";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

export default function OrderShipping({ order }: { order: OrderItemType }) {
  return (
    <div className="bdl-order-items__service-row">
      <h5 className="bdl-order-items__service-heading">
        <LocalShippingIcon
          className="bdl-order-items__service-ico"
          fontSize="small"
        />
        Shipping
      </h5>
      <Grid container>
        <Grid
          size={{ xs: 12, sm: 8 }}
          className="bdl-order-items__service-cell bdl-order-items__service-cell_title"
        >
          <ShippingAddress
            address={order.shippingAddress}
            phone={order.customer.gsm}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 4 }}
          container
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Stack>
            <Button variant="contained">Receipt</Button>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}

const ShippingAddress = ({
  address,
  phone,
}: {
  address: NewShipping;
  phone: string;
}) => {
  return (
    <>
      <p className="bdl-order-items__address-heading">Ship to:</p>
      <address className="bdl-order-items__address">
        <p className="bdl-order-items__address-lane">{address.name}</p>

        <p className="bdl-order-items__address-lane">
          {address.fullAddress}, {address.regency.name},{" "}
          {address.subDistrict.name}, {address.district.name},{" "}
          {address.province.name}
        </p>

        <p className="bdl-order-items__address-lane">{phone}</p>
      </address>
    </>
  );
};
