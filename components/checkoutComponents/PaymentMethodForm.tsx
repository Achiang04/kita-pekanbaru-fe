import React from "react";
import Typography from "@mui/material/Typography";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import PaymentIcon from "@mui/icons-material/Payment";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { apiErrors2Formik } from "../../utils/formUtils";
import ExtraErrors from "../../components/checkoutComponents/ExtraErrors";
import { cartOrder } from "../../dummy/data";
import { IOrder } from "../../@types/order";
import { useRouter } from "next/navigation";
import {
  ICheckoutPaymentPageData,
  TPaymentGatewayAlias,
  IPaymentMethod,
} from "../../@types/payment";

export default function PaymentMethodForm({
  paymentPage,
}: {
  paymentPage: ICheckoutPaymentPageData;
}) {
  const { onSubmit } = useSavePaymentMethod();

  return (
    <Formik initialValues={getFormInitialValues()} onSubmit={onSubmit}>
      {(formikProps) => (
        <Form className={"bdl-payment-form"}>
          {Object.keys(formikProps.errors).length > 0 && (
            <ExtraErrors
              excludedFields={["payment_method_id"]}
              errors={formikProps.errors}
            />
          )}
          <Typography variant="h5" mb={2}>
            Payment method
          </Typography>
          <PaymentMethods
            formikProps={formikProps}
            paymentMethods={paymentPage.paymentMethods}
          />
          <Box textAlign={"end"}>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              type={"submit"}
              disabled={formikProps.isSubmitting}
            >
              <PayBtnTitle
                paymentMethods={paymentPage.paymentMethods}
                paymentMethodId={formikProps.values.payment_method_id}
              />
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

const getFormInitialValues = () => {
  const initialValues: IPaymentMethodFormValues = { payment_method_id: -1 };

  return initialValues;
};

const PaymentMethods = ({
  formikProps,
  paymentMethods,
}: {
  formikProps: FormikProps<IPaymentMethodFormValues>;
  paymentMethods: IPaymentMethod[];
}) => {
  return (
    <Box mb={2}>
      <FormControl
        variant="standard"
        error={Boolean("payment_method_id" in formikProps.errors)}
      >
        <RadioGroup
          name="payment_method_id"
          onChange={formikProps.handleChange}
        >
          {paymentMethods.map(({ payment_method_id, title, gateway_alias }) => {
            switch (gateway_alias) {
              case TPaymentGatewayAlias.paypal:
                return (
                  <React.Fragment key={payment_method_id}>
                    <FormControlLabel
                      value={payment_method_id}
                      control={<Radio required={true} />}
                      label={
                        <span className={"payment-method__label"}>
                          <span
                            className={
                              "payment-method__icon payment-method__icon-paypal"
                            }
                          />
                          {title}
                        </span>
                      }
                    />
                    {formikProps.values.payment_method_id ==
                      payment_method_id && (
                      <Typography className={"text-muted"} mb={1}>
                        After clicking "Pay now", you will be redirected to
                        PayPal to complete your purchase securely.
                      </Typography>
                    )}
                  </React.Fragment>
                );
              default:
                return (
                  <FormControlLabel
                    value={payment_method_id}
                    control={<Radio required={true} />}
                    label={title}
                    key={payment_method_id}
                  />
                );
            }
          })}
        </RadioGroup>
        {"payment_method_id" in formikProps.errors && (
          <FormHelperText>
            {formikProps.errors.payment_method_id}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

const useSavePaymentMethod = () => {
  // TODO: Integrate with real data
  const order: IOrder = cartOrder;
  const dispatch = useAppDispatch();
  const route = useRouter();

  const onSubmit = (
    values: IPaymentMethodFormValues,
    { setSubmitting, setErrors }: FormikHelpers<IPaymentMethodFormValues>
  ) => {
    if (!order) return;

    // TODO: Integrate with API for payment
    setSubmitting(false);
    route.push("/thank-you/order-id-dummy-dummy");
    // dispatch(addPromise(promise));
  };

  return {
    onSubmit,
  };
};

export interface IPaymentMethodFormValues {
  payment_method_id: number;
}

const PayBtnTitle = ({
  paymentMethods,
  paymentMethodId,
}: {
  paymentMethods: IPaymentMethod[];
  paymentMethodId: number;
}) => {
  const paymentMethod = paymentMethods.find(
    ({ payment_method_id }) => payment_method_id == paymentMethodId
  );

  if (paymentMethod) {
    switch (paymentMethod.gateway_alias) {
      case TPaymentGatewayAlias.paypal:
        return <>Pay now</>;
    }
  }

  return <>Complete order</>;
};
