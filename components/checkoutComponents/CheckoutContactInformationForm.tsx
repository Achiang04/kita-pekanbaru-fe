import React, { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { fieldAttrs } from "../../utils/formUtils";
import ExtraErrors from "./ExtraErrors";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import {
  cartOrder,
  checkoutPageSettings,
  stepperDummy,
} from "../../dummy/data";
import { useRouter } from "next/navigation";
import { IOrder } from "../../@types/order";
import { ICheckoutStepper, TCheckoutStep } from "../../@types/checkout";
import {
  ICheckoutPageSettings,
  ICheckoutSettingsContactFields,
} from "../../@types/settings";
import { ICustomer } from "../../@types/customer";

export default function CheckoutContactInformationForm() {
  return <ContactFormView />;
}

export function ContactFormView() {
  //   TODO: Integrate with real data
  const order: IOrder = cartOrder;
  const stepper: ICheckoutStepper = stepperDummy;
  const settings: ICheckoutPageSettings = checkoutPageSettings;

  useEffect(() => {
    document.title = "Checkout: contact information";
  }, []); //eslint-disable-line

  const { accountPolicy, contactFields } = settings!;
  const fieldsList = getFieldsList(contactFields);
  const smGridCell = fieldsList.length ? 12 / fieldsList.length : 12;
  const { onSubmit } = useSaveContactInfo();
  const excludedFields = fieldsList.map(({ type }) => type);

  return (
    <Formik initialValues={getInitialValues(order!, null)} onSubmit={onSubmit}>
      {(formikProps) => (
        <Form
          className={clsx("bdl-contact-form", {
            "two-fields": fieldsList.length === 2,
            "one-field": fieldsList.length === 1,
          })}
        >
          {Object.keys(formikProps.errors).length > 0 && (
            <ExtraErrors
              excludedFields={excludedFields}
              errors={formikProps.errors}
            />
          )}
          <Typography variant="h5" mb={2}>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            {fieldsList.map(({ type, required }, i) => (
              <Grid size={{ xs: 12, sm: smGridCell }} key={i}>
                {type === "email" && (
                  <TextField
                    label="Email"
                    variant={"standard"}
                    type={"email"}
                    required={required}
                    fullWidth
                    {...fieldAttrs<IContactInformationFormValues>(
                      "email",
                      formikProps
                    )}
                  />
                )}
                {type === "phone" && (
                  <TextField
                    label="Phone"
                    variant={"standard"}
                    required={required}
                    {...fieldAttrs<IContactInformationFormValues>(
                      "phone",
                      formikProps
                    )}
                    fullWidth
                  />
                )}
              </Grid>
            ))}
            <Grid size={{ xs: 12 }} sx={{ textAlign: "right" }}>
              <NextStepBtn
                stepper={stepper!}
                isSubmitting={formikProps.isSubmitting}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

const NextStepBtn = ({
  stepper,
  isSubmitting,
}: {
  stepper: ICheckoutStepper;
  isSubmitting: boolean;
}) => {
  if (stepper.steps.includes(TCheckoutStep.shippingAddress)) {
    return (
      <Button
        variant="contained"
        type={"submit"}
        size="large"
        disabled={isSubmitting}
        startIcon={<LocalShippingIcon />}
      >
        Continue To Shipping
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      type={"submit"}
      size="large"
      disabled={isSubmitting}
      startIcon={<PaymentIcon />}
    >
      Continue To Payment
    </Button>
  );
};

const useSaveContactInfo = () => {
  // TODO: Integrate with real data
  const order: IOrder = cartOrder;
  const stepper: ICheckoutStepper = stepperDummy;
  const router = useRouter();

  const order_id = order!.id;

  const onSubmit = (
    values: IContactInformationFormValues,
    { setSubmitting, setErrors }: FormikHelpers<IContactInformationFormValues>
  ) => {
    // TODO: Integrate Submit data
    const nextUrl = stepper!.steps.includes(TCheckoutStep.shippingAddress)
      ? "/shipping-address"
      : "/payment";
    router.push(`/checkout${nextUrl}`);
    setSubmitting(false);
  };

  return {
    onSubmit,
  };
};

const getFieldsList = (contactFields: ICheckoutSettingsContactFields) => {
  const fields: { type: string; required: boolean; show: boolean }[] = [
    "email",
    "phone",
  ]
    .map((type) => ({
      type,
      //@ts-ignore
      required: contactFields[type].required,
      //@ts-ignore
      show: contactFields[type].show,
    }))
    .filter(({ show }) => show);

  //required fields should be first:
  fields.sort((a, b) => {
    if (a.required && !b.required) {
      return -1;
    } else if (!a.required && b.required) {
      return 1;
    }

    return 0;
  });

  return fields;
};

const getInitialValues = (
  order: IOrder,
  loggedInCustomer: ICustomer | null
) => {
  const { customer } = order;
  const initialValues: IContactInformationFormValues = {
    receive_marketing_info: true,
    register_me: false,
  };

  if (loggedInCustomer) {
    initialValues.email = loggedInCustomer.email!;
    initialValues.phone = loggedInCustomer.phone || "";
  } else if (customer) {
    if (customer.email) {
      initialValues.email = customer.email;
    }

    if (customer.phone) {
      initialValues.phone = customer.phone;
    }
  }

  return initialValues;
};

export interface IContactInformationFormValues {
  email?: string;
  phone?: string;
  receive_marketing_info?: boolean;
  register_me?: boolean;
}

export enum TViewMode {
  contact = "contact",
  login = "login",
}
