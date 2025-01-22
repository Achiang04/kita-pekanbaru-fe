import React from "react";
import {
  IAddress,
  IAddressFields,
  ICheckoutShippingPageData,
  IOrder,
  ISetAddressesData,
  TAddressType,
} from "boundless-api-client";
import { Form, Formik, FormikHelpers } from "formik";
import ExtraErrors from "./ExtraErrors";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IShippingFormValues } from "../../@types/shipping";
import CheckoutDeliverySelector from "./CheckoutDeliverySelector";
import { apiErrors2Formik } from "../../utils/formUtils";
import CheckoutAddressesFields from "./CheckoutAddressField";
import { isPickUpDelivery } from "../../lib/shipping";
import { cartOrder } from "../../dummy/data";
import { useRouter } from "next/navigation";

export default function CheckoutShippingForm({
  shippingPage,
}: {
  shippingPage: ICheckoutShippingPageData;
}) {
  const { onSubmit } = useSaveShippingForm({ shippingPage });

  return (
    <Formik
      initialValues={getFormInitialValues(shippingPage)}
      onSubmit={onSubmit}
    >
      {(formikProps) => (
        <Form className={"bdl-shipping-form"}>
          {/* {Object.keys(formikProps.errors).length > 0 &&
					<ExtraErrors excludedFields={...Object.keys(formikProps.initialValues)} errors={formikProps.errors} />} */}
          <Typography variant="h5" mb={2}>
            Delivery method
          </Typography>
          <CheckoutDeliverySelector options={shippingPage.options} />
          <CheckoutAddressesFields shippingPage={shippingPage} />
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              type={"submit"}
              disabled={
                formikProps.isSubmitting || !formikProps.values.delivery_id
              }
            >
              Continue to payment
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
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

        router.push("/newcheckout/payment");
      })
      .catch(({ response: { data } }) => setErrors(apiErrors2Formik(data)))
      .finally(() => setSubmitting(false));
  };

  return {
    onSubmit,
  };
};
