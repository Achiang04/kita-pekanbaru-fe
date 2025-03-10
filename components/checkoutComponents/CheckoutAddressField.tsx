import React from "react";
import { useFormikContext } from "formik";
import { IShippingFormValues } from "../../@types/shipping";
import { ICheckoutShippingPageData } from "../../@types/delivery";
import { isPickUpDelivery } from "../../lib/shipping";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import AddressFieldset from "./AddressFieldset";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { checkAttrs } from "../../utils/formUtils";

export default function CheckoutAddressesFields({
  shippingPage,
}: {
  shippingPage: ICheckoutShippingPageData;
}) {
  const formikProps = useFormikContext<IShippingFormValues>();

  if (!formikProps.values.delivery_id) return null;

  return (
    <>
      {isPickUpDelivery(
        formikProps.values.delivery_id,
        shippingPage.options.delivery
      ) ? (
        <>
          <Box className="bdl-shipping-form__address-form" mb={2}>
            <Typography variant="h6">Billing address</Typography>
            <AddressFieldset
              countries={shippingPage.options.country}
              keyPrefix={"billing_address"}
            />
          </Box>
        </>
      ) : (
        <>
          <Box className="bdl-shipping-form__address-form" mb={2}>
            <Typography variant="h6">Shipping address</Typography>
            <AddressFieldset
              countries={shippingPage.options.country}
              keyPrefix={"shipping_address"}
              showPhone
            />
          </Box>
          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={true}
                  {...checkAttrs("billing_address_the_same", formikProps)}
                />
              }
              label={"Billing address is the same as shipping address"}
            />
          </Box>
          {!formikProps.values.billing_address_the_same && (
            <Box className="bdl-shipping-form__address-form" mb={2}>
              <Typography variant="h6">Billing address</Typography>
              <AddressFieldset
                countries={shippingPage.options.country}
                keyPrefix={"billing_address"}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
}
