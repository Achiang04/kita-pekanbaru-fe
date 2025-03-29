import React, { useState } from "react";

import { Form, Formik, FormikHelpers } from "formik";
import ExtraErrors from "./ExtraErrors";
import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { IShippingFormValues } from "../../@types/shipping";
import CheckoutDeliverySelector from "./CheckoutDeliverySelector";
import { apiErrors2Formik } from "../../utils/formUtils";
import CheckoutAddressesFields from "./CheckoutAddressField";
import { isPickUpDelivery } from "../../lib/shipping";
import { cartOrder } from "../../dummy/data";
import { useRouter } from "next/navigation";
import {
  IAddress,
  IAddressFields,
  ICheckoutShippingPageData,
  ISetAddressesData,
  TAddressType,
} from "../../@types/delivery";
import { IOrder } from "../../@types/order";
import AddressForm from "../AddressForm/AddressForm";
import { useGetShippingAddressQuery } from "../../services/address";
import AddressSelection from "../AddressForm/AddressSelection";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { usePostCreateOrderMutation } from "../../services/cart";
import { removeCheckoutItem } from "../../redux/reducers/cart";
import { useDispatch } from "react-redux";

export default function CheckoutShippingForm({
  isSetting,
}: {
  isSetting?: boolean;
}) {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const { checkoutItem } = useSelector((state: RootState) => state.cart);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data } = useGetShippingAddressQuery(undefined);
  const [mutation] = usePostCreateOrderMutation();

  const orderButtonHandler = async () => {
    const result = await mutation({
      cart: checkoutItem.cartId,
      shippingId: selectedAddress,
    });
    if ("error" in result) {
      // TODO: handle error
    } else {
      // TODO: handle success
      dispatch(removeCheckoutItem());
      window.open(result.data.redirectUrl, "_self");
    }
  };

  return (
    <div>
      <Typography variant="h5" mb={2}>
        Address
      </Typography>
      <AddressSelection
        address={data ? data : []}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      <Stack direction="column" alignItems="center" sx={{ paddingTop: "16px" }}>
        <Button
          onClick={() => setIsAddAddress(!isAddAddress)}
          color={!isAddAddress ? "primary" : "error"}
        >
          {!isAddAddress ? "Add New Address" : "Close Form"}
        </Button>
      </Stack>
      {isAddAddress && (
        <Box sx={{ paddingTop: "16px", paddingBottom: "16px" }}>
          <AddressForm setIsAddAddress={setIsAddAddress} />
        </Box>
      )}
      {!isSetting && (
        <Stack sx={{ paddingTop: "16px" }}>
          <Button
            variant="contained"
            disabled={selectedAddress.length === 0}
            onClick={orderButtonHandler}
          >
            Create Orders
          </Button>
        </Stack>
      )}
    </div>
  );
}

const getFormInitialValues = (
  shippingPage: ICheckoutShippingPageData
): IShippingFormValues => {
  const initialValues: IShippingFormValues = {
    delivery_id:
      shippingPage.orderServiceDelivery?.serviceDelivery?.delivery_id || 0,
    shipping_address: getEmptyAddressFields(shippingPage.shippingAddress),
    billing_address: getEmptyAddressFields(shippingPage.billingAddress),
    billing_address_the_same: false,
  };

  if (!shippingPage.billingAddress) {
    initialValues.billing_address_the_same = true;
  }

  return initialValues;
};

const getEmptyAddressFields = (
  address: IAddress | null = null
): IAddressFields => {
  let first_name,
    last_name,
    company,
    address_line_1,
    address_line_2,
    city,
    state,
    country_id,
    zip,
    phone;
  if (address) {
    ({
      first_name,
      last_name,
      company,
      address_line_1,
      address_line_2,
      city,
      state,
      country_id,
      zip,
      phone,
    } = address);
  }

  return {
    first_name: first_name || "",
    last_name: last_name || "",
    company: company || "",
    address_line_1: address_line_1 || "",
    address_line_2: address_line_2 || "",
    city: city || "",
    state: state || "",
    country_id: country_id || 0,
    zip: zip || "",
    phone: phone || "",
  };
};

const useSaveShippingForm = ({
  shippingPage,
}: {
  shippingPage: ICheckoutShippingPageData;
}) => {
  // TODO: Integrate with real data
  const order: IOrder = cartOrder;
  const router = useRouter();

  const onSubmit = (
    values: IShippingFormValues,
    { setSubmitting, setErrors }: FormikHelpers<IShippingFormValues>
  ) => {
    if (!order) return;
    const {
      delivery_id,
      shipping_address,
      billing_address,
      billing_address_the_same,
    } = values;

    const promise = Promise.resolve()
      .then(() => {
        const data: ISetAddressesData = { order_id: order.id };
        if (!isPickUpDelivery(delivery_id, shippingPage.options.delivery)) {
          data.shipping_address = shipping_address;
          data.billing_address_the_same = billing_address_the_same;
          data.required_addresses = [TAddressType.shipping];

          if (!billing_address_the_same) {
            data.required_addresses.push(TAddressType.billing);
            data.billing_address = billing_address;
          }
        } else {
          data.required_addresses = [TAddressType.billing];
          data.billing_address = billing_address;
        }

        // TODO: Integrate to post customer address
      })
      .then(() => {
        // TODO: Integrate to post customer delivery method
        return { order: "", total: "" };
      })
      .then(({ order, total }) => {
        // TODO: Change order and total state

        router.push("/checkout/payment");
      })
      .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data)))
      .finally(() => setSubmitting(false));
  };

  return {
    onSubmit,
  };
};
